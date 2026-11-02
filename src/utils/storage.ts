import { UserProfile, ExamResult, LeaderboardEntry, ExamLevel } from '../types/quiz';
import { INITIAL_LEADERBOARD } from '../data/leaderboardData';

const STORAGE_KEYS = {
  PROFILE: 'cse_user_profile',
  EXAM_HISTORY: 'cse_exam_history',
  LEADERBOARD: 'cse_leaderboard_entries',
  SOUND_ENABLED: 'cse_sound_enabled',
  THEME: 'cse_theme'
};

const DEFAULT_PROFILE: UserProfile = {
  name: 'Future CSC Eligible',
  region: 'National Capital Region (NCR)',
  avatar: '🎓',
  targetLevel: 'professional',
  totalXp: 0,
  currentStreak: 1,
  longestStreak: 1,
  dailyGoalMinutes: 30,
  todayStudyMinutes: 0,
  studyHistory: {},
  examsCompleted: 0,
  bestRating: 0,
  bookmarkedQuestionIds: [],
  incorrectQuestionIds: [],
  masteredQuestionIds: []
};

export function getTodayDateString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getYesterdayDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function loadUserProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    const today = getTodayDateString();
    const yesterday = getYesterdayDateString();

    let profile: UserProfile = raw ? { ...DEFAULT_PROFILE, ...JSON.parse(raw) } : { ...DEFAULT_PROFILE };

    // Initialize or evaluate daily streak
    if (!profile.lastActiveDate) {
      profile.lastActiveDate = today;
      profile.currentStreak = 1;
      profile.longestStreak = 1;
      profile.streakDaysActive = [today];
      saveUserProfile(profile);
    } else if (profile.lastActiveDate === today) {
      // Already active today; streak is preserved
      if (!profile.streakDaysActive) profile.streakDaysActive = [today];
      if (!profile.longestStreak) profile.longestStreak = profile.currentStreak;
    } else if (profile.lastActiveDate === yesterday) {
      // Active yesterday; streak increments by 1
      profile.currentStreak = (profile.currentStreak || 0) + 1;
      profile.lastActiveDate = today;
      profile.longestStreak = Math.max(profile.longestStreak || 1, profile.currentStreak);
      const days = profile.streakDaysActive || [];
      if (!days.includes(today)) days.push(today);
      profile.streakDaysActive = days.slice(-14);
      saveUserProfile(profile);
    } else {
      // Inactive for more than 1 day; streak resets to 1
      profile.currentStreak = 1;
      profile.lastActiveDate = today;
      profile.streakDaysActive = [today];
      saveUserProfile(profile);
    }

    // Ensure daily goal and study history are present
    if (!profile.dailyGoalMinutes || profile.dailyGoalMinutes < 5) {
      profile.dailyGoalMinutes = 30;
    }
    if (!profile.studyHistory) {
      profile.studyHistory = {};
    }
    profile.todayStudyMinutes = profile.studyHistory[today] || 0;

    return profile;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch {
    // Ignore storage errors
  }
}

export function recordStudyMinutes(minutes: number): UserProfile {
  try {
    const profile = loadUserProfile();
    const today = getTodayDateString();
    if (!profile.studyHistory) profile.studyHistory = {};
    profile.studyHistory[today] = (profile.studyHistory[today] || 0) + Math.max(1, minutes);
    profile.todayStudyMinutes = profile.studyHistory[today];
    saveUserProfile(profile);
    return profile;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function loadExamHistory(): ExamResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EXAM_HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveExamResult(result: ExamResult): void {
  try {
    const history = loadExamHistory();
    history.unshift(result);
    localStorage.setItem(STORAGE_KEYS.EXAM_HISTORY, JSON.stringify(history.slice(0, 50)));

    // Update user profile
    const profile = loadUserProfile();
    const today = getTodayDateString();
    profile.examsCompleted += 1;
    profile.totalXp += result.xpEarned;
    if (result.overallPercentage > profile.bestRating) {
      profile.bestRating = result.overallPercentage;
    }

    // Track study minutes for the day
    const seconds = result.timeSpentSeconds || 60;
    const minutesSpent = Math.max(1, Math.round(seconds / 60));
    if (!profile.studyHistory) profile.studyHistory = {};
    profile.studyHistory[today] = (profile.studyHistory[today] || 0) + minutesSpent;
    profile.todayStudyMinutes = profile.studyHistory[today];

    // Update incorrect question IDs
    Object.entries(result.userAnswers).forEach(([qId, ans]) => {
      // Find whether correct: we can track incorrects
      const isIncorrect = result.questionIds.includes(qId) && !profile.incorrectQuestionIds.includes(qId);
    });

    saveUserProfile(profile);
  } catch {
    // Ignore
  }
}

export function loadLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
    const custom: LeaderboardEntry[] = raw ? JSON.parse(raw) : [];
    
    // Combine custom user attempts with initial topnotchers
    const combined = [...custom, ...INITIAL_LEADERBOARD];
    // Sort descending by ratingPercentage
    combined.sort((a, b) => b.ratingPercentage - a.ratingPercentage);
    
    // Assign ranks
    return combined.map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));
  } catch {
    return INITIAL_LEADERBOARD.map((e, idx) => ({ ...e, rank: idx + 1 }));
  }
}

export function addLeaderboardScore(
  userName: string,
  region: string,
  avatar: string,
  examLevel: ExamLevel,
  correctCount: number,
  totalCount: number,
  seconds: number,
  mode: 'full_mock' | 'speed_challenge' | 'drill' | 'subsection_drill'
): LeaderboardEntry {
  const rating = Number(((correctCount / totalCount) * 100).toFixed(2));
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeFormatted = `${mins}m ${secs}s`;

  let statusBadge = 'Aspirant';
  if (rating >= 95) statusBadge = 'National Top 10';
  else if (rating >= 90) statusBadge = 'Honor Roll';
  else if (rating >= 80) statusBadge = 'CSC Eligible (Passed)';

  const newEntry: LeaderboardEntry = {
    id: `user-score-${Date.now()}`,
    userName,
    region,
    avatar,
    examLevel,
    ratingPercentage: rating,
    correctCount,
    totalCount,
    timeFormatted,
    mode,
    dateStr: 'Ngayon lang',
    isCurrentUser: true,
    statusBadge
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
    const existing: LeaderboardEntry[] = raw ? JSON.parse(raw) : [];
    existing.unshift(newEntry);
    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(existing.slice(0, 30)));
  } catch {
    // Ignore
  }

  return newEntry;
}

export function toggleQuestionBookmark(questionId: string): boolean {
  const profile = loadUserProfile();
  const exists = profile.bookmarkedQuestionIds.includes(questionId);
  if (exists) {
    profile.bookmarkedQuestionIds = profile.bookmarkedQuestionIds.filter(id => id !== questionId);
  } else {
    profile.bookmarkedQuestionIds.push(questionId);
  }
  saveUserProfile(profile);
  return !exists;
}

export function recordMistake(questionId: string): void {
  const profile = loadUserProfile();
  if (!profile.incorrectQuestionIds.includes(questionId)) {
    profile.incorrectQuestionIds.push(questionId);
  }
  // Remove from mastered if it was there
  profile.masteredQuestionIds = profile.masteredQuestionIds.filter(id => id !== questionId);
  saveUserProfile(profile);
}

export function markAsMastered(questionId: string): void {
  const profile = loadUserProfile();
  profile.incorrectQuestionIds = profile.incorrectQuestionIds.filter(id => id !== questionId);
  if (!profile.masteredQuestionIds.includes(questionId)) {
    profile.masteredQuestionIds.push(questionId);
  }
  saveUserProfile(profile);
}
