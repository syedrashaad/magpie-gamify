import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserState } from '../types';
import { MagpieCharacter } from './MagpieCharacter';
import { Magpie3DCanvas } from './Magpie3DCanvas';
import { GrowthBar } from './GrowthBar';
import { CurrenciesDisplay } from './CurrenciesDisplay';
import {
  Play,
  Trophy,
  Sparkles,
  ArrowRight,
  Settings2,
  RotateCcw,
  Volume2,
} from 'lucide-react';

interface MagpieHomeProps {
  userState: UserState;
  onStartScenario: () => void;
  onOpenSkyRace: () => void;
  onOpenCustomize: () => void;
  onResetState: () => void;
}

export const MagpieHome: React.FC<MagpieHomeProps> = ({
  userState,
  onStartScenario,
  onOpenSkyRace,
  onOpenCustomize,
  onResetState,
}) => {
  const [use3DView, setUse3DView] = useState(false);

  // Dynamic bird speech dialogue
  const magpieSpeech = `Hey ${userState.name.split(' ')[0]}. Mr. Iyer is waiting at reception. Ready to fly?`;

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-6 space-y-6">
      
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black uppercase tracking-wider bg-purple-100 text-purple-900 px-3 py-1 rounded-full border border-purple-200">
              Sandalwood Grand • Front Office
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {userState.flightDays} Flight Days Streak 🪽
            </span>
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            GOOD AFTERNOON, {userState.name.split(' ')[0].toUpperCase()}
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
            Your Magpie <strong className="text-purple-800 font-serif font-bold text-base">{userState.magpie.name}</strong> is ready to fly.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setUse3DView(!use3DView)}
            className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:border-purple-300 transition-all flex items-center gap-1.5 shadow-xs"
          >
            <span>{use3DView ? '3D Canvas' : '2.5D Mode'}</span>
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          </button>

          <button
            onClick={onOpenCustomize}
            className="px-3.5 py-2 rounded-xl bg-purple-50 border border-purple-200 text-xs font-bold text-purple-900 hover:bg-purple-100 transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Settings2 className="w-3.5 h-3.5 text-purple-700" />
            <span>Customize {userState.magpie.name}</span>
          </button>
        </div>
      </div>

      {/* Main Character Stage (The Magpie is the Hero) */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-sky-950 via-purple-950 to-indigo-950 text-white border border-purple-500/30 p-8 sm:p-10 shadow-2xl flex flex-col items-center justify-between min-h-[520px]">
        
        {/* Parallax Background Sky Effect */}
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#a78bfa_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="absolute top-8 left-12 text-5xl opacity-20 pointer-events-none animate-float-slow">☁️</div>
        <div className="absolute top-20 right-16 text-6xl opacity-20 pointer-events-none animate-float-slow">☁️</div>

        {/* Speech Bubble Overlay */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 bg-white/95 backdrop-blur-md text-slate-900 px-6 py-3.5 rounded-2xl border border-purple-300 shadow-2xl max-w-lg text-center text-sm font-semibold mb-4"
        >
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-purple-300 rotate-45" />
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider mb-1">
            <Volume2 className="w-3.5 h-3.5 text-purple-600" />
            <span>{userState.magpie.name} Speaks:</span>
          </div>
          <p className="text-slate-800 text-sm font-medium leading-relaxed">"{magpieSpeech}"</p>
        </motion.div>

        {/* Magpie Hero Bird Display */}
        <div className="relative z-10 my-2 flex flex-col items-center justify-center">
          <div className="w-72 h-72 sm:w-80 sm:h-80 relative flex items-center justify-center">
            {use3DView ? (
              <Magpie3DCanvas
                bodyColor={userState.magpie.bodyColor}
                accessory={userState.magpie.accessory}
                level={userState.magpie.level}
                className="w-full h-full"
              />
            ) : (
              <MagpieCharacter
                bodyColor={userState.magpie.bodyColor}
                featherStyle={userState.magpie.featherStyle}
                accessory={userState.magpie.accessory}
                level={userState.magpie.level}
                size="hero"
              />
            )}
          </div>

          <div className="text-center mt-1">
            <span className="text-xs font-black uppercase tracking-widest text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30">
              Level {userState.magpie.level} • Young Magpie 🐦
            </span>
            <h2 className="font-serif font-bold text-3xl text-white mt-1">
              {userState.magpie.name}
            </h2>
          </div>
        </div>

        {/* Growth Bar & Primary CTA */}
        <div className="relative z-10 w-full max-w-xl space-y-4 pt-4 border-t border-purple-500/30">
          <GrowthBar
            level={userState.magpie.level}
            growth={userState.magpie.growth}
            foodNeeded={12}
          />

          <div className="flex items-center justify-center">
            <CurrenciesDisplay rewards={userState.rewards} flightDays={userState.flightDays} />
          </div>

          {/* Primary CTA Button */}
          <button
            onClick={onStartScenario}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-base tracking-wide shadow-2xl shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            <Play className="w-5 h-5 fill-slate-950" />
            <span>FLY WITH ME (START FLIGHT)</span>
          </button>
        </div>

      </div>

      {/* Mission Preview & Sky Race Gateway */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Today's Mission Brief */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-800 bg-purple-100 px-3 py-1 rounded-full">
                TODAY'S SCENARIO
              </span>
              <span className="text-xs text-slate-400 font-medium">Front Office BLR</span>
            </div>

            <h3 className="font-serif font-bold text-xl text-slate-900 mb-1">
              Wrong Charges at Checkout
            </h3>
            <p className="text-xs text-slate-600 mb-4 font-medium italic">
              "Mr. Iyer is waiting. ₹18k wrong charges on folio. Flight leaves in 90 minutes."
            </p>
          </div>

          <button
            onClick={onStartScenario}
            className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>START SCENARIO</span>
            <ArrowRight className="w-4 h-4 text-purple-400" />
          </button>
        </div>

        {/* Sky Race Gateway */}
        <div className="bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-indigo-500/10 border border-amber-500/30 rounded-3xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-200/60 px-2.5 py-0.5 rounded-md">
                YOUR FLIGHT STATUS
              </span>
              <span className="text-xs font-extrabold text-amber-800">
                🏁 BOOST LANE
              </span>
            </div>

            <div className="my-2">
              <div className="text-3xl font-serif font-black text-slate-900">
                {userState.flight.personalBest}m <span className="text-xs font-sans font-semibold text-slate-500">personal best</span>
              </div>
              <p className="text-xs text-slate-600 font-medium mt-1">
                Enter the full-screen Sky Race Arena to outpace hotel peers!
              </p>
            </div>
          </div>

          <button
            onClick={onOpenSkyRace}
            className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Trophy className="w-4 h-4 text-slate-950" />
            <span>ENTER SKY RACE ARENA</span>
          </button>
        </div>

      </div>

      {/* Reset State Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onResetState}
          className="text-[11px] font-semibold text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Demo State</span>
        </button>
      </div>

    </div>
  );
};
