import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserState, Teammate } from '../types';
import { DEMO_UNITS, ScenarioData, UnitData } from '../data/scenarios';
import { MagpieCharacter } from './MagpieCharacter';
import { Check, Lock, Play, ArrowRight, Sparkles, Flame, Trophy, LockKeyhole, Info } from 'lucide-react';

interface TasksViewProps {
  userState: UserState;
  teammates: Teammate[];
  unlockedScenarioIds: string[];
  completedScenarioIds: string[];
  activeScenarioId: string;
  onSelectScenario: (scenario: ScenarioData) => void;
  onNavigateToSkyLeague: () => void;
}

export const TasksView: React.FC<TasksViewProps> = ({
  userState,
  teammates,
  unlockedScenarioIds,
  completedScenarioIds,
  activeScenarioId,
  onSelectScenario,
  onNavigateToSkyLeague,
}) => {
  const [hoveredTeammate, setHoveredTeammate] = useState<Teammate | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Helper to generate SVG Path coordinates for winding S-curve across all 25 levels
  const getNodePosition = (globalIndex: number) => {
    // globalIndex: 0 to 24
    const unitIndex = Math.floor(globalIndex / 5);
    const inUnitIndex = globalIndex % 5;

    // X percentage pattern: Left (22%), Center (50%), Right (78%), Center (50%), Left (22%)...
    const xPattern = [22, 50, 78, 50, 22];
    const xPct = xPattern[inUnitIndex];

    // Y position calculation taking Unit headers into account
    // Each unit block is ~720px high, with 120px per level + 120px for unit header
    const yPx = unitIndex * 720 + inUnitIndex * 125 + 130;

    return { xPct, yPx };
  };

  // Generate SVG path 'd' attribute string connecting all 25 level nodes smoothly
  const buildSvgPath = () => {
    let d = '';
    const totalLevels = 25;
    for (let i = 0; i < totalLevels; i++) {
      const pos = getNodePosition(i);
      // convert X pct to approx px in a 600px viewBox
      const xPx = (pos.xPct / 100) * 600;
      const yPx = pos.yPx;

      if (i === 0) {
        d += `M ${xPx} ${yPx}`;
      } else {
        const prevPos = getNodePosition(i - 1);
        const prevXPx = (prevPos.xPct / 100) * 600;
        const prevYPx = prevPos.yPx;

        // Smooth cubic bezier curve control points
        const cy1 = prevYPx + (yPx - prevYPx) / 2;
        const cy2 = prevYPx + (yPx - prevYPx) / 2;
        d += ` C ${prevXPx} ${cy1}, ${xPx} ${cy2}, ${xPx} ${yPx}`;
      }
    }
    return d;
  };

  // Flatten all 25 scenarios
  const allScenarios = DEMO_UNITS.flatMap((u) => u.scenarios);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      
      {/* TOAST NOTIFICATION POPUP */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-2.5 rounded-xl shadow-xl text-xs font-bold border border-purple-400/40 flex items-center gap-2"
          >
            <Info className="w-4 h-4 text-amber-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COMPACT JOURNEY HEADER & TEAM PRESENCE BAR */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Left: Journey Title & Property */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
                THE SANDALWOOD GRAND · BLR
              </span>
              <span className="text-xs font-semibold text-slate-400">•</span>
              <span className="text-xs font-extrabold text-amber-600">Currently on Level 03</span>
            </div>
            <h1 className="font-extrabold text-2xl text-slate-900 tracking-tight">
              Hospitality Learning Journey Map
            </h1>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              Navigate the winding hotel map, master guest scenarios, and level up with your team.
            </p>
          </div>

          {/* Right: Hotel Team Presence Widget */}
          <div className="bg-slate-50 border border-slate-200/80 p-3 px-4 rounded-xl flex items-center gap-4 shrink-0">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Your Hotel Team
              </span>
              <span className="text-xs font-bold text-slate-800">
                24 associates <span className="text-purple-700 font-normal">(6 active)</span>
              </span>
              
              <div className="flex items-center gap-1.5 mt-1.5">
                {teammates.slice(0, 4).map((tm) => (
                  <div
                    key={tm.id}
                    title={`${tm.name} (${tm.role}) • ${tm.xp} XP`}
                    className="w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-800 shadow-2xs cursor-pointer hover:scale-110 transition-transform"
                  >
                    {tm.name.charAt(0)}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onNavigateToSkyLeague}
              className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-2xs transition-all flex items-center gap-1 shrink-0"
            >
              <span>Sky League</span>
              <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
            </button>
          </div>

        </div>

        {/* Status Pills */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700">
          <div className="flex items-center gap-1.5 bg-purple-50 text-purple-900 px-3 py-1 rounded-lg border border-purple-100">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>82% Journey Progress</span>
          </div>

          <div className="flex items-center gap-1.5 bg-amber-50 text-amber-900 px-3 py-1 rounded-lg border border-amber-200/80">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>🔥 {userState.streak} Day Streak</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 text-slate-800 px-3 py-1 rounded-lg">
            <span>{userState.xp} Total XP</span>
          </div>
        </div>
      </div>

      {/* GAME MAP CONTAINER CANVAS */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs relative overflow-hidden min-h-[3650px]">
        
        {/* SVG WINDING PATH GRAPHIC LAYER */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg className="w-full h-full" viewBox="0 0 600 3650" preserveAspectRatio="none">
            
            {/* Background Base Path (Locked/Future Path) */}
            <path
              d={buildSvgPath()}
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Active / Completed Segment Glowing Path */}
            <path
              d={buildSvgPath()}
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth="8"
              strokeDasharray="600"
              strokeDashoffset="350"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-1000"
            />

            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="50%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* MAP UNITS & LANDMARKS RENDERED IN SEQUENCE */}
        {DEMO_UNITS.map((unit, unitIdx) => {
          const unitHeaderY = unitIdx * 720 + 30;

          return (
            <React.Fragment key={unit.id}>
              
              {/* ELEGANT UNIT DESTINATION HEADER */}
              <div
                className="absolute left-1/2 -translate-x-1/2 z-10 w-11/12 max-w-xl text-center bg-white/95 backdrop-blur-md border border-slate-200 p-4 px-6 rounded-2xl shadow-2xs space-y-1"
                style={{ top: `${unitHeaderY}px` }}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">{unit.icon}</span>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
                    {unit.number} · {unit.title}
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-slate-900">{unit.atmosphere}</h3>
                <p className="text-xs text-slate-500 font-medium">{unit.subtitle}</p>
              </div>

              {/* ENVIRONMENTAL HOSPITALITY LANDMARKS */}
              {unitIdx === 0 && (
                <>
                  <div className="absolute left-6 top-[220px] z-0 text-slate-300 flex items-center gap-1.5 text-xs font-semibold select-none pointer-events-none">
                    <span>🏨 Main Entrance</span>
                  </div>
                  <div className="absolute right-8 top-[360px] z-0 text-slate-300 flex items-center gap-1.5 text-xs font-semibold select-none pointer-events-none">
                    <span>🧳 Luggage Desk</span>
                  </div>
                </>
              )}

              {unitIdx === 1 && (
                <>
                  <div className="absolute left-8 top-[940px] z-0 text-slate-300 flex items-center gap-1.5 text-xs font-semibold select-none pointer-events-none">
                    <span>🔔 Concierge Counter</span>
                  </div>
                  <div className="absolute right-6 top-[1080px] z-0 text-slate-300 flex items-center gap-1.5 text-xs font-semibold select-none pointer-events-none">
                    <span>🍷 Signature Dining</span>
                  </div>
                </>
              )}

              {unitIdx === 2 && (
                <>
                  <div className="absolute left-6 top-[1660px] z-0 text-slate-300 flex items-center gap-1.5 text-xs font-semibold select-none pointer-events-none">
                    <span>🛏️ Guest Suites</span>
                  </div>
                  <div className="absolute right-8 top-[1800px] z-0 text-slate-300 flex items-center gap-1.5 text-xs font-semibold select-none pointer-events-none">
                    <span>🧘 Spa & Pool Deck</span>
                  </div>
                </>
              )}

              {unitIdx === 3 && (
                <>
                  <div className="absolute left-8 top-[2380px] z-0 text-slate-300 flex items-center gap-1.5 text-xs font-semibold select-none pointer-events-none">
                    <span>👑 VIP Lounge</span>
                  </div>
                  <div className="absolute right-6 top-[2520px] z-0 text-slate-300 flex items-center gap-1.5 text-xs font-semibold select-none pointer-events-none">
                    <span>🍾 Penthouse Corridor</span>
                  </div>
                </>
              )}

              {unitIdx === 4 && (
                <>
                  <div className="absolute left-6 top-[3100px] z-0 text-slate-300 flex items-center gap-1.5 text-xs font-semibold select-none pointer-events-none">
                    <span>🏢 Command Center</span>
                  </div>
                </>
              )}

            </React.Fragment>
          );
        })}

        {/* ALL 25 LEVEL NODES POSITIONED DIRECTLY ON THE SVG PATH */}
        {allScenarios.map((scenario, globalIdx) => {
          const pos = getNodePosition(globalIdx);
          const isCompleted = completedScenarioIds.includes(scenario.id);
          const isUnlocked = unlockedScenarioIds.includes(scenario.id) || isCompleted;
          const isActive = scenario.id === activeScenarioId || (!isCompleted && isUnlocked && globalIdx === 2);

          // User presence check
          const isUserHere = userState.currentLevelNumber === scenario.levelNumber || isActive;

          // Teammates positioned at this level number
          const teammatesHere = teammates.filter((t) => t.currentLevelNumber === scenario.levelNumber);

          return (
            <div
              key={scenario.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
              style={{ left: `${pos.xPct}%`, top: `${pos.yPx}px` }}
            >
              
              {/* TEAMMATES AVATARS ON THE PATH */}
              {teammatesHere.length > 0 && !isUserHere && (
                <div className="absolute -top-10 flex items-center gap-1 z-20">
                  {teammatesHere.map((tm) => (
                    <div
                      key={tm.id}
                      onMouseEnter={() => setHoveredTeammate(tm)}
                      onMouseLeave={() => setHoveredTeammate(null)}
                      className="relative flex items-center gap-1 bg-white border border-slate-200 px-2 py-0.5 rounded-full shadow-2xs cursor-pointer hover:scale-110 transition-transform"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-800">
                        {tm.name.charAt(0)}
                      </div>
                      <span className="text-[10px] font-bold text-slate-800">{tm.name.split(' ')[0]}</span>

                      {/* Teammate Hover Tooltip */}
                      {hoveredTeammate?.id === tm.id && (
                        <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 w-36 bg-slate-900 text-white text-[10px] p-2 rounded-xl shadow-xl z-30 pointer-events-none text-center">
                          <span className="font-bold block">{tm.name}</span>
                          <span className="text-slate-300 block">{tm.role}</span>
                          <span className="text-amber-300 font-extrabold block mt-0.5">{tm.xp} XP · Level {tm.currentLevelNumber}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* PERSISTENT USER MAGPIE COMPANION (NOVA) PHYSICALLY ON THE PATH */}
              {isUserHere && (
                <motion.div
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="absolute -top-16 z-30 flex flex-col items-center select-none"
                >
                  <span className="text-[9px] font-extrabold uppercase bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full shadow-2xs mb-1 tracking-wider">
                    YOU ARE HERE
                  </span>
                  
                  <div className="flex items-center gap-2 bg-slate-900 text-white border border-purple-400/60 px-3 py-1 rounded-2xl shadow-xl">
                    <div className="w-8 h-8 overflow-hidden rounded-xl bg-purple-900 border border-purple-300 flex items-center justify-center shrink-0">
                      <MagpieCharacter
                        bodyColor={userState.magpie.bodyColor}
                        featherStyle={userState.magpie.featherStyle}
                        accessory={userState.magpie.accessory}
                        level={userState.magpie.level}
                        size="sm"
                      />
                    </div>
                    <div className="text-left leading-none pr-1">
                      <span className="block text-[10px] font-extrabold text-amber-300">
                        {userState.magpie.name.toUpperCase()}
                      </span>
                      <span className="block text-[8px] font-semibold text-slate-300">
                        {userState.name.split(' ')[0]} (YOU)
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* CIRCULAR LEVEL NODE SITTING DIRECTLY ON PATH */}
              <button
                onClick={() => {
                  if (isUnlocked) {
                    onSelectScenario(scenario);
                  } else {
                    showToast(`Complete Level ${scenario.levelNumber - 1} first to unlock Level ${scenario.levelNumber}!`);
                  }
                }}
                className={`w-14 h-14 rounded-full flex flex-col items-center justify-center font-bold transition-all duration-200 shadow-2xs relative z-10 ${
                  isCompleted
                    ? 'bg-emerald-500 text-white ring-4 ring-emerald-100 hover:scale-110 shadow-emerald-200'
                    : isActive
                    ? 'bg-slate-900 text-white ring-4 ring-purple-400 shadow-xl scale-110 animate-pulse'
                    : isUnlocked
                    ? 'bg-purple-700 text-white ring-4 ring-purple-100 hover:scale-105'
                    : 'bg-slate-100 text-slate-400 border border-slate-300 cursor-not-allowed'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6 stroke-[3]" />
                ) : isActive ? (
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                ) : isUnlocked ? (
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                ) : (
                  <Lock className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {/* LEVEL NUMBER BADGE */}
              <span className={`text-[10px] font-extrabold tracking-wider uppercase mt-1 px-2 py-0.5 rounded-md ${
                isActive
                  ? 'bg-slate-900 text-white font-extrabold'
                  : isCompleted
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-slate-400'
              }`}>
                {scenario.levelLabel}
              </span>

              {/* SCENARIO TITLE & METRICS */}
              <div className="mt-0.5 text-center max-w-[160px] space-y-0.5">
                <h4 className={`font-bold text-xs leading-tight ${
                  isActive ? 'text-slate-900 font-extrabold' : 'text-slate-700'
                }`}>
                  {scenario.title}
                </h4>

                {isCompleted && (
                  <span className="text-[10px] font-semibold text-emerald-600 block">
                    82/100 · +{scenario.xpReward} XP
                  </span>
                )}

                {!isCompleted && isUnlocked && !isActive && (
                  <span className="text-[10px] font-semibold text-purple-700 block">
                    +{scenario.xpReward} XP · {scenario.estimatedTime}
                  </span>
                )}
              </div>

              {/* ACTIVE LEVEL EXPANDED CTA ACTION CARD */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 bg-white border border-purple-300 rounded-2xl p-4 shadow-xl text-left max-w-xs w-64 space-y-2.5 relative z-30"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                      {scenario.department}
                    </span>
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full">
                      +{scenario.xpReward} XP
                    </span>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      {scenario.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-snug line-clamp-2">
                      {scenario.description}
                    </p>
                  </div>

                  <button
                    onClick={() => onSelectScenario(scenario)}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-2xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>CONTINUE SCENARIO</span>
                    <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                  </button>
                </motion.div>
              )}

            </div>
          );
        })}

      </div>

    </div>
  );
};
