import type { Question } from '../../types/quiz';

export const freeQuestions: Question[] = [
  {
    "id": "num-001",
    "category": "numerical",
    "subtopic": "Number Sequence",
    "level": "all",
    "question": "Find the next number in the series: 3, 7, 15, 31, 63, ___?",
    "options": [
      "95",
      "127",
      "125",
      "120"
    ],
    "correctAnswer": 1,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Ang pattern ay (n × 2) + 1 o kaya ang dagdag ay dumodoble: +4, +8, +16, +32, +64.",
      "stepByStep": [
        "3 × 2 + 1 = 7",
        "7 × 2 + 1 = 15",
        "15 × 2 + 1 = 31",
        "31 × 2 + 1 = 63",
        "63 × 2 + 1 = 127"
      ],
      "keyFormulaOrRule": "Next = 2n + 1 o Difference: +4, +8, +16, +32, +64 (63 + 64 = 127)",
      "whyOthersAreWrong": "Ang 95 ay nag-add lamang ng 32 muli. Ang 125 ay 63 + 62 lamang."
    }
  },
  {
    "id": "num-002",
    "category": "numerical",
    "subtopic": "Number Sequence",
    "level": "all",
    "question": "Complete the sequence: 2, 5, 10, 17, 26, ___?",
    "options": [
      "35",
      "37",
      "39",
      "41"
    ],
    "correctAnswer": 1,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Ang pagitan ng bawat numero ay sunod-sunod na odd numbers: +3, +5, +7, +9, +11. O n² + 1.",
      "stepByStep": [
        "1² + 1 = 2",
        "2² + 1 = 5",
        "3² + 1 = 10",
        "4² + 1 = 17",
        "5² + 1 = 26",
        "6² + 1 = 37"
      ],
      "keyFormulaOrRule": "n² + 1 para sa n = 1, 2, 3, 4, 5, 6...",
      "whyOthersAreWrong": "35 ay +9 lamang; 39 ay +13 agad na lumaktaw."
    }
  },
  {
    "id": "num-003",
    "category": "numerical",
    "subtopic": "Number Sequence",
    "level": "all",
    "question": "What is the missing term: 100, 96, 88, 76, 60, ___?",
    "options": [
      "40",
      "44",
      "42",
      "48"
    ],
    "correctAnswer": 0,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Ang bawas ay dumarami ng multiples of 4: -4, -8, -12, -16, -20.",
      "stepByStep": [
        "100 - 4 = 96",
        "96 - 8 = 88",
        "88 - 12 = 76",
        "76 - 16 = 60",
        "60 - 20 = 40"
      ],
      "keyFormulaOrRule": "Common difference of differences = -4 bawat hakbang."
    }
  },
  {
    "id": "num-004",
    "category": "numerical",
    "subtopic": "Number Sequence",
    "level": "all",
    "question": "Determine the next fraction in the series: 1/2, 2/3, 3/5, 5/8, 8/13, ___?",
    "options": [
      "11/19",
      "13/21",
      "12/20",
      "13/24"
    ],
    "correctAnswer": 1,
    "difficulty": "medium",
    "explanation": {
      "correctRationale": "Ang numerator at denominator ay sumusunod sa Fibonacci sequence (1, 2, 3, 5, 8, 13, 21).",
      "stepByStep": [
        "Numerator sequence: 1, 2, 3, 5, 8, susunod ay 13",
        "Denominator sequence: 2, 3, 5, 8, 13, susunod ay 21",
        "Kaya ang sagot ay 13/21."
      ],
      "keyFormulaOrRule": "Fibonacci: F(n) = F(n-1) + F(n-2)"
    }
  },
  {
    "id": "num-005",
    "category": "numerical",
    "subtopic": "Basic Operations",
    "level": "all",
    "question": "Simplify using order of operations (PEMDAS): 18 ÷ 3 × (4 + 2) - 5² + 10 = ?",
    "options": [
      "21",
      "19",
      "25",
      "17"
    ],
    "correctAnswer": 0,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Sundin ang Parentheses -> Exponents -> Multiplication/Division (left to right) -> Addition/Subtraction (left to right).",
      "stepByStep": [
        "1) Parentheses: (4 + 2) = 6",
        "2) Exponents: 5² = 25",
        "3) Expresyon ngayon: 18 ÷ 3 × 6 - 25 + 10",
        "4) Divide/Multiply left to right: 18 ÷ 3 = 6; 6 × 6 = 36",
        "5) Add/Subtract left to right: 36 - 25 = 11; 11 + 10 = 21"
      ],
      "keyFormulaOrRule": "PEMDAS Rule: laging unahin ang multiplication at division kaliwa pakanan."
    }
  },
  {
    "id": "num-006",
    "category": "numerical",
    "subtopic": "Fractions & Decimals",
    "level": "all",
    "question": "Which of the following fractions has the greatest value: 3/5, 5/8, 7/11, 2/3?",
    "options": [
      "3/5",
      "5/8",
      "7/11",
      "2/3"
    ],
    "correctAnswer": 3,
    "difficulty": "medium",
    "explanation": {
      "correctRationale": "I-convert ang bawat fraction sa decimal upang madaling maikumpara:",
      "stepByStep": [
        "3/5 = 0.600",
        "5/8 = 0.625",
        "7/11 ≈ 0.636",
        "2/3 ≈ 0.667 (Pinakamataas)"
      ],
      "keyFormulaOrRule": "Cross-multiplication o decimal conversion."
    }
  },
  {
    "id": "num-007",
    "category": "numerical",
    "subtopic": "Fractions & Decimals",
    "level": "all",
    "question": "Evaluate: 3 1/4 - 1 5/6 + 2 1/2 = ?",
    "options": [
      "3 11/12",
      "4 1/12",
      "3 5/12",
      "4 5/12"
    ],
    "correctAnswer": 0,
    "difficulty": "medium",
    "explanation": {
      "correctRationale": "Hanapin ang Least Common Denominator (LCD) ng 4, 6, at 2, na 12.",
      "stepByStep": [
        "3 1/4 = 3 3/12",
        "1 5/6 = 1 10/12",
        "2 1/2 = 2 6/12",
        "(3 - 1 + 2) + (3 - 10 + 6)/12 = 4 + (-1/12) = 3 11/12."
      ]
    }
  },
  {
    "id": "num-008",
    "category": "numerical",
    "subtopic": "Percentage & Discount",
    "level": "all",
    "question": "An office chair marked at ₱4,500 is sold with a 20% trade discount. If a 5% cash discount is further applied on the discounted price, what is the net price?",
    "options": [
      "₱3,375",
      "₱3,420",
      "₱3,500",
      "₱3,600"
    ],
    "correctAnswer": 1,
    "difficulty": "medium",
    "explanation": {
      "correctRationale": "I-apply nang sunod-sunod (successive discount) at huwag basta ipagsama ang 20% at 5%.",
      "stepByStep": [
        "Unang bawas (20%): ₱4,500 × 0.80 = ₱3,600",
        "Pangalawang bawas (5% ng ₱3,600): ₱3,600 × 0.95 = ₱3,420"
      ],
      "keyFormulaOrRule": "Net = Marked Price × (1 - d1) × (1 - d2)"
    }
  },
  {
    "id": "num-009",
    "category": "numerical",
    "subtopic": "Percentage & Discount",
    "level": "all",
    "question": "In a government department of 160 employees, 65% are permanent, 25% are casual, and the rest are contractual. How many contractual employees are there?",
    "options": [
      "12",
      "16",
      "18",
      "20"
    ],
    "correctAnswer": 1,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Kabuuan ng permanent at casual ay 65% + 25% = 90%. Ang natitirang contractual ay 10%.",
      "stepByStep": [
        "100% - 90% = 10%",
        "10% ng 160 = 0.10 × 160 = 16 empleyado."
      ]
    }
  },
  {
    "id": "num-010",
    "category": "numerical",
    "subtopic": "Percentage & Discount",
    "level": "all",
    "question": "A government agency’s budget was increased from ₱12,000,000 to ₱15,000,000. What was the percentage increase?",
    "options": [
      "20%",
      "25%",
      "30%",
      "33.3%"
    ],
    "correctAnswer": 1,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Percentage Increase = (Pagbabago ÷ Orihinal na Halaga) × 100%.",
      "stepByStep": [
        "Pagbabago = 15,000,000 - 12,000,000 = 3,000,000",
        "Increase % = (3,000,000 ÷ 12,000,000) × 100% = 1/4 × 100% = 25%."
      ]
    }
  },
  {
    "id": "num-011",
    "category": "numerical",
    "subtopic": "Ratio and Proportion",
    "level": "all",
    "question": "The ratio of males to females in an examination room is 3:5. If there are 30 females, how many examinees are in the room altogether?",
    "options": [
      "45",
      "48",
      "50",
      "52"
    ],
    "correctAnswer": 1,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Hatiin ang bilang ng babae sa ratio unit ng babae: 30 ÷ 5 = 6 kada bahagi.",
      "stepByStep": [
        "1 unit = 30 ÷ 5 = 6 examinees",
        "Lalaki = 3 × 6 = 18 examinees",
        "Kabuuan = 18 + 30 = 48 examinees (o kabuuang ratio 3+5 = 8; 8 × 6 = 48)."
      ]
    }
  },
  {
    "id": "num-012",
    "category": "numerical",
    "subtopic": "Ratio and Proportion",
    "level": "all",
    "question": "A budget of ₱72,000 is to be partitioned among three regional units in the ratio 2 : 3 : 4. How much will the unit with the largest share receive?",
    "options": [
      "₱24,000",
      "₱32,000",
      "₱36,000",
      "₱28,000"
    ],
    "correctAnswer": 1,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Kuhanin ang kabuuang bilang ng ratio units: 2 + 3 + 4 = 9 units.",
      "stepByStep": [
        "Halaga ng 1 unit = ₱72,000 ÷ 9 = ₱8,000",
        "Pinakamalaking bahagi (4 units) = 4 × ₱8,000 = ₱32,000."
      ]
    }
  },
  {
    "id": "num-013",
    "category": "numerical",
    "subtopic": "Word Problems: Age",
    "level": "all",
    "question": "Maria is currently 4 times as old as her son. In 20 years, she will be twice as old as her son. What is Maria’s present age?",
    "options": [
      "36",
      "40",
      "44",
      "48"
    ],
    "correctAnswer": 1,
    "difficulty": "medium",
    "explanation": {
      "correctRationale": "Bumuo ng algebraic equation batay sa kasalukuyan at hinaharap.",
      "stepByStep": [
        "Hayaan si x = kasalukuyang edad ng anak. Edad ni Maria = 4x.",
        "Makalipas ang 20 taon: Edad ng anak = x + 20, Maria = 4x + 20.",
        "Equation: 4x + 20 = 2(x + 20)",
        "4x + 20 = 2x + 40",
        "2x = 20 => x = 10 (edad ng anak ngayon)",
        "Edad ni Maria ngayon = 4 × 10 = 40 taong gulang."
      ]
    }
  },
  {
    "id": "ana-001",
    "category": "analytical",
    "subtopic": "Syllogism",
    "level": "all",
    "question": "Statements: All government employees are civil servants. Some civil servants are lawyers. Conclusion I: Some government employees are lawyers. Conclusion II: All lawyers are government employees. Which conclusion logically follows?",
    "options": [
      "Only Conclusion I follows",
      "Only Conclusion II follows",
      "Both Conclusion I and II follow",
      "Neither Conclusion I nor II follows"
    ],
    "correctAnswer": 3,
    "difficulty": "medium",
    "explanation": {
      "correctRationale": "Neither follows necessarily. Dahil ang \"Some civil servants are lawyers\" ay maaaring tumukoy sa civil servants na hindi government employees o labas sa bilog ng government employees.",
      "stepByStep": [
        "All G are C (buong bilog ng G ay nasa loob ng C).",
        "Some C are L (ang bilog ng L ay may overlap sa C, ngunit hindi garantisadong tatama sa G).",
        "Kaya hindi tiyak kung may G na L, at tiyak na hindi lahat ng L ay G."
      ],
      "keyFormulaOrRule": "Universal Affirmative + Particular Affirmative does not automatically link outer terms."
    }
  },
  {
    "id": "ana-002",
    "category": "analytical",
    "subtopic": "Syllogism",
    "level": "all",
    "question": "Statements: All applicants must submit Form 212. Juan submitted Form 212. What can be definitively concluded?",
    "options": [
      "Juan is an applicant.",
      "Juan is guaranteed to be hired.",
      "Juan might or might not be an applicant.",
      "Anyone who submits Form 212 is disqualified."
    ],
    "correctAnswer": 2,
    "difficulty": "medium",
    "explanation": {
      "correctRationale": "Pansinin ang fallacy of affirming the consequent (A -> B does not mean B -> A).",
      "stepByStep": [
        "Kondisyon: Kung aplikante ka, kailangan mong magpasa ng Form 212.",
        "Hindi sinabi na aplikante LAMANG ang maaaring magpasa.",
        "Kaya posibleng si Juan ay aplikante, o nagpasa siya para sa ibang layunin o nagkamali."
      ],
      "whyOthersAreWrong": "Karaniwang pagkakamali ang piliin ang (A), ngunit sa pormal na lohika ito ay affirming the consequent."
    }
  },
  {
    "id": "ana-003",
    "category": "analytical",
    "subtopic": "Analogy",
    "level": "all",
    "question": "CONSTITUTION : NATION :: BYLAWS : ______?",
    "options": [
      "Government",
      "Corporation / Organization",
      "President",
      "Judiciary"
    ],
    "correctAnswer": 1,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Ang Saligang Batas (Constitution) ay ang pinakamataas na tuntunin ng isang bansa, tulad ng mga Bylaws na saligang tuntunin ng isang korporasyon o organisasyon.",
      "keyFormulaOrRule": "Analogy relationship: Governing legal framework to its respective governing entity."
    }
  },
  {
    "id": "ana-004",
    "category": "analytical",
    "subtopic": "Analogy",
    "level": "all",
    "question": "COURT : ADJUDICATE :: LEGISLATURE : ______?",
    "options": [
      "Enforce",
      "Enact",
      "Prosecute",
      "Veto"
    ],
    "correctAnswer": 1,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Ang tungkulin ng Korte (Judiciary) ay mag-adjudicate (humatol), samantalang ang tungkulin ng Lehislatura ay mag-enact (magpatibay ng batas).",
      "whyOthersAreWrong": "Ang mag-enforce ay tungkulin ng Executive; ang veto ay kapangyarihan ng Pangulo."
    }
  },
  {
    "id": "ana-005",
    "category": "analytical",
    "subtopic": "Word Association",
    "level": "all",
    "question": "Which of the following words does NOT belong with the others in the group?",
    "options": [
      "Graft",
      "Integrity",
      "Embezzlement",
      "Bribery"
    ],
    "correctAnswer": 1,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Ang \"Integrity\" ay isang positibong katangian at kabutihang-asal (virtue/standard sa ilalim ng RA 6713), samantalang ang Graft, Embezzlement, at Bribery ay pawang mga krimen ng katiwalian (corrupt practices)."
    }
  },
  {
    "id": "ana-006",
    "category": "analytical",
    "subtopic": "Word Association",
    "level": "all",
    "question": "Choose the odd one out: Audit, Inspection, Evaluation, Embellishment",
    "options": [
      "Audit",
      "Inspection",
      "Evaluation",
      "Embellishment"
    ],
    "correctAnswer": 3,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Ang Audit, Inspection, at Evaluation ay mga opisyal na paraan ng pagsusuri at pagsisiyasat sa pamahalaan. Ang \"Embellishment\" ay nangangahulugang pagpapakitang-tao o pagpapaganda nang labis."
    }
  },
  {
    "id": "ana-007",
    "category": "analytical",
    "subtopic": "Logical Reasoning: Seating Arrangement",
    "level": "all",
    "question": "Five government directors—A, B, C, D, and E—are seated in a row facing the audience. C is to the immediate right of B. E is to the left of A and immediate right of D. If B is to the right of A, who is sitting in the exact middle?",
    "options": [
      "A",
      "B",
      "C",
      "D"
    ],
    "correctAnswer": 0,
    "difficulty": "hard",
    "explanation": {
      "correctRationale": "I-plot ang posisyon batay sa mga pahiwatig (clues).",
      "stepByStep": [
        "Clue 1: E is immediate right of D, left of A => [D, E, A]",
        "Clue 2: B is to the right of A => [D, E, A, B]",
        "Clue 3: C is to the immediate right of B => [D, E, A, B, C]",
        "Ang pagkakasunod-sunod mula kaliwa pakanan ay D - E - A - B - C.",
        "Ang nasa gitna (ikatlo sa 5) ay si A."
      ]
    }
  },
  {
    "id": "ana-008",
    "category": "analytical",
    "subtopic": "Assumptions & Inferences",
    "level": "all",
    "question": "Statement: \"To enhance public transparency, all government procurement bidding notices must be posted on the PhilGEPS portal and agency bulletin boards.\" What is an underlying assumption of this policy?",
    "options": [
      "The public and prospective bidders consult PhilGEPS and agency bulletin boards to access bidding information.",
      "Traditional print newspapers are illegal for publishing bids.",
      "All government bids are conducted without any anomalies.",
      "Only large multinational corporations participate in bidding."
    ],
    "correctAnswer": 0,
    "difficulty": "medium",
    "explanation": {
      "correctRationale": "Ang isang assumption ay ang di-sinasabing saligan upang magkaroon ng saysay ang patakaran. Kung walang nagbabasa o tumitingin sa PhilGEPS o bulletin board, mawawalan ng saysay ang layuning \"to enhance public transparency\"."
    }
  },
  {
    "id": "ana-009",
    "category": "analytical",
    "subtopic": "Analogy",
    "level": "all",
    "question": "IMPEACHMENT : REMOVAL :: CONVICTION : ______?",
    "options": [
      "Indictment",
      "Punishment / Sentence",
      "Arrest",
      "Appeal"
    ],
    "correctAnswer": 1,
    "difficulty": "medium",
    "explanation": {
      "correctRationale": "Cause and effect: Ang layunin at epekto ng tagumpay na impeachment ay removal from office, kung paanong ang resulta ng conviction sa criminal court ay punishment/penalty."
    }
  },
  {
    "id": "ana-010",
    "category": "analytical",
    "subtopic": "Data Sufficiency",
    "level": "all",
    "question": "Question: Is integer n an odd number? Statement (1): n is a multiple of 3. Statement (2): n + 2 is an odd number. To answer the question:",
    "options": [
      "Statement (1) ALONE is sufficient, but Statement (2) alone is not sufficient.",
      "Statement (2) ALONE is sufficient, but Statement (1) alone is not sufficient.",
      "BOTH statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient.",
      "Statements (1) and (2) TOGETHER are NOT sufficient."
    ],
    "correctAnswer": 1,
    "difficulty": "hard",
    "explanation": {
      "correctRationale": "Suriin ang bawat pahayag nang hiwalay:",
      "stepByStep": [
        "Statement (1): n ay multiple of 3. Maaaring 3 (odd) o 6 (even). Hindi sapat.",
        "Statement (2): n + 2 is odd. Kapag nagdagdag ka ng 2 (even) sa isang numero at naging odd, ang orihinal na numero ay tiyak na ODD (Odd + Even = Odd). Sapat na ito mag-isa!",
        "Kaya Statement (2) ALONE is sufficient."
      ]
    }
  },
  {
    "id": "ana-011",
    "category": "analytical",
    "subtopic": "Analogy",
    "level": "all",
    "question": "PENURY : WEALTH :: MALICE : ______?",
    "options": [
      "Benevolence",
      "Spite",
      "Hatred",
      "Wrath"
    ],
    "correctAnswer": 0,
    "difficulty": "medium",
    "explanation": {
      "correctRationale": "Antonyms: Ang Penury (matinding kahirapan) ay kasalungat ng Wealth (kayamanan). Kaya ang Malice (masamang hangarin) ay kasalungat ng Benevolence (kabutihang-loob)."
    }
  },
  {
    "id": "ana-012",
    "category": "analytical",
    "subtopic": "Logical Reasoning",
    "level": "all",
    "question": "If it rains, the flag ceremony is held in the gymnasium. Which of the following statements MUST be true?",
    "options": [
      "If it does not rain, the ceremony is held outdoors.",
      "If the ceremony is held in the gymnasium, it rained.",
      "If the ceremony is NOT held in the gymnasium, it did not rain.",
      "The ceremony is never held in the gymnasium unless it rains."
    ],
    "correctAnswer": 2,
    "difficulty": "medium",
    "explanation": {
      "correctRationale": "Ang contrapositive ng isang tunay na conditional statement (P -> Q) ay laging totoo (Not Q -> Not P).",
      "stepByStep": [
        "P: It rains. Q: Ceremony in gym.",
        "Contrapositive: Not Q (Ceremony NOT in gym) -> Not P (It did not rain).",
        "Ang (A) ay inverse fallacy, ang (B) ay converse fallacy."
      ],
      "keyFormulaOrRule": "Contrapositive rule: P -> Q is logically equivalent to ~Q -> ~P."
    }
  },
  {
    "id": "ana-013",
    "category": "analytical",
    "subtopic": "Word Association",
    "level": "all",
    "question": "Identify the word that does NOT share the same conceptual category: Quorum, Majority, Plurality, Veto",
    "options": [
      "Quorum",
      "Majority",
      "Plurality",
      "Veto"
    ],
    "correctAnswer": 3,
    "difficulty": "medium",
    "explanation": {
      "correctRationale": "Ang Quorum, Majority, at Plurality ay pawang mga termino sa bilang ng boto o attendance sa kapulungan (voting/deliberative body thresholds). Ang Veto ay kapangyarihang magbasura ng batas ng isang executive."
    }
  },
  {
    "id": "vrb-001",
    "category": "verbal",
    "subtopic": "Subject-Verb Agreement",
    "level": "all",
    "question": "The committee, along with several regional directors, ______ reviewing the proposed administrative guidelines.",
    "options": [
      "is",
      "are",
      "were",
      "have been"
    ],
    "correctAnswer": 0,
    "difficulty": "medium",
    "explanation": {
      "correctRationale": "Ang pariralang \"along with several regional directors\" ay isang parenthetical prepositional phrase na hindi nagbabago sa bilang ng tunay na subject (\"The committee\", singular).",
      "stepByStep": [
        "Subject: The committee (singular)",
        "Intervening phrase: along with several regional directors (huwag pansinin sa subject-verb count)",
        "Tamang pandiwa: \"is\" reviewing."
      ],
      "keyFormulaOrRule": "Subject-verb agreement: Intervening phrases such as \"as well as\", \"together with\", \"along with\" do not affect the singular subject."
    }
  },
  {
    "id": "vrb-002",
    "category": "verbal",
    "subtopic": "Subject-Verb Agreement",
    "level": "all",
    "question": "Neither the department secretary nor the division chiefs ______ willing to compromise on ethical standards.",
    "options": [
      "was",
      "were",
      "is",
      "has been"
    ],
    "correctAnswer": 1,
    "difficulty": "medium",
    "explanation": {
      "correctRationale": "Sa \"Neither... nor...\" o \"Either... or...\", ang pandiwa ay sumusunod sa pinakamalapit na subject (Proximity Rule).",
      "stepByStep": [
        "Subjects: \"department secretary\" (singular) at \"division chiefs\" (plural)",
        "Ang mas malapit sa patlang ay \"division chiefs\" (plural)",
        "Kaya ang tamang pandiwa ay \"were\" (o are)."
      ],
      "keyFormulaOrRule": "Rule of Proximity for correlative conjunctions (either... or, neither... nor)."
    }
  },
  {
    "id": "vrb-003",
    "category": "verbal",
    "subtopic": "Vocabulary: Synonyms",
    "level": "all",
    "question": "Choose the word most nearly SYNONYMOUS with \"METICULOUS\" as used in: \"The auditor submitted a meticulous report on municipal fund disbursements.\"",
    "options": [
      "Careless",
      "Thorough and painstaking",
      "Hasty",
      "Superficial"
    ],
    "correctAnswer": 1,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Meticulous means showing great attention to detail; very careful, precise, and thorough.",
      "whyOthersAreWrong": "Careless, hasty, at superficial ay mga kasalungat (antonyms)."
    }
  },
  {
    "id": "vrb-004",
    "category": "verbal",
    "subtopic": "Vocabulary: Antonyms",
    "level": "all",
    "question": "Choose the word most nearly OPPOSITE in meaning to \"EXPEDITE\":",
    "options": [
      "Accelerate",
      "Hasten",
      "Delay or hinder",
      "Facilitate"
    ],
    "correctAnswer": 2,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Ang expedite ay nangangahulugang pabilisin o ayusin nang mabilis ang proseso. Ang kasalungat nito ay delay o hinder (antalahin).",
      "tagalogSummary": "Expedite = pabilisin; Antonym = antalahin / harangan."
    }
  },
  {
    "id": "vrb-005",
    "category": "verbal",
    "subtopic": "Correct Usage",
    "level": "all",
    "question": "Identify the grammatically correct sentence:",
    "options": [
      "Each of the candidates have submitted their credentials.",
      "Each of the candidates has submitted his or her credentials.",
      "Each of the candidates have submitted his credentials.",
      "Each of the candidate has submitted their credentials."
    ],
    "correctAnswer": 1,
    "difficulty": "medium",
    "explanation": {
      "correctRationale": "\"Each\" is an indefinite pronoun that is grammatically singular and requires a singular verb (\"has\") and singular referent (\"his or her\").",
      "whyOthersAreWrong": "Mali ang \"have\" dahil plural ito; mali rin ang \"Each of the candidate\" dahil dapat plural ang noun pagkatapos ng \"of the\"."
    }
  },
  {
    "id": "vrb-006",
    "category": "verbal",
    "subtopic": "Error Identification",
    "level": "all",
    "question": "Identify the underlined portion that contains an error: \"The number of applicants (A) / for the executive position (B) / were surprisingly high (C) / this year. (D) / No error (E)\"",
    "options": [
      "(A)",
      "(B)",
      "(C)",
      "(D)"
    ],
    "correctAnswer": 2,
    "difficulty": "medium",
    "explanation": {
      "correctRationale": "\"The number of\" takes a singular verb, whereas \"A number of\" takes a plural verb. Therefore, \"were\" should be corrected to \"was\".",
      "keyFormulaOrRule": "\"The number of...\" = singular verb (\"was\"). \"A number of...\" = plural verb (\"were\")."
    }
  },
  {
    "id": "vrb-007",
    "category": "verbal",
    "subtopic": "Paragraph Organization",
    "level": "all",
    "question": "Arrange the following sentences to form a coherent, well-structured paragraph:\n1. Consequently, processing backlogs were cut by over sixty percent.\n2. In early 2024, the agency launched its automated document tracking portal.\n3. Public feedback immediately reflected renewed confidence in administrative efficiency.\n4. Prior to the launch, citizens waited up to four weeks for permit issuance.\n5. The system allowed applicants to upload requirements and verify status in real time.",
    "options": [
      "4 - 2 - 5 - 1 - 3",
      "2 - 5 - 4 - 3 - 1",
      "4 - 1 - 2 - 5 - 3",
      "2 - 4 - 1 - 5 - 3"
    ],
    "correctAnswer": 0,
    "difficulty": "hard",
    "explanation": {
      "correctRationale": "Lohikal na pagkakasunod: (4) Ang suliranin bago ang solusyon -> (2) Ang inilunsad na portal -> (5) Paano gumagana ang sistema -> (1) Ang direktang resulta (\"Consequently\") -> (3) Ang pangkalahatang epekto sa tiwala ng publiko.",
      "stepByStep": [
        "Sentence 4 establishes the antecedent problem (citizens waiting 4 weeks).",
        "Sentence 2 introduces the solution launched in 2024.",
        "Sentence 5 elaborates how the system works.",
        "Sentence 1 details the quantitative result (60% cut).",
        "Sentence 3 concludes with public feedback and confidence."
      ]
    }
  },
  {
    "id": "vrb-008",
    "category": "verbal",
    "subtopic": "Vocabulary: Synonyms",
    "level": "all",
    "question": "The public prosecutor questioned the \"VERACITY\" of the witness testimony. The word \"VERACITY\" means:",
    "options": [
      "Eloquence",
      "Truthfulness and accuracy",
      "Emotional appeal",
      "Hostility"
    ],
    "correctAnswer": 1,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Veracity comes from the Latin \"veritas\" (truth). It refers to habitual truthfulness, accuracy, or conformity to facts."
    }
  },
  {
    "id": "vrb-009",
    "category": "verbal",
    "subtopic": "Correct Usage",
    "level": "all",
    "question": "Select the sentence that avoids a dangling or misplaced modifier:",
    "options": [
      "Having finished the audit report, the computer was turned off by Ramon.",
      "Having finished the audit report, Ramon turned off the computer.",
      "Turning off the computer, the audit report was finished by Ramon.",
      "Finished with the audit report, the office was locked by Ramon."
    ],
    "correctAnswer": 1,
    "difficulty": "medium",
    "explanation": {
      "correctRationale": "Sa opsyon (B), ang participial phrase na \"Having finished the audit report\" ay direktang sinusundan ng taong gumawa ng aksyon (\"Ramon\"). Sa opsyon (A), nagiging computer ang tila nagtapos ng audit report (dangling modifier).",
      "keyFormulaOrRule": "Introductory verbal modifiers must immediately precede the actual doer of the action."
    }
  },
  {
    "id": "vrb-010",
    "category": "verbal",
    "subtopic": "Vocabulary: Antonyms",
    "level": "all",
    "question": "Which word is the ANTONYM of \"OPAQUE\" in administrative terms (e.g., \"an opaque procurement process\")?",
    "options": [
      "Cloudy",
      "Obscure",
      "Transparent",
      "Ambiguous"
    ],
    "correctAnswer": 2,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Opaque means obscure, dark, or impossible to see through. In governance, an opaque process is secretive, whose opposite is \"transparent\" (open and verifiable)."
    }
  },
  {
    "id": "vrb-011",
    "category": "verbal",
    "subtopic": "Correct Usage",
    "level": "all",
    "question": "Between you and ______, the results of the CSC eligibility roster will be released tomorrow afternoon.",
    "options": [
      "I",
      "me",
      "myself",
      "mine"
    ],
    "correctAnswer": 1,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "\"Between\" is a preposition, which requires objective case pronouns. Therefore, \"between you and me\" is correct, never \"between you and I\"."
    }
  },
  {
    "id": "vrb-012",
    "category": "verbal",
    "subtopic": "Correct Usage",
    "level": "all",
    "question": "The administrative aide was commended for handling the grievance with utmost ______.",
    "options": [
      "discreetion",
      "discretion",
      "descretion",
      "discresion"
    ],
    "correctAnswer": 1,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "The correct spelling is \"discretion\" (d-i-s-c-r-e-t-i-o-n), meaning the quality of behaving or speaking in such a way as to avoid causing offense or revealing confidential information."
    }
  },
  {
    "id": "vrb-013",
    "category": "verbal",
    "subtopic": "Reading Comprehension",
    "level": "all",
    "question": "Read the passage:\n\"Civil service examinations in the Philippines were established to institutionalize a merit-based system, replacing the political patronage that characterized early colonial governance. By prioritizing competence and ethical fitness over familial or partisan ties, the bureaucracy aims to safeguard continuity in public administration across electoral transitions.\"\n\nAccording to the passage, what is the primary purpose of civil service examinations?",
    "options": [
      "To provide employment exclusively to university honor graduates.",
      "To eliminate political patronage by anchoring appointments on competence and ethical merit.",
      "To shorten the tenure of appointed departmental cabinet secretaries.",
      "To increase government revenue through examination fees."
    ],
    "correctAnswer": 1,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "The passage explicitly states that civil service exams were established to institutionalize a merit-based system, replacing political patronage with competence and ethical fitness."
    }
  },
  {
    "id": "gen-001",
    "category": "general_info",
    "subtopic": "Philippine Constitution: Bill of Rights",
    "level": "all",
    "question": "According to Article III, Section 1 of the 1987 Philippine Constitution, no person shall be deprived of life, liberty, or property without:",
    "options": [
      "due process of law, nor shall any person be denied the equal protection of the laws.",
      "written permission from the local chief executive.",
      "a presidential executive clemency or pardon.",
      "prior notification from the Department of Justice."
    ],
    "correctAnswer": 0,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Art. III, Sec. 1 states: \"No person shall be deprived of life, liberty, or property without due process of law, nor shall any person be denied the equal protection of the laws.\"",
      "keyFormulaOrRule": "Article III (Bill of Rights), Section 1 - Due Process and Equal Protection Clause.",
      "tagalogSummary": "Walang sinumang aalisan ng buhay, kalayaan, o ari-arian nang walang angkop na proseso ng batas (due process)."
    }
  },
  {
    "id": "gen-002",
    "category": "general_info",
    "subtopic": "Philippine Constitution: Legislative",
    "level": "all",
    "question": "What is the minimum age requirement for a person to be eligible for election as a Senator of the Philippines on the day of the election?",
    "options": [
      "25 years of age",
      "30 years of age",
      "35 years of age",
      "40 years of age"
    ],
    "correctAnswer": 2,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Under Article VI, Section 3 of the 1987 Constitution, a Senator must be at least thirty-five (35) years of age on the day of the election.",
      "whyOthersAreWrong": "25 years old is for Members of the House of Representatives (Art. VI, Sec. 6); 40 years old is for President and Vice-President (Art. VII, Sec. 2)."
    }
  },
  {
    "id": "gen-003",
    "category": "general_info",
    "subtopic": "Philippine Constitution: Executive",
    "level": "all",
    "question": "Under the 1987 Constitution, what is the term of office of the President of the Philippines, and is the President eligible for any reelection?",
    "options": [
      "4 years, eligible for one reelection",
      "6 years, shall not be eligible for any reelection",
      "6 years, eligible for reelection after a 6-year gap",
      "5 years, eligible for indefinite reelection"
    ],
    "correctAnswer": 1,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Article VII, Section 4: \"The President shall not be eligible for any reelection. No person who has succeeded as President and has served as such for more than four years shall be qualified for election to the same office at any time.\"",
      "tagalogSummary": "Ang termino ng Pangulo ay 6 na taon at HINDI maaaring muling mahalal (no reelection)."
    }
  },
  {
    "id": "gen-004",
    "category": "general_info",
    "subtopic": "Philippine Constitution: Constitutional Commissions",
    "level": "all",
    "question": "Which of the following is NOT one of the independent Constitutional Commissions created by Article IX of the 1987 Constitution?",
    "options": [
      "Civil Service Commission (CSC)",
      "Commission on Elections (COMELEC)",
      "Commission on Audit (COA)",
      "Commission on Human Rights (CHR)"
    ],
    "correctAnswer": 3,
    "difficulty": "medium",
    "explanation": {
      "correctRationale": "Under Article IX, Section 1, the three independent Constitutional Commissions are only: 1) Civil Service Commission, 2) Commission on Elections, and 3) Commission on Audit. The Commission on Human Rights is created under Article XIII (Social Justice and Human Rights).",
      "whyOthersAreWrong": "CSC, COMELEC, and COA comprise the three Constitutional Commissions with fiscal autonomy under Article IX."
    }
  },
  {
    "id": "gen-005",
    "category": "general_info",
    "subtopic": "RA 6713: Code of Conduct",
    "level": "all",
    "question": "Republic Act No. 6713 is officially known as the:",
    "options": [
      "Anti-Graft and Corrupt Practices Act",
      "Code of Conduct and Ethical Standards for Public Officials and Employees",
      "Government Procurement Reform Act",
      "Ease of Doing Business and Efficient Government Service Delivery Act"
    ],
    "correctAnswer": 1,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "RA 6713 is the Code of Conduct and Ethical Standards for Public Officials and Employees approved on February 20, 1989.",
      "whyOthersAreWrong": "Anti-Graft is RA 3019; Procurement Reform is RA 9184; Ease of Doing Business is RA 11032."
    }
  },
  {
    "id": "gen-006",
    "category": "general_info",
    "subtopic": "RA 6713: Norms of Conduct",
    "level": "all",
    "question": "Which norm of conduct under Section 4 of RA 6713 requires public officials to uphold public interest over personal interest, and avoid waste in government resources?",
    "options": [
      "Commitment to public interest",
      "Political neutrality",
      "Simple living",
      "Responsiveness to the public"
    ],
    "correctAnswer": 0,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Under RA 6713 Section 4(a), \"Commitment to public interest\" states that public officials shall always uphold the public interest over and above personal interest and properly utilize government resources."
    }
  },
  {
    "id": "gen-007",
    "category": "general_info",
    "subtopic": "RA 6713: Response Times",
    "level": "all",
    "question": "Under Section 5 of RA 6713, within how many working days from receipt must public officials and employees respond to letters, telegrams, or other communications sent by the public?",
    "options": [
      "5 working days",
      "10 working days",
      "15 working days",
      "30 calendar days"
    ],
    "correctAnswer": 2,
    "difficulty": "medium",
    "explanation": {
      "correctRationale": "Section 5(a) of RA 6713 mandates: \"Act promptly on letters and requests. All public officials and employees shall, within fifteen (15) working days from receipt thereof, respond to letters, telegrams or other means of communications...\""
    }
  },
  {
    "id": "gen-008",
    "category": "general_info",
    "subtopic": "RA 6713: SALN Requirements",
    "level": "all",
    "question": "Public officials and employees are required to file their Statement of Assets, Liabilities, and Net Worth (SALN) annually on or before what date?",
    "options": [
      "January 31",
      "March 15",
      "April 30",
      "December 31"
    ],
    "correctAnswer": 2,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Under Section 8 of RA 6713, the annual SALN must be filed on or before April 30 of every year, covering the previous calendar year.",
      "stepByStep": [
        "1) Within 30 days after assumption of office.",
        "2) On or before April 30 of every year thereafter.",
        "3) Within 30 days after separation from the service."
      ]
    }
  },
  {
    "id": "gen-009",
    "category": "general_info",
    "subtopic": "Philippine Constitution: State Policies",
    "level": "all",
    "question": "According to Article II, Section 6 of the 1987 Constitution, what is declared inviolable regarding church and state relations?",
    "options": [
      "The separation of Church and State shall be inviolable.",
      "The supremacy of religious canon over municipal laws.",
      "The taxation of ecclesiastical educational properties.",
      "The establishment of a national official religion."
    ],
    "correctAnswer": 0,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Article II, Section 6 explicitly declares: \"The separation of Church and State shall be inviolable.\""
    }
  },
  {
    "id": "gen-010",
    "category": "general_info",
    "subtopic": "RA 6713: Divestment",
    "level": "all",
    "question": "When a conflict of interest arises, a public official must resign from his position in any private business enterprise within how many days from assumption of office?",
    "options": [
      "15 days",
      "30 days",
      "60 days",
      "90 days"
    ],
    "correctAnswer": 1,
    "difficulty": "medium",
    "explanation": {
      "correctRationale": "Under Section 9 of RA 6713: Resignation from private business enterprise within thirty (30) days from assumption, or divestment of shareholdings within sixty (60) days."
    }
  },
  {
    "id": "gen-011",
    "category": "general_info",
    "subtopic": "Environmental Management",
    "level": "all",
    "question": "Republic Act No. 9003 is the landmark environmental law that provides for an ecological program. It is known as the:",
    "options": [
      "Clean Air Act of 1999",
      "Ecological Solid Waste Management Act of 2000",
      "Toxic Substances and Hazardous Waste Control Act",
      "Philippine Clean Water Act of 2004"
    ],
    "correctAnswer": 1,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "RA 9003 is the Ecological Solid Waste Management Act of 2000, promoting waste segregation at source, recycling, and composting.",
      "whyOthersAreWrong": "Clean Air Act is RA 8749; Clean Water Act is RA 9275; Toxic substances is RA 6969."
    }
  },
  {
    "id": "gen-012",
    "category": "general_info",
    "subtopic": "Environmental Management",
    "level": "all",
    "question": "Under RA 8749 (Philippine Clean Air Act of 1999), which municipal waste disposal method is strictly banned due to hazardous dioxin and furan emissions?",
    "options": [
      "Incineration of municipal, bio-medical, and hazardous waste",
      "Composting of agricultural waste",
      "Material Recovery Facility sorting",
      "Sanitary landfill anaerobic digestion"
    ],
    "correctAnswer": 0,
    "difficulty": "medium",
    "explanation": {
      "correctRationale": "Section 20 of RA 8749 explicitly bans incineration—the burning of municipal, bio-medical, and hazardous wastes that emits poisonous and toxic fumes."
    }
  },
  {
    "id": "gen-013",
    "category": "general_info",
    "subtopic": "Peace and Human Rights",
    "level": "all",
    "question": "Which international human rights document was proclaimed by the United Nations General Assembly in Paris on December 10, 1948?",
    "options": [
      "Geneva Convention of 1949",
      "Universal Declaration of Human Rights (UDHR)",
      "Kyoto Protocol",
      "Rome Statute of the International Criminal Court"
    ],
    "correctAnswer": 1,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "The Universal Declaration of Human Rights (UDHR) was adopted by the UN General Assembly on December 10, 1948, celebrated globally as Human Rights Day."
    }
  },
  {
    "id": "cle-001",
    "category": "clerical",
    "subtopic": "Alphabetizing Rules",
    "level": "sub_professional",
    "question": "According to standard clerical indexing rules for personal names, which of the following is the correct indexed order for: \"Maria De la Cruz\", \"Carlos Del Rosario\", \"Antonio De Castro\", \"Elena Del Prado\"?",
    "options": [
      "De Castro, Antonio; De la Cruz, Maria; Del Prado, Elena; Del Rosario, Carlos",
      "De la Cruz, Maria; De Castro, Antonio; Del Rosario, Carlos; Del Prado, Elena",
      "Del Prado, Elena; Del Rosario, Carlos; De Castro, Antonio; De la Cruz, Maria",
      "Cruz, Maria De la; Rosario, Carlos Del; Castro, Antonio De; Prado, Elena Del"
    ],
    "correctAnswer": 0,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Foreign prefixes like De, Del, De la, Von, Van, etc. are considered part of the surname and indexed letter-by-letter without spaces (De Castro -> De la Cruz -> Del Prado -> Del Rosario).",
      "stepByStep": [
        "1) \"De Castro\" (D-e C...) comes before \"De la Cruz\" (D-e l...)",
        "2) \"De la Cruz\" comes before \"Del Prado\" (D-e-l P...)",
        "3) \"Del Prado\" comes before \"Del Rosario\" (D-e-l R...)",
        "Kaya ang tamang pagkakasunod ay: De Castro, Antonio; De la Cruz, Maria; Del Prado, Elena; Del Rosario, Carlos."
      ],
      "keyFormulaOrRule": "Surname prefixes (De, Del, San, Santa, Mac, Mc) are treated as part of the surname unit in standard civil filing."
    }
  },
  {
    "id": "cle-002",
    "category": "clerical",
    "subtopic": "Alphabetizing Rules",
    "level": "sub_professional",
    "question": "How should the hyphenated personal name \"Dr. Clara Santos-Ocampo\" be properly indexed?",
    "options": [
      "Santos-Ocampo, Clara (Dr.)",
      "Ocampo, Clara Santos (Dr.)",
      "Santos, Clara Ocampo (Dr.)",
      "Dr. Clara Santos-Ocampo"
    ],
    "correctAnswer": 0,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Hyphenated surnames are treated as a single filing unit (Santos-Ocampo). Professional titles like Dr., Atty., Engr. are placed at the end in parentheses as the final indexing unit."
    }
  },
  {
    "id": "cle-003",
    "category": "clerical",
    "subtopic": "Filing Procedures",
    "level": "sub_professional",
    "question": "Which filing system arranges records strictly by physical or administrative territory (e.g., Country, Region, Province, City)?",
    "options": [
      "Subject Filing",
      "Geographical Filing",
      "Chronological Filing",
      "Numeric Filing"
    ],
    "correctAnswer": 1,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Geographical Filing organizes records by location or geographic territory, commonly utilized in government departments with regional and provincial field branches."
    }
  },
  {
    "id": "cle-004",
    "category": "clerical",
    "subtopic": "Clerical Reasoning",
    "level": "sub_professional",
    "question": "In comparing the two civil registry entries below:\nEntry 1: Atty. Ferdinand M. Rodriguez, 452 Mendiola St., San Miguel, Manila\nEntry 2: Atty. Ferdinand N. Rodriguez, 452 Mendiola St., San Miguel, Manila\n\nHow do the two entries compare?",
    "options": [
      "They are identical in all respects.",
      "They differ in the middle initial.",
      "They differ in the street address number.",
      "They differ in the professional title."
    ],
    "correctAnswer": 1,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Entry 1 has middle initial \"M.\", while Entry 2 has middle initial \"N.\". All other details are identical."
    }
  },
  {
    "id": "cle-005",
    "category": "clerical",
    "subtopic": "Spelling & Proofreading",
    "level": "sub_professional",
    "question": "Which of the following government terms is spelled CORRECTLY?",
    "options": [
      "Bureaucracy",
      "Bureacracy",
      "Beurocracy",
      "Bureocracy"
    ],
    "correctAnswer": 0,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "The correct spelling is B-U-R-E-A-U-C-R-A-C-Y (from French \"bureau\" meaning office/desk + Greek \"-kratia\" meaning rule)."
    }
  },
  {
    "id": "cle-006",
    "category": "clerical",
    "subtopic": "Spelling & Proofreading",
    "level": "sub_professional",
    "question": "Identify the word with the CORRECT spelling:",
    "options": [
      "Accomodation",
      "Accommodation",
      "Acommodation",
      "Acomodation"
    ],
    "correctAnswer": 1,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "The correct spelling has double \"c\" and double \"m\": A-C-C-O-M-M-O-D-A-T-I-O-N."
    }
  },
  {
    "id": "cle-007",
    "category": "clerical",
    "subtopic": "Filing Procedures",
    "level": "sub_professional",
    "question": "What is a \"Cross-Reference Sheet\" used for in an office records filing system?",
    "options": [
      "To record the daily attendance of filing clerks.",
      "To direct a searcher to an alternative location where a document might be filed under another name or subject.",
      "To compute the annual budget for office supplies.",
      "To shred classified confidential files."
    ],
    "correctAnswer": 1,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "A Cross-Reference Sheet (or card) is placed in a file folder to guide the researcher to another folder where related materials or documents with multiple relevant names/topics are stored."
    }
  },
  {
    "id": "cle-008",
    "category": "clerical",
    "subtopic": "Alphabetizing Rules",
    "level": "sub_professional",
    "question": "When indexing business names containing numbers written as digits, such as \"3M Philippines\" and \"5th Avenue Cafe\", standard filing practice requires that:",
    "options": [
      "Numbers are indexed after all letters from Z.",
      "Numbers are filed before letters in ascending numeric order, or treated as spelled out words according to agency policy.",
      "Numbers are completely deleted from the indexing units.",
      "Numbers are converted into Roman numerals."
    ],
    "correctAnswer": 1,
    "difficulty": "medium",
    "explanation": {
      "correctRationale": "Under ARMA International rules, numbers written in digits are filed in strict numeric order before alphabetic letters, or spelled out in words if following verbal filing guidelines."
    }
  },
  {
    "id": "cle-009",
    "category": "clerical",
    "subtopic": "Clerical Reasoning",
    "level": "sub_professional",
    "question": "An administrative aide receives incoming mail marked \"CONFIDENTIAL: For the Eyes of the Regional Director Only.\" What is the proper procedure?",
    "options": [
      "Open the letter, photocopy it for the central registry, and then forward it.",
      "Deliver the envelope unopened directly to the Regional Director or his authorized private secretary.",
      "Return the letter to the post office.",
      "Leave it on the general inquiry reception desk."
    ],
    "correctAnswer": 1,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Confidential and personal mail addressed to an official must never be opened by incoming mail clerks and must be handed directly unopened to the addressee or designated confidential assistant."
    }
  },
  {
    "id": "cle-010",
    "category": "clerical",
    "subtopic": "Spelling & Proofreading",
    "level": "sub_professional",
    "question": "Choose the correctly spelled word:",
    "options": [
      "Privilege",
      "Privelege",
      "Priviledge",
      "Prevelege"
    ],
    "correctAnswer": 0,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "The correct spelling is P-R-I-V-I-L-E-G-E (no \"d\"). Common mistake is inserting \"d\" before the \"g\"."
    }
  },
  {
    "id": "cle-011",
    "category": "clerical",
    "subtopic": "Office Procedures & Spelling",
    "level": "sub_professional",
    "question": "Which of the following official memorandum terms is spelled accurately?",
    "options": [
      "Liaison",
      "Liason",
      "Liasion",
      "Liazon"
    ],
    "correctAnswer": 0,
    "difficulty": "medium",
    "explanation": {
      "correctRationale": "The correct spelling is L-I-A-I-S-O-N (double \"i\").",
      "stepByStep": [
        "Recall standard ARMA / Civil Service clerical indexing conventions."
      ]
    }
  },
  {
    "id": "cle-012",
    "category": "clerical",
    "subtopic": "Alphabetical Indexing Rules",
    "level": "sub_professional",
    "question": "In indexing business records, what is the first indexing unit for the firm \"Bureau of Internal Revenue Employees Credit Cooperative\"?",
    "options": [
      "Bureau",
      "Internal",
      "Revenue",
      "Credit"
    ],
    "correctAnswer": 0,
    "difficulty": "easy",
    "explanation": {
      "correctRationale": "Business names are indexed as written, unit by unit: Unit 1: Bureau, Unit 2: of, Unit 3: Internal, etc.",
      "stepByStep": [
        "Recall standard ARMA / Civil Service clerical indexing conventions."
      ]
    }
  },
  {
    "id": "cle-013",
    "category": "clerical",
    "subtopic": "Filing Systems & Records",
    "level": "sub_professional",
    "question": "Which filing method is most suitable for archiving tax returns and vouchers organized chronologically by tax year and fiscal quarter?",
    "options": [
      "Chronological Filing System",
      "Geographical Filing System",
      "Alphabetical Filing by Vendor",
      "Dewey Decimal System"
    ],
    "correctAnswer": 0,
    "difficulty": "medium",
    "explanation": {
      "correctRationale": "A chronological filing system arranges records by dates, years, or quarters, ideal for financial and tax records.",
      "stepByStep": [
        "Recall standard ARMA / Civil Service clerical indexing conventions."
      ]
    }
  }
];

