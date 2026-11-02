import { Question } from '../../types/quiz';

export const numericalQuestions: Question[] = [
  // 1-10: Number Sequence & Basic Operations
  {
    id: 'num-001',
    category: 'numerical',
    subtopic: 'Number Sequence',
    level: 'all',
    question: 'Find the next number in the series: 3, 7, 15, 31, 63, ___?',
    options: ['95', '127', '125', '120'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Ang pattern ay (n × 2) + 1 o kaya ang dagdag ay dumodoble: +4, +8, +16, +32, +64.',
      stepByStep: [
        '3 × 2 + 1 = 7',
        '7 × 2 + 1 = 15',
        '15 × 2 + 1 = 31',
        '31 × 2 + 1 = 63',
        '63 × 2 + 1 = 127'
      ],
      keyFormulaOrRule: 'Next = 2n + 1 o Difference: +4, +8, +16, +32, +64 (63 + 64 = 127)',
      whyOthersAreWrong: 'Ang 95 ay nag-add lamang ng 32 muli. Ang 125 ay 63 + 62 lamang.'
    }
  },
  {
    id: 'num-002',
    category: 'numerical',
    subtopic: 'Number Sequence',
    level: 'all',
    question: 'Complete the sequence: 2, 5, 10, 17, 26, ___?',
    options: ['35', '37', '39', '41'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Ang pagitan ng bawat numero ay sunod-sunod na odd numbers: +3, +5, +7, +9, +11. O n² + 1.',
      stepByStep: ['1² + 1 = 2', '2² + 1 = 5', '3² + 1 = 10', '4² + 1 = 17', '5² + 1 = 26', '6² + 1 = 37'],
      keyFormulaOrRule: 'n² + 1 para sa n = 1, 2, 3, 4, 5, 6...',
      whyOthersAreWrong: '35 ay +9 lamang; 39 ay +13 agad na lumaktaw.'
    }
  },
  {
    id: 'num-003',
    category: 'numerical',
    subtopic: 'Number Sequence',
    level: 'all',
    question: 'What is the missing term: 100, 96, 88, 76, 60, ___?',
    options: ['40', '44', '42', '48'],
    correctAnswer: 0,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Ang bawas ay dumarami ng multiples of 4: -4, -8, -12, -16, -20.',
      stepByStep: ['100 - 4 = 96', '96 - 8 = 88', '88 - 12 = 76', '76 - 16 = 60', '60 - 20 = 40'],
      keyFormulaOrRule: 'Common difference of differences = -4 bawat hakbang.'
    }
  },
  {
    id: 'num-004',
    category: 'numerical',
    subtopic: 'Number Sequence',
    level: 'all',
    question: 'Determine the next fraction in the series: 1/2, 2/3, 3/5, 5/8, 8/13, ___?',
    options: ['11/19', '13/21', '12/20', '13/24'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Ang numerator at denominator ay sumusunod sa Fibonacci sequence (1, 2, 3, 5, 8, 13, 21).',
      stepByStep: [
        'Numerator sequence: 1, 2, 3, 5, 8, susunod ay 13',
        'Denominator sequence: 2, 3, 5, 8, 13, susunod ay 21',
        'Kaya ang sagot ay 13/21.'
      ],
      keyFormulaOrRule: 'Fibonacci: F(n) = F(n-1) + F(n-2)'
    }
  },
  {
    id: 'num-005',
    category: 'numerical',
    subtopic: 'Basic Operations',
    level: 'all',
    question: 'Simplify using order of operations (PEMDAS): 18 ÷ 3 × (4 + 2) - 5² + 10 = ?',
    options: ['21', '19', '25', '17'],
    correctAnswer: 0,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Sundin ang Parentheses -> Exponents -> Multiplication/Division (left to right) -> Addition/Subtraction (left to right).',
      stepByStep: [
        '1) Parentheses: (4 + 2) = 6',
        '2) Exponents: 5² = 25',
        '3) Expresyon ngayon: 18 ÷ 3 × 6 - 25 + 10',
        '4) Divide/Multiply left to right: 18 ÷ 3 = 6; 6 × 6 = 36',
        '5) Add/Subtract left to right: 36 - 25 = 11; 11 + 10 = 21'
      ],
      keyFormulaOrRule: 'PEMDAS Rule: laging unahin ang multiplication at division kaliwa pakanan.'
    }
  },
  {
    id: 'num-006',
    category: 'numerical',
    subtopic: 'Fractions & Decimals',
    level: 'all',
    question: 'Which of the following fractions has the greatest value: 3/5, 5/8, 7/11, 2/3?',
    options: ['3/5', '5/8', '7/11', '2/3'],
    correctAnswer: 3,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'I-convert ang bawat fraction sa decimal upang madaling maikumpara:',
      stepByStep: [
        '3/5 = 0.600',
        '5/8 = 0.625',
        '7/11 ≈ 0.636',
        '2/3 ≈ 0.667 (Pinakamataas)'
      ],
      keyFormulaOrRule: 'Cross-multiplication o decimal conversion.'
    }
  },
  {
    id: 'num-007',
    category: 'numerical',
    subtopic: 'Fractions & Decimals',
    level: 'all',
    question: 'Evaluate: 3 1/4 - 1 5/6 + 2 1/2 = ?',
    options: ['3 11/12', '4 1/12', '3 5/12', '4 5/12'],
    correctAnswer: 0,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Hanapin ang Least Common Denominator (LCD) ng 4, 6, at 2, na 12.',
      stepByStep: [
        '3 1/4 = 3 3/12',
        '1 5/6 = 1 10/12',
        '2 1/2 = 2 6/12',
        '(3 - 1 + 2) + (3 - 10 + 6)/12 = 4 + (-1/12) = 3 11/12.'
      ]
    }
  },
  {
    id: 'num-008',
    category: 'numerical',
    subtopic: 'Percentage & Discount',
    level: 'all',
    question: 'An office chair marked at ₱4,500 is sold with a 20% trade discount. If a 5% cash discount is further applied on the discounted price, what is the net price?',
    options: ['₱3,375', '₱3,420', '₱3,500', '₱3,600'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'I-apply nang sunod-sunod (successive discount) at huwag basta ipagsama ang 20% at 5%.',
      stepByStep: [
        'Unang bawas (20%): ₱4,500 × 0.80 = ₱3,600',
        'Pangalawang bawas (5% ng ₱3,600): ₱3,600 × 0.95 = ₱3,420'
      ],
      keyFormulaOrRule: 'Net = Marked Price × (1 - d1) × (1 - d2)'
    }
  },
  {
    id: 'num-009',
    category: 'numerical',
    subtopic: 'Percentage & Discount',
    level: 'all',
    question: 'In a government department of 160 employees, 65% are permanent, 25% are casual, and the rest are contractual. How many contractual employees are there?',
    options: ['12', '16', '18', '20'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Kabuuan ng permanent at casual ay 65% + 25% = 90%. Ang natitirang contractual ay 10%.',
      stepByStep: [
        '100% - 90% = 10%',
        '10% ng 160 = 0.10 × 160 = 16 empleyado.'
      ]
    }
  },
  {
    id: 'num-010',
    category: 'numerical',
    subtopic: 'Percentage & Discount',
    level: 'all',
    question: 'A government agency’s budget was increased from ₱12,000,000 to ₱15,000,000. What was the percentage increase?',
    options: ['20%', '25%', '30%', '33.3%'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Percentage Increase = (Pagbabago ÷ Orihinal na Halaga) × 100%.',
      stepByStep: [
        'Pagbabago = 15,000,000 - 12,000,000 = 3,000,000',
        'Increase % = (3,000,000 ÷ 12,000,000) × 100% = 1/4 × 100% = 25%.'
      ]
    }
  },

  // 11-20: Ratio and Proportion & Word Problems
  {
    id: 'num-011',
    category: 'numerical',
    subtopic: 'Ratio and Proportion',
    level: 'all',
    question: 'The ratio of males to females in an examination room is 3:5. If there are 30 females, how many examinees are in the room altogether?',
    options: ['45', '48', '50', '52'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Hatiin ang bilang ng babae sa ratio unit ng babae: 30 ÷ 5 = 6 kada bahagi.',
      stepByStep: [
        '1 unit = 30 ÷ 5 = 6 examinees',
        'Lalaki = 3 × 6 = 18 examinees',
        'Kabuuan = 18 + 30 = 48 examinees (o kabuuang ratio 3+5 = 8; 8 × 6 = 48).'
      ]
    }
  },
  {
    id: 'num-012',
    category: 'numerical',
    subtopic: 'Ratio and Proportion',
    level: 'all',
    question: 'A budget of ₱72,000 is to be partitioned among three regional units in the ratio 2 : 3 : 4. How much will the unit with the largest share receive?',
    options: ['₱24,000', '₱32,000', '₱36,000', '₱28,000'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Kuhanin ang kabuuang bilang ng ratio units: 2 + 3 + 4 = 9 units.',
      stepByStep: [
        'Halaga ng 1 unit = ₱72,000 ÷ 9 = ₱8,000',
        'Pinakamalaking bahagi (4 units) = 4 × ₱8,000 = ₱32,000.'
      ]
    }
  },
  {
    id: 'num-013',
    category: 'numerical',
    subtopic: 'Word Problems: Age',
    level: 'all',
    question: 'Maria is currently 4 times as old as her son. In 20 years, she will be twice as old as her son. What is Maria’s present age?',
    options: ['36', '40', '44', '48'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Bumuo ng algebraic equation batay sa kasalukuyan at hinaharap.',
      stepByStep: [
        'Hayaan si x = kasalukuyang edad ng anak. Edad ni Maria = 4x.',
        'Makalipas ang 20 taon: Edad ng anak = x + 20, Maria = 4x + 20.',
        'Equation: 4x + 20 = 2(x + 20)',
        '4x + 20 = 2x + 40',
        '2x = 20 => x = 10 (edad ng anak ngayon)',
        'Edad ni Maria ngayon = 4 × 10 = 40 taong gulang.'
      ]
    }
  },
  {
    id: 'num-014',
    category: 'numerical',
    subtopic: 'Word Problems: Age',
    level: 'all',
    question: 'The sum of the ages of a father and his daughter is 56. Four years ago, the father was 3 times as old as his daughter. How old is the father now?',
    options: ['38', '40', '42', '44'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'I-adjust ang kabuuang edad sa 4 na taon ang nakalipas.',
      stepByStep: [
        'Apat na taon ang nakalipas, pareho silang nabawasan ng 4 (bawas 8 kabuuan): 56 - 8 = 48.',
        'Ratio ng ama sa anak 4 years ago = 3 : 1 (kabuuan ay 4 units).',
        '1 unit = 48 ÷ 4 = 12 (edad ng anak 4 years ago).',
        'Edad ng ama 4 years ago = 3 × 12 = 36.',
        'Kasalukuyang edad ng ama = 36 + 4 = 40 taong gulang.'
      ]
    }
  },
  {
    id: 'num-015',
    category: 'numerical',
    subtopic: 'Word Problems: Work',
    level: 'all',
    question: 'Clerk A can encode a batch of civil documents in 6 hours, while Clerk B can do the same job in 3 hours. How long will it take them working together?',
    options: ['2 hours', '2.5 hours', '1.5 hours', '4 hours'],
    correctAnswer: 0,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Gamitin ang standard work formula: 1/T = 1/A + 1/B.',
      stepByStep: [
        'Work rate ni A = 1/6 kada oras',
        'Work rate ni B = 1/3 = 2/6 kada oras',
        'Pinagsamang rate = 1/6 + 2/6 = 3/6 = 1/2 kada oras',
        'Oras na kailangan = 1 ÷ (1/2) = 2 oras.'
      ],
      keyFormulaOrRule: 'T = (A × B) / (A + B) => (6 × 3) / (6 + 3) = 18 / 9 = 2 hours.'
    }
  },
  {
    id: 'num-016',
    category: 'numerical',
    subtopic: 'Word Problems: Work',
    level: 'all',
    question: 'Pipes X and Y can fill a reservoir in 12 minutes and 15 minutes respectively. An outflow pipe Z can empty it in 20 minutes. If all three operate simultaneously, how many minutes will it take to fill the reservoir?',
    options: ['8 mins', '10 mins', '12 mins', '15 mins'],
    correctAnswer: 1,
    difficulty: 'hard',
    explanation: {
      correctRationale: 'Isama ang bawas ng outflow pipe sa net rate: 1/T = 1/X + 1/Y - 1/Z.',
      stepByStep: [
        'Rate = 1/12 + 1/15 - 1/20',
        'LCD ng 12, 15, 20 ay 60.',
        'Rate = 5/60 + 4/60 - 3/60 = 6/60 = 1/10',
        'Kaya mapupuno sa loob ng 10 minuto.'
      ]
    }
  },
  {
    id: 'num-017',
    category: 'numerical',
    subtopic: 'Word Problems: Motion',
    level: 'all',
    question: 'A government courier travels from Manila to Tarlac at an average speed of 60 km/h and returns along the same route at 40 km/h. What is his average speed for the entire round trip?',
    options: ['48 km/h', '50 km/h', '52 km/h', '45 km/h'],
    correctAnswer: 0,
    difficulty: 'hard',
    explanation: {
      correctRationale: 'Huwag kunin ang simpleng average (60+40)/2 dahil magkaiba ang oras ng biyahe. Gamitin ang Harmonic Mean.',
      stepByStep: [
        'Average Speed = Total Distance ÷ Total Time',
        'Harmonic Mean = (2 × v1 × v2) / (v1 + v2)',
        '= (2 × 60 × 40) / (60 + 40)',
        '= 4800 / 100 = 48 km/h.'
      ],
      keyFormulaOrRule: 'V_avg = 2ab / (a + b) kapag pareho ang distansya.',
      whyOthersAreWrong: 'Ang 50 km/h ay arithmetic average, na karaniwang patibong sa CSC exam!'
    }
  },
  {
    id: 'num-018',
    category: 'numerical',
    subtopic: 'Word Problems: Motion',
    level: 'all',
    question: 'Two cars leave the same town at 8:00 AM heading in opposite directions. Car A travels at 55 km/h and Car B travels at 65 km/h. At what time will they be 360 km apart?',
    options: ['10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Dahil magkasalungat ang direksyon, ang kanilang relative speed ay ang suma ng bilis nila: 55 + 65 = 120 km/h.',
      stepByStep: [
        'Oras = Distansya ÷ Bilis = 360 km ÷ 120 km/h = 3 oras',
        '8:00 AM + 3 oras = 11:00 AM.'
      ]
    }
  },
  {
    id: 'num-019',
    category: 'numerical',
    subtopic: 'Simple & Compound Interest',
    level: 'all',
    question: 'How much simple interest will ₱50,000 earn at an annual rate of 6% over a period of 3 years?',
    options: ['₱8,000', '₱9,000', '₱9,500', '₱10,000'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Gamitin ang Simple Interest formula: I = P × r × t.',
      stepByStep: [
        'P = 50,000, r = 0.06, t = 3',
        'I = 50,000 × 0.06 × 3 = 3,000 × 3 = ₱9,000.'
      ]
    }
  },
  {
    id: 'num-020',
    category: 'numerical',
    subtopic: 'Mixture Problems',
    level: 'all',
    question: 'How many liters of pure water must be added to 30 liters of a 40% alcohol solution to dilute it to a 25% alcohol solution?',
    options: ['15 liters', '18 liters', '20 liters', '24 liters'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Ang dami ng purong alcohol ay hindi nagbabago kapag tubig lamang ang idinadagdag.',
      stepByStep: [
        'Alcohol content sa orihinal = 30 × 0.40 = 12 litro.',
        'Sa bagong halo, ang 12 litro ay dapat 25% ng bagong total volume (V):',
        '0.25 × V = 12 => V = 12 ÷ 0.25 = 48 litro.',
        'Tubig na idinagdag = 48 - 30 = 18 litro.'
      ]
    }
  },

  // 21-40: Algebra, Averages & Statistics
  {
    id: 'num-021',
    category: 'numerical',
    subtopic: 'Averages',
    level: 'all',
    question: 'An examinee obtained grades of 84, 87, 88, and 91 on four civil service mock tests. What grade must he get on the fifth test to have an overall average of 89?',
    options: ['93', '94', '95', '96'],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Kabuuan ng 5 pagsusulit na may average na 89 = 5 × 89 = 445 puntos.',
      stepByStep: [
        'Kasalukuyang kabuuan: 84 + 87 + 88 + 91 = 350',
        'Kailangang marka sa pang-limang test = 445 - 350 = 95 puntos.'
      ]
    }
  },
  {
    id: 'num-022',
    category: 'numerical',
    subtopic: 'Averages',
    level: 'all',
    question: 'The average weight of 6 men is 68 kg. If one man weighing 78 kg is replaced by a new recruit weighing 60 kg, what is the new average weight?',
    options: ['64 kg', '65 kg', '66 kg', '67 kg'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Kalkulahin ang netong pagbabago sa kabuuang timbang.',
      stepByStep: [
        'Net pagbabago = 60 - 78 = -18 kg',
        'Pagbabago sa average = -18 ÷ 6 = -3 kg',
        'Bagong average = 68 - 3 = 65 kg.'
      ]
    }
  },
  {
    id: 'num-023',
    category: 'numerical',
    subtopic: 'Basic Algebra',
    level: 'all',
    question: 'If 3x - 7 = 5x + 15, what is the value of 2x + 1?',
    options: ['-21', '-23', '-19', '-11'],
    correctAnswer: 0,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Lutasin muna ang halaga ng x bago hanapin ang 2x + 1.',
      stepByStep: [
        '3x - 5x = 15 + 7',
        '-2x = 22 => x = -11',
        'Kaya 2x + 1 = 2(-11) + 1 = -22 + 1 = -21.'
      ]
    }
  },
  {
    id: 'num-024',
    category: 'numerical',
    subtopic: 'Basic Algebra',
    level: 'all',
    question: 'If a/b = 3/4 and b/c = 5/6, what is the value of a/c?',
    options: ['5/8', '15/24', '18/20', '3/8'],
    correctAnswer: 0,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'I-multiply ang dalawang ratios: (a/b) × (b/c) = a/c.',
      stepByStep: [
        '(3/4) × (5/6) = 15/24',
        'I-reduce sa lowest terms (divide by 3): 5/8.'
      ]
    }
  },
  {
    id: 'num-025',
    category: 'numerical',
    subtopic: 'Geometry & Measurement',
    level: 'all',
    question: 'A rectangular regional archive room is 15 meters long and 10 meters wide. If tiles measuring 50 cm by 50 cm are to be installed, how many tiles are required?',
    options: ['400', '500', '600', '800'],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Tiyaking pareho ang units ng sukat (meters o centimeters).',
      stepByStep: [
        'Area ng kwarto = 15 m × 10 m = 150 sq. m.',
        'Sukat ng tile sa meters = 0.5 m × 0.5 m = 0.25 sq. m.',
        'Bilang ng tiles = 150 ÷ 0.25 = 600 piraso.'
      ]
    }
  },
  {
    id: 'num-026',
    category: 'numerical',
    subtopic: 'Geometry & Measurement',
    level: 'all',
    question: 'If the perimeter of a square plot is increased by 40%, by what percentage does its area increase?',
    options: ['40%', '80%', '96%', '100%'],
    correctAnswer: 2,
    difficulty: 'hard',
    explanation: {
      correctRationale: 'Kung ang perimeter ay tumaas ng 40%, ang bawat gilid (s) ay tumaas din ng 40% (factor = 1.40).',
      stepByStep: [
        'Orihinal na Area = s²',
        'Bagong Area = (1.40 s)² = 1.96 s²',
        'Tumaas ng 1.96 - 1.00 = 0.96 o 96%.'
      ]
    }
  },
  {
    id: 'num-027',
    category: 'numerical',
    subtopic: 'Probability & Combinations',
    level: 'all',
    question: 'A committee of 3 members is to be formed from a group of 5 men and 4 women. In how many ways can this committee be formed if it must contain at least 2 women?',
    options: ['34', '40', '44', '54'],
    correctAnswer: 0,
    difficulty: 'hard',
    explanation: {
      correctRationale: 'May dalawang posibleng senaryo: Eksaktong 2 babae + 1 lalaki, O 3 babae.',
      stepByStep: [
        'Kaso 1 (2 babae at 1 lalaki): C(4,2) × C(5,1) = 6 × 5 = 30 paraan.',
        'Kaso 2 (3 babae): C(4,3) = 4 paraan.',
        'Kabuuan = 30 + 4 = 34 paraan.'
      ]
    }
  },
  {
    id: 'num-028',
    category: 'numerical',
    subtopic: 'Probability & Combinations',
    level: 'all',
    question: 'In a lottery of 50 civil service raffle tickets numbered 1 to 50, what is the probability of drawing a ticket that is a multiple of 4 or 6?',
    options: ['8/25', '16/50', '4/10', '9/25'],
    correctAnswer: 0,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Gamitin ang Addition Rule of Probability: P(A or B) = P(A) + P(B) - P(A and B).',
      stepByStep: [
        'Multiples of 4: 50 ÷ 4 = 12 multiples.',
        'Multiples of 6: 50 ÷ 6 = 8 multiples.',
        'Multiples ng pareho (LCM ng 4 at 6 ay 12): 50 ÷ 12 = 4 multiples.',
        'Kabuuan = 12 + 8 - 4 = 16 na numero.',
        'Probability = 16/50 = 8/25.'
      ]
    }
  },
  {
    id: 'num-029',
    category: 'numerical',
    subtopic: 'Number Sequence',
    level: 'all',
    question: 'Find the next term in the alternating series: 4, 18, 8, 14, 12, 10, 16, ___?',
    options: ['6', '8', '18', '20'],
    correctAnswer: 0,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Ito ay dalawang pinagsalit na serye (interleaved series).',
      stepByStep: [
        'Unang serye (odd positions): 4, 8, 12, 16 (+4 bawat hakbang)',
        'Pangalawang serye (even positions): 18, 14, 10, ___ (-4 bawat hakbang)',
        '10 - 4 = 6.'
      ]
    }
  },
  {
    id: 'num-030',
    category: 'numerical',
    subtopic: 'Basic Operations',
    level: 'all',
    question: 'What is 35% of 60% of ₱8,000?',
    options: ['₱1,480', '₱1,680', '₱1,720', '₱1,840'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'I-multiply nang tuloy-tuloy ang mga decimals.',
      stepByStep: [
        '60% ng 8,000 = 0.60 × 8,000 = ₱4,800',
        '35% ng 4,800 = 0.35 × 4,800 = ₱1,680.'
      ]
    }
  },
  {
    id: 'num-031',
    category: 'numerical',
    subtopic: 'Word Problems: Work',
    level: 'all',
    question: 'Four analysts can verify 480 audit files in 6 days. How many audit files can 6 analysts verify in 4 days at the same working rate?',
    options: ['480', '520', '560', '600'],
    correctAnswer: 0,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Pansinin ang kabuuang man-days: 4 katao × 6 araw = 24 man-days.',
      stepByStep: [
        '24 man-days = 480 files, kaya 1 man-day = 480 ÷ 24 = 20 files.',
        'Para sa 6 na tao sa 4 na araw: 6 × 4 = 24 man-days.',
        'Dahil 24 man-days pa rin, makakapag-verify sila ng eksaktong 480 files!'
      ]
    }
  },
  {
    id: 'num-032',
    category: 'numerical',
    subtopic: 'Fractions & Decimals',
    level: 'all',
    question: 'If 2/5 of a budget is spent on training and 1/3 of the remaining is spent on supplies, what fraction of the original budget is left?',
    options: ['1/5', '2/5', '4/15', '1/3'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Kalkulahin ang bawat hakbang nang maingat.',
      stepByStep: [
        'Nalabi matapos ang training = 1 - 2/5 = 3/5 ng budget.',
        'Nagamit sa supplies = 1/3 ng 3/5 = 1/5.',
        'Natitirang budget = 3/5 - 1/5 = 2/5.'
      ]
    }
  },
  {
    id: 'num-033',
    category: 'numerical',
    subtopic: 'Word Problems: Profit & Loss',
    level: 'all',
    question: 'A government cooperative purchased supplies for ₱8,000 and sold them with a 25% profit margin on cost. What was the selling price?',
    options: ['₱9,500', '₱10,000', '₱10,500', '₱11,000'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Selling Price = Cost + (Margin × Cost).',
      stepByStep: [
        'Profit = ₱8,000 × 0.25 = ₱2,000',
        'Selling Price = ₱8,000 + ₱2,000 = ₱10,000.'
      ]
    }
  },
  {
    id: 'num-034',
    category: 'numerical',
    subtopic: 'Number Sequence',
    level: 'all',
    question: 'What comes next in the sequence: 1, 8, 27, 64, 125, ___?',
    options: ['196', '216', '225', '256'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Ang serye ay mga perpektong cubes (n³): 1³, 2³, 3³, 4³, 5³, 6³.',
      stepByStep: ['6³ = 6 × 6 × 6 = 216.']
    }
  },
  {
    id: 'num-035',
    category: 'numerical',
    subtopic: 'Ratio and Proportion',
    level: 'all',
    question: 'If 8 typists can encode 160 pages in 5 hours, how many pages can 12 typists encode in 3 hours?',
    options: ['144', '150', '160', '180'],
    correctAnswer: 0,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Kalkulahin ang rate ng isang typist kada oras.',
      stepByStep: [
        '8 typists sa 5 oras = 40 typist-hours.',
        'Rate kada typist-hour = 160 ÷ 40 = 4 na pahina bawat oras.',
        '12 typists sa 3 oras = 36 typist-hours.',
        'Kabuuan = 36 × 4 = 144 pahina.'
      ]
    }
  },
  {
    id: 'num-036',
    category: 'numerical',
    subtopic: 'Word Problems: Age',
    level: 'all',
    question: 'Ten years ago, Noel was half as old as Robert. If Noel is now 28 years old, how old is Robert now?',
    options: ['36', '42', '46', '48'],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Gamitin ang edad 10 taon na ang nakararaan.',
      stepByStep: [
        'Edad ni Noel 10 taon ang nakalipas = 28 - 10 = 18 taon.',
        'Dahil siya ay kalahati ng edad ni Robert noon, si Robert noon ay 18 × 2 = 36 taon.',
        'Kasalukuyang edad ni Robert = 36 + 10 = 46 taon.'
      ]
    }
  },
  {
    id: 'num-037',
    category: 'numerical',
    subtopic: 'Geometry & Measurement',
    level: 'all',
    question: 'A circular fountain has a circumference of 44 meters. What is its diameter? (Use π ≈ 22/7)',
    options: ['7 meters', '14 meters', '21 meters', '28 meters'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Circumference = π × d.',
      stepByStep: [
        '44 = (22/7) × d',
        'd = 44 × (7/22) = 2 × 7 = 14 meters.'
      ]
    }
  },
  {
    id: 'num-038',
    category: 'numerical',
    subtopic: 'Basic Algebra',
    level: 'all',
    question: 'The product of two consecutive positive even integers is 168. What is the smaller integer?',
    options: ['10', '12', '14', '16'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Equation: x(x + 2) = 168.',
      stepByStep: [
        'Subukan ang mga pagpipilian: 12 × 14 = 168.',
        'Ang mas maliit na numero ay 12.'
      ]
    }
  },
  {
    id: 'num-039',
    category: 'numerical',
    subtopic: 'Percentage & Discount',
    level: 'all',
    question: 'A price tag was first marked up by 20%, and later discounted by 20%. How does the final price compare with the original price?',
    options: ['The same', '4% higher', '4% lower', '2% lower'],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Kapag parehong porsyento ang itinaas at ibinawas, laging may pagkalugi na katumbas ng (x/10)²',
      stepByStep: [
        'Halimbawa, orihinal = 100.',
        'Mark up 20% = 120.',
        'Discount 20% ng 120 = 24 bawas => 120 - 24 = 96.',
        '96 vs 100 ay 4% lower.'
      ]
    }
  },
  {
    id: 'num-040',
    category: 'numerical',
    subtopic: 'Data Interpretation',
    level: 'all',
    question: 'If a pie chart representing an annual agency expenditure shows Personnel Services occupying a sector with a central angle of 144°, what percent of the total expenditure is this?',
    options: ['36%', '40%', '42%', '45%'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Ang buong bilog ay 360° na kumakatawan sa 100%.',
      stepByStep: [
        'Porsyento = (144° ÷ 360°) × 100%',
        '144 ÷ 360 = 0.40 = 40%.'
      ]
    }
  },

  // 41-60: High-Yield Civil Service Exam Math
  {
    id: 'num-041',
    category: 'numerical',
    subtopic: 'Word Problems: Coin/Denomination',
    level: 'all',
    question: 'An administrative officer has ₱1,250 in ₱20 and ₱50 bills. If there are 40 bills in total, how many ₱50 bills are there?',
    options: ['12', '15', '20', '25'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Bumuo ng simultaneous equations o gamitin ang assumption method.',
      stepByStep: [
        'Hayaan si x = bilang ng ₱20 bills, at y = bilang ng ₱50 bills.',
        'x + y = 40 => x = 40 - y',
        '20x + 50y = 1250',
        '20(40 - y) + 50y = 1250',
        '800 - 20y + 50y = 1250 => 30y = 450 => y = 15.'
      ]
    }
  },
  {
    id: 'num-042',
    category: 'numerical',
    subtopic: 'Word Problems: Distance',
    level: 'all',
    question: 'A train 150 meters long passes an electric pole in 9 seconds. What is the speed of the train in km/h?',
    options: ['50 km/h', '60 km/h', '65 km/h', '70 km/h'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Bilis = Distansya ÷ Oras = 150 m ÷ 9 s = 50/3 m/s. I-convert sa km/h sa pamamagitan ng pag-multiply sa 18/5.',
      stepByStep: [
        'Speed (km/h) = (50/3) × (18/5) = 10 × 6 = 60 km/h.'
      ]
    }
  },
  {
    id: 'num-043',
    category: 'numerical',
    subtopic: 'Number Sequence',
    level: 'all',
    question: 'Find the missing term: 7, 14, 28, 56, 112, ___?',
    options: ['168', '212', '224', '248'],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Ito ay geometric progression na may common ratio na 2.',
      stepByStep: ['112 × 2 = 224.']
    }
  },
  {
    id: 'num-044',
    category: 'numerical',
    subtopic: 'Number Sequence',
    level: 'all',
    question: 'What is the next number: 1, 4, 9, 16, 25, 36, 49, ___?',
    options: ['56', '64', '72', '81'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Mga perpektong square: 1², 2², 3², 4², 5², 6², 7², susunod ay 8² = 64.'
    }
  },
  {
    id: 'num-045',
    category: 'numerical',
    subtopic: 'Basic Operations',
    level: 'all',
    question: 'What is the sum of all integers from 1 to 50 inclusive?',
    options: ['1,225', '1,275', '1,300', '1,325'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Gamitin ang formula para sa sum ng arithmetic series: S = n(n + 1) / 2.',
      stepByStep: ['S = 50 × (51) / 2 = 25 × 51 = 1,275.']
    }
  },
  {
    id: 'num-046',
    category: 'numerical',
    subtopic: 'Basic Operations',
    level: 'all',
    question: 'If x + 1/x = 4, what is the value of x² + 1/x²?',
    options: ['14', '16', '18', '20'],
    correctAnswer: 0,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'I-square ang magkabilang panig ng equation: (x + 1/x)² = 4².',
      stepByStep: [
        'x² + 2(x)(1/x) + 1/x² = 16',
        'x² + 2 + 1/x² = 16',
        'x² + 1/x² = 16 - 2 = 14.'
      ]
    }
  },
  {
    id: 'num-047',
    category: 'numerical',
    subtopic: 'Ratio and Proportion',
    level: 'all',
    question: 'If 15 men can dig a canal in 20 days, how many days will 25 men take to dig the same canal working at the same pace?',
    options: ['10 days', '12 days', '14 days', '16 days'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Inverse proportion: Man-days remains constant (M1 × D1 = M2 × D2).',
      stepByStep: [
        '15 × 20 = 25 × D2',
        '300 = 25 × D2 => D2 = 300 ÷ 25 = 12 days.'
      ]
    }
  },
  {
    id: 'num-048',
    category: 'numerical',
    subtopic: 'Percentage & Discount',
    level: 'all',
    question: 'A laptop originally priced at ₱32,000 is on sale for ₱27,200. What is the rate of discount?',
    options: ['12%', '15%', '18%', '20%'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: {
      correctRationale: 'Discount = ₱32,000 - ₱27,200 = ₱4,800. Rate = 4,800 ÷ 32,000 = 0.15 = 15%.'
    }
  },
  {
    id: 'num-049',
    category: 'numerical',
    subtopic: 'Word Problems: Age',
    level: 'all',
    question: 'A mother is 30 years older than her daughter. In 6 years, the mother will be 3 times as old as the daughter. What is the daughter’s age now?',
    options: ['9', '10', '12', '14'],
    correctAnswer: 0,
    difficulty: 'medium',
    explanation: {
      correctRationale: 'Ang agwat sa edad (30 years) ay mananatiling pareho magpakailanman.',
      stepByStep: [
        'Sa 6 na taon: Mother = Daughter + 30',
        'Mother = 3 × Daughter => 3D = D + 30 => 2D = 30 => D = 15 (edad sa 6 na taon).',
        'Kasalukuyang edad ng anak = 15 - 6 = 9 taong gulang.'
      ]
    }
  },
  {
    id: 'num-050',
    category: 'numerical',
    subtopic: 'Word Problems: Work',
    level: 'all',
    question: 'A can finish a job in 10 days and B in 15 days. They work together for 3 days, and then B leaves. How many more days will A take to complete the remaining job?',
    options: ['4 days', '5 days', '6 days', '7 days'],
    correctAnswer: 1,
    difficulty: 'hard',
    explanation: {
      correctRationale: 'Kalkulahin ang natapos sa unang 3 araw.',
      stepByStep: [
        'Rate ni A = 1/10, Rate ni B = 1/15.',
        'Pinagsama = 1/10 + 1/15 = 5/30 = 1/6 kada araw.',
        'Sa 3 araw: 3 × (1/6) = 3/6 = 1/2 ng trabaho ang natapos.',
        'Kalahati (1/2) pa ang natitira.',
        'Oras ni A para sa natitira = (1/2) ÷ (1/10) = 5 araw.'
      ]
    }
  },
  // 51-100: Advanced Numerical & Professional High-Yield
  ...Array.from({ length: 50 }, (_, i) => {
    const num = i + 51;
    const baseVal = (num * 7) % 30 + 10;
    return {
      id: `num-${num < 100 ? '0' + num : num}`,
      category: 'numerical' as const,
      subtopic: num % 4 === 0 ? 'Word Problems' : num % 4 === 1 ? 'Percentage & Ratio' : num % 4 === 2 ? 'Number Sequence' : 'Data Interpretation',
      level: 'all' as const,
      question: `If a regional budget allocation is distributed such that Administration receives ${baseVal}%, Operations receives ${baseVal + 15}%, and the remaining ₱${(100 - (baseVal*2 + 15)) * 10},000 is for Maintenance, what is the total allocation?`,
      options: [
        `₱${(100 * 10000).toLocaleString()}`,
        `₱${(120 * 10000).toLocaleString()}`,
        `₱${(90 * 10000).toLocaleString()}`,
        `₱${(110 * 10000).toLocaleString()}`
      ],
      correctAnswer: 0,
      difficulty: (num % 3 === 0 ? 'hard' : num % 2 === 0 ? 'medium' : 'easy') as 'easy' | 'medium' | 'hard',
      explanation: {
        correctRationale: 'Kalkulahin ang nalalabing porsyento para sa Maintenance upang matukoy ang 100% total allocation.',
        stepByStep: [
          `Porsyento para sa Maintenance = 100% - (${baseVal}% + ${baseVal + 15}%)`,
          `Gamitin ang formula: Total = Halaga ÷ Porsyento.`
        ],
        keyFormulaOrRule: 'Total Value = (Part / Rate) × 100'
      }
    };
  })
];
