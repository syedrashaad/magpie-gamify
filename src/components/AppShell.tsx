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
    { id: 'my-sky' as ActiveTab, label: 'MY SKY', icon: Sparkles, description: "Nova's Haven" },
    { id: 'coach' as ActiveTab, label: 'MAGPIE COACH', icon: MessageSquareHeart, description: 'AI Mentor' },
    { id: 'sky-league' as ActiveTab, label: 'SKY LEAGUE', icon: Trophy, description: 'Organisation Leaderboard' },
    { id: 'training' as ActiveTab, label: 'TRAINING', icon: BarChart2, description: 'Analytics & Practice Log' },
  ];

  const mobileNavItems = [
    { id: 'tasks' as ActiveTab, label: 'Tasks', icon: BookOpen },
    { id: 'my-sky' as ActiveTab, label: 'My Sky', icon: Sparkles },
    { id: 'coach' as ActiveTab, label: 'Coach', icon: MessageSquareHeart },
    { id: 'sky-league' as ActiveTab, label: 'League', icon: Trophy },
    { id: 'profile' as ActiveTab, label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#F0F7FF] text-slate-900 font-sans flex justify-center selection:bg-amber-100 overflow-x-hidden max-w-full">
      
      {/* 1440px Root Container Shell */}
      <div className="w-full max-w-[1440px] flex min-h-screen border-x-0 lg:border-x border-sky-200/80 shadow-md relative">
        
        {/* DESKTOP SIDEBAR (Visible >= 1024px) */}
        <aside className="hidden lg:flex w-64 bg-white/95 backdrop-blur-md border-r border-sky-100 p-5 flex-col justify-between shrink-0 sticky top-0 h-screen overflow-y-auto">
          <div className="space-y-6">
            
            {/* Brand Logo & Property Header */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('tasks')}>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-md border border-amber-300 shrink-0">
                🪽
              </div>
              <div>
                <span className="font-black text-slate-900 text-sm tracking-tight block leading-none">
                  MAGPIE AI
                </span>
                <span className="text-[10px] font-extrabold text-sky-800 flex items-center gap-1 mt-1 truncate max-w-[130px]">
                  <Hotel className="w-3 h-3 text-sky-600 shrink-0" />
                  <span className="truncate">{userState.property}</span>
                </span>
              </div>
            </div>

            <div className="h-[1px] bg-sky-100" />

            {/* Navigation Menu Section */}
            <div className="space-y-1">
              <span className="block text-[10px] font-black uppercase tracking-wider text-sky-800 px-3 mb-2">
                Main Navigation
              </span>
              {sidebarNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-black tracking-wide transition-all text-left ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 shadow-md border border-amber-300'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-sky-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950 fill-slate-950' : 'text-sky-600'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Sidebar Footer Links */}
          <div className="space-y-1 pt-4 border-t border-sky-100">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'profile' ? 'bg-sky-100 text-sky-900 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-sky-50'
              }`}
            >
              <User className="w-4 h-4 text-sky-600" />
              <span>PROFILE</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'settings' ? 'bg-sky-100 text-sky-900 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-sky-50'
              }`}
            >
              <Settings className="w-4 h-4 text-sky-600" />
              <span>SETTINGS</span>
            </button>
          </div>
        </aside>

        {/* MAIN CENTER + TOP HEADER CANVAS */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#F0F7FF] overflow-x-hidden max-w-full">
          
          {/* MOBILE TOP BAR (< 1024px) */}
          <header className="lg:hidden bg-white/95 backdrop-blur-md border-b border-sky-100 px-4 py-2.5 sticky top-0 z-30 flex items-center justify-between gap-2 max-w-full shadow-sm">
            <div className="flex items-center gap-2 min-w-0 cursor-pointer" onClick={() => setActiveTab('tasks')}>
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-sm shadow-sm shrink-0 border border-amber-300">
                🪽
              </div>
              <div className="min-w-0">
                <span className="font-black text-slate-900 text-xs tracking-tight block leading-none">
                  MAGPIE AI
                </span>
                <span className="text-[9px] font-black text-sky-800 uppercase truncate block max-w-[120px] xs:max-w-[160px]">
                  {userState.property}
                </span>
              </div>
            </div>

            {/* Mobile Top Status Pills */}
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="flex items-center gap-1 text-[11px] font-black text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full shadow-sm">
                <Flame className="w-3 h-3 fill-amber-500 text-amber-500 shrink-0" />
                <span>{userState.streak}</span>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-black text-sky-900 bg-sky-100 border border-sky-300 px-2 py-0.5 rounded-full shadow-sm">
                <Sparkles className="w-3 h-3 text-sky-600 shrink-0" />
                <span>{userState.xp}</span>
              </div>

              <button
                onClick={() => setActiveTab('my-sky')}
                title="Go to My Sky"
                className="flex items-center gap-1 text-[11px] font-bold text-slate-800 bg-white border border-sky-200 px-2 py-0.5 rounded-full shadow-sm"
              >
                <span>🥚</span>
                <span>{userState.rewards.eggs}</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className="w-7 h-7 rounded-full bg-amber-400 border border-amber-300 flex items-center justify-center text-xs font-black text-slate-950 shrink-0 shadow-sm"
              >
                {userState.name.charAt(0)}
              </button>
            </div>
          </header>

          {/* DESKTOP TOP HEADER BAR (>= 1024px) */}
          <header className="hidden lg:flex bg-white/90 backdrop-blur-md border-b border-sky-100 px-6 py-3.5 sticky top-0 z-30 items-center justify-between shadow-sm">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-black text-slate-900 truncate">{userState.property}</span>
              <span className="text-xs text-sky-300">•</span>
              <span className="text-xs font-bold text-sky-800 truncate">{userState.role}</span>
            </div>

            {/* Desktop Top-Right Status Badges */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Streak */}
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full shadow-sm">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{userState.streak} Day Streak</span>
              </div>

              {/* XP */}
              <div className="flex items-center gap-1.5 text-xs font-black text-sky-900 bg-sky-100 border border-sky-300 px-3 py-1 rounded-full shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>{userState.xp} XP</span>
              </div>

              {/* Eggs */}
              <button
                onClick={() => setActiveTab('my-sky')}
                title="Go to My Sky Haven"
                className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-white hover:bg-sky-50 border border-sky-200 px-3 py-1 rounded-full transition-all cursor-pointer shadow-sm"
              >
                <span>🥚</span>
                <span>{userState.rewards.eggs} Eggs</span>
              </button>

              {/* Feathers */}
              <button
                onClick={() => setActiveTab('my-sky')}
                title="Go to My Sky Haven"
                className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-white hover:bg-sky-50 border border-sky-200 px-3 py-1 rounded-full transition-all cursor-pointer shadow-sm"
              >
                <span>🪶</span>
                <span>{userState.rewards.feathers} Feathers</span>
              </button>

              {/* User Avatar Pill */}
              <button
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-2 p-1 pr-3 rounded-full bg-amber-400 hover:bg-amber-300 border border-amber-300 transition-all shadow-sm"
              >
                <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                  {userState.name.charAt(0)}
                </div>
                <span className="text-xs font-black text-slate-950 uppercase tracking-wider">{userState.name.split(' ')[0]}</span>
              </button>
            </div>
          </header>

          {/* MAIN CANVAS */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 overflow-y-auto max-w-full">
            {children}
          </main>
        </div>

        {/* RIGHT RAIL (Visible >= 1280px) */}
        <aside className="hidden xl:block w-72 bg-white/95 backdrop-blur-md border-l border-sky-100 p-6 space-y-6 shrink-0 sticky top-0 h-screen overflow-y-auto">
          
          {/* Today's Goal Widget */}
          <div className="bg-sky-50/80 border border-sky-200 rounded-3xl p-4 space-y-3 shadow-sm">
            <div className="flex items-center justify-between text-xs font-black">
              <span className="text-sky-800 uppercase tracking-wider text-[10px]">Today's Goal</span>
              <span className="text-slate-900">{userState.dailyGoal.currentXP} / {userState.dailyGoal.targetXP} XP</span>
            </div>

            <div className="relative w-full h-2.5 bg-sky-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full"
                style={{ width: `${Math.min((userState.dailyGoal.currentXP / userState.dailyGoal.targetXP) * 100, 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-700 font-bold">
              🔥 {userState.streak} day training streak active
            </p>
          </div>

          {/* Up Next Scenario Card */}
          <div className="bg-white border-2 border-amber-300 rounded-3xl p-4 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-slate-950 bg-amber-400 px-2.5 py-0.5 rounded-full border border-amber-300">
                Up Next
              </span>
              <span className="text-[10px] text-slate-500 font-bold">3 min</span>
            </div>

            <h4 className="font-black text-slate-900 text-sm">
              Wrong Charges at Checkout
            </h4>
            <p className="text-xs text-slate-600 line-clamp-2 font-medium">
              De-escalate Mr. Iyer's ₹18,000 room service dispute before his flight leaves.
            </p>

            <button
              onClick={() => onSelectScenario('sc-3')}
              className="w-full py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-1.5 border border-amber-300"
            >
              <span>Start +20 XP</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
            </button>
          </div>

          {/* Journey Progress */}
          <div className="bg-white border border-sky-100 rounded-3xl p-4 space-y-2 shadow-sm">
            <span className="block text-[10px] font-black uppercase tracking-wider text-sky-800">
              Journey Progress
            </span>
            <div className="flex items-center justify-between text-xs font-black text-slate-900">
              <span>Front Office Path</span>
              <span className="text-sky-800">82%</span>
            </div>
            <div className="w-full h-2 bg-sky-100 rounded-full overflow-hidden">
              <div className="h-full bg-sky-500 rounded-full" style={{ width: '82%' }} />
            </div>
          </div>

          {/* Sky League Organisation Position */}
          <div className="bg-amber-100/90 border-2 border-amber-300 rounded-3xl p-4 space-y-2 text-xs shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-950">
                Sky League Rank
              </span>
              <span className="text-[10px] font-black text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-full border border-amber-300">
                {userState.property.split(',')[0]}
              </span>
            </div>
            <div className="flex items-center justify-between font-black text-slate-900">
              <div>
                <span className="text-base font-black text-slate-900">#{userState.rank} Position</span>
                <span className="block text-[10px] text-amber-950 font-bold">{userState.flightPower} Flight Power</span>
              </div>
              <button
                onClick={() => setActiveTab('sky-league')}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-[11px] uppercase tracking-wider shadow-sm transition-all"
              >
                VIEW
              </button>
            </div>
          </div>

          {/* Small Companion Nova Widget */}
          <div
            onClick={() => setActiveTab('my-sky')}
            title="Open Nova's Sky Haven"
            className="pt-2 flex items-center gap-3 bg-white hover:bg-sky-50 border-2 border-sky-100 hover:border-amber-400 p-3 rounded-3xl overflow-hidden cursor-pointer transition-all shadow-sm"
          >
            <div className="w-10 h-10 shrink-0 overflow-hidden rounded-2xl bg-sky-100 flex items-center justify-center border border-sky-200">
              <MagpieCharacter
                bodyColor={userState.magpie.bodyColor}
                featherStyle={userState.magpie.featherStyle}
                accessory={userState.magpie.accessory}
                level={userState.magpie.level}
                size="sm"
              />
            </div>
            <div>
              <span className="block text-xs font-black text-slate-900">{userState.magpie.name}</span>
              <span className="text-[10px] font-extrabold text-sky-800">Level {userState.magpie.level} Companion · Sky Haven 🪽</span>
            </div>
          </div>

        </aside>

      </div>

      {/* FIXED MOBILE BOTTOM NAVIGATION BAR (< 1024px) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-sky-200 py-2 px-3 shadow-xl pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <div className="max-w-md mx-auto flex items-center justify-around">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-0.5 transition-all py-1 px-3 rounded-2xl ${
                  isActive
                    ? 'text-slate-950 font-black scale-105 bg-amber-400 border border-amber-300 shadow-sm'
                    : 'text-slate-600 font-bold hover:text-slate-900'
                }`}
              >
                <div className={`p-1 rounded-xl ${isActive ? 'text-slate-950' : ''}`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-[10px] uppercase tracking-wider">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

    </div>
  );
};
