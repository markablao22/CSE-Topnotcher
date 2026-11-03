import React from 'react';
import { Volume2, VolumeX, Moon, Sun, User as UserIcon, Flame, Trophy, ShieldCheck, Compass } from 'lucide-react';
import { sound } from '../utils/sound';
import { UserProfile } from '../types/quiz';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  darkMode: boolean;
  onToggleTheme: () => void;
  userProfile: UserProfile;
  onOpenProfile: () => void;
  onOpenPremium?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  soundEnabled,
  onToggleSound,
  darkMode,
  onToggleTheme,
  userProfile,
  onOpenProfile,
  onOpenPremium,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Wordmark & Seal */}
          <button 
            onClick={() => { sound.playTap(); onSelectTab('home'); }}
            className="flex items-center gap-3 text-left shrink-0 group focus:outline-none"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-amber-500/40 shadow-xs shrink-0 bg-slate-900">
              <img 
                src="/src/assets/images/cse_hero_emblem_1793651615971.jpg" 
                alt="CSE Seal" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  CSE Topnotcher
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-sm bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                  65 Free Qs
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium hidden sm:block">
                Philippine Civil Service Exam Reviewer
              </p>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => { sound.playTap(); onSelectTab('home'); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                currentTab === 'home'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => { sound.playTap(); onSelectTab('simulated_setup'); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                currentTab.startsWith('simulated')
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span>Simulated Exam</span>
            </button>
            <button
              onClick={() => { sound.playTap(); onSelectTab('roadmap'); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                currentTab === 'roadmap'
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              <span>Roadmap</span>
            </button>
            <button
              onClick={() => { sound.playTap(); onSelectTab('drills'); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                currentTab === 'drills'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Subseksyon Drills
            </button>
            <button
              onClick={() => { sound.playTap(); onSelectTab('speed_rush'); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                currentTab === 'speed_rush'
                  ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ⚡ Speed Rush
            </button>
            <button
              onClick={() => { sound.playTap(); onSelectTab('question_bank'); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                currentTab === 'question_bank'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Aklatan
            </button>
            <button
              onClick={() => { sound.playTap(); onSelectTab('leaderboard'); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                currentTab === 'leaderboard'
                  ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              Leaderboard
            </button>
            <button
              onClick={() => { sound.playTap(); onSelectTab('mistakes'); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                currentTab === 'mistakes'
                  ? 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Maling Sagot
              {userProfile.incorrectQuestionIds.length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 text-[10px] rounded-full bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 font-bold">
                  {userProfile.incorrectQuestionIds.length}
                </span>
              )}
            </button>
          </nav>

          {/* Action Zone: Audio, Theme, User Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button onClick={() => onOpenPremium?.()} className="rounded-md bg-amber-500 px-3 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400">Premium ₱250</button>
            {/* Streak & XP display */}
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 text-xs">
              <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold" title="Arawang Streak">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {userProfile.currentStreak}d
              </span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
                {userProfile.totalXp} XP
              </span>
            </div>

            {/* Sound toggle */}
            <button
              onClick={onToggleSound}
              className="p-2 rounded-md text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={soundEnabled ? 'I-off ang Tunog' : 'I-on ang Tunog'}
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Dark/Light toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-md text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? 'Lumipat sa Light Mode' : 'Lumipat sa Dark Mode'}
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* User Profile Avatar / Trigger */}
            <button
              onClick={() => { sound.playTap(); onOpenProfile(); }}
              className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 transition-colors"
              title="I-edit ang Profile"
            >
              <span className="text-sm">{userProfile.avatar || '🎓'}</span>
              <span className="max-w-[80px] sm:max-w-[110px] truncate font-semibold">
                {userProfile.name}
              </span>
            </button>
          </div>

        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-2 border-t border-slate-100 dark:border-slate-800/80 no-scrollbar">
          <button
            onClick={() => { sound.playTap(); onSelectTab('home'); }}
            className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${currentTab === 'home' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-600 dark:text-slate-300'}`}
          >
            Overview
          </button>
          <button
            onClick={() => { sound.playTap(); onSelectTab('simulated_setup'); }}
            className={`px-2.5 py-1 text-xs font-bold rounded-md whitespace-nowrap ${currentTab.startsWith('simulated') ? 'bg-amber-500 text-slate-950' : 'text-slate-600 dark:text-slate-300'}`}
          >
            🏛️ Simulated Exam
          </button>
          <button
            onClick={() => { sound.playTap(); onSelectTab('roadmap'); }}
            className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${currentTab === 'roadmap' ? 'bg-amber-600 text-white font-bold' : 'text-slate-600 dark:text-slate-300'}`}
          >
            🧭 Roadmap
          </button>
          <button
            onClick={() => { sound.playTap(); onSelectTab('drills'); }}
            className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${currentTab === 'drills' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-600 dark:text-slate-300'}`}
          >
            Drills
          </button>
          <button
            onClick={() => { sound.playTap(); onSelectTab('speed_rush'); }}
            className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${currentTab === 'speed_rush' ? 'bg-amber-500 text-white' : 'text-amber-600 dark:text-amber-400 font-semibold'}`}
          >
            ⚡ Speed
          </button>
          <button
            onClick={() => { sound.playTap(); onSelectTab('question_bank'); }}
            className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${currentTab === 'question_bank' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-600 dark:text-slate-300'}`}
          >
            Aklatan
          </button>
          <button
            onClick={() => { sound.playTap(); onSelectTab('leaderboard'); }}
            className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${currentTab === 'leaderboard' ? 'bg-amber-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
          >
            Leaderboard
          </button>
          <button
            onClick={() => { sound.playTap(); onSelectTab('mistakes'); }}
            className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${currentTab === 'mistakes' ? 'bg-red-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
          >
            Maling Sagot ({userProfile.incorrectQuestionIds.length})
          </button>
        </div>
      </div>
    </header>
  );
};

