import React, { useState } from 'react';
import { Logo } from './Logo';
import { ActiveTab, SupportedLanguage } from '../types';
import { translations } from '../utils/i18n';
import {
  MessageSquare,
  Activity,
  Award,
  HelpCircle,
  Menu,
  X,
  Globe,
  Home,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

interface NavbarProps {
  currentTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  language: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  language,
  onSelectLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language].nav;

  const navItems: Array<{
    id: ActiveTab;
    label: string;
    icon: React.ReactNode;
    isSpecial?: boolean;
    specialBadge?: string;
  }> = [
    {
      id: 'dashboard',
      label: t.home,
      icon: <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
    },
    {
      id: 'chat',
      label: t.chat,
      icon: <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
      isSpecial: true,
      specialBadge: 'Gemini AI',
    },
    {
      id: 'anatomy',
      label: t.anatomy,
      icon: <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
    },
    {
      id: 'quiz',
      label: t.quiz,
      icon: <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
    },
    {
      id: 'care',
      label: t.care,
      icon: <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
    },
  ];

  const languageOptions: Array<{
    code: SupportedLanguage;
    label: string;
    country: string;
    flag: string;
  }> = [
    { code: 'en', label: 'English', country: 'USA (911)', flag: '🇺🇸' },
    { code: 'ur', label: 'اردو', country: 'پاکستان (1122)', flag: '🇵🇰' },
    { code: 'bn', label: 'বাংলা', country: 'বাংলাদেশ (৯৯৯)', flag: '🇧🇩' },
    { code: 'ja', label: '日本語', country: '日本 (119)', flag: '🇯🇵' },
  ];

  return (
    <header className="sticky top-0 z-40 liquid-glass-nav transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo brand with live heartbeat effect */}
          <button
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-[#0284c7] rounded-2xl p-1 transition-transform active:scale-95 shrink-0 cursor-pointer"
            aria-label="PulseBridge Home Dashboard"
          >
            <Logo size="md" showLiveBadge={true} />
          </button>

          {/* Desktop Navigation Links — Apple iPhone Liquid-Glass Segmented Control */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-1.5 bg-white/45 backdrop-blur-xl p-1.5 rounded-2xl border border-white/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_12px_rgba(2,132,199,0.05)]"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              const isAiChat = item.id === 'chat';

              if (isAiChat) {
                // High-End Apple Liquid Glass Button for AI Health Companion
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative group flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#0284c7] text-white shadow-[0_6px_20px_rgba(2,132,199,0.35),inset_0_1px_1px_rgba(255,255,255,0.5)] ring-1 ring-white/60 scale-[1.02]'
                        : 'bg-white/70 hover:bg-white/95 text-[#0C4A6E] border border-white/90 shadow-[0_2px_8px_rgba(2,132,199,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-md hover:-translate-y-0.5'
                    }`}
                  >
                    <div
                      className={`p-1 rounded-lg transition-transform group-hover:scale-110 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-gradient-to-tr from-sky-100 to-cyan-100 text-[#0284c7]'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    </div>
                    <span className="tracking-tight">{item.label}</span>
                    <span
                      className={`hidden lg:inline-block text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded-md ${
                        isActive
                          ? 'bg-white/25 text-white ring-1 ring-white/30'
                          : 'bg-sky-100/80 text-[#0284c7] border border-sky-200/80'
                      }`}
                    >
                      AI
                    </span>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0284c7] to-[#0369a1] text-white shadow-[0_4px_14px_rgba(2,132,199,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] scale-[1.01]'
                      : 'text-[#334E68] hover:text-[#0C4A6E] hover:bg-white/80 border border-transparent hover:border-white/90 hover:shadow-2xs hover:-translate-y-0.5'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-[#0284c7]'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Liquid Glass Language Selector & Mobile menu toggle */}
          <div className="flex items-center gap-2">
            {/* Language Selector Dropdown (Persistent in session with iPhone glass finish) */}
            <div className="relative flex items-center">
              <label htmlFor="language-select" className="sr-only">
                Choose Language
              </label>
              <div className="flex items-center gap-2 bg-white/70 hover:bg-white/90 backdrop-blur-xl border border-white/90 shadow-[0_2px_8px_rgba(2,132,199,0.06),inset_0_1px_1.5px_rgba(255,255,255,0.95)] hover:border-sky-300 rounded-xl px-2.5 py-1.5 text-xs text-[#0C4A6E] font-medium transition-all focus-within:ring-2 focus-within:ring-[#0284c7]/40">
                <Globe className="w-3.5 h-3.5 text-[#0284c7] shrink-0" aria-hidden="true" />
                <select
                  id="language-select"
                  value={language}
                  onChange={(e) => onSelectLanguage(e.target.value as SupportedLanguage)}
                  className="bg-transparent border-none text-xs font-bold text-[#0C4A6E] focus:outline-none cursor-pointer pr-1 appearance-none"
                  aria-label="Select Interface Language"
                >
                  {languageOptions.map((lang) => (
                    <option key={lang.code} value={lang.code} className="text-[#0C4A6E] font-semibold py-1">
                      {lang.flag} {lang.label} — {lang.country}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-[#0284c7] pointer-events-none -ml-1 shrink-0" />
              </div>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#0C4A6E] bg-white/60 hover:bg-white/90 backdrop-blur-md border border-white/80 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#0284c7] cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-2xl border-b border-white/80 px-4 pt-2 pb-4 space-y-1.5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-180">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            const isAiChat = item.id === 'chat';

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#0284c7] to-[#0369a1] text-white shadow-xs'
                    : isAiChat
                    ? 'bg-sky-50/80 text-[#0284c7] border border-sky-200/70 font-extrabold'
                    : 'text-[#334E68] hover:bg-sky-50/60 hover:text-[#0C4A6E]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-white' : 'text-[#0284c7]'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {isAiChat && (
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-sky-200/70 text-[#0369a1]'
                    }`}
                  >
                    AI Companion
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
