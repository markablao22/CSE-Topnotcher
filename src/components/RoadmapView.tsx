import React, { useMemo } from 'react';
import { 
  Compass, ArrowRight, CheckCircle2, AlertTriangle, 
  Sparkles, Award, BarChart3, BookOpen, Clock, 
  RotateCcw, Target, ShieldCheck, Zap, ChevronRight
} from 'lucide-react';
import { UserProfile, ExamLevel, SubtestCategory, ExamResult, Question } from '../types/quiz';
import { SUBSECTIONS_META } from '../data/questions';
import { sound } from '../utils/sound';

interface RoadmapViewProps {
  userProfile: UserProfile;
  examHistory: ExamResult[];
  allQuestions: Question[];
  onStartDrill: (category: SubtestCategory, instantFeedback: boolean) => void;
  onStartSimulatedExam: () => void;
  onPracticeMistakes: () => void;
}

interface SubsectionDiagnostic {
  category: SubtestCategory;
  name: string;
  tagalogName: string;
  weight: string;
  totalAvailable: number;
  attemptedCount: number;
  correctCount: number;
  accuracyPercentage: number;
  masteredCount: number;
  status: 'mastered' | 'progressing' | 'needs_focus';
  statusLabel: string;
  keySubtopics: { name: string; completed: boolean }[];
  mistakeCount: number;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  userProfile,
  examHistory,
  allQuestions,
  onStartDrill,
  onStartSimulatedExam,
  onPracticeMistakes
}) => {
  const isProf = userProfile.targetLevel === 'professional';

  // Compute diagnostics per subsection
  const diagnostics = useMemo<Record<SubtestCategory, SubsectionDiagnostic>>(() => {
    const categories: SubtestCategory[] = isProf
      ? ['verbal', 'numerical', 'analytical', 'general_info']
      : ['verbal', 'numerical', 'clerical', 'general_info'];

    const result: Partial<Record<SubtestCategory, SubsectionDiagnostic>> = {};

    categories.forEach(cat => {
      const meta = SUBSECTIONS_META[cat];
      const catQuestions = allQuestions.filter(q => q.category === cat);
      const totalAvailable = catQuestions.length;

      // Filter mistakes in this category
      const mistakeCount = userProfile.incorrectQuestionIds.filter(id => {
        const q = allQuestions.find(item => item.id === id);
        return q?.category === cat;
      }).length;

      // Filter mastered in this category
      const masteredCount = (userProfile.masteredQuestionIds || []).filter(id => {
        const q = allQuestions.find(item => item.id === id);
        return q?.category === cat;
      }).length;

      // Aggregate history stats
      let attemptedCount = 0;
      let correctCount = 0;

      examHistory.forEach(exam => {
        const sub = exam.subsectionScores[cat];
        if (sub) {
          attemptedCount += sub.total;
          correctCount += sub.correct;
        }
      });

      const accuracyPercentage = attemptedCount > 0
        ? Number(((correctCount / attemptedCount) * 100).toFixed(1))
        : 0;

      let status: 'mastered' | 'progressing' | 'needs_focus' = 'needs_focus';
      let statusLabel = 'Kailangan ng Pagsasanay';

      if (attemptedCount >= 10) {
        if (accuracyPercentage >= 80) {
          status = 'mastered';
          statusLabel = '● CSC Ready (≥80%)';
        } else if (accuracyPercentage >= 60) {
          status = 'progressing';
          statusLabel = '▲ Umuusad (60%-79%)';
        } else {
          status = 'needs_focus';
          statusLabel = '■ Kritikal (<60%)';
        }
      } else if (attemptedCount > 0) {
        status = 'progressing';
        statusLabel = 'Bago Pa Lamang';
      }

      // Subtopics checklist
      const subtopicsMap: Record<SubtestCategory, string[]> = {
        verbal: ['Grammar & Correct Usage', 'Vocabulary & Synonyms', 'Paragraph Organization', 'Reading Comprehension'],
        numerical: ['Word Problems (Age, Work, Rate)', 'Number Sequences', 'Fractions & Percentages', 'Data Interpretation'],
        analytical: ['Syllogism & Deductive Logic', 'Word Association & Analogy', 'Critical Assumptions', 'Data Sufficiency'],
        general_info: ['1987 Philippine Constitution', 'RA 6713 Code of Conduct', 'Human Rights Concepts', 'Environmental Management'],
        clerical: ['Alphabetical Indexing Rules', 'Filing Systems & Records', 'Clerical Reasoning', 'Proofreading & Spelling']
      };

      const keySubtopics = (subtopicsMap[cat] || []).map(topic => ({
        name: topic,
        completed: attemptedCount >= 15 && accuracyPercentage >= 70
      }));

      result[cat] = {
        category: cat,
        name: meta.name,
        tagalogName: meta.tagalogName,
        weight: isProf ? meta.cscWeightProf : meta.cscWeightSubProf,
        totalAvailable,
        attemptedCount,
        correctCount,
        accuracyPercentage,
        masteredCount,
        status,
        statusLabel,
        keySubtopics,
        mistakeCount
      };
    });

    return result as Record<SubtestCategory, SubsectionDiagnostic>;
  }, [allQuestions, examHistory, userProfile, isProf]);

  // Identify weakest subsection to suggest next
  const diagList = Object.values(diagnostics);
  const weakestSubsection = useMemo(() => {
    if (diagList.length === 0) return null;

    // Prioritize subsection with lowest accuracy among attempted, or unattempted
    const sorted = [...diagList].sort((a, b) => {
      // If one has mistakes and the other doesn't, prioritize one with more mistakes
      if (b.mistakeCount !== a.mistakeCount) {
        return b.mistakeCount - a.mistakeCount;
      }
      if (a.attemptedCount === 0 && b.attemptedCount > 0) return -1;
      if (b.attemptedCount === 0 && a.attemptedCount > 0) return 1;
      return a.accuracyPercentage - b.accuracyPercentage;
    });

    return sorted[0];
  }, [diagList]);

  // Calculate Overall CSC Readiness Index
  const overallReadinessIndex = useMemo(() => {
    if (examHistory.length === 0) return 35; // baseline readiness
    const sumAccuracy = diagList.reduce((acc, curr) => {
      const weightNum = parseInt(curr.weight, 10) || 25;
      const score = curr.attemptedCount > 0 ? curr.accuracyPercentage : 40;
      return acc + (score * (weightNum / 100));
    }, 0);
    return Math.min(Math.round(sumAccuracy), 100);
  }, [diagList, examHistory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
            <Compass className="w-3.5 h-3.5 text-amber-500" />
            CSC Coverage Roadmap & Diagnostic Guide
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Gabay sa Pag-unlad ng Bawat Subseksyon
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Awtomatikong sinusubaybayan ang iyong kahusayan sa bawat opisyal na bahagi ng Civil Service Exam upang matukoy ang mga paksang nangangailangan ng higit na pansin.
          </p>
        </div>

        {/* CSC Readiness Meter */}
        <div className="shrink-0 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center min-w-[200px]">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            CSC Readiness Index
          </span>
          <div className={`text-4xl font-black tabular-nums tracking-tight my-1 ${
            overallReadinessIndex >= 80 
              ? 'text-emerald-600 dark:text-emerald-400' 
              : overallReadinessIndex >= 60 
              ? 'text-amber-600 dark:text-amber-400' 
              : 'text-slate-800 dark:text-slate-200'
          }`}>
            {overallReadinessIndex}%
          </div>
          <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block">
            {overallReadinessIndex >= 80 ? 'Handang-handa Pumasa!' : 'Nangangailangan ng Pagsasanay'}
          </span>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                overallReadinessIndex >= 80 ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
              style={{ width: `${overallReadinessIndex}%` }}
            />
          </div>
        </div>
      </div>

      {/* Smart Prescription & Recommendation Hero Box */}
      {weakestSubsection && (
        <div className="rounded-2xl p-6 bg-gradient-to-r from-red-500/10 via-amber-500/10 to-red-500/10 border-2 border-amber-500/30 dark:border-amber-500/20 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-red-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <Target className="w-7 h-7" />
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
                  ⚠️ Inirerekomendang Sanayin Ngayon
                </span>
                <span className="text-xs text-slate-500 font-semibold">
                  (Batay sa Iyong Pinakamababang Iskor)
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1">
                {weakestSubsection.name} — {weakestSubsection.tagalogName}
              </h2>

              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-xl leading-relaxed">
                {weakestSubsection.attemptedCount > 0
                  ? `Ang iyong kasalukuyang accuracy rating ay ${weakestSubsection.accuracyPercentage}%, na nasa ilalim ng 80.00% benchmark ng CSC. Mayroon kang ${weakestSubsection.mistakeCount} naipagkamaling tanong sa paksang ito.`
                  : `Hindi mo pa lubos na nasusubukan ang subseksyong ito (${weakestSubsection.weight} ng kabuuang CSC exam). Simulan ang pagsasanay upang maiwasan ang sorpresang aytem sa aktuwal na pagsusulit.`}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3 text-[11px] text-slate-600 dark:text-slate-400">
                <span>CSC Weight: <strong className="text-amber-600 dark:text-amber-400 font-bold">{weakestSubsection.weight}</strong></span>
                <span>·</span>
                <span>Kasalukuyang Marka: <strong className="text-slate-900 dark:text-white font-bold">{weakestSubsection.accuracyPercentage}%</strong></span>
                <span>·</span>
                <span>Maling Sagot: <strong className="text-red-600 dark:text-red-400 font-bold">{weakestSubsection.mistakeCount} items</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            {weakestSubsection.mistakeCount > 0 && (
              <button
                onClick={() => {
                  sound.playTap();
                  onPracticeMistakes();
                }}
                className="px-4 py-2.5 text-xs font-bold text-red-700 dark:text-red-300 bg-red-100 hover:bg-red-200 dark:bg-red-950/60 dark:hover:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl transition-all"
              >
                Balikan ang mga Mali
              </button>
            )}

            <button
              onClick={() => {
                sound.playTap();
                onStartDrill(weakestSubsection.category, true);
              }}
              className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-slate-950 rounded-xl shadow-md transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <span>Simulan ang Targeted Drill (20 Qs)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Official CSC Coverage Areas - Competency Matrix */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-500" />
              Talaan ng Kompetensya sa Opisyal na Coverage ng CSC
            </h2>
            <p className="text-xs text-slate-500">
              Pagsusuri sa bawat opisyal na sakop ng pagsusulit ayon sa antas ({isProf ? 'Professional' : 'Sub-Professional'})
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {diagList.map((item) => {
            const isMastered = item.status === 'mastered';
            const isProgressing = item.status === 'progressing';

            return (
              <div
                key={item.category}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-amber-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-slate-900 dark:text-white">
                          {item.name}
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-amber-500/10 text-amber-700 dark:text-amber-300">
                          {item.weight} CSC Weight
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 font-medium">
                        {item.tagalogName}
                      </span>
                    </div>

                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      isMastered
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : isProgressing
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                    }`}>
                      {item.statusLabel}
                    </span>
                  </div>

                  {/* Accuracy & Mastery Bars */}
                  <div className="my-4 space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-500">Kasalukuyang Marka:</span>
                        <strong className={`tabular-nums ${isMastered ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                          {item.accuracyPercentage}% {item.attemptedCount > 0 && `(${item.correctCount}/${item.attemptedCount} nasagutan)`}
                        </strong>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${
                            isMastered ? 'bg-emerald-500' : isProgressing ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(item.accuracyPercentage, 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                        <span className="text-[10px] text-slate-400 block">Kabuuang Tanong</span>
                        <strong className="text-slate-800 dark:text-slate-200 tabular-nums">{item.totalAvailable}</strong>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                        <span className="text-[10px] text-slate-400 block">Kabisado (Mastered)</span>
                        <strong className="text-emerald-600 dark:text-emerald-400 tabular-nums">{item.masteredCount}</strong>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                        <span className="text-[10px] text-slate-400 block">Maling Sagot</span>
                        <strong className="text-red-600 dark:text-red-400 tabular-nums">{item.mistakeCount}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Key Subtopics Checklist */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-2">
                      Pangunahing Paksa sa Pagsusulit:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {item.keySubtopics.map(sub => (
                        <div key={sub.name} className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${
                            sub.completed ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-700'
                          }`} />
                          <span className="truncate">{sub.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Target: ≥80.00%
                  </span>
                  <button
                    onClick={() => {
                      sound.playTap();
                      onStartDrill(item.category, true);
                    }}
                    className="px-4 py-2 text-xs font-bold text-slate-900 hover:text-white bg-slate-100 hover:bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-amber-400 rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <span>Magsanay sa {item.name}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sequential 4-Stage Study Journey / Milestone Roadmap */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            4-Stage Mastery Roadmap Patungo sa CSE Eligibility
          </h2>
          <p className="text-xs text-slate-500">
            Ang inirerekomendang sunod-sunod na proseso ng pag-aaral para sa mga topnotchers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Stage 1 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-xs flex items-center justify-center mb-3">
                01
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Pundasyon at Batayan
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Kabisaduhin ang 1987 Konstitusyon, RA 6713 Code of Conduct, at tamang tuntunin sa balarila.
              </p>
            </div>
            <div className="mt-4 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Aktibo
            </div>
          </div>

          {/* Stage 2 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 font-bold text-xs flex items-center justify-center mb-3">
                02
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Mga Karaniwang Patibong
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Pagsasanay sa Word Problems (Age, Work, Distance) at Syllogism fallacies na madalas ikamali.
              </p>
            </div>
            <div className="mt-4 text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <Target className="w-3.5 h-3.5" /> Kasalukuyang Stage
            </div>
          </div>

          {/* Stage 3 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center mb-3">
                03
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Bilis at Oras (Speed Rush)
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Sanayin ang utak sa 25-segundong bilis upang hindi kapusin sa oras sa aktuwal na pagsusulit.
              </p>
            </div>
            <div className="mt-4 text-[11px] font-semibold text-slate-400">
              ⚡ Speed Rush Mode
            </div>
          </div>

          {/* Stage 4 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center mb-3">
                04
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Buong Simulasyon (170 Qs)
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Kunin ang 3 oras at 10 minutong buong pagsusulit na may OMR Scantron sheet at opisyal na Report of Rating.
              </p>
            </div>
            <div className="mt-4 text-[11px] font-semibold text-slate-400">
              🏛️ Simulated Exam
            </div>
          </div>

        </div>

        {/* Grand CTA */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-500 text-center sm:text-left">
            Nais mo bang subukan ang iyong kabuuang kahandaan sa buong pagsusulit?
          </span>

          <button
            onClick={() => {
              sound.playTap();
              onStartSimulatedExam();
            }}
            className="px-6 py-2.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-slate-950 rounded-xl shadow-sm transition-all flex items-center gap-2"
          >
            <Award className="w-4 h-4" />
            <span>Kumuha ng Opisyal na Simulated Exam</span>
          </button>
        </div>
      </div>

    </div>
  );
};
