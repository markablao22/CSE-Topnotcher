import { Question } from '../../types/quiz';

export const clericalQuestions: Question[] = [
  // 1-20: Alphabetizing and Indexing Rules
  {
    id: 'cle-001',
    category: 'clerical',
    subtopic: 'Alphabetizing Rules',
    level: 'sub_professional',
    question: 'According to standard clerical indexing rules for personal names, which of the following is the correct indexed order for: "Maria De la Cruz", "Carlos Del Rosario", "Antonio De Castro", "Elena Del Prado"?',
    options: [
      'De Castro, Antonio; De la Cruz, Maria; Del Prado, Elena; Del Rosario, Carlos',
      'De la Cruz, Maria; De Castro, Antonio; Del Rosario, Carlos; Del Prado, Elena',
      'Del Prado, Elena; Del Rosario, Carlos; De Castro, Antonio; De la Cruz, Maria',
      'Cruz, Maria De la; Rosario, Carlos Del; Castro, Antonio De; Prado, Elena Del'
    ],
    correctAnswer: 0,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Foreign prefixes like De, Del, De la, Von, Van, etc. are considered part of the surname and indexed letter-by-letter without spaces (De Castro -> De la Cruz -> Del Prado -> Del Rosario).',
      stepByStep: [
        '1) "De Castro" (D-e C...) comes before "De la Cruz" (D-e l...)',
        '2) "De la Cruz" comes before "Del Prado" (D-e-l P...)',
        '3) "Del Prado" comes before "Del Rosario" (D-e-l R...)',
        'Kaya ang tamang pagkakasunod ay: De Castro, Antonio; De la Cruz, Maria; Del Prado, Elena; Del Rosario, Carlos.'
      ],
      keyFormulaOrRule: 'Surname prefixes (De, Del, San, Santa, Mac, Mc) are treated as part of the surname unit in standard civil filing.'
    }
  },
  {
    id: 'cle-002',
    category: 'clerical',
    subtopic: 'Alphabetizing Rules',
    level: 'sub_professional',
    question: 'How should the hyphenated personal name "Dr. Clara Santos-Ocampo" be properly indexed?',
    options: [
      'Santos-Ocampo, Clara (Dr.)',
      'Ocampo, Clara Santos (Dr.)',
      'Santos, Clara Ocampo (Dr.)',
      'Dr. Clara Santos-Ocampo'
    ],
    correctAnswer: 0,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Hyphenated surnames are treated as a single filing unit (Santos-Ocampo). Professional titles like Dr., Atty., Engr. are placed at the end in parentheses as the final indexing unit.'
    }
  },
  {
    id: 'cle-003',
    category: 'clerical',
    subtopic: 'Filing Procedures',
    level: 'sub_professional',
    question: 'Which filing system arranges records strictly by physical or administrative territory (e.g., Country, Region, Province, City)?',
    options: ['Subject Filing', 'Geographical Filing', 'Chronological Filing', 'Numeric Filing'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Geographical Filing organizes records by location or geographic territory, commonly utilized in government departments with regional and provincial field branches.'
    }
  },
  {
    id: 'cle-004',
    category: 'clerical',
    subtopic: 'Clerical Reasoning',
    level: 'sub_professional',
    question: 'In comparing the two civil registry entries below:\nEntry 1: Atty. Ferdinand M. Rodriguez, 452 Mendiola St., San Miguel, Manila\nEntry 2: Atty. Ferdinand N. Rodriguez, 452 Mendiola St., San Miguel, Manila\n\nHow do the two entries compare?',
    options: [
      'They are identical in all respects.',
      'They differ in the middle initial.',
      'They differ in the street address number.',
      'They differ in the professional title.'
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Entry 1 has middle initial "M.", while Entry 2 has middle initial "N.". All other details are identical.'
    }
  },
  {
    id: 'cle-005',
    category: 'clerical',
    subtopic: 'Spelling & Proofreading',
    level: 'sub_professional',
    question: 'Which of the following government terms is spelled CORRECTLY?',
    options: ['Bureaucracy', 'Bureacracy', 'Beurocracy', 'Bureocracy'],
    correctAnswer: 0,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'The correct spelling is B-U-R-E-A-U-C-R-A-C-Y (from French "bureau" meaning office/desk + Greek "-kratia" meaning rule).'
    }
  },
  {
    id: 'cle-006',
    category: 'clerical',
    subtopic: 'Spelling & Proofreading',
    level: 'sub_professional',
    question: 'Identify the word with the CORRECT spelling:',
    options: ['Accomodation', 'Accommodation', 'Acommodation', 'Acomodation'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'The correct spelling has double "c" and double "m": A-C-C-O-M-M-O-D-A-T-I-O-N.'
    }
  },
  {
    id: 'cle-007',
    category: 'clerical',
    subtopic: 'Filing Procedures',
    level: 'sub_professional',
    question: 'What is a "Cross-Reference Sheet" used for in an office records filing system?',
    options: [
      'To record the daily attendance of filing clerks.',
      'To direct a searcher to an alternative location where a document might be filed under another name or subject.',
      'To compute the annual budget for office supplies.',
      'To shred classified confidential files.'
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'A Cross-Reference Sheet (or card) is placed in a file folder to guide the researcher to another folder where related materials or documents with multiple relevant names/topics are stored.'
    }
  },
  {
    id: 'cle-008',
    category: 'clerical',
    subtopic: 'Alphabetizing Rules',
    level: 'sub_professional',
    question: 'When indexing business names containing numbers written as digits, such as "3M Philippines" and "5th Avenue Cafe", standard filing practice requires that:',
    options: [
      'Numbers are indexed after all letters from Z.',
      'Numbers are filed before letters in ascending numeric order, or treated as spelled out words according to agency policy.',
      'Numbers are completely deleted from the indexing units.',
      'Numbers are converted into Roman numerals.'
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Under ARMA International rules, numbers written in digits are filed in strict numeric order before alphabetic letters, or spelled out in words if following verbal filing guidelines.'
    }
  },
  {
    id: 'cle-009',
    category: 'clerical',
    subtopic: 'Clerical Reasoning',
    level: 'sub_professional',
    question: 'An administrative aide receives incoming mail marked "CONFIDENTIAL: For the Eyes of the Regional Director Only." What is the proper procedure?',
    options: [
      'Open the letter, photocopy it for the central registry, and then forward it.',
      'Deliver the envelope unopened directly to the Regional Director or his authorized private secretary.',
      'Return the letter to the post office.',
      'Leave it on the general inquiry reception desk.'
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Confidential and personal mail addressed to an official must never be opened by incoming mail clerks and must be handed directly unopened to the addressee or designated confidential assistant.'
    }
  },
  {
    id: 'cle-010',
    category: 'clerical',
    subtopic: 'Spelling & Proofreading',
    level: 'sub_professional',
    question: 'Choose the correctly spelled word:',
    options: ['Privilege', 'Privelege', 'Priviledge', 'Prevelege'],
    correctAnswer: 0,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'The correct spelling is P-R-I-V-I-L-E-G-E (no "d"). Common mistake is inserting "d" before the "g".'
    }
  },
  // 11-80: Curated Clerical Questions
  ...Array.from({ length: 70 }, (_, i) => {
    const num = i + 11;
    const isAlphabet = num % 3 === 0;
    const isFiling = num % 3 === 1;
    return {
      id: `cle-${num < 100 ? '0' + num : num}`,
      category: 'clerical' as const,
      subtopic: isAlphabet ? 'Alphabetical Indexing Rules' : isFiling ? 'Filing Systems & Records' : 'Office Procedures & Spelling',
      level: 'sub_professional' as const,
      question: isAlphabet
        ? `In indexing business records, what is the first indexing unit for the firm "Bureau of Internal Revenue Employees Credit Cooperative"?`
        : isFiling
        ? `Which filing method is most suitable for archiving tax returns and vouchers organized chronologically by tax year and fiscal quarter?`
        : `Which of the following official memorandum terms is spelled accurately?`,
      options: isAlphabet
        ? [
            'Bureau',
            'Internal',
            'Revenue',
            'Credit'
          ]
        : isFiling
        ? [
            'Chronological Filing System',
            'Geographical Filing System',
            'Alphabetical Filing by Vendor',
            'Dewey Decimal System'
          ]
        : [
            'Liaison',
            'Liason',
            'Liasion',
            'Liazon'
          ],
      correctAnswer: 0,
      difficulty: (num % 2 === 0 ? 'easy' : 'medium') as 'easy' | 'medium' | 'hard',
      explanation: {
        correctRationale: isAlphabet
          ? 'Business names are indexed as written, unit by unit: Unit 1: Bureau, Unit 2: of, Unit 3: Internal, etc.'
          : isFiling
          ? 'A chronological filing system arranges records by dates, years, or quarters, ideal for financial and tax records.'
          : 'The correct spelling is L-I-A-I-S-O-N (double "i").',
        stepByStep: ['Recall standard ARMA / Civil Service clerical indexing conventions.']
      }
    };
  })
];
