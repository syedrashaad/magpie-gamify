import React, { useState } from 'react';
import { UserState } from '../types';
import { MagpieCharacter } from './MagpieCharacter';
import { EditProfileModal } from './EditProfileModal';
import { User, Settings, Award, LogOut, Sparkles, Flame, CheckCircle2, Shield } from 'lucide-react';

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
      <div className="max-w-md mx-auto my-12 p-8 bg-white border border-slate-200/90 rounded-2xl shadow-sm text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xl mx-auto">
          🔒
        </div>
        <h2 className="font-extrabold text-xl text-slate-900">Signed Out (Demo State)</h2>
        <p className="text-xs text-slate-500">
          You have been signed out of Magpie AI at The Sandalwood Grand.
        </p>
        <button
          onClick={() => setIsSignedOut(false)}
          className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-2xs transition-all"
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
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
            Associate Identity & Mastery
          </span>
        </div>
        <h1 className="font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
          Associate Profile
        </h1>
        <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
          Manage your associate details, Magpie AI companion customization, and achievement records.
        </p>
      </div>

      {/* Associate Overview Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-purple-100 border border-purple-300 flex items-center justify-center text-2xl font-extrabold text-purple-900 shrink-0">
              {userState.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-extrabold text-xl text-slate-900">{userState.name}</h3>
              <p className="text-xs font-bold text-purple-700">{userState.role}</p>
              <p className="text-xs text-slate-500 mt-0.5">{userState.property} • {userState.location}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsEditOpen(true)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all text-center"
            >
              Edit Profile
            </button>
            <button
              onClick={() => setIsSignedOut(true)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
          <div className="bg-slate-50/70 border border-slate-200/70 p-3.5 rounded-xl">
            <span className="block text-[10px] font-bold text-slate-400 uppercase">Total XP</span>
            <span className="text-lg font-extrabold text-slate-900">{userState.xp} XP</span>
          </div>

          <div className="bg-slate-50/70 border border-slate-200/70 p-3.5 rounded-xl">
            <span className="block text-[10px] font-bold text-slate-400 uppercase">Streak</span>
            <span className="text-lg font-extrabold text-amber-600">🔥 {userState.streak} Days</span>
          </div>

          <div className="bg-slate-50/70 border border-slate-200/70 p-3.5 rounded-xl">
            <span className="block text-[10px] font-bold text-slate-400 uppercase">Journey Mastery</span>
            <span className="text-lg font-extrabold text-purple-700">82%</span>
          </div>

          <div className="bg-slate-50/70 border border-slate-200/70 p-3.5 rounded-xl">
            <span className="block text-[10px] font-bold text-slate-400 uppercase">Scenarios</span>
            <span className="text-lg font-extrabold text-emerald-600">{userState.scenariosCompletedCount} Done</span>
          </div>
        </div>
      </div>

      {/* AI Companion Section */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Your Magpie AI Companion</h3>
            <p className="text-xs text-slate-500">Nova represents your avatar on the journey map, Sky League, and roleplays.</p>
          </div>
          <button
            onClick={onOpenCustomize}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-2xs transition-all flex items-center justify-center gap-1.5 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Customize Nova</span>
          </button>
        </div>

        <div className="flex items-center gap-4 bg-purple-50/60 border border-purple-200/60 p-4 rounded-xl">
          <div className="w-16 h-16 shrink-0 overflow-hidden rounded-xl bg-purple-100 flex items-center justify-center border border-purple-200">
            <MagpieCharacter
              bodyColor={userState.magpie.bodyColor}
              featherStyle={userState.magpie.featherStyle}
              accessory={userState.magpie.accessory}
              level={userState.magpie.level}
              size="sm"
            />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 text-base">{userState.magpie.name}</h4>
            <p className="text-xs text-slate-600 font-medium">
              Level {userState.magpie.level} Companion • {userState.magpie.featherStyle} feathers • {userState.magpie.accessory}
            </p>
          </div>
        </div>
      </div>

      {/* Badges Collection */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Earned Mastery Badges</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {badges.map((badge, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/60 flex items-start gap-3">
              <span className="text-2xl">{badge.icon}</span>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{badge.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{badge.desc}</p>
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
