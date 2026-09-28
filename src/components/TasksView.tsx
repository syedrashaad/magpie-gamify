import React from 'react';
import { motion } from 'framer-motion';
import { UserState } from '../types';
import { DEMO_UNITS, ScenarioData, NodeType } from '../data/scenarios';
import { MagpieCharacter } from './MagpieCharacter';
import { Check, Lock, Play, ArrowRight, Sparkles } from 'lucide-react';

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
    <div className="max-w-3xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div>
        <h1 className="font-serif font-bold text-3xl text-slate-900 tracking-tight">
          Tasks
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Continue your hospitality journey. Complete scenarios to improve skills and earn XP.
        </p>
      </div>

      {/* Units List */}
      <div className="space-y-12 relative pb-12">
        
        {/* Connecting Path Line */}
        <div className="absolute left-7 top-10 bottom-10 w-0.5 bg-slate-200 z-0" />

        {DEMO_UNITS.map((unit) => (
          <div key={unit.id} className="relative z-10 space-y-6">
            
            {/* Unit Header Block */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs border-l-4 border-l-purple-600">
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                {unit.number}
              </span>
              <h2 className="font-serif font-bold text-lg text-slate-900 mt-1">
                {unit.title}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {unit.description}
              </p>
            </div>

            {/* Nodes */}
            <div className="space-y-6">
              {unit.scenarios.map((scenario) => {
                const isCompleted = completedScenarioIds.includes(scenario.id);
                const isUnlocked = unlockedScenarioIds.includes(scenario.id) || isCompleted;
                const isActive = scenario.id === activeScenarioId || (!isCompleted && isUnlocked);

                return (
                  <div key={scenario.id} className="flex items-start gap-5">
                    
                    {/* Circle Node Icon */}
                    <button
                      onClick={() => isUnlocked && onSelectScenario(scenario)}
                      disabled={!isUnlocked}
                      className={`w-14 h-14 rounded-full flex items-center justify-center font-bold shrink-0 transition-all shadow-xs ${
                        isCompleted
                          ? 'bg-emerald-500 text-white ring-4 ring-emerald-100'
                          : isActive
                          ? 'bg-slate-900 text-white ring-4 ring-purple-300 animate-pulse'
                          : isUnlocked
                          ? 'bg-purple-700 text-white ring-4 ring-purple-100'
                          : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-6 h-6 stroke-[3]" />
                      ) : isActive ? (
                        <Play className="w-6 h-6 fill-white ml-0.5" />
                      ) : isUnlocked ? (
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      ) : (
                        <Lock className="w-5 h-5 text-slate-400" />
                      )}
                    </button>

                    {/* Scenario Card Block */}
                    <div className="flex-1">
                      {isActive ? (
                        /* Current Active Scenario Hero Block */
                        <div className="bg-white border border-purple-300 rounded-2xl p-5 shadow-md space-y-3 relative overflow-hidden">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                                {scenario.department}
                              </span>
                              <span className="text-xs text-slate-400 font-medium">
                                {scenario.estimatedTime}
                              </span>
                            </div>
                            <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-full">
                              +{scenario.xpReward} XP
                            </span>
                          </div>

                          <div>
                            <h3 className="font-serif font-bold text-slate-900 text-lg">
                              {scenario.title}
                            </h3>
                            <p className="text-xs text-slate-600 mt-1">
                              {scenario.description}
                            </p>
                          </div>

                          {/* Companion Nova Speech Note */}
                          <div className="flex items-center gap-3 bg-purple-50/70 border border-purple-200/60 p-3 rounded-xl text-xs font-medium text-slate-800">
                            <div className="w-8 h-8 shrink-0">
                              <MagpieCharacter
                                bodyColor={userState.magpie.bodyColor}
                                featherStyle={userState.magpie.featherStyle}
                                accessory={userState.magpie.accessory}
                                level={userState.magpie.level}
                                size="sm"
                              />
                            </div>
                            <span>"{userState.magpie.name} is ready! Mr. Iyer is waiting at reception."</span>
                          </div>

                          <button
                            onClick={() => onSelectScenario(scenario)}
                            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2"
                          >
                            <span>CONTINUE</span>
                            <ArrowRight className="w-4 h-4 text-purple-400" />
                          </button>
                        </div>
                      ) : (
                        /* Standard Node Card */
                        <div
                          onClick={() => isUnlocked && onSelectScenario(scenario)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                            isCompleted
                              ? 'bg-white border-slate-200/90 shadow-2xs hover:border-slate-300'
                              : isUnlocked
                              ? 'bg-white border-slate-200 shadow-2xs hover:border-purple-300'
                              : 'bg-slate-50 border-slate-200 opacity-60'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-bold text-slate-900 text-sm">
                              {scenario.title}
                            </h4>
                            <span className="text-xs font-semibold text-slate-500">
                              +{scenario.xpReward} XP
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-1">
                            {scenario.description}
                          </p>

                          {isCompleted && (
                            <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-2">
                              <Check className="w-3.5 h-3.5" />
                              <span>Completed • Score 8/10</span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};
