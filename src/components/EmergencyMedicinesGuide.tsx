import React, { useState, useMemo } from 'react';
import {
  Pill,
  Heart,
  ShieldAlert,
  AlertTriangle,
  Wind,
  Zap,
  Droplets,
  Activity,
  Search,
  X,
  PhoneCall,
  MessageSquare,
  CheckCircle2,
  Info,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { SupportedLanguage, EmergencyMedicine, EmergencyMedCategory } from '../types/index.ts';
import { EMERGENCY_MEDICINES } from '../utils/emergencyMedicinesData.ts';
import { COUNTRY_EMERGENCY_DATA } from '../utils/emergencyData.ts';

interface EmergencyMedicinesGuideProps {
  language: SupportedLanguage;
  onAskAi?: (question: string) => void;
}

const CATEGORY_LABELS: Record<
  SupportedLanguage,
  Record<EmergencyMedCategory, string>
> = {
  en: {
    all: 'All Emergency Medicines',
    cardiac: 'Cardiac & Chest',
    anaphylaxis: 'Severe Anaphylaxis',
    respiratory: 'Asthma & Airway',
    overdose: 'Overdose Reversal',
    diabetic: 'Diabetic Hypoglycemia',
    trauma: 'Severe Hemorrhage',
    allergic: 'Allergies & Hives',
    dehydration: 'Severe Dehydration',
  },
  ur: {
    all: 'تمام ہنگامی ادویات',
    cardiac: 'دل اور سینے کا درد',
    anaphylaxis: 'شدید جان لیوا الرجی',
    respiratory: 'دمہ اور سانس کی بندش',
    overdose: 'اوورڈوز تریاق',
    diabetic: 'شوگر کی خطرناک کمی',
    trauma: 'شدید خون کا بہاؤ',
    allergic: 'الرجی اور خارش',
    dehydration: 'پانی کی شدید کمی',
  },
  bn: {
    all: 'সকল জরুরি ওষুধ',
    cardiac: 'হৃদরোগ ও বুকে ব্যথা',
    anaphylaxis: 'মারাত্মক অ্যালার্জি (অ্যানাফিল্যাক্সিস)',
    respiratory: 'হাঁপানি ও শ্বাসনালীর টান',
    overdose: 'ওভারডোজ নিরাময়কারী',
    diabetic: 'ডায়াবেটিক লো ব্লাড সুগার',
    trauma: 'মারাত্মক রক্তক্ষরণ রোধক',
    allergic: 'সাধারণ অ্যালার্জি ও চুলকানি',
    dehydration: 'তীব্র পানিশূন্যতা',
  },
  ja: {
    all: 'すべての緊急医薬品',
    cardiac: '心臓・胸痛救急',
    anaphylaxis: '重篤アナフィラキシー',
    respiratory: '喘息・気道閉塞',
    overdose: 'オピオイド過量拮抗',
    diabetic: '急性低血糖ショック',
    trauma: '外傷性大量出血',
    allergic: '急性アレルギー・じんましん',
    dehydration: '急性脱水症・熱中症',
  },
};

const UI_TEXT = {
  en: {
    badge: 'Emergency Pharmacotherapy & First Aid Reference',
    title: 'Emergency Life-Saving Medications',
    subtitle:
      'Verified clinical reference for medications used in life-threatening medical emergencies. Call emergency dispatch (911) immediately before administering any emergency medication.',
    searchPlaceholder: 'Search medicines by name, brand (e.g. EpiPen, Narcan), or emergency condition...',
    criticalOnlyToggle: 'Critical Life-Threatening Only',
    showingCount: (shown: number, total: number) => `Showing ${shown} of ${total} emergency medicines`,
    viewProtocol: 'View Emergency Protocol & Contraindications',
    hideProtocol: 'Close Protocol',
    howItWorks: 'How it Works (Mechanism):',
    administrationProtocol: 'Emergency Administration Protocol (Step-by-Step):',
    criticalWarningsTitle: 'Critical Safety Warnings:',
    contraindicationsTitle: 'DO NOT ADMINISTER IF (Contraindications):',
    emsScriptTitle: 'What to Tell 911 / EMS Dispatch:',
    askAiBtn: 'Ask AI Companion About This Medicine',
    callEmsBtn: 'Call Emergency Services',
    brandsLabel: 'Common Brands / Equivalents:',
    formLabel: 'Form / Dosage:',
    urgencyLabels: {
      critical: 'CRITICAL (Life-Threatening)',
      urgent: 'URGENT (First-Aid)',
      prescribed: 'PRESCRIBED ONLY',
      guided: 'EMS / POISON CONTROL DIRECTED',
    },
    educationalNotice:
      'Notice: This guide is strictly for educational health literacy and first-aid reference. Always prioritize immediate emergency medical dispatch. Never delay calling emergency services.',
    noResults: 'No emergency medicines match your search. Try another keyword or clear filters.',
    clearFilters: 'Clear Filters',
  },
  ur: {
    badge: 'ہنگامی فارماکوتھراپی اور ابتدائی طبی امداد کا رہنما',
    title: 'جان بچانے والی اہم ہنگامی ادویات',
    subtitle:
      'جان لیوا ہنگامی حالات میں استعمال ہونے والی بنیادی ادویات کی مستند تعلیمی معلومات۔ کوئی بھی دوا دینے سے پہلے لازماً 1122 یا ایمرجنسی عملے کو کال کریں۔',
    searchPlaceholder: 'دوا کے نام، برانڈ (مثلاً ایپی پین، نارکن) یا بیماری سے تلاش کریں...',
    criticalOnlyToggle: 'صرف انتہائی نازک اور جان لیوا',
    showingCount: (shown: number, total: number) => `${total} میں سے ${shown} ہنگامی ادویات ظاہر ہیں`,
    viewProtocol: 'طبی طریقہ کار اور انتباہات دیکھیں',
    hideProtocol: 'طریقہ کار بند کریں',
    howItWorks: 'دوا کیسے کام کرتی ہے (حیاتیاتی طریقہ کار):',
    administrationProtocol: 'ہنگامی استعمال کا مرحلہ وار طریقہ کار:',
    criticalWarningsTitle: 'انتہائی اہم حفاظتی انتباہات:',
    contraindicationsTitle: 'کن صورتوں میں ہرگز نہیں دینی (ممانعت):',
    emsScriptTitle: 'ریسکیو 1122 عملے کو کیا بتائیں:',
    askAiBtn: 'اس دوا کے بارے میں AI سے پوچھیں',
    callEmsBtn: 'ایمرجنسی سروسز کو کال کریں',
    brandsLabel: 'مشہور برانڈز / نام:',
    formLabel: 'شکل / خوراک:',
    urgencyLabels: {
      critical: 'انتہائی نازک (جان بچانے والی)',
      urgent: 'فوری ابتدائی امداد',
      prescribed: 'صرف ڈاکٹر کی تجویز پر',
      guided: 'ایمرجنسی عملے کی ہدایت پر',
    },
    educationalNotice:
      'اہم تنبیہ: یہ رہنمائی صرف تعلیمی آگاہی کے لیے ہے۔ اصل ایمرجنسی میں دوا دینے سے پہلے فوری طور پر ایمبولینس کو کال کریں۔',
    noResults: 'آپ کی تلاش کے مطابق کوئی دوا نہیں ملی۔ فلٹرز ختم کر کے دوبارہ کوشش کریں۔',
    clearFilters: 'فلٹرز ختم کریں',
  },
  bn: {
    badge: 'জরুরি ফার্মাকোথেরাপি ও ফার্স্ট এইড ওষুধ নির্দেশিকা',
    title: 'জীবন রক্ষাকারী জরুরি প্রাথমিক ওষুধসমূহ',
    subtitle:
      'জীবনঘাতী স্বাস্থ্য সংকটে ব্যবহৃত অত্যাবশ্যকীয় ওষুধের ক্লিনিক্যাল ও শিক্ষামূলক তথ্য। যেকোনো জরুরি ওষুধ প্রয়োগের পূর্বে অবিলম্বে ৯৯৯-এ কল করুন।',
    searchPlaceholder: 'ওষুধের নাম, ব্র্যান্ড (যেমন এপিপেন, নারকান) বা উপসর্গ দিয়ে খুঁজুন...',
    criticalOnlyToggle: 'শুধুমাত্র চরম জীবনঘাতী ওষুধ',
    showingCount: (shown: number, total: number) => `মোট ${total} টির মধ্যে ${shown} টি জরুরি ওষুধ প্রদর্শিত`,
    viewProtocol: 'জরুরি প্রয়োগবিধি ও সতর্কতা দেখুন',
    hideProtocol: 'প্রয়োগবিধি বন্ধ করুন',
    howItWorks: 'ওষুধটি কীভাবে কাজ করে (শারীরবৃত্তীয় কার্যপদ্ধতি):',
    administrationProtocol: 'জরুরি প্রয়োগের ধাপসমূহ (ধাপ-অনুসারে):',
    criticalWarningsTitle: 'গুরুত্বপূর্ণ জীবনরক্ষাকারী সতর্কতা:',
    contraindicationsTitle: 'যেসব ক্ষেত্রে একেবারেই প্রয়োগ করবেন না (নিষেধাজ্ঞা):',
    emsScriptTitle: 'জরুরি অ্যাম্বুলেন্সকে যা অবহিত করবেন:',
    askAiBtn: 'এই ওষুধ সম্পর্কে এআই সহকারীর সাথে কথা বলুন',
    callEmsBtn: 'জরুরি নম্বরে কল করুন',
    brandsLabel: 'পরিচিত ব্র্যান্ড / সমগোত্রীয়:',
    formLabel: 'ধরন / মাত্রা:',
    urgencyLabels: {
      critical: 'চরম জরুরি (জীবন বাঁচানোর জন্য)',
      urgent: 'প্রাথমিক চিকিৎসা সহায়তা',
      prescribed: 'শুধুমাত্র চিকিৎসকের প্রেসক্রিপশন থাকলে',
      guided: 'প্যারামেডিক বা বিষক্রিয়া কেন্দ্রের নির্দেশনায়',
    },
    educationalNotice:
      'সতর্কতা: এই নির্দেশিকাটি শুধুমাত্র স্বাস্থ্য শিক্ষা ও ফার্স্ট এইড সচেতনতার উদ্দেশ্যে রচিত। জরুরি পরিস্থিতিতে কখনোই অ্যাম্বুলেন্স ডাকতে দেরি করবেন না।',
    noResults: 'আপনার অনুসন্ধানের সাথে কোনো ওষুধ মেলেনি। ফিল্টার রিসেট করে আবার চেষ্টা করুন।',
    clearFilters: 'ফিল্টার রিসেট করুন',
  },
  ja: {
    badge: '緊急薬物療法および救急ファーストエイド参考情報',
    title: '救命のための緊急ファーストエイド医薬品',
    subtitle:
      '生命危機時に用いられる救急ファーストエイド医薬品の検証済み臨床教育リファレンス。薬を使用する前に必ず直ちに119番（救急要請）を行ってください。',
    searchPlaceholder: '薬品名、商品名（エピペン、ナーカン等）、緊急状態で検索...',
    criticalOnlyToggle: '生命危機レベル（最優先）のみ',
    showingCount: (shown: number, total: number) => `全${total}件中 ${shown}件の緊急医薬品を表示`,
    viewProtocol: '緊急使用プロトコルと禁忌事項を見る',
    hideProtocol: 'プロトコルを閉じる',
    howItWorks: '作用機序（体内での仕組み）:',
    administrationProtocol: '緊急投与プロトコル（ステップ別手順）:',
    criticalWarningsTitle: '極めて重要な救命上の注意:',
    contraindicationsTitle: '使用してはいけない場合（禁忌事項）:',
    emsScriptTitle: '119番（救急隊）に伝えるべきこと:',
    askAiBtn: 'この薬についてAIコンパニオンに質問する',
    callEmsBtn: '救急医療に通報する',
    brandsLabel: '主な商品名・同効薬:',
    formLabel: '剤形・規格用量:',
    urgencyLabels: {
      critical: '極めて緊急（生命直結）',
      urgent: '救急ファーストエイド',
      prescribed: '医師処方時のみ限定',
      guided: '救急隊・中毒情報センター指示',
    },
    educationalNotice:
      '注意事項：本ガイドは医療知識の啓発および応急手当の教育を目的としたものです。実際の緊急時には何よりもまず救急車の要請を最優先してください。',
    noResults: '検索条件に一致する緊急医薬品が見つかりませんでした。',
    clearFilters: 'フィルターを解除',
  },
};

export const EmergencyMedicinesGuide: React.FC<EmergencyMedicinesGuideProps> = ({
  language,
  onAskAi,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EmergencyMedCategory>('all');
  const [criticalOnly, setCriticalOnly] = useState(false);
  const [expandedMedId, setExpandedMedId] = useState<string | null>(null);

  const t = UI_TEXT[language] || UI_TEXT.en;
  const categories = CATEGORY_LABELS[language] || CATEGORY_LABELS.en;
  const emergencyInfo = COUNTRY_EMERGENCY_DATA[language];

  // Filtering logic
  const filteredMedicines = useMemo(() => {
    return EMERGENCY_MEDICINES.filter((med) => {
      // Category filter
      if (selectedCategory !== 'all' && med.category !== selectedCategory) {
        return false;
      }

      // Critical filter
      if (criticalOnly && med.urgency !== 'critical') {
        return false;
      }

      // Search term filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const localizedName = (med.name[language] || med.name.en).toLowerCase();
        const englishName = med.name.en.toLowerCase();
        const brandMatch = med.brandNames.some((b) => b.toLowerCase().includes(query));
        const indicationMatch = (
          med.primaryIndication[language] || med.primaryIndication.en
        )
          .toLowerCase()
          .includes(query);
        const formMatch = med.commonForm.toLowerCase().includes(query);

        if (
          !localizedName.includes(query) &&
          !englishName.includes(query) &&
          !brandMatch &&
          !indicationMatch &&
          !formMatch
        ) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, criticalOnly, searchTerm, language]);

  const getUrgencyBadge = (urgency: EmergencyMedicine['urgency']) => {
    switch (urgency) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black tracking-wide uppercase bg-rose-100 text-rose-800 border border-rose-300 shadow-2xs">
            <ShieldAlert className="w-3 h-3 text-rose-600 animate-pulse" />
            <span>{t.urgencyLabels.critical}</span>
          </span>
        );
      case 'urgent':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-amber-100 text-amber-800 border border-amber-300">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            <span>{t.urgencyLabels.urgent}</span>
          </span>
        );
      case 'prescribed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-indigo-100 text-indigo-800 border border-indigo-300">
            <Pill className="w-3 h-3 text-indigo-600" />
            <span>{t.urgencyLabels.prescribed}</span>
          </span>
        );
      case 'guided':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-sky-100 text-sky-800 border border-sky-300">
            <Info className="w-3 h-3 text-sky-600" />
            <span>{t.urgencyLabels.guided}</span>
          </span>
        );
      default:
        return null;
    }
  };

  const getCategoryIcon = (iconType: EmergencyMedicine['iconType']) => {
    switch (iconType) {
      case 'heart':
        return <Heart className="w-5 h-5 text-rose-600" />;
      case 'zap':
        return <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />;
      case 'shield':
        return <ShieldAlert className="w-5 h-5 text-indigo-600" />;
      case 'wind':
        return <Wind className="w-5 h-5 text-sky-600" />;
      case 'drop':
        return <Droplets className="w-5 h-5 text-teal-600" />;
      case 'activity':
        return <Activity className="w-5 h-5 text-red-600" />;
      case 'pill':
      default:
        return <Pill className="w-5 h-5 text-[#0284c7]" />;
    }
  };

  const handleAskAboutMedicine = (med: EmergencyMedicine) => {
    const medName = med.name[language] || med.name.en;
    const prompt =
      language === 'ur'
        ? `ایمرجنسی دوا "${medName}" کا ہنگامی حالات میں جسمانی اثر، طریقہ کار، اور احتیاطیں کیا ہیں؟`
        : language === 'bn'
        ? `জরুরি ওষুধ "${medName}" এর শরীরে কার্যপদ্ধতি, ফার্স্ট এইড প্রয়োগবিধি ও সতর্কতা বিস্তারিত বলুন।`
        : language === 'ja'
        ? `救急医薬品「${medName}」の作用機序、緊急時の使用手順、および重大な禁忌事項について詳しく教えてください。`
        : `What is the physiological mechanism, first-aid protocol, and critical contraindications for emergency medicine "${medName}"?`;

    if (onAskAi) {
      onAskAi(prompt);
    }
  };

  return (
    <section
      aria-labelledby="emergency-medicines-heading"
      className="space-y-6 pt-6 border-t-2 border-sky-100/80"
    >
      {/* Header Container with Liquid Glass Styling */}
      <div className="liquid-glass-card rounded-3xl p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/70 backdrop-blur-xl text-rose-700 border border-rose-200/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
          <Pill className="w-3.5 h-3.5 text-rose-600" />
          <span>{t.badge}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2
              id="emergency-medicines-heading"
              className="text-2xl sm:text-3xl font-black text-[#0C4A6E] tracking-tight"
            >
              {t.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#334E68] mt-1 max-w-3xl leading-relaxed font-normal">
              {t.subtitle}
            </p>
          </div>

          {/* Quick Direct EMS Hotline Dial */}
          <a
            href={emergencyInfo.primaryTel}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 text-white font-black text-xs shadow-lg hover:shadow-xl hover:scale-102 active:scale-98 transition-all shrink-0 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-white animate-pulse" />
            <span>
              {emergencyInfo.flagEmoji} {emergencyInfo.primaryLabel}
            </span>
          </a>
        </div>
      </div>

      {/* Controls & Search Filter Bar */}
      <div className="liquid-glass-panel rounded-3xl p-5 sm:p-6 space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white/90 backdrop-blur-md border border-white/95 focus:border-[#0ea5e9] focus:ring-4 focus:ring-sky-400/20 text-xs sm:text-sm text-[#0C4A6E] placeholder-slate-400 focus:outline-none transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Categories Bar & Critical Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
            {(
              [
                'all',
                'cardiac',
                'anaphylaxis',
                'respiratory',
                'overdose',
                'diabetic',
                'trauma',
                'allergic',
                'dehydration',
              ] as EmergencyMedCategory[]
            ).map((catKey) => {
              const isSelected = selectedCategory === catKey;
              return (
                <button
                  key={catKey}
                  type="button"
                  onClick={() => setSelectedCategory(catKey)}
                  className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'liquid-glass-primary text-white shadow-sm'
                      : 'liquid-glass-pill text-slate-700 hover:text-[#0284c7]'
                  }`}
                >
                  {categories[catKey]}
                </button>
              );
            })}
          </div>

          {/* Critical Only Filter Toggle */}
          <button
            type="button"
            onClick={() => setCriticalOnly(!criticalOnly)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              criticalOnly
                ? 'bg-rose-600 text-white shadow-md'
                : 'liquid-glass-pill text-rose-700 hover:bg-rose-50 border border-rose-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{t.criticalOnlyToggle}</span>
          </button>
        </div>

        {/* Count Indicator */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium px-1">
          <span>{t.showingCount(filteredMedicines.length, EMERGENCY_MEDICINES.length)}</span>
          {(searchTerm || selectedCategory !== 'all' || criticalOnly) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setCriticalOnly(false);
              }}
              className="text-[#0284c7] hover:underline font-bold"
            >
              {t.clearFilters}
            </button>
          )}
        </div>
      </div>

      {/* Medicines Cards List */}
      {filteredMedicines.length === 0 ? (
        <div className="liquid-glass-card rounded-3xl p-8 text-center space-y-3">
          <Pill className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-xs sm:text-sm text-slate-600 font-medium">{t.noResults}</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setCriticalOnly(false);
            }}
            className="px-4 py-2 rounded-xl liquid-glass-primary text-white text-xs font-bold"
          >
            {t.clearFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {filteredMedicines.map((med) => {
            const isExpanded = expandedMedId === med.id;
            const localizedName = med.name[language] || med.name.en;
            const englishName = med.name.en;

            return (
              <article
                key={med.id}
                className={`liquid-glass-card rounded-3xl p-6 transition-all duration-200 border ${
                  med.urgency === 'critical'
                    ? 'border-rose-200/80 shadow-md hover:border-rose-300'
                    : 'border-white/90 shadow-sm hover:border-sky-200'
                }`}
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <div className="p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-white/90 shadow-2xs shrink-0 mt-0.5">
                      {getCategoryIcon(med.iconType)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        {getUrgencyBadge(med.urgency)}
                        <span className="text-[11px] font-bold text-slate-500 bg-white/70 px-2 py-0.5 rounded-lg border border-white/80">
                          {categories[med.category]}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black text-[#0C4A6E]">
                        {localizedName}
                      </h3>
                      {language !== 'en' && (
                        <p className="text-xs text-slate-500 font-medium">{englishName}</p>
                      )}
                    </div>
                  </div>

                  {/* Form & Dosage Pill */}
                  <div className="text-right sm:text-right shrink-0">
                    <span className="inline-block text-[11px] font-semibold text-[#0369a1] bg-sky-50 px-2.5 py-1 rounded-xl border border-sky-100">
                      {med.commonForm}
                    </span>
                  </div>
                </div>

                {/* Primary Indication */}
                <div className="mt-4 p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/80 text-xs sm:text-sm text-rose-950 font-medium">
                  <span className="font-black text-rose-800 uppercase tracking-wider text-[10.5px] block mb-1">
                    {language === 'ur'
                      ? 'ہنگامی ضرورت / علامت:'
                      : language === 'bn'
                      ? 'জরুরি প্রয়োগের লক্ষণ:'
                      : language === 'ja'
                      ? '緊急使用の適応症状:'
                      : 'Emergency Indication:'}
                  </span>
                  <p>{med.primaryIndication[language] || med.primaryIndication.en}</p>
                </div>

                {/* Common Brands */}
                <div className="mt-3 flex items-center gap-1.5 flex-wrap text-xs text-slate-600">
                  <span className="text-[11px] font-bold text-slate-500">
                    {t.brandsLabel}
                  </span>
                  {med.brandNames.map((brand, bIdx) => (
                    <span
                      key={bIdx}
                      className="px-2 py-0.5 rounded-lg bg-white/80 border border-white/95 text-[#0C4A6E] font-semibold text-[11px]"
                    >
                      {brand}
                    </span>
                  ))}
                </div>

                {/* Mechanism preview */}
                <div className="mt-3 text-xs text-slate-700 leading-relaxed font-normal">
                  <strong className="text-[#0369a1] font-bold block mb-0.5">
                    {t.howItWorks}
                  </strong>
                  <p>{med.mechanismPlain[language] || med.mechanismPlain.en}</p>
                </div>

                {/* Expandable Emergency Protocols & Contraindications */}
                {isExpanded && (
                  <div className="mt-5 pt-4 border-t border-sky-100/90 space-y-4 animate-in fade-in duration-200">
                    {/* Step-by-step Administration Protocol */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-white/95 space-y-2.5">
                      <h4 className="text-xs font-black uppercase tracking-wider text-[#0C4A6E] flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{t.administrationProtocol}</span>
                      </h4>
                      <ol className="space-y-2 text-xs sm:text-sm text-slate-800 font-medium pl-1">
                        {(
                          med.emergencyAdministration[language] ||
                          med.emergencyAdministration.en
                        ).map((step, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-sky-100 text-[#0284c7] font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                              {sIdx + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Two-Column Grid: Critical Warnings & Contraindications */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Critical Safety Warnings */}
                      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
                        <h4 className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          <span>{t.criticalWarningsTitle}</span>
                        </h4>
                        <ul className="space-y-1.5 text-xs text-amber-950 font-medium">
                          {(
                            med.criticalWarnings[language] || med.criticalWarnings.en
                          ).map((warn, wIdx) => (
                            <li key={wIdx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                              <span>{warn}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Contraindications (Do NOT Give If) */}
                      <div className="p-4 rounded-2xl bg-rose-50/90 border border-rose-300 space-y-2">
                        <h4 className="text-xs font-black uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
                          <ShieldAlert className="w-4 h-4 text-rose-600" />
                          <span>{t.contraindicationsTitle}</span>
                        </h4>
                        <ul className="space-y-1.5 text-xs text-rose-950 font-bold">
                          {(
                            med.contraindications[language] ||
                            med.contraindications.en
                          ).map((contra, cIdx) => (
                            <li key={cIdx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                              <span>{contra}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* EMS Dispatch Script */}
                    <div className="p-4 rounded-2xl bg-sky-50/90 border border-sky-200 text-xs text-[#0C4A6E] space-y-1">
                      <span className="font-black text-[#0369a1] uppercase tracking-wider text-[11px] block">
                        {t.emsScriptTitle}
                      </span>
                      <p className="font-semibold italic">
                        &quot;{med.emsAdvice[language] || med.emsAdvice.en}&quot;
                      </p>
                    </div>
                  </div>
                )}

                {/* Card Action Footer */}
                <div className="mt-4 pt-3 border-t border-sky-100/70 flex flex-wrap items-center justify-between gap-2.5">
                  <button
                    type="button"
                    onClick={() => setExpandedMedId(isExpanded ? null : med.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284c7] hover:text-[#0369a1] hover:underline cursor-pointer"
                  >
                    <span>{isExpanded ? t.hideProtocol : t.viewProtocol}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    {/* Ask AI Companion Button */}
                    {onAskAi && (
                      <button
                        type="button"
                        onClick={() => handleAskAboutMedicine(med)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl liquid-glass-pill text-[#0C4A6E] hover:text-[#0284c7] text-xs font-semibold cursor-pointer"
                        title={t.askAiBtn}
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[#0284c7]" />
                        <span className="hidden sm:inline">{t.askAiBtn}</span>
                        <span className="sm:hidden">AI</span>
                      </button>
                    )}

                    {/* Dial EMS Button */}
                    <a
                      href={emergencyInfo.primaryTel}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                      title={emergencyInfo.primaryLabel}
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{emergencyInfo.primaryNumber}</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Mandatory Emergency Medical Disclaimer Card */}
      <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-white/95 text-slate-600 text-xs flex items-start gap-2.5 leading-relaxed shadow-2xs">
        <Info className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
        <p className="font-normal">{t.educationalNotice}</p>
      </div>
    </section>
  );
};
