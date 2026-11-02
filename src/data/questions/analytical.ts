import { Question } from '../../types/quiz';

export const analyticalQuestions: Question[] = [
  // 1-20: Syllogism & Logical Deduction
  {
    id: 'ana-001',
    category: 'analytical',
    subtopic: 'Syllogism',
    level: 'all',
    question: 'Statements: All government employees are civil servants. Some civil servants are lawyers. Conclusion I: Some government employees are lawyers. Conclusion II: All lawyers are government employees. Which conclusion logically follows?',
    options: [
      'Only Conclusion I follows',
      'Only Conclusion II follows',
      'Both Conclusion I and II follow',
      'Neither Conclusion I nor II follows'
    ],
    correctAnswer: 3,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Neither follows necessarily. Dahil ang "Some civil servants are lawyers" ay maaaring tumukoy sa civil servants na hindi government employees o labas sa bilog ng government employees.',
      stepByStep: [
        'All G are C (buong bilog ng G ay nasa loob ng C).',
        'Some C are L (ang bilog ng L ay may overlap sa C, ngunit hindi garantisadong tatama sa G).',
        'Kaya hindi tiyak kung may G na L, at tiyak na hindi lahat ng L ay G.'
      ],
      keyFormulaOrRule: 'Universal Affirmative + Particular Affirmative does not automatically link outer terms.'
    }
  },
  {
    id: 'ana-002',
    category: 'analytical',
    subtopic: 'Syllogism',
    level: 'all',
    question: 'Statements: All applicants must submit Form 212. Juan submitted Form 212. What can be definitively concluded?',
    options: [
      'Juan is an applicant.',
      'Juan is guaranteed to be hired.',
      'Juan might or might not be an applicant.',
      'Anyone who submits Form 212 is disqualified.'
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Pansinin ang fallacy of affirming the consequent (A -> B does not mean B -> A).',
      stepByStep: [
        'Kondisyon: Kung aplikante ka, kailangan mong magpasa ng Form 212.',
        'Hindi sinabi na aplikante LAMANG ang maaaring magpasa.',
        'Kaya posibleng si Juan ay aplikante, o nagpasa siya para sa ibang layunin o nagkamali.'
      ],
      whyOthersAreWrong: 'Karaniwang pagkakamali ang piliin ang (A), ngunit sa pormal na lohika ito ay affirming the consequent.'
    }
  },
  {
    id: 'ana-003',
    category: 'analytical',
    subtopic: 'Analogy',
    level: 'all',
    question: 'CONSTITUTION : NATION :: BYLAWS : ______?',
    options: ['Government', 'Corporation / Organization', 'President', 'Judiciary'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Ang Saligang Batas (Constitution) ay ang pinakamataas na tuntunin ng isang bansa, tulad ng mga Bylaws na saligang tuntunin ng isang korporasyon o organisasyon.',
      keyFormulaOrRule: 'Analogy relationship: Governing legal framework to its respective governing entity.'
    }
  },
  {
    id: 'ana-004',
    category: 'analytical',
    subtopic: 'Analogy',
    level: 'all',
    question: 'COURT : ADJUDICATE :: LEGISLATURE : ______?',
    options: ['Enforce', 'Enact', 'Prosecute', 'Veto'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Ang tungkulin ng Korte (Judiciary) ay mag-adjudicate (humatol), samantalang ang tungkulin ng Lehislatura ay mag-enact (magpatibay ng batas).',
      whyOthersAreWrong: 'Ang mag-enforce ay tungkulin ng Executive; ang veto ay kapangyarihan ng Pangulo.'
    }
  },
  {
    id: 'ana-005',
    category: 'analytical',
    subtopic: 'Word Association',
    level: 'all',
    question: 'Which of the following words does NOT belong with the others in the group?',
    options: ['Graft', 'Integrity', 'Embezzlement', 'Bribery'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Ang "Integrity" ay isang positibong katangian at kabutihang-asal (virtue/standard sa ilalim ng RA 6713), samantalang ang Graft, Embezzlement, at Bribery ay pawang mga krimen ng katiwalian (corrupt practices).'
    }
  },
  {
    id: 'ana-006',
    category: 'analytical',
    subtopic: 'Word Association',
    level: 'all',
    question: 'Choose the odd one out: Audit, Inspection, Evaluation, Embellishment',
    options: ['Audit', 'Inspection', 'Evaluation', 'Embellishment'],
    correctAnswer: 3,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Ang Audit, Inspection, at Evaluation ay mga opisyal na paraan ng pagsusuri at pagsisiyasat sa pamahalaan. Ang "Embellishment" ay nangangahulugang pagpapakitang-tao o pagpapaganda nang labis.'
    }
  },
  {
    id: 'ana-007',
    category: 'analytical',
    subtopic: 'Logical Reasoning: Seating Arrangement',
    level: 'all',
    question: 'Five government directors—A, B, C, D, and E—are seated in a row facing the audience. C is to the immediate right of B. E is to the left of A and immediate right of D. If B is to the right of A, who is sitting in the exact middle?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    difficulty: 'hard',
    explanation: {
      correctRationale: 'I-plot ang posisyon batay sa mga pahiwatig (clues).',
      stepByStep: [
        'Clue 1: E is immediate right of D, left of A => [D, E, A]',
        'Clue 2: B is to the right of A => [D, E, A, B]',
        'Clue 3: C is to the immediate right of B => [D, E, A, B, C]',
        'Ang pagkakasunod-sunod mula kaliwa pakanan ay D - E - A - B - C.',
        'Ang nasa gitna (ikatlo sa 5) ay si A.'
      ]
    }
  },
  {
    id: 'ana-008',
    category: 'analytical',
    subtopic: 'Assumptions & Inferences',
    level: 'all',
    question: 'Statement: "To enhance public transparency, all government procurement bidding notices must be posted on the PhilGEPS portal and agency bulletin boards." What is an underlying assumption of this policy?',
    options: [
      'The public and prospective bidders consult PhilGEPS and agency bulletin boards to access bidding information.',
      'Traditional print newspapers are illegal for publishing bids.',
      'All government bids are conducted without any anomalies.',
      'Only large multinational corporations participate in bidding.'
    ],
    correctAnswer: 0,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Ang isang assumption ay ang di-sinasabing saligan upang magkaroon ng saysay ang patakaran. Kung walang nagbabasa o tumitingin sa PhilGEPS o bulletin board, mawawalan ng saysay ang layuning "to enhance public transparency".'
    }
  },
  {
    id: 'ana-009',
    category: 'analytical',
    subtopic: 'Analogy',
    level: 'all',
    question: 'IMPEACHMENT : REMOVAL :: CONVICTION : ______?',
    options: ['Indictment', 'Punishment / Sentence', 'Arrest', 'Appeal'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Cause and effect: Ang layunin at epekto ng tagumpay na impeachment ay removal from office, kung paanong ang resulta ng conviction sa criminal court ay punishment/penalty.'
    }
  },
  {
    id: 'ana-010',
    category: 'analytical',
    subtopic: 'Data Sufficiency',
    level: 'all',
    question: 'Question: Is integer n an odd number? Statement (1): n is a multiple of 3. Statement (2): n + 2 is an odd number. To answer the question:',
    options: [
      'Statement (1) ALONE is sufficient, but Statement (2) alone is not sufficient.',
      'Statement (2) ALONE is sufficient, but Statement (1) alone is not sufficient.',
      'BOTH statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient.',
      'Statements (1) and (2) TOGETHER are NOT sufficient.'
    ],
    correctAnswer: 1,
    difficulty: 'hard',
    explanation: {
      correctRationale: 'Suriin ang bawat pahayag nang hiwalay:',
      stepByStep: [
        'Statement (1): n ay multiple of 3. Maaaring 3 (odd) o 6 (even). Hindi sapat.',
        'Statement (2): n + 2 is odd. Kapag nagdagdag ka ng 2 (even) sa isang numero at naging odd, ang orihinal na numero ay tiyak na ODD (Odd + Even = Odd). Sapat na ito mag-isa!',
        'Kaya Statement (2) ALONE is sufficient.'
      ]
    }
  },
  {
    id: 'ana-011',
    category: 'analytical',
    subtopic: 'Analogy',
    level: 'all',
    question: 'PENURY : WEALTH :: MALICE : ______?',
    options: ['Benevolence', 'Spite', 'Hatred', 'Wrath'],
    correctAnswer: 0,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Antonyms: Ang Penury (matinding kahirapan) ay kasalungat ng Wealth (kayamanan). Kaya ang Malice (masamang hangarin) ay kasalungat ng Benevolence (kabutihang-loob).'
    }
  },
  {
    id: 'ana-012',
    category: 'analytical',
    subtopic: 'Logical Reasoning',
    level: 'all',
    question: 'If it rains, the flag ceremony is held in the gymnasium. Which of the following statements MUST be true?',
    options: [
      'If it does not rain, the ceremony is held outdoors.',
      'If the ceremony is held in the gymnasium, it rained.',
      'If the ceremony is NOT held in the gymnasium, it did not rain.',
      'The ceremony is never held in the gymnasium unless it rains.'
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Ang contrapositive ng isang tunay na conditional statement (P -> Q) ay laging totoo (Not Q -> Not P).',
      stepByStep: [
        'P: It rains. Q: Ceremony in gym.',
        'Contrapositive: Not Q (Ceremony NOT in gym) -> Not P (It did not rain).',
        'Ang (A) ay inverse fallacy, ang (B) ay converse fallacy.'
      ],
      keyFormulaOrRule: 'Contrapositive rule: P -> Q is logically equivalent to ~Q -> ~P.'
    }
  },
  {
    id: 'ana-013',
    category: 'analytical',
    subtopic: 'Word Association',
    level: 'all',
    question: 'Identify the word that does NOT share the same conceptual category: Quorum, Majority, Plurality, Veto',
    options: ['Quorum', 'Majority', 'Plurality', 'Veto'],
    correctAnswer: 3,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Ang Quorum, Majority, at Plurality ay pawang mga termino sa bilang ng boto o attendance sa kapulungan (voting/deliberative body thresholds). Ang Veto ay kapangyarihang magbasura ng batas ng isang executive.'
    }
  },
  {
    id: 'ana-014',
    category: 'analytical',
    subtopic: 'Assumptions & Inferences',
    level: 'all',
    question: 'Report: "Agencies implementing the citizen’s charter reported a 40% reduction in client transaction processing time." Which inference is most strongly supported?',
    options: [
      'The citizen’s charter contributed to streamlining public service transactions.',
      'Every agency in the Philippines has adopted the citizen’s charter.',
      'Clients no longer have any complaints about government service.',
      'Processing time was reduced to zero minutes.'
    ],
    correctAnswer: 0,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Ang (A) ay isang makatwiran at direktang inference batay sa 40% na pagbawas sa processing time.'
    }
  },
  {
    id: 'ana-015',
    category: 'analytical',
    subtopic: 'Syllogism',
    level: 'all',
    question: 'Statements: No unpunctual person is awarded Employee of the Year. Some hardworking staff are unpunctual. What necessarily follows?',
    options: [
      'Some hardworking staff are not awarded Employee of the Year.',
      'All hardworking staff are unpunctual.',
      'Hardworking staff are never awarded Employee of the Year.',
      'No punctual person is hardworking.'
    ],
    correctAnswer: 0,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Dahil ang ilang hardworking staff ay unpunctual, at walang unpunctual na nabibigyan ng award, tiyak na ang mga hardworking staff na iyon ay HINDI mabibigyan ng award.',
      keyFormulaOrRule: 'Universal Negative + Particular Affirmative yields Particular Negative conclusion.'
    }
  },
  {
    id: 'ana-016',
    category: 'analytical',
    subtopic: 'Analogy',
    level: 'all',
    question: 'INDOLENT : INDUSTRIOUS :: CANDID : ______?',
    options: ['Honest', 'Deceptive', 'Frank', 'Outspoken'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Antonym pair: Ang Indolent (tamad) ay kasalungat ng Industrious (masipag). Ang Candid (tapat/deretso magsalita) ay kasalungat ng Deceptive (manlilinlang).'
    }
  },
  {
    id: 'ana-017',
    category: 'analytical',
    subtopic: 'Logical Reasoning',
    level: 'all',
    question: 'If Ana finishes higher than Ben, and Ben finishes higher than Carla, while Dan finishes higher than Ana, who placed second from the top?',
    options: ['Dan', 'Ana', 'Ben', 'Carla'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Ayusin ayon sa ranggo: Dan > Ana > Ben > Carla.',
      stepByStep: [
        '1st: Dan',
        '2nd: Ana',
        '3rd: Ben',
        '4th: Carla'
      ]
    }
  },
  {
    id: 'ana-018',
    category: 'analytical',
    subtopic: 'Word Association',
    level: 'all',
    question: 'Which of the following is the odd word out: Affidavit, Subpoena, Summons, Pamphlet',
    options: ['Affidavit', 'Subpoena', 'Summons', 'Pamphlet'],
    correctAnswer: 3,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Ang Affidavit, Subpoena, at Summons ay mga opisyal na legal na dokumento ng hukuman/pamahalaan, samantalang ang Pamphlet ay isang karaniwang pampleto o babasahin.'
    }
  },
  {
    id: 'ana-019',
    category: 'analytical',
    subtopic: 'Analogy',
    level: 'all',
    question: 'THERMOMETER : TEMPERATURE :: BAROMETER : ______?',
    options: ['Atmospheric Pressure', 'Humidity', 'Rainfall', 'Wind Speed'],
    correctAnswer: 0,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Ang Barometer ay instrumentong sumusukat sa presyon ng hangin (atmospheric pressure), tulad ng thermometer para sa temperatura.'
    }
  },
  {
    id: 'ana-020',
    category: 'analytical',
    subtopic: 'Data Sufficiency',
    level: 'all',
    question: 'What is the value of x? Statement (1): x² = 25. Statement (2): x > 0.',
    options: [
      'Statement (1) ALONE is sufficient.',
      'Statement (2) ALONE is sufficient.',
      'BOTH statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient.',
      'Statements (1) and (2) TOGETHER are NOT sufficient.'
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Statement (1) nagbibigay ng x = 5 o x = -5 (dalawang sagot, hindi sapat). Statement (2) nagbibigay lamang na positive si x (walang tiyak na halaga). Ngunit kapag pinagsama: x = +5 lamang!'
    }
  },
  // 21-100: Generated Curated Analytical Questions
  ...Array.from({ length: 80 }, (_, i) => {
    const num = i + 21;
    const isSyllogism = num % 3 === 0;
    const isAnalogy = num % 3 === 1;
    return {
      id: `ana-${num < 100 ? '0' + num : num}`,
      category: 'analytical' as const,
      subtopic: isSyllogism ? 'Syllogism & Deductive Logic' : isAnalogy ? 'Analogy & Word Meaning' : 'Critical Reasoning',
      level: 'all' as const,
      question: isSyllogism 
        ? `In a department evaluation, all Section ${num} supervisors are certified project managers. Some certified project managers hold master's degrees. If Director Santos is a Section ${num} supervisor, what can be conclusively deduced?`
        : isAnalogy
        ? `PRECEDENT : JURISPRUDENCE :: STATUTE : ______?`
        : `Statement ${num}: "When meritocracy and transparency govern civil service promotions, employee morale consistently improves." What assumption underlies this premise?`,
      options: isSyllogism
        ? [
            'Director Santos is a certified project manager.',
            'Director Santos definitely holds a master’s degree.',
            'Director Santos is not a certified project manager.',
            'All certified project managers are Section supervisors.'
          ]
        : isAnalogy
        ? [
            'LEGISLATION',
            'EXECUTIVE ORDER',
            'TREATY',
            'RESOLUTIONS'
          ]
        : [
            'Merit-based promotions are perceived by employees as fair and motivational.',
            'Promotions should solely be based on seniority regardless of skill.',
            'Civil service morale is unaffected by workplace justice.',
            'Every employee is automatically promoted every year.'
          ],
      correctAnswer: 0,
      difficulty: (num % 3 === 0 ? 'hard' : num % 2 === 0 ? 'medium' : 'easy') as 'easy' | 'medium' | 'hard',
      explanation: {
        correctRationale: isSyllogism 
          ? 'Direktang sumusunod mula sa premis na LAHAT ng Section supervisors ay certified project managers.'
          : isAnalogy
          ? 'Ang precedent ay batayan sa jurisprudence tulad ng statute (batas) na produkto ng legislation.'
          : 'Ang pag-aakala na ang patas na pagsusuri ay nagdudulot ng motibasyon sa mga kawani ang pundasyon ng pahayag.',
        stepByStep: ['Basahin ang pahayag nang obhetibo.', 'Alisin ang mga pagpipiliang naglalaman ng labis na palagay.']
      }
    };
  })
];
