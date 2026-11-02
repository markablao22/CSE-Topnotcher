import React, { useState } from 'react';
import { 
  Search, Filter, Bookmark, BookmarkCheck, Sparkles, 
  ChevronDown, ChevronUp, CheckCircle2, BookOpen
} from 'lucide-react';
import { Question, SubtestCategory } from '../types/quiz';
import { SUBSECTIONS_META } from '../data/questions';
import { sound } from '../utils/sound';
import { toggleQuestionBookmark } from '../utils/storage';

interface QuestionBankExplorerProps {
  questions: Question[];
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
}

export const QuestionBankExplorer: React.FC<QuestionBankExplorerProps> = ({
  questions,
  bookmarkedIds,
  onToggleBookmark
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [onlyBookmarked, setOnlyBookmarked] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filter questions
  const filtered = questions.filter(q => {
    if (selectedCategory !== 'all' && q.category !== selectedCategory) return false;
    if (difficultyFilter !== 'all' && q.difficulty !== difficultyFilter) return false;
    if (onlyBookmarked && !bookmarkedIds.includes(q.id)) return false;
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchQuestion = q.question.toLowerCase().includes(query);
      const matchTopic = q.subtopic.toLowerCase().includes(query);
      const matchExplanation = q.explanation.correctRationale.toLowerCase().includes(query);
      if (!matchQuestion && !matchTopic && !matchExplanation) return false;
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Header */}
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Aklatan ng 500 Civil Service Questions
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Galugarin ang bawat tanong, subseksyon, step-by-step formula, at opisyal na paliwanag
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs mb-6 space-y-3">
        
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Maghanap ng paksa, tanong, batas (hal. RA 6713, Age problem, Syllogism, Constitution)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Category Pills & Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => { sound.playTap(); setSelectedCategory('all'); }}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Lahat (500)
            </button>
            {Object.keys(SUBSECTIONS_META).map(key => {
              const meta = SUBSECTIONS_META[key as SubtestCategory];
              return (
                <button
                  key={key}
                  onClick={() => { sound.playTap(); setSelectedCategory(key); }}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    selectedCategory === key
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {meta.name} ({meta.totalAvailable})
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {/* Bookmarked toggle */}
            <button
              onClick={() => { sound.playTap(); setOnlyBookmarked(!onlyBookmarked); }}
              className={`px-3 py-1 text-xs font-semibold rounded-md border flex items-center gap-1.5 transition-colors ${
                onlyBookmarked
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Bookmarks ({bookmarkedIds.length})</span>
            </button>
          </div>

        </div>

      </div>

      {/* Showing count indicator */}
      <div className="text-xs text-slate-500 mb-4 px-1">
        Ipinapakita ang <strong className="text-slate-900 dark:text-white tabular-nums">{filtered.length}</strong> sa 500 tanong
      </div>

      {/* Questions Accordion List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 text-xs">
            Walang tanong na tumutugma sa iyong filter o hinahanap.
          </div>
        ) : (
          filtered.slice(0, 100).map((q, idx) => {
            const isExpanded = expandedId === q.id;
            const isBookmarked = bookmarkedIds.includes(q.id);

            return (
              <div
                key={q.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden"
              >
                {/* Header row */}
                <div
                  onClick={() => {
                    sound.playTap();
                    setExpandedId(isExpanded ? null : q.id);
                  }}
                  className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-bold text-amber-700 dark:text-amber-300">
                        {SUBSECTIONS_META[q.category]?.name}
                      </span>
                      <span>·</span>
                      <span className="text-slate-700 dark:text-slate-300">{q.subtopic}</span>
                      <span>·</span>
                      <span className="capitalize">{q.difficulty}</span>
                    </div>

                    <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                      {q.question}
                    </p>
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

                {/* Expanded Answer and Solution */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-4">
                    
                    {/* Choices Grid */}
                    <div className="space-y-2 mt-2">
                      {q.options.map((opt, optIndex) => {
                        const letter = String.fromCharCode(65 + optIndex);
                        const isCorrect = optIndex === q.correctAnswer;

                        return (
                          <div
                            key={optIndex}
                            className={`p-3 rounded-lg border text-xs flex items-center justify-between gap-3 ${
                              isCorrect
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100 font-semibold'
                                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="font-bold text-slate-500 uppercase">{letter}.</span>
                              <span>{opt}</span>
                            </div>
                            {isCorrect && (
                              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Tamang Sagot
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Rich Explanation */}
                    <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60">
                      <div className="flex items-center gap-2 font-bold text-xs text-amber-900 dark:text-amber-200 mb-2">
                        <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <span>Detalyadong Paliwanag at Batayan</span>
                      </div>

                      <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed mb-2.5">
                        {q.explanation.correctRationale}
                      </p>

                      {q.explanation.stepByStep && (
                        <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1 mb-2.5">
                          {q.explanation.stepByStep.map((s, si) => (
                            <div key={si} className="text-slate-700 dark:text-slate-300">{s}</div>
                          ))}
                        </div>
                      )}

                      {q.explanation.keyFormulaOrRule && (
                        <div className="text-[11px] font-medium text-amber-800 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-900/40 p-2 rounded-md">
                          📌 <strong>Tuntunin:</strong> {q.explanation.keyFormulaOrRule}
                        </div>
                      )}
                    </div>

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
