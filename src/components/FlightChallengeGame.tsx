import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { UserState } from '../types';
import { MagpieCharacter } from './MagpieCharacter';
import { Zap, Trophy, ArrowRight, RefreshCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FlightChallengeGameProps {
  userState: UserState;
  onFinishChallenge: (flightPowerGained: number) => void;
  onClose: () => void;
}

export const FlightChallengeGame: React.FC<FlightChallengeGameProps> = ({
  userState,
  onFinishChallenge,
  onClose,
}) => {
  const [birdY, setBirdY] = useState(150);
  const [velocity, setVelocity] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(12); // 12 seconds challenge

  const gameLoopRef = useRef<number | null>(null);

  // Jump / Flap handler
  const handleFlap = () => {
    if (!isStarted) setIsStarted(true);
    if (isGameOver) return;
    setVelocity(-6.5);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleFlap();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStarted, isGameOver]);

  // Main game loop
  useEffect(() => {
    if (!isStarted || isGameOver) return;

    const interval = setInterval(() => {
      setBirdY((prev) => {
        const next = prev + velocity;
        if (next > 260) return 260; // floor bound
        if (next < 20) return 20; // ceiling bound
        return next;
      });

      setVelocity((prev) => prev + 0.45); // gravity

      setScore((prev) => prev + 1);
    }, 30);

    return () => clearInterval(interval);
  }, [isStarted, velocity, isGameOver]);

  // Timer Countdown
  useEffect(() => {
    if (!isStarted || isGameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsGameOver(true);
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.5 },
            colors: ['#F59E0B', '#7C3AED', '#10B981'],
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, isGameOver]);

  const handleComplete = () => {
    const gainedFP = 8;
    onFinishChallenge(gainedFP);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto max-w-full">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-purple-500/30 rounded-3xl shadow-2xl p-4 sm:p-6 text-white text-center my-auto">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span className="font-bold text-sm text-amber-300 uppercase tracking-wide">FLIGHT CHALLENGE</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="text-purple-300">Time: {timeLeft}s</span>
            <span className="text-amber-400 font-extrabold">{score}m Distance</span>
          </div>
        </div>

        {/* 2D Arcade Canvas Stage */}
        <div
          onClick={handleFlap}
          className="relative w-full h-72 bg-gradient-to-b from-indigo-950 via-slate-900 to-purple-950 rounded-2xl border border-slate-800 overflow-hidden cursor-pointer flex flex-col justify-between p-4 selection:bg-none"
        >
          {/* Background Sky Grid Line */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.15)_0%,transparent_70%)] pointer-events-none" />

          {/* Prompt Overlay before start */}
          {!isStarted && !isGameOver && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/60 p-4">
              <span className="text-4xl mb-2">🪽</span>
              <h3 className="font-bold text-lg text-white">Tap Screen or Press Spacebar</h3>
              <p className="text-xs text-purple-300 mt-1">Flap Nova upward to collect Flight Power boost!</p>
            </div>
          )}

          {/* Bounded Nova Bird Character */}
          <div
            className="absolute left-16 w-14 h-14 transition-all duration-75"
            style={{ top: `${birdY}px` }}
          >
            <MagpieCharacter
              bodyColor={userState.magpie.bodyColor}
              featherStyle={userState.magpie.featherStyle}
              accessory={userState.magpie.accessory}
              level={userState.magpie.level}
              size="sm"
            />
          </div>

          {/* Obstacle / Cloud Elements passing by */}
          {isStarted && !isGameOver && (
            <div className="absolute top-12 right-0 w-16 h-12 bg-purple-500/20 rounded-full blur-xs animate-pulse" />
          )}

          {/* Floor ground */}
          <div className="absolute bottom-0 inset-x-0 h-3 bg-purple-900/60 border-t border-purple-500/30" />
        </div>

        {/* Game Completed Result Screen */}
        {isGameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 space-y-4"
          >
            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 font-extrabold text-xs px-3 py-1 rounded-full uppercase">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>CHALLENGE COMPLETE!</span>
            </div>

            <div>
              <h3 className="font-bold text-2xl text-white">+8 Flight Power Gained!</h3>
              <p className="text-xs text-slate-300 mt-1">
                Your Flight Power rose from {userState.flightPower} FP to <strong className="text-amber-400">{userState.flightPower + 8} FP</strong>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleComplete}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>OVERTAKE ON SKY LEAGUE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};
