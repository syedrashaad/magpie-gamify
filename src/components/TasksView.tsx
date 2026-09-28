import React from 'react';
import { motion } from 'framer-motion';
import { UserState } from '../types';
import { DEMO_UNITS, ScenarioData, NodeType } from '../data/scenarios';
import { MagpieCharacter } from './MagpieCharacter';
import { Check, Lock, Play, Star, Flame, Sparkles, ArrowRight } from 'lucide-react';

interface TasksViewProps {
  userState: UserState;
  unlockedScenarioIds: string[];
  completedScenarioIds: string[];
  activeScenarioId: string;
  onSelectScenario: (scenario: ScenarioData) => void;
  onOpenFlightGame?: () => void;
}

export const TasksView: React.FC<TasksViewProps> = ({
  userState,
  unlockedScenarioIds,
  completedScenarioIds,
  activeScenarioId,
  onSelectScenario,
  onOpenFlightGame,
}) => {
  const getNodeIcon = (type: NodeType, isCompleted: boolean, isActive: boolean) => {
    if (isCompleted) return <Check className="w-5 h-5 stroke-[3]" />;
    if (isActive) return <Play className="w-6 h-6 fill-slate-950 ml-0.5" />;
    switch (type) {
      case 'ROLEPLAY':
        return '🎙';
      case 'CHALLENGE':
        return '⭐';
      case 'COACH_PRACTICE':
        return '🐦';
      case 'REVIEW':
        return '↻';
      default:
        return <Play className="w-5 h-5 fill-white ml-0.5" />;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-4 space-y-6">
      
      {/* Top Mobile Bar */}
      <div className="flex items-center justify-between bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-xs">
        <div>
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            {userState.property}
          </div>
          <h2 className="font-serif font-bold text-base text-slate-900 leading-tight">
            GOOD AFTERNOON, {userState.name.split(' ')[0].toUpperCase()}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Streak Badge */}
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-900 px-2.5 py-1 rounded-xl text-xs font-bold shadow-2xs">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{userState.streak}d</span>
          </div>

          {/* XP Pill */}
          <div className="flex items-center gap-1 bg-purple-50 border border-purple-200 text-purple-900 px-2.5 py-1 rounded-xl text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>{userState.xp} XP</span>
          </div>
        </div>
      </div>

      {/* Today's Goal Progress Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-600 uppercase tracking-wider text-[10px]">Today's Goal</span>
          <span className="text-purple-700 font-extrabold">
            {userState.dailyGoal.currentXP} / {userState.dailyGoal.targetXP} XP
          </span>
        </div>

        <div className="relative w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((userState.dailyGoal.currentXP / userState.dailyGoal.targetXP) * 100, 100)}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-inner"
          />
        </div>
      </div>

      {/* Optional Personal Flight Celebration Pill */}
      {onOpenFlightGame && (
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-semibold text-amber-900">
            <span>🪽</span>
            <span>Personal Best Flight: <strong>{userState.flight.personalBest}m</strong></span>
          </div>
          <button
            onClick={onOpenFlightGame}
            className="px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] shadow-2xs transition-all"
          >
            FLY
          </button>
        </div>
      )}

      {/* Learning Path Header */}
      <div className="flex items-center justify-between pt-2">
        <h3 className="font-serif font-bold text-lg text-slate-900 tracking-tight">
          YOUR JOURNEY
        </h3>
        <span className="text-[11px] font-semibold text-slate-500">
          Step-by-step hospitality scenarios
        </span>
      </div>

      {/* Vertical Learning Path */}
      <div className="space-y-8 relative pb-8">
        
        {/* Path Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-1 bg-gradient-to-b from-purple-600 via-indigo-600 to-slate-200 rounded-full z-0 opacity-40" />

        {DEMO_UNITS.map((unit) => (
          <div key={unit.id} className="relative z-10 space-y-5">
            
            {/* Unit Header Pill */}
            <div className="bg-white border border-slate-200/90 shadow-xs rounded-xl p-3.5 text-center max-w-xs mx-auto border-l-4 border-l-purple-600">
              <span className="text-[9px] font-black uppercase tracking-widest text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">
                {unit.number}
              </span>
              <h4 className="font-serif font-bold text-sm text-slate-900 mt-1 leading-snug">
                {unit.title}
              </h4>
              <p className="text-[10px] text-slate-500 mt-0.5">
                {unit.description}
              </p>
            </div>

            {/* Path Nodes */}
            <div className="space-y-6 flex flex-col items-center">
              {unit.scenarios.map((scenario, nodeIdx) => {
                const isCompleted = completedScenarioIds.includes(scenario.id);
                const isUnlocked = unlockedScenarioIds.includes(scenario.id) || isCompleted;
                const isActive = scenario.id === activeScenarioId || (!isCompleted && isUnlocked);

                // Alternating path offset for natural Duolingo feel
                const offsetClass = nodeIdx % 2 === 0 ? '-translate-x-4' : 'translate-x-4';

                return (
                  <div key={scenario.id} className={`relative flex flex-col items-center ${offsetClass}`}>
                    
                    {/* Small Companion Nova on Active Node */}
                    {isActive && (
                      <motion.div
                        animate={{ y: [-4, 0, -4] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                        className="mb-1 flex flex-col items-center z-20"
                      >
                        <div className="bg-amber-400 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-full shadow-md border border-amber-300 mb-0.5 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 fill-slate-950" />
                          <span>{userState.magpie.name} is ready!</span>
                        </div>
                        <div className="w-10 h-10">
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
                      className={`relative w-16 h-16 rounded-full flex items-center justify-center font-black transition-all shadow-md ${
                        isCompleted
                          ? 'bg-emerald-500 text-white ring-4 ring-emerald-100'
                          : isActive
                          ? 'bg-amber-400 text-slate-950 ring-6 ring-amber-400/30 animate-pulse'
                          : isUnlocked
                          ? 'bg-purple-700 text-white ring-4 ring-purple-100'
                          : 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed'
                      }`}
                    >
                      {getNodeIcon(scenario.nodeType, isCompleted, isActive)}

                      {/* XP Badge */}
                      <div className="absolute -bottom-2 bg-slate-900 text-amber-300 text-[9px] font-bold px-2 py-0.2 rounded-full border border-slate-700 shadow-xs whitespace-nowrap">
                        +{scenario.xpReward} XP
                      </div>
                    </button>

                    {/* Active Scenario Focused Card */}
                    {isActive ? (
                      <div className="mt-3 p-4 rounded-2xl bg-white border border-amber-400 shadow-lg ring-2 ring-amber-400/20 text-center max-w-xs space-y-2">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-[9px] font-black uppercase text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                            {scenario.department}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400">
                            {scenario.estimatedTime}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-slate-900 text-sm leading-snug">
                          {scenario.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2">
                          {scenario.description}
                        </p>

                        <button
                          onClick={() => onSelectScenario(scenario)}
                          className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-black text-xs shadow-md hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                        >
                          <span>CONTINUE +{scenario.xpReward} XP</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => isUnlocked && onSelectScenario(scenario)}
                        className={`mt-2 p-2.5 rounded-xl border text-center max-w-[200px] transition-all cursor-pointer ${
                          isCompleted
                            ? 'bg-white border-slate-200/80 shadow-2xs'
                            : isUnlocked
                            ? 'bg-white border-slate-200 shadow-xs'
                            : 'bg-slate-50 border-slate-200 opacity-60'
                        }`}
                      >
                        <h5 className="font-bold text-slate-800 text-xs truncate">
                          {scenario.title}
                        </h5>
                        {isCompleted && (
                          <span className="text-[9px] font-bold text-emerald-600 flex items-center justify-center gap-0.5 mt-0.5">
                            <Check className="w-2.5 h-2.5" />
                            <span>Done • Score 8/10</span>
                          </span>
                        )}
                        {!isUnlocked && (
                          <span className="text-[9px] font-medium text-slate-400 flex items-center justify-center gap-1 mt-0.5">
                            <Lock className="w-2.5 h-2.5" />
                            <span>Locked</span>
                          </span>
                        )}
                      </div>
                    )}

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
