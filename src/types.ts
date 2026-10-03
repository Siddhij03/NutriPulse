export interface UserProfile {
  name: string;
  avatar: string;
  level: number;
  xp: number;
  xpTarget: number;
  streakDays: number;
  energyScore: number;
  healthIndex: number;
  healthBreakdown: {
    nutrition: number;
    hydration: number;
    sleep: number;
    activity: number;
    recovery: number;
  };
  hydrationCurrent: number;
  hydrationGoal: number;
  caloriesCurrent: number;
  caloriesGoal: number;
  macros: {
    protein: { current: number; goal: number };
    carbs: { current: number; goal: number };
    fat: { current: number; goal: number };
  };
  sleepDuration: string;
  sleepRestfulPct: number;
  stepsCurrent: number;
  stepsGoal: number;
}

export interface DailyQuest {
  id: string;
  title: string;
  subtitle: string;
  xp: number;
  completed: boolean;
  completedAt?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Produce' | 'Dairy & Protein' | 'Pantry Staples';
  quantity: number;
  unit: string;
  location: string;
  expiresInDays: number;
  statusBadge: string;
  isUrgent: boolean;
  emoji: string;
}

export interface Recipe {
  id: string;
  title: string;
  image: string;
  prepTimeMin: number;
  calories: number;
  proteinG: number;
  staminaBenefit: string;
  wasteSavedRupees: number;
  usesExpiring: string[];
  inStockPercent: number;
  isWasteSaverNumber?: number;
  autoDeductItems: { name: string; amount: string; remainingStatus: string }[];
  description: string;
  instructions: string[];
}

export interface EnergyTimeNode {
  id: string;
  code: string;
  time: string;
  energyPct: number;
  status: string;
  circadianPhase: string;
  digestionState: string;
  caffeineDecay: string;
  hydrationDelta: string;
  isSlump?: boolean;
}

export interface ScheduleEvent {
  time: string;
  period: 'AM' | 'PM';
  title: string;
  description: string;
  tag?: string;
  colorBorder: string;
  icon?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  subtext?: string;
  richCard?: {
    recipeId?: string;
    title: string;
    image: string;
    prepTime: string;
    calories: number;
    protein: string;
    staminaTag: string;
    wasteTag: string;
    sustainedStaminaNote: string;
    kitchenWinNote: string;
    xpBonus: number;
  };
  trajectoryData?: {
    dropPercent: number;
    timeLabel: string;
    solutionText: string;
    solutionDetail: string;
    isMitigated?: boolean;
  };
}

export interface TelemetryEvent {
  id: string;
  name: string;
  details: string;
  node: string;
  timeAgo: string;
  type: 'deduct' | 'prevent' | 'ai' | 'register';
}

export interface PrivacySetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  icon: string;
  accentColor?: string;
}
