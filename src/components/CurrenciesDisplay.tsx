import React from 'react';
import { motion } from 'framer-motion';
import { RewardsState } from '../types';

interface CurrenciesDisplayProps {
  rewards: RewardsState;
  flightDays?: number;
  className?: string;
}

export const CurrenciesDisplay: React.FC<CurrenciesDisplayProps> = ({
  rewards,
  flightDays = 5,
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-2 sm:gap-3 ${className}`}>
      {/* Flight Days Streak Badge */}
      <motion.div
        whileHover={{ scale: 1.04 }}
        className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-800 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xs"
      >
        <span className="text-sm">🪽</span>
        <span>{flightDays} Flight Days</span>
      </motion.div>

      {/* Eggs */}
      <motion.div
        whileHover={{ scale: 1.04 }}
        className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 text-amber-900 px-3 py-1.5 rounded-xl text-xs font-bold shadow-xs"
      >
        <span className="text-base">🥚</span>
        <span>{rewards.eggs} Eggs</span>
      </motion.div>

      {/* Feathers */}
      <motion.div
        whileHover={{ scale: 1.04 }}
        className="flex items-center gap-1.5 bg-blue-50 border border-blue-200/80 text-blue-900 px-3 py-1.5 rounded-xl text-xs font-bold shadow-xs"
      >
        <span className="text-base">🪶</span>
        <span>{rewards.feathers} Feathers</span>
      </motion.div>

      {/* Food */}
      <motion.div
        whileHover={{ scale: 1.04 }}
        className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200/80 text-emerald-900 px-3 py-1.5 rounded-xl text-xs font-bold shadow-xs"
      >
        <span className="text-base">🍎</span>
        <span>{rewards.food} Food</span>
      </motion.div>
    </div>
  );
};
