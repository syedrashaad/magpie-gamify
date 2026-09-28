import React from 'react';
import { motion } from 'framer-motion';
import { getLevelTitle } from '../utils/storage';
import { MagpieLevel } from '../types';

interface GrowthBarProps {
  level: MagpieLevel | number;
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
  const levelTitle = getLevelTitle(level as MagpieLevel);

  return (
    <div className={`w-full bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-2xl p-4 shadow-2xs ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-black tracking-wider text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-200">
            Level {level}
          </span>
          <span className="text-xs font-bold text-slate-800">{levelTitle}</span>
        </div>
        <span className="text-xs font-extrabold text-slate-600">
          {growth}% Growth
        </span>
      </div>

      {/* Progress Track */}
      <div className="relative w-full h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60 p-0.5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${growth}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 shadow-inner relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </motion.div>
      </div>

      <div className="flex items-center justify-between mt-2 text-[10px] text-slate-500 font-medium">
        <span>Current: {growth}%</span>
        <span>
          {foodNeeded > 0 ? `${foodNeeded} more food to level up` : 'Max Level Reached! ✨'}
        </span>
      </div>
    </div>
  );
};
