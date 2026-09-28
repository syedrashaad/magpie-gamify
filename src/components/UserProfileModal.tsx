import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserState } from '../types';
import { MagpieCharacter } from './MagpieCharacter';
import { X, Sparkles, Trophy, Flame, Settings2, Hotel } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userState: UserState;
  onOpenCustomize: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  userState,
  onOpenCustomize,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-[#FAF8F5] border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
            <div className="flex items-center gap-3">
              <span className="text-xl">🐦</span>
              <div>
                <h3 className="font-serif font-bold text-lg text-white">
                  {userState.name}
                </h3>
                <p className="text-xs text-slate-400">
                  {userState.role} • {userState.property}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 text-center">
            
            {/* Magpie Display */}
            <div className="w-48 h-48 mx-auto relative flex items-center justify-center">
              <MagpieCharacter
                bodyColor={userState.magpie.bodyColor}
                featherStyle={userState.magpie.featherStyle}
                accessory={userState.magpie.accessory}
                level={userState.magpie.level}
                size="hero"
              />
            </div>

            <div>
              <span className="text-xs font-black uppercase tracking-widest bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-200">
                Level {userState.magpie.level} Companion
              </span>
              <h2 className="font-serif font-bold text-2xl text-slate-900 mt-1">
                {userState.magpie.name}
              </h2>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white border border-slate-200/80 p-3 rounded-2xl">
                <span className="block text-xl mb-1">🔥</span>
                <span className="block text-xs font-bold text-slate-900">{userState.flightDays} Days</span>
                <span className="text-[10px] text-slate-500 font-medium">Streak</span>
              </div>

              <div className="bg-white border border-slate-200/80 p-3 rounded-2xl">
                <span className="block text-xl mb-1">✨</span>
                <span className="block text-xs font-bold text-amber-600">{userState.flight.power || 840} XP</span>
                <span className="text-[10px] text-slate-500 font-medium">Learning XP</span>
              </div>

              <div className="bg-white border border-slate-200/80 p-3 rounded-2xl">
                <span className="block text-xl mb-1">🪽</span>
                <span className="block text-xs font-bold text-purple-700">{userState.flight.personalBest}m</span>
                <span className="text-[10px] text-slate-500 font-medium">Personal Best</span>
              </div>
            </div>

            {/* Currencies */}
            <div className="bg-slate-100/80 border border-slate-200 p-3.5 rounded-2xl flex items-center justify-around text-xs font-bold text-slate-800">
              <span>🥚 {userState.rewards.eggs} Eggs</span>
              <span>🪶 {userState.rewards.feathers} Feathers</span>
              <span>🍎 {userState.rewards.food} Food</span>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenCustomize();
                }}
                className="w-full py-3.5 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Settings2 className="w-4 h-4" />
                <span>Customise {userState.magpie.name}</span>
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
