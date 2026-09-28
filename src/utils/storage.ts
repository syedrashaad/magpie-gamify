import { UserState } from '../types';

const STORAGE_KEY = 'magpie_ai_world_v2';

export const INITIAL_USER_STATE: UserState = {
  name: 'Rashaad Syed',
  role: 'Front Office Associate',
  property: 'Sandalwood Grand • BLR',
  course: 'Front Office Excellence',
  flightDays: 5,
  magpie: {
    name: 'Nova',
    bodyColor: 'blue',
    featherStyle: 'iridescent',
    accessory: 'headphones',
    level: 2,
    xp: 82,
    growth: 82, // 82% to Level 3
  },
  rewards: {
    eggs: 25,
    feathers: 20,
    food: 15,
  },
  flight: {
    power: 145,
    currentDistance: 112,
    personalBest: 112,
    lane: 'BOOST',
  },
  training: {
    scenariosCompleted: 14,
    currentScore: 8,
    previousScore: 6,
    lastPracticeDate: 'Today',
  },
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

export const getLevelTitle = (level: number): string => {
  switch (level) {
    case 1:
      return 'Baby Magpie';
    case 2:
      return 'Young Magpie';
    case 3:
      return 'Flying Magpie';
    default:
      return 'Flying Magpie';
  }
};

export const calculateLane = (eggs: number): 'PRACTICE' | 'FLIGHT' | 'BOOST' | 'GOLDEN' => {
  if (eggs >= 50) return 'GOLDEN';
  if (eggs >= 25) return 'BOOST';
  if (eggs >= 10) return 'FLIGHT';
  return 'PRACTICE';
};
