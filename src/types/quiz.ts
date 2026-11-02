export type SubtestCategory = 
  | 'numerical' 
  | 'analytical' 
  | 'verbal' 
  | 'general_info' 
  | 'clerical';

export type ExamLevel = 'professional' | 'sub_professional';

export interface QuestionExplanation {
  correctRationale: string;
  stepByStep?: string[];
  keyFormulaOrRule?: string;
  whyOthersAreWrong?: string;
  tagalogSummary?: string;
}

export interface Question {
  id: string;
  category: SubtestCategory;
  subtopic: string;
  level: 'all' | 'professional' | 'sub_professional';
  question: string;
  options: string[];
  correctAnswer: number; // 0=A, 1=B, 2=C, 3=D, 4=E
  explanation: QuestionExplanation;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface SubsectionScore {
  category: SubtestCategory;
  categoryName: string;
  total: number;
  correct: number;
  percentage: number;
  passed: boolean; // CSC standard is >= 80%
}

export interface ExamResult {
  id: string;
  mode: 'full_mock' | 'subsection_drill' | 'speed_challenge';
  examLevel: ExamLevel;
  timestamp: number;
  totalQuestions: number;
  totalCorrect: number;
  overallPercentage: number;
  passed: boolean;
  timeSpentSeconds: number;
  subsectionScores: Record<string, SubsectionScore>;
  userAnswers: Record<string, number>; // questionId -> selectedOption (0..4)
  questionIds: string[];
  xpEarned: number;
}

export interface LeaderboardEntry {
  id: string;
  rank?: number;
  userName: string;
  region: string;
  avatar: string;
  examLevel: ExamLevel;
  ratingPercentage: number;
  correctCount: number;
  totalCount: number;
  timeFormatted: string;
  mode: 'full_mock' | 'speed_challenge' | 'drill' | 'subsection_drill';
  dateStr: string;
  isCurrentUser?: boolean;
  statusBadge: string;
}

export interface UserProfile {
  name: string;
  region: string;
  avatar: string;
  targetLevel: ExamLevel;
  totalXp: number;
  currentStreak: number;
  longestStreak?: number;
  lastActiveDate?: string;
  streakDaysActive?: string[];
  dailyGoalMinutes: number; // Target daily study time in minutes
  todayStudyMinutes: number; // Time studied today in minutes
  studyHistory?: Record<string, number>; // YYYY-MM-DD -> minutes studied
  examsCompleted: number;
  bestRating: number;
  bookmarkedQuestionIds: string[];
  incorrectQuestionIds: string[];
  masteredQuestionIds: string[];
}
