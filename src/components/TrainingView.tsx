import React from 'react';
import { UserState } from '../types';
import { Play, Sparkles, Flame, Trophy, TrendingUp, CheckCircle2, Target, ArrowRight } from 'lucide-react';

interface TrainingViewProps {
  userState: UserState;
  onStartScenario: (scenarioId?: string) => void;
}

export const TrainingView: React.FC<TrainingViewProps> = ({
  userState,
  onStartScenario,
}) => {
  const skills = [
    { name: 'Empathy', score: userState.skills.empathy || 82, color: 'from-purple-500 to-indigo-600', note: 'Strong guest validation in billing disputes' },
    { name: 'Communication', score: userState.skills.communication || 76, color: 'from-sky-500 to-blue-600', note: '+14% recent improvement!' },
    { name: 'Problem Solving', score: userState.skills.problemSolving || 91, color: 'from-emerald-500 to-teal-600', note: `Top 5% in ${userState.property}` },
    { name: 'Guest Focus', score: 88, color: 'from-amber-400 to-amber-500', note: 'Consistently high rating' },
  ];

  const history = [
    {
      id: 'sc-3',
      date: 'Today',
      scenario: 'Wrong Charges at Checkout (Mr. Iyer)',
      score: 82,
      prevScore: 68,
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

  const recommendedPractices = [
    {
      id: 'sc-3',
      title: 'Wrong Charges at Checkout',
      skillFocus: 'Empathy & De-escalation',
      estTime: '3 min',
      xp: '+20 XP',
      reason: 'Recommended to boost your Empathy rating back to 90+',
    },
    {
      id: 'sc-4',
      title: 'Handle an Angry VIP Guest',
      skillFocus: 'Problem Solving',
      estTime: '4 min',
      xp: '+20 XP',
      reason: 'Recommended for handling a guest room relocation request.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-sky-800 bg-sky-100 px-3 py-0.5 rounded-full">
              Overall Performance & Analytics
            </span>
          </div>
          <h1 className="font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Training Dashboard
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
            Empirical skill ratings, practice history, and personalized recommendations for {userState.property}.
          </p>
        </div>

        <button
          onClick={() => onStartScenario('sc-3')}
          className="px-5 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 self-start sm:self-auto shrink-0 border border-amber-300"
        >
          <Play className="w-4 h-4 fill-slate-950 text-slate-950" />
          <span>START RECOMMENDED PRACTICE</span>
        </button>
      </div>

      {/* Stat Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white/90 border-2 border-sky-100 rounded-3xl p-4 shadow-sm">
          <span className="block text-[10px] font-bold uppercase text-slate-400">Journey Mastery</span>
          <span className="text-2xl font-black text-sky-800 mt-1 block">82%</span>
          <span className="text-[11px] text-slate-600 font-semibold">Front Office Path</span>
        </div>

        <div className="bg-white/90 border-2 border-sky-100 rounded-3xl p-4 shadow-sm">
          <span className="block text-[10px] font-bold uppercase text-slate-400">Total XP</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">{userState.xp} XP</span>
          <span className="text-[11px] text-sky-800 font-bold">Level {userState.magpie.level} Companion</span>
        </div>

        <div className="bg-white/90 border-2 border-sky-100 rounded-3xl p-4 shadow-sm">
          <span className="block text-[10px] font-bold uppercase text-slate-400">Daily Streak</span>
          <span className="text-2xl font-black text-amber-600 mt-1 block">🔥 {userState.streak} Days</span>
          <span className="text-[11px] text-slate-600 font-semibold">Active Streak</span>
        </div>

        <div className="bg-white/90 border-2 border-sky-100 rounded-3xl p-4 shadow-sm">
          <span className="block text-[10px] font-bold uppercase text-slate-400">Average Score</span>
          <span className="text-2xl font-black text-emerald-600 mt-1 block">82 / 100</span>
          <span className="text-[11px] text-emerald-600 font-bold">+14% recent boost</span>
        </div>
      </div>

      {/* Overall Performance Skill Breakdown */}
      <div className="bg-white/90 border-2 border-sky-100 rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-sky-100 pb-4">
          <div>
            <h3 className="font-black text-slate-900 text-base">
              Overall Performance Ratings
            </h3>
            <p className="text-xs text-slate-500 font-semibold">
              Evaluated across core 5-star hospitality competence pillars
            </p>
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider text-sky-800 bg-sky-100 px-3 py-1 rounded-full">
            Live Assessment
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-2 bg-sky-50/50 border border-sky-100 p-4 rounded-2xl">
              <div className="flex justify-between items-center text-xs font-black">
                <span className="text-slate-900">{skill.name}</span>
                <span className="text-sky-800">{skill.score} / 100</span>
              </div>

              {/* Progress Track */}
              <div className="w-full h-2.5 bg-sky-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                  style={{ width: `${skill.score}%` }}
                />
              </div>

              <span className="block text-[10px] text-slate-600 font-bold">
                {skill.note}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Practice Section */}
      <div className="bg-white/90 border-2 border-amber-300 rounded-3xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-amber-600 fill-amber-400" />
          <h3 className="font-black text-slate-900 text-base">Recommended Practice</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recommendedPractices.map((rec) => (
            <div key={rec.id} className="p-4 rounded-2xl border-2 border-amber-300 bg-amber-50/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-amber-950 uppercase bg-amber-400 px-2.5 py-0.5 rounded-full">
                  {rec.skillFocus}
                </span>
                <span className="text-xs font-black text-amber-800">{rec.xp}</span>
              </div>
              <h4 className="font-black text-slate-900 text-sm">{rec.title}</h4>
              <p className="text-xs text-slate-700 font-medium">{rec.reason}</p>
              <button
                onClick={() => onStartScenario(rec.id)}
                className="w-full py-3 mt-1 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-1.5 border border-amber-300"
              >
                <span>Practice Now</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Practice Log */}
      <div className="bg-white/90 border-2 border-sky-100 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="font-black text-slate-900 text-base">
          Recent Practice Log
        </h3>

        <div className="divide-y divide-sky-100">
          {history.map((item) => (
            <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">{item.date}</span>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-900">
                    {item.status}
                  </span>
                </div>
                <h4 className="font-black text-slate-900 text-sm">{item.scenario}</h4>
                <p className="text-xs text-slate-600 font-medium">"{item.feedback}"</p>
              </div>

              <div className="flex items-center gap-6 self-start sm:self-auto">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Score</div>
                  <div className="text-sm font-bold text-slate-900">
                    <span className="line-through text-slate-400 text-xs mr-1">{item.prevScore}</span>
                    <span className="text-sky-800 font-black">{item.score}/100</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Rewards</div>
                  <div className="text-xs font-black text-emerald-700">{item.rewards}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
