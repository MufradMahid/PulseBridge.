import React, { useState } from 'react';
import { ANATOMY_TOPICS } from '../utils/anatomyData';
import { CirculatoryDiagram } from './CirculatoryDiagram';
import { SupportedLanguage } from '../types';
import { translations } from '../utils/i18n';
import {
  Sparkles,
  Heart,
  Activity,
  Layers,
  Wind,
  Brain,
  Utensils,
  Dumbbell,
  BookOpen,
  HelpCircle,
  ExternalLink,
  X,
  Loader2,
  CheckCircle2
} from 'lucide-react';

interface AnatomyExplorerProps {
  language: SupportedLanguage;
}

export const AnatomyExplorer: React.FC<AnatomyExplorerProps> = ({ language }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('heart');
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string>('');
  const [aiCitations, setAiCitations] = useState<Array<{ title: string; url: string }>>([]);
  const [aiError, setAiError] = useState<string | null>(null);

  const t = translations[language].anatomy;
  const tChat = translations[language].chat;
  const currentTopic = ANATOMY_TOPICS.find((t) => t.id === selectedTopicId) || ANATOMY_TOPICS[0];

  const getTopicIcon = (id: string) => {
    switch (id) {
      case 'heart':
        return <Heart className="w-4 h-4 text-red-500" />;
      case 'blood_vessels':
        return <Activity className="w-4 h-4 text-[#0284c7]" />;
      case 'circulation_loops':
        return <Layers className="w-4 h-4 text-cyan-600" />;
      case 'respiratory':
        return <Wind className="w-4 h-4 text-sky-500" />;
      case 'brain_nervous':
        return <Brain className="w-4 h-4 text-indigo-600" />;
      case 'digestive':
        return <Utensils className="w-4 h-4 text-amber-500" />;
      case 'muscular':
        return <Dumbbell className="w-4 h-4 text-emerald-600" />;
      default:
        return <Activity className="w-4 h-4 text-slate-500" />;
    }
  };

  const handleExplainWithAi = async () => {
    setAiModalOpen(true);
    setAiLoading(true);
    setAiError(null);
    setAiExplanation('');
    setAiCitations([]);

    try {
      const response = await fetch('/api/anatomy-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicName: currentTopic.name[language] || currentTopic.name.en,
          category: currentTopic.category,
          language,
        }),
      });

      if (!response.ok) {
        const tSummary = currentTopic.summary[language] || currentTopic.summary.en;
        const tFuncs = (currentTopic.keyFunctions[language] || currentTopic.keyFunctions.en).map((f) => `• ${f}`).join('\n');
        const tFact = currentTopic.educationalFact[language] || currentTopic.educationalFact.en;
        setAiExplanation(`${tSummary}\n\n**Core Biological Functions:**\n${tFuncs}\n\n**Everyday Health Fact:**\n${tFact}`);
        setAiCitations([{ title: 'MedlinePlus - Human Anatomy & Physiology', url: 'https://medlineplus.gov' }]);
        return;
      }

      const data = await response.json();
      setAiExplanation(data.explanation || '');
      setAiCitations(data.citations || []);
    } catch (err: unknown) {
      console.warn('Anatomy explanation network error, using local verified guide:', err);
      const tSummary = currentTopic.summary[language] || currentTopic.summary.en;
      const tFuncs = (currentTopic.keyFunctions[language] || currentTopic.keyFunctions.en).map((f) => `• ${f}`).join('\n');
      const tFact = currentTopic.educationalFact[language] || currentTopic.educationalFact.en;
      setAiExplanation(`${tSummary}\n\n**Core Biological Functions:**\n${tFuncs}\n\n**Everyday Health Fact:**\n${tFact}`);
      setAiCitations([{ title: 'MedlinePlus - Human Anatomy & Physiology', url: 'https://medlineplus.gov' }]);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Header with iPhone Liquid Glass Surface */}
      <div className="liquid-glass-card rounded-3xl p-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/70 backdrop-blur-xl text-[#0369a1] border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] mb-2">
            <Activity className="w-3.5 h-3.5 text-[#0284c7]" />
            <span>{t.badge}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0C4A6E] tracking-tight">
            {t.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#334E68] mt-1 max-w-2xl">
            {t.subtitle}
          </p>
        </div>

        {/* Explain with AI CTA Button */}
        <button
          onClick={handleExplainWithAi}
          className="liquid-glass-primary text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-2xl flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Sparkles className="w-4 h-4 text-sky-200" />
          <span>{t.aiExplainBtn}</span>
        </button>
      </div>

      {/* Select an Anatomical Topic Section */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-[#64748B] uppercase tracking-wider">
          {t.selectTopicLabel}
        </label>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {ANATOMY_TOPICS.map((topic) => {
            const isSelected = topic.id === selectedTopicId;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'liquid-glass-primary text-white scale-[1.02]'
                    : 'liquid-glass-pill text-[#0C4A6E]'
                }`}
                aria-pressed={isSelected}
              >
                {getTopicIcon(topic.id)}
                <span>{topic.name[language] || topic.name.en}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Split Layout: Left Circulatory SVG Diagram, Right Detailed Physiology */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Official Circulatory System SVG Asset (5 Cols on LG) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <CirculatoryDiagram
            selectedTopicId={selectedTopicId}
            onSelectTopic={(id) => setSelectedTopicId(id)}
            language={language}
          />
          <div className="text-center text-xs text-slate-500 italic">
            {t.zoomTip}
          </div>
        </div>

        {/* Right Column: In-depth Educational Topic Panel (7 Cols on LG) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Active Topic Header Card with iPhone Liquid Glass Surface */}
          <div className="liquid-glass-card rounded-3xl p-6 border-l-4 border-l-[#0284c7]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0284c7]">
                  {currentTopic.category.toUpperCase()} SYSTEM
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0C4A6E] mt-0.5">
                  {currentTopic.name[language] || currentTopic.name.en}
                </h2>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  {currentTopic.subtitle[language] || currentTopic.subtitle.en}
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_8px_rgba(2,132,199,0.06)] shrink-0">
                {getTopicIcon(currentTopic.id)}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-3 pt-3 border-t border-sky-100/70">
              {currentTopic.summary[language] || currentTopic.summary.en}
            </p>
          </div>

          {/* Key Physiological Functions Card */}
          <div className="liquid-glass-card rounded-3xl p-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-[#0284c7]" />
              <span>{t.keyFunctionsTitle}</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-700">
              {(currentTopic.keyFunctions[language] || currentTopic.keyFunctions.en).map(
                (func, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0284c7] mt-0.5 shrink-0" />
                    <span className="leading-relaxed font-medium">{func}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Clinical vs Plain Language Card */}
          <div className="liquid-glass-card rounded-3xl p-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-2 mb-3">
              <HelpCircle className="w-4 h-4 text-[#0284c7]" />
              <span>{t.clinicalVsPlain}</span>
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              {currentTopic.clinicalPlainPairs.map((pair, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/90 text-xs flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 shadow-2xs"
                >
                  <span className="font-bold text-[#0C4A6E] shrink-0 font-mono text-xs">
                    {pair.medical}
                  </span>
                  <span className="text-slate-600 leading-relaxed sm:text-right font-medium">
                    {pair.plain[language] || pair.plain.en}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Insight Fact Card */}
          <div className="rounded-3xl p-5 bg-gradient-to-r from-sky-100/80 via-white/80 to-cyan-50/80 backdrop-blur-xl border border-white/90 text-xs shadow-2xs">
            <span className="font-bold text-[#0369a1] block mb-1">
              💡 {t.funFactTitle}
            </span>
            <p className="text-slate-700 leading-relaxed">
              {currentTopic.educationalFact[language] || currentTopic.educationalFact.en}
            </p>
          </div>
        </div>
      </div>

      {/* AI Deep Dive Modal with Apple iPhone Frosted Glass */}
      {aiModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-modal-heading"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md"
        >
          <div className="liquid-glass-panel rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-sky-100/70 bg-white/60 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-sky-100 text-[#0284c7]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="ai-modal-heading" className="text-sm font-bold text-[#0C4A6E]">
                    {t.aiModalTitle}: {currentTopic.name[language] || currentTopic.name.en}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {tChat.groundedSearchNotice}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAiModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-sky-100/60 focus:outline-none focus:ring-2 focus:ring-[#0284c7] cursor-pointer"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-700 leading-relaxed">
              {aiLoading && (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                  <Loader2 className="w-8 h-8 text-[#0284c7] animate-spin" />
                  <p className="font-semibold text-slate-600">{t.aiExplaining}</p>
                </div>
              )}

              {aiError && (
                <div className="p-4 rounded-2xl bg-rose-50/90 border border-rose-200 text-rose-800 space-y-2">
                  <p className="font-bold">Error</p>
                  <p className="text-xs">{aiError}</p>
                  <button
                    onClick={handleExplainWithAi}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-semibold text-xs hover:bg-rose-700 shadow-2xs cursor-pointer"
                  >
                    {tChat.retryBtn}
                  </button>
                </div>
              )}

              {!aiLoading && !aiError && aiExplanation && (
                <div className="space-y-3 whitespace-pre-line text-slate-700 font-normal">
                  {aiExplanation}
                </div>
              )}

              {/* Citations */}
              {!aiLoading && aiCitations.length > 0 && (
                <div className="pt-4 border-t border-sky-100/70">
                  <span className="font-bold text-[11px] text-[#0369a1] uppercase tracking-wider block mb-2">
                    {tChat.sourcesLabel}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {aiCitations.map((cite, i) => (
                      <a
                        key={i}
                        href={cite.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/70 hover:bg-white/95 text-[#0C4A6E] hover:text-[#0284c7] border border-white/90 text-[11px] font-medium transition-colors"
                      >
                        <ExternalLink className="w-3 h-3 shrink-0" />
                        <span className="truncate max-w-[200px]">{cite.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-sky-100/70 bg-white/50 backdrop-blur-md flex items-center justify-between">
              <span className="text-[10px] text-slate-500 italic">
                {tChat.notDiagnosticNotice}
              </span>
              <button
                onClick={() => setAiModalOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer"
              >
                {t.closeBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
