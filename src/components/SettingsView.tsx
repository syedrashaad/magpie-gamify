import React, { useState } from 'react';
import { UserState } from '../types';
import { resetUserState } from '../utils/storage';
import { Settings, Shield, Bell, Sliders, RefreshCw, Check } from 'lucide-react';

interface SettingsViewProps {
  userState: UserState;
  onResetState: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  userState,
  onResetState,
}) => {
  const [dailyTarget, setDailyTarget] = useState(userState.dailyGoal.targetXP);
  const [notifications, setNotifications] = useState(true);
  const [voiceCoach, setVoiceCoach] = useState(true);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSavePreferences = () => {
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
            System Preferences
          </span>
        </div>
        <h1 className="font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
          Settings & Preferences
        </h1>
        <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
          Configure daily learning goals, notification preferences, and data controls.
        </p>
      </div>

      {savedMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Learning & Goal Settings */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-6">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <Sliders className="w-4 h-4 text-purple-700" />
          <span>Learning Preferences</span>
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-xs font-bold text-slate-900">Daily Target XP</label>
              <p className="text-xs text-slate-500">Target XP to complete each training day</p>
            </div>
            <select
              value={dailyTarget}
              onChange={(e) => setDailyTarget(Number(e.target.value))}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value={10}>10 XP (Casual)</option>
              <option value={20}>20 XP (Recommended)</option>
              <option value={30}>30 XP (Intense)</option>
            </select>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <div>
              <label className="block text-xs font-bold text-slate-900">Voice Coach Assistance</label>
              <p className="text-xs text-slate-500">Enable voice audio responses during scenarios</p>
            </div>
            <button
              onClick={() => setVoiceCoach(!voiceCoach)}
              className={`w-11 h-6 rounded-full transition-all p-1 flex items-center ${
                voiceCoach ? 'bg-purple-700 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-2xs" />
            </button>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-6">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <Bell className="w-4 h-4 text-purple-700" />
          <span>Notifications</span>
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <label className="block text-xs font-bold text-slate-900">Streak & Daily Reminders</label>
            <p className="text-xs text-slate-500">Receive reminders to maintain daily training streak</p>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-11 h-6 rounded-full transition-all p-1 flex items-center ${
              notifications ? 'bg-purple-700 justify-end' : 'bg-slate-300 justify-start'
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-2xs" />
          </button>
        </div>
      </div>

      {/* Reset & Storage Data */}
      <div className="bg-white border border-rose-200/80 rounded-2xl p-6 shadow-2xs space-y-4">
        <h3 className="font-bold text-rose-900 text-base flex items-center gap-2">
          <Shield className="w-4 h-4 text-rose-600" />
          <span>Reset Demo Data</span>
        </h3>
        <p className="text-xs text-slate-500">
          Reset all local storage data back to initial Sandalwood Grand associate state.
        </p>
        <button
          onClick={onResetState}
          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-2xs transition-all flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset All Progress State</span>
        </button>
      </div>

    </div>
  );
};
