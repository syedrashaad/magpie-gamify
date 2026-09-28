import React from 'react';
import { motion } from 'framer-motion';
import { UserState } from '../types';
import { DEMO_UNITS, ScenarioData } from '../data/scenarios';
import { MagpieCharacter } from './MagpieCharacter';
import { Check, Lock, Play, Star, Sparkles, Award, ArrowRight } from 'lucide-react';

interface TasksViewProps {
  userState: UserState;
  unlockedScenarioIds: string[];
  completedScenarioIds: string[];
  activeScenarioId: string;
  onSelectScenario: (scenario: ScenarioData) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({
  userState,
  unlockedScenarioIds,
  completedScenarioIds,
  activeScenarioId,
  onSelectScenario,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/30 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#a78bfa_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black uppercase tracking-widest bg-amber-400 text-slate-950 px-3 py-1 rounded-full shadow-md">
                TASKS • LEARNING PATH
              </span>
              <span className="text-xs font-semibold text-purple-300">
                Sandalwood Grand Hospitality Journey
              </span>
            </div>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl text-white tracking-tight">
              Hospitality Scenario Journey
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 mt-1 max-w-lg font-medium">
              Progress through realistic hotel situations. Complete flights to earn XP, food, and unlock new scenarios!
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/90 border border-purple-500/40 p-3.5 rounded-2xl shrink-0">
            <div className="w-12 h-12">
              <MagpieCharacter
                bodyColor={userState.magpie.bodyColor}
                featherStyle={userState.magpie.featherStyle}
                accessory={userState.magpie.accessory}
                level={userState.magpie.level}
                size="sm"
              />
            </div>
            <div className="text-left">
              <span className="block text-xs font-bold text-white">{userState.magpie.name}</span>
              <span className="text-[10px] font-semibold text-amber-300">Level {userState.magpie.level} • {userState.rewards.food} Food</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Progression Path Units */}
      <div className="space-y-12 relative">
        
        {/* Connecting Vertical Track Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-12 bottom-12 w-1.5 bg-gradient-to-b from-purple-600 via-indigo-600 to-slate-300 rounded-full z-0 opacity-40" />

        {DEMO_UNITS.map((unit, unitIdx) => (
          <div key={unit.id} className="relative z-10 space-y-6">
            
            {/* Unit Title Banner */}
            <div className="bg-white border border-slate-200/90 shadow-md rounded-2xl p-5 text-center max-w-xl mx-auto border-l-4 border-l-purple-600">
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-md">
                {unit.number}
              </span>
              <h2 className="font-serif font-bold text-xl text-slate-900 mt-1">
                {unit.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {unit.description}
              </p>
            </div>

            {/* Nodes list */}
            <div className="space-y-8 flex flex-col items-center">
              {unit.scenarios.map((scenario, nodeIdx) => {
                const isCompleted = completedScenarioIds.includes(scenario.id);
                const isUnlocked = unlockedScenarioIds.includes(scenario.id) || isCompleted;
                const isActive = scenario.id === activeScenarioId || (!isCompleted && isUnlocked);

                // Alternating path offset
                const offsetClass = nodeIdx % 2 === 0 ? '-translate-x-4 sm:-translate-x-12' : 'translate-x-4 sm:translate-x-12';

                return (
                  <motion.div
                    key={scenario.id}
                    whileHover={{ scale: isUnlocked ? 1.03 : 1 }}
                    className={`relative flex flex-col items-center ${offsetClass}`}
                  >
                    
                    {/* Active Magpie Character Badge on Current Node */}
                    {isActive && (
                      <motion.div
                        animate={{ y: [-6, 0, -6] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="mb-2 flex flex-col items-center z-20"
                      >
                        <div className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-lg border border-amber-300 mb-1 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 fill-slate-950" />
                          <span>{userState.magpie.name} Is Ready!</span>
                        </div>
                        <div className="w-14 h-14">
                          <MagpieCharacter
                            bodyColor={userState.magpie.bodyColor}
                            featherStyle={userState.magpie.featherStyle}
                            accessory={userState.magpie.accessory}
                            level={userState.magpie.level}
                            size="sm"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Node Circle Button */}
                    <button
                      onClick={() => isUnlocked && onSelectScenario(scenario)}
                      disabled={!isUnlocked}
                      className={`relative w-20 h-20 rounded-full flex items-center justify-center font-black transition-all shadow-xl ${
                        isCompleted
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white ring-4 ring-emerald-200'
                          : isActive
                          ? 'bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-500 text-slate-950 ring-8 ring-amber-400/30 animate-pulse'
                          : isUnlocked
                          ? 'bg-gradient-to-br from-purple-700 to-indigo-800 text-white ring-4 ring-purple-200'
                          : 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-9 h-9 stroke-[3]" />
                      ) : isActive ? (
                        <Play className="w-9 h-9 fill-slate-950 ml-1" />
                      ) : isUnlocked ? (
                        <Play className="w-8 h-8 fill-white ml-0.5" />
                      ) : (
                        <Lock className="w-7 h-7 text-slate-400" />
                      )}

                      {/* Difficulty Star Rating */}
                      <div className="absolute -bottom-2 bg-slate-900 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-700 flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>+{scenario.xpReward} XP</span>
                      </div>
                    </button>

                    {/* Scenario Title Card below Node */}
                    <div
                      onClick={() => isUnlocked && onSelectScenario(scenario)}
                      className={`mt-4 p-4 rounded-2xl border text-center max-w-xs transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white border-amber-400 shadow-xl ring-2 ring-amber-400/20'
                          : isUnlocked
                          ? 'bg-white border-slate-200/90 shadow-md hover:border-purple-300'
                          : 'bg-slate-50 border-slate-200 text-slate-400 opacity-70'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <span className="text-[10px] font-extrabold uppercase text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                          {scenario.department}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {scenario.estimatedTime}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-slate-900 text-sm leading-snug">
                        {scenario.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {scenario.description}
                      </p>

                      {isCompleted && (
                        <div className="mt-2 text-[10px] font-bold text-emerald-600 flex items-center justify-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>Completed • Score 8/10</span>
                        </div>
                      )}

                      {isActive && (
                        <button
                          onClick={() => onSelectScenario(scenario)}
                          className="mt-3 w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                        >
                          <span>TAKE FLIGHT</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                  </motion.div>
                );
              })}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};
