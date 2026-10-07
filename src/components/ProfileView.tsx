import React, { useState } from 'react';
import { UserState } from '../types';
import { MagpieCharacter } from './MagpieCharacter';
import { EditProfileModal } from './EditProfileModal';
import { LogOut, Sparkles, Flame, Star, Trophy, Shield } from 'lucide-react';

interface ProfileViewProps {
  userState: UserState;
  onUpdateUserState: (updated: UserState) => void;
  onOpenCustomize: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userState,
  onUpdateUserState,
  onOpenCustomize,
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSignedOut, setIsSignedOut] = useState(false);

  const badges = [
    { title: 'VIP Reception Specialist', desc: 'Completed Unit 1 First Impressions with 90+ score', icon: '⭐' },
    { title: 'Service Recovery Pro', desc: 'Resolved ₹18k dispute under 3 minutes', icon: '🏆' },
    { title: 'Consistency Streak', desc: 'Maintained 5-day continuous learning streak', icon: '🔥' },
    { title: 'Sandalwood Top 5', desc: 'Ranked in top 5 associates at Sandalwood Grand', icon: '🪽' },
  ];

  if (isSignedOut) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-gradient-to-b from-sky-50 to-amber-50 border-2 border-white rounded-3xl shadow-xl text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center font-bold text-2xl mx-auto shadow-sm">
          🔒
        </div>
        <h2 className="font-black text-xl text-slate-900">Signed Out (Demo State)</h2>
        <p className="text-xs text-slate-600 font-medium">
          You have been signed out of Magpie AI at {userState.property}.
        </p>
        <button
          onClick={() => setIsSignedOut(false)}
          className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all border border-amber-300"
        >
          SIGN BACK IN
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-sky-800 bg-sky-100 px-3 py-0.5 rounded-full">
            Associate Identity & Mastery
          </span>
        </div>
        <h1 className="font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
          Associate Profile
        </h1>
        <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
          Manage your associate details, companion customization, and achievement records.
        </p>
      </div>

      {/* Associate Overview Card */}
      <div className="bg-white/90 border-2 border-sky-100 rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-sky-100 border border-sky-300 flex items-center justify-center text-2xl font-black text-sky-900 shrink-0 shadow-sm">
              {userState.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-black text-xl text-slate-900">{userState.name}</h3>
              <p className="text-xs font-black text-sky-800">{userState.role}</p>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">{userState.property} • {userState.location}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsEditOpen(true)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-white border border-sky-200 text-slate-800 font-black text-xs uppercase tracking-wider hover:bg-sky-50 transition-all text-center shadow-sm"
            >
              Edit Profile
            </button>
            <button
              onClick={() => setIsSignedOut(true)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-sky-100">
          <div className="bg-sky-50/60 border border-sky-100 p-3.5 rounded-2xl">
            <span className="block text-[10px] font-bold text-slate-400 uppercase">Total XP</span>
            <span className="text-lg font-black text-slate-900">{userState.xp} XP</span>
          </div>

          <div className="bg-sky-50/60 border border-sky-100 p-3.5 rounded-2xl">
            <span className="block text-[10px] font-bold text-slate-400 uppercase">Streak</span>
            <span className="text-lg font-black text-amber-600">🔥 {userState.streak} Days</span>
          </div>

          <div className="bg-sky-50/60 border border-sky-100 p-3.5 rounded-2xl">
            <span className="block text-[10px] font-bold text-slate-400 uppercase">Journey Mastery</span>
            <span className="text-lg font-black text-sky-800">82%</span>
          </div>

          <div className="bg-sky-50/60 border border-sky-100 p-3.5 rounded-2xl">
            <span className="block text-[10px] font-bold text-slate-400 uppercase">Scenarios</span>
            <span className="text-lg font-black text-emerald-600">{userState.scenariosCompletedCount} Done</span>
          </div>
        </div>
      </div>

      {/* AI Companion Section */}
      <div className="bg-white/90 border-2 border-sky-100 rounded-3xl p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-black text-slate-900 text-base">Your Companion Bird</h3>
            <p className="text-xs text-slate-500 font-semibold">{userState.magpie.name} represents your companion on the journey map, Sky League, and roleplays.</p>
          </div>
          <button
            onClick={onOpenCustomize}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-1.5 shrink-0 border border-amber-300"
          >
            <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
            <span>Customize Companion</span>
          </button>
        </div>

        <div className="flex items-center gap-4 bg-sky-50 border border-sky-200 p-4 rounded-2xl">
          <div className="w-16 h-16 shrink-0 overflow-hidden rounded-2xl bg-white flex items-center justify-center border border-sky-200 shadow-sm">
            <MagpieCharacter
              bodyColor={userState.magpie.bodyColor}
              featherStyle={userState.magpie.featherStyle}
              accessory={userState.magpie.accessory}
              level={userState.magpie.level}
              size="sm"
            />
          </div>
          <div>
            <h4 className="font-black text-slate-900 text-base">{userState.magpie.name}</h4>
            <p className="text-xs text-sky-800 font-bold">
              Level {userState.magpie.level} Companion • {userState.magpie.featherStyle} feathers • {userState.magpie.accessory}
            </p>
          </div>
        </div>
      </div>

      {/* Badges Collection */}
      <div className="bg-white/90 border-2 border-sky-100 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="font-black text-slate-900 text-base">Earned Mastery Badges</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {badges.map((badge, idx) => (
            <div key={idx} className="p-4 rounded-2xl border border-sky-100 bg-sky-50/50 flex items-start gap-3">
              <span className="text-2xl">{badge.icon}</span>
              <div>
                <h4 className="font-black text-slate-900 text-sm">{badge.title}</h4>
                <p className="text-xs text-slate-600 font-medium mt-0.5">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        userState={userState}
        onSave={(updated) => {
          onUpdateUserState(updated);
        }}
      />

    </div>
  );
};
