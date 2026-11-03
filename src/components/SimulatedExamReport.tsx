import React, { useState } from 'react';
import { 
  Award, ShieldCheck, Trophy, CheckCircle2, XCircle, 
  RotateCcw, Sparkles, AlertCircle, Bookmark, BookmarkCheck, 
  ChevronDown, ChevronUp, Printer, ArrowRight, Share2, BarChart3
} from 'lucide-react';
import { ExamResult, Question, UserProfile, SubtestCategory } from '../types/quiz';
import { SUBSECTIONS_META, OFFICIAL_CSC_BLUEPRINT } from '../data/questions';
import { sound } from '../utils/sound';
import { addLeaderboardScore, toggleQuestionBookmark } from '../utils/storage';
import { PremiumFeature } from './PremiumGate';

interface SimulatedExamReportProps {
  result: ExamResult;
  allQuestions: Question[];
  userProfile: UserProfile;
  onRetake: () => void;
  onPracticeMistakes: () => void;
  onGoToLeaderboard: () => void;
  onGoHome: () => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
}

export const SimulatedExamReport: React.FC<SimulatedExamReportProps> = ({
  result,
  allQuestions,
  userProfile,
  onRetake,
  onPracticeMistakes,
  onGoToLeaderboard,
  onGoHome,
  bookmarkedIds,
  onToggleBookmark
}) => {
  const [filterStatus, setFilterStatus] = useState<'incorrect' | 'all' | 'correct'>('incorrect');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [leaderboardRank, setLeaderboardRank] = useState<number | null>(null);
  const [hasPostedToLeaderboard, setHasPostedToLeaderboard] = useState(false);

  // Map questions for fast lookup
  const questionMap = React.useMemo(() => {
    const map = new Map<string, Question>();
    allQuestions.forEach(q => map.set(q.id, q));
    return map;
  }, [allQuestions]);

  const examQuestions = result.questionIds
    .map(id => questionMap.get(id))
    .filter((q): q is Question => q !== undefined);

  const incorrectQuestions = examQuestions.filter(
    q => result.userAnswers[q.id] !== q.correctAnswer
  );

  const correctQuestions = examQuestions.filter(
    q => result.userAnswers[q.id] === q.correctAnswer
  );

  // Filtered list
  const filteredQuestions = examQuestions.filter(q => {
    const isRight = result.userAnswers[q.id] === q.correctAnswer;
    if (filterStatus === 'incorrect' && isRight) return false;
    if (filterStatus === 'correct' && !isRight) return false;
    if (filterCategory !== 'all' && q.category !== filterCategory) return false;
    return true;
  });

  const handlePostToLeaderboard = () => {
    sound.playTap();
    const entry = addLeaderboardScore(
      userProfile.name,
      userProfile.region,
      userProfile.avatar,
      result.examLevel,
      result.totalCorrect,
      result.totalQuestions,
      result.timeSpentSeconds,
      'full_mock'
    );
    setHasPostedToLeaderboard(true);
    setLeaderboardRank(entry.rank || 1);
  };

  const minutesTaken = Math.floor(result.timeSpentSeconds / 60);
  const secondsTaken = result.timeSpentSeconds % 60;
  const hoursTaken = Math.floor(minutesTaken / 60);
  const remMinutes = minutesTaken % 60;

  const timeFormatted = hoursTaken > 0
    ? `${hoursTaken} oras at ${remMinutes} minuto`
    : `${minutesTaken} minuto at ${secondsTaken} segundo`;

  const examDate = new Date(result.timestamp).toLocaleDateString('fil-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Official CSC Certificate & Report of Rating Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-300 dark:border-slate-700 shadow-xl p-6 sm:p-10 relative overflow-hidden">
        
        {/* Subtle Watermark Seal */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none w-96 h-96">
          <img 
            src="/src/assets/images/cse_hero_emblem_1793651615971.jpg" 
            alt="Watermark" 
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Certificate Header */}
        <div className="text-center pb-6 border-b-2 border-slate-200 dark:border-slate-800 space-y-1">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500 mx-auto mb-2 shadow-sm bg-slate-900">
            <img 
              src="/src/assets/images/cse_hero_emblem_1793651615971.jpg" 
              alt="CSC Seal" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase block">
            Republika ng Pilipinas · Komisyon sa Serbisyo Sibil
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Report of Rating — Career Service Examination
          </h1>
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
            {result.examLevel === 'professional' ? 'Professional Level Examination' : 'Sub-Professional Level Examination'}
          </span>
        </div>

        {/* Examinee Details Box */}
        <div className="my-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Examinee:</span>
            <strong className="text-slate-900 dark:text-white text-sm">{userProfile.name}</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Rehiyon:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{userProfile.region}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Petsa ng Pagsusulit:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{examDate}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Oras na Nagamit:</span>
            <span className="font-mono font-semibold text-slate-800 dark:text-slate-200 tabular-nums">{timeFormatted}</span>
          </div>
        </div>

        {/* Grand Rating & Eligibility Banner */}
        <div className={`p-6 rounded-2xl border mb-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left ${
          result.passed
            ? 'bg-gradient-to-r from-emerald-50 via-white to-amber-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-amber-950/20 border-emerald-400 dark:border-emerald-700'
            : 'bg-gradient-to-r from-slate-100 via-white to-amber-50/20 dark:from-slate-800 dark:via-slate-900 dark:to-slate-900 border-slate-300 dark:border-slate-700'
        }`}>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 bg-slate-900 text-white dark:bg-white dark:text-slate-950">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Opisyal na Hatol (Official Verdict)
            </div>
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${
              result.passed ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-900 dark:text-white'
            }`}>
              {result.passed ? 'PASSED — CIVIL SERVICE ELIGIBLE' : 'FAILED — DID NOT MEET 80% REQUIREMENT'}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-lg">
              {result.passed
                ? 'Binabati ka ng Komisyon sa Serbisyo Sibil! Ang markang ito ay nagpapatunay ng iyong kahusayan at kakayahang maglingkod sa pamahalaan.'
                : 'Nakuha mo ang pangkalahatang marka na nasa ilalim ng 80.00% passing rate. Gamitin ang detalyadong pagsusuri sa ibaba upang ituon ang pag-aaral sa mga maling aytem.'}
            </p>
          </div>

          <div className="shrink-0 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-center min-w-[170px]">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Pangkalahatang Rating
            </span>
            <div className={`text-4xl font-black tabular-nums tracking-tight my-1 ${
              result.passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'
            }`}>
              {result.overallPercentage}%
            </div>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 tabular-nums block">
              {result.totalCorrect} sa {result.totalQuestions} Tamang Sagot
            </span>
            <div className={`mt-2 text-[10px] font-bold px-2 py-0.5 rounded-sm inline-block ${
              result.passed 
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
            }`}>
              CSC Passing Cut-off: 80.00%
            </div>
          </div>
        </div>

        {/* Detailed Official Score Breakdown Table */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-amber-500" />
            Ulat ng Iskor Bawat Subseksyon (Subtest Ratings Breakdown)
          </h3>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-4">Subseksyon / Paksa</th>
                  <th className="py-3 px-4 text-center">Kabuuang Aytem</th>
                  <th className="py-3 px-4 text-center">Tamang Sagot</th>
                  <th className="py-3 px-4 text-center">Rating (%)</th>
                  <th className="py-3 px-4 text-center">CSC Weight</th>
                  <th className="py-3 px-4 text-center">Katayuan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {Object.entries(result.subsectionScores).map(([cat, score]) => {
                  const meta = SUBSECTIONS_META[cat as SubtestCategory];
                  const isPassed = score.percentage >= 80.00;

                  return (
                    <tr key={cat} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 dark:text-white block">
                          {meta?.name || cat}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {meta?.tagalogName}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center tabular-nums font-semibold">{score.total}</td>
                      <td className="py-3 px-4 text-center tabular-nums font-bold text-slate-900 dark:text-white">{score.correct}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`font-extrabold tabular-nums ${
                          isPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'
                        }`}>
                          {score.percentage}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-slate-500 font-medium">
                        {result.examLevel === 'professional' ? meta?.cscWeightProf : meta?.cscWeightSubProf}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold ${
                          isPassed
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}>
                          {isPassed ? 'PASSED' : 'REPASS'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Certificate Action Strip */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {!hasPostedToLeaderboard ? (
              <button
                type="button"
                onClick={handlePostToLeaderboard}
                className="px-5 py-2.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-slate-950 rounded-xl shadow-sm transition-all flex items-center gap-2"
              >
                <Trophy className="w-4 h-4" />
                Itala ang Iskor sa Pambansang Leaderboard
              </button>
            ) : (
              <div className="px-3.5 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center gap-2 border border-emerald-300 dark:border-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Naitala! Kasalukuyang Ranggo: #{leaderboardRank}
              </div>
            )}

            <button
              type="button"
              onClick={onGoToLeaderboard}
              className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            >
              Tingnan ang Leaderboard →
            </button>
          </div>

          <div className="flex items-center gap-2">
            {incorrectQuestions.length > 0 && (
              <button
                type="button"
                onClick={onPracticeMistakes}
                className="px-4 py-2 text-xs font-bold text-red-700 dark:text-red-300 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 rounded-xl transition-colors border border-red-200 dark:border-red-900"
              >
                Magsanay sa {incorrectQuestions.length} Maling Sagot
              </button>
            )}

            <button
              type="button"
              onClick={onRetake}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Ulitin ang Simulasyon
            </button>
          </div>
        </div>

      </div>

      {/* In-Depth Subsection Review & Explanations */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Section Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Detalyadong Paliwanag at Pagsusuri ng mga Maling Sagot
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              I-click ang bawat tanong upang makita ang opisyal na dahilan kung bakit tama ang tamang sagot at kung bakit mali ang iyong piniling opsyon.
            </p>
          </div>

          {/* Status filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl shrink-0 overflow-x-auto">
            <button
              type="button"
              onClick={() => { sound.playTap(); setFilterStatus('incorrect'); }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                filterStatus === 'incorrect'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Maling Sagot ({incorrectQuestions.length})
            </button>
            <button
              type="button"
              onClick={() => { sound.playTap(); setFilterStatus('correct'); }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                filterStatus === 'correct'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tamang Sagot ({correctQuestions.length})
            </button>
            <button
              type="button"
              onClick={() => { sound.playTap(); setFilterStatus('all'); }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                filterStatus === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Lahat ({examQuestions.length})
            </button>
          </div>
        </div>

        {/* Subtest Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => { sound.playTap(); setFilterCategory('all'); }}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              filterCategory === 'all'
                ? 'bg-amber-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            Lahat ng Paksa
          </button>
          {Object.keys(result.subsectionScores).map(cat => {
            const meta = SUBSECTIONS_META[cat as SubtestCategory];
            return (
              <button
                key={cat}
                type="button"
                onClick={() => { sound.playTap(); setFilterCategory(cat); }}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  filterCategory === cat
                    ? 'bg-amber-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {meta?.name}
              </button>
            );
          })}
        </div>

        {/* Question Review Items List */}
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800">
              Walang mga aytem sa kategoryang ito.
            </div>
          ) : (
            filteredQuestions.map((q, idx) => {
              const userChoice = result.userAnswers[q.id];
              const isCorrect = userChoice === q.correctAnswer;
              const isExpanded = expandedId === q.id || filterStatus === 'incorrect';
              const isBookmarked = bookmarkedIds.includes(q.id);

              return (
                <div
                  key={q.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden transition-all bg-white dark:bg-slate-900"
                >
                  {/* Question Summary Bar */}
                  <div
                    onClick={() => {
                      sound.playTap();
                      setExpandedId(expandedId === q.id ? null : q.id);
                    }}
                    className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                        )}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                          <span className="font-bold text-slate-900 dark:text-white">
                            Item {idx + 1}
                          </span>
                          <span>·</span>
                          <span className="text-amber-700 dark:text-amber-400 font-semibold">
                            {SUBSECTIONS_META[q.category]?.name}
                          </span>
                          <span>·</span>
                          <span>{q.subtopic}</span>
                        </div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed line-clamp-2">
                          {q.question}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playTap();
                          onToggleBookmark(q.id);
                          toggleQuestionBookmark(q.id);
                        }}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isBookmarked 
                            ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40' 
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                        title="I-bookmark"
                      >
                        {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>

                      <span className="p-1 text-slate-400">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Detailed Breakdown & Rationale */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-4">
                      
                      {/* Options Grid with Examinee choice and correct answer */}
                      <div className="space-y-2 mt-2">
                        {q.options.map((opt, optIndex) => {
                          const letter = String.fromCharCode(65 + optIndex);
                          const isUserSelected = userChoice === optIndex;
                          const isKeyAnswer = optIndex === q.correctAnswer;

                          let style = 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300';
                          if (isKeyAnswer) {
                            style = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100 font-semibold';
                          } else if (isUserSelected && !isKeyAnswer) {
                            style = 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-800 text-red-950 dark:text-red-200 line-through';
                          }

                          return (
                            <div
                              key={optIndex}
                              className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-3 ${style}`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="font-bold text-slate-500 uppercase">{letter}.</span>
                                <span>{opt}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {isKeyAnswer && (
                                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Tamang Sagot
                                  </span>
                                )}
                                {isUserSelected && !isKeyAnswer && (
                                  <span className="text-[11px] font-bold text-red-600 dark:text-red-400 flex items-center gap-1">
                                    <XCircle className="w-3.5 h-3.5" /> Iyong Pinili
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Official Explanation Box */}
                      <PremiumFeature><div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 space-y-2.5">
                        <div className="flex items-center gap-2 font-bold text-xs text-amber-900 dark:text-amber-200">
                          <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                          <span>Opisyal na Paliwanag at Batayang Legal / Matematikal</span>
                        </div>

                        <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                          {q.explanation.correctRationale}
                        </p>

                        {/* Step by step */}
                        {q.explanation.stepByStep && q.explanation.stepByStep.length > 0 && (
                          <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1">
                            <span className="font-sans font-bold text-slate-900 dark:text-white block mb-1">
                              Hakbang-sa-Hakbang na Solusyon:
                            </span>
                            {q.explanation.stepByStep.map((s, si) => (
                              <div key={si} className="text-slate-700 dark:text-slate-300">{s}</div>
                            ))}
                          </div>
                        )}

                        {/* Rule / Article citation */}
                        {q.explanation.keyFormulaOrRule && (
                          <div className="text-[11px] font-medium text-amber-800 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-900/40 p-2.5 rounded-lg">
                            📌 <strong>Tuntunin / Batas:</strong> {q.explanation.keyFormulaOrRule}
                          </div>
                        )}

                        {/* Why other options are wrong */}
                        {q.explanation.whyOthersAreWrong && (
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 italic">
                            Bakit mali ang ibang pagpipilian: {q.explanation.whyOthersAreWrong}
                          </p>
                        )}
                      </div></PremiumFeature>

                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>

    </div>
  );
};
