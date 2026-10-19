import React, { useState } from 'react';
import { SupportedLanguage, CareTriageResult, ActiveTab } from '../types';
import { translations } from '../utils/i18n';
import { COUNTRY_EMERGENCY_DATA } from '../utils/emergencyData';
import { evaluateCareTriage } from '../utils/safety';
import { EmergencyMedicinesGuide } from './EmergencyMedicinesGuide';
import {
  HelpCircle,
  ShieldAlert,
  AlertTriangle,
  PhoneCall,
  CalendarCheck,
  Stethoscope,
  Info,
  CheckCircle,
  Loader2,
  ExternalLink,
  ChevronRight,
  Phone
} from 'lucide-react';

interface CareGuidanceProps {
  language: SupportedLanguage;
  onNavigate?: (tab: ActiveTab, prefill?: string) => void;
}

export const CareGuidance: React.FC<CareGuidanceProps> = ({ language, onNavigate }) => {
  const [concern, setConcern] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [triageResult, setTriageResult] = useState<CareTriageResult | null>(null);
  const [aiGuidance, setAiGuidance] = useState<string | null>(null);
  const [citations, setCitations] = useState<Array<{ title: string; url: string }>>([]);
  const [error, setError] = useState<string | null>(null);

  const t = translations[language].care;
  const tChat = translations[language].chat;
  const emergencyInfo = COUNTRY_EMERGENCY_DATA[language];

  const sampleScenariosByLang: Record<SupportedLanguage, Array<{ title: string; text: string }>> = {
    en: [
      {
        title: 'Tension Headache & Screen Strain',
        text: 'I have had a mild, dull headache across my forehead for two days after long hours on my computer. No nausea or vision changes.',
      },
      {
        title: 'Seasonal Fatigue & Hydration',
        text: 'Feeling unusually fatigued and mild dizziness when standing up quickly during hot weather. Drinking about 2 glasses of water a day.',
      },
      {
        title: 'Emergency Test Scenario (Chest Pain)',
        text: 'Experiencing sudden crushing chest pain radiating to the left arm and shortness of breath.',
      },
      {
        title: 'Emergency Test Scenario (Stroke Signs)',
        text: 'My relative suddenly has face drooping on one side and slurred speech.',
      },
    ],
    ur: [
      {
        title: 'سر درد اور آنکھوں کا تناؤ',
        text: 'کمپیوٹر پر زیادہ دیر کام کرنے کے بعد دو دن سے ماتھے پر ہلکا درد ہے، کوئی متلی یا بینائی کی خرابی نہیں ہے۔',
      },
      {
        title: 'تھکن اور پانی کی کمی',
        text: 'گرمی کے موسم میں اچانک کھڑے ہونے پر ہلکا چکر آنا اور شدید تھکن محسوس ہونا۔ دن میں بمشکل دو گلاس پانی پیتا ہوں۔',
      },
      {
        title: 'ایمرجنسی ٹیسٹ (سینے میں شدید درد)',
        text: 'سینے میں شدید دباؤ اور درد ہے جو بائیں بازو میں پھیل رہا ہے اور سانس لینے میں دشواری ہو رہی ہے۔',
      },
      {
        title: 'ایمرجنسی ٹیسٹ (فالج کی علامات)',
        text: 'میرے رشتہ دار کا چہرہ اچانک ایک طرف جھک گیا ہے اور بولنے میں شدید لڑکھڑاہٹ ہے۔',
      },
    ],
    bn: [
      {
        title: 'টেনশনজনিত মাথাব্যথা ও ক্লান্তি',
        text: 'কম্পিউটারে দীর্ঘক্ষণ কাজের পর দুই দিন ধরে কপালে মৃদু মাথাব্যথা হচ্ছে। বমি বমি ভাব বা দৃষ্টি বিভ্রম নেই।',
      },
      {
        title: 'পানিশূন্যতা ও অবসাদ',
        text: 'গরম আবহাওয়ায় দ্রুত উঠে দাঁড়ালে মাথা ঘোরা ও অতিরিক্ত ক্লান্তি লাগছে। সারাদিনে মাত্র দুই গ্লাস পানি পান করছি।',
      },
      {
        title: 'জরুরি টেস্ট (বুকে তীব্র ব্যথা)',
        text: 'হঠাৎ করে বুকে অসহ্য চাপ ও তীব্র ব্যথা যা বাম হাতের দিকে যাচ্ছে এবং মারাত্মক শ্বাসকষ্ট হচ্ছে।',
      },
      {
        title: 'জরুরি টেস্ট (স্ট্রোকের লক্ষণ)',
        text: 'আমার আত্মীয়ের হঠাৎ একপাশের মুখ বেঁকে গেছে এবং কথা সম্পূর্ণ জড়িয়ে যাচ্ছে।',
      },
    ],
    ja: [
      {
        title: '緊張型頭痛と眼精疲労',
        text: '長時間のデスクワーク後、額全体に鈍い頭痛が2日間続いています。吐き気や視覚異常はありません。',
      },
      {
        title: '季節的な疲労と水分不足',
        text: '暑い時期に立ち上がるとふらつきがあり、体が非常にだるいです。1日にコップ2杯程度しか水分を取っていません。',
      },
      {
        title: '緊急テスト（激しい胸痛）',
        text: '胸が締め付けられるような激しい痛みが突然生じ、左腕に広がり、強い息苦しさがあります。',
      },
      {
        title: '緊急テスト（脳卒中の前兆）',
        text: '家族の顔の片側が急に下がり、ろれつが回らなくなっています。',
      },
    ],
  };

  const sampleScenarios = sampleScenariosByLang[language] || sampleScenariosByLang.en;

  const handleAnalyze = async (customQuery?: string) => {
    const query = customQuery || concern;
    if (!query.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);
    setTriageResult(null);
    setAiGuidance(null);
    setCitations([]);

    try {
      const response = await fetch('/api/care-guidance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          concern: query.trim(),
          language,
        }),
      });

      if (!response.ok) {
        const localTriage = evaluateCareTriage(query.trim(), language);
        const guidance = localTriage.guidanceText[language] || localTriage.guidanceText.en;
        setTriageResult(localTriage);
        setAiGuidance(`### 🩺 Educational Health Guidance\n${guidance.bannerBody}\n\n**Helpful Questions for Your Doctor:**\n${guidance.doctorQuestions.map((q) => `• ${q}`).join('\n')}\n\n**Red Flag Symptoms to Watch For:**\n${guidance.redFlags.map((r) => `• ${r}`).join('\n')}`);
        setCitations([{ title: 'MedlinePlus - When to Contact Your Doctor', url: 'https://medlineplus.gov' }]);
        return;
      }

      const data = await response.json();
      setTriageResult(data.triage);
      setAiGuidance(data.aiGuidance);
      setCitations(data.citations || []);
    } catch (err: unknown) {
      console.warn('Care guidance network error, using local verified triage:', err);
      const localTriage = evaluateCareTriage(query.trim(), language);
      const guidance = localTriage.guidanceText[language] || localTriage.guidanceText.en;
      setTriageResult(localTriage);
      setAiGuidance(`### 🩺 Educational Health Guidance\n${guidance.bannerBody}\n\n**Helpful Questions for Your Doctor:**\n${guidance.doctorQuestions.map((q) => `• ${q}`).join('\n')}\n\n**Red Flag Symptoms to Watch For:**\n${guidance.redFlags.map((r) => `• ${r}`).join('\n')}`);
      setCitations([{ title: 'MedlinePlus - When to Contact Your Doctor', url: 'https://medlineplus.gov' }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Header with iPhone Liquid Glass Surface */}
      <div className="liquid-glass-card rounded-3xl p-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/70 backdrop-blur-xl text-[#0369a1] border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-[#0284c7]" />
          <span>{t.badge}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0C4A6E] tracking-tight">
          {t.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#334E68] mt-1 max-w-2xl leading-relaxed font-normal">
          {t.subtitle}
        </p>
      </div>

      {/* Input Section Card with iPhone Liquid Glass Treatment */}
      <div className="liquid-glass-panel rounded-3xl p-6 sm:p-8 space-y-4">
        <div>
          <label
            htmlFor="symptom-input"
            className="block text-xs font-bold text-[#0C4A6E] uppercase tracking-wider mb-2"
          >
            {t.inputLabel}
          </label>
          <textarea
            id="symptom-input"
            rows={4}
            value={concern}
            onChange={(e) => setConcern(e.target.value)}
            placeholder={t.inputPlaceholder}
            className="w-full p-4 rounded-2xl bg-white/85 backdrop-blur-2xl border border-white/95 focus:border-[#0ea5e9] focus:ring-4 focus:ring-sky-400/20 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02),0_4px_16px_rgba(2,132,199,0.06)] text-xs sm:text-sm text-[#0C4A6E] placeholder-slate-400 focus:outline-none transition-all"
          />
        </div>

        {/* Sample Scenario Chips (Fully Translated) */}
        <div>
          <span className="text-[11px] font-bold text-[#64748B] block mb-2">
            {t.samplePromptsTitle}
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleScenarios.map((sc, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setConcern(sc.text);
                  handleAnalyze(sc.text);
                }}
                className="liquid-glass-pill text-xs px-3.5 py-1.5 rounded-xl text-slate-700 hover:text-[#0284c7] font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <span>{sc.title}</span>
                <ChevronRight className="w-3 h-3 text-sky-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => handleAnalyze()}
            disabled={!concern.trim() || isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl liquid-glass-primary text-white text-xs sm:text-sm font-bold shadow-md disabled:opacity-40 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-sky-200" />
                <span>{t.analyzing}</span>
              </>
            ) : (
              <>
                <Stethoscope className="w-4 h-4 text-sky-200" />
                <span>{t.submitBtn}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50/90 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 shadow-2xs">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Triage Outcome Display */}
      {triageResult && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-200">
          {triageResult.isEmergency ? (
            /* EMERGENCY PROTOCOL BANNER WITH COUNTRY-SPECIFIC EMERGENCY NUMBERS */
            <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-rose-600 to-red-700 text-white shadow-2xl space-y-6 border border-white/40">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-md shrink-0 shadow-sm">
                  <ShieldAlert className="w-8 h-8 text-white animate-bounce" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black tracking-widest uppercase bg-white/25 px-3 py-1 rounded-full">
                      {t.emergencyDetectedAlert}
                    </span>
                    <span className="text-xs font-bold bg-black/20 px-2.5 py-1 rounded-full">
                      {emergencyInfo.flagEmoji} {emergencyInfo.countryName}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black mt-2">
                    {triageResult.guidanceText[language]?.bannerTitle ||
                      triageResult.guidanceText.en.bannerTitle}
                  </h2>
                  <p className="text-xs sm:text-sm font-medium text-rose-100 mt-1">
                    {triageResult.guidanceText[language]?.bannerBody ||
                      triageResult.guidanceText.en.bannerBody}
                  </p>
                </div>
              </div>

              {/* Immediate Action Steps */}
              <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-md space-y-3 border border-white/20">
                <span className="text-xs font-bold uppercase tracking-wider block text-rose-200">
                  {language === 'ur'
                    ? 'فوری لازمی اقدامات:'
                    : language === 'bn'
                    ? 'অবিলম্বে প্রয়োজনীয় পদক্ষেপসমূহ:'
                    : language === 'ja'
                    ? '直ちに行うべき緊急手順:'
                    : 'Immediate Required Actions:'}
                </span>
                <ul className="space-y-2 text-xs sm:text-sm">
                  {(
                    triageResult.guidanceText[language]?.actionSteps ||
                    triageResult.guidanceText.en.actionSteps
                  ).map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 font-medium">
                      <span className="w-2 h-2 rounded-full bg-white mt-2 shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call to Action Button with Real Country Emergency Number */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={emergencyInfo.primaryTel}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-red-700 hover:bg-red-50 font-black text-sm shadow-xl transition-transform duration-200 transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span className="text-base">{emergencyInfo.flagEmoji}</span>
                  <PhoneCall className="w-5 h-5 text-red-600 animate-pulse" />
                  <span>{emergencyInfo.primaryLabel}</span>
                </a>

                {emergencyInfo.secondaryNumber && (
                  <a
                    href={emergencyInfo.secondaryTel}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-red-800/80 hover:bg-red-800 text-white font-bold text-xs border border-white/30 transition-all cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{emergencyInfo.secondaryLabel}</span>
                  </a>
                )}
              </div>
              <p className="text-xs text-rose-200 pt-1">
                {emergencyInfo.emergencyDepartmentAdvice}
              </p>
            </div>
          ) : (
            /* NON-EMERGENCY EDUCATIONAL GUIDANCE */
            <div className="space-y-5">
              {/* Guidance Title & Summary */}
              <div className="liquid-glass-card rounded-3xl p-6 sm:p-8 space-y-4 border-l-4 border-l-[#0284c7]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 shadow-2xs">
                    <CalendarCheck className="w-5 h-5 text-[#0284c7]" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-[#0C4A6E]">
                      {triageResult.guidanceText[language]?.bannerTitle ||
                        triageResult.guidanceText.en.bannerTitle}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      {triageResult.urgencyLevel === 'prompt_consultation'
                        ? t.whenToSeeDoctor
                        : t.guidanceTitle}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-2 border-t border-sky-100/70 font-normal">
                  {triageResult.guidanceText[language]?.bannerBody ||
                    triageResult.guidanceText.en.bannerBody}
                </p>

                {/* AI Context if available */}
                {aiGuidance && (
                  <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/90 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2 whitespace-pre-line font-normal">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0284c7] block">
                      {language === 'ur'
                        ? 'حیاتیاتی اور تعلیمی پس منظر:'
                        : language === 'bn'
                        ? 'শারীরবৃত্তীয় ও শিক্ষামূলক প্রেক্ষাপট:'
                        : language === 'ja'
                        ? '生理機能および教育的背景:'
                        : 'Physiological & Educational Context:'}
                    </span>
                    {aiGuidance}
                  </div>
                )}
              </div>

              {/* Two Column Grid: Questions to ask doctor & Warning Red Flags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Questions for Doctor */}
                <div className="liquid-glass-card rounded-3xl p-6 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-[#0284c7]" />
                    <span>{t.questionsForDoctor}</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {(
                      triageResult.guidanceText[language]?.doctorQuestions ||
                      triageResult.guidanceText.en.doctorQuestions
                    ).map((q, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#0284c7] mt-0.5 shrink-0" />
                        <span className="leading-relaxed font-medium">{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Warning Red Flags */}
                <div className="rounded-3xl p-6 space-y-3 border border-amber-200/80 bg-gradient-to-br from-amber-50/70 via-white/70 to-amber-50/50 backdrop-blur-xl shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>{t.redFlagsTitle}</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {(
                      triageResult.guidanceText[language]?.redFlags ||
                      triageResult.guidanceText.en.redFlags
                    ).map((flag, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <span className="leading-relaxed font-medium">{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Citations if available */}
              {citations.length > 0 && (
                <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/95 space-y-2 text-xs shadow-2xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0369a1] block">
                    {tChat.sourcesLabel}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {citations.map((c, i) => (
                      <a
                        key={i}
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/70 hover:bg-white/95 text-[#0C4A6E] hover:text-[#0284c7] border border-white/90 text-[11px] font-medium transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span className="truncate max-w-[200px]">{c.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Emergency First-Aid Medicines & Life-Saving Guide */}
      <EmergencyMedicinesGuide
        language={language}
        onAskAi={(question) => onNavigate?.('chat', question)}
      />

      {/* Regulatory / Safety Disclaimer */}
      <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-white/90 text-slate-600 text-xs flex items-start gap-2.5 leading-relaxed shadow-2xs">
        <Info className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
        <p>{t.disclaimer}</p>
      </div>
    </div>
  );
};
