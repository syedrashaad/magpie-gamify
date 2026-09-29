import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserState, Teammate } from '../types';
import { DEMO_UNITS, ScenarioData, UnitData } from '../data/scenarios';
import { MagpieCharacter } from './MagpieCharacter';
import {
  HotelEntranceIllustration,
  ConciergeDeskIllustration,
  CheckoutCounterIllustration,
  GuestServicesIllustration,
  NightArrivalIllustration,
  DiningRestaurantIllustration,
  GuestSuitesIllustration,
  SpaPoolDeckIllustration,
  VIPLoungeIllustration,
  CommandCenterIllustration,
} from './HotelMapIllustrations';
import { Check, Lock, Play, ArrowRight, Sparkles, Flame, Trophy, Info, Navigation, MapPin } from 'lucide-react';

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

  // Helper to map global level index (0..24) to (xPct, yPx) coordinates on map canvas
  const getNodePosition = (globalIndex: number) => {
    const unitIndex = Math.floor(globalIndex / 5);
    const inUnitIndex = globalIndex % 5;

    // Winding X pattern: 25% (Left), 50% (Center), 75% (Right), 50% (Center), 25% (Left)...
    const xPattern = [25, 50, 75, 50, 25];
    const xPct = xPattern[inUnitIndex];

    // Y spacing taking destination illustration height and region banners into account
    const yPx = unitIndex * 780 + inUnitIndex * 135 + 160;

    return { xPct, yPx };
  };

  // Build continuous SVG path 'd' attribute string connecting all 25 level destinations
  const buildSvgPath = () => {
    let d = '';
    const totalLevels = 25;
    for (let i = 0; i < totalLevels; i++) {
      const pos = getNodePosition(i);
      const xPx = (pos.xPct / 100) * 600;
      const yPx = pos.yPx;

      if (i === 0) {
        d += `M ${xPx} ${yPx}`;
      } else {
        const prevPos = getNodePosition(i - 1);
        const prevXPx = (prevPos.xPct / 100) * 600;
        const prevYPx = prevPos.yPx;

        const cy1 = prevYPx + (yPx - prevYPx) / 2;
        const cy2 = prevYPx + (yPx - prevYPx) / 2;
        d += ` C ${prevXPx} ${cy1}, ${xPx} ${cy2}, ${xPx} ${yPx}`;
      }
    }
    return d;
  };

  // Map illustration selection for each level destination
  const getDestinationIllustration = (levelNum: number) => {
    switch (levelNum) {
      case 1:
        return <HotelEntranceIllustration className="w-20 h-20" />;
      case 2:
        return <ConciergeDeskIllustration className="w-20 h-20" />;
      case 3:
        return <CheckoutCounterIllustration className="w-24 h-24" />;
      case 4:
        return <GuestServicesIllustration className="w-20 h-20" />;
      case 5:
        return <NightArrivalIllustration className="w-20 h-20" />;
      case 6:
      case 7:
        return <DiningRestaurantIllustration className="w-20 h-20" />;
      case 11:
      case 14:
        return <GuestSuitesIllustration className="w-20 h-20" />;
      case 15:
        return <SpaPoolDeckIllustration className="w-20 h-20" />;
      case 16:
      case 20:
        return <VIPLoungeIllustration className="w-20 h-20" />;
      case 21:
      case 25:
        return <CommandCenterIllustration className="w-20 h-20" />;
      default:
        return <ConciergeDeskIllustration className="w-20 h-20" />;
    }
  };

  // Flatten all scenarios
  const allScenarios = DEMO_UNITS.flatMap((u) => u.scenarios);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      
      {/* TOAST POPUP NOTIFICATION */}
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

      {/* COMPACT JOURNEY HEADER & TEAM WIDGET */}
      <div className="bg-[#FAF8F5] border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Left Title & Property */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100/80 px-2.5 py-0.5 rounded-md border border-purple-200">
                THE SANDALWOOD GRAND · BLR
              </span>
              <span className="text-xs font-semibold text-slate-400">•</span>
              <span className="text-xs font-extrabold text-amber-700">Currently on Level 03</span>
            </div>
            <h1 className="font-extrabold text-2xl text-slate-900 tracking-tight">
              Hospitality Game World Map
            </h1>
            <p className="text-xs font-semibold text-slate-600 mt-0.5">
              Travel through hotel destinations, complete guest roleplays, and level up with your team.
            </p>
          </div>

          {/* Right: Team Presence Widget */}
          <div className="bg-white border border-slate-200/80 p-3 px-4 rounded-xl flex items-center gap-4 shrink-0 shadow-2xs">
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
                    className="w-6 h-6 rounded-full bg-purple-100 border border-purple-300 flex items-center justify-center text-[10px] font-bold text-purple-900 shadow-2xs cursor-pointer hover:scale-110 transition-transform"
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
        <div className="pt-3 border-t border-slate-200/60 flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700">
          <div className="flex items-center gap-1.5 bg-purple-100/80 text-purple-900 px-3 py-1 rounded-lg border border-purple-200">
            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
            <span>82% Journey Mastery</span>
          </div>

          <div className="flex items-center gap-1.5 bg-amber-50 text-amber-900 px-3 py-1 rounded-lg border border-amber-200/80">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>🔥 {userState.streak} Day Streak</span>
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-800 px-3 py-1 rounded-lg">
            <span>{userState.xp} Total XP</span>
          </div>
        </div>
      </div>

      {/* ILLUSTRATED HOTEL WORLD GAME MAP CANVAS */}
      <div className="bg-[#FAF8F5] border border-slate-200/90 rounded-3xl p-6 shadow-xs relative overflow-hidden min-h-[3950px] selection:bg-purple-100">
        
        {/* SUBTLE HOTEL FLOOR-PLAN ARCHITECTURAL GRID BACKGROUND */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#94A3B8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* MULTI-LAYERED WINDING HOTEL CORRIDOR CARPET PATH */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg className="w-full h-full" viewBox="0 0 600 3950" preserveAspectRatio="none">
            
            {/* Outer Walkway Floor Layer */}
            <path
              d={buildSvgPath()}
              fill="none"
              stroke="#E5E0D8"
              strokeWidth="24"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Inner Runner Carpet Line Layer */}
            <path
              d={buildSvgPath()}
              fill="none"
              stroke="#D6CEC2"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Active / Completed Illuminated Runner Trail */}
            <path
              d={buildSvgPath()}
              fill="none"
              stroke="url(#carpetRunnerGradient)"
              strokeWidth="8"
              strokeDasharray="600"
              strokeDashoffset="340"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-1000"
            />

            <defs>
              <linearGradient id="carpetRunnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="50%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* REGION TRANSITION GATEWAYS & HOTEL ATMOSPHERE HEADERS */}
        {DEMO_UNITS.map((unit, unitIdx) => {
          const regionHeaderY = unitIdx * 780 + 30;

          return (
            <React.Fragment key={unit.id}>
              <div
                className="absolute left-1/2 -translate-x-1/2 z-10 w-11/12 max-w-lg text-center bg-white/95 backdrop-blur-md border border-slate-200 p-4 px-6 rounded-2xl shadow-2xs space-y-1"
                style={{ top: `${regionHeaderY}px` }}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl">{unit.icon}</span>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-800 bg-purple-100/80 px-2.5 py-0.5 rounded-md border border-purple-200">
                    REGION 0{unitIdx + 1} · {unit.title}
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-slate-900">{unit.atmosphere}</h3>
                <p className="text-xs text-slate-500 font-medium">"{unit.subtitle}"</p>
              </div>
            </React.Fragment>
          );
        })}

        {/* ALL 25 HOTEL LEVEL DESTINATIONS INTEGRATED DIRECTLY ON PATH */}
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
              
              {/* HOTEL DESTINATION ENVIRONMENT VECTOR ILLUSTRATION BACKGROUND */}
              <div className="mb-1 transition-transform duration-300 hover:scale-105">
                {getDestinationIllustration(scenario.levelNumber)}
              </div>

              {/* TEAMMATES MAGPIE AVATARS AT THIS DESTINATION */}
              {teammatesHere.length > 0 && !isUserHere && (
                <div className="absolute -top-10 flex items-center gap-1 z-20">
                  {teammatesHere.map((tm) => (
                    <div
                      key={tm.id}
                      onMouseEnter={() => setHoveredTeammate(tm)}
                      onMouseLeave={() => setHoveredTeammate(null)}
                      className="relative flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1 rounded-full shadow-2xs cursor-pointer hover:scale-110 transition-transform"
                    >
                      <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-[10px] font-bold text-purple-900">
                        {tm.name.charAt(0)}
                      </div>
                      <span className="text-[10px] font-extrabold text-slate-800">{tm.name.split(' ')[0]}</span>

                      {/* Teammate Profile Tooltip */}
                      {hoveredTeammate?.id === tm.id && (
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-40 bg-slate-900 text-white text-[10px] p-2.5 rounded-xl shadow-xl z-40 pointer-events-none text-center">
                          <span className="font-extrabold block">{tm.name}</span>
                          <span className="text-slate-300 block">{tm.role}</span>
                          <span className="text-amber-300 font-extrabold block mt-0.5">{tm.xp} XP · Level {tm.currentLevelNumber}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* PERSISTENT USER MAGPIE COMPANION (NOVA) AT CURRENT DESTINATION */}
              {isUserHere && (
                <motion.div
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="absolute -top-20 z-30 flex flex-col items-center select-none"
                >
                  <span className="text-[9px] font-extrabold uppercase bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full shadow-2xs mb-1 tracking-wider animate-bounce">
                    YOU ARE HERE
                  </span>
                  
                  <div className="flex items-center gap-2 bg-slate-900 text-white border border-purple-400/80 px-3 py-1.5 rounded-2xl shadow-xl">
                    <div className="w-9 h-9 overflow-hidden rounded-xl bg-purple-900 border border-purple-300 flex items-center justify-center shrink-0">
                      <MagpieCharacter
                        bodyColor={userState.magpie.bodyColor}
                        featherStyle={userState.magpie.featherStyle}
                        accessory={userState.magpie.accessory}
                        level={userState.magpie.level}
                        size="sm"
                      />
                    </div>
                    <div className="text-left leading-none pr-1">
                      <span className="block text-[11px] font-extrabold text-amber-300">
                        {userState.magpie.name.toUpperCase()}
                      </span>
                      <span className="block text-[8px] font-semibold text-slate-300">
                        {userState.name.split(' ')[0]} (YOU)
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* CIRCULAR LEVEL NODE SITTING DIRECTLY ON DESTINATION PATH */}
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

              {/* DESTINATION TITLE & METRICS */}
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

              {/* ACTIVE LEVEL EXPANDED HERO ACTION CARD */}
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
