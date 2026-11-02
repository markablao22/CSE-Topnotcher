import React, { useState } from 'react';
import { X, User, MapPin, Award, Check, Clock } from 'lucide-react';
import { UserProfile, ExamLevel } from '../types/quiz';
import { PHILIPPINE_REGIONS } from '../data/leaderboardData';
import { sound } from '../utils/sound';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (updated: UserProfile) => void;
}

const AVATAR_OPTIONS = ['🎓', '👨‍💼', '👩‍💼', '👨‍🎓', '👩‍🎓', '⚖️', '📚', '🏛️', '🇵🇭', '⭐'];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave
}) => {
  const [name, setName] = useState(profile.name);
  const [region, setRegion] = useState(profile.region);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [targetLevel, setTargetLevel] = useState<ExamLevel>(profile.targetLevel);
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState<number>(profile.dailyGoalMinutes || 30);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playTap();
    onSave({
      ...profile,
      name: name.trim() || 'Aspirant',
      region,
      avatar,
      targetLevel,
      dailyGoalMinutes: Math.max(10, dailyGoalMinutes)
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Profile ng Aspirant
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              I-customize ang iyong pangalan at rehiyon para sa leaderboard
            </p>
          </div>
          <button
            onClick={() => { sound.playTap(); onClose(); }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Daily Streak Banner in Profile */}
        <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-red-500/10 to-amber-500/15 border border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-red-500 flex items-center justify-center shrink-0">
              <span className="text-xl">🔥</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Arawang Pagsasanay (Daily Streak)
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-xs bg-red-500 text-white uppercase tracking-wider">
                  Active
                </span>
              </div>
              <span className="text-[11px] text-slate-600 dark:text-slate-400">
                Record Streak: <strong className="text-amber-600 dark:text-amber-400 font-bold">{profile.longestStreak || profile.currentStreak} araw</strong>
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xl font-black text-red-600 dark:text-red-400 tabular-nums flex items-center justify-end gap-1">
              <span>{profile.currentStreak}</span>
              <span className="text-xs font-bold">Araw</span>
            </div>
            <span className="text-[10px] text-slate-500 block">Current Streak</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          
          {/* Avatar Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Pumili ng Avatar
            </label>
            <div className="grid grid-cols-5 gap-2">
              {AVATAR_OPTIONS.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => { sound.playTap(); setAvatar(opt); }}
                  className={`h-11 rounded-lg text-xl flex items-center justify-center transition-all ${
                    avatar === opt
                      ? 'bg-amber-100 dark:bg-amber-950/60 border-2 border-amber-500 scale-105'
                      : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Buong Pangalan / Alyas
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={35}
                required
                placeholder="Hal. Juan Dela Cruz"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Philippine Region */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Rehiyon (Para sa Regional Leaderboard)
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none"
              >
                {PHILIPPINE_REGIONS.map(reg => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Target Exam Level */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Antas ng Pagsusulit na Kukunin
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => { sound.playTap(); setTargetLevel('professional'); }}
                className={`p-3 text-left rounded-lg border transition-all ${
                  targetLevel === 'professional'
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 ring-1 ring-amber-500'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="font-bold text-xs">Professional</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  May Analytical Ability (170 items standard)
                </div>
              </button>

              <button
                type="button"
                onClick={() => { sound.playTap(); setTargetLevel('sub_professional'); }}
                className={`p-3 text-left rounded-lg border transition-all ${
                  targetLevel === 'sub_professional'
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 ring-1 ring-amber-500'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="font-bold text-xs">Sub-Professional</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  May Clerical Ability (165 items standard)
                </div>
              </button>
            </div>
          </div>

          {/* Daily Study Goal (in minutes) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Arawang Target sa Pag-aaral (Daily Goal)
              </label>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                {dailyGoalMinutes} minuto bawat araw
              </span>
            </div>
            
            {/* Quick Presets */}
            <div className="grid grid-cols-4 gap-2 mb-2">
              {[15, 30, 45, 60].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => { sound.playTap(); setDailyGoalMinutes(mins); }}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                    dailyGoalMinutes === mins
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs scale-[1.02]'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {mins} min
                </button>
              ))}
            </div>

            {/* Slider with visual numeric display */}
            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="range"
                min={10}
                max={120}
                step={5}
                value={dailyGoalMinutes}
                onChange={(e) => setDailyGoalMinutes(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <span className="text-xs font-extrabold text-slate-900 dark:text-white tabular-nums shrink-0 w-12 text-right">
                {dailyGoalMinutes}m
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Inirerekomenda ang 30–45 minuto bawat araw para sa tuloy-tuloy na pag-unawa at 80%+ passing rate.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => { sound.playTap(); onClose(); }}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            >
              Kanselahin
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-slate-950 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              I-save ang Profile
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
