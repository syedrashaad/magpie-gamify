import { UserState, MagpieLevel, FlightLane, SkyLeagueMember, Teammate } from '../types';
import { DEMO_TEAMMATES } from '../data/scenarios';

const STORAGE_KEY = 'magpie_ai_v3_store_map';
const LEADERBOARD_KEY = 'magpie_ai_v3_leaderboard';
const TEAMMATES_KEY = 'magpie_ai_v3_teammates';

export const INITIAL_USER_STATE: UserState = {
  name: 'Rashaad Syed',
  role: 'Front Office Associate',
  property: 'The Sandalwood Grand',
  location: 'BLR',
  streak: 5,
  flightDays: 5,
  xp: 840,
  flightPower: 142,
  rank: 4,
  currentLevelNumber: 3,
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
    growth: 82,
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

export const INITIAL_LEADERBOARD: SkyLeagueMember[] = [
  { id: 'usr-1', rank: 1, name: 'Ananya Sharma', role: 'Duty Manager', property: 'The Sandalwood Grand', xp: 910, flightPower: 185, streak: 8, avatarColor: 'purple' },
  { id: 'usr-2', rank: 2, name: 'Priya Patel', role: 'Concierge Lead', property: 'The Sandalwood Grand', xp: 860, flightPower: 168, streak: 6, avatarColor: 'emerald' },
  { id: 'usr-3', rank: 3, name: 'Arjun Verma', role: 'Guest Relations', property: 'The Sandalwood Grand', xp: 810, flightPower: 140, streak: 4, avatarColor: 'amber' },
  { id: 'usr-4', rank: 4, name: 'Rashaad Syed', role: 'Front Office Associate', property: 'The Sandalwood Grand', xp: 840, flightPower: 142, streak: 5, avatarColor: 'blue', isCurrentUser: true },
  { id: 'usr-5', rank: 5, name: 'Sarah Jenkins', role: 'Front Desk Officer', property: 'The Sandalwood Grand', xp: 760, flightPower: 125, streak: 3, avatarColor: 'rose' },
  { id: 'usr-6', rank: 6, name: 'Vikram Rao', role: 'Night Auditor', property: 'The Sandalwood Grand', xp: 720, flightPower: 110, streak: 2, avatarColor: 'slate' },
];

export const loadUserState = (): UserState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...INITIAL_USER_STATE,
        ...parsed,
        currentLevelNumber: parsed.currentLevelNumber || 3,
      };
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

export const loadTeammatesState = (): Teammate[] => {
  try {
    const saved = localStorage.getItem(TEAMMATES_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load teammates state', e);
  }
  return DEMO_TEAMMATES;
};

export const saveTeammatesState = (teammates: Teammate[]): void => {
  try {
    localStorage.setItem(TEAMMATES_KEY, JSON.stringify(teammates));
  } catch (e) {
    console.error('Failed to save teammates state', e);
  }
};

export const loadLeaderboardState = (): SkyLeagueMember[] => {
  try {
    const saved = localStorage.getItem(LEADERBOARD_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load leaderboard state', e);
  }
  return INITIAL_LEADERBOARD;
};

export const saveLeaderboardState = (board: SkyLeagueMember[]): void => {
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(board));
  } catch (e) {
    console.error('Failed to save leaderboard state', e);
  }
};

export const resetUserState = (): UserState => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEADERBOARD_KEY);
    localStorage.removeItem(TEAMMATES_KEY);
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
