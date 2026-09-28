import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BodyColor, FeatherStyle, Accessory } from '../types';

interface MagpieCharacterProps {
  bodyColor?: BodyColor;
  featherStyle?: FeatherStyle;
  accessory?: Accessory;
  level?: 1 | 2 | 3 | 4;
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

  // Color mappings
  const colorScheme = useMemo(() => {
    switch (bodyColor) {
      case 'black':
        return {
          body: '#1E293B',
          bodyGrad: 'from-slate-900 via-slate-800 to-indigo-950',
          chest: '#334155',
          wingPrimary: '#0F172A',
          wingSecondary: '#38BDF8',
          accent: '#38BDF8',
          beak: '#F59E0B',
          eyeRing: '#E2E8F0',
        };
      case 'blue':
        return {
          body: '#1E3A8A',
          bodyGrad: 'from-blue-950 via-indigo-900 to-slate-900',
          chest: '#E0F2FE',
          wingPrimary: '#1D4ED8',
          wingSecondary: '#0284C7',
          accent: '#38BDF8',
          beak: '#F59E0B',
          eyeRing: '#60A5FA',
        };
      case 'purple':
        return {
          body: '#4C1D95',
          bodyGrad: 'from-purple-950 via-indigo-900 to-slate-900',
          chest: '#F3E8FF',
          wingPrimary: '#7C3AED',
          wingSecondary: '#A855F7',
          accent: '#C084FC',
          beak: '#F59E0B',
          eyeRing: '#E9D5FF',
        };
      case 'green':
        return {
          body: '#064E3B',
          bodyGrad: 'from-emerald-950 via-teal-900 to-slate-900',
          chest: '#D1FAE5',
          wingPrimary: '#059669',
          wingSecondary: '#10B981',
          accent: '#34D399',
          beak: '#F59E0B',
          eyeRing: '#A7F3D0',
        };
      case 'gold':
        return {
          body: '#78350F',
          bodyGrad: 'from-amber-950 via-amber-900 to-yellow-950',
          chest: '#FEF3C7',
          wingPrimary: '#D97706',
          wingSecondary: '#F59E0B',
          accent: '#FBBF24',
          beak: '#0F172A',
          eyeRing: '#FDE68A',
        };
      default:
        return {
          body: '#1E3A8A',
          bodyGrad: 'from-blue-950 via-indigo-900 to-slate-900',
          chest: '#E0F2FE',
          wingPrimary: '#1D4ED8',
          wingSecondary: '#0284C7',
          accent: '#38BDF8',
          beak: '#F59E0B',
          eyeRing: '#60A5FA',
        };
    }
  }, [bodyColor]);

  // Size scale factors
  const dimension = useMemo(() => {
    switch (size) {
      case 'sm':
        return { width: 80, height: 80, scale: 0.6 };
      case 'md':
        return { width: 140, height: 140, scale: 0.85 };
      case 'lg':
        return { width: 220, height: 220, scale: 1.1 };
      case 'hero':
        return { width: 340, height: 340, scale: 1.4 };
    }
  }, [size]);

  // Level scale bump
  const levelScale = 1 + (level - 1) * 0.15;

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{
        width: dimension.width,
        height: dimension.height,
      }}
    >
      {/* Background Glow Aura */}
      <motion.div
        animate={{
          scale: isCelebrating ? [1, 1.25, 1] : [1, 1.08, 1],
          opacity: isCelebrating ? [0.6, 0.9, 0.6] : [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: isCelebrating ? 0.8 : 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 rounded-full blur-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colorScheme.accent} 0%, rgba(109, 40, 217, 0) 70%)`,
        }}
      />

      {/* Level 3 & 4 Magical Sparkles */}
      {level >= 3 && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[-10px] pointer-events-none rounded-full border border-dashed border-purple-400/30"
        />
      )}

      {/* Main Magpie Bird Container */}
      <motion.div
        animate={
          isFlying
            ? {
                y: [-8, 8, -8],
                x: [0, 6, 0],
                rotate: [0, 4, 0, -4, 0],
              }
            : isCelebrating
            ? {
                y: [0, -25, 0, -15, 0],
                scale: [levelScale, levelScale * 1.1, levelScale],
                rotate: [0, -8, 8, -4, 0],
              }
            : isEating
            ? {
                y: [0, 8, 0, 8, 0],
                rotate: [0, 10, -5, 10, 0],
              }
            : {
                y: [0, -7, 0],
                rotate: [0, 1.5, 0],
              }
        }
        transition={{
          duration: isFlying ? 1.4 : isCelebrating ? 0.9 : isEating ? 0.6 : 3.2,
          repeat: isCelebrating || isEating ? 2 : Infinity,
          ease: 'easeInOut',
        }}
        className="relative flex items-center justify-center"
        style={{ scale: levelScale }}
      >
        {/* SVG Rendered Stylized 2.5D Magpie */}
        <svg
          width="240"
          height="240"
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl filter"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id={`bodyGrad-${bodyColor}`} x1="30" y1="20" x2="210" y2="220" gradientUnits="userSpaceOnUse">
              <stop stopColor={colorScheme.accent} stopOpacity="0.8" />
              <stop offset="0.4" stopColor={colorScheme.wingPrimary} />
              <stop offset="1" stopColor={colorScheme.body} />
            </linearGradient>

            <linearGradient id={`wingGrad-${bodyColor}`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor={colorScheme.wingSecondary} />
              <stop offset="1" stopColor={colorScheme.wingPrimary} />
            </linearGradient>

            <linearGradient id={`goldBeak`} x1="0" y1="0" x2="40" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FBBF24" />
              <stop offset="1" stopColor="#D97706" />
            </linearGradient>

            <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Magpie Long Tail Feathers */}
          <motion.g
            animate={{
              rotate: isFlying ? [-5, 5, -5] : [-2, 2, -2],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '120px 160px' }}
          >
            <path
              d="M110 160 Q 70 210 50 230 Q 75 220 115 170 Z"
              fill={colorScheme.wingSecondary}
              opacity="0.95"
            />
            <path
              d="M120 160 Q 90 220 80 238 Q 105 225 125 168 Z"
              fill={colorScheme.accent}
              opacity="0.8"
            />
            <path
              d="M125 160 Q 130 225 140 235 Q 135 215 128 165 Z"
              fill={colorScheme.wingPrimary}
            />
          </motion.g>

          {/* Left Wing (Back Wing) */}
          <motion.g
            animate={
              isFlying
                ? { scaleY: [1, 0.4, 1], rotate: [-10, 15, -10] }
                : isCelebrating
                ? { scaleY: [1, 0.3, 1.1], rotate: [-20, 20, -20] }
                : { scaleY: [1, 0.9, 1], rotate: [0, 3, 0] }
            }
            transition={{
              duration: isFlying ? 0.35 : isCelebrating ? 0.3 : 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '75px 105px' }}
          >
            <path
              d="M80 100 Q 20 60 15 110 Q 50 140 85 125 Z"
              fill={`url(#wingGrad-${bodyColor})`}
              opacity="0.85"
            />
            <path
              d="M75 105 Q 35 75 30 112 Q 60 132 80 120 Z"
              fill={colorScheme.accent}
              opacity="0.6"
            />
          </motion.g>

          {/* Main Body */}
          <path
            d="M120 40 C 70 40 65 90 70 140 C 75 180 165 180 170 140 C 175 90 170 40 120 40 Z"
            fill={`url(#bodyGrad-${bodyColor})`}
            filter="url(#shadow)"
          />

          {/* Creamy Hospitality Chest Feather Patch */}
          <path
            d="M100 80 C 85 100 85 145 105 165 C 135 170 155 145 145 100 C 135 80 115 75 100 80 Z"
            fill={colorScheme.chest}
            opacity="0.95"
          />

          {/* Feather Texture Accents */}
          {featherStyle === 'iridescent' && (
            <path
              d="M110 95 C 100 110 110 135 125 140 Q 135 120 120 95 Z"
              fill={colorScheme.accent}
              opacity="0.25"
            />
          )}

          {/* Right Wing (Front Wing) */}
          <motion.g
            animate={
              isFlying
                ? { scaleY: [1, 0.3, 1], rotate: [10, -20, 10] }
                : isCelebrating
                ? { scaleY: [1, 0.2, 1.2], rotate: [25, -25, 25] }
                : { scaleY: [1, 0.92, 1], rotate: [0, -3, 0] }
            }
            transition={{
              duration: isFlying ? 0.35 : isCelebrating ? 0.3 : 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '155px 115px' }}
          >
            <path
              d="M150 95 Q 225 65 220 120 Q 170 145 140 125 Z"
              fill={`url(#wingGrad-${bodyColor})`}
            />
            {/* Wing Feather Detail */}
            <path
              d="M155 102 Q 210 78 208 115 Q 170 135 148 120 Z"
              fill={colorScheme.accent}
              opacity="0.5"
            />
            <path
              d="M165 110 Q 200 90 198 118 Q 175 130 158 120 Z"
              fill="#FFFFFF"
              opacity="0.3"
            />
          </motion.g>

          {/* Beak */}
          <motion.g
            animate={
              isEating
                ? { scale: [1, 1.25, 1], rotate: [0, 15, 0] }
                : { rotate: [0, 1, 0] }
            }
            transition={{ duration: 0.4, repeat: isEating ? 3 : Infinity }}
            style={{ transformOrigin: '160px 75px' }}
          >
            <path
              d="M160 70 L 205 78 L 160 92 Z"
              fill="url(#goldBeak)"
              filter="url(#shadow)"
            />
            <path
              d="M160 78 L 195 81 L 160 85 Z"
              fill="#78350F"
              opacity="0.4"
            />
          </motion.g>

          {/* Expressive Eye */}
          <g>
            {/* Outer Eye Ring */}
            <circle cx="142" cy="72" r="14" fill="#FFFFFF" />
            <circle cx="142" cy="72" r="12" fill={colorScheme.eyeRing} opacity="0.5" />
            {/* Pupil */}
            <circle cx="144" cy="72" r="8" fill="#0F172A" />
            {/* Pupil Catchlight */}
            <circle cx="146" cy="69" r="3" fill="#FFFFFF" />
            <circle cx="141" cy="74" r="1.5" fill="#FFFFFF" opacity="0.8" />
          </g>

          {/* Cute Blush Cheek */}
          <circle cx="132" cy="88" r="8" fill="#F43F5E" opacity="0.25" />

          {/* Accessories */}
          {accessory === 'glasses' && (
            <g>
              <circle cx="142" cy="72" r="15" fill="none" stroke="#D97706" strokeWidth="3" />
              <path d="M127 72 L 115 72" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
              <path d="M157 72 L 165 72" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
              <circle cx="142" cy="72" r="14" fill="#60A5FA" opacity="0.2" />
            </g>
          )}

          {accessory === 'scarf' && (
            <g>
              <path
                d="M100 100 Q 130 115 155 95 Q 165 115 130 120 Q 95 115 100 100 Z"
                fill="#DC2626"
              />
              <path
                d="M140 108 L 155 145 L 138 150 L 128 112 Z"
                fill="#B91C1C"
              />
              <line x1="140" y1="148" x2="155" y2="148" stroke="#FBBF24" strokeWidth="2" />
            </g>
          )}

          {accessory === 'cap' && (
            <g>
              <path
                d="M110 50 Q 140 30 165 48 L 180 58 Q 145 60 105 56 Z"
                fill="#6D28D9"
              />
              <path
                d="M150 50 L 195 56 L 165 62 Z"
                fill="#4C1D95"
              />
              <circle cx="135" cy="38" r="4" fill="#F59E0B" />
            </g>
          )}

          {accessory === 'headphones' && (
            <g>
              {/* Headband */}
              <path
                d="M115 50 Q 140 25 155 52"
                fill="none"
                stroke="#0F172A"
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Ear cup */}
              <rect x="132" y="58" width="16" height="26" rx="8" fill="#6D28D9" stroke="#F59E0B" strokeWidth="2" />
              <rect x="135" y="63" width="10" height="16" rx="5" fill="#A78BFA" />
            </g>
          )}

          {/* Level 4 Elite Crown */}
          {level === 4 && (
            <g>
              <path
                d="M125 35 L 132 20 L 140 32 L 148 18 L 155 35 Z"
                fill="#F59E0B"
                stroke="#FEF3C7"
                strokeWidth="1.5"
              />
              <circle cx="132" cy="20" r="2.5" fill="#EF4444" />
              <circle cx="148" cy="18" r="2.5" fill="#3B82F6" />
            </g>
          )}
        </svg>

        {/* Dynamic Flight Trail Effect when Flying */}
        {isFlying && (
          <motion.div
            animate={{ opacity: [0.4, 0.9, 0.4], scaleX: [0.8, 1.3, 0.8] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute -left-16 top-1/2 -translate-y-1/2 w-24 h-6 rounded-full blur-md pointer-events-none"
            style={{
              background: `linear-gradient(to left, ${colorScheme.accent}, transparent)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
};
