import { UserState, MagpieLevel, FlightLane } from '../types';

const STORAGE_KEY = 'magpie_ai_v2_store';

export const INITIAL_USER_STATE: UserState = {
  name: 'Rashaad Syed',
  role: 'Front Office Associate',
  property: 'The Sandalwood Grand',
  location: 'BLR',
  streak: 5,
  xp: 840,
  dailyGoal: {
    targetXP: 20,
    currentXP: 15,
  },
  magpie: {
    name: 'Nova',
    bodyColor: 'blue',
    featherStyle: 'iridescent',
    accessory: 'headphones',
    level: 2,
    growth: 82, // 82%
  },
  rewards: {
    eggs: 35,
    feathers: 26,
    food: 18,
  },
  flight: {
    personalBest: 148,
    lastFlightDistance: 112,
  },
  skills: {
    empathy: 82,
    communication: 91,
    ownership: 76,
    problemSolving: 86,
  },
  scenariosCompletedCount: 16,
};

export const loadUserState = (): UserState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load user state from localStorage', e);
  }
  return INITIAL_USER_STATE;
};

export const saveUserState = (state: UserState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save user state to localStorage', e);
  }
};

export const resetUserState = (): UserState => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to reset user state', e);
  }
  return INITIAL_USER_STATE;
};

export const getLevelTitle = (level: MagpieLevel): string => {
  switch (level) {
    case 1:
      return 'Nestling';
    case 2:
      return 'Young Magpie';
    case 3:
      return 'Flying Magpie';
    case 4:
      return 'Skilled Magpie';
    case 5:
      return 'Master Magpie';
    default:
      return 'Young Magpie';
  }
};

export const calculateLane = (eggs: number): FlightLane => {
  if (eggs >= 50) return 'GOLDEN';
  if (eggs >= 25) return 'BOOST';
  if (eggs >= 10) return 'FLIGHT';
  return 'PRACTICE';
};
