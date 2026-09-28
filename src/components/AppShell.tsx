import React from 'react';
import { ActiveTab, UserState } from '../types';
import {
  BookOpen,
  MessageSquareHeart,
  Trophy,
  BarChart2,
  User,
  Settings,
  Hotel,
  Flame,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { MagpieCharacter } from './MagpieCharacter';

interface AppShellProps {
  children: React.ReactNode;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  userState: UserState;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onOpenCustomize: () => void;
  onOpenFlightGame: () => void;
  onSelectScenario: (scenarioId: string) => void;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  activeTab,
  setActiveTab,
  userState,
  onOpenProfile,
  onOpenSettings,
  onOpenCustomize,
  onOpenFlightGame,
  onSelectScenario,
}) => {
  const sidebarNavItems = [
    { id: 'tasks' as ActiveTab, label: 'TASKS', icon: BookOpen, description: 'Learning Path' },
    { id: 'coach' as ActiveTab, label: 'MAGPIE COACH', icon: MessageSquareHeart, description: 'AI Mentor' },
    { id: 'sky-league' as ActiveTab, label: 'SKY LEAGUE', icon: Trophy, description: 'Organisation Leaderboard' },
    { id: 'training' as ActiveTab, label: 'TRAINING', icon: BarChart2, description: 'Analytics & Practice Log' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-slate-900 font-sans flex justify-center selection:bg-purple-100">
      
      {/* 1440px Container Shell */}
      <div className="w-full max-w-[1440px] flex min-h-screen border-x border-slate-200/80 shadow-2xs">
        
        {/* LEFT SIDEBAR (~220px) */}
        <aside className="w-60 bg-white border-r border-slate-200/80 p-5 flex flex-col justify-between shrink-0 sticky top-0 h-screen overflow-y-auto">
          <div className="space-y-6">
            
            {/* Brand Logo & Property Header */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('tasks')}>
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-base shadow-xs">
                🪽
              </div>
              <div>
                <span className="font-extrabold text-slate-900 text-sm tracking-tight block leading-none">
                  MAGPIE AI
                </span>
                <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-1 mt-1">
                  <Hotel className="w-3 h-3 text-purple-700" />
                  <span>{userState.location}</span>
                </span>
              </div>
            </div>

            <div className="h-[1px] bg-slate-100" />

            {/* Navigation Menu Section */}
            <div className="space-y-1">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
                Main Navigation
              </span>
              {sidebarNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Sidebar Footer Links */}
          <div className="space-y-1 pt-4 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'profile' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <User className="w-4 h-4 text-slate-400" />
              <span>PROFILE</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'settings' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>SETTINGS</span>
            </button>
          </div>
        </aside>

        {/* MAIN CENTER + TOP HEADER CANVAS */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#FAFAF8]">
          
          {/* TOP HEADER BAR */}
          <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-3.5 sticky top-0 z-30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">{userState.property}</span>
              <span className="text-xs text-slate-300">•</span>
              <span className="text-xs font-medium text-slate-500">{userState.role}</span>
            </div>

            {/* Top-Right Compact Status Badges */}
            <div className="flex items-center gap-3">
              {/* Streak */}
              <div className="flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-xl shadow-2xs">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{userState.streak}</span>
              </div>

              {/* XP */}
              <div className="flex items-center gap-1 text-xs font-bold text-purple-900 bg-purple-50 border border-purple-200/80 px-2.5 py-1 rounded-xl shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>{userState.xp} XP</span>
              </div>

              {/* Eggs */}
              <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200/80 px-2.5 py-1 rounded-xl">
                <span>🥚</span>
                <span>{userState.rewards.eggs}</span>
              </div>

              {/* Feathers */}
              <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200/80 px-2.5 py-1 rounded-xl">
                <span>🪶</span>
                <span>{userState.rewards.feathers}</span>
              </div>

              {/* User Avatar Pill */}
              <button
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-2 p-1 pr-2.5 rounded-full bg-white border border-slate-200 hover:border-purple-300 transition-all shadow-2xs"
              >
                <div className="w-7 h-7 rounded-full bg-purple-100 border border-purple-300 flex items-center justify-center text-xs font-bold text-purple-900">
                  {userState.name.charAt(0)}
                </div>
                <span className="text-xs font-bold text-slate-800">{userState.name.split(' ')[0]}</span>
              </button>
            </div>
          </header>

          {/* MAIN CANVAS */}
          <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
            {children}
          </main>
        </div>

        {/* RIGHT RAIL (~280px) */}
        <aside className="hidden xl:block w-72 bg-white border-l border-slate-200/80 p-6 space-y-6 shrink-0 sticky top-0 h-screen overflow-y-auto">
          
          {/* Today's Goal Widget */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-500 uppercase tracking-wider text-[10px]">Today's Goal</span>
              <span className="text-purple-700 font-extrabold">{userState.dailyGoal.currentXP} / {userState.dailyGoal.targetXP} XP</span>
            </div>

            <div className="relative w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
                style={{ width: `${Math.min((userState.dailyGoal.currentXP / userState.dailyGoal.targetXP) * 100, 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 font-semibold">
              🔥 {userState.streak} day training streak active
            </p>
          </div>

          {/* Up Next Scenario Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                Up Next
              </span>
              <span className="text-[10px] text-slate-400 font-medium">3 min</span>
            </div>

            <h4 className="font-bold text-slate-900 text-sm">
              Wrong Charges at Checkout
            </h4>
            <p className="text-xs text-slate-500 line-clamp-2">
              De-escalate Mr. Iyer's ₹18,000 room service dispute before his flight leaves.
            </p>

            <button
              onClick={() => onSelectScenario('sc-3')}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-2xs transition-all flex items-center justify-center gap-1.5"
            >
              <span>Start +20 XP</span>
              <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
            </button>
          </div>

          {/* Journey Progress */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-2">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Journey Progress
            </span>
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span>Front Office Path</span>
              <span className="text-purple-700">82%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-purple-600 rounded-full" style={{ width: '82%' }} />
            </div>
          </div>

          {/* Sky League Organisation Position */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900">
                Sky League Rank
              </span>
              <span className="text-[10px] font-extrabold text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-md">
                Sandalwood Grand
              </span>
            </div>
            <div className="flex items-center justify-between font-bold text-slate-900">
              <div>
                <span className="text-base font-extrabold text-slate-900">#{userState.rank} Position</span>
                <span className="block text-[10px] text-slate-500 font-semibold">{userState.flightPower} Flight Power</span>
              </div>
              <button
                onClick={() => setActiveTab('sky-league')}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] shadow-2xs transition-all"
              >
                VIEW
              </button>
            </div>
          </div>

          {/* Small Companion Nova Widget (Bounded Container) */}
          <div className="pt-2 flex items-center gap-3 bg-purple-50/50 border border-purple-200/60 p-3 rounded-2xl overflow-hidden">
            <div className="w-10 h-10 shrink-0 overflow-hidden rounded-xl bg-purple-100 flex items-center justify-center">
              <MagpieCharacter
                bodyColor={userState.magpie.bodyColor}
                featherStyle={userState.magpie.featherStyle}
                accessory={userState.magpie.accessory}
                level={userState.magpie.level}
                size="sm"
              />
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-900">{userState.magpie.name}</span>
              <span className="text-[10px] font-semibold text-purple-700">Level {userState.magpie.level} AI Companion</span>
            </div>
          </div>

        </aside>

      </div>

    </div>
  );
};
