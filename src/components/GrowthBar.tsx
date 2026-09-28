import React from 'react';
import { motion } from 'framer-motion';
import { getLevelTitle } from '../utils/storage';

interface GrowthBarProps {
  level: 1 | 2 | 3 | 4;
  growth: number; // 0-100 percentage
  foodNeeded?: number;
  className?: string;
}

export const GrowthBar: React.FC<GrowthBarProps> = ({
  level,
  growth,
  foodNeeded = 12,
  className = '',
}) => {
  const levelTitle = getLevelTitle(level);

  return (
    <div className={`w-full bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-bold tracking-wider text-purple-700 bg-purple-100 px-2.5 py-1 rounded-full">
            Level {level}
          </span>
          <span className="text-sm font-semibold text-slate-800">{levelTitle}</span>
        </div>
        <span className="text-xs font-medium text-slate-500">
          {growth}% Growth
        </span>
      </div>

      {/* Progress Track */}
      <div className="relative w-full h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60 p-0.5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${growth}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 shadow-inner relative"
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </motion.div>
      </div>

      <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
        <span>Current: {growth}%</span>
        <span>
          {foodNeeded > 0 ? `${foodNeeded} more food to reach Level ${Math.min(level + 1, 4)}` : 'Max Level Reached! ✨'}
        </span>
      </div>
    </div>
  );
};
