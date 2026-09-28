import React from 'react';
import { UserState, SkyLeagueMember } from '../types';
import { Trophy, Flame, Sparkles, Zap, ArrowUpRight, Play, CheckCircle2 } from 'lucide-react';
import { MagpieCharacter } from './MagpieCharacter';

interface SkyLeagueViewProps {
  userState: UserState;
  leaderboard: SkyLeagueMember[];
  onOpenFlightChallenge: () => void;
  justOvertook?: boolean;
}

export const SkyLeagueView: React.FC<SkyLeagueViewProps> = ({
  userState,
  leaderboard,
  onOpenFlightChallenge,
  justOvertook = false,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
              Organisation Leaderboard • Sandalwood Grand
            </span>
          </div>
          <h1 className="font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Sky League Rankings
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
            Compete with associate colleagues at The Sandalwood Grand. Boost Flight Power through scenario mastery.
          </p>
        </div>

        <button
          onClick={onOpenFlightChallenge}
          className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-2xs transition-all flex items-center justify-center gap-2 self-start sm:self-auto shrink-0"
        >
          <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>FLIGHT CHALLENGE (+8 FP)</span>
        </button>
      </div>

      {/* Overtake Alert Banner (if user recently overtook an associate) */}
      {justOvertook && (
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-5 rounded-2xl border border-purple-400/40 shadow-md flex items-center justify-between gap-4 animate-bounce">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-black text-xl flex items-center justify-center">
              🚀
            </div>
            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wide">LEADERBOARD OVERTAKE!</span>
              <h4 className="font-bold text-base text-white">
                You passed Arjun Verma! You are now #3 in Sandalwood Grand!
              </h4>
            </div>
          </div>
          <span className="text-xs font-bold bg-amber-400 text-slate-950 px-3 py-1.5 rounded-xl shrink-0">
            +#3 RANK BUMP
          </span>
        </div>
      )}

      {/* Sandalwood Grand Top 3 Flight Podium Track */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>Sandalwood Grand Top Associates</span>
          </h3>
          <span className="text-xs font-semibold text-slate-400">Weekly Sprint</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {leaderboard.slice(0, 3).map((member) => (
            <div
              key={member.id}
              className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 relative overflow-hidden ${
                member.isCurrentUser
                  ? 'bg-purple-50/70 border-purple-300 ring-2 ring-purple-200'
                  : 'bg-slate-50/70 border-slate-200/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`w-7 h-7 rounded-full text-xs font-extrabold flex items-center justify-center ${
                  member.rank === 1 ? 'bg-amber-400 text-slate-950' : member.rank === 2 ? 'bg-slate-300 text-slate-900' : 'bg-amber-700 text-white'
                }`}>
                  #{member.rank}
                </span>
                <span className="text-[11px] font-bold text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-md">
                  {member.flightPower} FP
                </span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <span>{member.name}</span>
                  {member.isCurrentUser && <span className="text-[10px] text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded font-bold">(You)</span>}
                </h4>
                <p className="text-xs text-slate-500">{member.role}</p>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60 font-semibold text-slate-700">
                <span className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{member.streak}d streak</span>
                </span>
                <span className="font-bold text-slate-900">{member.xp} XP</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Organisation Leaderboard Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">All Associates</h3>
          <span className="text-xs font-semibold text-slate-500">Property: Sandalwood Grand BLR</span>
        </div>

        <div className="divide-y divide-slate-100">
          {leaderboard.map((member) => (
            <div
              key={member.id}
              className={`p-4 px-6 flex items-center justify-between gap-4 transition-all ${
                member.isCurrentUser ? 'bg-purple-50/50' : 'hover:bg-slate-50/60'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                  member.rank <= 3 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  #{member.rank}
                </span>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span>{member.name}</span>
                    {member.isCurrentUser && (
                      <span className="text-[10px] bg-purple-700 text-white font-bold px-2 py-0.5 rounded-full">
                        YOU
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-500">{member.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Flight Power</span>
                  <span className="text-xs font-extrabold text-amber-600">{member.flightPower} FP</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Total XP</span>
                  <span className="text-xs font-bold text-slate-900">{member.xp} XP</span>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Streak</span>
                  <span className="text-xs font-semibold text-slate-700">🔥 {member.streak} days</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
