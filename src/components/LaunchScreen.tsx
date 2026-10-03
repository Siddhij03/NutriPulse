import React from 'react';

interface LaunchScreenProps {
  onLaunch: () => void;
  onExploreDemo: () => void;
  onOpenDashboard?: () => void;
}

export const LaunchScreen: React.FC<LaunchScreenProps> = ({
  onLaunch,
  onExploreDemo,
}) => {
  return (
    <div className="relative w-full min-h-screen bg-[#070A0F] text-slate-100 flex flex-col justify-between overflow-hidden selection:bg-[#00F59B] selection:text-[#070A0F]">
      {/* Ambient Background Vortex */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          alt="Futuristic glowing energy vortex and circadian wave abstract background"
          className="w-full h-full object-cover object-center opacity-45 scale-110 filter saturate-125 brightness-90 mix-blend-screen"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAV2dyqRi5NO3vwNTwA4O407EjU25N_2Fg21T9y2lQlHOb9D2BKs8tXVExtFkyYrdEDR4S8lboH_Nig_Y28sNhxEipfN2kkRpD6RuJngTTKkPrwr5yJFvqXDq4RVOGSbLFiTqpQikyLH0_EvxFHQFFDWBZG074JpR3GPh1Zune9lAx-ZGwXldYbtyQkIW6lVwJsMmKoaC_AhpVcUWFphDMcyyv3-ttJ9VROBUZgw774F1pusCc7a0qU4w"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070A0F]/90 via-[#090D14]/60 to-[#070A0F]" />
        <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-[#070A0F] to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#070A0F] via-[#070A0F]/95 to-transparent" />
        <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#00F59B]/15 rounded-full blur-[90px] pointer-events-none" />
      </div>

      {/* Android System Status Bar */}
      <header className="relative z-20 w-full px-6 pt-3.5 pb-2 flex items-center justify-between text-xs font-semibold tracking-wide text-slate-300">
        <span className="text-sm font-medium tracking-tight text-slate-200">9:41</span>
        <div className="flex items-center space-x-2 text-slate-300">
          <span className="material-symbols-outlined text-[15px] opacity-90">wifi</span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">5G</span>
          <div className="flex items-center space-x-1 pl-0.5">
            <div className="w-5 h-2.5 rounded-sm border border-slate-300 p-0.5 flex items-center">
              <div className="w-full h-full bg-[#00F59B] rounded-2xs" />
            </div>
            <div className="w-0.5 h-1 bg-slate-300 rounded-r-xs" />
          </div>
        </div>
      </header>

      {/* Hero & Brand Presentation */}
      <main className="relative z-10 flex-1 px-6 flex flex-col items-center justify-center pt-2 pb-4 text-center">
        {/* Emblem Container with Concentric Glow Rings */}
        <div className="relative mb-6">
          <div className="absolute -inset-4 rounded-full border border-[#00F59B]/20 pulse-glow" />
          <div className="absolute -inset-8 rounded-full border border-[#00F59B]/10 pulse-glow" style={{ animationDelay: '1.5s' }} />
          <div className="absolute inset-0 rounded-full bg-[#00F59B]/20 filter blur-xl" />

          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-b from-[#00F59B]/50 via-[#00F59B]/15 to-transparent shadow-[0_0_35px_-3px_rgba(0,245,155,0.45)]">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#070A0F]/90 p-1 flex items-center justify-center border border-[#00F59B]/40">
              <img
                alt="NutriPulse Official Neon Emblem"
                className="w-full h-full object-cover object-center rounded-full scale-105"
                src="https://lh3.googleusercontent.com/aida/AEtjO1W8IYUWKDaC4HWXtpYbGlYFJrtFFc26A39Q0IA8DbJV16Nw9a0YeihZ7rMpIPbnvbBC_STtpZROj9So_m7wh1Rsr5YW_8QfKeDop9B7RtwxFD-O3H0xrub-BiKGvF3QSIO1M1eHpSY7QwjWStlIypvM-UUB1B_0igErJkDZ9Jygb29mvMb2NvvXD0TFbKHRWbEE63VeFewPqXt5g0jDvySA0D8IZMNJdqcG_bqr4xqN-6J4-e3eGr59S9c"
              />
            </div>
          </div>
        </div>

        {/* App Wordmark & Dynamic Pill Status */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-center space-x-1.5">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
              Nutri<span className="text-[#00F59B] drop-shadow-[0_0_12px_rgba(0,245,155,0.6)]">Pulse</span>
            </h1>
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#00F59B] shadow-[0_0_15px_-2px_rgba(0,245,155,0.6)] animate-ping" />
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#00F59B]/10 border border-[#00F59B]/30 text-[#00F59B] text-xs font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F59B] animate-pulse" />
            <span>SYSTEM ACTIVE • CIRCADIAN ENGINE ONLINE</span>
          </div>
        </div>

        {/* Core Value Pitch */}
        <p className="text-base sm:text-lg font-medium text-slate-200 tracking-tight max-w-[310px] leading-snug mx-auto mb-6">
          Predict your energy. <br className="hidden sm:inline" />
          <span className="text-white font-semibold">Eat smarter.</span> Waste less.
        </p>

        {/* Holographic Feature Badges */}
        <div className="w-full max-w-sm flex items-center justify-center gap-2 flex-wrap mb-4">
          <div className="bg-white/5 border border-slate-700/60 rounded-full px-3 py-1.5 flex items-center space-x-1.5 text-xs font-medium text-slate-200 shadow-sm backdrop-blur-md">
            <span className="text-[#00F59B] text-xs">⚡</span>
            <span>Circadian Forecast</span>
          </div>
          <div className="bg-white/5 border border-slate-700/60 rounded-full px-3 py-1.5 flex items-center space-x-1.5 text-xs font-medium text-slate-200 shadow-sm backdrop-blur-md">
            <span className="text-emerald-400 text-xs">🥗</span>
            <span>Zero-Waste AI</span>
          </div>
          <div className="bg-white/5 border border-slate-700/60 rounded-full px-3 py-1.5 flex items-center space-x-1.5 text-xs font-medium text-slate-200 shadow-sm backdrop-blur-md">
            <span className="text-teal-300 text-xs">🧬</span>
            <span>Biometric Sync</span>
          </div>
        </div>
      </main>

      {/* Interactive Access Controls */}
      <footer className="relative z-20 px-6 pb-6 pt-2 flex flex-col space-y-3.5">
        {/* Interactive Demo Mode Chip */}
        <button
          onClick={onExploreDemo}
          className="w-full text-left bg-[#0C121D]/80 border border-[#00F59B]/30 hover:border-[#00F59B]/60 rounded-2xl p-2.5 flex items-center justify-between shadow-[0_8px_30px_-4px_rgba(0,245,155,0.15)] transition active:scale-[0.98] group cursor-pointer"
        >
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-[#00F59B]/10 border border-[#00F59B]/40 flex items-center justify-center text-[#00F59B] text-sm group-hover:bg-[#00F59B] group-hover:text-[#070A0F] transition-colors">
              ⚡
            </div>
            <div>
              <p className="text-xs font-bold text-white tracking-tight flex items-center space-x-1">
                <span>Explore Maya's Live Day</span>
                <span className="text-[10px] text-slate-400 font-normal">(Demo Mode)</span>
              </p>
              <p className="text-[11px] text-slate-400">Preview instantaneous circadian nutrition feed</p>
            </div>
          </div>
          <div className="px-2 py-1 rounded-lg bg-[#00F59B]/10 border border-[#00F59B]/30 text-[11px] font-bold text-[#00F59B]">
            84% Stamina
          </div>
        </button>

        {/* Primary Action Launch CTA */}
        <button
          onClick={onLaunch}
          className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#00F59B] via-[#24ffb0] to-[#00F59B] hover:brightness-105 text-[#070A0F] font-extrabold text-base tracking-wide flex items-center justify-center space-x-2.5 shadow-[0_0_35px_-3px_rgba(0,245,155,0.45)] active:scale-[0.98] transition-all transform duration-150 cursor-pointer"
        >
          <span>Launch Experience</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>

        {/* Alternative Sign In Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-0.5">
          <button
            onClick={onLaunch}
            className="w-full py-2.5 px-3 rounded-full border border-slate-700/80 bg-[#0C121D]/60 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-center space-x-2 transition active:scale-[0.98] cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" fill="#EA4335" />
              <path d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.8z" fill="#4285F4" />
              <path d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z" fill="#FBBC05" />
              <path d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" fill="#34A853" />
            </svg>
            <span>Google Sign In</span>
          </button>
          <button
            onClick={onLaunch}
            className="w-full py-2.5 px-3 rounded-full border border-slate-700/80 bg-[#0C121D]/60 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-center space-x-2 transition active:scale-[0.98] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-slate-400">mail</span>
            <span>Email Access</span>
          </button>
        </div>

        {/* Version Disclaimer */}
        <div className="pt-2 text-center space-y-1">
          <p className="text-[10px] leading-tight text-slate-400 font-normal px-2">
            Powered by <span className="text-slate-300 font-medium">Pulse AI v2.4</span> • Circadian &amp; Metabolic Telemetry.
            <br />Estimates for wellness optimization, not clinical diagnosis.
          </p>
          <p className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold">
            v1.0.4 Release Ready • Android Play Store Build
          </p>
        </div>

        {/* Android Home Bar */}
        <div className="w-full pt-1 pb-0.5 flex justify-center items-center">
          <div className="w-36 h-1 bg-slate-600/70 rounded-full" />
        </div>
      </footer>
    </div>
  );
};
