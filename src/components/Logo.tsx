import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLiveBadge?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  iconOnly = false,
  size = 'md',
  showLiveBadge = true,
}) => {
  const iconSizes = {
    sm: 34,
    md: 42,
    lg: 56,
  };

  const currentIconSize = iconSizes[size];

  return (
    <div
      dir="ltr"
      className={`relative flex items-center gap-3 select-none group ${className}`}
      aria-label="PulseBridge Health Care Logo"
    >
      {/* Container with Live Ambient Aura and Glass Sheen */}
      <div className="relative shrink-0 flex items-center justify-center">
        {/* Breathing live aura behind icon */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-400/40 via-cyan-300/30 to-blue-500/40 animate-live-aura pointer-events-none"
        />

        {/* Squircle with modern sky-blue gradient, bridge arch, and live ECG pulse */}
        <div className="relative overflow-hidden rounded-2xl shadow-md shadow-sky-900/10 border border-white/60">
          <svg
            width={currentIconSize}
            height={currentIconSize}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 transition-transform duration-300 group-hover:scale-105"
          >
            <defs>
              {/* Sky Blue Liquid Mesh Gradient */}
              <linearGradient id="pbLiquidSky" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#0EA5E9" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>

              {/* Specular Top Edge Light */}
              <linearGradient id="pbTopEdgeLight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
              </linearGradient>

              {/* Bridge Arch Glow */}
              <linearGradient id="pbBridgeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
              </linearGradient>

              {/* Glowing Pulse Stroke Gradient */}
              <linearGradient id="pbPulseGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E0F2FE" />
                <stop offset="45%" stopColor="#FFFFFF" />
                <stop offset="55%" stopColor="#7DD3FC" />
                <stop offset="100%" stopColor="#E0F2FE" />
              </linearGradient>
            </defs>

            {/* Rounded squircle background in sky blue with liquid depth */}
            <rect width="64" height="64" rx="16" fill="url(#pbLiquidSky)" />

            {/* Specular top glass edge highlight */}
            <path
              d="M4 16 C 4 9.37 9.37 4 16 4 L 48 4 C 54.63 4 60 9.37 60 16"
              stroke="url(#pbTopEdgeLight)"
              strokeWidth="1.5"
              fill="none"
            />

            {/* Elegant Bridge Arch connecting clinical medicine to patients */}
            <path
              d="M10 44 C 18 20, 46 20, 54 44"
              stroke="url(#pbBridgeGlow)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M12 44 C 20 23, 44 23, 52 44"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Base Heartbeat ECG Wave Path (crisp white) */}
            <path
              id="ecgBasePath"
              d="M8 43 L 18 43 L 23 43 L 26 31 L 31 51 L 37 25 L 42 43 L 47 43 L 56 43"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* LIVE Animated Heartbeat Pulse Wave: bright beam travelling through the ECG */}
            <path
              d="M8 43 L 18 43 L 23 43 L 26 31 L 31 51 L 37 25 L 42 43 L 47 43 L 56 43"
              stroke="url(#pbPulseGlow)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-ecg-travel"
              style={{ filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.9))' }}
            />

            {/* Live cardiac node ping at the peak of the ECG wave (X=37, Y=25) */}
            <circle
              cx="37"
              cy="25"
              r="2.8"
              fill="#FFFFFF"
              className="animate-cardiac-pulse"
              style={{ filter: 'drop-shadow(0 0 4px #7DD3FC)' }}
            />
          </svg>

          {/* Liquid Gloss Sheen Light Sweeping across the Logo */}
          <div
            aria-hidden="true"
            className="absolute -inset-full w-[250%] h-[250%] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none animate-liquid-sheen"
          />
        </div>

        {/* Small live heartbeat ping dot on the logo corner */}
        {showLiveBadge && (
          <span
            aria-hidden="true"
            className="absolute -top-1 -right-1 flex h-2.5 w-2.5"
            title="Live System Active"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500 ring-1.5 ring-white shadow-2xs" />
          </span>
        )}
      </div>

      {/* Typography: Pulse + Bridge + HEALTH CARE with Apple-inspired precision */}
      {!iconOnly && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-baseline font-bold tracking-tight">
            <span
              className={`${
                size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl'
              } text-[#0C4A6E] font-black tracking-tight drop-shadow-2xs`}
            >
              Pulse
            </span>
            <span
              className={`${
                size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl'
              } text-[#0284C7] font-black tracking-tight ml-0.5 drop-shadow-2xs`}
            >
              Bridge
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={`${
                size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-[11px]' : 'text-[10px]'
              } uppercase tracking-[0.24em] text-[#64748B] font-bold`}
            >
              Health Care
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="System Online" />
          </div>
        </div>
      )}
    </div>
  );
};
