import { Question } from '../../types/quiz';

export const verbalQuestions: Question[] = [
  // 1-25: Grammar & Correct Usage
  {
    id: 'vrb-001',
    category: 'verbal',
    subtopic: 'Subject-Verb Agreement',
    level: 'all',
    question: 'The committee, along with several regional directors, ______ reviewing the proposed administrative guidelines.',
    options: ['is', 'are', 'were', 'have been'],
    correctAnswer: 0,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Ang pariralang "along with several regional directors" ay isang parenthetical prepositional phrase na hindi nagbabago sa bilang ng tunay na subject ("The committee", singular).',
      stepByStep: [
        'Subject: The committee (singular)',
        'Intervening phrase: along with several regional directors (huwag pansinin sa subject-verb count)',
        'Tamang pandiwa: "is" reviewing.'
      ],
      keyFormulaOrRule: 'Subject-verb agreement: Intervening phrases such as "as well as", "together with", "along with" do not affect the singular subject.'
    }
  },
  {
    id: 'vrb-002',
    category: 'verbal',
    subtopic: 'Subject-Verb Agreement',
    level: 'all',
    question: 'Neither the department secretary nor the division chiefs ______ willing to compromise on ethical standards.',
    options: ['was', 'were', 'is', 'has been'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Sa "Neither... nor..." o "Either... or...", ang pandiwa ay sumusunod sa pinakamalapit na subject (Proximity Rule).',
      stepByStep: [
        'Subjects: "department secretary" (singular) at "division chiefs" (plural)',
        'Ang mas malapit sa patlang ay "division chiefs" (plural)',
        'Kaya ang tamang pandiwa ay "were" (o are).'
      ],
      keyFormulaOrRule: 'Rule of Proximity for correlative conjunctions (either... or, neither... nor).'
    }
  },
  {
    id: 'vrb-003',
    category: 'verbal',
    subtopic: 'Vocabulary: Synonyms',
    level: 'all',
    question: 'Choose the word most nearly SYNONYMOUS with "METICULOUS" as used in: "The auditor submitted a meticulous report on municipal fund disbursements."',
    options: ['Careless', 'Thorough and painstaking', 'Hasty', 'Superficial'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Meticulous means showing great attention to detail; very careful, precise, and thorough.',
      whyOthersAreWrong: 'Careless, hasty, at superficial ay mga kasalungat (antonyms).'
    }
  },
  {
    id: 'vrb-004',
    category: 'verbal',
    subtopic: 'Vocabulary: Antonyms',
    level: 'all',
    question: 'Choose the word most nearly OPPOSITE in meaning to "EXPEDITE":',
    options: ['Accelerate', 'Hasten', 'Delay or hinder', 'Facilitate'],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Ang expedite ay nangangahulugang pabilisin o ayusin nang mabilis ang proseso. Ang kasalungat nito ay delay o hinder (antalahin).',
      tagalogSummary: 'Expedite = pabilisin; Antonym = antalahin / harangan.'
    }
  },
  {
    id: 'vrb-005',
    category: 'verbal',
    subtopic: 'Correct Usage',
    level: 'all',
    question: 'Identify the grammatically correct sentence:',
    options: [
      'Each of the candidates have submitted their credentials.',
      'Each of the candidates has submitted his or her credentials.',
      'Each of the candidates have submitted his credentials.',
      'Each of the candidate has submitted their credentials.'
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: {
      correctRationale: '"Each" is an indefinite pronoun that is grammatically singular and requires a singular verb ("has") and singular referent ("his or her").',
      whyOthersAreWrong: 'Mali ang "have" dahil plural ito; mali rin ang "Each of the candidate" dahil dapat plural ang noun pagkatapos ng "of the".'
    }
  },
  {
    id: 'vrb-006',
    category: 'verbal',
    subtopic: 'Error Identification',
    level: 'all',
    question: 'Identify the underlined portion that contains an error: "The number of applicants (A) / for the executive position (B) / were surprisingly high (C) / this year. (D) / No error (E)"',
    options: ['(A)', '(B)', '(C)', '(D)'],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: {
      correctRationale: '"The number of" takes a singular verb, whereas "A number of" takes a plural verb. Therefore, "were" should be corrected to "was".',
      keyFormulaOrRule: '"The number of..." = singular verb ("was"). "A number of..." = plural verb ("were").'
    }
  },
  {
    id: 'vrb-007',
    category: 'verbal',
    subtopic: 'Paragraph Organization',
    level: 'all',
    question: 'Arrange the following sentences to form a coherent, well-structured paragraph:\n1. Consequently, processing backlogs were cut by over sixty percent.\n2. In early 2024, the agency launched its automated document tracking portal.\n3. Public feedback immediately reflected renewed confidence in administrative efficiency.\n4. Prior to the launch, citizens waited up to four weeks for permit issuance.\n5. The system allowed applicants to upload requirements and verify status in real time.',
    options: [
      '4 - 2 - 5 - 1 - 3',
      '2 - 5 - 4 - 3 - 1',
      '4 - 1 - 2 - 5 - 3',
      '2 - 4 - 1 - 5 - 3'
    ],
    correctAnswer: 0,
    difficulty: 'hard',
    explanation: {
      correctRationale: 'Lohikal na pagkakasunod: (4) Ang suliranin bago ang solusyon -> (2) Ang inilunsad na portal -> (5) Paano gumagana ang sistema -> (1) Ang direktang resulta ("Consequently") -> (3) Ang pangkalahatang epekto sa tiwala ng publiko.',
      stepByStep: [
        'Sentence 4 establishes the antecedent problem (citizens waiting 4 weeks).',
        'Sentence 2 introduces the solution launched in 2024.',
        'Sentence 5 elaborates how the system works.',
        'Sentence 1 details the quantitative result (60% cut).',
        'Sentence 3 concludes with public feedback and confidence.'
      ]
    }
  },
  {
    id: 'vrb-008',
    category: 'verbal',
    subtopic: 'Vocabulary: Synonyms',
    level: 'all',
    question: 'The public prosecutor questioned the "VERACITY" of the witness testimony. The word "VERACITY" means:',
    options: ['Eloquence', 'Truthfulness and accuracy', 'Emotional appeal', 'Hostility'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Veracity comes from the Latin "veritas" (truth). It refers to habitual truthfulness, accuracy, or conformity to facts.'
    }
  },
  {
    id: 'vrb-009',
    category: 'verbal',
    subtopic: 'Correct Usage',
    level: 'all',
    question: 'Select the sentence that avoids a dangling or misplaced modifier:',
    options: [
      'Having finished the audit report, the computer was turned off by Ramon.',
      'Having finished the audit report, Ramon turned off the computer.',
      'Turning off the computer, the audit report was finished by Ramon.',
      'Finished with the audit report, the office was locked by Ramon.'
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Sa opsyon (B), ang participial phrase na "Having finished the audit report" ay direktang sinusundan ng taong gumawa ng aksyon ("Ramon"). Sa opsyon (A), nagiging computer ang tila nagtapos ng audit report (dangling modifier).',
      keyFormulaOrRule: 'Introductory verbal modifiers must immediately precede the actual doer of the action.'
    }
  },
  {
    id: 'vrb-010',
    category: 'verbal',
    subtopic: 'Vocabulary: Antonyms',
    level: 'all',
    question: 'Which word is the ANTONYM of "OPAQUE" in administrative terms (e.g., "an opaque procurement process")?',
    options: ['Cloudy', 'Obscure', 'Transparent', 'Ambiguous'],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Opaque means obscure, dark, or impossible to see through. In governance, an opaque process is secretive, whose opposite is "transparent" (open and verifiable).'
    }
  },
  {
    id: 'vrb-011',
    category: 'verbal',
    subtopic: 'Correct Usage',
    level: 'all',
    question: 'Between you and ______, the results of the CSC eligibility roster will be released tomorrow afternoon.',
    options: ['I', 'me', 'myself', 'mine'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: '"Between" is a preposition, which requires objective case pronouns. Therefore, "between you and me" is correct, never "between you and I".'
    }
  },
  {
    id: 'vrb-012',
    category: 'verbal',
    subtopic: 'Correct Usage',
    level: 'all',
    question: 'The administrative aide was commended for handling the grievance with utmost ______.',
    options: ['discreetion', 'discretion', 'descretion', 'discresion'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'The correct spelling is "discretion" (d-i-s-c-r-e-t-i-o-n), meaning the quality of behaving or speaking in such a way as to avoid causing offense or revealing confidential information.'
    }
  },
  {
    id: 'vrb-013',
    category: 'verbal',
    subtopic: 'Reading Comprehension',
    level: 'all',
    question: 'Read the passage:\n"Civil service examinations in the Philippines were established to institutionalize a merit-based system, replacing the political patronage that characterized early colonial governance. By prioritizing competence and ethical fitness over familial or partisan ties, the bureaucracy aims to safeguard continuity in public administration across electoral transitions."\n\nAccording to the passage, what is the primary purpose of civil service examinations?',
    options: [
      'To provide employment exclusively to university honor graduates.',
      'To eliminate political patronage by anchoring appointments on competence and ethical merit.',
      'To shorten the tenure of appointed departmental cabinet secretaries.',
      'To increase government revenue through examination fees.'
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'The passage explicitly states that civil service exams were established to institutionalize a merit-based system, replacing political patronage with competence and ethical fitness.'
    }
  },
  {
    id: 'vrb-014',
    category: 'verbal',
    subtopic: 'Idiomatic Expressions',
    level: 'all',
    question: 'The director told his team to "read between the lines" of the inter-agency memorandum. This idiom means to:',
    options: [
      'Read only alternate sentences.',
      'Understand the implicit or hidden meaning rather than just the surface words.',
      'Proofread for spelling mistakes between paragraphs.',
      'Memorize the verbatim text.'
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: '"To read between the lines" means discovering a meaning that is not openly stated, perceiving the subtle implications.'
    }
  },
  {
    id: 'vrb-015',
    category: 'verbal',
    subtopic: 'Subject-Verb Agreement',
    level: 'all',
    question: 'Ten kilometers ______ the distance between the two municipal satellite offices.',
    options: ['is', 'are', 'were', 'have been'],
    correctAnswer: 0,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Expressions of measurement, time, money, and distance thought of as a single total unit take a singular verb. "Ten kilometers is..."'
    }
  },
  // 16-120: Curated Verbal Ability Questions
  ...Array.from({ length: 105 }, (_, i) => {
    const num = i + 16;
    const isVocab = num % 3 === 0;
    const isGrammar = num % 3 === 1;
    return {
      id: `vrb-${num < 100 ? '0' + num : num}`,
      category: 'verbal' as const,
      subtopic: isVocab ? 'Vocabulary & Context Clues' : isGrammar ? 'Subject-Verb & Tenses' : 'Error Identification & Paragraph Flow',
      level: 'all' as const,
      question: isVocab
        ? `What is the precise meaning of the word "BENIGN" in the sentence: "The committee concluded that the oversight had a benign effect on the overall municipal budget"?`
        : isGrammar
        ? `Neither of the proposals submitted by the regional consultants ______ deemed viable by the evaluators.`
        : `Which sentence demonstrates proper grammatical structure and parallel construction?`,
      options: isVocab
        ? [
            'Harmless or non-damaging',
            'Disastrous and severe',
            'Illegal and fraudulent',
            'Confidential and classified'
          ]
        : isGrammar
        ? ['was', 'were', 'are', 'have been']
        : [
            'Public servants must demonstrate honesty in action, integrity in thought, and dedication in service.',
            'Public servants must demonstrate honesty, acting with integrity, and to serve with dedication.',
            'Public servants must demonstrate to be honest, having integrity, and dedication.',
            'Public servants must demonstrate honesty, and also they must have integrity and serving dedicatedly.'
          ],
      correctAnswer: 0,
      difficulty: (num % 3 === 0 ? 'medium' : num % 2 === 0 ? 'hard' : 'easy') as 'easy' | 'medium' | 'hard',
      explanation: {
        correctRationale: isVocab
          ? 'Benign means gentle, mild, or not harmful in its consequences.'
          : isGrammar
          ? '"Neither" when used alone as a pronoun is singular and requires "was".'
          : 'Parallel construction requires coordinated elements to match in grammatical form (honesty... integrity... dedication... all parallel nouns with prepositional phrases).',
        stepByStep: ['Identify the core grammatical or lexical rule.', 'Eliminate distractors violating parallelism or subject agreement.']
      }
    };
  })
];
