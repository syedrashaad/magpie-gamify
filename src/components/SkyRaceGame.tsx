import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { UserState } from '../types';
import { MagpieCharacter } from './MagpieCharacter';
import { Trophy, Zap, Wind, ArrowRight, Home, RefreshCcw, Sparkles } from 'lucide-react';

interface SkyRaceGameProps {
  userState: UserState;
  onFinishRace: (newDistance: number, eggsEarned: number, feathersEarned: number) => void;
  onReturnHome: () => void;
}

export const SkyRaceGame: React.FC<SkyRaceGameProps> = ({
  userState,
  onFinishRace,
  onReturnHome,
}) => {
  const [phase, setPhase] = useState<'branch' | 'countdown' | 'flying' | 'finish'>('branch');
  const [countdown, setCountdown] = useState(3);
  const [distance, setDistance] = useState(userState.flight.currentDistance || 112);
  const [speed, setSpeed] = useState(1);
  const [isBoosting, setIsBoosting] = useState(false);
  const [collectedItems, setCollectedItems] = useState<{ eggs: number; feathers: number }>({ eggs: 0, feathers: 0 });
  const [overtakeEvent, setOvertakeEvent] = useState<string | null>(null);

  // Competitor birds
  const competitors = [
    { name: 'Alex (Concierge)', offset: 120, color: 'gold', avatar: '🦅' },
    { name: 'Sarah (Front Desk)', offset: 60, color: 'blue', avatar: '🐦' },
    { name: 'Vikram (Guest Relations)', offset: 20, color: 'green', avatar: '🦉' },
  ];

  // Pre-Race Countdown
  const startCountdown = () => {
    setPhase('countdown');
    setCountdown(3);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setPhase('flying');
          return 0;
        }
        return prev - 1;
      });
    }, 900);
  };

  // Live Flight distance loop
  useEffect(() => {
    if (phase !== 'flying') return;

    const interval = setInterval(() => {
      setDistance((prev) => {
        const nextDist = prev + Math.floor(speed * 2.5);

        // Overtake events
        if (prev < 120 && nextDist >= 120) {
          setOvertakeEvent('OVERTOOK ALEX! 🚀');
          setTimeout(() => setOvertakeEvent(null), 1500);
        }

        // Finish line at 140m or higher
        if (nextDist >= 140) {
          clearInterval(interval);
          setTimeout(() => {
            setPhase('finish');
            confetti({
              particleCount: 70,
              spread: 80,
              origin: { y: 0.5 },
              colors: ['#F59E0B', '#6D28D9', '#38BDF8'],
            });
            onFinishRace(nextDist, collectedItems.eggs + 2, collectedItems.feathers + 1);
          }, 800);
        }

        return nextDist;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [phase, speed, collectedItems]);

  const handleBoostClick = () => {
    setIsBoosting(true);
    setSpeed(2.5);
    setCollectedItems((prev) => ({ ...prev, feathers: prev.feathers + 1 }));

    setTimeout(() => {
      setIsBoosting(false);
      setSpeed(1);
    }, 1800);
  };

  const handleCollectEgg = () => {
    setCollectedItems((prev) => ({ ...prev, eggs: prev.eggs + 1 }));
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.4 },
      colors: ['#F59E0B'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white overflow-hidden flex flex-col justify-between select-none">
      
      {/* Parallax Sky Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-900 via-indigo-950 to-slate-950 overflow-hidden">
        {/* Sun Glow */}
        <div className="absolute top-10 right-20 w-72 h-72 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />

        {/* Parallax Clouds */}
        <motion.div
          animate={{ x: phase === 'flying' ? [-50, -600] : [0, -40] }}
          transition={{ duration: phase === 'flying' ? (isBoosting ? 3 : 6) : 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 pointer-events-none opacity-30 flex items-center justify-around"
        >
          <div className="text-8xl">☁️</div>
          <div className="text-9xl">☁️</div>
          <div className="text-7xl">☁️</div>
        </motion.div>

        {/* Speed lines when boosting */}
        {isBoosting && (
          <div className="absolute inset-0 pointer-events-none opacity-40 bg-[repeating-linear-gradient(90deg,transparent,transparent_40px,rgba(255,255,255,0.2)_40px,rgba(255,255,255,0.2)_80px)] animate-pulse" />
        )}
      </div>

      {/* Floating Header HUD */}
      <div className="relative z-20 p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onReturnHome}
            className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors flex items-center gap-2 text-xs font-bold"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </button>
          <span className="text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-3 py-1.5 rounded-full shadow-md">
            BOOST LANE ARENA 🚀
          </span>
        </div>

        {/* Floating Distance HUD */}
        <div className="bg-slate-900/80 backdrop-blur-md border border-purple-500/40 px-5 py-2.5 rounded-2xl flex items-center gap-4">
          <div className="text-right">
            <span className="block text-[10px] uppercase font-bold text-purple-300">Distance</span>
            <span className="font-serif font-black text-2xl text-amber-300">{distance}m</span>
          </div>
          <div className="h-6 w-[1px] bg-purple-700" />
          <div className="text-left">
            <span className="block text-[10px] uppercase font-bold text-purple-300">Personal Best</span>
            <span className="font-extrabold text-sm text-white">{userState.flight.personalBest}m</span>
          </div>
        </div>
      </div>

      {/* PHASE 1: PRE-RACE BRANCH */}
      {phase === 'branch' && (
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
            className="bg-white text-slate-900 px-6 py-3 rounded-2xl font-bold text-sm shadow-xl mb-6"
          >
            "{userState.magpie.name} is ready on the branch! Ready to beat your 112m record?"
          </motion.div>

          <button
            onClick={startCountdown}
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-black text-base shadow-2xl hover:scale-105 transition-transform flex items-center gap-2"
          >
            <Trophy className="w-5 h-5 fill-slate-950" />
            <span>LAUNCH INTO SKY RACE</span>
          </button>
        </div>
      )}

      {/* PHASE 2: COUNTDOWN OVERLAY */}
      {phase === 'countdown' && (
        <div className="relative z-30 flex-1 flex flex-col items-center justify-center text-center">
          <motion.div
            key={countdown}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            className="font-serif font-black text-8xl text-amber-300 drop-shadow-2xl"
          >
            {countdown > 0 ? countdown : 'FLY!'}
          </motion.div>
        </div>
      )}

      {/* PHASE 3: LIVE FLIGHT */}
      {phase === 'flying' && (
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center">
          
          {/* Overtake Event Popup */}
          <AnimatePresence>
            {overtakeEvent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: -20 }}
                animate={{ opacity: 1, scale: 1.2, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: -20 }}
                className="absolute top-12 bg-amber-400 text-slate-950 font-black text-lg px-6 py-2 rounded-full shadow-2xl z-30"
              >
                {overtakeEvent}
              </motion.div>
            )}
          </AnimatePresence>

          {/* User's Magpie Flying Canvas */}
          <div className="relative flex items-center justify-center">
            <div className="w-72 h-72">
              <MagpieCharacter
                bodyColor={userState.magpie.bodyColor}
                featherStyle={userState.magpie.featherStyle}
                accessory={userState.magpie.accessory}
                level={userState.magpie.level}
                isFlying={true}
                size="hero"
              />
            </div>

            {/* Flying Competitor Birds */}
            {competitors.map((comp, idx) => (
              <motion.div
                key={idx}
                animate={{ x: [0, -15, 0] }}
                transition={{ duration: 1.5 + idx * 0.5, repeat: Infinity }}
                className="absolute -right-32 flex items-center gap-1.5 bg-slate-900/80 border border-slate-700 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md"
                style={{ top: `${(idx + 1) * 40}px` }}
              >
                <span>{comp.avatar}</span>
                <span>{comp.name}</span>
              </motion.div>
            ))}
          </div>

          {/* Collectible In-flight Items */}
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={handleCollectEgg}
              className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold text-xs flex items-center gap-1.5 hover:bg-amber-500/30 transition-colors"
            >
              <span>🥚</span>
              <span>Collect Golden Egg (+1)</span>
            </button>
          </div>

        </div>
      )}

      {/* PHASE 4: FINISH RESULTS */}
      {phase === 'finish' && (
        <div className="relative z-30 flex-1 flex flex-col items-center justify-center text-center p-6 space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 font-black text-xs uppercase tracking-widest"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>NEW PERSONAL BEST FLIGHT!</span>
          </motion.div>

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
              Previous Record: <span className="line-through text-slate-400">112m</span> → New Record: <strong className="text-amber-300">{distance}m!</strong>
            </p>
          </div>

          <div className="bg-slate-900/80 border border-purple-500/30 rounded-2xl p-4 max-w-sm mx-auto text-xs text-slate-300">
            <p className="font-bold text-emerald-400 mb-1">✨ Your Magpie grew stronger!</p>
            <p>Earned: +2 Eggs 🥚, +1 Feather 🪶</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setPhase('branch');
                setDistance(userState.flight.personalBest);
              }}
              className="px-6 py-3.5 rounded-2xl bg-amber-500 text-slate-950 font-bold text-xs shadow-xl flex items-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" />
              <span>FLY AGAIN</span>
            </button>

            <button
              onClick={onReturnHome}
              className="px-6 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white font-bold text-xs flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>RETURN HOME</span>
            </button>
          </div>
        </div>
      )}

      {/* Flight Control Footer Bar */}
      {phase === 'flying' && (
        <div className="relative z-20 p-6 bg-slate-900/90 border-t border-purple-500/30 flex items-center justify-between">
          <div className="text-xs text-slate-400 font-semibold">
            Tap boost to accelerate Nova's flight speed!
          </div>

          <button
            onClick={handleBoostClick}
            disabled={isBoosting}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-black text-xs shadow-xl hover:scale-105 transition-all flex items-center gap-2"
          >
            <Wind className="w-4 h-4" />
            <span>{isBoosting ? 'BOOSTING SPEED... ⚡' : 'BOOST FLIGHT (SPEED UP)'}</span>
          </button>
        </div>
      )}

    </div>
  );
};
