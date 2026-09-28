import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { UserState, FlightLane } from '../types';
import { MagpieCharacter } from './MagpieCharacter';
import { Trophy, Zap, Wind, Award, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';

interface SkyRaceViewProps {
  userState: UserState;
  onUpdateDistance: (newDistance: number) => void;
  onStartScenario: () => void;
}

export const SkyRaceView: React.FC<SkyRaceViewProps> = ({
  userState,
  onUpdateDistance,
  onStartScenario,
}) => {
  const [distance, setDistance] = useState(userState.flight.currentDistance || 112);
  const [isBoosting, setIsBoosting] = useState(false);
  const [activeBooster, setActiveBooster] = useState<string | null>(null);

  // Lanes Definition
  const lanes: { id: FlightLane; name: string; req: string; color: string; bg: string }[] = [
    { id: 'GOLDEN', name: 'GOLDEN LANE', req: '51+ Eggs', color: 'border-amber-400 text-amber-300', bg: 'bg-amber-950/40' },
    { id: 'BOOST', name: 'BOOST LANE', req: '26-50 Eggs (Unlocked)', color: 'border-purple-400 text-purple-300', bg: 'bg-purple-900/40' },
    { id: 'FLIGHT', name: 'FLIGHT LANE', req: '11-25 Eggs', color: 'border-blue-400 text-blue-300', bg: 'bg-blue-900/40' },
    { id: 'PRACTICE', name: 'PRACTICE LANE', req: '0-10 Eggs', color: 'border-slate-500 text-slate-400', bg: 'bg-slate-900/40' },
  ];

  // Competitors
  const competitors = [
    { name: 'Alex (Senior Concierge)', distance: 168, lane: 'GOLDEN', avatar: '🦅' },
    { name: `${userState.name} (You)`, distance: distance, lane: userState.flight.lane, isUser: true },
    { name: 'Sarah (Front Desk Agent)', distance: 88, lane: 'FLIGHT', avatar: '🐦' },
    { name: 'Vikram (Guest Relations)', distance: 42, lane: 'PRACTICE', avatar: '🦉' },
  ];

  const handleFlyAgainBoost = () => {
    setIsBoosting(true);
    setActiveBooster('Wind Boost + Feather Power');

    const added = Math.floor(Math.random() * 15) + 15;
    const newDist = distance + added;
    setDistance(newDist);
    onUpdateDistance(newDist);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.4 },
      colors: ['#38BDF8', '#F59E0B', '#6D28D9'],
    });

    setTimeout(() => {
      setIsBoosting(false);
      setActiveBooster(null);
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Race Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white border border-purple-500/30 p-8 shadow-2xl">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#a78bfa_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black uppercase tracking-widest bg-amber-400 text-slate-950 px-3 py-1 rounded-full">
                SKY RACE ARENA 🏁
              </span>
              <span className="text-xs font-semibold text-purple-300">
                Sandalwood Grand Leaderboard Alternative
              </span>
            </div>
            <h1 className="font-serif font-bold text-3xl md:text-4xl text-white tracking-tight">
              Fly Higher With Workplace Mastery
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 mt-2 max-w-xl">
              In Magpie AI, performance translates directly into flight distance. Earn eggs to climb flight lanes and outpace hotel peers!
            </p>
          </div>

          {/* Stats Box */}
          <div className="flex flex-wrap items-center gap-4 bg-slate-900/80 border border-purple-500/40 p-4 rounded-2xl">
            <div className="text-left">
              <span className="block text-[10px] font-bold uppercase text-purple-300">Current Lane</span>
              <span className="font-extrabold text-sm text-amber-400">BOOST LANE 🚀</span>
            </div>
            <div className="h-8 w-[1px] bg-purple-800" />
            <div className="text-left">
              <span className="block text-[10px] font-bold uppercase text-purple-300">Personal Best</span>
              <span className="font-extrabold text-sm text-white">{distance}m</span>
            </div>
            <div className="h-8 w-[1px] bg-purple-800" />
            <div className="text-left">
              <span className="block text-[10px] font-bold uppercase text-purple-300">Flight Power</span>
              <span className="font-extrabold text-sm text-emerald-400">{userState.flight.power} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sky Race Parallax Flight Track */}
      <div className="relative bg-gradient-to-b from-sky-900 via-indigo-950 to-slate-950 border border-purple-500/30 rounded-3xl p-6 shadow-2xl overflow-hidden min-h-[480px]">
        
        {/* Parallax Clouds & Finish Line */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-10 left-10 text-6xl animate-float-slow">☁️</div>
          <div className="absolute top-32 right-20 text-7xl animate-float-slow">☁️</div>
          <div className="absolute bottom-10 left-1/3 text-6xl animate-float-slow">☁️</div>
        </div>

        {/* Finish Line Checkered Strip */}
        <div className="absolute right-8 top-0 bottom-0 w-8 border-l-2 border-dashed border-amber-400/80 bg-[repeating-linear-gradient(45deg,#000,#000_10px,#fff_10px,#fff_20px)] opacity-30 pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between text-xs font-bold text-white mb-2">
            <span>START LINE (0m)</span>
            <span className="text-amber-300">FINISH LINE (200m) 🏁</span>
          </div>

          {/* 4 Lanes */}
          {lanes.map((lane) => {
            const laneCompetitors = competitors.filter(c => c.lane === lane.id);
            const isUserLane = userState.flight.lane === lane.id;

            return (
              <div
                key={lane.id}
                className={`relative min-h-[90px] border-2 rounded-2xl p-3 flex flex-col justify-between overflow-hidden transition-all ${lane.bg} ${lane.color}`}
              >
                <div className="flex items-center justify-between text-[11px] font-black tracking-wider uppercase">
                  <span>{lane.name}</span>
                  <span className="opacity-80">{lane.req}</span>
                </div>

                {/* Track Lane Path */}
                <div className="relative w-full h-12 flex items-center">
                  
                  {/* Competitor / User Birds inside Lane */}
                  {laneCompetitors.map((comp, idx) => {
                    const progressPercent = Math.min(Math.max((comp.distance / 200) * 100, 5), 92);
                    return (
                      <motion.div
                        key={idx}
                        animate={
                          comp.isUser && isBoosting
                            ? {
                                x: [`${progressPercent}%`, `${progressPercent + 10}%`],
                              }
                            : {
                                x: `${progressPercent}%`,
                              }
                        }
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="absolute flex items-center gap-2 -translate-x-1/2"
                      >
                        {comp.isUser ? (
                          <div className="relative flex items-center">
                            {/* User Magpie Bird */}
                            <div className="w-12 h-12">
                              <MagpieCharacter
                                bodyColor={userState.magpie.bodyColor}
                                featherStyle={userState.magpie.featherStyle}
                                accessory={userState.magpie.accessory}
                                level={userState.magpie.level}
                                isFlying={true}
                                size="sm"
                              />
                            </div>
                            <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow-md whitespace-nowrap ml-1">
                              {userState.name.split(' ')[0]} ({comp.distance}m) 🚀
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 bg-slate-900/90 text-white border border-slate-700 px-2.5 py-1 rounded-full text-xs font-semibold shadow-xs">
                            <span>{comp.avatar}</span>
                            <span>{comp.name}</span>
                            <span className="text-amber-400 font-bold">({comp.distance}m)</span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}

                  {!laneCompetitors.length && (
                    <div className="text-[10px] text-slate-500 italic pl-4">
                      No competitors currently in this lane
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Boost CTA Footer inside Race */}
        <div className="mt-8 pt-6 border-t border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
            <div className="text-left">
              <span className="block text-xs font-bold text-white">
                Earned Boosters Available
              </span>
              <span className="text-[10px] text-purple-200">
                Feather Boost • Golden Egg • Perfect Flight (3/3 Ready)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleFlyAgainBoost}
              disabled={isBoosting}
              className="flex-1 sm:flex-initial px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 hover:scale-[1.03] transition-all flex items-center justify-center gap-2"
            >
              <Wind className="w-4 h-4" />
              <span>{isBoosting ? 'BOOSTING FLIGHT...' : 'FLY AGAIN (BOOST DISTANCE)'}</span>
            </button>

            <button
              onClick={onStartScenario}
              className="flex-1 sm:flex-initial px-6 py-3.5 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs border border-purple-500/40 shadow-lg flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>PRACTICE NEW SCENARIO</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
