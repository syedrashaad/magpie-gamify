import React from 'react';
import { UserState } from '../types';
import { Play, Sparkles, Flame, Trophy, TrendingUp, CheckCircle2 } from 'lucide-react';

interface TrainingViewProps {
  userState: UserState;
  onStartScenario: () => void;
}

export const TrainingView: React.FC<TrainingViewProps> = ({
  userState,
  onStartScenario,
}) => {
  const skills = [
    { name: 'Empathy', score: userState.skills.empathy, color: 'from-purple-600 to-indigo-600', note: 'Strong guest validation' },
    { name: 'Communication', score: userState.skills.communication, color: 'from-blue-600 to-cyan-600', note: '+14% recent improvement!' },
    { name: 'Ownership', score: userState.skills.ownership, color: 'from-emerald-600 to-teal-600', note: 'Direct billing hold authority' },
    { name: 'Problem Solving', score: userState.skills.problemSolving, color: 'from-amber-500 to-yellow-500', note: 'Top 5% in Sandalwood Grand' },
  ];

  const history = [
    {
      id: 'sc-3',
      date: 'Today',
      scenario: 'Wrong Charges at Checkout (Mr. Iyer)',
      score: 82,
      prevScore: 60,
      feedback: 'Excellent empathy and direct hold credit refund.',
      rewards: '+20 XP, +3 Food 🍎, +2 Feathers 🪶',
      status: 'Personal Best! 🎉',
    },
    {
      id: 'sc-1',
      date: 'Yesterday',
      scenario: 'Welcome a VIP Guest (Mrs. Kapoor)',
      score: 90,
      prevScore: 80,
      feedback: 'Warm loyalty greeting and instant lounge invitation.',
      rewards: '+10 XP, +2 Food 🍎',
      status: 'Mastered',
    },
    {
      id: 'sc-5',
      date: '3 days ago',
      scenario: 'Late Night Check-In Protocol (Ms. Vance)',
      score: 78,
      prevScore: 78,
      feedback: 'Proactive room assignment during late night audit.',
      rewards: '+20 XP, +2 Food 🍎',
      status: 'Completed',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
              Analytics & Practice Log
            </span>
          </div>
          <h1 className="font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Training Dashboard
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
            Track your hospitality skill evolution, practice history, and performance benchmarks.
          </p>
        </div>

        <button
          onClick={onStartScenario}
          className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-2xs transition-all flex items-center justify-center gap-2 self-start sm:self-auto shrink-0"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>START PRACTICE</span>
        </button>
      </div>

      {/* Stat Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
          <span className="block text-[10px] font-bold uppercase text-slate-400">Journey Progress</span>
          <span className="text-2xl font-extrabold text-purple-700 mt-1 block">82%</span>
          <span className="text-[11px] text-slate-500 font-semibold">Front Office Path</span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
          <span className="block text-[10px] font-bold uppercase text-slate-400">Total XP</span>
          <span className="text-2xl font-extrabold text-slate-900 mt-1 block">{userState.xp} XP</span>
          <span className="text-[11px] text-purple-700 font-semibold">Level {userState.magpie.level} Companion</span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
          <span className="block text-[10px] font-bold uppercase text-slate-400">Daily Streak</span>
          <span className="text-2xl font-extrabold text-amber-600 mt-1 block">🔥 {userState.streak} Days</span>
          <span className="text-[11px] text-slate-500 font-semibold">Active Streak</span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
          <span className="block text-[10px] font-bold uppercase text-slate-400">Average Score</span>
          <span className="text-2xl font-extrabold text-emerald-600 mt-1 block">82 / 100</span>
          <span className="text-[11px] text-emerald-600 font-semibold">+14% recent improvement</span>
        </div>
      </div>

      {/* Hospitality Skill Ratings */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Hospitality Skill Ratings
            </h3>
            <p className="text-xs text-slate-500">
              Evaluated across empathy, communication, ownership, and problem solving
            </p>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md">
            Live Assessment
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-2 bg-slate-50/70 border border-slate-200/80 p-4 rounded-xl">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-900">{skill.name}</span>
                <span className="text-purple-700 font-extrabold">{skill.score} / 100</span>
              </div>

              {/* Progress Track */}
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                  style={{ width: `${skill.score}%` }}
                />
              </div>

              <span className="block text-[10px] text-slate-500 font-medium">
                {skill.note}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Practice Log */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base">
          Recent Practice Log
        </h3>

        <div className="divide-y divide-slate-100">
          {history.map((item) => (
            <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">{item.date}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-900">
                    {item.status}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{item.scenario}</h4>
                <p className="text-xs text-slate-500">"{item.feedback}"</p>
              </div>

              <div className="flex items-center gap-6 self-start sm:self-auto">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Score</div>
                  <div className="text-sm font-bold text-slate-900">
                    <span className="line-through text-slate-400 text-xs mr-1">{item.prevScore}</span>
                    <span className="text-purple-700 font-extrabold">{item.score}/100</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Rewards</div>
                  <div className="text-xs font-bold text-emerald-700">{item.rewards}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
