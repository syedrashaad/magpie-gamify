import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { UserState } from '../types';
import { MagpieCharacter } from './MagpieCharacter';
import { getLevelTitle } from '../utils/storage';
import { Sparkles, ArrowRight, Star } from 'lucide-react';

interface LevelUpModalProps {
  isOpen: boolean;
  userState: UserState;
  onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  isOpen,
  userState,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#F59E0B', '#6D28D9', '#38BDF8', '#10B981'],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const levelTitle = getLevelTitle(userState.magpie.level);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="relative w-full max-w-2xl bg-gradient-to-b from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl border border-amber-400/40 shadow-2xl p-8 text-center overflow-hidden my-6"
        >
          {/* Background Radiant Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.3)_0%,transparent_70%)] pointer-events-none" />

          {/* Level Up Header Badge */}
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest shadow-xl mb-4"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>YOUR MAGPIE GREW!</span>
          </motion.div>

          <h2 className="font-serif font-black text-4xl text-white tracking-tight mb-2">
            LEVEL {userState.magpie.level} — {levelTitle.toUpperCase()}
          </h2>
          <p className="text-xs text-purple-200 font-semibold mb-6">
            Wings expanded • Flight power increased • Visual feathers upgraded
          </p>

          {/* Magpie Hero Bird Celebration Stage */}
          <div className="w-64 h-64 mx-auto relative flex items-center justify-center my-4">
            <MagpieCharacter
              bodyColor={userState.magpie.bodyColor}
              featherStyle={userState.magpie.featherStyle}
              accessory={userState.magpie.accessory}
              level={userState.magpie.level}
              isCelebrating={true}
              size="hero"
            />
          </div>

          <div className="bg-slate-900/80 border border-amber-400/30 rounded-2xl p-4 max-w-md mx-auto mb-6 text-xs text-slate-200">
            <p className="font-bold text-amber-300 mb-1">
              "LOOK AT MY WINGS!"
            </p>
            <p className="text-[11px] text-slate-400">
              {userState.magpie.name} is now stronger and ready for higher flight lanes in Sky Race!
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full max-w-sm py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm tracking-wide shadow-xl flex items-center justify-center gap-2 mx-auto"
          >
            <span>CONTINUE LEARNING JOURNEY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
