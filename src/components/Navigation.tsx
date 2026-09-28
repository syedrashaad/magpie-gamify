import React from 'react';
import { ActiveTab, UserState } from '../types';
import {
  Sparkles,
  BookOpen,
  MessageSquareHeart,
  BarChart2,
  Hotel,
  Flame,
} from 'lucide-react';
import { CurrenciesDisplay } from './CurrenciesDisplay';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  userState: UserState;
  onOpenProfile: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  userState,
  onOpenProfile,
}) => {
  const navItems = [
    { id: 'home' as ActiveTab, label: 'TASKS', icon: BookOpen, badge: 'Journey' },
    { id: 'coach' as ActiveTab, label: 'MAGPIE COACH', icon: MessageSquareHeart },
    { id: 'training' as ActiveTab, label: 'TRAINING', icon: BarChart2 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Brand & Sandalwood Grand Context */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-900 to-slate-900 text-amber-400 flex items-center justify-center font-bold text-xl shadow-md border border-purple-800/40">
              🪽
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-slate-900 text-lg tracking-tight">
                  MAGPIE AI
                </span>
                <span className="text-[10px] uppercase font-black tracking-widest bg-purple-100 text-purple-900 px-2 py-0.5 rounded-full border border-purple-200">
                  Hospitality Learning
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Hotel className="w-3.5 h-3.5 text-amber-700" />
                <span>{userState.property}</span>
              </div>
            </div>
          </div>

          {/* Mobile Profile Pill */}
          <button
            onClick={onOpenProfile}
            className="md:hidden flex items-center gap-2 p-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-900 text-xs font-semibold"
          >
            <span>🐦</span>
            <span>{userState.magpie.name}</span>
          </button>
        </div>

        {/* 3 Core Navigation Tabs */}
        <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (activeTab === 'courses' && item.id === 'home');
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase ${
                      isActive ? 'bg-purple-500 text-white' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Stats & Profile Button */}
        <div className="hidden lg:flex items-center gap-4">
          <CurrenciesDisplay rewards={userState.rewards} flightDays={userState.flightDays} />
          
          <div className="h-6 w-[1px] bg-slate-200" />

          {/* User Profile Pill */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-white border border-slate-200/80 shadow-xs hover:border-purple-300 transition-all text-left"
          >
            <div className="w-8 h-8 rounded-full bg-purple-100 border border-purple-300 flex items-center justify-center text-sm font-bold text-purple-900">
              <span>🐦</span>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 leading-tight">{userState.name}</div>
              <div className="text-[10px] font-medium text-slate-500 leading-tight">
                {userState.magpie.name} (Lvl {userState.magpie.level})
              </div>
            </div>
          </button>
        </div>

      </div>
    </header>
  );
};
