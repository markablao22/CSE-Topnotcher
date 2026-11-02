import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, Flag, Bookmark, BookmarkCheck, CheckCircle2, 
  AlertTriangle, ChevronLeft, ChevronRight, Send, 
  RotateCcw, Sparkles, ShieldCheck, ListFilter, Bell, FileText
} from 'lucide-react';
import { Question, ExamLevel, ExamResult, SubsectionScore, SubtestCategory } from '../types/quiz';
import { SUBSECTIONS_META, OFFICIAL_CSC_BLUEPRINT } from '../data/questions';
import { sound } from '../utils/sound';
import { toggleQuestionBookmark, recordMistake, markAsMastered } from '../utils/storage';

interface SimulatedExamEngineProps {
  questions: Question[];
  examLevel: ExamLevel;
  timeLimitMinutes: number;
  examineeName: string;
  onFinishExam: (result: ExamResult) => void;
  onQuit: () => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
}

export const SimulatedExamEngine: React.FC<SimulatedExamEngineProps> = ({
  questions,
  examLevel,
  timeLimitMinutes,
  examineeName,
  onFinishExam,
  onQuit,
  bookmarkedIds,
  onToggleBookmark
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const userAnswersRef = useRef<Record<string, number>>({});
  const elapsedSecondsRef = useRef(0);
  const submittedRef = useRef(false);
  const [flaggedIndices, setFlaggedIndices] = useState<Set<number>>(new Set());
  const [showScantronDrawer, setShowScantronDrawer] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  // Timer state
  const totalSecondsAllocated = timeLimitMinutes * 60;
  const [secondsRemaining, setSecondsRemaining] = useState(totalSecondsAllocated);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Proctor alerts
  const [proctorNotice, setProctorNotice] = useState<string | null>(null);
  const warned30Min = useRef(false);
  const warned15Min = useRef(false);
  const warned5Min = useRef(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = questions[currentIndex] || questions[0];
  const isAnswered = currentQuestion && userAnswers[currentQuestion.id] !== undefined;
  const isFlagged = flaggedIndices.has(currentIndex);
  const isBookmarked = currentQuestion && bookmarkedIds.includes(currentQuestion.id);

  // Group questions by category for section navigation
  const sections = React.useMemo(() => {
    const list: { category: SubtestCategory; name: string; startIndex: number; count: number }[] = [];
    if (questions.length === 0) return list;

    let curCat: SubtestCategory = questions[0].category;
    let startIdx = 0;
    let count = 0;

    questions.forEach((q, idx) => {
      if (q.category !== curCat) {
        list.push({
          category: curCat,
          name: SUBSECTIONS_META[curCat]?.name || curCat,
          startIndex: startIdx,
          count
        });
        curCat = q.category;
        startIdx = idx;
        count = 1;
      } else {
        count += 1;
      }
    });

    list.push({
      category: curCat,
      name: SUBSECTIONS_META[curCat]?.name || curCat,
      startIndex: startIdx,
      count
    });

    return list;
  }, [questions]);

  // Active section based on current index
  const activeSection = sections.find(
    s => currentIndex >= s.startIndex && currentIndex < s.startIndex + s.count
  ) || sections[0];

  // Timer loop with official proctor announcements
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsedSeconds(prev => {
        const next = prev + 1;
        elapsedSecondsRef.current = next;
        return next;
      });

      setSecondsRemaining(prev => {
        // Proctor announcements at specific intervals
        if (prev === 1800 && !warned30Min.current) { // 30 minutes
          warned30Min.current = true;
          sound.playProctorAlert();
          setProctorNotice('📢 PROCTOR NOTICE: Mayroon na lamang 30 minuto bago matapos ang pagsusulit. Pakisuri ang mga unshaded bubbles.');
          setTimeout(() => setProctorNotice(null), 10000);
        } else if (prev === 900 && !warned15Min.current) { // 15 minutes
          warned15Min.current = true;
          sound.playProctorAlert();
          setProctorNotice('📢 PROCTOR NOTICE: 15 minuto na lamang ang nalalabi. Tiyaking nasagutan ang lahat ng aytem.');
          setTimeout(() => setProctorNotice(null), 10000);
        } else if (prev === 300 && !warned5Min.current) { // 5 minutes
          warned5Min.current = true;
          sound.playProctorAlert();
          setProctorNotice('⚠️ PROCTOR FINAL WARNING: 5 minuto na lamang! I-shade na ang mga blangkong numero.');
          setTimeout(() => setProctorNotice(null), 10000);
        }

        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleSelectOption = (optionIndex: number) => {
    if (!currentQuestion) return;
    sound.playTap();

    setUserAnswers(prev => {
      const next = { ...prev, [currentQuestion.id]: optionIndex };
      userAnswersRef.current = next;
      return next;
    });
  };

  const toggleFlag = () => {
    sound.playTap();
    setFlaggedIndices(prev => {
      const next = new Set(prev);
      if (next.has(currentIndex)) {
        next.delete(currentIndex);
      } else {
        next.add(currentIndex);
      }
      return next;
    });
  };

  const handleNext = () => {
    sound.playTap();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
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
    const finalElapsedSeconds = elapsedSecondsRef.current;

    // Compute automatic subsection scoring
    const subsectionScores: Record<string, SubsectionScore> = {};
    let totalCorrect = 0;

    questions.forEach(q => {
      const chosen = finalUserAnswers[q.id];
      const isRight = chosen === q.correctAnswer;
      if (isRight) {
        totalCorrect += 1;
        markAsMastered(q.id);
      } else {
        recordMistake(q.id);
      }

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

    Object.keys(subsectionScores).forEach(cat => {
      const item = subsectionScores[cat];
      item.percentage = item.total > 0 ? Number(((item.correct / item.total) * 100).toFixed(2)) : 0;
      item.passed = item.percentage >= 80.00;
    });

    const overallPct = Number(((totalCorrect / questions.length) * 100).toFixed(2));
    const passed = overallPct >= 80.00;

    const xpEarned = totalCorrect * 20 + (passed ? 500 : 100);

    const result: ExamResult = {
      id: `sim-exam-${Date.now()}`,
      mode: 'full_mock',
      examLevel,
      timestamp: Date.now(),
      totalQuestions: questions.length,
      totalCorrect,
      overallPercentage: overallPct,
      passed,
      timeSpentSeconds: finalElapsedSeconds,
      subsectionScores,
      userAnswers,
      questionIds: questions.map(q => q.id),
      xpEarned
    };

    if (passed) {
      sound.playPassFanfare();
    }

    onFinishExam(result);
  };

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const shadedCount = Object.keys(userAnswers).length;
  const unshadedCount = questions.length - shadedCount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-4">
      
      {/* Official Examination Room Header & Proctor Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Examinee & Exam Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-500/50 bg-slate-800 shrink-0">
              <img 
                src="/src/assets/images/cse_hero_emblem_1793651615971.jpg" 
                alt="Emblem" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">
                  Career Service Examination — {examLevel === 'professional' ? 'Professional' : 'Sub-Professional'}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-xs bg-amber-500 text-slate-950 uppercase">
                  Simulated Exam
                </span>
              </div>
              <span className="text-xs text-slate-400">
                Examinee: <strong className="text-slate-200">{examineeName}</strong> · Room 204
              </span>
            </div>
          </div>

          {/* Clock & Action Strip */}
          <div className="flex items-center gap-3">
            
            {/* Countdown timer */}
            <div className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono text-base font-bold tabular-nums border shadow-inner ${
              secondsRemaining <= 900
                ? 'bg-red-950/80 text-red-300 border-red-700 animate-pulse'
                : 'bg-slate-800/90 text-amber-400 border-slate-700'
            }`}>
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>

            {/* OMR Scantron Sheet Toggle */}
            <button
              type="button"
              onClick={() => { sound.playTap(); setShowScantronDrawer(!showScantronDrawer); }}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <ListFilter className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">OMR Answer Sheet</span>
              <span>({shadedCount}/{questions.length})</span>
            </button>

            {/* Exit CTA */}
            <button
              type="button"
              onClick={() => {
                if (confirm('Nais mo bang lumabas sa Simulated Examination? Mawawalan ng bisa ang pagsusulit na ito.')) {
                  onQuit();
                }
              }}
              className="p-2 text-slate-400 hover:text-red-400 transition-colors"
              title="Lumabas sa Exam"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Proctor Live Announcement Alert */}
        {proctorNotice && (
          <div className="mt-3 py-2 px-4 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs flex items-center gap-2 animate-bounce">
            <Bell className="w-4 h-4 shrink-0 text-amber-400" />
            <span>{proctorNotice}</span>
          </div>
        )}

        {/* Section Navigation Strip */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-slate-400 text-[11px] font-semibold shrink-0 uppercase tracking-wider mr-1">
            Mga Bahagi:
          </span>
          {sections.map((sec, sIdx) => {
            const isSecActive = activeSection?.category === sec.category;
            // Count answered in this section
            const secQuestions = questions.slice(sec.startIndex, sec.startIndex + sec.count);
            const answeredInSec = secQuestions.filter(q => userAnswers[q.id] !== undefined).length;

            return (
              <button
                key={sec.category}
                type="button"
                onClick={() => {
                  sound.playTap();
                  setCurrentIndex(sec.startIndex);
                }}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all flex items-center gap-1.5 ${
                  isSecActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>{sec.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSecActive ? 'bg-slate-950/20 text-slate-900' : 'bg-slate-700 text-slate-300'
                }`}>
                  {answeredInSec}/{sec.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Question Presentation Column */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative">
          
          {/* Question Metadata Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-amber-700 dark:text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-sm">
                Tanong #{currentIndex + 1} sa {questions.length}
              </span>
              <span className="text-slate-400">·</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {SUBSECTIONS_META[currentQuestion.category]?.name}
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500">{currentQuestion.subtopic}</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Flag for Review */}
              <button
                type="button"
                onClick={toggleFlag}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  isFlagged
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title="Markahan para balikan bago mag-submit"
              >
                <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500 text-amber-500' : ''}`} />
                <span>{isFlagged ? 'Minarkahan' : 'Markahan'}</span>
              </button>

              {/* Bookmark */}
              <button
                type="button"
                onClick={() => {
                  sound.playTap();
                  onToggleBookmark(currentQuestion.id);
                  toggleQuestionBookmark(currentQuestion.id);
                }}
                className={`p-1.5 rounded-lg transition-colors ${
                  isBookmarked
                    ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title="I-bookmark para sa Review"
              >
                {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div className="py-6 sm:py-8">
            <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed whitespace-pre-line text-balance">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Multiple Choice Options (Shadable) */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, optIdx) => {
              const letter = String.fromCharCode(65 + optIdx);
              const isSelected = userAnswers[currentQuestion.id] === optIdx;

              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-4 ${
                    isSelected
                      ? 'border-slate-900 bg-slate-900 text-white dark:border-amber-400 dark:bg-amber-500 dark:text-slate-950 shadow-sm scale-[1.005]'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-slate-100/80 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-full text-xs flex items-center justify-center font-bold shrink-0 mt-0.5 border ${
                    isSelected
                      ? 'bg-white text-slate-900 dark:bg-slate-950 dark:text-amber-400 border-white'
                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600'
                  }`}>
                    {letter}
                  </span>
                  <span className="text-sm font-medium leading-relaxed pt-0.5">
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`px-4 py-2.5 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors ${
                currentIndex === 0
                  ? 'opacity-30 cursor-not-allowed text-slate-400'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Nakaraang Aytem</span>
            </button>

            <div className="flex items-center gap-3">
              {currentIndex < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2.5 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-600 text-white dark:text-slate-950 flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <span>Susunod</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => { sound.playTap(); setShowConfirmModal(true); }}
                  className="px-6 py-2.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 shadow-sm transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Tapusin at Isumite ang Exam</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Scantron OMR Answer Sheet Simulator */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 space-y-4">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-500" />
                OMR Scantron Answer Sheet
              </h3>
              <span className="text-[11px] text-slate-500">I-click ang bilog upang i-shade ang sagot</span>
            </div>

            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
              {shadedCount}/{questions.length} Shaded
            </span>
          </div>

          {/* Quick status counters */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300">
              <span className="block text-[10px] text-slate-500">Nasagutan</span>
              <strong className="text-sm tabular-nums">{shadedCount}</strong>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
              <span className="block text-[10px] text-slate-500">Blangko</span>
              <strong className="text-sm tabular-nums">{unshadedCount}</strong>
            </div>
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300">
              <span className="block text-[10px] text-slate-500">May Marka</span>
              <strong className="text-sm tabular-nums">{flaggedIndices.size}</strong>
            </div>
          </div>

          {/* Scrollable Scantron Bubble Grid */}
          <div className="max-h-[500px] overflow-y-auto pr-1 space-y-2 divide-y divide-slate-100 dark:divide-slate-800">
            {questions.map((q, idx) => {
              const selectedOpt = userAnswers[q.id];
              const isCurrent = idx === currentIndex;
              const isItemFlagged = flaggedIndices.has(idx);

              return (
                <div 
                  key={q.id}
                  onClick={() => {
                    sound.playTap();
                    setCurrentIndex(idx);
                  }}
                  className={`pt-2 flex items-center justify-between gap-2 p-1.5 rounded-lg cursor-pointer transition-colors ${
                    isCurrent
                      ? 'bg-amber-500/10 dark:bg-amber-950/30 font-bold'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-1.5 w-14 shrink-0">
                    <span className="text-xs font-mono tabular-nums text-slate-500">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}.
                    </span>
                    {isItemFlagged && (
                      <Flag className="w-3 h-3 fill-amber-500 text-amber-500 shrink-0" />
                    )}
                  </div>

                  {/* Shading Ovals (A, B, C, D) */}
                  <div className="flex items-center gap-1.5">
                    {['A', 'B', 'C', 'D'].map((letter, optIndex) => {
                      const isShaded = selectedOpt === optIndex;

                      return (
                        <button
                          key={letter}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playTap();
                            setCurrentIndex(idx);
                            handleSelectOption(optIndex);
                          }}
                          className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center transition-all border ${
                            isShaded
                              ? 'bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950 border-slate-900 dark:border-amber-400 scale-110 shadow-xs'
                              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700 hover:border-slate-500'
                          }`}
                          title={`Shade ${letter}`}
                        >
                          {letter}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => { sound.playTap(); setShowConfirmModal(true); }}
              className="w-full py-2.5 px-3 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-slate-950 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Isumite ang Exam ({shadedCount}/{questions.length} Shaded)
            </button>
          </div>

        </div>

      </div>

      {/* Proctor Submission Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Kumpirmasyon ng Pagpasa
                </h3>
                <span className="text-xs text-slate-500">Career Service Examination Official Submit</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Sigurado ka bang nais mo nang ipasa ang iyong opisyal na sagutang papel? Awtomatikong kukuwentahin ang iyong rating at bubuuin ang Report of Rating.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Kabuuang Aytem:</span>
                <span className="font-bold text-slate-900 dark:text-white">{questions.length} Tanong</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Na-shade na Sagot:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{shadedCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Naiwang Blangko:</span>
                <span className={`font-bold ${unshadedCount > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900'}`}>
                  {unshadedCount} {unshadedCount > 0 && '(Paalala: Walang penalty sa maling sagot)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Natitirang Oras:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{formatTime(secondsRemaining)}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => { sound.playTap(); setShowConfirmModal(false); }}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                Magpatuloy sa Pagsusulit
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playTap();
                  setShowConfirmModal(false);
                  handleFinalSubmit();
                }}
                className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-colors"
              >
                Oo, Isumite ang Exam
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
