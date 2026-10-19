/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab, SupportedLanguage } from './types';
import { getDir, translations } from './utils/i18n';
import { EmergencyBanner } from './components/EmergencyBanner';
import { Navbar } from './components/Navbar';
import { HomeDashboard } from './components/HomeDashboard';
import { ChatCompanion } from './components/ChatCompanion';
import { AnatomyExplorer } from './components/AnatomyExplorer';
import { KnowledgeQuiz } from './components/KnowledgeQuiz';
import { CareGuidance } from './components/CareGuidance';

const SESSION_LANG_KEY = 'pulsebridge_session_lang';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ActiveTab>('dashboard');
  
  // Persistent-in-session language selector without external database
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_LANG_KEY);
      if (stored === 'en' || stored === 'ur' || stored === 'bn' || stored === 'ja') {
        return stored;
      }
    } catch {
      // In case storage is inaccessible
    }
    return 'en';
  });

  const [prefilledQuestion, setPrefilledQuestion] = useState<string | undefined>(undefined);

  // Sync document direction and lang attribute whenever language changes
  useEffect(() => {
    const dir = getDir(language);
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', language);
    try {
      sessionStorage.setItem(SESSION_LANG_KEY, language);
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [language]);

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLanguage(newLang);
  };

  const handleNavigate = (tab: ActiveTab, prefill?: string) => {
    if (prefill) {
      setPrefilledQuestion(prefill);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f9ff] via-[#e0f2fe]/40 to-[#f8fafc] text-[#0C4A6E] flex flex-col font-sans transition-all duration-200">
      {/* Top Emergency Warning Notice with Country Emergency Numbers */}
      <EmergencyBanner language={language} />

      {/* Navigation Header with Modern Upper Buttons */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => handleNavigate(tab)}
        language={language}
        onSelectLanguage={handleLanguageChange}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 w-full" tabIndex={-1}>
        {currentTab === 'dashboard' && (
          <HomeDashboard
            language={language}
            onNavigate={(tab, q) => handleNavigate(tab, q)}
          />
        )}

        {currentTab === 'chat' && (
          <ChatCompanion
            language={language}
            prefilledQuestion={prefilledQuestion}
            onClearPrefilled={() => setPrefilledQuestion(undefined)}
          />
        )}

        {currentTab === 'anatomy' && (
          <AnatomyExplorer language={language} />
        )}

        {currentTab === 'quiz' && (
          <KnowledgeQuiz language={language} />
        )}

        {currentTab === 'care' && (
          <CareGuidance
            language={language}
            onNavigate={(tab, q) => handleNavigate(tab, q)}
          />
        )}
      </main>

      {/* Universal Footer with Educational Notice */}
      <footer className="mt-auto border-t border-sky-100 bg-white/70 backdrop-blur-xs py-6 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-2">
          <p className="font-semibold text-slate-700">
            PulseBridge Health Care — {translations[language].tagline}
          </p>
          <p className="max-w-2xl text-[11px] text-slate-500 leading-relaxed">
            {translations[language].disclaimerFull}
          </p>
        </div>
      </footer>
    </div>
  );
}
