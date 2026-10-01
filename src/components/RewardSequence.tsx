import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { UserState } from '../types';
import { MagpieCharacter } from './MagpieCharacter';
import { GrowthBar } from './GrowthBar';
import { Trophy, ArrowRight, Sparkles, Heart, Zap } from 'lucide-react';

interface RewardSequenceProps {
  isOpen: boolean;
  score: number; // e.g. 82
  userState: UserState;
  onFeedMagpie: () => void;
  onClose: () => void;
  onLaunchFlightChallenge: () => void;
}

export const RewardSequence: React.FC<RewardSequenceProps> = ({
  isOpen,
  score,
  userState,
  onFeedMagpie,
  onClose,
  onLaunchFlightChallenge,
}) => {
  const [step, setStep] = useState<'score' | 'growth'>('score');
  const [displayScore, setDisplayScore] = useState(0);
  const [isEating, setIsEating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep('score');
      setDisplayScore(0);
      setIsEating(false);

      // Trigger Confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7C3AED', '#F59E0B', '#10B981', '#38BDF8'],
      });

      // Score counter animation up to score (e.g. 82)
      let current = 0;
      const target = score > 10 ? score : score * 10;
      const interval = setInterval(() => {
        current += 4;
        if (current >= target) {
          setDisplayScore(target);
          clearInterval(interval);
        } else {
          setDisplayScore(current);
        }
      }, 40);

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
      setStep('growth');
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto max-w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-purple-500/30 text-white rounded-3xl shadow-2xl p-5 sm:p-8 text-center my-auto"
        >
          {/* STEP 1: SCORE REVEAL & EARNED REWARDS */}
          {step === 'score' && (
            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 font-extrabold text-xs uppercase tracking-wider">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>SCENARIO COMPLETED!</span>
              </div>

              {/* Bounded Nova Bird Character */}
              <div className="w-36 h-36 mx-auto relative flex items-center justify-center overflow-hidden rounded-2xl bg-purple-950/60 border border-purple-500/30">
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
                <div className="text-5xl font-black text-amber-400 tracking-tight">
                  {displayScore} / 100
                </div>
                <p className="text-xs font-semibold text-purple-200 mt-1">
                  Previous: <span className="line-through text-slate-400">68/100</span> → Current: <strong className="text-amber-300">82/100 (+14%)</strong>
                </p>
              </div>

              {/* Earned Rewards Cards */}
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                <div className="bg-purple-900/40 border border-purple-500/30 p-3 rounded-xl flex flex-col items-center">
                  <span className="text-xl mb-1">✨</span>
                  <span className="text-xs font-bold text-purple-300">+20 XP</span>
                </div>

                <div className="bg-emerald-900/40 border border-emerald-500/30 p-3 rounded-xl flex flex-col items-center">
                  <span className="text-xl mb-1">🍎</span>
                  <span className="text-xs font-bold text-emerald-300">+3 Food</span>
                </div>

                <div className="bg-amber-900/40 border border-amber-500/30 p-3 rounded-xl flex flex-col items-center">
                  <span className="text-xl mb-1">🪶</span>
                  <span className="text-xs font-bold text-amber-300">+2 Feathers</span>
                </div>
              </div>

              <button
                onClick={handleFeedClick}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>FEED YOUR COMPANION</span>
                <span className="text-base">🍎</span>
              </button>
            </div>
          )}

          {/* STEP 2: GROWTH & FLIGHT CHALLENGE TRIGGER */}
          {step === 'growth' && (
            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 font-extrabold text-xs uppercase tracking-wider">
                <Heart className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                <span>MAGPIE NOURISHED!</span>
              </div>

              <div className="w-36 h-36 mx-auto relative flex items-center justify-center overflow-hidden rounded-2xl bg-purple-950/60 border border-purple-500/30">
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

              <div className="bg-slate-950/80 border border-amber-500/30 rounded-xl p-4 text-center">
                <p className="text-xs text-amber-300 font-bold mb-1">
                  ⚡ Flight Challenge Unlocked!
                </p>
                <p className="text-[11px] text-slate-300">
                  Fly through the arcade challenge to earn <strong className="text-amber-400">+8 Flight Power</strong> and pass Arjun Verma on the Sandalwood Grand Leaderboard!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={onLaunchFlightChallenge}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>PLAY FLIGHT CHALLENGE (+8 FP)</span>
                </button>
                
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 flex items-center justify-center gap-1.5"
                >
                  <span>RETURN TO TASKS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
