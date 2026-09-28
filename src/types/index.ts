export type BodyColor = 'black' | 'blue' | 'purple' | 'green' | 'gold';
export type FeatherStyle = 'classic' | 'soft' | 'iridescent' | 'patterned';
export type Accessory = 'none' | 'scarf' | 'glasses' | 'headphones' | 'cap';

export interface MagpieCharacterState {
  name: string;
  bodyColor: BodyColor;
  featherStyle: FeatherStyle;
  accessory: Accessory;
  level: 1 | 2 | 3; // 1: Baby Magpie, 2: Young Magpie, 3: Flying Magpie
  xp: number;
  growth: number; // 0-100 percentage inside current level
}

export interface RewardsState {
  eggs: number;
  feathers: number;
  food: number;
}

export type FlightLane = 'PRACTICE' | 'FLIGHT' | 'BOOST' | 'GOLDEN';

export interface FlightState {
  power: number;
  currentDistance: number; // in meters, e.g. 112
  personalBest: number; // in meters, e.g. 112
  lane: FlightLane;
}

export interface TrainingState {
  scenariosCompleted: number;
  currentScore: number;
  previousScore: number;
  lastPracticeDate: string;
}

export interface UserState {
  name: string;
  role: string;
  property: string;
  course: string;
  flightDays: number;
  magpie: MagpieCharacterState;
  rewards: RewardsState;
  flight: FlightState;
  training: TrainingState;
}

export type ActiveTab = 'home' | 'courses' | 'coach' | 'training' | 'my-magpie' | 'sky-race';
