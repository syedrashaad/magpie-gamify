import React from 'react';
import { UserState } from '../types';
import { TrendingUp, Award, CheckCircle2, Star, Play, Sparkles } from 'lucide-react';

interface MyTrainingViewProps {
  userState: UserState;
  onStartScenario: () => void;
}

export const MyTrainingView: React.FC<MyTrainingViewProps> = ({
  userState,
  onStartScenario,
}) => {
  const history = [
    {
      id: 'sc-1',
      date: 'Today',
      scenario: 'Wrong Charges at Checkout (Mr. Iyer)',
      score: 8,
      prevScore: 6,
      feedback: 'Excellent empathy and rapid folio credit resolution.',
      rewards: '+3 Food, +2 Feathers, +1 Egg',
      status: 'New Personal Best! 🎉',
    },
    {
      id: 'sc-2',
      date: 'Yesterday',
      scenario: 'VIP Guest Arrival & Room Upgrade Handover',
      score: 7,
      prevScore: 5,
      feedback: 'Good warm greeting; ensure lounge pass rules are stated clearly.',
      rewards: '+2 Food, +1 Feather',
      status: 'Improved',
    },
    {
      id: 'sc-3',
      date: '3 days ago',
      scenario: 'Handling Overbooked Deluxe Suite Escalation',
      score: 6,
      prevScore: 6,
      feedback: 'Solid composure during heated guest conversation.',
      rewards: '+2 Food',
      status: 'Completed',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded-full border border-purple-200">
              Training Analytics & Mastery
            </span>
          </div>
          <h1 className="font-serif font-bold text-3xl text-slate-900">
            My Training History
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Empirical score progression, Magpie rewards breakdown, and feedback
          </p>
        </div>

        <button
          onClick={onStartScenario}
          className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 self-start"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>NEW PRACTICE FLIGHT</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <span className="block text-[10px] font-bold uppercase text-slate-500">Current Score</span>
          <span className="text-3xl font-serif font-bold text-purple-700">8 / 10</span>
          <span className="block text-[11px] text-emerald-600 font-semibold mt-1">+20% from last attempt</span>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <span className="block text-[10px] font-bold uppercase text-slate-500">Flight Distance</span>
          <span className="text-3xl font-serif font-bold text-amber-600">112m</span>
          <span className="block text-[11px] text-amber-700 font-semibold mt-1">Boost Lane position</span>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <span className="block text-[10px] font-bold uppercase text-slate-500">Scenarios Completed</span>
          <span className="text-3xl font-serif font-bold text-slate-900">14</span>
          <span className="block text-[11px] text-purple-700 font-semibold mt-1">Sandalwood Grand BLR</span>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <span className="block text-[10px] font-bold uppercase text-slate-500">Flight Days</span>
          <span className="text-3xl font-serif font-bold text-emerald-600">5 Days</span>
          <span className="block text-[11px] text-slate-500 font-medium mt-1">Consistent learning loop</span>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="font-serif font-bold text-lg text-slate-900">
          Recent Scenario Flights
        </h3>

        <div className="divide-y divide-slate-100">
          {history.map((item) => (
            <div key={item.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">{item.date}</span>
                  <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-purple-100 text-purple-900">
                    {item.status}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{item.scenario}</h4>
                <p className="text-xs text-slate-500 italic">"{item.feedback}"</p>
              </div>

              <div className="flex items-center gap-6 self-start md:self-auto">
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-medium">Score</div>
                  <div className="text-base font-bold text-slate-900">
                    <span className="line-through text-slate-400 text-xs mr-1">{item.prevScore}</span>
                    <span className="text-purple-700 font-serif text-lg">{item.score}/10</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400 font-medium">Rewards</div>
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
