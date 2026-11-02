import { Question, SubtestCategory, ExamLevel } from '../../types/quiz';
import { numericalQuestions } from './numerical';
import { analyticalQuestions } from './analytical';
import { verbalQuestions } from './verbal';
import { generalInfoQuestions } from './general_info';
import { clericalQuestions } from './clerical';

export const ALL_QUESTIONS: Question[] = [
  ...numericalQuestions,
  ...analyticalQuestions,
  ...verbalQuestions,
  ...generalInfoQuestions,
  ...clericalQuestions
];

export interface SubsectionMeta {
  id: SubtestCategory;
  name: string;
  tagalogName: string;
  description: string;
  cscWeightProf: string;
  cscWeightSubProf: string;
  totalAvailable: number;
}

export const SUBSECTIONS_META: Record<SubtestCategory, SubsectionMeta> = {
  numerical: {
    id: 'numerical',
    name: 'Numerical Ability',
    tagalogName: 'Kakayahang Pamilang',
    description: 'Basic Operations, Word Problems, Number Sequences, Ratio, Percentage, Fractions, at Data Interpretation.',
    cscWeightProf: '25%',
    cscWeightSubProf: '25%',
    totalAvailable: numericalQuestions.length
  },
  analytical: {
    id: 'analytical',
    name: 'Analytical Ability',
    tagalogName: 'Kakayahang Mapanuri',
    description: 'Syllogism, Word Association, Analogy, Logical Deduction, Assumptions, at Data Sufficiency (Professional only).',
    cscWeightProf: '25%',
    cscWeightSubProf: '0%',
    totalAvailable: analyticalQuestions.length
  },
  verbal: {
    id: 'verbal',
    name: 'Verbal Ability',
    tagalogName: 'Kakayahang Berbal',
    description: 'Grammar and Correct Usage, Vocabulary, Synonyms/Antonyms, Paragraph Organization, at Reading Comprehension.',
    cscWeightProf: '30%',
    cscWeightSubProf: '30%',
    totalAvailable: verbalQuestions.length
  },
  general_info: {
    id: 'general_info',
    name: 'General Information',
    tagalogName: 'Pangkalahatang Kaalaman',
    description: '1987 Philippine Constitution, RA 6713 Code of Conduct, Peace and Human Rights, at Environmental Management.',
    cscWeightProf: '20%',
    cscWeightSubProf: '20%',
    totalAvailable: generalInfoQuestions.length
  },
  clerical: {
    id: 'clerical',
    name: 'Clerical Ability',
    tagalogName: 'Kakayahang Pang-Klerikal',
    description: 'Alphabetical Indexing, Filing Systems, Clerical Reasoning, Error Checking, at Spelling (Sub-Professional only).',
    cscWeightProf: '0%',
    cscWeightSubProf: '25%',
    totalAvailable: clericalQuestions.length
  }
};

export function getQuestionsByCategory(category: SubtestCategory): Question[] {
  return ALL_QUESTIONS.filter(q => q.category === category);
}

export function getQuestionsByLevel(level: ExamLevel): Question[] {
  if (level === 'professional') {
    return ALL_QUESTIONS.filter(q => q.category !== 'clerical');
  } else {
    return ALL_QUESTIONS.filter(q => q.category !== 'analytical');
  }
}

/**
 * Shuffles an array with Fisher-Yates algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generates balanced mock exam questions mirroring official Civil Service Exam blueprint
 */
export function generateMockExam(level: ExamLevel, count: number = 50): Question[] {
  let eligibleQuestions = getQuestionsByLevel(level);

  // Group by category to ensure proportional representation
  const categories: SubtestCategory[] = level === 'professional'
    ? ['verbal', 'numerical', 'analytical', 'general_info']
    : ['verbal', 'numerical', 'clerical', 'general_info'];

  const perCategory = Math.floor(count / categories.length);
  const remainder = count % categories.length;

  let selected: Question[] = [];

  categories.forEach((cat, idx) => {
    const catPool = shuffleArray(eligibleQuestions.filter(q => q.category === cat));
    const takeCount = perCategory + (idx < remainder ? 1 : 0);
    selected.push(...catPool.slice(0, takeCount));
  });

  return shuffleArray(selected);
}

export interface OfficialExamBlueprint {
  level: ExamLevel;
  totalQuestions: number;
  timeLimitMinutes: number; // 190 mins (3h 10m) for Prof, 160 mins (2h 40m) for Sub-Prof
  categoryBreakdown: {
    category: SubtestCategory;
    count: number;
    weight: string;
    description: string;
  }[];
}

export const OFFICIAL_CSC_BLUEPRINT: Record<ExamLevel, OfficialExamBlueprint> = {
  professional: {
    level: 'professional',
    totalQuestions: 170,
    timeLimitMinutes: 190, // 3 hours, 10 minutes
    categoryBreakdown: [
      { category: 'verbal', count: 50, weight: '30%', description: 'Grammar, Vocabulary, Paragraph Organization, Reading Comprehension' },
      { category: 'analytical', count: 45, weight: '25%', description: 'Syllogism, Analogy, Logic, Data Sufficiency' },
      { category: 'numerical', count: 45, weight: '25%', description: 'Word Problems, Number Sequences, Fractions, Percentages' },
      { category: 'general_info', count: 30, weight: '20%', description: '1987 Philippine Constitution, RA 6713, Human Rights, Environment' }
    ]
  },
  sub_professional: {
    level: 'sub_professional',
    totalQuestions: 165,
    timeLimitMinutes: 160, // 2 hours, 40 minutes
    categoryBreakdown: [
      { category: 'verbal', count: 50, weight: '30%', description: 'Grammar, Vocabulary, Paragraph Organization, Reading Comprehension' },
      { category: 'clerical', count: 45, weight: '25%', description: 'Alphabetical Indexing, Filing Systems, Clerical Reasoning, Proofreading' },
      { category: 'numerical', count: 40, weight: '25%', description: 'Basic Operations, Decimals, Ratios, Number Series' },
      { category: 'general_info', count: 30, weight: '20%', description: '1987 Philippine Constitution, RA 6713, Human Rights, Environment' }
    ]
  }
};

/**
 * Generates an official Simulated Exam strictly adhering to official CSC section distributions
 */
export function generateSimulatedExam(
  level: ExamLevel, 
  preset: 'official_full' | 'half_length' | 'diagnostic_50' = 'official_full'
): { questions: Question[]; timeMinutes: number; blueprint: OfficialExamBlueprint } {
  const blueprint = OFFICIAL_CSC_BLUEPRINT[level];
  let multiplier = 1;
  let timeMinutes = blueprint.timeLimitMinutes;

  if (preset === 'half_length') {
    multiplier = 0.5;
    timeMinutes = Math.round(blueprint.timeLimitMinutes / 2);
  } else if (preset === 'diagnostic_50') {
    multiplier = 50 / blueprint.totalQuestions;
    timeMinutes = 60;
  }

  let selectedQuestions: Question[] = [];

  blueprint.categoryBreakdown.forEach(item => {
    const pool = shuffleArray(getQuestionsByCategory(item.category));
    const targetCount = preset === 'official_full' ? item.count : Math.max(Math.round(item.count * multiplier), 5);
    selectedQuestions.push(...pool.slice(0, targetCount));
  });

  return {
    questions: selectedQuestions,
    timeMinutes,
    blueprint
  };
}
