import React, { useState } from 'react';
import { UserState } from '../types';
import { resetUserState } from '../utils/storage';
import { Settings, Shield, Bell, Sliders, RefreshCw, Check, Eye, Lock, Moon, Sun } from 'lucide-react';

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
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
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
          Settings & Application Preferences
        </h1>
        <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
          Manage account options, training goals, appearance, accessibility, and privacy controls.
        </p>
      </div>

      {savedMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Preferences updated successfully!</span>
        </div>
      )}

      {/* Account Info */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <Settings className="w-4 h-4 text-purple-700" />
          <span>Account Overview</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 font-bold block uppercase">Associate Name</span>
            <span className="font-bold text-slate-900">{userState.name}</span>
          </div>
          <div>
            <span className="text-slate-400 font-bold block uppercase">Role</span>
            <span className="font-bold text-slate-900">{userState.role}</span>
          </div>
          <div>
            <span className="text-slate-400 font-bold block uppercase">Property</span>
            <span className="font-bold text-slate-900">{userState.property}</span>
          </div>
          <div>
            <span className="text-slate-400 font-bold block uppercase">Location Code</span>
            <span className="font-bold text-slate-900">{userState.location}</span>
          </div>
        </div>
      </div>

      {/* Learning & Goal Settings */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-6">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <Sliders className="w-4 h-4 text-purple-700" />
          <span>Training Preferences</span>
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-xs font-bold text-slate-900">Daily Target XP</label>
              <p className="text-xs text-slate-500">Target XP to complete each training day</p>
            </div>
            <select
              value={dailyTarget}
              onChange={(e) => {
                setDailyTarget(Number(e.target.value));
                handleSavePreferences();
              }}
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
              <p className="text-xs text-slate-500">Enable audio prompt guidance during roleplay</p>
            </div>
            <button
              onClick={() => {
                setVoiceCoach(!voiceCoach);
                handleSavePreferences();
              }}
              className={`w-11 h-6 rounded-full transition-all p-1 flex items-center ${
                voiceCoach ? 'bg-purple-700 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-2xs" />
            </button>
          </div>
        </div>
      </div>

      {/* Appearance & Accessibility */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-6">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <Eye className="w-4 h-4 text-purple-700" />
          <span>Appearance & Accessibility</span>
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-xs font-bold text-slate-900">Reduced Motion</label>
              <p className="text-xs text-slate-500">Minimize animations and map transitions</p>
            </div>
            <button
              onClick={() => {
                setReducedMotion(!reducedMotion);
                handleSavePreferences();
              }}
              className={`w-11 h-6 rounded-full transition-all p-1 flex items-center ${
                reducedMotion ? 'bg-purple-700 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-2xs" />
            </button>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <div>
              <label className="block text-xs font-bold text-slate-900">High Contrast Text</label>
              <p className="text-xs text-slate-500">Enhance legibility for screen readers and bright displays</p>
            </div>
            <button
              onClick={() => {
                setHighContrast(!highContrast);
                handleSavePreferences();
              }}
              className={`w-11 h-6 rounded-full transition-all p-1 flex items-center ${
                highContrast ? 'bg-purple-700 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-2xs" />
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-6">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <Bell className="w-4 h-4 text-purple-700" />
          <span>Notifications</span>
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <label className="block text-xs font-bold text-slate-900">Streak & Training Reminders</label>
            <p className="text-xs text-slate-500">Receive daily reminders to maintain continuous streak</p>
          </div>
          <button
            onClick={() => {
              setNotifications(!notifications);
              handleSavePreferences();
            }}
            className={`w-11 h-6 rounded-full transition-all p-1 flex items-center ${
              notifications ? 'bg-purple-700 justify-end' : 'bg-slate-300 justify-start'
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-2xs" />
          </button>
        </div>
      </div>

      {/* Privacy & Reset Storage */}
      <div className="bg-white border border-rose-200/80 rounded-2xl p-6 shadow-2xs space-y-4">
        <h3 className="font-bold text-rose-900 text-base flex items-center gap-2">
          <Shield className="w-4 h-4 text-rose-600" />
          <span>Privacy & Data Controls</span>
        </h3>
        <p className="text-xs text-slate-500">
          Reset all local storage data back to initial Sandalwood Grand associate state.
        </p>
        <button
          onClick={onResetState}
          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-2xs transition-all flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Local Application Progress State</span>
        </button>
      </div>

    </div>
  );
};
