import React, { useState } from 'react';
import { EnergyTimeNode, ScheduleEvent } from '../types';
import { ENERGY_TIME_NODES, SCHEDULE_EVENTS } from '../mockData';

interface EnergyScreenProps {
  onBoostRecalculate?: () => void;
  onCookSnack?: (name: string) => void;
}

export const EnergyScreen: React.FC<EnergyScreenProps> = ({
  onCookSnack,
}) => {
  const dates = ['Yesterday, Oct 23', 'Today, Oct 24', 'Tomorrow, Oct 25'];
  const [dateIndex, setDateIndex] = useState(1);
  const [selectedNode, setSelectedNode] = useState<EnergyTimeNode>(
    ENERGY_TIME_NODES.find((n) => n.id === 'node-215p') || ENERGY_TIME_NODES[3]
  );
  const [isBoostApplied, setIsBoostApplied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handlePrevDate = () => {
    if (dateIndex > 0) setDateIndex(dateIndex - 1);
  };

  const handleNextDate = () => {
    if (dateIndex < dates.length - 1) setDateIndex(dateIndex + 1);
  };

  const handleApplyBoost = () => {
    setIsBoostApplied(true);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Dynamic SVG path depending on whether boost is applied
  const strokePath = isBoostApplied
    ? 'M 0 50 Q 25 18, 50 18 T 110 26 T 160 38 T 195 55 T 240 45 T 290 28 T 360 85'
    : 'M 0 50 Q 25 18, 50 18 T 110 26 T 160 38 T 195 90 T 240 60 T 290 28 T 360 85';

  const areaPath = isBoostApplied
    ? 'M 0 120 L 0 50 Q 25 18, 50 18 T 110 26 T 160 38 T 195 55 T 240 45 T 290 28 T 360 85 L 360 120 Z'
    : 'M 0 120 L 0 50 Q 25 18, 50 18 T 110 26 T 160 38 T 195 90 T 240 60 T 290 28 T 360 85 L 360 120 Z';

  const slumpPinY = isBoostApplied ? 55 : 90;
  const slumpPinColor = isBoostApplied ? '#00f59b' : '#ffb86b';

  return (
    <div className="flex flex-col w-full pb-6 gap-space-lg text-[#dfe2ee]">
      {/* Header & Date Switcher */}
      <section className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f59b] text-[24px]">bolt</span>
            <span className="text-xl sm:text-2xl font-extrabold text-[#dfe2ee] font-display tracking-tight">
              Future Energy Forecast
            </span>
          </div>
          <div className="flex items-center gap-1 bg-[#1c2028] px-2.5 py-1 rounded-full shadow-sm border border-white/5">
            <button
              onClick={handlePrevDate}
              disabled={dateIndex === 0}
              className="text-[#b9cbbd] hover:text-[#00f59b] transition-colors p-1 disabled:opacity-30 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            <span className="text-xs text-[#dfe2ee] font-semibold px-1 font-display">
              {dates[dateIndex]}
            </span>
            <button
              onClick={handleNextDate}
              disabled={dateIndex === dates.length - 1}
              className="text-[#b9cbbd] hover:text-[#00f59b] transition-colors p-1 disabled:opacity-30 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
        <p className="text-sm text-[#b9cbbd]">Predict your day. Prepare your meals.</p>
      </section>

      {/* Interactive Energy Telemetry Curve */}
      <section className="flex flex-col bg-[#1c2028] rounded-3xl p-4 shadow-md gap-4 relative overflow-hidden border border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00f59b] animate-pulse shadow-sm" />
            <span className="text-sm font-bold text-[#dfe2ee] font-display">Metabolic Velocity</span>
          </div>
          <div className="flex items-center gap-1 bg-[#262a33] px-2.5 py-0.5 rounded-full">
            <span className="text-[10px] text-[#00f59b] font-bold font-display uppercase tracking-wide">
              Biomarker Simulation
            </span>
          </div>
        </div>

        {/* Interactive SVG Curve Canvas */}
        <div className="relative w-full h-44 flex flex-col justify-end pt-2">
          {/* Ambient Glows */}
          <div className="absolute -top-10 left-1/4 w-40 h-40 bg-[#00f59b]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-[#ffb86b]/10 rounded-full blur-2xl pointer-events-none" />

          {/* SVG Graph Curve */}
          <svg className="w-full h-32 overflow-visible" preserveAspectRatio="none" viewBox="0 0 360 120">
            <defs>
              <linearGradient id="energyGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#00f59b" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#ffb86b" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#0f131c" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="strokeGrad" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#00e38f" />
                <stop offset="45%" stopColor={isBoostApplied ? '#00e38f' : '#ffb86b'} />
                <stop offset="70%" stopColor="#00f59b" />
                <stop offset="100%" stopColor="#849588" />
              </linearGradient>
            </defs>

            {/* Benchmark grid lines */}
            <line stroke="#31353e" strokeDasharray="3 3" x1="0" x2="360" y1="30" y2="30" opacity="0.6" />
            <line stroke="#31353e" strokeDasharray="3 3" x1="0" x2="360" y1="70" y2="70" opacity="0.6" />

            {/* Area fill */}
            <path d={areaPath} fill="url(#energyGrad)" className="transition-all duration-700 ease-out" />

            {/* Curve stroke */}
            <path
              d={strokePath}
              fill="none"
              stroke="url(#strokeGrad)"
              strokeLinecap="round"
              strokeWidth="3.5"
              className="transition-all duration-700 ease-out"
            />

            {/* Slump / Boost Pin */}
            <circle
              cx="195"
              cy={slumpPinY}
              fill={slumpPinColor}
              r="5"
              className="animate-ping opacity-75 transition-all duration-700"
            />
            <circle
              cx="195"
              cy={slumpPinY}
              fill={slumpPinColor}
              r="5"
              stroke="#0f131c"
              strokeWidth="2"
              className="transition-all duration-700"
            />
          </svg>

          {/* Horizontal Time Ticks Selector */}
          <div className="flex items-center justify-between pt-2 text-[#b9cbbd] text-xs font-display">
            {ENERGY_TIME_NODES.map((node) => {
              const isSelected = selectedNode.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-1 rounded-md transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#ed9000] text-[#583300] font-bold shadow-sm px-2 py-0.5 rounded-full scale-105'
                      : 'hover:text-[#00f59b]'
                  }`}
                >
                  {node.code}
                </button>
              );
            })}
          </div>
        </div>

        {/* Micro-readout Card for Selected Time Scrubber */}
        <div className="bg-[#262a33] rounded-2xl p-3 flex flex-col gap-2 transition-all duration-200 border border-white/5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[#00f59b] font-display">{selectedNode.time}</span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold font-display ${
                  selectedNode.isSlump && isBoostApplied
                    ? 'bg-[#00f59b] text-[#003920]'
                    : selectedNode.isSlump
                    ? 'bg-[#ffb86b] text-[#492900]'
                    : 'bg-[#00f59b]/20 text-[#00f59b]'
                }`}
              >
                {selectedNode.isSlump && isBoostApplied
                  ? '72% ⚡ Protocol Protected'
                  : `${selectedNode.energyPct}% ${selectedNode.status}`}
              </span>
            </div>
            <span className="text-[10px] text-[#b9cbbd] uppercase tracking-wider font-semibold font-display">
              Telemetry Diagnostic
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="flex items-center gap-2 bg-[#181c24] px-2.5 py-2 rounded-xl border border-white/5">
              <span className="material-symbols-outlined text-[#00f59b] text-[16px]">schedule</span>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-[#b9cbbd] truncate">Circadian Phase</span>
                <span className="text-xs text-[#dfe2ee] font-semibold truncate">{selectedNode.circadianPhase}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#181c24] px-2.5 py-2 rounded-xl border border-white/5">
              <span className="material-symbols-outlined text-[#ffb86b] text-[16px]">restaurant</span>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-[#b9cbbd] truncate">Digestion State</span>
                <span className="text-xs text-[#dfe2ee] font-semibold truncate">{selectedNode.digestionState}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#181c24] px-2.5 py-2 rounded-xl border border-white/5">
              <span className="material-symbols-outlined text-[#ffb4ab] text-[16px]">coffee</span>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-[#b9cbbd] truncate">Caffeine Decay</span>
                <span className="text-xs text-[#dfe2ee] font-semibold truncate">{selectedNode.caffeineDecay}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#181c24] px-2.5 py-2 rounded-xl border border-white/5">
              <span className="material-symbols-outlined text-[#00f59b] text-[16px]">water_drop</span>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-[#b9cbbd] truncate">Hydration Delta</span>
                <span className="text-xs text-[#dfe2ee] font-semibold truncate">
                  {isBoostApplied && selectedNode.isSlump ? 'Optimal (+250ml)' : selectedNode.hydrationDelta}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Energy Dip Alert Panel (2:15 PM Deep Mitigation) */}
      <section className="flex flex-col bg-[#262a33] rounded-3xl p-4 shadow-md gap-4 relative overflow-hidden border border-white/5">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ed9000] text-[#583300] shadow-sm flex-shrink-0">
            <span className="material-symbols-outlined text-[22px]">warning</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] uppercase tracking-wider text-[#ffb86b] font-bold font-display">
              Proactive Intervention
            </span>
            <h2 className="text-base font-bold text-[#dfe2ee] font-display leading-tight">
              {isBoostApplied ? 'Afternoon Slump Defended' : 'Moderate Slump Expected at 2:15 PM'}
            </h2>
          </div>
        </div>

        {/* Biological Root Cause Box */}
        <div className="bg-[#1c2028] rounded-2xl p-3 flex flex-col gap-1 border border-white/5">
          <span className="text-[10px] text-[#b9cbbd] font-bold uppercase tracking-wider font-display">
            Root Cause Analysis
          </span>
          <p className="text-xs text-[#dfe2ee] leading-relaxed">
            High carb lunch scheduled + 4 hours elapsed since morning hydration + natural circadian dip in core body temperature.
          </p>
        </div>

        {/* Instant Energy Fix Action Protocol */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-[#dfe2ee] font-display">Instant Energy Fix Protocol</span>

          {/* Fix 1 */}
          <div className="flex items-center gap-3 bg-[#1c2028] rounded-2xl p-3 border border-white/5">
            <div className="w-8 h-8 rounded-full bg-[#00f59b]/20 text-[#00f59b] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[18px]">water_drop</span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-xs font-bold text-[#dfe2ee] truncate font-display">Hydrate Electrolytes</span>
              <span className="text-[11px] text-[#b9cbbd] truncate">400ml cold water + pinch of pink salt</span>
            </div>
            <span className="text-xs font-bold text-[#00f59b] font-display">+8%</span>
          </div>

          {/* Fix 2 */}
          <div
            onClick={() => onCookSnack && onCookSnack('Banana')}
            className="flex items-center gap-3 bg-[#1c2028] hover:bg-[#31353e] rounded-2xl p-3 border border-white/5 cursor-pointer transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#ffb86b]/20 text-[#ffb86b] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[18px]">nutrition</span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-xs font-bold text-[#dfe2ee] truncate font-display">Smart Sustain Snack</span>
              <span className="text-[11px] text-[#b9cbbd] truncate">1 Banana + 1 tbsp Peanut Butter (180 kcal, Low GI)</span>
            </div>
            <span className="text-xs font-bold text-[#ffb86b] font-display">+12%</span>
          </div>

          {/* Fix 3 */}
          <div className="flex items-center gap-3 bg-[#1c2028] rounded-2xl p-3 border border-white/5">
            <div className="w-8 h-8 rounded-full bg-[#dfcfff]/20 text-[#d0bcff] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[18px]">wb_sunny</span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-xs font-bold text-[#dfe2ee] truncate font-display">10-Min Outdoor Stride</span>
              <span className="text-[11px] text-[#b9cbbd] truncate">Photobiotic reset via natural spectrum lux</span>
            </div>
            <span className="text-xs font-bold text-[#d0bcff] font-display">+15%</span>
          </div>
        </div>

        {/* Boost Button */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            onClick={handleApplyBoost}
            className={`w-full py-3 px-4 rounded-full font-bold font-display text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer ${
              isBoostApplied
                ? 'bg-[#181c24] text-[#00f59b] border border-[#00f59b]/40'
                : 'bg-[#00f59b] hover:bg-[#00e38f] text-[#003920]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">bolt</span>
            <span>
              {isBoostApplied
                ? '✓ Protocol Active (+20% curve lifted)'
                : 'Log Fix & Boost Predicted Energy (+20% curve lift)'}
            </span>
          </button>

          {showToast && (
            <div className="bg-[#0a0e16] text-[#00f59b] text-xs font-semibold py-2 px-4 rounded-full text-center border border-[#00f59b]/30 animate-fade-in font-display">
              ✓ Curve recalculated! Estimated slump eliminated.
            </div>
          )}
        </div>
      </section>

      {/* Synchronized Schedule */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#00f59b] uppercase tracking-wider font-bold font-display">
              Synchronized Schedule
            </span>
            <h3 className="text-base font-bold text-[#dfe2ee] font-display">Meal &amp; Routine Schedule</h3>
          </div>
          <span className="material-symbols-outlined text-[#b9cbbd] text-[20px]">event_repeat</span>
        </div>

        <div className="flex flex-col gap-2">
          {SCHEDULE_EVENTS.map((evt, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 bg-[#1c2028] rounded-2xl p-3 shadow-sm border border-white/5"
            >
              <div className="flex flex-col items-center pt-0.5 w-11 shrink-0 font-display">
                <span className="text-xs text-[#00f59b] font-bold">{evt.time}</span>
                <span className="text-[10px] text-[#b9cbbd]">{evt.period}</span>
              </div>
              <div className={`w-1 self-stretch rounded-full ${evt.colorBorder}`} />
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#dfe2ee] truncate font-display">{evt.title}</span>
                  {evt.tag && (
                    <span className="text-[10px] font-semibold text-[#00f59b] px-2 py-0.5 rounded-full bg-[#262a33]">
                      {evt.tag}
                    </span>
                  )}
                  {evt.icon && (
                    <span className="material-symbols-outlined text-[#00f59b] text-[16px]">{evt.icon}</span>
                  )}
                </div>
                <span className="text-[11px] text-[#b9cbbd] mt-0.5 leading-snug">{evt.description}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sleep Quality Prediction */}
      <section className="flex flex-col bg-[#1c2028] rounded-3xl p-4 shadow-md gap-3 border border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#d0bcff] text-[24px]">bedtime</span>
            <h3 className="text-base font-bold text-[#dfe2ee] font-display">Tonight&apos;s Sleep Forecast</h3>
          </div>
          <div className="flex items-center gap-1 bg-[#262a33] px-3 py-1 rounded-full font-display">
            <span className="text-base text-[#00f59b] font-bold">82%</span>
            <span className="text-xs text-[#dfe2ee] font-semibold">Restful</span>
          </div>
        </div>

        <div className="w-full bg-[#0a0e16] h-2 rounded-full overflow-hidden my-1">
          <div
            className="bg-gradient-to-r from-[#00f59b] to-[#d0bcff] h-full rounded-full shadow-[0_0_8px_#00f59b]"
            style={{ width: '82%' }}
          />
        </div>

        <div className="flex items-start gap-2 pt-1">
          <span className="material-symbols-outlined text-[#00f59b] text-[18px] flex-shrink-0 mt-0.5">check_circle</span>
          <p className="text-xs text-[#b9cbbd] leading-relaxed">
            Dinner scheduled at 8:30 PM gives a <span className="text-[#dfe2ee] font-semibold">2h 15m digestion buffer</span> before sleep. Cut caffeine intake after 3:00 PM to maximize slow-wave delta cycles.
          </p>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <footer className="flex items-center justify-center p-3 rounded-full bg-[#181c24] text-center border border-white/5">
        <p className="text-[11px] text-[#b9cbbd]">
          ⚠️ NutriPulse forecasts are algorithmic estimations based on user logs and circadian science, not a medical diagnosis.
        </p>
      </footer>
    </div>
  );
};
