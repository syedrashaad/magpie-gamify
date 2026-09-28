import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { UserState } from '../types';
import { MagpieCharacter } from './MagpieCharacter';
import { GrowthBar } from './GrowthBar';
import { Trophy, ArrowRight, Sparkles, Heart } from 'lucide-react';

interface RewardSequenceProps {
  isOpen: boolean;
  score: number; // e.g. 8
  userState: UserState;
  onFeedMagpie: () => void;
  onClose: () => void;
  onGoToSkyRace: () => void;
}

export const RewardSequence: React.FC<RewardSequenceProps> = ({
  isOpen,
  score,
  userState,
  onFeedMagpie,
  onClose,
  onGoToSkyRace,
}) => {
  const [step, setStep] = useState<'score' | 'feeding' | 'growth'>('score');
  const [displayScore, setDisplayScore] = useState(0);
  const [isEating, setIsEating] = useState(false);
  const [hasFed, setHasFed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep('score');
      setDisplayScore(0);
      setHasFed(false);
      setIsEating(false);

      // Trigger Confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6D28D9', '#F59E0B', '#10B981', '#38BDF8'],
      });

      // Score counter up
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        if (current >= score) {
          setDisplayScore(score);
          clearInterval(interval);
        } else {
          setDisplayScore(current);
        }
      }, 150);

      return () => clearInterval(interval);
    }
  }, [isOpen, score]);

  if (!isOpen) return null;

  const handleFeedClick = () => {
    setIsEating(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#10B981', '#F59E0B'],
    });

    onFeedMagpie();

    setTimeout(() => {
      setIsEating(false);
      setHasFed(true);
      setStep('growth');
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-lg overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-3xl bg-gradient-to-b from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl border border-purple-500/30 shadow-2xl p-8 overflow-hidden my-6 text-center"
        >
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.25)_0%,transparent_70%)] pointer-events-none" />

          {/* STEP 1: SCORE REVEAL & PERSONAL BEST */}
          {step === 'score' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 font-extrabold text-xs uppercase tracking-widest">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>NEW PERSONAL BEST!</span>
              </div>

              {/* Magpie Hero Bird */}
              <div className="w-56 h-56 mx-auto relative flex items-center justify-center">
                <MagpieCharacter
                  bodyColor={userState.magpie.bodyColor}
                  featherStyle={userState.magpie.featherStyle}
                  accessory={userState.magpie.accessory}
                  level={userState.magpie.level}
                  isCelebrating={true}
                  size="hero"
                />
              </div>

              {/* Score Display */}
              <div>
                <div className="text-6xl font-black font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200 drop-shadow-md">
                  {displayScore} / 10
                </div>
                <p className="text-xs font-semibold text-purple-200 mt-1">
                  Previous Score: <span className="line-through text-slate-400">6/10</span> → Current: <strong className="text-amber-300">8/10 (+20%)</strong>
                </p>
              </div>

              {/* Flight Distance Traveled Bar */}
              <div className="max-w-md mx-auto bg-slate-900/80 border border-purple-500/30 rounded-2xl p-4 text-left">
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <span className="text-purple-300">Flight Distance</span>
                  <span className="text-amber-400 font-extrabold">112m Personal Best 🪽</span>
                </div>

                <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <motion.div
                    initial={{ width: '60%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-purple-500 to-amber-400 rounded-full"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>Previous: 74m</span>
                  <span>New Flight Record: 112m!</span>
                </div>
              </div>

              {/* Earned Rewards Cards */}
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-emerald-500/20 border border-emerald-500/40 p-3 rounded-2xl flex flex-col items-center"
                >
                  <span className="text-2xl mb-1">🍎</span>
                  <span className="text-sm font-bold text-emerald-300">+3 Food</span>
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-blue-500/20 border border-blue-500/40 p-3 rounded-2xl flex flex-col items-center"
                >
                  <span className="text-2xl mb-1">🪶</span>
                  <span className="text-sm font-bold text-blue-300">+2 Feathers</span>
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-amber-500/20 border border-amber-500/40 p-3 rounded-2xl flex flex-col items-center"
                >
                  <span className="text-2xl mb-1">🥚</span>
                  <span className="text-sm font-bold text-amber-300">+1 Egg</span>
                </motion.div>
              </div>

              <button
                onClick={handleFeedClick}
                className="w-full max-w-md py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-emerald-500/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <span>FEED YOUR MAGPIE</span>
                <span className="text-lg">🍎</span>
              </button>

            </motion.div>
          )}

          {/* STEP 2: FEEDING & GROWTH PROGRESSION */}
          {step === 'growth' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 font-extrabold text-xs uppercase tracking-widest">
                <Heart className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                <span>MAGPIE NOURISHED!</span>
              </div>

              <div className="w-56 h-56 mx-auto relative flex items-center justify-center">
                <MagpieCharacter
                  bodyColor={userState.magpie.bodyColor}
                  featherStyle={userState.magpie.featherStyle}
                  accessory={userState.magpie.accessory}
                  level={userState.magpie.level}
                  isEating={isEating}
                  isCelebrating={true}
                  size="hero"
                />
              </div>

              <div className="max-w-md mx-auto text-left">
                <GrowthBar
                  level={userState.magpie.level}
                  growth={userState.magpie.growth}
                  foodNeeded={12}
                />
              </div>

              <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-4 max-w-md mx-auto text-center">
                <p className="text-xs text-amber-300 font-bold mb-1">
                  🏁 Flight Power Increased to 145 XP!
                </p>
                <p className="text-[11px] text-slate-300">
                  Your Magpie has enough eggs to race in the <strong className="text-amber-400">BOOST LANE</strong> in Sky Race!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <button
                  onClick={onGoToSkyRace}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xl flex items-center justify-center gap-2"
                >
                  <Trophy className="w-4 h-4" />
                  <span>GO TO SKY RACE</span>
                </button>
                
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 flex items-center justify-center gap-2"
                >
                  <span>RETURN HOME</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
