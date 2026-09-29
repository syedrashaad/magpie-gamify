import React from 'react';
import { motion } from 'framer-motion';
import { UserState, Teammate } from '../types';
import { DEMO_UNITS, ScenarioData, UnitData } from '../data/scenarios';
import { MagpieCharacter } from './MagpieCharacter';
import { Check, Lock, Play, ArrowRight, Sparkles, Flame, Trophy, Users, ShieldCheck } from 'lucide-react';

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
  // Horizontal offset pattern for winding zig-zag map path
  const getOffsetClass = (index: number) => {
    const pattern = ['justify-center sm:justify-start sm:ml-12', 'justify-center', 'justify-center sm:justify-end sm:mr-12', 'justify-center'];
    return pattern[index % pattern.length];
  };

  // Find all scenarios flattened
  const allScenarios = DEMO_UNITS.flatMap((u) => u.scenarios);
  const currentScenario = allScenarios.find((s) => s.id === activeScenarioId) || allScenarios[2];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* COMPACT JOURNEY HEADER & TEAM PRESENCE BAR */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Left: Journey Info */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
                THE SANDALWOOD GRAND · BLR
              </span>
              <span className="text-xs font-semibold text-slate-400">•</span>
              <span className="text-xs font-extrabold text-amber-600">Currently on Level 03</span>
            </div>
            <h1 className="font-extrabold text-2xl text-slate-900 tracking-tight">
              Hospitality Learning Journey
            </h1>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              Follow the path, complete scenario challenges, and advance your rank at Sandalwood Grand.
            </p>
          </div>

          {/* Right: Team Presence Widget */}
          <div className="bg-slate-50 border border-slate-200/80 p-3 px-4 rounded-xl flex items-center gap-4 shrink-0">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Your Hotel Team
              </span>
              <span className="text-xs font-bold text-slate-800">
                24 associates <span className="text-purple-700 font-normal">(6 active)</span>
              </span>
              
              {/* Teammate Avatar Stack */}
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
              className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-2xs transition-all flex items-center gap-1 shrink-0"
            >
              <span>Sky League</span>
              <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
            </button>
          </div>

        </div>

        {/* Progress & Stats Bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700">
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

      {/* WINDING MAP UNITS SECTION */}
      <div className="space-y-16 relative">
        
        {DEMO_UNITS.map((unit, unitIdx) => {
          const unitScenarios = unit.scenarios;
          const isUnitCompleted = unitScenarios.every((s) => completedScenarioIds.includes(s.id));

          return (
            <div key={unit.id} className="space-y-8 relative">
              
              {/* UNIT HEADER BANNER */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 border border-purple-200 text-purple-900 flex items-center justify-center font-bold text-xl shrink-0">
                      {unit.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                          {unit.number}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">{unit.atmosphere}</span>
                      </div>
                      <h2 className="font-extrabold text-lg text-slate-900 mt-0.5">
                        {unit.title}
                      </h2>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-slate-500 self-start sm:self-auto">
                    {unit.subtitle}
                  </span>
                </div>

                {isUnitCompleted && (
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-emerald-700 font-bold text-xs">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Unit Completed! 5 / 5 Scenarios Mastered (+100 XP Bonus Earned)</span>
                  </div>
                )}
              </div>

              {/* WINDING SCENARIO MAP PATH */}
              <div className="relative space-y-12 py-4">
                
                {/* SVG Connecting Winding Line Background */}
                <div className="absolute inset-0 pointer-events-none z-0 flex justify-center">
                  <div className="w-full max-w-lg h-full border-l-2 border-dashed border-slate-200 opacity-80" />
                </div>

                {unitScenarios.map((scenario, scIdx) => {
                  const isCompleted = completedScenarioIds.includes(scenario.id);
                  const isUnlocked = unlockedScenarioIds.includes(scenario.id) || isCompleted;
                  const isActive = scenario.id === activeScenarioId || (!isCompleted && isUnlocked && scIdx === 0);

                  // Find teammates positioned at this level
                  const teammatesHere = teammates.filter((t) => t.currentLevelNumber === scenario.levelNumber);

                  // User Nova companion presence check
                  const isUserHere = userState.currentLevelNumber === scenario.levelNumber || isActive;

                  return (
                    <div
                      key={scenario.id}
                      className={`relative z-10 flex items-center ${getOffsetClass(scIdx)}`}
                    >
                      
                      {/* LEVEL NODE WRAPPER */}
                      <div className="flex flex-col items-center max-w-sm text-center relative group">
                        
                        {/* TEAMMATES MAGPIE AVATARS BESIDE NODE */}
                        {teammatesHere.length > 0 && !isUserHere && (
                          <div className="absolute -top-7 flex items-center gap-1 z-20">
                            {teammatesHere.map((tm) => (
                              <div
                                key={tm.id}
                                title={`${tm.name} • ${tm.xp} XP`}
                                className="flex items-center gap-1 bg-white border border-slate-200 px-2 py-0.5 rounded-full shadow-2xs hover:scale-105 transition-transform"
                              >
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-[10px] font-bold text-slate-800">{tm.name.split(' ')[0]}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* PERSISTENT USER MAGPIE COMPANION (NOVA) BESIDE CURRENT NODE */}
                        {isUserHere && (
                          <motion.div
                            initial={{ y: -5, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="absolute -top-12 z-30 flex items-center gap-2 bg-slate-900 text-white border border-purple-400/50 px-3 py-1 rounded-full shadow-md animate-pulse"
                          >
                            <div className="w-7 h-7 overflow-hidden rounded-full bg-purple-900 border border-purple-300 flex items-center justify-center">
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
                          </motion.div>
                        )}

                        {/* CIRCULAR LEVEL NODE */}
                        <button
                          onClick={() => isUnlocked && onSelectScenario(scenario)}
                          disabled={!isUnlocked}
                          className={`w-16 h-16 rounded-full flex flex-col items-center justify-center font-bold transition-all duration-200 shadow-2xs relative z-10 ${
                            isCompleted
                              ? 'bg-emerald-500 text-white ring-4 ring-emerald-100 hover:scale-105'
                              : isActive
                              ? 'bg-slate-900 text-white ring-4 ring-purple-400 shadow-md scale-110'
                              : isUnlocked
                              ? 'bg-purple-700 text-white ring-4 ring-purple-100 hover:scale-105'
                              : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="w-7 h-7 stroke-[3]" />
                          ) : isActive ? (
                            <Play className="w-6 h-6 fill-white ml-0.5" />
                          ) : isUnlocked ? (
                            <Play className="w-5 h-5 fill-white ml-0.5" />
                          ) : (
                            <Lock className="w-5 h-5 text-slate-400" />
                          )}
                        </button>

                        {/* LEVEL NUMBER LABEL */}
                        <span className={`text-[10px] font-extrabold tracking-wider uppercase mt-2 px-2 py-0.5 rounded-md ${
                          isActive
                            ? 'bg-slate-900 text-white font-extrabold'
                            : isCompleted
                            ? 'text-emerald-700 bg-emerald-50'
                            : 'text-slate-400'
                        }`}>
                          {scenario.levelLabel}
                        </span>

                        {/* SCENARIO TITLE & METRICS */}
                        <div className="mt-1 space-y-0.5">
                          <h3 className={`font-bold text-sm max-w-[200px] leading-tight ${
                            isActive ? 'text-slate-900 font-extrabold' : 'text-slate-800'
                          }`}>
                            {scenario.title}
                          </h3>

                          {isCompleted && (
                            <span className="text-[11px] font-semibold text-emerald-600 block">
                              Completed • Score 82/100 • +{scenario.xpReward} XP
                            </span>
                          )}

                          {!isCompleted && isUnlocked && !isActive && (
                            <span className="text-[11px] font-semibold text-purple-700 block">
                              +{scenario.xpReward} XP • {scenario.estimatedTime}
                            </span>
                          )}

                          {!isUnlocked && (
                            <span className="text-[11px] text-slate-400 font-medium block">
                              Locked • Complete Level {scenario.levelNumber - 1}
                            </span>
                          )}
                        </div>

                        {/* ACTIVE LEVEL EXPANDED CTA CARD */}
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-4 bg-white border border-purple-300 rounded-2xl p-5 shadow-sm text-left max-w-md w-full space-y-3 relative z-20"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                                {scenario.department}
                              </span>
                              <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full">
                                +{scenario.xpReward} XP
                              </span>
                            </div>

                            <div>
                              <h4 className="font-bold text-slate-900 text-base">
                                {scenario.title}
                              </h4>
                              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                {scenario.description}
                              </p>
                            </div>

                            <button
                              onClick={() => onSelectScenario(scenario)}
                              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-2xs transition-all flex items-center justify-center gap-2"
                            >
                              <span>CONTINUE SCENARIO</span>
                              <ArrowRight className="w-4 h-4 text-purple-400" />
                            </button>
                          </motion.div>
                        )}

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};
