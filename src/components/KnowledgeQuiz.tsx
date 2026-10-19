import React, { useState } from 'react';
import { QUIZ_QUESTIONS, calculateQuizScore } from '../utils/quizData';
import { SupportedLanguage } from '../types';
import { translations } from '../utils/i18n';
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface KnowledgeQuizProps {
  language: SupportedLanguage;
}

export const KnowledgeQuiz: React.FC<KnowledgeQuizProps> = ({ language }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const t = translations[language].quiz;
  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (showExplanation) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setQuizCompleted(false);
  };

  const scoreResult = calculateQuizScore(selectedAnswers);
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const getPerformanceLabel = (score: number) => {
    if (score >= 4) {
      if (language === 'ur') return 'شاندار فہم و بصیرت';
      if (language === 'bn') return 'চমৎকার শারীরবৃত্তীয় উপলব্ধি';
      if (language === 'ja') return '素晴らしい理解度です！';
      return 'Excellent Understanding';
    }
    if (language === 'ur') return 'اچھی کوشش اور تفہیم!';
    if (language === 'bn') return 'চমৎকার প্রচেষ্টা ও শিক্ষণ!';
    if (language === 'ja') return '良いチャレンジでした！';
    return 'Good Exploration!';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Header with iPhone Liquid Glass Surface */}
      <div className="liquid-glass-card rounded-3xl p-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/70 backdrop-blur-xl text-[#0369a1] border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] mb-2">
          <Award className="w-3.5 h-3.5 text-[#0284c7]" />
          <span>{t.badge}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0C4A6E] tracking-tight">
          {t.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#334E68] mt-1 font-normal">
          {t.subtitle}
        </p>
      </div>

      {!quizCompleted ? (
        <div className="space-y-6">
          {/* Progress & Current Score */}
          <div className="liquid-glass-card rounded-2xl p-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="w-full sm:w-auto flex items-center justify-between gap-4 font-bold text-[#0C4A6E]">
              <span className="text-xs sm:text-sm">{t.progressText(currentIndex + 1, totalQuestions)}</span>
              <span className="text-[#0284c7] bg-white/80 border border-white/90 px-3 py-0.5 rounded-full font-bold shadow-2xs">
                {t.scoreText(scoreResult.score, currentIndex + (showExplanation ? 1 : 0))}
              </span>
            </div>

            {/* Progress Bar with Liquid Glow */}
            <div className="w-full sm:w-72 bg-sky-100/80 rounded-full h-2.5 overflow-hidden p-0.5 border border-white/80 shadow-inner">
              <div
                className="bg-gradient-to-r from-sky-400 to-[#0284c7] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question Card with iPhone Liquid Glass styling */}
          <div className="liquid-glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-start gap-3.5">
              <span className="w-8 h-8 rounded-xl liquid-glass-primary text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
                {currentIndex + 1}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[#0C4A6E] leading-snug">
                {currentQuestion.question[language] || currentQuestion.question.en}
              </h2>
            </div>

            {/* Options List with iPhone frosted tiles */}
            <div className="grid grid-cols-1 gap-3 pt-1">
              {(currentQuestion.options[language] || currentQuestion.options.en).map(
                (option, idx) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === idx;
                  const isCorrect = currentQuestion.correctIndex === idx;

                  let optionStyle =
                    'bg-white/70 hover:bg-white/95 border-white/90 hover:border-sky-300 text-slate-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_8px_rgba(2,132,199,0.04)]';

                  if (showExplanation) {
                    if (isCorrect) {
                      optionStyle =
                        'bg-emerald-50/90 border-emerald-400 text-emerald-950 ring-2 ring-emerald-300 shadow-sm';
                    } else if (isSelected) {
                      optionStyle =
                        'bg-rose-50/90 border-rose-400 text-rose-950 ring-2 ring-rose-300 shadow-sm';
                    } else {
                      optionStyle = 'opacity-60 bg-white/40 border-slate-200 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={showExplanation}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 rounded-2xl border font-medium text-xs sm:text-sm flex items-center justify-between gap-3 transition-all duration-200 cursor-pointer backdrop-blur-md ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-sky-50/90 border border-sky-200/80 flex items-center justify-center font-bold text-xs text-[#0C4A6E] shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="leading-relaxed font-semibold">{option}</span>
                      </div>

                      {showExplanation && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {showExplanation && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                }
              )}
            </div>

            {/* Instant Educational Explanation Box */}
            {showExplanation && (
              <div className="p-4 sm:p-5 rounded-2xl bg-white/75 backdrop-blur-md border border-white/95 text-xs text-slate-800 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-200 shadow-sm">
                <div className="flex items-center gap-1.5 font-bold text-[#0369a1]">
                  <BookOpen className="w-4 h-4 text-[#0284c7]" />
                  <span>{t.explanationLabel}</span>
                </div>
                <p className="leading-relaxed pl-5 text-slate-700 font-medium">
                  {currentQuestion.explanation[language] || currentQuestion.explanation.en}
                </p>
              </div>
            )}

            {/* Navigation button */}
            {showExplanation && (
              <div className="flex justify-end pt-1">
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl liquid-glass-primary text-white text-xs font-bold shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                >
                  <span>
                    {currentIndex < totalQuestions - 1 ? t.nextBtn : t.finishBtn}
                  </span>
                  <ArrowRight className="w-4 h-4 text-sky-200" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Completion Screen */
        <div className="liquid-glass-panel rounded-3xl p-6 sm:p-10 text-center space-y-6 max-w-xl mx-auto shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 mx-auto rounded-2xl liquid-glass-primary flex items-center justify-center text-white shadow-lg shadow-sky-500/25">
            <Sparkles className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-[#0C4A6E]">
              {t.completedTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">
              {t.completedDesc(scoreResult.score, totalQuestions)}
            </p>
          </div>

          {/* Performance Badge */}
          <div className="inline-block p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/95 shadow-2xs">
            <span className="text-3xl font-black text-[#0284c7]">
              {scoreResult.percentage}%
            </span>
            <span className="block text-[11px] font-bold text-[#0C4A6E] uppercase tracking-wider mt-0.5">
              {getPerformanceLabel(scoreResult.score)}
            </span>
          </div>

          {/* Action */}
          <div className="pt-2">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl liquid-glass-primary text-white font-bold text-xs shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
            >
              <RotateCcw className="w-4 h-4 text-sky-200" />
              <span>{t.restartBtn}</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-400 italic pt-2">
            {t.disclaimer}
          </p>
        </div>
      )}

      {/* Persistent Educational Disclaimer */}
      <div className="text-center text-xs text-slate-500">
        <p>{t.disclaimer}</p>
      </div>
    </div>
  );
};
