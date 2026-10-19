import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Info, Heart, Eye, Sparkles } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { translations } from '../utils/i18n';

interface CirculatoryDiagramProps {
  selectedTopicId: string;
  onSelectTopic: (topicId: string) => void;
  language: SupportedLanguage;
}

export const CirculatoryDiagram: React.FC<CirculatoryDiagramProps> = ({
  selectedTopicId,
  onSelectTopic,
  language,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showHotspots, setShowHotspots] = useState(true);
  const [imageError, setImageError] = useState(false);
  const t = translations[language].anatomy;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 1.75));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  // Multilingual Hotspots mapped onto 550 x 830 viewBox of Circulatory_System_en.svg
  const hotspots: Array<{
    id: string;
    label: Record<SupportedLanguage, string>;
    xPercent: number; // percentage of 550
    yPercent: number; // percentage of 830
    color: string;
    glowColor: string;
  }> = [
    {
      id: 'brain_nervous',
      label: {
        en: 'Carotid & Jugular / Brain',
        ur: 'کیروٹڈ و جوگولر رگیں / دماغ',
        bn: 'ক্যারোটিড ও জুগুলার রক্তনালী / মস্তিষ্ক',
        ja: '頸動脈・頸静脈 / 脳血管',
      },
      xPercent: 50,
      yPercent: 7.5,
      color: 'bg-indigo-600',
      glowColor: 'ring-indigo-400',
    },
    {
      id: 'heart',
      label: {
        en: 'Heart & Aorta (Coronary)',
        ur: 'دل اور شہ رگ (کورونری نظام)',
        bn: 'হৃৎপিণ্ড ও মহাধমনী (করোনারি সংবহন)',
        ja: '心臓と大動脈（冠動脈系）',
      },
      xPercent: 51,
      yPercent: 27.5,
      color: 'bg-red-600',
      glowColor: 'ring-red-400',
    },
    {
      id: 'respiratory',
      label: {
        en: 'Pulmonary Circulation',
        ur: 'پلمونری دورانِ خون (پھیپھڑے)',
        bn: 'ফুসফুসীয় রক্ত সংবহন',
        ja: '肺循環（肺血管ネットワーク）',
      },
      xPercent: 58,
      yPercent: 25.0,
      color: 'bg-teal-600',
      glowColor: 'ring-teal-400',
    },
    {
      id: 'blood_vessels',
      label: {
        en: 'Subclavian & Brachial Vessels',
        ur: 'سب کلیوین اور بریقیل رگیں',
        bn: 'সাবক্ল্যাভিয়ান ও ব্র্যাকিয়াল রক্তনালী',
        ja: '鎖骨下動脈・上腕血管',
      },
      xPercent: 32,
      yPercent: 26,
      color: 'bg-blue-600',
      glowColor: 'ring-blue-400',
    },
    {
      id: 'circulation_loops',
      label: {
        en: 'Systemic Vascular Tree',
        ur: 'عمومی نظامِ شریان و ورید',
        bn: 'সিস্টেমিক ভাস্কুলার নেটওয়ার্ক',
        ja: '全身の血管ネットワーク',
      },
      xPercent: 49,
      yPercent: 41,
      color: 'bg-cyan-600',
      glowColor: 'ring-cyan-400',
    },
    {
      id: 'digestive',
      label: {
        en: 'Celiac & Hepatic Portal Loop',
        ur: 'جگر و معدے کا پورٹل نظام',
        bn: 'হেপাটিক পোর্টাল ও পরিপাকতন্ত্র',
        ja: '腹腔動脈・門脈循環系',
      },
      xPercent: 52,
      yPercent: 37.5,
      color: 'bg-amber-600',
      glowColor: 'ring-amber-400',
    },
    {
      id: 'muscular',
      label: {
        en: 'Femoral & Tibial Muscle Vessels',
        ur: 'فیمورل اور ٹبیئل پٹھے کی رگیں',
        bn: 'ফিমোরাল ও টিবিয়াল রক্তনালী',
        ja: '大腿動脈・脛骨筋血管',
      },
      xPercent: 55,
      yPercent: 64,
      color: 'bg-emerald-600',
      glowColor: 'ring-emerald-400',
    },
  ];

  return (
    <div className="relative w-full flex flex-col items-center bg-gradient-to-b from-white via-sky-50/40 to-white rounded-3xl border border-sky-100 shadow-md shadow-sky-900/5 overflow-hidden p-3 sm:p-5 select-none backdrop-blur-md">
      {/* Controls Bar */}
      <div className="w-full flex items-center justify-between gap-2 pb-3 mb-2 border-b border-sky-100 text-xs">
        {/* Legend */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block shadow-2xs" />
            <span className="text-[11px] text-red-700">{t.arteryLabel}</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block shadow-2xs" />
            <span className="text-[11px] text-blue-700">{t.veinLabel}</span>
          </div>
        </div>

        {/* Zoom & Toggle Controls */}
        <div className="flex items-center gap-1 bg-sky-50/90 rounded-xl p-1 border border-sky-200/80 shadow-2xs">
          <button
            onClick={() => setShowHotspots(!showHotspots)}
            title={showHotspots ? 'Hide Interactive Markers' : 'Show Interactive Markers'}
            className={`px-2 py-1 rounded-lg transition-colors text-xs flex items-center gap-1 font-semibold ${
              showHotspots
                ? 'bg-white text-[#0C4A6E] shadow-xs'
                : 'text-slate-500 hover:text-[#0C4A6E]'
            }`}
            aria-label="Toggle Interactive Markers"
          >
            <Eye className="w-3.5 h-3.5 text-[#0284c7]" />
            <span className="hidden sm:inline text-[11px]">{t.toggleMarkers}</span>
          </button>

          <button
            onClick={handleZoomIn}
            title="Zoom In"
            className="p-1.5 rounded-lg text-slate-600 hover:text-[#0C4A6E] hover:bg-white transition-colors cursor-pointer"
            aria-label="Zoom In Diagram"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomOut}
            title="Zoom Out"
            className="p-1.5 rounded-lg text-slate-600 hover:text-[#0C4A6E] hover:bg-white transition-colors cursor-pointer"
            aria-label="Zoom Out Diagram"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetZoom}
            title="Reset Zoom"
            className="p-1.5 rounded-lg text-slate-600 hover:text-[#0C4A6E] hover:bg-white transition-colors cursor-pointer"
            aria-label="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Diagram Viewport */}
      <div className="relative w-full overflow-hidden flex items-center justify-center min-h-[500px] sm:min-h-[560px] bg-gradient-to-b from-sky-50/30 via-white to-sky-50/20 rounded-2xl border border-sky-100">
        <div
          className="relative transition-transform duration-200 ease-out origin-center flex items-center justify-center w-full max-w-[440px]"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Circulatory SVG Image with natural aspect ratio preservation */}
          {!imageError ? (
            <img
              src="/Circulatory_System_en.svg"
              alt="Circulatory System Diagram: Complete anatomical map of human blood vessels, heart, and organs"
              className="w-full h-auto max-h-[560px] object-contain drop-shadow-sm select-none"
              onError={() => setImageError(true)}
              loading="eager"
            />
          ) : (
            <div className="p-8 text-center text-slate-500 text-xs">
              Diagram preview unavailable
            </div>
          )}

          {/* Interactive Topic Hotspots positioned over anatomical coordinates */}
          {showHotspots &&
            hotspots.map((spot) => {
              const isSelected = spot.id === selectedTopicId;
              const hotspotLabel = spot.label[language] || spot.label.en;
              return (
                <button
                  key={spot.id}
                  onClick={() => onSelectTopic(spot.id)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group z-20 focus:outline-none transition-all duration-200 cursor-pointer`}
                  style={{
                    left: `${spot.xPercent}%`,
                    top: `${spot.yPercent}%`,
                  }}
                  aria-label={`Inspect ${hotspotLabel}`}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Ripple ring for active selection */}
                    {isSelected && (
                      <span className="absolute w-8 h-8 rounded-full bg-[#0284c7]/30 animate-ping" />
                    )}

                    {/* Hotspot Core Pin */}
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-md ring-2 ring-white transition-all transform group-hover:scale-125 ${
                        isSelected
                          ? 'bg-[#0284c7] ring-[#0284c7] scale-110 shadow-sky-500/40'
                          : `${spot.color} hover:ring-2 hover:${spot.glowColor}`
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-white" />
                    </span>

                    {/* Floating Tooltip Label */}
                    <div
                      className={`absolute pointer-events-none whitespace-nowrap px-2.5 py-1 rounded-lg text-[10.5px] font-bold tracking-tight shadow-lg transition-all duration-180 z-30 ${
                        isSelected
                          ? 'bottom-full mb-1.5 opacity-100 bg-[#0C4A6E] text-white ring-1 ring-sky-300'
                          : 'bottom-full mb-1 opacity-0 group-hover:opacity-100 bg-slate-900/90 text-white'
                      }`}
                    >
                      {hotspotLabel}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0C4A6E]" />
                    </div>
                  </div>
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};
