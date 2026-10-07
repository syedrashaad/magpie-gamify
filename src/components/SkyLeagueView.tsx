import React from 'react';
import { motion } from 'framer-motion';
import { UserState, SkyLeagueMember } from '../types';
import { Trophy, Flame, Sparkles, Zap, ArrowRight, Star, ChevronUp, ShieldCheck } from 'lucide-react';
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

  const userRankIdx = sortedLeaderboard.findIndex((m) => m.isCurrentUser);
  const personAhead = userRankIdx > 0 ? sortedLeaderboard[userRankIdx - 1] : null;
  const xpDifferenceAhead = personAhead ? personAhead.xp - userMember.xp : 0;

  const maxXP = Math.max(...sortedLeaderboard.map((m) => m.xp), 1000);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-sky-800 bg-sky-100 px-3 py-0.5 rounded-full">
              The Sandalwood Grand · Week 39
            </span>
            <span className="text-xs font-semibold text-slate-400">•</span>
            <span className="text-xs font-black text-amber-700">Rank #{userMember.rank} Position</span>
          </div>
          <h1 className="font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Sky League
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
            Train, earn XP, and climb with your team.
          </p>
        </div>

        {/* Optional Secondary Action: Arcade Challenge */}
        <button
          onClick={onOpenFlightChallenge}
          className="px-4 py-2.5 rounded-2xl bg-white hover:bg-amber-50 text-slate-900 font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 self-start sm:self-auto shrink-0 border border-amber-300"
        >
          <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          <span>START FLIGHT CHALLENGE (+8 FP)</span>
        </button>
      </div>

      {/* OVERTAKE CELEBRATION ALERT BANNER */}
      {justOvertook && (
        <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 p-5 rounded-3xl border-2 border-white shadow-xl flex items-center justify-between gap-4 animate-bounce">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white font-black text-xl flex items-center justify-center">
              🪽
            </div>
            <div>
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider">YOU MOVED UP!</span>
              <h4 className="font-black text-base text-slate-900">
                You gained XP and climbed to #{userMember.rank} on the Sandalwood Grand Leaderboard!
              </h4>
            </div>
          </div>
          <span className="text-xs font-black bg-slate-900 text-white px-3.5 py-1.5 rounded-xl shrink-0 uppercase tracking-wider">
            RANK UPDATED
          </span>
        </div>
      )}

      {/* PROMINENT USER STANDING CARD & OVERTAKE TARGET */}
      <div className="bg-gradient-to-b from-sky-50 to-amber-50 border-2 border-amber-300 p-5 sm:p-6 rounded-3xl shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 text-amber-400 border-2 border-amber-400 flex items-center justify-center font-black text-2xl shadow-md shrink-0">
              #{userMember.rank}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-slate-950 bg-amber-400 px-2.5 py-0.5 rounded-full">
                  YOUR POSITION
                </span>
                <span className="text-xs font-bold text-sky-800">{userMember.role}</span>
              </div>
              <h3 className="font-black text-slate-900 text-xl mt-0.5">
                {userMember.name} <span className="text-amber-700 font-extrabold">({userMember.xp} XP)</span>
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                {personAhead
                  ? `${xpDifferenceAhead} XP needed to overtake #${personAhead.rank} ${personAhead.name}`
                  : "🏆 You are currently leading the Sandalwood Grand Sky League!"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Training Streak</span>
              <span className="text-xs font-black text-amber-700">🔥 {userMember.streak} Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* VISUAL SKY LEAGUE ELEVATED BOARD */}
      <div className="bg-gradient-to-b from-sky-400 via-blue-500 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border-2 border-white space-y-6 overflow-hidden relative">
        
        {/* Board Header */}
        <div className="flex items-center justify-between border-b border-white/20 pb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-300 fill-amber-300" />
            <span className="font-black text-base tracking-tight">Sandalwood Grand Leaderboard</span>
          </div>
          <span className="text-xs font-black text-slate-950 bg-amber-400 px-3 py-1 rounded-full uppercase tracking-wider">
            Week 39 Standings
          </span>
        </div>

        {/* ELEVATED ASSOCIATE TRACK LANES */}
        <div className="space-y-4 pt-2">
          {sortedLeaderboard.slice(0, 5).map((member) => {
            const trackPct = Math.min(Math.round((member.xp / maxXP) * 100), 92);
            const isUser = member.isCurrentUser;

            return (
              <div key={member.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold px-1 gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className={`w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center shrink-0 ${
                      member.rank === 1 ? 'bg-amber-400 text-slate-950' : member.rank === 2 ? 'bg-white text-slate-950' : member.rank === 3 ? 'bg-amber-200 text-slate-950' : 'bg-sky-900 text-white'
                    }`}>
                      #{member.rank}
                    </span>
                    <span className={`truncate text-xs ${isUser ? 'text-amber-300 font-black' : 'text-white'}`}>
                      {member.name} {isUser && '(YOU)'}
                    </span>
                    <span className="text-[10px] text-sky-100 font-normal truncate hidden sm:inline">· {member.role}</span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 shrink-0 text-right">
                    <span className="text-sky-100 font-black text-[11px] sm:text-xs">{member.xp} XP</span>
                    <span className="text-amber-300 text-[10px] sm:text-[11px] font-bold">🔥 {member.streak}d</span>
                  </div>
                </div>

                {/* Progress Runway Bar */}
                <div className="relative w-full h-9 bg-slate-900/60 rounded-2xl border border-white/20 overflow-hidden flex items-center p-1">
                  
                  {/* Filled Progress Runway */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${trackPct}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full rounded-xl transition-all ${
                      isUser
                        ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 shadow-[0_0_15px_rgba(250,204,21,0.6)]'
                        : member.rank === 1
                        ? 'bg-gradient-to-r from-sky-400 to-amber-300'
                        : 'bg-gradient-to-r from-sky-600 to-blue-400'
                    }`}
                  />

                  {/* GLIDING BIRD / AVATAR ON TRACK */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 transition-all duration-700"
                    style={{ left: `calc(${Math.max(8, Math.min(trackPct, 84))}% - 14px)` }}
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
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-sky-900 border border-sky-300 flex items-center justify-center text-xs font-bold text-white shadow-md">
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

      {/* Top Podium Associates */}
      <div className="bg-white/90 border-2 border-sky-100 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500 fill-amber-400" />
            <span>Podium Associates · Sandalwood Grand</span>
          </h3>
          <span className="text-xs font-bold text-sky-800 bg-sky-100 px-3 py-1 rounded-full">Week 39 Standings</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {sortedLeaderboard.slice(0, 3).map((member) => (
            <div
              key={member.id}
              className={`p-4.5 rounded-2xl border-2 flex flex-col justify-between space-y-3 relative overflow-hidden ${
                member.isCurrentUser
                  ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-300/50'
                  : 'bg-white border-sky-100 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center ${
                  member.rank === 1 ? 'bg-amber-400 text-slate-950' : member.rank === 2 ? 'bg-slate-200 text-slate-900' : 'bg-amber-200 text-slate-900'
                }`}>
                  #{member.rank}
                </span>
                <span className="text-xs font-black text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-full">
                  {member.xp} XP
                </span>
              </div>

              <div>
                <h4 className="font-black text-slate-900 text-sm flex items-center gap-1.5">
                  <span>{member.name}</span>
                  {member.isCurrentUser && <span className="text-[10px] text-slate-950 bg-amber-400 px-1.5 py-0.5 rounded-full font-black">(You)</span>}
                </h4>
                <p className="text-xs text-slate-500 font-semibold">{member.role}</p>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-sky-100 font-bold text-slate-700">
                <span className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{member.streak}d streak</span>
                </span>
                <span className="text-[11px] font-black text-amber-700">{member.flightPower} FP</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-white/90 border-2 border-sky-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-sky-100 flex items-center justify-between">
          <h3 className="font-black text-slate-900 text-base">All Sandalwood Grand Associates</h3>
          <span className="text-xs font-bold text-sky-800">Ranked by XP</span>
        </div>

        <div className="divide-y divide-sky-100">
          {sortedLeaderboard.map((member) => (
            <div
              key={member.id}
              className={`p-4 px-6 flex items-center justify-between gap-4 transition-all ${
                member.isCurrentUser ? 'bg-amber-50/80' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center shrink-0 ${
                  member.rank <= 3 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  #{member.rank}
                </span>

                <div>
                  <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                    <span>{member.name}</span>
                    {member.isCurrentUser && (
                      <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-full">
                        YOU
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold">{member.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Total XP</span>
                  <span className="text-sm font-black text-sky-800">{member.xp} XP</span>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Streak</span>
                  <span className="text-xs font-bold text-slate-700">🔥 {member.streak} days</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
