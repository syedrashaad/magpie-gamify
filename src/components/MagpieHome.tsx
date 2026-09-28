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
  Hotel,
  ArrowRight,
  Flame,
  Settings2,
  Heart,
  RotateCcw,
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
  const [use3DView, setUse3DView] = useState(true);

  // Coach dialogue states
  const coachMessages = [
    `Hey ${userState.name.split(' ')[0]}. Mr. Iyer is waiting at reception. Ready to fly?`,
    "Your Magpie is feeling strong! Let's beat your 112m personal best flight.",
    "Practice makes power! A quick flight will earn food to reach Level 3.",
  ];
  const activeMessage = coachMessages[0];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Top Welcome Header */}
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
          <p className="text-sm font-semibold text-slate-600 mt-1">
            Your Magpie <strong className="text-purple-800 font-serif font-bold">{userState.magpie.name}</strong> is ready to fly.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setUse3DView(!use3DView)}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:border-purple-300 transition-all flex items-center gap-1.5 shadow-xs"
          >
            <span>{use3DView ? '3D WebGL' : '2.5D Canvas'}</span>
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          </button>

          <button
            onClick={onOpenCustomize}
            className="px-3.5 py-2 rounded-xl bg-purple-50 border border-purple-200 text-xs font-bold text-purple-900 hover:bg-purple-100 transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Settings2 className="w-3.5 h-3.5 text-purple-700" />
            <span>Customize</span>
          </button>
        </div>
      </div>

      {/* Hero Section: 3D/2.5D Character Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Main Hero Card */}
        <div className="lg:col-span-7 bg-gradient-to-b from-slate-900 via-purple-950 to-indigo-950 border border-purple-500/30 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[460px]">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#a78bfa_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Coach Speech Bubble Overlay */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 self-center bg-white/95 backdrop-blur-md text-slate-900 px-5 py-3 rounded-2xl border border-purple-300 shadow-xl max-w-md text-center text-xs sm:text-sm font-semibold mb-2"
          >
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-purple-300 rotate-45" />
            <p>"{activeMessage}"</p>
          </motion.div>

          {/* 3D / 2.5D Magpie Character Stage */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center">
            <div className="w-72 h-72 relative flex items-center justify-center">
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

            <div className="text-center mt-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30">
                Level {userState.magpie.level} • Young Magpie 🐦
              </span>
              <h2 className="font-serif font-bold text-2xl text-white mt-1">
                {userState.magpie.name}
              </h2>
            </div>
          </div>

          {/* Growth Bar & Currencies Footer inside Hero */}
          <div className="relative z-10 space-y-4 pt-4 border-t border-purple-500/30">
            <GrowthBar
              level={userState.magpie.level}
              growth={userState.magpie.growth}
              foodNeeded={12}
            />

            <div className="flex items-center justify-between">
              <CurrenciesDisplay rewards={userState.rewards} flightDays={userState.flightDays} />
            </div>

            <button
              onClick={onStartScenario}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm tracking-wide shadow-xl shadow-purple-600/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>START TODAY'S FLIGHT</span>
            </button>
          </div>
        </div>

        {/* Right Column: Mission Card & Flight Status */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          
          {/* Today's Mission Card */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-800 bg-purple-100 px-3 py-1 rounded-full">
                TODAY'S MISSION
              </span>
              <span className="text-xs text-slate-400 font-medium">Front Office BLR</span>
            </div>

            <h3 className="font-serif font-bold text-xl text-slate-900 mb-1">
              Wrong Charges at Checkout
            </h3>
            <p className="text-xs text-slate-600 mb-4 font-medium italic">
              "Mr. Iyer is waiting. ₹18k wrong charges on folio. Flight leaves in 90 minutes."
            </p>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Reward Yield:</span>
                <span className="font-bold text-emerald-700">+3 Food • +2 Feathers • +1 Egg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Target Score:</span>
                <span className="font-bold text-slate-800">8/10 or higher</span>
              </div>
            </div>

            <button
              onClick={onStartScenario}
              className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>START MISSION</span>
              <ArrowRight className="w-4 h-4 text-purple-400" />
            </button>
          </div>

          {/* Your Flight Status Card */}
          <div className="bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-indigo-500/10 border border-amber-500/30 rounded-3xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-200/60 px-2.5 py-0.5 rounded-md">
                YOUR FLIGHT STATUS
              </span>
              <span className="text-xs font-extrabold text-amber-800">
                🏁 BOOST LANE
              </span>
            </div>

            <div className="my-3">
              <div className="text-3xl font-serif font-black text-slate-900">
                112m <span className="text-xs font-sans font-semibold text-slate-500">personal best</span>
              </div>
              <p className="text-xs text-slate-600 font-medium mt-1">
                You are currently ranked in the top 15% of Sandalwood Grand associates!
              </p>
            </div>

            <button
              onClick={onOpenSkyRace}
              className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Trophy className="w-4 h-4 text-slate-950" />
              <span>ENTER SKY RACE</span>
            </button>
          </div>

          {/* Reset Demo State Button */}
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
      </div>

    </div>
  );
};
