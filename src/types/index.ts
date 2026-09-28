export type BodyColor = 'black' | 'blue' | 'purple' | 'green' | 'gold';
export type FeatherStyle = 'sleek' | 'iridescent' | 'fluffy' | 'golden';
export type Accessory = 'none' | 'scarf' | 'glasses' | 'cap' | 'headphones';

export interface MagpieCharacter {
  name: string;
  bodyColor: BodyColor;
  featherStyle: FeatherStyle;
  accessory: Accessory;
  level: 1 | 2 | 3 | 4; // 1: Baby 🐣, 2: Young 🐦, 3: Flying 🪽, 4: Elite ✨
  xp: number;
  growth: number; // 0 - 100 percentage inside current level
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

export interface Scenario {
  id: string;
  title: string;
  category: string;
  property: string;
  guestName: string;
  situation: string;
  timeLimit: string;
  rewardFood: number;
  rewardFeathers: number;
  rewardEggs: number;
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
  magpie: MagpieCharacter;
  rewards: RewardsState;
  flight: FlightState;
  training: TrainingState;
}

export type ActiveTab = 'home' | 'courses' | 'coach' | 'training' | 'my-magpie' | 'sky-race';
