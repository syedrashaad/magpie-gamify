import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { UserState } from '../types';
import { MagpieCharacter } from './MagpieCharacter';
import { Trophy, Wind, Home, RefreshCw, Sparkles, ArrowRight } from 'lucide-react';

interface PersonalFlightGameProps {
  userState: UserState;
  onFinishFlight: (newDistance: number) => void;
  onReturnHome: () => void;
}

export const PersonalFlightGame: React.FC<PersonalFlightGameProps> = ({
  userState,
  onFinishFlight,
  onReturnHome,
}) => {
  const [phase, setPhase] = useState<'launch' | 'flying' | 'victory'>('launch');
  const [distance, setDistance] = useState(userState.flight.personalBest || 112);
  const [isBoosting, setIsBoosting] = useState(false);

  const targetDistance = userState.flight.personalBest + 26; // 112m -> 138m

  const handleLaunch = () => {
    setPhase('flying');
    setDistance(userState.flight.personalBest);

    let current = userState.flight.personalBest;
    const interval = setInterval(() => {
      current += 3;
      setDistance(current);

      if (current >= targetDistance) {
        clearInterval(interval);
        setTimeout(() => {
          setPhase('victory');
          confetti({
            particleCount: 80,
            spread: 90,
            origin: { y: 0.5 },
            colors: ['#F59E0B', '#6D28D9', '#38BDF8'],
          });
          onFinishFlight(targetDistance);
        }, 600);
      }
    }, 150);
  };

  const handleBoostSpeed = () => {
    setIsBoosting(true);
    setDistance((prev) => prev + 12);
    setTimeout(() => setIsBoosting(false), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white overflow-hidden flex flex-col justify-between select-none">
      
      {/* Parallax Sky Canvas Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-900 via-indigo-950 to-slate-950 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-20 w-72 h-72 rounded-full bg-amber-400/20 blur-3xl" />

        <motion.div
          animate={{ x: phase === 'flying' ? [-50, -600] : [0, -40] }}
          transition={{ duration: phase === 'flying' ? 4 : 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 opacity-30 flex items-center justify-around"
        >
          <div className="text-8xl">☁️</div>
          <div className="text-9xl">☁️</div>
          <div className="text-7xl">☁️</div>
        </motion.div>

        {isBoosting && (
          <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(90deg,transparent,transparent_40px,rgba(255,255,255,0.2)_40px,rgba(255,255,255,0.2)_80px)] animate-pulse" />
        )}
      </div>

      {/* Floating Header HUD */}
      <div className="relative z-20 p-6 flex items-center justify-between">
        <button
          onClick={onReturnHome}
          className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors flex items-center gap-2 text-xs font-bold"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </button>

        <div className="bg-slate-900/80 backdrop-blur-md border border-purple-500/40 px-5 py-2.5 rounded-2xl flex items-center gap-4">
          <div className="text-right">
            <span className="block text-[10px] uppercase font-bold text-purple-300">Flight Distance</span>
            <span className="font-serif font-black text-2xl text-amber-300">{distance}m</span>
          </div>
          <div className="h-6 w-[1px] bg-purple-700" />
          <div className="text-left">
            <span className="block text-[10px] uppercase font-bold text-purple-300">Previous Best</span>
            <span className="font-extrabold text-sm text-white">{userState.flight.personalBest}m</span>
          </div>
        </div>
      </div>

      {/* PHASE 1: LAUNCH */}
      {phase === 'launch' && (
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center p-6">
          <div className="w-64 h-64 relative mb-4">
            <MagpieCharacter
              bodyColor={userState.magpie.bodyColor}
              featherStyle={userState.magpie.featherStyle}
              accessory={userState.magpie.accessory}
              level={userState.magpie.level}
              size="hero"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white text-slate-900 px-6 py-3.5 rounded-2xl font-bold text-sm shadow-xl mb-6 max-w-md"
          >
            "{userState.magpie.name} is ready! Potential Flight Power: {userState.flight.personalBest + 26}m. Ready to fly?"
          </motion.div>

          <button
            onClick={handleLaunch}
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-black text-base shadow-2xl hover:scale-105 transition-transform flex items-center gap-2"
          >
            <Trophy className="w-5 h-5 fill-slate-950" />
            <span>TAKE FLIGHT (FLY)</span>
          </button>
        </div>
      )}

      {/* PHASE 2: FLYING ANIMATION */}
      {phase === 'flying' && (
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center">
          <div className="w-72 h-72 relative">
            <MagpieCharacter
              bodyColor={userState.magpie.bodyColor}
              featherStyle={userState.magpie.featherStyle}
              accessory={userState.magpie.accessory}
              level={userState.magpie.level}
              isFlying={true}
              size="hero"
            />
          </div>

          <button
            onClick={handleBoostSpeed}
            disabled={isBoosting}
            className="mt-6 px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-xl flex items-center gap-2"
          >
            <Wind className="w-4 h-4" />
            <span>{isBoosting ? 'BOOSTING SPEED... ⚡' : 'BOOST FLIGHT'}</span>
          </button>
        </div>
      )}

      {/* PHASE 3: VICTORY RESULTS */}
      {phase === 'victory' && (
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center p-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 font-black text-xs uppercase tracking-widest">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>NEW PERSONAL BEST FLIGHT!</span>
          </div>

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

          <div>
            <div className="text-6xl font-black font-serif text-amber-300">
              {distance}m
            </div>
            <p className="text-xs text-purple-200 mt-1 font-semibold">
              Previous Record: <span className="line-through text-slate-400">{userState.flight.personalBest}m</span> → New Record: <strong className="text-amber-300">{distance}m!</strong>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleLaunch}
              className="px-6 py-3.5 rounded-2xl bg-amber-500 text-slate-950 font-bold text-xs shadow-xl flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>FLY AGAIN</span>
            </button>

            <button
              onClick={onReturnHome}
              className="px-6 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white font-bold text-xs flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>RETURN TO TASKS</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
