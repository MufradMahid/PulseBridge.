import React, { useState } from 'react';
import { ActiveTab, SupportedLanguage } from '../types';
import { translations } from '../utils/i18n';
import {
  MessageSquare,
  Activity,
  Award,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Globe2,
  ChevronRight,
  HeartPulse,
  Search,
  Sparkles,
  BookOpen,
  Stethoscope,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';

interface HomeDashboardProps {
  onNavigate: (tab: ActiveTab, prefill?: string) => void;
  language: SupportedLanguage;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({ onNavigate, language }) => {
  const [quickQuestion, setQuickQuestion] = useState('');
  const t = translations[language];

  const handleQuickAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickQuestion.trim()) {
      onNavigate('chat', quickQuestion.trim());
    }
  };

  const featureCards: Array<{
    id: ActiveTab;
    title: string;
    description: string;
    icon: React.ReactNode;
    badgeBg: string;
    badgeText: string;
    badge: string;
  }> = [
    {
      id: 'chat',
      title: t.home.cardChatTitle,
      description: t.home.cardChatDesc,
      icon: <MessageSquare className="w-5 h-5 text-[#0284c7]" />,
      badgeBg: 'bg-sky-100/80 text-[#0369a1] border border-sky-200/80',
      badgeText: 'text-[#0369a1]',
      badge: 'Gemini AI',
    },
    {
      id: 'anatomy',
      title: t.home.cardAnatomyTitle,
      description: t.home.cardAnatomyDesc,
      icon: <Activity className="w-5 h-5 text-[#0284c7]" />,
      badgeBg: 'bg-cyan-100/80 text-[#0369a1] border border-cyan-200/80',
      badgeText: 'text-[#0369a1]',
      badge: 'Circulatory SVG',
    },
    {
      id: 'quiz',
      title: t.home.cardQuizTitle,
      description: t.home.cardQuizDesc,
      icon: <Award className="w-5 h-5 text-amber-600" />,
      badgeBg: 'bg-amber-100/80 text-amber-900 border border-amber-200/80',
      badgeText: 'text-amber-800',
      badge: '5 Questions',
    },
    {
      id: 'care',
      title: t.home.cardCareTitle,
      description: t.home.cardCareDesc,
      icon: <HelpCircle className="w-5 h-5 text-indigo-600" />,
      badgeBg: 'bg-indigo-100/80 text-indigo-900 border border-indigo-200/80',
      badgeText: 'text-indigo-800',
      badge: 'Safety Triage',
    },
  ];

  return (
    <div className="space-y-10 py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section with Apple iPhone Liquid Glassmorphism */}
      <section className="relative overflow-hidden rounded-3xl p-6 sm:p-10 lg:p-12 liquid-glass-panel">
        <div className="relative z-10 max-w-3xl space-y-6">
          {/* Tagline Badge with iOS Frosted Glass Capsule */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/70 backdrop-blur-xl text-[#0369a1] border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),0_2px_8px_rgba(2,132,199,0.06)]">
            <HeartPulse className="w-4 h-4 text-[#0284c7] animate-pulse" />
            <span>{t.tagline}</span>
          </div>

          {/* Meaningful Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0C4A6E] tracking-tight leading-[1.18] drop-shadow-2xs">
            {t.home.welcomeTitle}
          </h1>

          {/* Subtitle with deep clinical reassurance */}
          <p className="text-sm sm:text-base text-[#334E68] leading-relaxed font-normal max-w-2xl">
            {t.home.welcomeSubtitle}
          </p>

          {/* Meaningful talk quote cards with iPhone glass aesthetic */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div className="p-3.5 rounded-2xl bg-white/65 hover:bg-white/85 backdrop-blur-xl border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),0_4px_14px_rgba(2,132,199,0.04)] flex items-start gap-2.5 transition-all">
              <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
              <p className="text-xs text-[#0C4A6E] font-medium leading-relaxed">
                {t.home.welcomeMission}
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/65 hover:bg-white/85 backdrop-blur-xl border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),0_4px_14px_rgba(2,132,199,0.04)] flex items-start gap-2.5 transition-all">
              <Sparkles className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
              <p className="text-xs text-[#0C4A6E] font-medium leading-relaxed">
                {t.home.welcomeEvidence}
              </p>
            </div>
          </div>

          {/* Search / Ask Question Input with iPhone Liquid Search Surface */}
          <form onSubmit={handleQuickAsk} className="pt-2 max-w-2xl">
            <div className="relative flex items-center shadow-[inset_0_1px_2px_rgba(0,0,0,0.02),0_8px_24px_rgba(2,132,199,0.08)] rounded-2xl bg-white/85 backdrop-blur-2xl border border-white/95 focus-within:border-[#0ea5e9] focus-within:ring-4 focus-within:ring-sky-400/20 transition-all duration-200 p-1.5">
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" aria-hidden="true" />
              <input
                type="text"
                value={quickQuestion}
                onChange={(e) => setQuickQuestion(e.target.value)}
                placeholder={t.home.askQuickPrompt}
                className="w-full py-2.5 px-3 text-xs sm:text-sm text-[#0C4A6E] placeholder-slate-400 focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl liquid-glass-primary text-white text-xs sm:text-sm font-bold shadow-sm shrink-0 flex items-center gap-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
              >
                <span>{t.home.askButton}</span>
                <ArrowRight className="w-4 h-4 text-sky-100" />
              </button>
            </div>
          </form>

          {/* Non-diagnostic caution note */}
          <p className="text-[11px] text-slate-500 italic max-w-xl pt-1">
            {t.disclaimerShort}
          </p>
        </div>

        {/* Dynamic ambient background light diffusion */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-gradient-to-tr from-sky-400/25 via-cyan-300/20 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-gradient-to-br from-white/40 to-transparent blur-2xl pointer-events-none" />
      </section>

      {/* Feature Cards Grid with iPhone Liquid Glass Surface */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-sky-200/50 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0C4A6E] tracking-tight">
              {t.home.featuresHeader}
            </h2>
            <p className="text-xs sm:text-sm text-[#334E68] mt-0.5">
              {t.home.featuresSubheader}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featureCards.map((card) => (
            <div
              key={card.id}
              onClick={() => onNavigate(card.id)}
              className="liquid-glass-card rounded-3xl p-6 flex flex-col justify-between cursor-pointer group"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onNavigate(card.id);
                }
              }}
              aria-label={`Open ${card.title} module`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 shadow-[0_2px_6px_rgba(2,132,199,0.05),inset_0_1px_1px_rgba(255,255,255,0.9)] group-hover:scale-105 transition-transform duration-200">
                    {card.icon}
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${card.badgeBg}`}>
                    {card.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#0C4A6E] group-hover:text-[#0284c7] transition-colors duration-180">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#334E68] mt-2 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-sky-100/70 flex items-center justify-between text-xs font-bold text-[#0C4A6E] group-hover:text-[#0284c7]">
                <span>{t.home.openToolBtn}</span>
                <ChevronRight className="w-4 h-4 text-[#0284c7] transition-transform duration-200 transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Meaningful Healthcare Values & Pillars */}
      <section className="liquid-glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-sky-100/80 text-[#0284c7]">
            <BookOpen className="w-5 h-5 text-[#0284c7]" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#0C4A6E]">
            {t.home.valuesTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2.5 p-5 rounded-2xl bg-white/60 hover:bg-white/80 backdrop-blur-md border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_8px_rgba(2,132,199,0.03)] transition-all">
            <div className="flex items-center gap-2 text-[#0284c7] font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>{t.home.valuesPillar1Title}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.home.valuesPillar1Desc}
            </p>
          </div>

          <div className="space-y-2.5 p-5 rounded-2xl bg-white/60 hover:bg-white/80 backdrop-blur-md border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_8px_rgba(2,132,199,0.03)] transition-all">
            <div className="flex items-center gap-2 text-[#0369a1] font-bold text-xs uppercase tracking-wider">
              <Stethoscope className="w-4 h-4 shrink-0" />
              <span>{t.home.valuesPillar2Title}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.home.valuesPillar2Desc}
            </p>
          </div>

          <div className="space-y-2.5 p-5 rounded-2xl bg-white/60 hover:bg-white/80 backdrop-blur-md border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_8px_rgba(2,132,199,0.03)] transition-all">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{t.home.valuesPillar3Title}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.home.valuesPillar3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Architecture Pillars */}
      <section className="liquid-glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
        <h2 className="text-lg sm:text-xl font-bold text-[#0C4A6E]">
          {t.home.whyPulseBridgeTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2 p-5 rounded-2xl bg-white/60 hover:bg-white/80 backdrop-blur-md border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_8px_rgba(2,132,199,0.03)] transition-all">
            <div className="flex items-center gap-2 text-[#0284c7] font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>{t.home.whyItem1Title}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.home.whyItem1Desc}
            </p>
          </div>

          <div className="space-y-2 p-5 rounded-2xl bg-white/60 hover:bg-white/80 backdrop-blur-md border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_8px_rgba(2,132,199,0.03)] transition-all">
            <div className="flex items-center gap-2 text-[#0369a1] font-bold text-xs uppercase tracking-wider">
              <Globe2 className="w-4 h-4" />
              <span>{t.home.whyItem2Title}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.home.whyItem2Desc}
            </p>
          </div>

          <div className="space-y-2 p-5 rounded-2xl bg-white/60 hover:bg-white/80 backdrop-blur-md border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_8px_rgba(2,132,199,0.03)] transition-all">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>{t.home.whyItem3Title}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.home.whyItem3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* Comprehensive Medical Disclaimer Footer */}
      <div className="text-center text-xs text-slate-500 max-w-3xl mx-auto space-y-2 pt-2">
        <p className="leading-relaxed">
          {t.disclaimerFull}
        </p>
        <p className="text-[10px] text-slate-400">
          PulseBridge • iPhone Liquid Glass Architecture • Gemini 3.8 Flash Grounded AI
        </p>
      </div>
    </div>
  );
};
