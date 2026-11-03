import React, { useState } from 'react';
import { 
  AlertCircle, CheckCircle2, RotateCcw, 
  Sparkles, Check, ChevronRight, BookOpen, Trophy
} from 'lucide-react';
import { Question, SubtestCategory } from '../types/quiz';
import { SUBSECTIONS_META } from '../data/questions';
import { sound } from '../utils/sound';
import { markAsMastered } from '../utils/storage';
import { PremiumFeature } from './PremiumGate';

interface MistakesBankViewProps {
  incorrectIds: string[];
  allQuestions: Question[];
  onStartMistakeDrill: (questions: Question[]) => void;
  onClearFromMistakes: (id: string) => void;
}

export const MistakesBankView: React.FC<MistakesBankViewProps> = ({
  incorrectIds,
  allQuestions,
  onStartMistakeDrill,
  onClearFromMistakes
}) => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const questionMap = React.useMemo(() => {
    const map = new Map<string, Question>();
    allQuestions.forEach(q => map.set(q.id, q));
    return map;
  }, [allQuestions]);

  const mistakeQuestions = incorrectIds
    .map(id => questionMap.get(id))
    .filter((q): q is Question => q !== undefined);

  const toggleFlip = (id: string) => {
    sound.playTap();
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleMastered = (id: string) => {
    sound.playCorrect();
    markAsMastered(id);
    onClearFromMistakes(id);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/10 text-red-700 dark:text-red-300 border border-red-500/20 mb-2">
            <AlertCircle className="w-3.5 h-3.5 text-red-500" />
            Spaced Repetition Reviewer
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Balikan ang mga Maling Sagot ({mistakeQuestions.length})
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Awtomatikong iniipon ang bawat tanong na iyong naipagkamali upang masigurong hindi na mauulit sa opisyal na pagsusulit
          </p>
        </div>

        {mistakeQuestions.length > 0 && (
          <button
            onClick={() => { sound.playTap(); onStartMistakeDrill(mistakeQuestions); }}
            className="px-5 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm flex items-center gap-2 transition-colors shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
            Magsanay sa mga Maling Ito ({mistakeQuestions.length})
          </button>
        )}
      </div>

      {/* Empty State */}
      {mistakeQuestions.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Walang Nakabinbing Maling Sagot!
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 mb-5">
            Lahat ng tanong na iyong nasagutan ay naitama mo na o minarkahan bilang Mastered. Magpatuloy sa pagkuha ng mga mock test!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {mistakeQuestions.map((q, idx) => {
            const isFlipped = flippedCards[q.id];

            return (
              <div
                key={q.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs p-5 transition-all"
              >
                <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-red-600 dark:text-red-400">
                      Mali #{idx + 1}
                    </span>
                    <span>·</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {SUBSECTIONS_META[q.category]?.name}
                    </span>
                    <span>·</span>
                    <span>{q.subtopic}</span>
                  </div>

                  <button
                    onClick={() => handleMastered(q.id)}
                    className="px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1 transition-colors"
                    title="Markahan bilang Mastered kapag kabisado mo na"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Kabisado Ko Na (Mastered)
                  </button>
                </div>

                <div className="py-4">
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
                    {q.question}
                  </h3>
                </div>

                {/* Flip control */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => toggleFlip(q.id)}
                    className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {isFlipped ? 'Itago ang Paliwanag' : 'Ipakita ang Tamang Sagot at Paliwanag'}
                  </button>
                </div>

                {/* Flipped Content */}
                {isFlipped && (
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                    <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
                      <span className="font-bold text-emerald-800 dark:text-emerald-200 block mb-1">
                        Tamang Sagot: {String.fromCharCode(65 + q.correctAnswer)}. {q.options[q.correctAnswer]}
                      </span>
                      <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                        {q.explanation.correctRationale}
                      </p>
                    </div>

                    <PremiumFeature>
                    {q.explanation.stepByStep && (
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-xs font-mono space-y-1">
                        {q.explanation.stepByStep.map((s, i) => (
                          <div key={i} className="text-slate-700 dark:text-slate-300">{s}</div>
                        ))}
                      </div>
                    )}

                    {q.explanation.keyFormulaOrRule && (
                      <div className="text-[11px] font-medium text-amber-800 dark:text-amber-300 bg-amber-100/60 dark:bg-amber-900/40 p-2 rounded-md">
                        📌 <strong>Tuntunin:</strong> {q.explanation.keyFormulaOrRule}
                      </div>
                    )}
                    </PremiumFeature>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
