import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, Bookmark, BookmarkCheck, Flag, CheckCircle2, 
  XCircle, ChevronLeft, ChevronRight, AlertTriangle, 
  HelpCircle, Zap, Send, RotateCcw, ListFilter, Sparkles
} from 'lucide-react';
import { Question, ExamLevel, ExamResult, SubsectionScore, SubtestCategory } from '../types/quiz';
import { SUBSECTIONS_META } from '../data/questions';
import { sound } from '../utils/sound';
import { recordMistake, markAsMastered, toggleQuestionBookmark } from '../utils/storage';

interface ExamEngineProps {
  questions: Question[];
  mode: 'full_mock' | 'subsection_drill' | 'speed_challenge';
  examLevel: ExamLevel;
  totalTimeMinutes?: number; // for mock / drill total timer
  speedSecondsPerQuestion?: number; // for speed challenge (e.g. 25s)
  instantFeedback?: boolean; // reveal explanation immediately after answer
  drillCategoryName?: string;
  onFinishExam: (result: ExamResult) => void;
  onQuit: () => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
}

export const ExamEngine: React.FC<ExamEngineProps> = ({
  questions,
  mode,
  examLevel,
  totalTimeMinutes = 60,
  speedSecondsPerQuestion = 25,
  instantFeedback = false,
  drillCategoryName,
  onFinishExam,
  onQuit,
  bookmarkedIds,
  onToggleBookmark
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const userAnswersRef = useRef<Record<string, number>>({});
  const elapsedTotalSecondsRef = useRef(0);
  const submittedRef = useRef(false);
  const [flaggedIndices, setFlaggedIndices] = useState<Set<number>>(new Set());
  const [showNavGrid, setShowNavGrid] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  // Timer states
  const totalSecondsAllocated = totalTimeMinutes * 60;
  const [secondsRemaining, setSecondsRemaining] = useState<number>(
    mode === 'speed_challenge' ? speedSecondsPerQuestion : totalSecondsAllocated
  );
  const [elapsedTotalSeconds, setElapsedTotalSeconds] = useState(0);

  // Speed Challenge Combos
  const [comboStreak, setComboStreak] = useState(0);
  const [speedScore, setSpeedScore] = useState(0);

  // Instant Feedback reveals
  const [revealedExplanations, setRevealedExplanations] = useState<Record<string, boolean>>({});

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = questions[currentIndex] || questions[0];
  const isAnswered = currentQuestion && userAnswers[currentQuestion.id] !== undefined;
  const isFlagged = flaggedIndices.has(currentIndex);
  const isBookmarked = currentQuestion && bookmarkedIds.includes(currentQuestion.id);

  // Overall Timer effect
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsedTotalSeconds(prev => {
        const next = prev + 1;
        elapsedTotalSecondsRef.current = next;
        return next;
      });

      setSecondsRemaining(prev => {
        if (mode === 'speed_challenge') {
          // Play tick when 5 seconds or less
          if (prev <= 5 && prev > 1) {
            sound.playTick();
          }
          if (prev <= 1) {
            // Speed challenge timeout for this question -> auto move next or submit
            handleSpeedTimeout();
            return speedSecondsPerQuestion;
          }
          return prev - 1;
        } else {
          // Mock / Drill countdown
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleFinalSubmit();
            return 0;
          }
          return prev - 1;
        }
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, mode, speedSecondsPerQuestion]);

  // Handle timeout in Speed Challenge
  const handleSpeedTimeout = () => {
    sound.playIncorrect();
    setComboStreak(0);
    // Mark as unanswered / missed
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSecondsRemaining(speedSecondsPerQuestion);
    } else {
      handleFinalSubmit();
    }
  };

  const handleSelectOption = (optionIndex: number) => {
    if (!currentQuestion) return;

    // In instant mode, if already revealed, prevent re-answering
    if (instantFeedback && revealedExplanations[currentQuestion.id]) {
      return;
    }

    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    sound.playTap();

    setUserAnswers(prev => {
      const next = { ...prev, [currentQuestion.id]: optionIndex };
      userAnswersRef.current = next;
      return next;
    });

    if (isCorrect) {
      markAsMastered(currentQuestion.id);
    } else {
      recordMistake(currentQuestion.id);
    }

    if (mode === 'speed_challenge') {
      if (isCorrect) {
        const newStreak = comboStreak + 1;
        setComboStreak(newStreak);
        sound.playCorrect();
        if (newStreak >= 2) sound.playCombo(newStreak);
        // Bonus points for streak
        setSpeedScore(prev => prev + 100 * Math.min(newStreak, 4));
      } else {
        setComboStreak(0);
        sound.playIncorrect();
      }

      // Auto advance in speed challenge after 300ms
      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setSecondsRemaining(speedSecondsPerQuestion);
        } else {
          handleFinalSubmit();
        }
      }, 350);

    } else if (instantFeedback) {
      // Reveal explanation immediately
      setRevealedExplanations(prev => ({
        ...prev,
        [currentQuestion.id]: true
      }));

      if (isCorrect) {
        sound.playCorrect();
      } else {
        sound.playIncorrect();
      }
    }
  };

  const toggleFlag = () => {
    sound.playTap();
    setFlaggedIndices(prev => {
      const updated = new Set(prev);
      if (updated.has(currentIndex)) {
        updated.delete(currentIndex);
      } else {
        updated.add(currentIndex);
      }
      return updated;
    });
  };

  const handleNext = () => {
    sound.playTap();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      if (mode === 'speed_challenge') {
        setSecondsRemaining(speedSecondsPerQuestion);
      }
    }
  };

  const handlePrevious = () => {
    sound.playTap();
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleFinalSubmit = () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);
    const finalUserAnswers = userAnswersRef.current;
    const finalElapsedTotalSeconds = elapsedTotalSecondsRef.current;

    // Compute automatic scoring per subsection
    const subsectionScores: Record<string, SubsectionScore> = {};
    let totalCorrect = 0;

    questions.forEach(q => {
      const chosen = finalUserAnswers[q.id];
      const isRight = chosen === q.correctAnswer;
      if (isRight) totalCorrect += 1;

      if (!subsectionScores[q.category]) {
        const meta = SUBSECTIONS_META[q.category as SubtestCategory];
        subsectionScores[q.category] = {
          category: q.category,
          categoryName: meta ? meta.name : q.category,
          total: 0,
          correct: 0,
          percentage: 0,
          passed: false
        };
      }

      subsectionScores[q.category].total += 1;
      if (isRight) {
        subsectionScores[q.category].correct += 1;
      }
    });

    // Calculate percentages per subsection
    Object.keys(subsectionScores).forEach(cat => {
      const item = subsectionScores[cat];
      item.percentage = item.total > 0 ? Number(((item.correct / item.total) * 100).toFixed(2)) : 0;
      item.passed = item.percentage >= 80.00; // CSC passing standard
    });

    const overallPct = Number(((totalCorrect / questions.length) * 100).toFixed(2));
    const passed = overallPct >= 80.00;

    // Calculate XP earned (e.g. 10 XP per correct + 200 XP bonus for passing)
    const xpEarned = totalCorrect * 15 + (passed ? 250 : 50) + (mode === 'speed_challenge' ? Math.floor(speedScore / 10) : 0);

    const result: ExamResult = {
      id: `exam-${Date.now()}`,
      mode,
      examLevel,
      timestamp: Date.now(),
      totalQuestions: questions.length,
      totalCorrect,
      overallPercentage: overallPct,
      passed,
      timeSpentSeconds: finalElapsedTotalSeconds,
      subsectionScores,
      userAnswers: finalUserAnswers,
      questionIds: questions.map(q => q.id),
      xpEarned
    };

    if (passed) {
      sound.playPassFanfare();
    }

    onFinishExam(result);
  };

  // Format timer
  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    if (hours > 0) {
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      
      {/* Top Test Controller Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Mode & Category Breadcrumb */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-slate-900 dark:text-white">
              {mode === 'full_mock' && `Opisyal na Mock Exam (${examLevel === 'professional' ? 'Professional' : 'Sub-Professional'})`}
              {mode === 'subsection_drill' && `Drill: ${drillCategoryName || 'Pagsasanay sa Paksa'}`}
              {mode === 'speed_challenge' && '⚡ Civil Service Speed Rush'}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Tanong {currentIndex + 1} ng {questions.length}
            </span>
          </div>

          {/* Timer Cluster */}
          <div className="flex items-center gap-3">
            {mode === 'speed_challenge' && comboStreak > 1 && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs animate-pulse">
                <Zap className="w-3.5 h-3.5 fill-amber-500" />
                {comboStreak}x STREAK (+{comboStreak * 100} pts)
              </div>
            )}

            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono font-bold text-sm tabular-nums border ${
              secondsRemaining <= 60 
                ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-300 dark:border-red-800 animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
            }`}>
              <Clock className="w-4 h-4 text-slate-500" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>

            {/* Question Sheet Trigger */}
            <button
              onClick={() => { sound.playTap(); setShowNavGrid(!showNavGrid); }}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5"
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Answer Sheet</span>
              <span>({answeredCount}/{questions.length})</span>
            </button>

            {/* Quit Button */}
            <button
              onClick={() => {
                if (confirm('Nais mo bang huminto? Mawawala ang kasalukuyang progreso ng pagsusulit.')) {
                  onQuit();
                }
              }}
              className="p-1.5 text-xs text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              title="Lumabas sa Exam"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Linear Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
          <div 
            className="bg-amber-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Expandable Navigation Grid Sheet */}
      {showNavGrid && (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-md mb-6 transition-all">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3 text-xs">
            <span className="font-bold text-slate-900 dark:text-white">
              Talaan ng mga Tanong ({questions.length} Items)
            </span>
            <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-xs bg-emerald-500 inline-block" /> Nasagutan ({answeredCount})
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-xs bg-amber-500 inline-block" /> Minarkahan ({flaggedIndices.size})
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-xs bg-slate-200 dark:bg-slate-700 inline-block" /> Di-nasagutan ({unansweredCount})
              </span>
            </div>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-15 gap-2 max-h-56 overflow-y-auto pr-1">
            {questions.map((q, idx) => {
              const answered = userAnswers[q.id] !== undefined;
              const flagged = flaggedIndices.has(idx);
              const isCurrent = idx === currentIndex;

              let btnClass = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
              if (answered) {
                btnClass = 'bg-emerald-600 text-white border-emerald-600';
              }
              if (flagged) {
                btnClass = 'bg-amber-500 text-white border-amber-500 font-bold';
              }
              if (isCurrent) {
                btnClass += ' ring-2 ring-slate-900 dark:ring-white scale-105';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    sound.playTap();
                    setCurrentIndex(idx);
                    setShowNavGrid(false);
                  }}
                  className={`h-8 rounded-md text-xs font-semibold border flex items-center justify-center transition-all ${btnClass}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative">
        
        {/* Question Header & Badges */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
            <span className="font-bold text-amber-700 dark:text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-sm">
              {SUBSECTIONS_META[currentQuestion.category]?.name || currentQuestion.category}
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              {currentQuestion.subtopic}
            </span>
            <span aria-hidden="true">·</span>
            <span className="capitalize text-slate-600 dark:text-slate-400">
              {currentQuestion.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Bookmark button */}
            <button
              onClick={() => {
                sound.playTap();
                onToggleBookmark(currentQuestion.id);
                toggleQuestionBookmark(currentQuestion.id);
              }}
              className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                isBookmarked
                  ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
              title={isBookmarked ? 'Alisin sa Bookmarks' : 'I-bookmark ang Tanong'}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>

            {/* Flag for review button */}
            <button
              onClick={toggleFlag}
              className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                isFlagged
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
              title={isFlagged ? 'Alisin ang Marka' : 'Markahan para Balikan'}
            >
              <Flag className={`w-4 h-4 ${isFlagged ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span className="hidden sm:inline">{isFlagged ? 'Minarkahan' : 'Markahan'}</span>
            </button>
          </div>
        </div>

        {/* Question Text */}
        <div className="py-6">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed whitespace-pre-line text-balance">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Options Selection */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, optIdx) => {
            const isSelected = userAnswers[currentQuestion.id] === optIdx;
            const isRevealed = instantFeedback && revealedExplanations[currentQuestion.id];
            const isCorrectAnswer = optIdx === currentQuestion.correctAnswer;

            let optionStyle = 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/80 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200';
            let letterBadge = 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600';

            if (isSelected) {
              optionStyle = 'border-amber-500 bg-amber-50/70 dark:bg-amber-950/40 text-amber-950 dark:text-amber-100 ring-2 ring-amber-500/50';
              letterBadge = 'bg-amber-500 text-white border-amber-500 font-bold';
            }

            // In instant feedback mode, color correct green and wrong red
            if (isRevealed) {
              if (isCorrectAnswer) {
                optionStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500';
                letterBadge = 'bg-emerald-600 text-white border-emerald-600 font-bold';
              } else if (isSelected && !isCorrectAnswer) {
                optionStyle = 'border-red-500 bg-red-50 dark:bg-red-950/50 text-red-950 dark:text-red-100 ring-2 ring-red-500';
                letterBadge = 'bg-red-600 text-white border-red-600 font-bold';
              }
            }

            const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

            return (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 focus:outline-none ${optionStyle}`}
              >
                <span className={`w-7 h-7 rounded-lg text-xs flex items-center justify-center font-bold border shrink-0 mt-0.5 ${letterBadge}`}>
                  {letter}
                </span>
                <span className="text-sm font-medium leading-relaxed pt-0.5">
                  {option}
                </span>

                {isRevealed && isCorrectAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 ml-auto" />
                )}
                {isRevealed && isSelected && !isCorrectAnswer && (
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 ml-auto" />
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed Explanation Box (If Instant Feedback mode is active and answered) */}
        {instantFeedback && revealedExplanations[currentQuestion.id] && (
          <div className="mt-6 p-5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/30">
            <div className="flex items-center gap-2 mb-2 font-bold text-sm text-amber-900 dark:text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Detalyadong Paliwanag at Batayan</span>
            </div>

            <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed mb-3">
              {currentQuestion.explanation.correctRationale}
            </p>

            {/* Step by Step Breakdown */}
            {currentQuestion.explanation.stepByStep && currentQuestion.explanation.stepByStep.length > 0 && (
              <div className="mb-3 space-y-1 bg-white/70 dark:bg-slate-900/70 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">
                  Hakbang-sa-Hakbang na Solusyon:
                </span>
                {currentQuestion.explanation.stepByStep.map((step, idx) => (
                  <div key={idx} className="font-mono text-slate-700 dark:text-slate-300">
                    {step}
                  </div>
                ))}
              </div>
            )}

            {/* Key Rule / Formula */}
            {currentQuestion.explanation.keyFormulaOrRule && (
              <div className="text-xs text-amber-800 dark:text-amber-300 bg-amber-100/60 dark:bg-amber-900/40 px-3 py-2 rounded-md font-medium">
                📌 <strong>Tuntunin / Batas:</strong> {currentQuestion.explanation.keyFormulaOrRule}
              </div>
            )}

            {/* Why others are wrong */}
            {currentQuestion.explanation.whyOthersAreWrong && (
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 italic">
                Bakit mali ang iba: {currentQuestion.explanation.whyOthersAreWrong}
              </p>
            )}
          </div>
        )}

        {/* Bottom Navigation Buttons */}
        <div className="flex items-center justify-between gap-4 mt-8 pt-5 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Nakaraan</span>
          </button>

          <div className="flex items-center gap-2">
            {currentIndex < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-5 py-2 text-xs font-bold rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-600 text-white dark:text-slate-950 flex items-center gap-1.5 transition-colors"
              >
                <span>Susunod</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => { sound.playTap(); setShowConfirmModal(true); }}
                className="px-6 py-2.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Ipasa ang Pagsusulit</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Sigurado ka bang nais mo nang ipasa?
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              Kasalukuyang may <strong>{unansweredCount}</strong> tanong na hindi mo pa nasasagutan sa kabuuang {questions.length} items.
            </p>

            <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Nasagutan:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{answeredCount} items</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Minarkahan para balikan:</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">{flaggedIndices.size} items</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Natitirang Oras:</span>
                <span className="font-bold font-mono">{formatTime(secondsRemaining)}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => { sound.playTap(); setShowConfirmModal(false); }}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
              >
                Balikan ang Exam
              </button>
              <button
                onClick={() => {
                  sound.playTap();
                  setShowConfirmModal(false);
                  handleFinalSubmit();
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
              >
                Oo, Isumite at Tingnan ang Iskor
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
