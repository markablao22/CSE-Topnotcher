# CSE Topnotcher — Philippine Civil Service Exam (CSE) Reviewer 🇵🇭

Isang komprehensibong web application para sa paghahanda sa **Philippine Civil Service Commission (CSC) Career Service Examination** (Professional at Sub-Professional levels).

![Philippine Civil Service Exam Reviewer](src/assets/images/cse_study_banner_1793651634842.jpg)

---

## 🌟 Mga Tampok (Key Features)

### 1. 500 Curated Official Civil Service Questions
Naglalaman ng kumpletong 500 tanong na hinati sa 5 opisyal na subtests:
- **Kakayahang Pamilang (Numerical Ability - 100 Qs)**: Word Problems (Age, Work, Distance, Mixture, Percentages, Profit/Loss), Number Sequences, Fractions, at Data Interpretation.
- **Kakayahang Mapanuri (Analytical Ability - 100 Qs)**: Syllogisms, Word Association, Analogy, Logical Deduction, Assumptions, at Data Sufficiency.
- **Kakayahang Berbal (Verbal Ability - 120 Qs)**: Grammar & Correct Usage, Subject-Verb Agreement, Synonyms & Antonyms, Paragraph Organization, at Reading Comprehension.
- **Pangkalahatang Kaalaman (General Information - 100 Qs)**: 1987 Konstitusyon ng Pilipinas (Bill of Rights, Accountability, Constitutional Commissions), Republic Act 6713 (Code of Conduct and Ethical Standards for Public Officials and Employees), Karapatang Pantao, at Environmental Management (RA 9003, Clean Air Act).
- **Kakayahang Pang-Klerikal (Clerical Ability - 80 Qs)**: Alphabetical Indexing Rules, Filing Systems, Clerical Reasoning, Error Checking, at Spelling.

### 2. Opisyal na 'Simulated Exam' Feature (CSC Blueprint)
- **Professional Level**: Eksaktong 170 items sa loob ng 3 oras at 10 minuto (190 mins).
- **Sub-Professional Level**: Eksaktong 165 items sa loob ng 2 oras at 40 minuto (160 mins).
- **Interactive Scantron OMR Sheet**: Maaaring mag-shade ng bilog (A, B, C, D) katulad ng sa aktuwal na pagsusulit.
- **Proctor Countdown Clock**: May awtomatikong audio bell at babala sa natitirang 30 mins, 15 mins, at 5 mins.
- **Opisyal na Report of Rating**: Awtomatikong bumubuo ng opisyal na pagsusuri ng marka batay sa **80.00% passing threshold** ng CSC.

### 3. Awtomatikong Scoring at Detalyadong Paliwanag
- May breakdown ng marka bawat subseksyon na may kasamang CSC standard weights.
- **Detalyadong Paliwanag**:
  - Hakbang-sa-hakbang na solusyon sa math (*step-by-step calculation*).
  - Batayan sa batas (*Constitutional Article* at *RA 6713 Section* citations) o tuntunin sa balarila.
  - Pagsusuri kung bakit mali ang ibang pagpipilian (*distractor analysis*).

### 4. Spaced Repetition Reviewer (Balikan ang mga Maling Sagot)
- Awtomatikong iniipon ang bawat tanong na iyong naipagkamali.
- May interactive flashcard mode na may *"Kabisado Ko Na (Mastered)"* button.

### 5. Pambansa at Rehiyonal na Leaderboard
- Top 3 Podium (Gold, Silver, Bronze) at pagraranggo sa 17 rehiyon ng Pilipinas (NCR, CALABARZON, Central Luzon, Visayas, Mindanao, atbp.).
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
