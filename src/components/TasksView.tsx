import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserState, Teammate } from '../types';
import { DEMO_UNITS, ScenarioData } from '../data/scenarios';
import { MagpieCharacter } from './MagpieCharacter';
import {
  HotelEntranceIllustration,
  ConciergeDeskIllustration,
  CheckoutCounterIllustration,
  GuestServicesIllustration,
  NightArrivalIllustration,
  DiningRestaurantIllustration,
  GuestSuitesIllustration,
  SpaPoolDeckIllustration,
  VIPLoungeIllustration,
  CommandCenterIllustration,
} from './HotelMapIllustrations';
import { Check, Lock, Play, ArrowRight, Sparkles, Flame, Trophy, Info, Star, Cloud } from 'lucide-react';

interface TasksViewProps {
  userState: UserState;
  teammates: Teammate[];
  unlockedScenarioIds: string[];
  completedScenarioIds: string[];
  activeScenarioId: string;
  onSelectScenario: (scenario: ScenarioData) => void;
  onNavigateToSkyLeague: () => void;
}

export const TasksView: React.FC<TasksViewProps> = ({
  userState,
  teammates,
  unlockedScenarioIds,
  completedScenarioIds,
  activeScenarioId,
  onSelectScenario,
  onNavigateToSkyLeague,
}) => {
  const [hoveredTeammate, setHoveredTeammate] = useState<Teammate | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Helper for Desktop Winding SVG Sky Path (>= 1024px)
  const getNodePositionDesktop = (globalIndex: number) => {
    const unitIndex = Math.floor(globalIndex / 5);
    const inUnitIndex = globalIndex % 5;
    const xPattern = [25, 50, 75, 50, 25];
    const xPct = xPattern[inUnitIndex];
    const yPx = unitIndex * 780 + inUnitIndex * 135 + 160;
    return { xPct, yPx };
  };

  const buildSvgPathDesktop = () => {
    let d = '';
    const totalLevels = 25;
    for (let i = 0; i < totalLevels; i++) {
      const pos = getNodePositionDesktop(i);
      const xPx = (pos.xPct / 100) * 600;
      const yPx = pos.yPx;

      if (i === 0) {
        d += `M ${xPx} ${yPx}`;
      } else {
        const prevPos = getNodePositionDesktop(i - 1);
        const prevXPx = (prevPos.xPct / 100) * 600;
        const prevYPx = prevPos.yPx;
        const cy1 = prevYPx + (yPx - prevYPx) / 2;
        const cy2 = prevYPx + (yPx - prevYPx) / 2;
        d += ` C ${prevXPx} ${cy1}, ${xPx} ${cy2}, ${xPx} ${yPx}`;
      }
    }
    return d;
  };

  const getDestinationIllustration = (levelNum: number) => {
    switch (levelNum) {
      case 1:
        return <HotelEntranceIllustration className="w-14 h-14 sm:w-20 sm:h-20" />;
      case 2:
        return <ConciergeDeskIllustration className="w-14 h-14 sm:w-20 sm:h-20" />;
      case 3:
        return <CheckoutCounterIllustration className="w-16 h-16 sm:w-24 sm:h-24" />;
      case 4:
        return <GuestServicesIllustration className="w-14 h-14 sm:w-20 sm:h-20" />;
      case 5:
        return <NightArrivalIllustration className="w-14 h-14 sm:w-20 sm:h-20" />;
      case 6:
      case 7:
        return <DiningRestaurantIllustration className="w-14 h-14 sm:w-20 sm:h-20" />;
      case 11:
      case 14:
        return <GuestSuitesIllustration className="w-14 h-14 sm:w-20 sm:h-20" />;
      case 15:
        return <SpaPoolDeckIllustration className="w-14 h-14 sm:w-20 sm:h-20" />;
      case 16:
      case 20:
        return <VIPLoungeIllustration className="w-14 h-14 sm:w-20 sm:h-20" />;
      case 21:
      case 25:
        return <CommandCenterIllustration className="w-14 h-14 sm:w-20 sm:h-20" />;
      default:
        return <ConciergeDeskIllustration className="w-14 h-14 sm:w-20 sm:h-20" />;
    }
  };

  const allScenarios = DEMO_UNITS.flatMap((u) => u.scenarios);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 sm:space-y-8 pb-28 sm:pb-32 overflow-x-hidden box-border">
      
      {/* TOAST POPUP NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-bold border border-amber-400 flex items-center gap-2 max-w-[90vw] text-center"
          >
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAGPIE SKY HERO SPEECH BUBBLE & HEADER */}
      <div className="bg-gradient-to-b from-sky-50 via-blue-50 to-amber-50 border-2 border-white rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Nova Character Speech Bubble */}
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 shrink-0 bg-white rounded-2xl border-2 border-sky-100 flex items-center justify-center shadow-md">
              <MagpieCharacter
                bodyColor={userState.magpie.bodyColor}
                featherStyle={userState.magpie.featherStyle}
                accessory={userState.magpie.accessory}
                level={userState.magpie.level}
                isCelebrating={true}
                size="md"
              />
            </div>

            <div className="space-y-1 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3 h-3 fill-slate-950" />
                <span>FLY TO YOUR NEXT DESTINATION</span>
              </div>
              <h1 className="font-black text-2xl text-slate-900 tracking-tight">
                Destination Level 03 Active
              </h1>
              <p className="text-xs font-medium text-slate-600">
                "{userState.magpie.name} is ready! Complete VIP Guest Late Check-in to earn +20 XP."
              </p>
            </div>
          </div>

          {/* Right: Team Presence Widget */}
          <div className="bg-white/90 border border-sky-100 p-3 px-4 rounded-2xl flex items-center justify-between sm:justify-start gap-4 shrink-0 shadow-sm w-full md:w-auto">
            <div>
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-sky-700">
                Hotel Sky Team
              </span>
              <span className="text-xs font-bold text-slate-800">
                24 associates <span className="text-amber-600 font-extrabold">(6 soaring)</span>
              </span>
              
              <div className="flex items-center gap-1.5 mt-1.5">
                {teammates.slice(0, 4).map((tm) => (
                  <div
                    key={tm.id}
                    title={`${tm.name} (${tm.role}) • ${tm.xp} XP`}
                    className="w-6 h-6 rounded-full bg-sky-100 border border-sky-300 flex items-center justify-center text-[10px] font-black text-sky-900 shadow-sm cursor-pointer hover:scale-110 transition-transform"
                  >
                    {tm.name.charAt(0)}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onNavigateToSkyLeague}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md transition-all flex items-center gap-1 shrink-0 border border-amber-300"
            >
              <span>SKY LEAGUE</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
            </button>
          </div>

        </div>

        {/* Status Pills */}
        <div className="pt-3 border-t border-sky-100 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-bold text-slate-700">
          <div className="flex items-center gap-1.5 bg-white text-sky-800 px-3 py-1 rounded-full border border-sky-200 text-[11px] sm:text-xs shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <span>82% Sky Journey Mastery</span>
          </div>

          <div className="flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300 text-[11px] sm:text-xs shadow-sm">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0" />
            <span>🔥 {userState.streak} Day Streak</span>
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-sky-200 text-slate-800 px-3 py-1 rounded-full text-[11px] sm:text-xs shadow-sm">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>{userState.xp} XP Earned</span>
          </div>
        </div>
      </div>

      {/* ROTATING DAILY HOSPITALITY CHALLENGE CARD */}
      <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white p-4 sm:p-5 rounded-3xl border-2 border-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xl shrink-0 shadow-md border border-amber-300">
            🎯
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase text-slate-950 bg-amber-400 px-2.5 py-0.5 rounded-full shadow-sm">
                DAILY SKY CHALLENGE
              </span>
              <span className="text-[10px] text-sky-100 font-bold">Resets in 8h</span>
            </div>
            <h4 className="font-black text-white text-sm sm:text-base mt-1">
              Master 1 VIP Guest Check-in Scenario Today
            </h4>
            <p className="text-xs text-sky-100 font-medium">
              Reward: <span className="text-amber-300 font-black">+10 XP · +3 Food 🍎 · +2 Feathers 🪶</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            const activeSc = allScenarios.find((s) => s.id === activeScenarioId) || allScenarios[2];
            onSelectScenario(activeSc);
          }}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-1.5 shrink-0 border border-amber-300"
        >
          <span>ACCEPT CHALLENGE</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. MOBILE SKY MAP LAYOUT (< 1024px)                                      */}
      {/* ========================================================================= */}
      <div className="lg:hidden space-y-8 w-full max-w-full overflow-x-hidden box-border">
        {DEMO_UNITS.map((unit, unitIdx) => (
          <div key={unit.id} className="space-y-6">
            
            {/* REGION HEADER */}
            <div className="bg-white/90 border-2 border-sky-100 p-4 rounded-3xl shadow-sm space-y-1 text-center w-full">
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">{unit.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-800 bg-sky-100 px-3 py-0.5 rounded-full">
                  REGION 0{unitIdx + 1} · {unit.title}
                </span>
              </div>
              <h3 className="font-black text-base text-slate-900">{unit.atmosphere}</h3>
              <p className="text-xs text-slate-600 font-medium">"{unit.subtitle}"</p>
            </div>

            {/* REGION LEVEL DESTINATIONS LIST */}
            <div className="space-y-6 relative pl-4 pr-2">
              {/* Connecting Vertical Trail Line */}
              <div className="absolute left-9 top-6 bottom-6 w-2 bg-gradient-to-b from-sky-300 via-amber-300 to-sky-200 rounded-full pointer-events-none z-0" />

              {unit.scenarios.map((scenario, scenarioIdx) => {
                const globalIdx = unitIdx * 5 + scenarioIdx;
                const isCompleted = completedScenarioIds.includes(scenario.id);
                const isUnlocked = unlockedScenarioIds.includes(scenario.id) || isCompleted;
                const isActive = scenario.id === activeScenarioId || (!isCompleted && isUnlocked && globalIdx === 2);
                const isUserHere = userState.currentLevelNumber === scenario.levelNumber || isActive;
                const teammatesHere = teammates.filter((t) => t.currentLevelNumber === scenario.levelNumber);

                return (
                  <div key={scenario.id} className="relative z-10 flex flex-col space-y-3">
                    
                    {/* LEVEL NODE ROW */}
                    <div className="flex items-start gap-4">
                      
                      {/* Left: Level Circular Node Button */}
                      <div className="relative shrink-0 flex flex-col items-center">
                        <button
                          onClick={() => {
                            if (isUnlocked) {
                              onSelectScenario(scenario);
                            } else {
                              showToast(`Complete Level ${scenario.levelNumber - 1} first to unlock Level ${scenario.levelNumber}!`);
                            }
                          }}
                          className={`w-13 h-13 rounded-full flex flex-col items-center justify-center font-bold transition-all duration-200 shadow-md relative z-10 ${
                            isCompleted
                              ? 'bg-emerald-500 text-white ring-4 ring-emerald-100'
                              : isActive
                              ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-200 scale-105 animate-pulse'
                              : isUnlocked
                              ? 'bg-sky-500 text-white ring-4 ring-sky-100'
                              : 'bg-slate-100 text-slate-400 border border-slate-300 cursor-not-allowed'
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="w-5 h-5 stroke-[3]" />
                          ) : isActive ? (
                            <Play className="w-5 h-5 fill-slate-950 ml-0.5 text-slate-950" />
                          ) : isUnlocked ? (
                            <Play className="w-4 h-4 fill-white ml-0.5" />
                          ) : (
                            <Lock className="w-4 h-4 text-slate-400" />
                          )}
                        </button>
                      </div>

                      {/* Right: Level Info & Teammate Markers */}
                      <div className="flex-1 min-w-0 space-y-1.5">
                        
                        {/* Nova Avatar Badge */}
                        {isUserHere && (
                          <div className="inline-flex items-center gap-2 bg-slate-900 text-white border border-amber-300 px-3 py-1 rounded-2xl shadow-md mb-1">
                            <div className="w-6 h-6 overflow-hidden rounded-lg bg-sky-900 border border-sky-300 flex items-center justify-center shrink-0">
                              <MagpieCharacter
                                bodyColor={userState.magpie.bodyColor}
                                featherStyle={userState.magpie.featherStyle}
                                accessory={userState.magpie.accessory}
                                level={userState.magpie.level}
                                size="sm"
                              />
                            </div>
                            <span className="text-[10px] font-black text-amber-300">
                              {userState.magpie.name.toUpperCase()} (YOU ARE HERE)
                            </span>
                          </div>
                        )}

                        {/* Teammate Markers */}
                        {teammatesHere.length > 0 && !isUserHere && (
                          <div className="flex items-center gap-1.5 mb-1">
                            {teammatesHere.map((tm) => (
                              <button
                                key={tm.id}
                                onClick={() => showToast(`${tm.name} (${tm.role}) • Level ${tm.currentLevelNumber} · ${tm.xp} XP`)}
                                className="flex items-center gap-1 bg-white border border-sky-200 px-2 py-0.5 rounded-full shadow-sm text-[10px] font-bold text-slate-800"
                              >
                                <span className="w-4 h-4 rounded-full bg-sky-100 flex items-center justify-center text-[9px] font-extrabold text-sky-900">
                                  {tm.name.charAt(0)}
                                </span>
                                <span>{tm.name.split(' ')[0]}</span>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Level Label & Title */}
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full ${
                            isActive ? 'bg-amber-400 text-slate-950' : isCompleted ? 'text-emerald-700 bg-emerald-50' : 'text-slate-500 bg-slate-100'
                          }`}>
                            {scenario.levelLabel}
                          </span>
                          <span className="text-[11px] font-bold text-slate-500">{scenario.estimatedTime}</span>
                        </div>

                        <h4 className="font-black text-slate-900 text-sm leading-snug">
                          {scenario.title}
                        </h4>

                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                          {scenario.description}
                        </p>
                      </div>

                    </div>

                    {/* EXPANDED HERO SCENARIO ACTION CARD */}
                    {isActive && (
                      <div className="ml-16 bg-white border-2 border-amber-300 rounded-3xl p-4 shadow-lg space-y-3 box-border w-auto">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[9px] font-black uppercase text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
                            {scenario.department}
                          </span>
                          <span className="text-xs font-black text-amber-800 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full">
                            +{scenario.xpReward} XP REWARD
                          </span>
                        </div>

                        <div>
                          <h4 className="font-black text-slate-900 text-sm sm:text-base">
                            {scenario.title}
                          </h4>
                          <p className="text-xs text-slate-600 mt-1 leading-snug">
                            {scenario.description}
                          </p>
                        </div>

                        <button
                          onClick={() => onSelectScenario(scenario)}
                          className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 border border-amber-300 active:scale-[0.98]"
                        >
                          <span>SOAR INTO SCENARIO</span>
                          <ArrowRight className="w-4 h-4 text-slate-950" />
                        </button>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP WIDE ILLUSTRATED SKY WORLD MAP (>= 1024px)                     */}
      {/* ========================================================================= */}
      <div className="hidden lg:block bg-gradient-to-b from-sky-50 via-blue-50 to-amber-50 border-2 border-white rounded-3xl p-6 shadow-xl relative overflow-hidden min-h-[3950px] selection:bg-amber-100">
        
        {/* DISCOVER MOMENT CACHES ON MAP */}
        <div
          className="absolute z-20 flex flex-col items-center cursor-pointer hover:scale-125 transition-transform"
          style={{ left: '50%', top: '570px' }}
          onClick={() => showToast('✨ Discover Moment! You found a hidden guest service tip cache (+5 XP, +2 Eggs)!')}
        >
          <div className="bg-amber-400 text-slate-950 px-2.5 py-1 rounded-full text-[9px] font-black shadow-md animate-bounce border border-amber-300">
            DISCOVER 🥚
          </div>
        </div>

        <div
          className="absolute z-20 flex flex-col items-center cursor-pointer hover:scale-125 transition-transform"
          style={{ left: '70%', top: '1630px' }}
          onClick={() => showToast('💡 Discover Moment! "Always address returning Sandalwood Grand guests by surname" (+5 XP)!')}
        >
          <div className="bg-sky-600 text-white px-2.5 py-1 rounded-full text-[9px] font-black shadow-md animate-bounce border border-sky-400">
            GUEST TIP 💡
          </div>
        </div>

        {/* MULTI-LAYERED WINDING SKY PATH */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg className="w-full h-full" viewBox="0 0 600 3950" preserveAspectRatio="none">
            <path
              d={buildSvgPathDesktop()}
              fill="none"
              stroke="#BAE6FD"
              strokeWidth="24"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={buildSvgPathDesktop()}
              fill="none"
              stroke="#FDE68A"
              strokeWidth="10"
              strokeDasharray="16,12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* REGION TRANSITION GATEWAYS */}
        {DEMO_UNITS.map((unit, unitIdx) => {
          const regionHeaderY = unitIdx * 780 + 30;

          return (
            <React.Fragment key={unit.id}>
              <div
                className="absolute left-1/2 -translate-x-1/2 z-10 w-11/12 max-w-lg text-center bg-white/90 backdrop-blur-md border-2 border-white p-4 px-6 rounded-3xl shadow-md space-y-1"
                style={{ top: `${regionHeaderY}px` }}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">{unit.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-sky-800 bg-sky-100 px-3 py-0.5 rounded-full">
                    REGION 0{unitIdx + 1} · {unit.title}
                  </span>
                </div>
                <h3 className="font-black text-base text-slate-900">{unit.atmosphere}</h3>
                <p className="text-xs text-slate-600 font-medium">"{unit.subtitle}"</p>
              </div>
            </React.Fragment>
          );
        })}

        {/* ALL 25 HOTEL LEVEL DESTINATIONS */}
        {allScenarios.map((scenario, globalIdx) => {
          const pos = getNodePositionDesktop(globalIdx);
          const isCompleted = completedScenarioIds.includes(scenario.id);
          const isUnlocked = unlockedScenarioIds.includes(scenario.id) || isCompleted;
          const isActive = scenario.id === activeScenarioId || (!isCompleted && isUnlocked && globalIdx === 2);
          const isUserHere = userState.currentLevelNumber === scenario.levelNumber || isActive;
          const teammatesHere = teammates.filter((t) => t.currentLevelNumber === scenario.levelNumber);

          return (
            <div
              key={scenario.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
              style={{ left: `${pos.xPct}%`, top: `${pos.yPx}px` }}
            >
              
              {/* HOTEL DESTINATION ENVIRONMENT VECTOR ILLUSTRATION BACKGROUND */}
              <div className="mb-1 transition-transform duration-300 hover:scale-105">
                {getDestinationIllustration(scenario.levelNumber)}
              </div>

              {/* TEAMMATES MAGPIE AVATARS AT THIS DESTINATION */}
              {teammatesHere.length > 0 && !isUserHere && (
                <div className="absolute -top-10 flex items-center gap-1 z-20">
                  {teammatesHere.map((tm) => (
                    <div
                      key={tm.id}
                      onMouseEnter={() => setHoveredTeammate(tm)}
                      onMouseLeave={() => setHoveredTeammate(null)}
                      className="relative flex items-center gap-1.5 bg-white border border-sky-200 px-2.5 py-1 rounded-full shadow-sm cursor-pointer hover:scale-110 transition-transform"
                    >
                      <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center text-[10px] font-bold text-sky-900">
                        {tm.name.charAt(0)}
                      </div>
                      <span className="text-[10px] font-extrabold text-slate-800">{tm.name.split(' ')[0]}</span>

                      {/* Teammate Profile Tooltip */}
                      {hoveredTeammate?.id === tm.id && (
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-40 bg-slate-900 text-white text-[10px] p-2.5 rounded-xl shadow-xl z-40 pointer-events-none text-center">
                          <span className="font-extrabold block">{tm.name}</span>
                          <span className="text-slate-300 block">{tm.role}</span>
                          <span className="text-amber-300 font-extrabold block mt-0.5">{tm.xp} XP · Level {tm.currentLevelNumber}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* PERSISTENT USER MAGPIE COMPANION AT CURRENT DESTINATION */}
              {isUserHere && (
                <motion.div
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="absolute -top-20 z-30 flex flex-col items-center select-none"
                >
                  <span className="text-[9px] font-black uppercase bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full shadow-md mb-1 tracking-wider animate-bounce border border-amber-300">
                    YOU ARE HERE
                  </span>
                  
                  <div className="flex items-center gap-2 bg-slate-900 text-white border-2 border-amber-300 px-3 py-1.5 rounded-2xl shadow-xl">
                    <div className="w-9 h-9 overflow-hidden rounded-xl bg-sky-900 border border-sky-300 flex items-center justify-center shrink-0">
                      <MagpieCharacter
                        bodyColor={userState.magpie.bodyColor}
                        featherStyle={userState.magpie.featherStyle}
                        accessory={userState.magpie.accessory}
                        level={userState.magpie.level}
                        size="sm"
                      />
                    </div>
                    <div className="text-left leading-none pr-1">
                      <span className="block text-[11px] font-black text-amber-300">
                        {userState.magpie.name.toUpperCase()}
                      </span>
                      <span className="block text-[8px] font-bold text-slate-300">
                        {userState.name.split(' ')[0]} (YOU)
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* CIRCULAR LEVEL NODE */}
              <button
                onClick={() => {
                  if (isUnlocked) {
                    onSelectScenario(scenario);
                  } else {
                    showToast(`Complete Level ${scenario.levelNumber - 1} first to unlock Level ${scenario.levelNumber}!`);
                  }
                }}
                className={`w-14 h-14 rounded-full flex flex-col items-center justify-center font-bold transition-all duration-200 shadow-md relative z-10 ${
                  isCompleted
                    ? 'bg-emerald-500 text-white ring-4 ring-emerald-100 hover:scale-110 shadow-emerald-200'
                    : isActive
                    ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-200 shadow-xl scale-110 animate-pulse'
                    : isUnlocked
                    ? 'bg-sky-500 text-white ring-4 ring-sky-100 hover:scale-105'
                    : 'bg-slate-100 text-slate-400 border border-slate-300 cursor-not-allowed'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6 stroke-[3]" />
                ) : isActive ? (
                  <Play className="w-6 h-6 fill-slate-950 ml-0.5 text-slate-950" />
                ) : isUnlocked ? (
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                ) : (
                  <Lock className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {/* LEVEL NUMBER BADGE */}
              <span className={`text-[10px] font-black tracking-wider uppercase mt-1 px-2.5 py-0.5 rounded-full ${
                isActive
                  ? 'bg-amber-400 text-slate-950'
                  : isCompleted
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-slate-400'
              }`}>
                {scenario.levelLabel}
              </span>

              {/* DESTINATION TITLE & METRICS */}
              <div className="mt-0.5 text-center max-w-[160px] space-y-0.5">
                <h4 className={`font-black text-xs leading-tight ${
                  isActive ? 'text-slate-900' : 'text-slate-700'
                }`}>
                  {scenario.title}
                </h4>

                {isCompleted && (
                  <span className="text-[10px] font-bold text-emerald-600 block">
                    82/100 · +{scenario.xpReward} XP
                  </span>
                )}

                {!isCompleted && isUnlocked && !isActive && (
                  <span className="text-[10px] font-bold text-sky-700 block">
                    +{scenario.xpReward} XP · {scenario.estimatedTime}
                  </span>
                )}
              </div>

              {/* ACTIVE LEVEL EXPANDED HERO ACTION CARD */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 bg-white border-2 border-amber-300 rounded-3xl p-4 shadow-xl text-left max-w-xs w-64 space-y-3 relative z-30"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase text-sky-800 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
                      {scenario.department}
                    </span>
                    <span className="text-xs font-black text-amber-800 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full">
                      +{scenario.xpReward} XP
                    </span>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900 text-sm">
                      {scenario.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-snug line-clamp-2">
                      {scenario.description}
                    </p>
                  </div>

                  <button
                    onClick={() => onSelectScenario(scenario)}
                    className="w-full py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-1.5 border border-amber-300"
                  >
                    <span>SOAR INTO SCENARIO</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>
                </motion.div>
              )}

            </div>
          );
        })}

      </div>

    </div>
  );
};
