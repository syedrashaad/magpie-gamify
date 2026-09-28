import React from 'react';
import { UserState } from '../types';
import { TrendingUp, Award, CheckCircle2, Star, Play, Sparkles, BarChart2 } from 'lucide-react';

interface TrainingViewProps {
  userState: UserState;
  onStartScenario: () => void;
}

export const TrainingView: React.FC<TrainingViewProps> = ({
  userState,
  onStartScenario,
}) => {
  const skills = [
    { name: 'Empathy', score: 82, color: 'from-purple-600 to-indigo-600', note: 'Strong guest validation' },
    { name: 'Communication', score: 76, color: 'from-blue-600 to-cyan-600', note: '+14% recent improvement!' },
    { name: 'Problem Solving', score: 91, color: 'from-emerald-600 to-teal-600', note: 'Top 5% in Sandalwood Grand' },
    { name: 'Guest Focus', score: 88, color: 'from-amber-500 to-yellow-500', note: 'Consistently high rating' },
  ];

  const history = [
    {
      id: 'sc-3',
      date: 'Today',
      scenario: 'Wrong Charges at Checkout (Mr. Iyer)',
      score: 82,
      prevScore: 60,
      feedback: 'Excellent empathy and direct hold credit refund.',
      rewards: '+3 Food 🍎, +2 Feathers 🪶, +1 Egg 🥚',
      status: 'New Personal Best! 🎉',
    },
    {
      id: 'sc-1',
      date: 'Yesterday',
      scenario: 'Welcome a VIP Guest (Mrs. Kapoor)',
      score: 90,
      prevScore: 80,
      feedback: 'Warm loyalty greeting and instant lounge invitation.',
      rewards: '+2 Food 🍎, +1 Feather 🪶',
      status: 'Mastered',
    },
    {
      id: 'sc-5',
      date: '3 days ago',
      scenario: 'Late Night Check-In Protocol (Ms. Vance)',
      score: 78,
      prevScore: 78,
      feedback: 'Proactive room assignment during late night audit.',
      rewards: '+2 Food 🍎',
      status: 'Completed',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black uppercase tracking-wider bg-purple-100 text-purple-900 px-3 py-1 rounded-full border border-purple-200">
              PERFORMANCE ANALYTICS & MASTERY
            </span>
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Training Dashboard
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
            Empirical skill ratings, score trends, and learning metrics
          </p>
        </div>

        <button
          onClick={onStartScenario}
          className="px-6 py-3.5 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 self-start"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>NEW PRACTICE FLIGHT</span>
        </button>
      </div>

      {/* Overview Stat Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="block text-[10px] font-bold uppercase text-slate-500">Overall Progress</span>
          <span className="text-3xl font-serif font-bold text-purple-700">72%</span>
          <span className="block text-[11px] text-emerald-600 font-semibold mt-1">Hospitality Path</span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="block text-[10px] font-bold uppercase text-slate-500">Total XP</span>
          <span className="text-3xl font-serif font-bold text-amber-600">{userState.flight.power || 840} XP</span>
          <span className="block text-[11px] text-amber-700 font-semibold mt-1">Level {userState.magpie.level} Companion</span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="block text-[10px] font-bold uppercase text-slate-500">Daily Streak</span>
          <span className="text-3xl font-serif font-bold text-slate-900">🔥 {userState.flightDays} Days</span>
          <span className="block text-[11px] text-purple-700 font-semibold mt-1">Consistency Streak</span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="block text-[10px] font-bold uppercase text-slate-500">Average Score</span>
          <span className="text-3xl font-serif font-bold text-emerald-600">82 / 100</span>
          <span className="block text-[11px] text-emerald-600 font-semibold mt-1">+14% recent boost</span>
        </div>
      </div>

      {/* Skills Rating Breakdown */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-serif font-bold text-xl text-slate-900">
              Hospitality Skill Ratings
            </h3>
            <p className="text-xs text-slate-500">
              Evaluated across empathy, communication, ownership, and problem solving
            </p>
          </div>
          <span className="text-xs font-extrabold uppercase bg-purple-100 text-purple-900 px-3 py-1 rounded-full">
            Live Assessment
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-2 bg-slate-50 border border-slate-200/80 p-4 rounded-2xl">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-900 text-sm">{skill.name}</span>
                <span className="font-serif text-lg text-purple-700 font-bold">{skill.score} / 100</span>
              </div>

              {/* Progress Track */}
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                  style={{ width: `${skill.score}%` }}
                />
              </div>

              <span className="block text-[10px] text-slate-500 font-medium italic">
                {skill.note}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Flight History Table */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
        <h3 className="font-serif font-bold text-xl text-slate-900">
          Recent Scenario Flights
        </h3>

        <div className="divide-y divide-slate-100">
          {history.map((item) => (
            <div key={item.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">{item.date}</span>
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900">
                    {item.status}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{item.scenario}</h4>
                <p className="text-xs text-slate-500 italic">"{item.feedback}"</p>
              </div>

              <div className="flex items-center gap-6 self-start md:self-auto">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Score</div>
                  <div className="text-base font-bold text-slate-900">
                    <span className="line-through text-slate-400 text-xs mr-1">{item.prevScore}</span>
                    <span className="text-purple-700 font-serif text-lg">{item.score}/100</span>
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
