import React, { useState } from 'react';
import { 
  Trophy, Medal, MapPin, Search, Filter, 
  Flame, Award, ArrowUpRight, Zap, Clock 
} from 'lucide-react';
import { LeaderboardEntry, UserProfile, ExamLevel } from '../types/quiz';
import { PHILIPPINE_REGIONS } from '../data/leaderboardData';
import { sound } from '../utils/sound';

interface LeaderboardViewProps {
  entries: LeaderboardEntry[];
  userProfile: UserProfile;
  onStartExam: () => void;
  onStartSpeedRush: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  entries,
  userProfile,
  onStartExam,
  onStartSpeedRush
}) => {
  const [levelFilter, setLevelFilter] = useState<'all' | 'professional' | 'sub_professional'>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter entries
  const filtered = entries.filter(e => {
    if (levelFilter !== 'all' && e.examLevel !== levelFilter) return false;
    if (regionFilter !== 'all' && !e.region.includes(regionFilter)) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = e.userName.toLowerCase().includes(q);
      const matchRegion = e.region.toLowerCase().includes(q);
      if (!matchName && !matchRegion) return false;
    }
    return true;
  });

  const top3 = filtered.slice(0, 3);
  const remainingList = filtered.slice(3);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
          <Trophy className="w-3.5 h-3.5 text-amber-500" />
          Pambansang Talaan ng mga Topnotcher
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Makipagkumpetensya sa Kapwa Aspirants
        </h1>

        <p className="text-sm text-slate-600 dark:text-slate-400">
          Tingnan ang pinakamataas na marka sa buong bansa. Ipasa ang mock exam na may 80%+ rating upang makasama sa Honor Roll!
        </p>
      </div>

      {/* Podium for Top 3 */}
      {top3.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 items-end max-w-3xl mx-auto">
          
          {/* 2nd Place */}
          <div className="order-2 md:order-1 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col items-center text-center relative md:translate-y-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs mb-2">
              🥈 2nd
            </div>
            <div className="text-3xl mb-1">{top3[1].avatar}</div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate max-w-full">
              {top3[1].userName}
            </h3>
            <span className="text-[11px] text-slate-500 truncate max-w-full">
              {top3[1].region}
            </span>
            <div className="mt-3 py-1 px-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-extrabold text-sm tabular-nums">
              {top3[1].ratingPercentage}%
            </div>
            <span className="text-[10px] text-slate-400 mt-1">
              {top3[1].correctCount}/{top3[1].totalCount} sa {top3[1].timeFormatted}
            </span>
          </div>

          {/* 1st Place (Center and elevated) */}
          <div className="order-1 md:order-2 p-6 rounded-2xl bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/40 dark:to-slate-900 border-2 border-amber-500 shadow-md flex flex-col items-center text-center relative z-10 scale-105">
            <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm mb-2 shadow-xs">
              👑 1st
            </div>
            <div className="text-4xl mb-1">{top3[0].avatar}</div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white truncate max-w-full">
              {top3[0].userName}
            </h3>
            <span className="text-xs text-amber-700 dark:text-amber-300 font-medium truncate max-w-full">
              {top3[0].region}
            </span>
            <div className="mt-3 py-1 px-4 rounded-full bg-amber-500 text-white font-black text-base tabular-nums shadow-xs">
              {top3[0].ratingPercentage}%
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              {top3[0].correctCount}/{top3[0].totalCount} sa {top3[0].timeFormatted}
            </span>
            <div className="mt-2 text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
              {top3[0].statusBadge}
            </div>
          </div>

          {/* 3rd Place */}
          <div className="order-3 md:order-3 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col items-center text-center relative md:translate-y-4">
            <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold text-xs mb-2">
              🥉 3rd
            </div>
            <div className="text-3xl mb-1">{top3[2].avatar}</div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate max-w-full">
              {top3[2].userName}
            </h3>
            <span className="text-[11px] text-slate-500 truncate max-w-full">
              {top3[2].region}
            </span>
            <div className="mt-3 py-1 px-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-extrabold text-sm tabular-nums">
              {top3[2].ratingPercentage}%
            </div>
            <span className="text-[10px] text-slate-400 mt-1">
              {top3[2].correctCount}/{top3[2].totalCount} sa {top3[2].timeFormatted}
            </span>
          </div>

        </div>
      )}

      {/* Control & Filter Strip */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Level Filter Buttons */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => { sound.playTap(); setLevelFilter('all'); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                levelFilter === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Lahat ng Antas
            </button>
            <button
              onClick={() => { sound.playTap(); setLevelFilter('professional'); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                levelFilter === 'professional'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Professional
            </button>
            <button
              onClick={() => { sound.playTap(); setLevelFilter('sub_professional'); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                levelFilter === 'sub_professional'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Sub-Professional
            </button>
          </div>

          {/* Region Dropdown & Search */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="all">Lahat ng Rehiyon</option>
                {PHILIPPINE_REGIONS.map(reg => (
                  <option key={reg} value={reg}>{reg}</option>
                ))}
              </select>
            </div>

            <div className="relative flex-1 sm:w-44">
              <input
                type="text"
                placeholder="Hanapin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Main Leaderboard Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500">
                <th className="py-3 px-4 font-semibold w-16">Ranggo</th>
                <th className="py-3 px-4 font-semibold">Aspirant / Pangalan</th>
                <th className="py-3 px-4 font-semibold hidden sm:table-cell">Rehiyon</th>
                <th className="py-3 px-4 font-semibold hidden md:table-cell">Antas</th>
                <th className="py-3 px-4 font-semibold text-right">Rating %</th>
                <th className="py-3 px-4 font-semibold text-right hidden sm:table-cell">Oras</th>
                <th className="py-3 px-4 font-semibold text-center">Katayuan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {filtered.map((entry, idx) => {
                const rankNum = idx + 1;
                const isUser = entry.isCurrentUser;

                return (
                  <tr 
                    key={entry.id}
                    className={`transition-colors ${
                      isUser
                        ? 'bg-amber-50/80 dark:bg-amber-950/40 font-semibold'
                        : 'hover:bg-slate-50/60 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-3.5 px-4 tabular-nums font-bold">
                      {rankNum === 1 && <span className="text-amber-500">🥇 #1</span>}
                      {rankNum === 2 && <span className="text-slate-400">🥈 #2</span>}
                      {rankNum === 3 && <span className="text-amber-700">🥉 #3</span>}
                      {rankNum > 3 && <span className="text-slate-500">#{rankNum}</span>}
                    </td>

                    {/* Name & Avatar */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-base shrink-0">{entry.avatar}</span>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <span>{entry.userName}</span>
                            {isUser && (
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-xs bg-amber-500 text-white uppercase">
                                Ikaw
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500 sm:hidden block">
                            {entry.region}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Region */}
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 hidden sm:table-cell">
                      {entry.region}
                    </td>

                    {/* Exam Level */}
                    <td className="py-3.5 px-4 capitalize text-slate-500 hidden md:table-cell">
                      {entry.examLevel === 'professional' ? 'Prof' : 'Sub-Prof'}
                    </td>

                    {/* Rating Percentage */}
                    <td className="py-3.5 px-4 text-right">
                      <span className={`font-extrabold text-sm tabular-nums ${
                        entry.ratingPercentage >= 90
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : entry.ratingPercentage >= 80
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}>
                        {entry.ratingPercentage}%
                      </span>
                      <span className="block text-[10px] text-slate-400 tabular-nums">
                        {entry.correctCount}/{entry.totalCount}
                      </span>
                    </td>

                    {/* Time Taken */}
                    <td className="py-3.5 px-4 text-right text-slate-500 font-mono text-[11px] tabular-nums hidden sm:table-cell">
                      {entry.timeFormatted}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-sm text-[10px] font-bold ${
                        entry.ratingPercentage >= 95
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          : entry.ratingPercentage >= 90
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : entry.ratingPercentage >= 80
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {entry.statusBadge}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Strip: Take Exam to Boost Rank */}
      <div className="mt-8 p-6 rounded-2xl bg-slate-900 text-white dark:bg-slate-800/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-base text-white">
            Nais mo bang mapabilang sa National Topnotchers?
          </h3>
          <p className="text-xs text-slate-300">
            Kumuha ng Opisyal na Mock Exam o subukan ang 25-segundong Speed Rush upang magtala ng bagong record.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => { sound.playTap(); onStartSpeedRush(); }}
            className="px-4 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Zap className="w-4 h-4" />
            Speed Rush Challenge
          </button>

          <button
            onClick={() => { sound.playTap(); onStartExam(); }}
            className="px-4 py-2 text-xs font-bold bg-white hover:bg-slate-100 text-slate-900 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Award className="w-4 h-4" />
            Kumuha ng Mock Exam
          </button>
        </div>
      </div>

    </div>
  );
};
