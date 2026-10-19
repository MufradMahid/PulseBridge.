import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, SupportedLanguage } from '../types';
import { translations } from '../utils/i18n';
import { COUNTRY_EMERGENCY_DATA } from '../utils/emergencyData';
import { generateDemoResponse } from '../utils/demoAssistant';
import {
  Send,
  Sparkles,
  RotateCcw,
  Trash2,
  ExternalLink,
  ShieldAlert,
  Loader2,
  AlertCircle,
  CheckCircle,
  Info,
  HeartPulse,
  PhoneCall,
  ClipboardList,
  Stethoscope,
  Activity,
  Zap,
} from 'lucide-react';

interface ChatCompanionProps {
  language: SupportedLanguage;
  prefilledQuestion?: string;
  onClearPrefilled?: () => void;
  initialQuestion?: string;
  onClearInitialQuestion?: () => void;
}

export const ChatCompanion: React.FC<ChatCompanionProps> = ({
  language,
  prefilledQuestion,
  onClearPrefilled,
  initialQuestion,
  onClearInitialQuestion,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState<boolean>(false); // Default to Live AI mode

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const t = translations[language].chat;
  const emergencyInfo = COUNTRY_EMERGENCY_DATA[language];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    const q = prefilledQuestion || initialQuestion;
    if (q && q.trim()) {
      handleSendMessage(q.trim());
      onClearPrefilled?.();
      onClearInitialQuestion?.();
    }
  }, [prefilledQuestion, initialQuestion]);

  const handleSendMessage = async (textToSend: string, forceDemo?: boolean) => {
    if (!textToSend.trim() || isLoading) return;

    const useDemo = forceDemo !== undefined ? forceDemo : demoMode;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      timestamp: Date.now(),
      language,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);
    setLastFailedMessage(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend.trim(),
          conversationHistory: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          language,
          demoMode: useDemo,
        }),
      });

      if (!response.ok) {
        console.warn(`[PulseBridge] /api/chat returned status ${response.status}. Serving verified educational fallback response.`);
        const demo = generateDemoResponse(textToSend.trim(), language, 'quota_exhausted');
        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: demo.text,
          citations: demo.citations || [],
          isEmergencyAlert: demo.isEmergencyAlert || false,
          emergencyDetails: demo.emergencyDetails,
          timestamp: Date.now(),
          language,
          isDemo: true,
          demoReason: `server_fallback_${response.status}`,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        return;
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.text || data.reply || data.content || 'No response received from medical service.',
        citations: data.citations || [],
        isEmergencyAlert: data.isEmergency || data.isEmergencyAlert || false,
        emergencyDetails: data.emergencyDetails,
        timestamp: Date.now(),
        language,
        isDemo: data.isDemo,
        demoReason: data.demoReason,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: unknown) {
      console.warn('[PulseBridge] Network error reaching /api/chat. Serving verified educational fallback.', err);
      const demo = generateDemoResponse(textToSend.trim(), language, 'quota_exhausted');
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: demo.text,
        citations: demo.citations || [],
        isEmergencyAlert: demo.isEmergencyAlert || false,
        emergencyDetails: demo.emergencyDetails,
        timestamp: Date.now(),
        language,
        isDemo: true,
        demoReason: 'network_fallback',
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = (withDemoFallback = false) => {
    if (lastFailedMessage) {
      if (withDemoFallback) {
        setDemoMode(true);
        handleSendMessage(lastFailedMessage, true);
      } else {
        handleSendMessage(lastFailedMessage);
      }
    }
  };

  const handleClear = () => {
    setMessages([]);
    setError(null);
    setLastFailedMessage(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(input);
    }
  };

  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="space-y-2.5 text-xs sm:text-sm text-[#0C4A6E] leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) {
            return <div key={idx} className="h-1.5" />;
          }

          if (line.startsWith('### ') || line.startsWith('## ')) {
            const headingText = line.replace(/^#{2,3}\s+/, '');
            return (
              <h4 key={idx} className="font-extrabold text-[#0C4A6E] text-sm sm:text-base pt-2">
                {headingText}
              </h4>
            );
          }

          if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
            const bulletText = line.trim().replace(/^[-*]\s+/, '');
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] shrink-0 mt-2" />
                <span>{renderInlineFormatting(bulletText)}</span>
              </div>
            );
          }

          return <p key={idx}>{renderInlineFormatting(line)}</p>;
        })}
      </div>
    );
  };

  const renderInlineFormatting = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-[#0C4A6E]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  // Structured quick starter prompts by language
  const quickPromptsByLang: Record<
    SupportedLanguage,
    Array<{ icon: typeof Stethoscope; label: string; text: string }>
  > = {
    en: [
      {
        icon: Stethoscope,
        label: 'Symptom Intake Guide',
        text: 'I would like to start a structured symptom intake to record my health observations.',
      },
      {
        icon: ClipboardList,
        label: 'Doctor Visit Prep',
        text: 'What are the top 5 questions I should ask my doctor during my upcoming appointment?',
      },
      {
        icon: HeartPulse,
        label: 'Blood Pressure Basics',
        text: 'What is the difference between systolic and diastolic blood pressure?',
      },
      {
        icon: ShieldAlert,
        label: 'Emergency Red Flags',
        text: 'What severe red-flag symptoms require immediate emergency medical care?',
      },
    ],
    ur: [
      {
        icon: Stethoscope,
        label: 'علامات کا جائزہ (Intake)',
        text: 'میں اپنے ڈاکٹر کے معائنے سے پہلے علامات کا منظم جائزہ تیار کرنا چاہتا ہوں۔',
      },
      {
        icon: ClipboardList,
        label: 'ڈاکٹر کے سوالات کی فہرست',
        text: 'ڈاکٹر سے معائنے کے دوران پوچھنے کے لیے 5 اہم سوالات کیا ہیں؟',
      },
      {
        icon: HeartPulse,
        label: 'بلڈ پریشر کی وضاحت',
        text: 'سسٹولک اور ڈائیسٹولک بلڈ پریشر میں کیا فرق ہے؟',
      },
      {
        icon: ShieldAlert,
        label: 'ہنگامی علامات کی شناخت',
        text: 'وہ کون سی فوری ہنگامی علامات ہیں جن میں فورا اسپتال جانا ضروری ہے؟',
      },
    ],
    bn: [
      {
        icon: Stethoscope,
        label: 'লক্ষণ পর্যালোচনা (Intake)',
        text: 'আমি ডাক্তারের কাছে যাওয়ার পূর্বে আমার শারীরিক লক্ষণগুলো সুশৃঙ্খলভাবে রেকর্ড করতে চাই।',
      },
      {
        icon: ClipboardList,
        label: 'ডাক্তারের প্রশ্নমালা প্রস্তুত',
        text: 'ডাক্তারের সাক্ষাতে আলোচনা করার মতো ৫টি প্রধান ও গুরুত্বপূর্ণ প্রশ্ন কী কী?',
      },
      {
        icon: HeartPulse,
        label: 'রক্তচাপের সহজ ব্যাখ্যা',
        text: 'সিস্টোলিক এবং ডায়াস্টোলিক রক্তচাপের মধ্যে মূল পার্থক্য কী?',
      },
      {
        icon: ShieldAlert,
        label: 'জরুরি বিপদচিহ্নসমূহ',
        text: 'কোন লক্ষণগুলো দেখা দিলে তাৎক্ষণিকভাবে জরুরি চিকিৎসা গ্রহণ করা আবশ্যক?',
      },
    ],
    ja: [
      {
        icon: Stethoscope,
        label: '症状確認シート (Intake)',
        text: '医師の診察に向けて、症状の経過を整理するチェックシートを確認したいです。',
      },
      {
        icon: ClipboardList,
        label: '医師への質問リスト',
        text: '次回の受診時に医師に確認すべき5つの重要項目を教えてください。',
      },
      {
        icon: HeartPulse,
        label: '血圧の基本メカニズム',
        text: '収縮期血圧（上の血圧）と拡張期血圧（下の血圧）の違いは何ですか？',
      },
      {
        icon: ShieldAlert,
        label: '緊急危険兆候（レッドフラッグ）',
        text: '直ちに救急通報・受診が必要な命に関わる危険兆候には何がありますか？',
      },
    ],
  };

  const quickPrompts = quickPromptsByLang[language] || quickPromptsByLang.en;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col h-[calc(100vh-140px)] min-h-[580px]">
      {/* Header Container with iPhone Liquid Glass Surface */}
      <div className="liquid-glass-card rounded-3xl p-5 mb-4 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_8px_30px_rgba(2,132,199,0.06)]">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/70 backdrop-blur-xl text-[#0369a1] border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
              <HeartPulse className="w-3.5 h-3.5 text-[#0284c7] animate-pulse" />
              <span>{t.badge}</span>
            </div>

            {/* Mode Indicator Pill */}
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                demoMode
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}
            >
              {demoMode ? (
                <>
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>Demo Mode (No API Quota Required)</span>
                </>
              ) : (
                <>
                  <Zap className="w-3 h-3 text-emerald-600" />
                  <span>Live Gemini AI</span>
                </>
              )}
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-[#0C4A6E] tracking-tight">
            {t.title}
          </h1>
          <p className="text-xs text-[#334E68] mt-0.5">
            {demoMode
              ? 'Providing structured clinical education and symptom preparation with zero API quota constraints.'
              : t.subtitle}
          </p>
        </div>

        {/* Right side controls: Mode Toggle & Clear Button */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          {/* Liquid Glass Segmented Mode Switcher */}
          <div className="inline-flex p-1 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-2xs">
            <button
              onClick={() => setDemoMode(true)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                demoMode
                  ? 'bg-gradient-to-r from-sky-500 to-[#0284c7] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Demo Mode: Uses verified local medical knowledge without calling Gemini API"
            >
              Demo Mode
            </button>
            <button
              onClick={() => setDemoMode(false)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                !demoMode
                  ? 'bg-gradient-to-r from-sky-500 to-[#0284c7] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Live AI: Calls Gemini API with Google Search grounding"
            >
              Live AI
            </button>
          </div>

          {messages.length > 0 && (
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-rose-600 bg-white/60 hover:bg-white/90 border border-white/80 shadow-2xs transition-colors cursor-pointer"
              title="Clear Chat Conversation"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.clear}</span>
            </button>
          )}
        </div>
      </div>

      {/* Messages Scroll Area inside Liquid Glass Enclosure */}
      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-4 pr-1 scrollbar-thin">
        {messages.length === 0 ? (
          /* Empty State */
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-400 to-[#0284c7] flex items-center justify-center text-white shadow-lg shadow-sky-500/25 border border-white/40">
              <Sparkles className="w-7 h-7" />
            </div>

            <div className="max-w-md">
              <h2 className="text-lg font-bold text-[#0C4A6E]">
                {t.emptyTitle}
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {demoMode
                  ? 'Demo Mode active: Explore structured clinical symptom intake, doctor visit preparation, and cardiovascular physiology with guaranteed instant responses.'
                  : t.emptyDesc}
              </p>
            </div>

            {/* Quick Starter Action Cards */}
            <div className="w-full max-w-lg text-left space-y-2 pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">
                Quick Clinical Starters:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quickPrompts.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(item.text)}
                      className="p-3 rounded-2xl bg-white/70 hover:bg-white/95 backdrop-blur-md border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_8px_rgba(2,132,199,0.04)] text-xs font-semibold text-slate-800 hover:text-[#0C4A6E] hover:border-[#0ea5e9] transition-all text-left flex items-start gap-2.5 cursor-pointer group hover:-translate-y-0.5"
                    >
                      <div className="p-1.5 rounded-xl bg-sky-50 text-[#0284c7] shrink-0 group-hover:bg-[#0284c7] group-hover:text-white transition-colors">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1">
                        <span className="font-bold block text-[#0C4A6E]">{item.label}</span>
                        <span className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{item.text}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Suggested Prompts with iPhone frosted glass cards */}
            <div className="w-full max-w-lg text-left space-y-2 pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">
                {t.suggestedLabel}
              </span>
              <div className="grid grid-cols-1 gap-2">
                {t.suggestions.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(sug)}
                    className="p-3.5 rounded-2xl bg-white/70 hover:bg-white/95 backdrop-blur-md border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_8px_rgba(2,132,199,0.04)] text-xs font-semibold text-slate-800 hover:text-[#0C4A6E] hover:border-[#0ea5e9] transition-all text-left flex items-center justify-between gap-2 cursor-pointer group hover:-translate-y-0.5"
                  >
                    <span>{sug}</span>
                    <Sparkles className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0284c7] shrink-0 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Conversation History */
          messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}
              >
                <div
                  className={`max-w-[88%] sm:max-w-[80%] rounded-3xl p-5 text-xs sm:text-sm transition-all duration-200 ${
                    isUser
                      ? 'liquid-glass-primary text-white rounded-br-xs'
                      : 'liquid-glass-card rounded-bl-xs text-slate-800'
                  }`}
                >
                  {/* Demo Mode Badge for Assistant Bubbles */}
                  {!isUser && msg.isDemo && (
                    <div className="mb-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                      <span>Verified Educational Knowledge (Demo Mode)</span>
                    </div>
                  )}

                  {/* Emergency notice badge with country emergency number if detected */}
                  {msg.isEmergencyAlert && (
                    <div className="mb-3 p-3.5 rounded-2xl bg-rose-50/90 border border-rose-300 text-rose-900 text-xs space-y-2 font-medium">
                      <div className="flex items-start gap-2.5">
                        <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span>{t.emergencyDetectedNotice}</span>
                      </div>
                      <div className="pt-1">
                        <a
                          href={emergencyInfo.primaryTel}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] shadow-2xs"
                        >
                          <PhoneCall className="w-3 h-3" />
                          <span>{emergencyInfo.primaryLabel}</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Body Content */}
                  {isUser ? (
                    <p className="whitespace-pre-wrap leading-relaxed font-medium">{msg.content}</p>
                  ) : (
                    renderFormattedContent(msg.content)
                  )}

                  {/* Grounding Source Citations (Original source language preserved) */}
                  {!isUser && msg.citations && msg.citations.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-sky-100/70 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0369a1]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#0284c7]" />
                        <span>{t.sourcesLabel}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.citations.map((cite, cIdx) => (
                          <a
                            key={cIdx}
                            href={cite.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/70 hover:bg-white/95 text-[#0C4A6E] hover:text-[#0284c7] border border-white/90 text-[11px] font-medium transition-colors shadow-2xs"
                          >
                            <ExternalLink className="w-3 h-3 shrink-0" />
                            <span className="truncate max-w-[190px]">{cite.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Non-diagnostic Disclaimer Footer on Assistant Bubbles */}
                  {!isUser && (
                    <div className="mt-3 pt-2 border-t border-sky-100/50 flex items-center gap-1.5 text-[10px] text-slate-400 italic">
                      <Info className="w-3 h-3 shrink-0" />
                      <span>{t.notDiagnosticNotice}</span>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-slate-400 px-2 font-medium">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            );
          })
        )}

        {/* Loading Bubble with Apple Glassmorphic spinner */}
        {isLoading && (
          <div className="flex items-center gap-2.5 p-4 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_16px_rgba(2,132,199,0.06)] max-w-xs text-xs text-slate-600 animate-pulse">
            <Loader2 className="w-4 h-4 text-[#0284c7] animate-spin" />
            <span className="font-semibold">{t.loadingText}</span>
          </div>
        )}

        {/* Error State with 1-click fallback to Demo Mode */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-50/90 border border-rose-200 text-rose-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <div className="space-y-0.5">
                <span className="leading-relaxed font-semibold block">{error}</span>
                <span className="text-[11px] text-rose-700">
                  Switch to Demo Mode to get instant verified medical educational answers without API quota limits.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleRetry(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-[#0284c7] hover:from-sky-600 hover:to-[#0369a1] text-white font-bold text-xs cursor-pointer transition-colors shadow-2xs"
              >
                <Sparkles className="w-3 h-3 text-sky-200" />
                <span>Switch to Demo Mode</span>
              </button>
              {lastFailedMessage && (
                <button
                  onClick={() => handleRetry(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white text-rose-700 font-semibold text-xs border border-rose-200 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{t.retryBtn}</span>
                </button>
              )}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Bar with iPhone Liquid Glass Surface */}
      <div className="shrink-0 pt-2 border-t border-sky-200/50">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(input);
          }}
          className="relative flex items-center"
        >
          <label htmlFor="health-chat-input" className="sr-only">
            {t.placeholder}
          </label>
          <textarea
            id="health-chat-input"
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.placeholder}
            disabled={isLoading}
            className="w-full resize-none py-3.5 pl-4 pr-14 rounded-2xl bg-white/85 backdrop-blur-2xl border border-white/95 focus:border-[#0ea5e9] focus:ring-4 focus:ring-sky-400/20 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02),0_4px_16px_rgba(2,132,199,0.06)] text-xs sm:text-sm text-[#0C4A6E] placeholder-slate-400 focus:outline-none transition-all disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 rounded-xl liquid-glass-primary text-white disabled:opacity-40 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
            aria-label={t.send}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[10px] text-center text-slate-400 mt-2 font-medium">
          {t.notDiagnosticNotice}
        </p>
      </div>
    </div>
  );
};
