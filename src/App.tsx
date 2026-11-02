/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ExamEngine } from './components/ExamEngine';
import { ResultsView } from './components/ResultsView';
import { LeaderboardView } from './components/LeaderboardView';
import { QuestionBankExplorer } from './components/QuestionBankExplorer';
import { MistakesBankView } from './components/MistakesBankView';
import { UserProfileModal } from './components/UserProfileModal';
import { SimulatedExamSetup } from './components/SimulatedExamSetup';
import { SimulatedExamEngine } from './components/SimulatedExamEngine';
import { SimulatedExamReport } from './components/SimulatedExamReport';
import { RoadmapView } from './components/RoadmapView';

import { 
  ALL_QUESTIONS, 
  generateMockExam, 
  generateSimulatedExam,
  getQuestionsByCategory, 
  getQuestionsByLevel, 
  shuffleArray, 
  SUBSECTIONS_META,
  OFFICIAL_CSC_BLUEPRINT
} from './data/questions';
import { 
  Question, 
  ExamLevel, 
  SubtestCategory, 
  ExamResult, 
  UserProfile, 
  LeaderboardEntry 
} from './types/quiz';
import { 
  loadUserProfile, 
  saveUserProfile, 
  saveExamResult, 
  loadLeaderboard,
  loadExamHistory,
  toggleQuestionBookmark
} from './utils/storage';
import { sound } from './utils/sound';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [userProfile, setUserProfile] = useState<UserProfile>(loadUserProfile());
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Active exam states
  const [activeExamQuestions, setActiveExamQuestions] = useState<Question[]>([]);
  const [activeExamMode, setActiveExamMode] = useState<'full_mock' | 'subsection_drill' | 'speed_challenge'>('full_mock');
  const [activeExamLevel, setActiveExamLevel] = useState<ExamLevel>('professional');
  const [activeExamTimerMinutes, setActiveExamTimerMinutes] = useState(60);
  const [activeInstantFeedback, setActiveInstantFeedback] = useState(false);
  const [drillCategoryName, setDrillCategoryName] = useState<string | undefined>(undefined);

  // Last completed exam result
  const [lastExamResult, setLastExamResult] = useState<ExamResult | null>(null);

  // Leaderboard entries
  const [leaderboardList, setLeaderboardList] = useState<LeaderboardEntry[]>(loadLeaderboard());

  // Exam history for diagnostic scoring and roadmap
  const [examHistory, setExamHistory] = useState<ExamResult[]>(loadExamHistory());

  // Initialize theme & sound from storage/system
  useEffect(() => {
    const savedTheme = localStorage.getItem('cse_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setDarkMode(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const savedSound = localStorage.getItem('cse_sound');
    if (savedSound !== null) {
      const isEnabled = savedSound === 'true';
      setSoundEnabled(isEnabled);
      sound.enabled = isEnabled;
    }
  }, []);

  const handleToggleTheme = () => {
    sound.playTap();
    setDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('cse_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('cse_theme', 'light');
      }
      return next;
    });
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    localStorage.setItem('cse_sound', String(next));
    if (next) {
      sound.playCorrect();
    }
  };

  const handleSaveProfile = (updated: UserProfile) => {
    setUserProfile(updated);
    saveUserProfile(updated);
  };

  // Launch Simulated Exam (Full CSC Standard Structure)
  const handleLaunchSimulatedExam = (
    level: ExamLevel,
    preset: 'official_full' | 'half_length' | 'diagnostic_50'
  ) => {
    sound.playTap();
    const sim = generateSimulatedExam(level, preset);
    setActiveExamQuestions(sim.questions);
    setActiveExamLevel(level);
    setActiveExamTimerMinutes(sim.timeMinutes);
    setCurrentTab('simulated_exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Simulated Exam Finished
  const handleFinishSimulatedExam = (result: ExamResult) => {
    const incorrectIds = activeExamQuestions
      .filter(question => result.userAnswers[question.id] !== question.correctAnswer)
      .map(question => question.id);
    saveExamResult(result, incorrectIds);
    setLastExamResult(result);
    setUserProfile(loadUserProfile());
    setLeaderboardList(loadLeaderboard());
    setExamHistory(loadExamHistory());
    setCurrentTab('simulated_report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Launch Standard Mock Exam
  const handleStartMockExam = (level: ExamLevel, count: number = 50) => {
    sound.playTap();
    const questions = generateMockExam(level, count);
    setActiveExamQuestions(questions);
    setActiveExamMode('full_mock');
    setActiveExamLevel(level);
    const minutes = count === 170 ? 190 : count === 100 ? 120 : 60;
    setActiveExamTimerMinutes(minutes);
    setActiveInstantFeedback(false);
    setDrillCategoryName(undefined);
    setCurrentTab('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Launch Subsection Drill
  const handleStartDrill = (category: SubtestCategory, instantFeedback: boolean) => {
    sound.playTap();
    const pool = getQuestionsByCategory(category);
    const questions = shuffleArray(pool).slice(0, 20);
    setActiveExamQuestions(questions);
    setActiveExamMode('subsection_drill');
    setActiveExamLevel(userProfile.targetLevel);
    setActiveExamTimerMinutes(25);
    setActiveInstantFeedback(instantFeedback);
    setDrillCategoryName(SUBSECTIONS_META[category]?.name);
    setCurrentTab('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Launch Speed Challenge (Arcade Rush)
  const handleStartSpeedRush = () => {
    sound.playTap();
    const eligible = getQuestionsByLevel(userProfile.targetLevel);
    const questions = shuffleArray(eligible).slice(0, 20);
    setActiveExamQuestions(questions);
    setActiveExamMode('speed_challenge');
    setActiveExamLevel(userProfile.targetLevel);
    setActiveInstantFeedback(false);
    setDrillCategoryName('⚡ Speed Rush (25s bawat tanong)');
    setCurrentTab('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Launch Drill on Mistakes
  const handleStartMistakesDrill = (questions: Question[]) => {
    sound.playTap();
    setActiveExamQuestions(questions);
    setActiveExamMode('subsection_drill');
    setActiveExamLevel(userProfile.targetLevel);
    setActiveExamTimerMinutes(Math.max(questions.length * 1.5, 10));
    setActiveInstantFeedback(true);
    setDrillCategoryName('Pagsasanay sa mga Maling Sagot');
    setCurrentTab('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Standard Exam Finished
  const handleFinishExam = (result: ExamResult) => {
    const incorrectIds = activeExamQuestions
      .filter(question => result.userAnswers[question.id] !== question.correctAnswer)
      .map(question => question.id);
    saveExamResult(result, incorrectIds);
    setLastExamResult(result);
    setUserProfile(loadUserProfile());
    setLeaderboardList(loadLeaderboard());
    setExamHistory(loadExamHistory());
    setCurrentTab('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmark = (id: string) => {
    toggleQuestionBookmark(id);
    setUserProfile(loadUserProfile());
  };

  const handleClearFromMistakes = (id: string) => {
    const updated = loadUserProfile();
    setUserProfile(updated);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans transition-colors">
      
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'mock_exam_setup' || tab === 'simulated_setup') {
            setCurrentTab('simulated_setup');
          } else if (tab === 'speed_rush') {
            handleStartSpeedRush();
          } else if (tab === 'roadmap') {
            setExamHistory(loadExamHistory());
            setCurrentTab('roadmap');
          } else {
            setCurrentTab(tab);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        darkMode={darkMode}
        onToggleTheme={handleToggleTheme}
        userProfile={userProfile}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {currentTab === 'home' && (
          <HomeView
            userProfile={userProfile}
            onOpenSimulatedExam={() => {
              setCurrentTab('simulated_setup');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenRoadmap={() => {
              setExamHistory(loadExamHistory());
              setCurrentTab('roadmap');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onStartMockExam={handleStartMockExam}
            onStartDrill={handleStartDrill}
            onStartSpeedRush={handleStartSpeedRush}
            onOpenQuestionBank={() => setCurrentTab('question_bank')}
            onOpenLeaderboard={() => {
              setLeaderboardList(loadLeaderboard());
              setCurrentTab('leaderboard');
            }}
            onOpenMistakes={() => setCurrentTab('mistakes')}
            onOpenProfile={() => setIsProfileModalOpen(true)}
          />
        )}

        {/* Dedicated Simulated Exam Briefing Room */}
        {currentTab === 'simulated_setup' && (
          <SimulatedExamSetup
            userProfile={userProfile}
            onLaunchExam={handleLaunchSimulatedExam}
            onBack={() => setCurrentTab('home')}
          />
        )}

        {/* Dedicated Simulated Exam Room with OMR Sheet & Proctor Timer */}
        {currentTab === 'simulated_exam' && activeExamQuestions.length > 0 && (
          <SimulatedExamEngine
            questions={activeExamQuestions}
            examLevel={activeExamLevel}
            timeLimitMinutes={activeExamTimerMinutes}
            examineeName={userProfile.name}
            onFinishExam={handleFinishSimulatedExam}
            onQuit={() => setCurrentTab('home')}
            bookmarkedIds={userProfile.bookmarkedQuestionIds}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {/* Dedicated Official CSC Report of Rating and In-Depth Subsection Review */}
        {currentTab === 'simulated_report' && lastExamResult && (
          <SimulatedExamReport
            result={lastExamResult}
            allQuestions={ALL_QUESTIONS}
            userProfile={userProfile}
            onRetake={() => setCurrentTab('simulated_setup')}
            onPracticeMistakes={() => {
              const wrongIds = lastExamResult.questionIds.filter(
                id => lastExamResult.userAnswers[id] !== ALL_QUESTIONS.find(q => q.id === id)?.correctAnswer
              );
              const wrongQuestions = wrongIds
                .map(id => ALL_QUESTIONS.find(q => q.id === id))
                .filter((q): q is Question => q !== undefined);
              if (wrongQuestions.length > 0) {
                handleStartMistakesDrill(wrongQuestions);
              }
            }}
            onGoToLeaderboard={() => {
              setLeaderboardList(loadLeaderboard());
              setCurrentTab('leaderboard');
            }}
            onGoHome={() => setCurrentTab('home')}
            bookmarkedIds={userProfile.bookmarkedQuestionIds}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {currentTab === 'drills' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <HomeView
              userProfile={userProfile}
              onOpenSimulatedExam={() => {
                setCurrentTab('simulated_setup');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenRoadmap={() => {
                setExamHistory(loadExamHistory());
                setCurrentTab('roadmap');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onStartMockExam={handleStartMockExam}
              onStartDrill={handleStartDrill}
              onStartSpeedRush={handleStartSpeedRush}
              onOpenQuestionBank={() => setCurrentTab('question_bank')}
              onOpenLeaderboard={() => setCurrentTab('leaderboard')}
              onOpenMistakes={() => setCurrentTab('mistakes')}
              onOpenProfile={() => setIsProfileModalOpen(true)}
            />
          </div>
        )}

        {/* Dedicated CSC Coverage Roadmap & Weakest Area Recommender */}
        {currentTab === 'roadmap' && (
          <RoadmapView
            userProfile={userProfile}
            examHistory={examHistory}
            allQuestions={ALL_QUESTIONS}
            onStartDrill={handleStartDrill}
            onStartSimulatedExam={() => {
              setCurrentTab('simulated_setup');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onPracticeMistakes={() => {
              const wrongQuestions = userProfile.incorrectQuestionIds
                .map(id => ALL_QUESTIONS.find(q => q.id === id))
                .filter((q): q is Question => q !== undefined);
              if (wrongQuestions.length > 0) {
                handleStartMistakesDrill(wrongQuestions);
              } else {
                setCurrentTab('mistakes');
              }
            }}
          />
        )}

        {currentTab === 'exam' && activeExamQuestions.length > 0 && (
          <ExamEngine
            questions={activeExamQuestions}
            mode={activeExamMode}
            examLevel={activeExamLevel}
            totalTimeMinutes={activeExamTimerMinutes}
            speedSecondsPerQuestion={25}
            instantFeedback={activeInstantFeedback}
            drillCategoryName={drillCategoryName}
            onFinishExam={handleFinishExam}
            onQuit={() => setCurrentTab('home')}
            bookmarkedIds={userProfile.bookmarkedQuestionIds}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {currentTab === 'results' && lastExamResult && (
          <ResultsView
            result={lastExamResult}
            allQuestions={ALL_QUESTIONS}
            userProfile={userProfile}
            onRetake={() => handleStartMockExam(lastExamResult.examLevel, lastExamResult.totalQuestions)}
            onGoToLeaderboard={() => {
              setLeaderboardList(loadLeaderboard());
              setCurrentTab('leaderboard');
            }}
            onPracticeMistakes={() => {
              const wrongIds = lastExamResult.questionIds.filter(
                id => lastExamResult.userAnswers[id] !== ALL_QUESTIONS.find(q => q.id === id)?.correctAnswer
              );
              const wrongQuestions = wrongIds
                .map(id => ALL_QUESTIONS.find(q => q.id === id))
                .filter((q): q is Question => q !== undefined);
              if (wrongQuestions.length > 0) {
                handleStartMistakesDrill(wrongQuestions);
              }
            }}
            onGoHome={() => setCurrentTab('home')}
            bookmarkedIds={userProfile.bookmarkedQuestionIds}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {currentTab === 'leaderboard' && (
          <LeaderboardView
            entries={leaderboardList}
            userProfile={userProfile}
            onStartExam={() => setCurrentTab('simulated_setup')}
            onStartSpeedRush={handleStartSpeedRush}
          />
        )}

        {currentTab === 'question_bank' && (
          <QuestionBankExplorer
            questions={ALL_QUESTIONS}
            bookmarkedIds={userProfile.bookmarkedQuestionIds}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {currentTab === 'mistakes' && (
          <MistakesBankView
            incorrectIds={userProfile.incorrectQuestionIds}
            allQuestions={ALL_QUESTIONS}
            onStartMistakeDrill={handleStartMistakesDrill}
            onClearFromMistakes={handleClearFromMistakes}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">CSE Topnotcher Reviewer</span>
            <span>·</span>
            <span>Independent CSE Practice Simulation · Not affiliated with CSC</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Practice target: 80.00%</span>
            <span>·</span>
            <span>Local practice data</span>
          </div>
        </div>
      </footer>

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={userProfile}
        onSave={handleSaveProfile}
      />

    </div>
  );
}
