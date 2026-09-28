import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BodyColor, FeatherStyle, Accessory } from '../types';

interface MagpieCharacterProps {
  bodyColor?: BodyColor;
  featherStyle?: FeatherStyle;
  accessory?: Accessory;
  level?: 1 | 2 | 3;
  isFlying?: boolean;
  isCelebrating?: boolean;
  isEating?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
}

export const MagpieCharacter: React.FC<MagpieCharacterProps> = ({
  bodyColor = 'blue',
  featherStyle = 'iridescent',
  accessory = 'headphones',
  level = 2,
  isFlying = false,
  isCelebrating = false,
  isEating = false,
  size = 'hero',
  className = '',
}) => {

  // Color scheme mappings
  const colors = useMemo(() => {
    switch (bodyColor) {
      case 'black':
        return {
          bodyGrad: ['#334155', '#1E293B', '#0F172A'],
          chestGrad: ['#FFFFFF', '#FAF8F5', '#E2E8F0'],
          wingGrad: ['#38BDF8', '#1E293B', '#0F172A'],
          accent: '#38BDF8',
          tail: '#38BDF8',
          beak: '#F59E0B',
          glow: 'rgba(56, 189, 248, 0.4)',
        };
      case 'blue':
        return {
          bodyGrad: ['#2563EB', '#1D4ED8', '#1E3A8A'],
          chestGrad: ['#FFFFFF', '#F0F9FF', '#E0F2FE'],
          wingGrad: ['#38BDF8', '#1D4ED8', '#0284C7'],
          accent: '#60A5FA',
          tail: '#0284C7',
          beak: '#F59E0B',
          glow: 'rgba(37, 99, 235, 0.45)',
        };
      case 'purple':
        return {
          bodyGrad: ['#9333EA', '#7C3AED', '#4C1D95'],
          chestGrad: ['#FFFFFF', '#FAF5FF', '#F3E8FF'],
          wingGrad: ['#C084FC', '#7C3AED', '#581C87'],
          accent: '#E9D5FF',
          tail: '#A855F7',
          beak: '#F59E0B',
          glow: 'rgba(147, 51, 234, 0.45)',
        };
      case 'green':
        return {
          bodyGrad: ['#059669', '#047857', '#064E3B'],
          chestGrad: ['#FFFFFF', '#ECFDF5', '#D1FAE5'],
          wingGrad: ['#34D399', '#059669', '#065F46'],
          accent: '#A7F3D0',
          tail: '#10B981',
          beak: '#F59E0B',
          glow: 'rgba(16, 185, 129, 0.45)',
        };
      case 'gold':
        return {
          bodyGrad: ['#D97706', '#B45309', '#78350F'],
          chestGrad: ['#FFFFFF', '#FFFBEB', '#FEF3C7'],
          wingGrad: ['#FBBF24', '#D97706', '#92400E'],
          accent: '#FDE68A',
          tail: '#F59E0B',
          beak: '#1E293B',
          glow: 'rgba(245, 158, 11, 0.45)',
        };
      default:
        return {
          bodyGrad: ['#2563EB', '#1D4ED8', '#1E3A8A'],
          chestGrad: ['#FFFFFF', '#F0F9FF', '#E0F2FE'],
          wingGrad: ['#38BDF8', '#1D4ED8', '#0284C7'],
          accent: '#60A5FA',
          tail: '#0284C7',
          beak: '#F59E0B',
          glow: 'rgba(37, 99, 235, 0.45)',
        };
    }
  }, [bodyColor]);

  // Dimension scale factors
  const dimension = useMemo(() => {
    switch (size) {
      case 'sm':
        return { width: 90, height: 90, scale: 0.65 };
      case 'md':
        return { width: 160, height: 160, scale: 0.9 };
      case 'lg':
        return { width: 240, height: 240, scale: 1.15 };
      case 'hero':
        return { width: 320, height: 320, scale: 1.4 };
    }
  }, [size]);

  // Level visual scaling
  const levelScale = level === 1 ? 0.82 : level === 2 ? 1.0 : 1.22;

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{
        width: dimension.width,
        height: dimension.height,
      }}
    >
      {/* Background Soft Aura */}
      <motion.div
        animate={{
          scale: isCelebrating ? [1, 1.3, 1] : [1, 1.1, 1],
          opacity: isCelebrating ? [0.6, 0.9, 0.6] : [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: isCelebrating ? 0.7 : 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 rounded-full blur-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colors.glow} 0%, rgba(109, 40, 217, 0) 70%)`,
        }}
      />

      {/* Level 3 Flying Magpie Radiant Rings */}
      {level === 3 && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[-12px] pointer-events-none rounded-full border border-dashed border-amber-400/40"
        />
      )}

      {/* Main Magpie Bird */}
      <motion.div
        animate={
          isFlying
            ? {
                y: [-10, 10, -10],
                x: [0, 4, 0],
                rotate: [0, 5, 0, -5, 0],
              }
            : isCelebrating
            ? {
                y: [0, -30, 0, -18, 0],
                scale: [levelScale, levelScale * 1.12, levelScale],
                rotate: [0, -10, 10, -5, 0],
              }
            : isEating
            ? {
                y: [0, 6, 0, 6, 0],
                rotate: [0, 12, -6, 12, 0],
              }
            : {
                y: [0, -8, 0],
                rotate: [0, 2, 0],
              }
        }
        transition={{
          duration: isFlying ? 1.3 : isCelebrating ? 0.85 : isEating ? 0.55 : 3.4,
          repeat: isCelebrating || isEating ? 2 : Infinity,
          ease: 'easeInOut',
        }}
        className="relative flex items-center justify-center"
        style={{ scale: levelScale }}
      >
        <svg
          width="260"
          height="260"
          viewBox="0 0 260 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl filter"
        >
          <defs>
            <linearGradient id={`bodyGrad-${bodyColor}`} x1="40" y1="20" x2="220" y2="240" gradientUnits="userSpaceOnUse">
              <stop stopColor={colors.bodyGrad[0]} />
              <stop offset="0.5" stopColor={colors.bodyGrad[1]} />
              <stop offset="1" stopColor={colors.bodyGrad[2]} />
            </linearGradient>

            <linearGradient id={`chestGrad-${bodyColor}`} x1="90" y1="80" x2="160" y2="180" gradientUnits="userSpaceOnUse">
              <stop stopColor={colors.chestGrad[0]} />
              <stop offset="0.7" stopColor={colors.chestGrad[1]} />
              <stop offset="1" stopColor={colors.chestGrad[2]} />
            </linearGradient>

            <linearGradient id={`wingGrad-${bodyColor}`} x1="10" y1="40" x2="240" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor={colors.wingGrad[0]} />
              <stop offset="0.6" stopColor={colors.wingGrad[1]} />
              <stop offset="1" stopColor={colors.wingGrad[2]} />
            </linearGradient>

            <linearGradient id="beakGrad" x1="170" y1="70" x2="215" y2="90" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FBBF24" />
              <stop offset="1" stopColor="#D97706" />
            </linearGradient>

            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#0F172A" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Long Iridescent Tail Feathers */}
          <motion.g
            animate={{ rotate: isFlying ? [-8, 8, -8] : [-3, 3, -3] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '130px 170px' }}
          >
            <path
              d="M115 170 Q 75 230 45 252 Q 80 235 125 180 Z"
              fill={colors.tail}
              opacity="0.9"
            />
            <path
              d="M125 170 Q 95 240 75 258 Q 110 238 135 178 Z"
              fill={colors.accent}
              opacity="0.8"
            />
            <path
              d="M132 170 Q 140 245 150 255 Q 145 225 136 175 Z"
              fill={colors.bodyGrad[1]}
            />
          </motion.g>

          {/* Back Wing */}
          <motion.g
            animate={
              isFlying
                ? { scaleY: [1, 0.45, 1], rotate: [-12, 18, -12] }
                : isCelebrating
                ? { scaleY: [1, 0.35, 1.1], rotate: [-22, 22, -22] }
                : { scaleY: [1, 0.92, 1], rotate: [0, 4, 0] }
            }
            transition={{
              duration: isFlying ? 0.35 : isCelebrating ? 0.3 : 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '85px 110px' }}
          >
            <path
              d="M90 105 Q 25 65 20 120 Q 55 150 95 130 Z"
              fill={`url(#wingGrad-${bodyColor})`}
              opacity="0.85"
            />
          </motion.g>

          {/* Main Body */}
          <path
            d="M130 42 C 78 42 70 95 76 150 C 82 192 178 192 184 150 C 190 95 182 42 130 42 Z"
            fill={`url(#bodyGrad-${bodyColor})`}
            filter="url(#softShadow)"
          />

          {/* Creamy Hospitality Chest Feather Patch */}
          <path
            d="M108 85 C 92 105 92 152 114 172 C 146 178 168 152 158 105 C 148 85 125 78 108 85 Z"
            fill={`url(#chestGrad-${bodyColor})`}
            opacity="0.95"
          />

          {/* Feather Pattern Highlights */}
          {featherStyle === 'iridescent' && (
            <path
              d="M118 100 C 108 115 118 142 134 148 Q 146 126 130 100 Z"
              fill={colors.accent}
              opacity="0.25"
            />
          )}

          {/* Front Wing */}
          <motion.g
            animate={
              isFlying
                ? { scaleY: [1, 0.35, 1], rotate: [12, -22, 12] }
                : isCelebrating
                ? { scaleY: [1, 0.25, 1.25], rotate: [28, -28, 28] }
                : { scaleY: [1, 0.94, 1], rotate: [0, -4, 0] }
            }
            transition={{
              duration: isFlying ? 0.35 : isCelebrating ? 0.3 : 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '165px 120px' }}
          >
            <path
              d="M160 100 Q 242 68 236 128 Q 182 155 150 132 Z"
              fill={`url(#wingGrad-${bodyColor})`}
            />
            {/* Wing Feather Detail */}
            <path
              d="M165 108 Q 225 82 222 122 Q 182 142 158 126 Z"
              fill={colors.accent}
              opacity="0.45"
            />
            <path
              d="M175 116 Q 212 96 210 124 Q 186 136 168 126 Z"
              fill="#FFFFFF"
              opacity="0.3"
            />
          </motion.g>

          {/* Beak */}
          <motion.g
            animate={
              isEating
                ? { scale: [1, 1.3, 1], rotate: [0, 18, 0] }
                : { rotate: [0, 1.5, 0] }
            }
            transition={{ duration: 0.35, repeat: isEating ? 3 : Infinity }}
            style={{ transformOrigin: '172px 78px' }}
          >
            <path
              d="M170 72 L 218 81 L 170 96 Z"
              fill={bodyColor === 'gold' ? '#1E293B' : 'url(#beakGrad)'}
              filter="url(#softShadow)"
            />
            <path
              d="M170 80 L 208 84 L 170 88 Z"
              fill="#78350F"
              opacity="0.4"
            />
          </motion.g>

          {/* Expressive Eye with Catchlight & Blink */}
          <g>
            <circle cx="152" cy="74" r="15" fill="#FFFFFF" />
            <circle cx="152" cy="74" r="13" fill={colors.accent} opacity="0.4" />
            <circle cx="154" cy="74" r="9" fill="#0F172A" />
            {/* Pupil Catchlights */}
            <circle cx="157" cy="71" r="3.5" fill="#FFFFFF" />
            <circle cx="151" cy="76" r="1.8" fill="#FFFFFF" opacity="0.8" />
          </g>

          {/* Blush Cheek */}
          <circle cx="140" cy="91" r="8.5" fill="#F43F5E" opacity="0.25" />

          {/* Accessories */}
          {accessory === 'glasses' && (
            <g>
              <circle cx="152" cy="74" r="16" fill="none" stroke="#D97706" strokeWidth="3.5" />
              <path d="M136 74 L 122 74" stroke="#D97706" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M168 74 L 178 74" stroke="#D97706" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="152" cy="74" r="15" fill="#60A5FA" opacity="0.2" />
            </g>
          )}

          {accessory === 'scarf' && (
            <g>
              <path
                d="M110 105 Q 140 120 168 100 Q 178 122 140 126 Q 102 120 110 105 Z"
                fill="#DC2626"
              />
              <path
                d="M150 112 L 168 152 L 148 158 L 136 118 Z"
                fill="#B91C1C"
              />
              <line x1="150" y1="154" x2="168" y2="154" stroke="#FBBF24" strokeWidth="2.5" />
            </g>
          )}

          {accessory === 'cap' && (
            <g>
              <path
                d="M120 52 Q 150 32 178 50 L 194 60 Q 155 64 112 58 Z"
                fill="#6D28D9"
              />
              <path
                d="M160 52 L 208 58 L 178 64 Z"
                fill="#4C1D95"
              />
              <circle cx="145" cy="40" r="4.5" fill="#F59E0B" />
            </g>
          )}

          {accessory === 'headphones' && (
            <g>
              <path
                d="M124 52 Q 150 26 166 54"
                fill="none"
                stroke="#0F172A"
                strokeWidth="5.5"
                strokeLinecap="round"
              />
              <rect x="142" y="60" width="18" height="28" rx="9" fill="#6D28D9" stroke="#F59E0B" strokeWidth="2" />
              <rect x="145" y="65" width="12" height="18" rx="6" fill="#A78BFA" />
            </g>
          )}

          {/* Level 3 Crown */}
          {level === 3 && (
            <g>
              <path
                d="M135 36 L 142 20 L 150 33 L 158 18 L 166 36 Z"
                fill="#F59E0B"
                stroke="#FEF3C7"
                strokeWidth="1.5"
              />
              <circle cx="142" cy="20" r="2.5" fill="#EF4444" />
              <circle cx="158" cy="18" r="2.5" fill="#3B82F6" />
            </g>
          )}
        </svg>

        {/* Flying Wind Trail */}
        {isFlying && (
          <motion.div
            animate={{ opacity: [0.4, 0.9, 0.4], scaleX: [0.8, 1.3, 0.8] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute -left-16 top-1/2 -translate-y-1/2 w-24 h-6 rounded-full blur-md pointer-events-none"
            style={{
              background: `linear-gradient(to left, ${colors.accent}, transparent)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
};
