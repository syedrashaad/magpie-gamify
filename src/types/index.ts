export type BodyColor = 'black' | 'blue' | 'purple' | 'green' | 'silver' | 'gold';
export type FeatherStyle = 'classic' | 'soft' | 'iridescent' | 'patterned';
export type Accessory = 'none' | 'scarf' | 'badge' | 'hat' | 'bow' | 'headphones' | 'glasses' | 'cap';

export type MagpieLevel = 1 | 2 | 3 | 4 | 5;

export interface MagpieCharacterState {
  name: string;
  bodyColor: BodyColor;
  featherStyle: FeatherStyle;
  accessory: Accessory;
  level: MagpieLevel;
  growth: number; // 0-100 percentage
}

export interface RewardsState {
  eggs: number;
  feathers: number;
  food: number;
}

export interface DailyGoal {
  targetXP: number; // e.g. 20
  currentXP: number; // e.g. 15
}

export interface SkillScores {
  empathy: number; // 0-100
  communication: number; // 0-100
  ownership: number; // 0-100
  problemSolving: number; // 0-100
}

export type FlightLane = 'PRACTICE' | 'FLIGHT' | 'BOOST' | 'GOLDEN';

export interface FlightState {
  personalBest: number; // in meters, e.g. 148
  lastFlightDistance?: number;
  currentDistance?: number;
  power?: number;
  lane?: FlightLane;
}

export interface UserState {
  name: string;
  role: string;
  property: string;
  location: string;
  streak: number; // 🔥 5
  flightDays?: number; // legacy alias
  xp: number; // 840
  dailyGoal: DailyGoal;
  magpie: MagpieCharacterState;
  rewards: RewardsState;
  flight: FlightState;
  skills: SkillScores;
  scenariosCompletedCount: number;
}

export type ActiveTab = 'tasks' | 'coach' | 'training' | 'home' | 'courses' | 'sky-race';
