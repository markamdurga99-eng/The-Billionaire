export type UserTier = 'free' | 'premium' | 'pro';

export interface UserProfile {
  id: string;
  name: string;
  phoneOrEmail: string;
  dailyIncome: number;
  currentOccupation: string;
  cityOrVillage: string;
  state: string;
  availableCapital: number;
  tier: UserTier;
  streakDays: number;
  lastActiveDate: string;
  points: number;
  completedLessons: string[]; // lesson ids
  completedChallenges: number[]; // day numbers
  unlockedLevels: number[]; // level numbers
  badges: Badge[];
  savedIdeas: string[];
  bookmarkedBooks: string[];
  isAdmin?: boolean;
}

export interface Badge {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  icon: string;
  earnedAt?: string;
  criteria: string;
}

export interface LessonQuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  levelNumber: number;
  title: string;
  titleHi: string;
  tagline?: string;
  durationMinutes: number;
  summary: string;
  content: string; // Rich Hindi markdown/text
  keyTakeaway: string;
  practicalAction: string;
  audioDurationSeconds: number;
  quiz?: LessonQuizQuestion[];
}

export interface RoadmapLevel {
  levelNumber: number;
  title: string;
  titleHi: string;
  tagline: string;
  description: string;
  iconName: string;
  color: string;
  lessons: Lesson[];
  requiredPointsToUnlock: number;
}

export interface BookSummary {
  id: string;
  title: string;
  titleHi: string;
  author: string;
  authorHi: string;
  category: string;
  categoryHi: string;
  coverColor: string;
  introduction: string;
  keyLessons: string[];
  chapterSummaries: { chapterNum: number; title: string; summary: string }[];
  keyPrinciples: string[];
  realLifeApplication: string;
  sevenDayActionPlan: string[];
  thirtyDayPractice: string[];
  audioScript: string;
  audioDurationMinutes: number;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  isPremium?: boolean;
}

export interface BusinessIdea {
  id: string;
  title: string;
  titleHi: string;
  budgetCategory: '0-1000' | '1000-5000' | '5000-10000' | '10000-25000' | '25000-50000' | '50000-100000' | '100000-500000';
  budgetCategoryLabel: string;
  startCostMin: number;
  startCostMax: number;
  requiredItems: string[];
  potentialCustomers: string;
  marketDemand: 'High' | 'Very High' | 'Medium';
  sellingMethod: string;
  monthlyOperatingExpenses: number;
  estimatedMonthlyProfit: string;
  dailyEarningEstimate: string;
  potentialRisks: string[];
  riskMitigation: string;
  thirtyDayRoadmap: { week: string; tasks: string[] }[];
  suitableFor: 'गांव और देहात' | 'कस्बा व शहर' | 'महिलाएं व गृहणियां' | 'दुकानदार' | 'कोई भी मेहनती व्यक्ति';
}

export interface DailyChallenge {
  day: number;
  title: string;
  instruction: string;
  practicalTask: string;
  financialWisdom: string;
  pointsReward: number;
}

export interface SuccessStory {
  id: string;
  name: string;
  location: string;
  previousIncome: string;
  currentBusiness: string;
  currentNetWorthOrTurnover: string;
  story: string;
  keyStrategy: string;
  quote: string;
}

export interface KhataTransaction {
  id: string;
  date: string;
  type: 'income' | 'expense' | 'savings' | 'reinvest';
  amount: number;
  category: string;
  note: string;
}

export interface AudioPlaybackState {
  isPlaying: boolean;
  trackId: string | null;
  trackTitle: string;
  trackSubtitle: string;
  textToSpeak: string;
  playbackRate: number; // 1, 1.25, 1.5, 2
  currentTime: number;
  duration: number;
  isSynthesizing: boolean;
  history: string[]; // track ids
}
