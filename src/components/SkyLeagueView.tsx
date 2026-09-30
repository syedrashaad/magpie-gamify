import React from 'react';
import { motion } from 'framer-motion';
import { UserState, SkyLeagueMember } from '../types';
import { Trophy, Flame, Sparkles, Zap, ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';
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
  // Sort leaderboard strictly by XP
  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.xp - a.xp).map((item, idx) => ({
    ...item,
    rank: idx + 1,
  }));

  const userMember = sortedLeaderboard.find((m) => m.isCurrentUser) || {
    id: 'usr-4',
    rank: 4,
    name: userState.name,
    role: userState.role,
    property: userState.property,
    xp: userState.xp,
    flightPower: userState.flightPower,
    streak: userState.streak,
    avatarColor: 'blue',
    isCurrentUser: true,
  };

  // Find person directly ahead of current user for social pressure prompt
  const userRankIdx = sortedLeaderboard.findIndex((m) => m.isCurrentUser);
  const personAhead = userRankIdx > 0 ? sortedLeaderboard[userRankIdx - 1] : null;
  const xpDifferenceAhead = personAhead ? personAhead.xp - userMember.xp : 0;

  // Max XP for track positioning math
  const maxXP = Math.max(...sortedLeaderboard.map((m) => m.xp), 1000);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
              The Sandalwood Grand · BLR · Week 39
            </span>
            <span className="text-xs font-semibold text-slate-400">•</span>
            <span className="text-xs font-extrabold text-amber-700">Rank #{userMember.rank} Position</span>
          </div>
          <h1 className="font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Sky League Race Track
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
            Live organisation flight race driven by training XP, scenario mastery & Flight Power boosts.
          </p>
        </div>

        <button
          onClick={onOpenFlightChallenge}
          className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-2xs transition-all flex items-center justify-center gap-2 self-start sm:self-auto shrink-0 border border-purple-400/30"
        >
          <Zap className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
          <span>FLIGHT REWARD CHALLENGE (+8 FP)</span>
        </button>
      </div>

      {/* OVERTAKE CELEBRATION ALERT BANNER */}
      {justOvertook && (
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-5 rounded-2xl border border-purple-400/40 shadow-md flex items-center justify-between gap-4 animate-bounce">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-black text-xl flex items-center justify-center">
              🚀
            </div>
            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wide">SKY LEAGUE OVERTAKE!</span>
              <h4 className="font-bold text-base text-white">
                You gained XP and bumped up on the Sandalwood Grand Leaderboard!
              </h4>
            </div>
          </div>
          <span className="text-xs font-bold bg-amber-400 text-slate-950 px-3 py-1.5 rounded-xl shrink-0">
            RANK UPDATED
          </span>
        </div>
      )}

      {/* SOCIAL PRESSURE OVERTAKE TARGET CALLOUT */}
      {personAhead && (
        <div className="bg-amber-50/90 border border-amber-200/90 p-4 px-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-base shrink-0">
              ⚔️
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800">
                OVERTAKE TARGET
              </span>
              <h4 className="font-bold text-slate-900 text-sm">
                {personAhead.name} ({personAhead.role}) is only <span className="text-amber-900 font-extrabold">{xpDifferenceAhead} XP ahead</span> of you!
              </h4>
              <p className="text-xs text-slate-600 font-medium">
                Complete 1 hospitality scenario (+20 XP) to overtake #{personAhead.rank} rank!
              </p>
            </div>
          </div>

          <button
            onClick={onOpenFlightChallenge}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-2xs transition-all flex items-center gap-1 shrink-0 self-end sm:self-auto"
          >
            <span>Activate Nitro Boost</span>
            <Zap className="w-3.5 h-3.5 fill-slate-950" />
          </button>
        </div>
      )}

      {/* VISUAL SKY RACE TRACK STAGE */}
      <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-purple-500/20 space-y-6 overflow-hidden relative">
        
        {/* Track Top Info */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span className="font-extrabold text-base tracking-tight">Sandalwood Grand Sky Race Track</span>
          </div>
          <span className="text-xs font-bold text-purple-300 bg-purple-900/60 border border-purple-700/50 px-3 py-1 rounded-full">
            Week 39 Live Circuit
          </span>
        </div>

        {/* CLOUD RACE LANES */}
        <div className="space-y-4 pt-2">
          {sortedLeaderboard.slice(0, 5).map((member) => {
            const trackPct = Math.min(Math.round((member.xp / maxXP) * 100), 92);
            const isUser = member.isCurrentUser;

            return (
              <div key={member.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold px-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full text-[10px] font-extrabold flex items-center justify-center ${
                      member.rank === 1 ? 'bg-amber-400 text-slate-950' : member.rank === 2 ? 'bg-slate-300 text-slate-950' : member.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-700 text-slate-300'
                    }`}>
                      #{member.rank}
                    </span>
                    <span className={isUser ? 'text-amber-300 font-extrabold' : 'text-slate-200'}>
                      {member.name} {isUser && '(YOU)'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">· {member.role}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-purple-300 font-extrabold">{member.xp} XP</span>
                    <span className="text-amber-400 text-[11px] font-bold">{member.flightPower} FP</span>
                  </div>
                </div>

                {/* Race Track Bar */}
                <div className="relative w-full h-10 bg-slate-800/80 rounded-2xl border border-white/10 overflow-hidden flex items-center p-1">
                  
                  {/* Track Finish Line Grid */}
                  <div className="absolute right-3 top-0 bottom-0 w-2 bg-[repeating-linear-gradient(45deg,#fff,#fff_4px,#000_4px,#000_8px)] opacity-40" />

                  {/* Filled Progress Runway */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${trackPct}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full rounded-xl transition-all ${
                      isUser
                        ? 'bg-gradient-to-r from-purple-600 via-indigo-500 to-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.5)]'
                        : member.rank === 1
                        ? 'bg-gradient-to-r from-purple-800 to-amber-500'
                        : 'bg-gradient-to-r from-slate-700 to-purple-800'
                    }`}
                  />

                  {/* GLIDING BIRD / AVATAR ON TRACK */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 transition-all duration-700"
                    style={{ left: `calc(${Math.max(trackPct, 4)}% - 18px)` }}
                  >
                    {isUser ? (
                      <div className="w-8 h-8 rounded-xl bg-slate-900 border-2 border-amber-400 flex items-center justify-center shadow-lg relative animate-pulse">
                        <MagpieCharacter
                          bodyColor={userState.magpie.bodyColor}
                          featherStyle={userState.magpie.featherStyle}
                          accessory={userState.magpie.accessory}
                          level={userState.magpie.level}
                          size="sm"
                        />
                        {/* Nitro Trail Glow */}
                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 text-amber-400 text-xs">
                          🔥
                        </div>
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-purple-900 border border-purple-300 flex items-center justify-center text-xs font-bold text-white shadow-md">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sandalwood Grand Top 3 Associates Cards */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>Top Podium Associates · Sandalwood Grand</span>
          </h3>
          <span className="text-xs font-semibold text-slate-400">Week 39 Standings</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {sortedLeaderboard.slice(0, 3).map((member) => (
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
                <span className="text-xs font-extrabold text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-md">
                  {member.xp} XP
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
                <span className="text-[11px] font-bold text-amber-600">{member.flightPower} FP Boost</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">All Sandalwood Grand Associates</h3>
          <span className="text-xs font-semibold text-slate-500">Ranked strictly by XP</span>
        </div>

        <div className="divide-y divide-slate-100">
          {sortedLeaderboard.map((member) => (
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
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Total XP</span>
                  <span className="text-sm font-extrabold text-purple-700">{member.xp} XP</span>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Flight Power</span>
                  <span className="text-xs font-bold text-amber-600">{member.flightPower} FP</span>
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
