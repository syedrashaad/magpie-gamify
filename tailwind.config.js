/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        magpie: {
          cream: '#FAF8F5',
          'cream-dark': '#F2ECE1',
          'cream-card': '#FFFFFF',
          navy: '#0F172A',
          'navy-light': '#1E293B',
          purple: '#6D28D9',
          'purple-light': '#7C3AED',
          'purple-soft': '#F3E8FF',
          gold: '#D97706',
          'gold-light': '#F59E0B',
          'gold-soft': '#FEF3C7',
          feather: '#2563EB',
          egg: '#F59E0B',
          food: '#10B981',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 25px -5px rgba(109, 40, 217, 0.4)',
        'glow-gold': '0 0 25px -5px rgba(217, 119, 6, 0.4)',
        'glow-food': '0 0 25px -5px rgba(16, 185, 129, 0.4)',
        'hospitality': '0 10px 30px -10px rgba(15, 23, 42, 0.08)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wing-flap': 'wingFlap 1.2s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        wingFlap: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(0.85)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      }
    },
  },
  plugins: [],
}
