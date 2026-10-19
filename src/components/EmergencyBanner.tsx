import React, { useState } from 'react';
import { AlertTriangle, PhoneCall, ChevronDown, ChevronUp, ShieldAlert, Phone } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { translations } from '../utils/i18n';
import { COUNTRY_EMERGENCY_DATA } from '../utils/emergencyData';

interface EmergencyBannerProps {
  language: SupportedLanguage;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ language }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = translations[language].emergencyBanner;
  const emergencyInfo = COUNTRY_EMERGENCY_DATA[language];

  return (
    <div
      role="region"
      aria-label="Medical Emergency Notice"
      className="bg-gradient-to-r from-rose-50 via-red-50/90 to-amber-50/90 border-b border-red-200/80 text-[#0C2340] text-xs transition-all duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 text-red-700 font-medium">
          <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 animate-pulse" aria-hidden="true" />
          <span className="font-bold text-red-800 tracking-tight">{t.title}:</span>
          <span className="hidden sm:inline text-slate-700 truncate max-w-xl text-[11.5px]">
            {t.description.slice(0, 110)}...
          </span>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end flex-wrap sm:flex-nowrap">
          {/* Toggle Warning Signs */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            className="text-slate-600 hover:text-red-700 flex items-center gap-1 font-semibold text-[11.5px] focus:outline-none focus:ring-2 focus:ring-red-400 rounded-lg px-2 py-1 hover:bg-red-100/50 transition-colors cursor-pointer"
          >
            <span>{isExpanded ? t.hideSigns : t.viewSigns}</span>
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Secondary Helpline if available */}
          {emergencyInfo.secondaryNumber && (
            <a
              href={emergencyInfo.secondaryTel}
              className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 border border-red-200 text-red-700 hover:bg-red-50 font-bold text-[11px] shadow-2xs hover:shadow-xs transition-all"
              title={emergencyInfo.helplineNotice}
            >
              <Phone className="w-2.5 h-2.5" />
              <span>{emergencyInfo.secondaryLabel}</span>
            </a>
          )}

          {/* Primary Country Emergency Dial Button */}
          <a
            href={emergencyInfo.primaryTel}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-[11px] shadow-xs shadow-red-500/20 hover:shadow-sm hover:scale-[1.02] active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
          >
            <span className="text-xs" aria-hidden="true">{emergencyInfo.flagEmoji}</span>
            <PhoneCall className="w-3 h-3 animate-bounce" />
            <span>{emergencyInfo.primaryLabel}</span>
          </a>
        </div>
      </div>

      {/* Expanded detailed warning signs (Fully Translated per Country & Language) */}
      {isExpanded && (
        <div className="bg-gradient-to-b from-red-50/95 to-rose-50/95 border-t border-red-200/60 px-4 py-4 sm:px-8 text-slate-800 text-xs animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="max-w-5xl mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-red-200/50">
              <p className="font-semibold text-red-950 text-xs sm:text-sm">
                {t.description}
              </p>
              <div className="flex items-center gap-2 text-[11px] text-red-700 shrink-0 font-medium bg-red-100/70 px-2.5 py-1 rounded-lg">
                <span>{emergencyInfo.flagEmoji} {emergencyInfo.countryName}</span>
              </div>
            </div>

            {/* Emergency Department & Helpline Notice */}
            <div className="p-2.5 rounded-xl bg-white/80 border border-red-200 text-slate-700 text-[11px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span className="leading-relaxed">{emergencyInfo.emergencyDepartmentAdvice}</span>
              <span className="text-red-800 font-semibold text-[10.5px] bg-red-50 px-2 py-0.5 rounded border border-red-200/60 shrink-0">
                {emergencyInfo.helplineNotice}
              </span>
            </div>

            {/* 6 Translated Red-Flag Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
              {emergencyInfo.warningSigns.map((sign, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-white/90 border border-red-100 shadow-2xs hover:border-red-200 flex flex-col gap-1 transition-all"
                >
                  <div className="flex items-center gap-1.5 font-bold text-red-900 text-[11.5px]">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span>{sign.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {sign.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-slate-500 italic pt-1 text-center">
              {emergencyInfo.educationalNotice}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
