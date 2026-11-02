import React, { useState } from 'react';
import { 
  Award, Clock, Zap, BookOpen, Trophy, 
  BarChart3, AlertCircle, Sparkles, CheckCircle2, 
  ArrowRight, ShieldCheck, Flame, ChevronRight, HelpCircle
} from 'lucide-react';
import { UserProfile, ExamLevel, SubtestCategory } from '../types/quiz';
import { SUBSECTIONS_META } from '../data/questions';
import { sound } from '../utils/sound';

interface HomeViewProps {
  userProfile: UserProfile;
  onOpenSimulatedExam: () => void;
  onStartMockExam: (level: ExamLevel, count: number) => void;
  onStartDrill: (category: SubtestCategory, instantFeedback: boolean) => void;
  onStartSpeedRush: () => void;
  onOpenQuestionBank: () => void;
  onOpenLeaderboard: () => void;
  onOpenMistakes: () => void;
  onOpenProfile: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  userProfile,
  onOpenSimulatedExam,
  onStartMockExam,
  onStartDrill,
  onStartSpeedRush,
  onOpenQuestionBank,
  onOpenLeaderboard,
  onOpenMistakes,
  onOpenProfile
}) => {
  const [mockLevel, setMockLevel] = useState<ExamLevel>(userProfile.targetLevel);
  const [mockItemCount, setMockItemCount] = useState<number>(50);
  const [drillInstantFeedback, setDrillInstantFeedback] = useState<boolean>(true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-xl">
        {/* Subtle background image overlay */}
        <div className="absolute inset-0 opacity-20 mix-blend-luminosity">
          <img 
            src="/src/assets/images/cse_study_banner_1793651634842.jpg" 
            alt="Study Desk" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent" />

        <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-4">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            Philippine Civil Service Commission Reviewer
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Ipasa ang Civil Service Exam sa <span className="text-amber-400">Unang Subok</span>.
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            Maghanda gamit ang <strong>500 curated questions</strong> na may opisyal na countdown timer, awtomatikong pagsusuri ng iskor bawat subseksyon, step-by-step na paliwanag sa bawat sagot, at pambansang leaderboard upang mas lalong maging masigasig sa pag-aaral.
          </p>

          {/* Quick Stats Pill Strip */}
          <div className="flex flex-wrap items-center gap-6 pt-6 text-xs text-slate-300">
            <div>
              <span className="block text-xl font-black text-white tabular-nums">500</span>
              <span className="text-slate-400">Curated Qs</span>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div>
              <span className="block text-xl font-black text-amber-400 tabular-nums">80.00%</span>
              <span className="text-slate-400">Passing Cut-off</span>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div>
              <span className="block text-xl font-black text-white tabular-nums">5 Subtests</span>
              <span className="text-slate-400">Bawat Paksa</span>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div>
              <span className="block text-xl font-black text-emerald-400 tabular-nums">Live Rank</span>
              <span className="text-slate-400">Regional Board</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <button
              onClick={() => {
                sound.playTap();
                onOpenSimulatedExam();
              }}
              className="px-6 py-3 text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              Simulan ang Simulated Exam (170/165 Qs)
            </button>

            <button
              onClick={() => {
                sound.playTap();
                onStartSpeedRush();
              }}
              className="px-5 py-3 text-xs sm:text-sm font-bold bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all border border-slate-700 flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              ⚡ Speed Rush (25s)
            </button>
          </div>
        </div>
      </div>

      {/* Daily Practice Streak Showcase Banner */}
      <div className="rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-amber-500/10 via-red-500/10 to-amber-500/10 border-2 border-amber-500/30 dark:border-amber-500/20 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-red-500 text-white flex items-center justify-center shadow-md shrink-0">
            <Flame className="w-8 h-8 fill-white animate-pulse" />
            <span className="absolute -bottom-1 -right-1 text-xs font-black bg-slate-900 text-amber-400 border border-amber-400 px-1 rounded-full tabular-nums">
              {userProfile.currentStreak}d
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>{userProfile.currentStreak}-Day Practice Streak</span>
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-300 border border-red-200 dark:border-red-800">
                🔥 Aktibong Pagsasanay
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
              {userProfile.currentStreak >= 7
                ? 'Kahanga-hanga! 7+ araw ka nang tuloy-tuloy na nag-aaral. Ang ganitong disiplina ang susi upang maging Civil Service Topnotcher!'
                : userProfile.currentStreak >= 3
                ? 'Magaling! Tuloy-tuloy ang iyong momentum. Ang araw-araw na pagsasanay ay nagpapataas ng memory retention nang mahigit 85%.'
                : 'Magsanay araw-araw kahit 10-15 minuto upang panatilihing buhay ang iyong streak at masigurong handa sa araw ng CSE!'}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-[11px] text-slate-500 font-medium">
              <span>Record Streak: <strong className="text-amber-600 dark:text-amber-400">{userProfile.longestStreak || userProfile.currentStreak} araw</strong></span>
              <span>·</span>
              <span>Susunod na Milestone: <strong className="text-slate-700 dark:text-slate-200">{userProfile.currentStreak < 7 ? '7 Araw' : userProfile.currentStreak < 14 ? '14 Araw' : '30 Araw'} (+150 XP)</strong></span>
            </div>
          </div>
        </div>

        {/* 7-Day Visual Mini Calendar Track & Quick Practice CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
          <div className="flex items-center gap-1.5 bg-white/80 dark:bg-slate-900/80 p-2 rounded-xl border border-slate-200/80 dark:border-slate-800 text-center">
            {['Lun', 'Mar', 'Miy', 'Hwe', 'Biy', 'Sab', 'Lin'].map((day, idx) => {
              const currentDayIndex = (new Date().getDay() + 6) % 7;
              const isCurrentDay = idx === currentDayIndex;
              const isPastActive = idx < currentDayIndex;

              return (
                <div key={day} className="flex flex-col items-center w-7">
                  <span className="text-[9px] font-semibold text-slate-400 mb-1">{day}</span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCurrentDay
                      ? 'bg-gradient-to-tr from-amber-500 to-red-500 text-white shadow-xs scale-110'
                      : isPastActive
                      ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}>
                    {isCurrentDay ? (
                      <Flame className="w-3.5 h-3.5 fill-white text-white" />
                    ) : isPastActive ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => {
              sound.playTap();
              onStartSpeedRush();
            }}
            className="px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-600 text-white dark:text-slate-950 rounded-xl transition-all shadow-xs flex items-center gap-1.5 whitespace-nowrap"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 dark:text-slate-950" />
            <span>Magsanay Ngayon (+XP)</span>
          </button>
        </div>
      </div>

      {/* Aspirant Performance Card & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* User Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{userProfile.avatar}</span>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {userProfile.name}
                  </h3>
                  <span className="text-xs text-slate-500 block truncate max-w-[180px]">
                    {userProfile.region}
                  </span>
                </div>
              </div>
              <button
                onClick={onOpenProfile}
                className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
              >
                I-edit
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 my-4 text-center">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                <span className="text-[10px] text-slate-500 uppercase block">Pinakamataas</span>
                <span className="text-base font-extrabold text-slate-900 dark:text-white tabular-nums">
                  {userProfile.bestRating > 0 ? `${userProfile.bestRating}%` : '--'}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                <span className="text-[10px] text-slate-500 uppercase block">XP Naipon</span>
                <span className="text-base font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">
                  {userProfile.totalXp}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-gradient-to-tr from-amber-50 to-red-50 dark:from-amber-950/40 dark:to-red-950/40 border border-amber-300 dark:border-amber-800/60">
                <span className="text-[10px] text-amber-700 dark:text-amber-300 font-bold uppercase block">Daily Streak</span>
                <span className="text-base font-black text-red-600 dark:text-red-400 tabular-nums flex items-center justify-center gap-1">
                  <Flame className="w-4 h-4 fill-red-500 text-red-500 animate-pulse" />
                  {userProfile.currentStreak}d
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <span className="text-xs text-slate-500 block mb-1">
              Antas ng Exam: <strong className="text-slate-900 dark:text-white capitalize">{userProfile.targetLevel === 'professional' ? 'Professional' : 'Sub-Professional'}</strong>
            </span>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-amber-500 h-full rounded-full transition-all"
                style={{ width: `${Math.min((userProfile.examsCompleted / 10) * 100, 100)}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              {userProfile.examsCompleted} mock exams na natapos
            </span>
          </div>
        </div>

        {/* Mistakes Bank Quick Launch */}
        <div 
          onClick={onOpenMistakes}
          className="p-6 rounded-2xl bg-gradient-to-br from-red-50 to-white dark:from-red-950/30 dark:to-slate-900 border border-red-200 dark:border-red-900/40 shadow-xs cursor-pointer hover:shadow-md transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400">
                <AlertCircle className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/80 text-red-700 dark:text-red-200 tabular-nums">
                {userProfile.incorrectQuestionIds.length} Maling Tanong
              </span>
            </div>

            <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              Balikan ang mga Maling Sagot
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              Huwag hayaang maulit ang parehong pagkakamali. Awtomatikong itinatala ang bawat naipagkamali mong aytem na may step-by-step na solusyon at patakaran.
            </p>
          </div>

          <div className="pt-4 flex items-center text-xs font-bold text-red-600 dark:text-red-400 gap-1">
            <span>Buksan ang Mistake Reviewer</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Competitive Leaderboard Preview */}
        <div 
          onClick={onOpenLeaderboard}
          className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-white dark:from-amber-950/30 dark:to-slate-900 border border-amber-200 dark:border-amber-900/40 shadow-xs cursor-pointer hover:shadow-md transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/80 text-amber-800 dark:text-amber-200">
                Pambansang Ranggo
              </span>
            </div>

            <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              Leaderboard at Pagkumpetensya
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              Tingnan kung paano ka nakikipagsabayan sa mga examinees sa NCR, CALABARZON, Visayas, at Mindanao. Maging bahagi ng National Top 10!
            </p>
          </div>

          <div className="pt-4 flex items-center text-xs font-bold text-amber-600 dark:text-amber-400 gap-1">
            <span>Tingnan ang Leaderboard</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>

      {/* Mode 1: Mock Exam Configuration Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Opisyal na Career Service Simulated Exam
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Simulated Exam & Mock Test Room
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Sinusubukan ang iyong bilis at accuracy gamit ang opisyal na 170/165 CSC blueprint, Scantron OMR answer sheet, at automatic Report of Rating.
            </p>
          </div>

          {/* Quick config toggles */}
          <div className="flex flex-wrap items-center gap-4">
            
            {/* Level selection */}
            <div>
              <span className="text-[11px] text-slate-500 font-semibold block mb-1">Antas:</span>
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <button
                  onClick={() => { sound.playTap(); setMockLevel('professional'); }}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                    mockLevel === 'professional'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Professional
                </button>
                <button
                  onClick={() => { sound.playTap(); setMockLevel('sub_professional'); }}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                    mockLevel === 'sub_professional'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Sub-Prof
                </button>
              </div>
            </div>

            {/* Launch CTAs */}
            <div className="flex items-center gap-2 pt-4 sm:pt-0">
              <button
                onClick={() => {
                  sound.playTap();
                  onOpenSimulatedExam();
                }}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-slate-950 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" />
                Opisyal na Simulation (170/165 Qs)
              </button>
            </div>

          </div>
        </div>

        {/* Breakdown of Mock Test Sections */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-white block">Kakayahang Pamilang</span>
            <span className="text-slate-500 text-[11px]">25% CSC Weight · Word Problems, Sequences</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-white block">
              {mockLevel === 'professional' ? 'Kakayahang Mapanuri' : 'Kakayahang Klerikal'}
            </span>
            <span className="text-slate-500 text-[11px]">
              {mockLevel === 'professional' ? '25% CSC Weight · Syllogisms, Logic' : '25% CSC Weight · Filing, Alphabetizing'}
            </span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-white block">Kakayahang Berbal</span>
            <span className="text-slate-500 text-[11px]">30% CSC Weight · Grammar, Organization</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-white block">Pangkalahatang Kaalaman</span>
            <span className="text-slate-500 text-[11px]">20% CSC Weight · Konstitusyon, RA 6713</span>
          </div>
        </div>
      </div>

      {/* Mode 2: Subsection Targeted Drills */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-500" />
              Pagsasanay sa Bawat Subseksyon (Targeted Drills)
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Pumili ng partikular na paksa na nais mong palakasin na may detalyadong paliwanag agad pagkasagot
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={drillInstantFeedback}
                onChange={(e) => setDrillInstantFeedback(e.target.checked)}
                className="rounded-sm text-amber-600 focus:ring-amber-500"
              />
              <span>Ipakita agad ang paliwanag pagkasagot (Instant Feedback)</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(SUBSECTIONS_META).map(([key, meta]) => {
            return (
              <div
                key={key}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-amber-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-sm bg-amber-500/10 text-amber-700 dark:text-amber-300">
                      {meta.totalAvailable} Tanong
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      CSC Weight: {meta.cscWeightProf}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {meta.name}
                  </h3>
                  <span className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                    {meta.tagalogName}
                  </span>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {meta.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    20 Qs Drill
                  </span>
                  <button
                    onClick={() => {
                      sound.playTap();
                      onStartDrill(key as SubtestCategory, drillInstantFeedback);
                    }}
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-amber-400 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    Magsanay Dito
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mode 3: Aklatan & Question Bank Showcase */}
      <div className="p-6 rounded-2xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Aklatan ng 500 Questions at Solusyon
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Nais mo bang basahin ang lahat ng tanong, formulas, at legal citations nang walang timer?
            </p>
          </div>
        </div>

        <button
          onClick={() => { sound.playTap(); onOpenQuestionBank(); }}
          className="px-5 py-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 text-slate-900 dark:text-white transition-colors shrink-0 shadow-xs"
        >
          Buksan ang Aklatan (500 Items) →
        </button>
      </div>

    </div>
  );
};
