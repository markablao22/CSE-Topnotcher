import React, { useState } from 'react';
import { 
  Trophy, CheckCircle2, XCircle, RotateCcw, 
  Share2, ArrowRight, BarChart3, ChevronDown, 
  ChevronUp, Bookmark, BookmarkCheck, Sparkles, AlertCircle, Award
} from 'lucide-react';
import { ExamResult, Question, UserProfile, SubtestCategory } from '../types/quiz';
import { SUBSECTIONS_META } from '../data/questions';
import { sound } from '../utils/sound';
import { addLeaderboardScore, toggleQuestionBookmark } from '../utils/storage';
import { PremiumFeature } from './PremiumGate';

interface ResultsViewProps {
  result: ExamResult;
  allQuestions: Question[];
  userProfile: UserProfile;
  onRetake: () => void;
  onGoToLeaderboard: () => void;
  onPracticeMistakes: () => void;
  onGoHome: () => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  result,
  allQuestions,
  userProfile,
  onRetake,
  onGoToLeaderboard,
  onPracticeMistakes,
  onGoHome,
  bookmarkedIds,
  onToggleBookmark
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'incorrect' | 'correct'>('incorrect');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
  const [hasSubmittedToLeaderboard, setHasSubmittedToLeaderboard] = useState(false);
  const [leaderboardRankAchieved, setLeaderboardRankAchieved] = useState<number | null>(null);

  // Map question details
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

  // Identify strongest and weakest subsection
  const subEntries = Object.values(result.subsectionScores);
  const sortedSubsections = [...subEntries].sort((a, b) => b.percentage - a.percentage);
  const strongest = sortedSubsections[0];
  const weakest = sortedSubsections[sortedSubsections.length - 1];

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
      result.mode
    );
    setHasSubmittedToLeaderboard(true);
    setLeaderboardRankAchieved(entry.rank || 1);
  };

  const minutesTaken = Math.floor(result.timeSpentSeconds / 60);
  const secondsTaken = result.timeSpentSeconds % 60;

  const filteredQuestions = 
    filterMode === 'incorrect' 
      ? incorrectQuestions 
      : filterMode === 'correct' 
      ? correctQuestions 
      : examQuestions;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Official Scorecard Banner */}
      <div className={`rounded-2xl p-6 sm:p-8 border shadow-sm mb-8 text-center sm:text-left transition-all ${
        result.passed
          ? 'bg-gradient-to-br from-emerald-50 via-white to-amber-50/30 dark:from-emerald-950/40 dark:via-slate-900 dark:to-amber-950/20 border-emerald-300 dark:border-emerald-800'
          : 'bg-gradient-to-br from-slate-50 via-white to-amber-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-800'
      }`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-slate-900 text-white dark:bg-white dark:text-slate-950">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Opisyal na Pagsusuri ng Iskor
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {result.passed ? '🎉 PASSED — CIVIL SERVICE ELIGIBLE!' : 'Kailangan Pa ng Pagsasanay'}
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              {result.passed
                ? `Maligayang pagbati! Nakamit mo ang ${result.overallPercentage}% na rating, na lumagpas sa 80.00% official passing cut-off ng Civil Service Commission.`
                : `Nakuha mo ang ${result.overallPercentage}% na rating. Ang passing mark ng CSC ay 80.00%. Balikan ang mga maling sagot upang mapataas ang iyong marka sa susunod na subok.`}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>Oras ng Pagkuha: <strong className="text-slate-900 dark:text-white tabular-nums">{minutesTaken}m {secondsTaken}s</strong></span>
              <span>·</span>
              <span>XP na Napanalunan: <strong className="text-amber-600 dark:text-amber-400 font-bold tabular-nums">+{result.xpEarned} XP</strong></span>
            </div>
          </div>

          {/* Large Circular Rating Cluster */}
          <div className="shrink-0 flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 shadow-xs min-w-[180px]">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Kabuuang Rating
            </span>
            <div className={`text-4xl font-extrabold tabular-nums tracking-tight ${
              result.passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'
            }`}>
              {result.overallPercentage}%
            </div>
            <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1 tabular-nums">
              {result.totalCorrect} / {result.totalQuestions} Tamang Sagot
            </div>
            <div className={`mt-2 px-2.5 py-0.5 rounded-sm text-[11px] font-bold ${
              result.passed
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
            }`}>
              Target: 80.00%
            </div>
          </div>

        </div>

        {/* Action CTAs: Leaderboard Submission */}
        <div className="mt-6 pt-5 border-t border-slate-200/60 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {!hasSubmittedToLeaderboard ? (
              <button
                onClick={handlePostToLeaderboard}
                className="px-5 py-2.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-slate-950 rounded-lg shadow-sm transition-all flex items-center gap-2"
              >
                <Trophy className="w-4 h-4" />
                Ipasok ang Iskor sa Leaderboard
              </button>
            ) : (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/50 px-3.5 py-2 rounded-lg border border-emerald-300 dark:border-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Naitala sa Leaderboard! (Kasalukuyang Ranggo: #{leaderboardRankAchieved})
              </div>
            )}

            <button
              onClick={onGoToLeaderboard}
              className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            >
              Tingnan ang Ranggo →
            </button>
          </div>

          <div className="flex items-center gap-2">
            {incorrectQuestions.length > 0 && (
              <button
                onClick={onPracticeMistakes}
                className="px-4 py-2 text-xs font-bold text-red-700 dark:text-red-300 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-950/70 rounded-lg transition-colors border border-red-200 dark:border-red-900/40"
              >
                Magsanay sa {incorrectQuestions.length} Maling Sagot
              </button>
            )}

            <button
              onClick={onRetake}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Ulitin ang Test
            </button>
          </div>
        </div>
      </div>

      {/* Automatic Scoring Per Subsection Breakdown */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-500" />
              Automatic Scoring Breakdown Bawat Subseksyon
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Pagsusuri batay sa opisyal na mga bahagi ng Philippine Civil Service Examination
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(result.subsectionScores).map(([category, score]) => {
            const meta = SUBSECTIONS_META[category as SubtestCategory];
            const isSubPassed = score.percentage >= 80.00;

            return (
              <div 
                key={category}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {meta?.name || category}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${
                      isSubPassed 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                    }`}>
                      {isSubPassed ? 'PASSED' : 'REPASS'}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-1 mb-3">
                    {meta?.tagalogName}
                  </p>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className={`text-2xl font-extrabold tabular-nums ${
                      isSubPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'
                    }`}>
                      {score.percentage}%
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                      ({score.correct} / {score.total})
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        isSubPassed ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${score.percentage}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
                  <span>CSC Weight: {result.examLevel === 'professional' ? meta?.cscWeightProf : meta?.cscWeightSubProf}</span>
                  <span className="font-semibold">{score.total - score.correct} Mali</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Diagnostic Insight Card */}
        <div className="mt-4 p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">
                Pagsusuring Pang-Aspirant:
              </span>
              <span className="text-slate-600 dark:text-slate-300">
                Pinakamalakas: <strong>{strongest?.categoryName} ({strongest?.percentage}%)</strong> · 
                Kailangang Tutukan: <strong className="text-red-600 dark:text-red-400">{weakest?.categoryName} ({weakest?.percentage}%)</strong>
              </span>
            </div>
          </div>
          <button
            onClick={onPracticeMistakes}
            className="text-amber-600 dark:text-amber-400 hover:underline font-bold shrink-0 whitespace-nowrap"
          >
            Magsanay sa Mahinang Paksa →
          </button>
        </div>
      </div>

      {/* Question by Question Review Section with Explanations */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Balikan ang mga Tanong at Detalyadong Paliwanag
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Suriin ang bawat tanong upang maunawaan kung bakit tama o mali ang iyong sagot
            </p>
          </div>

          {/* Filter Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0">
            <button
              onClick={() => { sound.playTap(); setFilterMode('incorrect'); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                filterMode === 'incorrect'
                  ? 'bg-white dark:bg-slate-900 text-red-600 dark:text-red-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Maling Sagot ({incorrectQuestions.length})
            </button>
            <button
              onClick={() => { sound.playTap(); setFilterMode('correct'); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                filterMode === 'correct'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tamang Sagot ({correctQuestions.length})
            </button>
            <button
              onClick={() => { sound.playTap(); setFilterMode('all'); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                filterMode === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Lahat ({examQuestions.length})
            </button>
          </div>
        </div>

        {/* Questions List */}
        {filteredQuestions.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 text-xs">
            Walang mga tanong sa kategoryang ito.
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const userChoice = result.userAnswers[q.id];
            const isCorrect = userChoice === q.correctAnswer;
            const isExpanded = expandedQuestionId === q.id || filterMode === 'incorrect';
            const isBookmarked = bookmarkedIds.includes(q.id);

            return (
              <div 
                key={q.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden transition-all"
              >
                {/* Header row */}
                <div 
                  onClick={() => {
                    sound.playTap();
                    setExpandedQuestionId(expandedQuestionId === q.id ? null : q.id);
                  }}
                  className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
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
                        <span className="font-semibold text-slate-900 dark:text-white">
                          Item {idx + 1}
                        </span>
                        <span>·</span>
                        <span>{SUBSECTIONS_META[q.category]?.name}</span>
                        <span>·</span>
                        <span>{q.subtopic}</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2">
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
                      className={`p-1.5 rounded-md ${
                        isBookmarked 
                          ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40' 
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title={isBookmarked ? 'Alisin sa Bookmarks' : 'I-bookmark'}
                    >
                      {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>

                    <span className="p-1 text-slate-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </div>
                </div>

                {/* Expanded Details & Explanations */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-4">
                    
                    {/* Choices List */}
                    <div className="space-y-2 mt-2">
                      {q.options.map((opt, optIndex) => {
                        const letter = String.fromCharCode(65 + optIndex);
                        const isUserSelected = userChoice === optIndex;
                        const isActualCorrect = optIndex === q.correctAnswer;

                        let optClass = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300';
                        if (isActualCorrect) {
                          optClass = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100 font-semibold';
                        } else if (isUserSelected && !isActualCorrect) {
                          optClass = 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-800 text-red-950 dark:text-red-200 line-through';
                        }

                        return (
                          <div 
                            key={optIndex}
                            className={`p-3 rounded-lg border text-xs flex items-center justify-between gap-3 ${optClass}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="font-bold text-slate-500 uppercase">{letter}.</span>
                              <span>{opt}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              {isActualCorrect && (
                                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Tamang Sagot
                                </span>
                              )}
                              {isUserSelected && !isActualCorrect && (
                                <span className="text-[11px] font-bold text-red-600 dark:text-red-400 flex items-center gap-1">
                                  <XCircle className="w-3.5 h-3.5" /> Iyong Pinili
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Rich Explanation Box */}
                    <PremiumFeature><div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60">
                      <div className="flex items-center gap-2 font-bold text-xs text-amber-900 dark:text-amber-200 mb-2">
                        <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <span>Detalyadong Paliwanag at Batayan</span>
                      </div>

                      <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed mb-2.5">
                        {q.explanation.correctRationale}
                      </p>

                      {/* Step by step */}
                      {q.explanation.stepByStep && q.explanation.stepByStep.length > 0 && (
                        <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1 mb-2.5">
                          <span className="font-sans font-bold text-slate-800 dark:text-slate-200 block mb-1">
                            Hakbang-sa-Hakbang:
                          </span>
                          {q.explanation.stepByStep.map((step, sIdx) => (
                            <div key={sIdx} className="text-slate-700 dark:text-slate-300">
                              {step}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Rule or formula */}
                      {q.explanation.keyFormulaOrRule && (
                        <div className="text-[11px] font-medium text-amber-800 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-900/40 p-2 rounded-md">
                          📌 <strong>Tuntunin:</strong> {q.explanation.keyFormulaOrRule}
                        </div>
                      )}

                      {/* Why others are wrong */}
                      {q.explanation.whyOthersAreWrong && (
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 italic">
                          Bakit mali ang iba: {q.explanation.whyOthersAreWrong}
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
  );
};
