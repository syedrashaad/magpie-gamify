import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { UserState } from '../types';
import { MagpieCharacter } from './MagpieCharacter';
import { GrowthBar } from './GrowthBar';
import { Trophy, ArrowRight, Sparkles, Heart, Zap, Award, CheckCircle2 } from 'lucide-react';

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
        particleCount: 90,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#FACC15', '#38BDF8', '#10B981', '#F43F5E'],
      });

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
      }, 35);

      return () => clearInterval(interval);
    }
  }, [isOpen, score]);

  if (!isOpen) return null;

  const handleFeedClick = () => {
    setIsEating(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#10B981', '#FACC15'],
    });

    onFeedMagpie();

    setTimeout(() => {
      setIsEating(false);
      setStep('growth');
    }, 1100);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto max-w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-gradient-to-b from-sky-50 via-blue-50 to-amber-50 border-2 border-white text-slate-800 rounded-3xl shadow-2xl p-5 sm:p-7 text-center my-auto"
        >
          {/* STEP 1: SESSION COMPLETE & 4 REWARDS */}
          {step === 'score' && (
            <div className="space-y-5 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 font-extrabold text-xs uppercase tracking-wider shadow-sm">
                <Trophy className="w-4 h-4 text-amber-600 fill-amber-500" />
                <span>SCENARIO COMPLETE!</span>
              </div>

              {/* Celebrating Hero Character Card */}
              <div className="relative overflow-hidden w-full max-w-sm mx-auto p-4 rounded-3xl bg-gradient-to-r from-sky-500 to-indigo-600 border-2 border-white shadow-md text-white flex items-center justify-around">
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-extrabold text-[10px] uppercase shadow-sm">
                  5-STAR EXCELLENCE
                </div>
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md p-1 border border-white/40 flex items-center justify-center shrink-0">
                  <img src="/assets/nova_celebrating.jpg" alt="Nova Celebrating" className="w-full h-full object-cover rounded-xl shadow-md" />
                </div>
                <div className="shrink-0">
                  <MagpieCharacter
                    bodyColor={userState.magpie.bodyColor}
                    featherStyle={userState.magpie.featherStyle}
                    accessory={userState.magpie.accessory}
                    level={userState.magpie.level}
                    isCelebrating={true}
                    size="hero"
                  />
                </div>
              </div>

              {/* Score Display */}
              <div>
                <div className="text-5xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1">
                  <span>{displayScore}</span>
                  <span className="text-2xl text-slate-400 font-bold">/100</span>
                </div>
                <p className="text-xs font-bold text-sky-800 mt-1">
                  Previous: <span className="line-through text-slate-400">68/100</span> → Score: <strong className="text-emerald-600">82/100 (+14% Mastery)</strong>
                </p>
              </div>

              {/* 4 Rewards Grid */}
              <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
                <div className="bg-white/90 border border-sky-100 p-2.5 rounded-2xl flex flex-col items-center shadow-sm">
                  <span className="text-xl mb-0.5">✨</span>
                  <span className="text-xs font-black text-slate-900">+20</span>
                  <span className="text-[10px] font-bold text-sky-700">XP</span>
                </div>

                <div className="bg-white/90 border border-emerald-100 p-2 rounded-2xl flex flex-col items-center shadow-sm">
                  <img src="/assets/reward_companion_food.jpg" alt="Food" className="w-7 h-7 rounded-lg object-cover mb-0.5 shadow-sm" />
                  <span className="text-xs font-black text-slate-900">+3</span>
                  <span className="text-[10px] font-bold text-emerald-700">Food</span>
                </div>

                <div className="bg-white/90 border border-amber-100 p-2 rounded-2xl flex flex-col items-center shadow-sm">
                  <img src="/assets/reward_silk_feather.jpg" alt="Feathers" className="w-7 h-7 rounded-lg object-cover mb-0.5 shadow-sm" />
                  <span className="text-xs font-black text-slate-900">+2</span>
                  <span className="text-[10px] font-bold text-amber-700">Feathers</span>
                </div>

                <div className="bg-white/90 border border-purple-100 p-2 rounded-2xl flex flex-col items-center shadow-sm">
                  <img src="/assets/reward_golden_egg.jpg" alt="Egg" className="w-7 h-7 rounded-lg object-cover mb-0.5 shadow-sm" />
                  <span className="text-xs font-black text-slate-900">+1</span>
                  <span className="text-[10px] font-bold text-purple-700">Egg</span>
                </div>
              </div>

              {/* Skill Competency Scores Grid */}
              <div className="bg-white/90 border border-sky-100 p-3 rounded-2xl max-w-md mx-auto text-left shadow-sm">
                <span className="text-[10px] font-black uppercase text-sky-800 tracking-wider block mb-2 text-center">
                  Competency Ratings Breakdown
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-800">
                  <div className="flex justify-between bg-sky-50/60 p-2 rounded-xl border border-sky-100">
                    <span>Empathy</span>
                    <span className="text-sky-800">{userState.skills.empathy || 82}</span>
                  </div>
                  <div className="flex justify-between bg-sky-50/60 p-2 rounded-xl border border-sky-100">
                    <span>Communication</span>
                    <span className="text-sky-800">{userState.skills.communication || 76}</span>
                  </div>
                  <div className="flex justify-between bg-sky-50/60 p-2 rounded-xl border border-sky-100">
                    <span>Problem Solving</span>
                    <span className="text-emerald-700">{userState.skills.problemSolving || 91}</span>
                  </div>
                  <div className="flex justify-between bg-sky-50/60 p-2 rounded-xl border border-sky-100">
                    <span>Guest Focus</span>
                    <span className="text-amber-700">{userState.skills.ownership || 88}</span>
                  </div>
                </div>
              </div>

              {/* Unlocked My Sky Item Card */}
              <div className="bg-white/90 border-2 border-amber-300 p-3 rounded-2xl text-left flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <img src="/assets/sky_golden_nest.jpg" alt="Golden Nest" className="w-10 h-10 rounded-xl object-cover border border-amber-200 shadow-sm shrink-0" />
                  <div>
                    <div className="text-[10px] font-extrabold text-amber-700 uppercase tracking-wider">
                      UNLOCKED MY SKY ITEM
                    </div>
                    <div className="text-xs font-black text-slate-900">
                      Golden Sanctuary Nest
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2.5 py-1 rounded-full uppercase">
                  UNLOCKED
                </span>
              </div>

              <button
                onClick={handleFeedClick}
                className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-400/20 transition-all flex items-center justify-center gap-2 border border-amber-300"
              >
                <span>NOURISH {userState.magpie.name.toUpperCase()}</span>
                <span className="text-lg">🍎</span>
              </button>
            </div>
          )}

          {/* STEP 2: MAGPIE NOURISHED & NEXT ACTIONS */}
          {step === 'growth' && (
            <div className="space-y-5 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-extrabold text-xs uppercase tracking-wider shadow-sm">
                <Heart className="w-4 h-4 text-emerald-600 fill-emerald-500" />
                <span>COMPANION NOURISHED!</span>
              </div>

              <div className="relative w-40 h-40 mx-auto flex items-center justify-center rounded-3xl bg-white/90 border-2 border-sky-100 shadow-md">
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

              <div className="max-w-md mx-auto text-left bg-white/80 p-3.5 rounded-2xl border border-sky-100 shadow-sm">
                <GrowthBar
                  level={userState.magpie.level}
                  growth={userState.magpie.growth}
                  foodNeeded={12}
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto flex-1 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 border border-amber-300"
                >
                  <span>CONTINUE JOURNEY</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>

                <button
                  onClick={onLaunchFlightChallenge}
                  className="w-full sm:w-auto py-4 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-black text-xs uppercase tracking-wider border border-slate-200 shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <span>TAKE FLIGHT (+8 FP)</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
