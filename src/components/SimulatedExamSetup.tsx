import React, { useState } from 'react';
import { 
  ShieldCheck, Clock, FileText, CheckCircle2, 
  AlertTriangle, ArrowRight, UserCheck, Award, Building, Sparkles
} from 'lucide-react';
import { ExamLevel } from '../types/quiz';
import { OFFICIAL_CSC_BLUEPRINT, SUBSECTIONS_META } from '../data/questions';
import { UserProfile } from '../types/quiz';
import { sound } from '../utils/sound';

interface SimulatedExamSetupProps {
  userProfile: UserProfile;
  onLaunchExam: (level: ExamLevel, preset: 'official_full' | 'half_length' | 'diagnostic_50') => void;
  onBack: () => void;
}

export const SimulatedExamSetup: React.FC<SimulatedExamSetupProps> = ({
  userProfile,
  onLaunchExam,
  onBack
}) => {
  const [level, setLevel] = useState<ExamLevel>(userProfile.targetLevel);
  const [preset, setPreset] = useState<'official_full' | 'half_length' | 'diagnostic_50'>('official_full');

  const blueprint = OFFICIAL_CSC_BLUEPRINT[level];
  const getPresetCategoryCount = (
    item: typeof blueprint.categoryBreakdown[number],
    selectedPreset: 'official_full' | 'half_length' | 'diagnostic_50' = preset
  ) => {
    const available = SUBSECTIONS_META[item.category]?.totalAvailable ?? 0;
    const target = selectedPreset === 'official_full'
      ? item.count
      : selectedPreset === 'half_length'
      ? Math.max(Math.round(item.count / 2), 5)
      : Math.max(Math.round(item.count * (50 / blueprint.totalQuestions)), 5);
    return Math.min(available, target);
  };

  const getPresetTotalQuestions = (selectedPreset: 'official_full' | 'half_length' | 'diagnostic_50') =>
    blueprint.categoryBreakdown.reduce((sum, item) => sum + getPresetCategoryCount(item, selectedPreset), 0);

  const getPresetTimeLimit = (selectedPreset: 'official_full' | 'half_length' | 'diagnostic_50') =>
    selectedPreset === 'diagnostic_50'
      ? 60
      : Math.max(1, Math.round(blueprint.timeLimitMinutes * (getPresetTotalQuestions(selectedPreset) / blueprint.totalQuestions)));

  // Simulated Examinee ID & Testing Room
  const examineeNumber = `2026-${level === 'professional' ? 'PROF' : 'SUBP'}-${Math.abs(userProfile.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 1000) * 7 % 90000 + 10000)}`;
  const roomAssignment = `Room 204 · Bulwagang Rizal, Testing Center #07`;

  const totalQuestions = getPresetTotalQuestions(preset);
  const timeLimit = getPresetTimeLimit(preset);

  const hours = Math.floor(timeLimit / 60);
  const minutes = timeLimit % 60;
  const timeFormatted = `${hours} oras ${minutes > 0 ? `at ${minutes} minuto` : ''}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Official CSC Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-slate-100 dark:border-slate-800 text-center sm:text-left">
          
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500/60 shadow-md shrink-0 bg-slate-900">
            <img 
              src="/src/assets/images/cse_hero_emblem_1793651615971.jpg" 
              alt="CSC Emblem" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              Independent CSE reviewer · Hindi kaanib sa CSC
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Practice Simulation ng Career Service Examination
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              May OMR-style answer sheet, countdown timer, at automatic practice scoring. Ang aktuwal na bilang ng tanong ay nakadepende sa kasalukuyang question bank; hindi ito opisyal na CSC exam.
            </p>
          </div>

        </div>

        {/* Examinee Simulated Admission Slip */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Pangalan ng Examinee:</span>
            <span className="font-bold text-slate-900 dark:text-white text-sm">{userProfile.name}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Examinee Number:</span>
            <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm tabular-nums">{examineeNumber}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Testing Center & Room:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{roomAssignment}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Rehiyon:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{userProfile.region}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Exam Level and Preset Configuration */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Step 1: Select Examination Level */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              1. Piliin ang Antas ng Pagsusulit
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => { sound.playTap(); setLevel('professional'); }}
                className={`p-4 rounded-xl border text-left transition-all relative ${
                  level === 'professional'
                    ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/40 ring-2 ring-amber-500/50'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    Professional Level
                  </span>
                  {level === 'professional' && <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                </div>
                <div className="text-xs text-amber-700 dark:text-amber-400 font-semibold mb-2">
                  {blueprint.totalQuestions} Target Items · {blueprint.timeLimitMinutes} minuto target
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Sumusuri sa Verbal Ability, Analytical Ability (Syllogisms, Logic), Numerical Ability, at General Information para sa 2nd-level government positions.
                </p>
              </button>

              <button
                type="button"
                onClick={() => { sound.playTap(); setLevel('sub_professional'); }}
                className={`p-4 rounded-xl border text-left transition-all relative ${
                  level === 'sub_professional'
                    ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/40 ring-2 ring-amber-500/50'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    Sub-Professional Level
                  </span>
                  {level === 'sub_professional' && <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                </div>
                <div className="text-xs text-amber-700 dark:text-amber-400 font-semibold mb-2">
                  {blueprint.totalQuestions} Target Items · {blueprint.timeLimitMinutes} minuto target
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Sumusuri sa Verbal Ability, Clerical Ability (Alphabetical Indexing, Filing Rules), Numerical, at General Info para sa 1st-level clerical roles.
                </p>
              </button>
            </div>
          </div>

          {/* Step 2: Select Simulation Length Preset */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              2. Haba ng Simulasyon
            </h2>

            <div className="space-y-3">
              {/* Option A: Official Actual Full Simulation */}
              <button
                type="button"
                onClick={() => { sound.playTap(); setPreset('official_full'); }}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between gap-4 ${
                  preset === 'official_full'
                    ? 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/40 ring-2 ring-amber-500/50'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      Full-Length Practice Simulation
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-amber-500 text-white uppercase tracking-wider">
                      Practice
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Available full-length practice set. Ang bilang at section distribution ay limitado sa kasalukuyang question bank.
                  </p>
                </div>
                <span className="font-extrabold text-sm text-amber-700 dark:text-amber-300 whitespace-nowrap">
                  {getPresetTotalQuestions('official_full')} Qs
                </span>
              </button>

              {/* Option B: Half-Length Speed Calibration */}
              <button
                type="button"
                onClick={() => { sound.playTap(); setPreset('half_length'); }}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between gap-4 ${
                  preset === 'half_length'
                    ? 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/40 ring-2 ring-amber-500/50'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div>
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    Half-Length Simulation (Speed Calibration)
                  </span>
                  <p className="text-xs text-slate-500 mt-1">
                    {getPresetTotalQuestions('half_length')} items sa loob ng {getPresetTimeLimit('half_length')} minuto. Tamang-tama kung nais mo ng mabilisang simulasyon.
                  </p>
                </div>
                <span className="font-bold text-xs text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  {getPresetTotalQuestions('half_length')} Qs
                </span>
              </button>

              {/* Option C: Diagnostic 50 Qs */}
              <button
                type="button"
                onClick={() => { sound.playTap(); setPreset('diagnostic_50'); }}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between gap-4 ${
                  preset === 'diagnostic_50'
                    ? 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/40 ring-2 ring-amber-500/50'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div>
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    Diagnostic Sprint (up to 50 Items)
                  </span>
                  <p className="text-xs text-slate-500 mt-1">
                    Hanggang 50 items sa loob ng 60 minuto; maaaring mas kaunti depende sa available questions sa napiling level.
                  </p>
                </div>
                <span className="font-bold text-xs text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  {getPresetTotalQuestions('diagnostic_50')} Qs
                </span>
              </button>
            </div>
          </div>

          {/* Subtest Distribution Table Preview */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
              Practice section distribution (app configuration):
            </h3>

            <div className="space-y-2.5">
              {blueprint.categoryBreakdown.map(item => {
                const meta = SUBSECTIONS_META[item.category];
                const count = getPresetCategoryCount(item);

                return (
                  <div key={item.category} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">
                        {meta?.name} ({meta?.tagalogName})
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {item.description}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-extrabold text-slate-900 dark:text-white tabular-nums block">
                        {count} items
                      </span>
                      <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                        Weight: {item.weight}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Official Rules & Launch Card */}
        <div className="space-y-6">
          
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm mb-3">
              <AlertTriangle className="w-4 h-4" />
              <span>Practice exam settings</span>
            </div>

            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2.5 list-disc list-inside leading-relaxed">
              <li>
                <strong>Passing Mark:</strong> Ang <strong>80.00%</strong> ay practice target lamang; hindi nito iginagawad o pinatutunayan ang Civil Service Eligibility.
              </li>
              <li>
                <strong>Countdown Timer:</strong> Mahigpit na ipinapatupad ang takdang oras na <strong>{timeFormatted}</strong>. Awtomatikong magsusumite ang test kapag natapos ang oras.
              </li>
              <li>
                <strong>Paghahabol sa Oras:</strong> May maririnig na proctor warning bell sa natitirang 30 mins, 15 mins, at 5 mins.
              </li>
              <li>
                <strong>OMR Answer Sheet Shading:</strong> Tiyaking ma-shade ang bawat aytem. Walang bawas sa maling sagot (*no negative marking*), kaya sagutan ang lahat.
              </li>
              <li>
                <strong>Detalyadong Ulat at Paliwanag:</strong> Matapos ang pagsusulit, makikita mo ang practice score report at step-by-step na paliwanag sa bawat tanong.
              </li>
            </ul>

            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  sound.playTap();
                  onLaunchExam(level, preset);
                }}
                className="w-full py-3.5 px-4 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-slate-950 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Pumasok sa Testing Room ({totalQuestions} Qs)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => { sound.playTap(); onBack(); }}
                className="w-full mt-2.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-center"
              >
                Bumalik sa Overview
              </button>
            </div>
          </div>

          {/* Quick Summary Pill */}
          <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Simulated Exam Mode Active</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
              Practice estimate lamang ito. Maaaring magkaiba ang aktuwal na exam format, content at scoring.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
