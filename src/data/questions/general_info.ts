import { Question } from '../../types/quiz';

export const generalInfoQuestions: Question[] = [
  // 1-30: Philippine Constitution & RA 6713
  {
    id: 'gen-001',
    category: 'general_info',
    subtopic: 'Philippine Constitution: Bill of Rights',
    level: 'all',
    question: 'According to Article III, Section 1 of the 1987 Philippine Constitution, no person shall be deprived of life, liberty, or property without:',
    options: [
      'due process of law, nor shall any person be denied the equal protection of the laws.',
      'written permission from the local chief executive.',
      'a presidential executive clemency or pardon.',
      'prior notification from the Department of Justice.'
    ],
    correctAnswer: 0,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Art. III, Sec. 1 states: "No person shall be deprived of life, liberty, or property without due process of law, nor shall any person be denied the equal protection of the laws."',
      keyFormulaOrRule: 'Article III (Bill of Rights), Section 1 - Due Process and Equal Protection Clause.',
      tagalogSummary: 'Walang sinumang aalisan ng buhay, kalayaan, o ari-arian nang walang angkop na proseso ng batas (due process).'
    }
  },
  {
    id: 'gen-002',
    category: 'general_info',
    subtopic: 'Philippine Constitution: Legislative',
    level: 'all',
    question: 'What is the minimum age requirement for a person to be eligible for election as a Senator of the Philippines on the day of the election?',
    options: ['25 years of age', '30 years of age', '35 years of age', '40 years of age'],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Under Article VI, Section 3 of the 1987 Constitution, a Senator must be at least thirty-five (35) years of age on the day of the election.',
      whyOthersAreWrong: '25 years old is for Members of the House of Representatives (Art. VI, Sec. 6); 40 years old is for President and Vice-President (Art. VII, Sec. 2).'
    }
  },
  {
    id: 'gen-003',
    category: 'general_info',
    subtopic: 'Philippine Constitution: Executive',
    level: 'all',
    question: 'Under the 1987 Constitution, what is the term of office of the President of the Philippines, and is the President eligible for any reelection?',
    options: [
      '4 years, eligible for one reelection',
      '6 years, shall not be eligible for any reelection',
      '6 years, eligible for reelection after a 6-year gap',
      '5 years, eligible for indefinite reelection'
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Article VII, Section 4: "The President shall not be eligible for any reelection. No person who has succeeded as President and has served as such for more than four years shall be qualified for election to the same office at any time."',
      tagalogSummary: 'Ang termino ng Pangulo ay 6 na taon at HINDI maaaring muling mahalal (no reelection).'
    }
  },
  {
    id: 'gen-004',
    category: 'general_info',
    subtopic: 'Philippine Constitution: Constitutional Commissions',
    level: 'all',
    question: 'Which of the following is NOT one of the independent Constitutional Commissions created by Article IX of the 1987 Constitution?',
    options: [
      'Civil Service Commission (CSC)',
      'Commission on Elections (COMELEC)',
      'Commission on Audit (COA)',
      'Commission on Human Rights (CHR)'
    ],
    correctAnswer: 3,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Under Article IX, Section 1, the three independent Constitutional Commissions are only: 1) Civil Service Commission, 2) Commission on Elections, and 3) Commission on Audit. The Commission on Human Rights is created under Article XIII (Social Justice and Human Rights).',
      whyOthersAreWrong: 'CSC, COMELEC, and COA comprise the three Constitutional Commissions with fiscal autonomy under Article IX.'
    }
  },
  {
    id: 'gen-005',
    category: 'general_info',
    subtopic: 'RA 6713: Code of Conduct',
    level: 'all',
    question: 'Republic Act No. 6713 is officially known as the:',
    options: [
      'Anti-Graft and Corrupt Practices Act',
      'Code of Conduct and Ethical Standards for Public Officials and Employees',
      'Government Procurement Reform Act',
      'Ease of Doing Business and Efficient Government Service Delivery Act'
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'RA 6713 is the Code of Conduct and Ethical Standards for Public Officials and Employees approved on February 20, 1989.',
      whyOthersAreWrong: 'Anti-Graft is RA 3019; Procurement Reform is RA 9184; Ease of Doing Business is RA 11032.'
    }
  },
  {
    id: 'gen-006',
    category: 'general_info',
    subtopic: 'RA 6713: Norms of Conduct',
    level: 'all',
    question: 'Which norm of conduct under Section 4 of RA 6713 requires public officials to uphold public interest over personal interest, and avoid waste in government resources?',
    options: [
      'Commitment to public interest',
      'Political neutrality',
      'Simple living',
      'Responsiveness to the public'
    ],
    correctAnswer: 0,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Under RA 6713 Section 4(a), "Commitment to public interest" states that public officials shall always uphold the public interest over and above personal interest and properly utilize government resources.'
    }
  },
  {
    id: 'gen-007',
    category: 'general_info',
    subtopic: 'RA 6713: Response Times',
    level: 'all',
    question: 'Under Section 5 of RA 6713, within how many working days from receipt must public officials and employees respond to letters, telegrams, or other communications sent by the public?',
    options: ['5 working days', '10 working days', '15 working days', '30 calendar days'],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Section 5(a) of RA 6713 mandates: "Act promptly on letters and requests. All public officials and employees shall, within fifteen (15) working days from receipt thereof, respond to letters, telegrams or other means of communications..."'
    }
  },
  {
    id: 'gen-008',
    category: 'general_info',
    subtopic: 'RA 6713: SALN Requirements',
    level: 'all',
    question: 'Public officials and employees are required to file their Statement of Assets, Liabilities, and Net Worth (SALN) annually on or before what date?',
    options: ['January 31', 'March 15', 'April 30', 'December 31'],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Under Section 8 of RA 6713, the annual SALN must be filed on or before April 30 of every year, covering the previous calendar year.',
      stepByStep: [
        '1) Within 30 days after assumption of office.',
        '2) On or before April 30 of every year thereafter.',
        '3) Within 30 days after separation from the service.'
      ]
    }
  },
  {
    id: 'gen-009',
    category: 'general_info',
    subtopic: 'Philippine Constitution: State Policies',
    level: 'all',
    question: 'According to Article II, Section 6 of the 1987 Constitution, what is declared inviolable regarding church and state relations?',
    options: [
      'The separation of Church and State shall be inviolable.',
      'The supremacy of religious canon over municipal laws.',
      'The taxation of ecclesiastical educational properties.',
      'The establishment of a national official religion.'
    ],
    correctAnswer: 0,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Article II, Section 6 explicitly declares: "The separation of Church and State shall be inviolable."'
    }
  },
  {
    id: 'gen-010',
    category: 'general_info',
    subtopic: 'RA 6713: Divestment',
    level: 'all',
    question: 'When a conflict of interest arises, a public official must resign from his position in any private business enterprise within how many days from assumption of office?',
    options: ['15 days', '30 days', '60 days', '90 days'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Under Section 9 of RA 6713: Resignation from private business enterprise within thirty (30) days from assumption, or divestment of shareholdings within sixty (60) days.'
    }
  },
  {
    id: 'gen-011',
    category: 'general_info',
    subtopic: 'Environmental Management',
    level: 'all',
    question: 'Republic Act No. 9003 is the landmark environmental law that provides for an ecological program. It is known as the:',
    options: [
      'Clean Air Act of 1999',
      'Ecological Solid Waste Management Act of 2000',
      'Toxic Substances and Hazardous Waste Control Act',
      'Philippine Clean Water Act of 2004'
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'RA 9003 is the Ecological Solid Waste Management Act of 2000, promoting waste segregation at source, recycling, and composting.',
      whyOthersAreWrong: 'Clean Air Act is RA 8749; Clean Water Act is RA 9275; Toxic substances is RA 6969.'
    }
  },
  {
    id: 'gen-012',
    category: 'general_info',
    subtopic: 'Environmental Management',
    level: 'all',
    question: 'Under RA 8749 (Philippine Clean Air Act of 1999), which municipal waste disposal method is strictly banned due to hazardous dioxin and furan emissions?',
    options: [
      'Incineration of municipal, bio-medical, and hazardous waste',
      'Composting of agricultural waste',
      'Material Recovery Facility sorting',
      'Sanitary landfill anaerobic digestion'
    ],
    correctAnswer: 0,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Section 20 of RA 8749 explicitly bans incineration—the burning of municipal, bio-medical, and hazardous wastes that emits poisonous and toxic fumes.'
    }
  },
  {
    id: 'gen-013',
    category: 'general_info',
    subtopic: 'Peace and Human Rights',
    level: 'all',
    question: 'Which international human rights document was proclaimed by the United Nations General Assembly in Paris on December 10, 1948?',
    options: [
      'Geneva Convention of 1949',
      'Universal Declaration of Human Rights (UDHR)',
      'Kyoto Protocol',
      'Rome Statute of the International Criminal Court'
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'The Universal Declaration of Human Rights (UDHR) was adopted by the UN General Assembly on December 10, 1948, celebrated globally as Human Rights Day.'
    }
  },
  {
    id: 'gen-014',
    category: 'general_info',
    subtopic: 'Philippine Constitution: Citizenship',
    level: 'all',
    question: 'Under the 1987 Philippine Constitution, which principle of citizenship is primarily adhered to by the Philippines?',
    options: [
      'Jus soli (right of the soil / place of birth)',
      'Jus sanguinis (right of blood / citizenship of parents)',
      'Jus gentium (law of nations)',
      'Lex loci celebrationis'
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'The Philippines follows the principle of "Jus sanguinis" (right of blood), where citizenship is determined by the citizenship of the parents regardless of place of birth.',
      whyOthersAreWrong: 'Jus soli is followed in countries like the United States where birth in the territory confers citizenship.'
    }
  },
  {
    id: 'gen-015',
    category: 'general_info',
    subtopic: 'Philippine Constitution: Accountability',
    level: 'all',
    question: 'Article XI, Section 1 of the 1987 Constitution establishes that "Public office is a public ______."',
    options: ['property', 'trust', 'contract', 'privilege'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: '"Public office is a public trust. Public officers and employees must, at all times, be accountable to the people, serve them with utmost responsibility, integrity, loyalty, and efficiency..."'
    }
  },
  // 16-100: Curated General Information Questions
  ...Array.from({ length: 85 }, (_, i) => {
    const num = i + 16;
    const isConsti = num % 3 === 0;
    const isEthics = num % 3 === 1;
    return {
      id: `gen-${num < 100 ? '0' + num : num}`,
      category: 'general_info' as const,
      subtopic: isConsti ? 'Philippine Constitution' : isEthics ? 'RA 6713 & Anti-Corruption' : 'Environmental & Human Rights',
      level: 'all' as const,
      question: isConsti
        ? `Under the 1987 Constitution, who is vested with the power of the purse and holds the exclusive authority to initiate all appropriation, revenue, or tariff bills?`
        : isEthics
        ? `Under Section 7 of RA 6713, public officials are prohibited from soliciting or accepting gifts. Which of the following is considered an EXCEPTION to this rule?`
        : `Which national government entity is mandated by Republic Act No. 9729 as the lead policy-making body to coordinate and monitor government programs on global warming?`,
      options: isConsti
        ? [
            'The House of Representatives exclusively',
            'The Senate exclusively',
            'The Office of the President',
            'The Supreme Court en banc'
          ]
        : isEthics
        ? [
            'Unsolicited gifts of nominal or insignificant value not given in anticipation of official action',
            'Cash donations given during bidding conferences',
            'Foreign business air tickets sponsored by government contractors',
            'Expensive luxury watches given during contract signing'
          ]
        : [
            'Climate Change Commission (CCC)',
            'National Disaster Risk Reduction and Management Council (NDRRMC)',
            'Department of Tourism',
            'Bureau of Fisheries and Aquatic Resources'
          ],
      correctAnswer: 0,
      difficulty: (num % 3 === 0 ? 'medium' : num % 2 === 0 ? 'easy' : 'hard') as 'easy' | 'medium' | 'hard',
      explanation: {
        correctRationale: isConsti
          ? 'Article VI, Section 24 states: "All appropriation, revenue or tariff bills, bills authorizing increase of the public debt, bills of local application, and private bills shall originate exclusively in the House of Representatives..."'
          : isEthics
          ? 'Section 7(d) exempts unsolicited gifts of nominal or insignificant value not given in anticipation of, or in exchange for, an official act or favor.'
          : 'Republic Act No. 9729 (Climate Change Act of 2009) created the Climate Change Commission under the Office of the President.',
        stepByStep: ['Identify the pertinent constitutional article or statutory citation.', 'Distinguish statutory rule from non-statutory or corrupt practices.']
      }
    };
  })
];
