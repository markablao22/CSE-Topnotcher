# CSE Topnotcher — Philippine Civil Service Exam (CSE) Reviewer 🇵🇭

Isang komprehensibong web application para sa paghahanda sa **Philippine Civil Service Commission (CSC) Career Service Examination** (Professional at Sub-Professional levels).

![Philippine Civil Service Exam Reviewer](src/assets/images/cse_study_banner_1793651634842.jpg)

---

## 🌟 Mga Tampok (Key Features)

### 1. 110 Practice Questions (Current Question Bank)
Ang kasalukuyang repository ay may 110 practice questions. Hindi ito opisyal na CSC question bank:
- **Kakayahang Pamilang (Numerical Ability - 50 Qs)**: Word Problems (Age, Work, Distance, Mixture, Percentages, Profit/Loss), Number Sequences, Fractions, at Data Interpretation.
- **Kakayahang Mapanuri (Analytical Ability - 20 Qs)**: Syllogisms, Word Association, Analogy, Logical Deduction, Assumptions, at Data Sufficiency.
- **Kakayahang Berbal (Verbal Ability - 15 Qs)**: Grammar & Correct Usage, Subject-Verb Agreement, Synonyms & Antonyms, Paragraph Organization, at Reading Comprehension.
- **Pangkalahatang Kaalaman (General Information - 15 Qs)**: 1987 Konstitusyon ng Pilipinas (Bill of Rights, Accountability, Constitutional Commissions), Republic Act 6713 (Code of Conduct and Ethical Standards for Public Officials and Employees), Karapatang Pantao, at Environmental Management (RA 9003, Clean Air Act).
- **Kakayahang Pang-Klerikal (Clerical Ability - 10 Qs)**: Alphabetical Indexing Rules, Filing Systems, Clerical Reasoning, Error Checking, at Spelling.

### 2. Configurable Practice Exam Simulation
- **Professional Level target**: 170 items / 190 minutes; actual questions are limited by the current question bank.
- **Sub-Professional Level target**: 165 items / 160 minutes; actual questions are limited by the current question bank.
- **Interactive Scantron OMR Sheet**: Maaaring mag-shade ng bilog (A, B, C, D) katulad ng sa aktuwal na pagsusulit.
- **Proctor Countdown Clock**: May awtomatikong audio bell at babala sa natitirang 30 mins, 15 mins, at 5 mins.
- **Practice Score Report**: Awtomatikong bumubuo ng practice score report gamit ang 80% practice target; hindi ito CSC rating o eligibility determination.

### 3. Awtomatikong Scoring at Detalyadong Paliwanag
- May breakdown ng marka bawat subseksyon na may kasamang CSC standard weights.
- **Detalyadong Paliwanag**:
  - Hakbang-sa-hakbang na solusyon sa math (*step-by-step calculation*).
  - Batayan sa batas (*Constitutional Article* at *RA 6713 Section* citations) o tuntunin sa balarila.
  - Pagsusuri kung bakit mali ang ibang pagpipilian (*distractor analysis*).

### 4. Spaced Repetition Reviewer (Balikan ang mga Maling Sagot)
- Awtomatikong iniipon ang bawat tanong na iyong naipagkamali.
- May interactive flashcard mode na may *"Kabisado Ko Na (Mastered)"* button.

### 5. Local Browser Leaderboard
- Top 3 podium at regional filters para sa mga score na naka-save sa browser na ito; hindi ito live national ranking.
- Nako-customize na profile ng Examinee (Pangalan, Rehiyon, Antas, at Avatar).

### 6. Daily Streak Counter
- Animated fire icon at 7-day mini-calendar tracker upang hikayatin ang araw-araw na pag-aaral.

### 7. Web Audio Synthesizer
- Zero external audio assets; gumagamit ng procedural Web Audio API para sa chimes, countdown ticking, combo streaks, at passing fanfare.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4 (with Dark Mode support)
- **Icons**: Lucide React
- **Audio**: Web Audio API (procedural synthesized sounds)
- **Storage**: Browser LocalStorage para sa profile, leaderboard records, test history, at bookmarks

---

## 🚀 Paano Patakbuhin (Getting Started)

### 1. I-clone ang Repository
```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

### 2. I-install ang Dependencies
```bash
npm install
```

### 3. Patakbuhin ang Development Server
```bash
npm run dev
```
Buksan ang browser sa `http://localhost:3000`.

### 4. I-build para sa Production
```bash
npm run build
```

---

## 📜 Lisensya
Apache-2.0 License.
Inihanda para sa mga Pilipinong kukuha ng Civil Service Examination. Mabuhay ang Kawani ng Gobyerno!
