import React from 'react';
import { ActiveTab, UserState } from '../types';
import {
  BookOpen,
  MessageSquareHeart,
  Trophy,
  BarChart2,
  Hotel,
  Flame,
  Sparkles,
} from 'lucide-react';

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
    { id: 'tasks' as ActiveTab, label: 'TASKS', icon: BookOpen },
    { id: 'coach' as ActiveTab, label: 'COACH', icon: MessageSquareHeart },
    { id: 'sky-league' as ActiveTab, label: 'LEAGUE', icon: Trophy },
    { id: 'training' as ActiveTab, label: 'TRAINING', icon: BarChart2 },
  ];

  return (
    <>
      {/* Top Mobile Bar Header */}
      <header className="bg-[#FAFAF8]/90 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 sticky top-0 z-40">
        <div className="max-w-md mx-auto flex items-center justify-between">
          
          {/* Brand */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('tasks')}>
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-base shadow-xs">
              🪽
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-sm tracking-tight block leading-none">
                MAGPIE AI
              </span>
              <span className="text-[9px] font-bold text-purple-700 uppercase">
                {userState.property}
              </span>
            </div>
          </div>

          {/* Right User Profile Pill */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 p-1 pr-2.5 rounded-full bg-white border border-slate-200 shadow-2xs hover:border-purple-300 transition-all"
          >
            <div className="w-7 h-7 rounded-full bg-purple-100 border border-purple-300 flex items-center justify-center text-xs font-bold text-purple-900">
              {userState.name.charAt(0)}
            </div>
            <div className="text-left">
              <span className="block text-[11px] font-bold text-slate-800 leading-tight">
                {userState.name.split(' ')[0]}
              </span>
              <span className="block text-[9px] font-extrabold text-amber-600 leading-none">
                {userState.xp} XP
              </span>
            </div>
          </button>

        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2 px-6">
        <div className="max-w-md mx-auto flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 transition-all ${
                  isActive ? 'text-purple-700 font-extrabold scale-105' : 'text-slate-400 font-medium hover:text-slate-600'
                }`}
              >
                <div className={`p-1.5 rounded-xl ${isActive ? 'bg-purple-100' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] tracking-wider uppercase">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
