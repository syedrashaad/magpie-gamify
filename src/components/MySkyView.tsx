import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserState } from '../types';
import { MagpieCharacter } from './MagpieCharacter';
import { Sparkles, Check, Lock, Info, ArrowRight, Shield, Star, CloudSun } from 'lucide-react';

interface MySkyViewProps {
  userState: UserState;
  onUnlockItem: (itemId: string, cost: number) => void;
  onNavigateToTasks: () => void;
}

export interface SkySanctuaryItem {
  id: string;
  name: string;
  category: 'Nest' | 'Garden' | 'Fountain' | 'Vantage' | 'Lounge';
  cost: number;
  icon: string;
  description: string;
  bonusText: string;
}

export const SKY_ITEMS: SkySanctuaryItem[] = [
  {
    id: 'nest-gold',
    name: 'Golden Magpie Nest',
    category: 'Nest',
    cost: 10,
    icon: '🪹',
    description: 'A cozy 5-star woven nest lined with silk feathers and gold thread resting atop your cloud island.',
    bonusText: '+5% XP Boost during daily scenarios',
  },
  {
    id: 'garden-botanical',
    name: 'Rooftop Botanical Sanctuary',
    category: 'Garden',
    cost: 15,
    icon: '🌴',
    description: 'Lush tropical flora, orchids and fragrant jasmine inspired by luxury hotel courtyard gardens.',
    bonusText: '+2 Feathers per completed level',
  },
  {
    id: 'fountain-marble',
    name: 'Sky Sanctuary Fountain',
    category: 'Fountain',
    cost: 20,
    icon: '⛲',
    description: 'Tiered Italian marble water fountain with gentle crystal-clear water flow for Nova.',
    bonusText: 'Unlocks ambient water soundscapes',
  },
  {
    id: 'perch-teak',
    name: 'Teak Vantage & Telescope',
    category: 'Vantage',
    cost: 25,
    icon: '🪵',
    description: 'High brass telescope and polished teak wood perch overseeing all of Sandalwood Grand.',
    bonusText: 'Displays real-time associate flight paths',
  },
  {
    id: 'lounge-executive',
    name: 'Executive Sky Lounge',
    category: 'Lounge',
    cost: 35,
    icon: '🍸',
    description: 'VIP sky lounge seating with ambient hotel lights, plush sofas, and hospitality amenity tray.',
    bonusText: 'Maximum Sky Comfort & prestige badge',
  },
];

export const MySkyView: React.FC<MySkyViewProps> = ({
  userState,
  onUnlockItem,
  onNavigateToTasks,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const unlockedIds = userState.mySkyUnlocks || ['nest-gold'];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUnlock = (item: SkySanctuaryItem) => {
    if (unlockedIds.includes(item.id)) return;
    if (userState.rewards.eggs < item.cost) {
      showToast(`You need ${item.cost} Eggs (you have ${userState.rewards.eggs}). Complete more hospitality scenarios to earn eggs!`);
      return;
    }
    onUnlockItem(item.id, item.cost);
    showToast(`🎉 Unlocked ${item.name}! Your Sky Sanctuary has been upgraded.`);
  };

  // Calculate sanctuary completion score
  const unlockedCount = unlockedIds.length;
  const totalItems = SKY_ITEMS.length;
  const comfortPct = Math.round((unlockedCount / totalItems) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-2.5 rounded-xl shadow-xl text-xs font-bold border border-purple-400/40 flex items-center gap-2 max-w-md text-center"
          >
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
              Personal Haven · Nova's World
            </span>
            <span className="text-xs font-semibold text-slate-400">•</span>
            <span className="text-xs font-extrabold text-amber-700">{comfortPct}% Sanctuary Comfort</span>
          </div>
          <h1 className="font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            My Sky Haven
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
            Spend earned eggs to build Nova's luxury floating hotel garden in the clouds.
          </p>
        </div>

        {/* Currency Pill */}
        <div className="flex items-center gap-3 self-start sm:self-auto bg-white border border-slate-200/90 p-2.5 px-4 rounded-2xl shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800">
            <span className="text-base">🥚</span>
            <span>{userState.rewards.eggs} Eggs</span>
          </div>
          <div className="h-4 w-[1px] bg-slate-200" />
          <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700">
            <span className="text-base">🪶</span>
            <span>{userState.rewards.feathers} Feathers</span>
          </div>
        </div>
      </div>

      {/* 2D FLOATING SKY ISLAND CANVAS STAGE */}
      <div className="bg-gradient-to-b from-sky-400 via-indigo-400 to-purple-600 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden min-h-[380px] flex flex-col items-center justify-between border border-white/20 select-none">
        
        {/* Sky Clouds & Sun Graphics Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Animated Cloud 1 */}
          <motion.div
            animate={{ x: [0, 30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-6 left-8 opacity-40 text-white text-6xl"
          >
            ☁️
          </motion.div>
          
          {/* Cloud 2 */}
          <motion.div
            animate={{ x: [0, -25, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-12 right-12 opacity-50 text-white text-7xl"
          >
            ☁️
          </motion.div>

          {/* Golden Sun Flare */}
          <div className="absolute -top-10 right-1/4 w-40 h-40 rounded-full bg-amber-300/30 blur-2xl pointer-events-none" />
        </div>

        {/* Top Floating Badge */}
        <div className="relative z-10 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-slate-900 border border-white/40 shadow-sm flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-purple-700" />
          <span className="text-xs font-extrabold tracking-wide">
            {userState.magpie.name.toUpperCase()}'S SKY SANCTUARY
          </span>
          <span className="text-[10px] bg-purple-100 text-purple-900 font-bold px-2 py-0.5 rounded-full">
            Level {userState.magpie.level}
          </span>
        </div>

        {/* MAIN FLOATING ISLAND & DECORATIONS */}
        <div className="relative z-10 my-6 flex flex-col items-center">
          
          {/* Dialogue Speech Bubble */}
          <motion.div
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-3 bg-white text-slate-900 p-3 px-4 rounded-2xl shadow-xl border border-purple-200 text-xs font-bold max-w-xs text-center relative"
          >
            <span>
              {unlockedCount === 1
                ? `"Welcome to My Sky! Spend eggs to add gardens, fountains & lounges!"`
                : unlockedCount < 4
                ? `"Our sky sanctuary is looking amazing! Let's build the complete hotel garden!"`
                : `"Luxury 5-star sky sanctuary achieved! Sandalwood Grand looks stunning from up here!"`}
            </span>
            <div className="w-3 h-3 bg-white rotate-45 border-r border-b border-purple-200 absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
          </motion.div>

          {/* UNLOCKED ISLAND DECORATIONS FLOATING AROUND NOVA */}
          <div className="relative w-72 h-36 flex items-center justify-center">
            
            {/* Nest */}
            {unlockedIds.includes('nest-gold') && (
              <div className="absolute left-2 bottom-6 text-3xl transition-all hover:scale-125 cursor-pointer" title="Golden Magpie Nest">
                🪹
              </div>
            )}

            {/* Botanical Garden */}
            {unlockedIds.includes('garden-botanical') && (
              <div className="absolute left-10 top-0 text-3xl transition-all hover:scale-125 cursor-pointer" title="Rooftop Botanical Garden">
                🌴
              </div>
            )}

            {/* Marble Fountain */}
            {unlockedIds.includes('fountain-marble') && (
              <div className="absolute right-10 top-2 text-3xl transition-all hover:scale-125 cursor-pointer" title="Sky Sanctuary Fountain">
                ⛲
              </div>
            )}

            {/* Vantage Telescope */}
            {unlockedIds.includes('perch-teak') && (
              <div className="absolute right-2 bottom-6 text-3xl transition-all hover:scale-125 cursor-pointer" title="Teak Vantage & Telescope">
                🪵
              </div>
            )}

            {/* Executive Lounge */}
            {unlockedIds.includes('lounge-executive') && (
              <div className="absolute top-[-10px] text-3xl transition-all hover:scale-125 cursor-pointer" title="Executive Sky Lounge">
                🍸
              </div>
            )}

            {/* CENTER MAGPIE CHARACTER (NOVA) */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 shadow-2xl flex items-center justify-center p-2 z-20 cursor-pointer"
              onClick={onNavigateToTasks}
            >
              <MagpieCharacter
                bodyColor={userState.magpie.bodyColor}
                featherStyle={userState.magpie.featherStyle}
                accessory={userState.magpie.accessory}
                level={userState.magpie.level}
                size="lg"
              />
            </motion.div>
          </div>

          {/* FLOATING GREEN LANDING ISLAND BASE GRAPHIC */}
          <div className="w-80 h-10 bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-700 rounded-[100%] shadow-2xl border-2 border-emerald-300/60 -mt-4 relative flex items-center justify-center">
            <div className="text-[10px] font-extrabold text-emerald-100 uppercase tracking-widest opacity-80">
              FLOATING SANCTUARY PLATFORM
            </div>
          </div>
        </div>

        {/* Island Stats Footer Bar */}
        <div className="relative z-10 w-full max-w-lg bg-slate-900/80 backdrop-blur-md text-white p-3 px-5 rounded-2xl border border-white/20 flex items-center justify-between text-xs font-bold">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Unlocked Items</span>
            <span className="text-amber-300 font-extrabold">{unlockedCount} / {totalItems} Active</span>
          </div>
          <div className="h-6 w-[1px] bg-slate-700" />
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Property</span>
            <span className="text-white font-bold">{userState.property}</span>
          </div>
          <div className="h-6 w-[1px] bg-slate-700" />
          <button
            onClick={onNavigateToTasks}
            className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center gap-1"
          >
            <span>Train for Eggs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SANCTUARY DECORATIONS & UPGRADES STORE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg">Sky Sanctuary Store</h3>
            <p className="text-xs text-slate-500 font-medium">
              Use eggs earned from hospitality scenarios to customize Nova's haven.
            </p>
          </div>
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
            {unlockedCount} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SKY_ITEMS.map((item) => {
            const isUnlocked = unlockedIds.includes(item.id);
            const canAfford = userState.rewards.eggs >= item.cost;

            return (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 relative ${
                  isUnlocked
                    ? 'bg-purple-50/60 border-purple-300/80 shadow-2xs'
                    : canAfford
                    ? 'bg-white border-slate-200/90 hover:border-purple-300 hover:shadow-md'
                    : 'bg-slate-50/80 border-slate-200/60 opacity-85'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-2xl shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-md">
                          {item.category}
                        </span>
                        {isUnlocked && (
                          <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Check className="w-3 h-3 stroke-[3]" /> ACTIVE
                          </span>
                        )}
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-base mt-1">
                        {item.name}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 font-extrabold text-xs text-slate-800 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-xl shrink-0">
                    <span>🥚</span>
                    <span>{item.cost}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-purple-700 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{item.bonusText}</span>
                  </span>

                  {isUnlocked ? (
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 stroke-[3]" /> Unlocked
                    </span>
                  ) : (
                    <button
                      onClick={() => handleUnlock(item)}
                      disabled={!canAfford}
                      className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-2xs ${
                        canAfford
                          ? 'bg-slate-900 hover:bg-slate-800 text-white'
                          : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? (
                        <>
                          <span>Unlock ({item.cost} 🥚)</span>
                          <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Need {item.cost} 🥚</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
