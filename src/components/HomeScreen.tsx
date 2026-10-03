import React from 'react';
import { UserProfile, DailyQuest } from '../types';

interface HomeScreenProps {
  user: UserProfile;
  quests: DailyQuest[];
  onToggleQuest: (questId: string, xp: number) => void;
  onLogWater: () => void;
  onFixEnergy: () => void;
  onQuickBoost: () => void;
  onCookWithAi: (ingredient: string) => void;
  onOpenPrivacyVault: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  quests,
  onToggleQuest,
  onLogWater,
  onFixEnergy,
  onQuickBoost,
  onCookWithAi,
  onOpenPrivacyVault,
}) => {
  // SVG circular dial geometry
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (user.energyScore / 100) * circumference;

  const waterPercent = Math.min(Math.round((user.hydrationCurrent / user.hydrationGoal) * 100), 100);
  const xpPercent = Math.min(Math.round((user.xp / user.xpTarget) * 100), 100);

  return (
    <div className="flex flex-col w-full pb-6 gap-space-md text-[#dfe2ee]">
      {/* Interactive Demo Notification Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#262a33] px-4 py-2.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="material-symbols-outlined text-[#00e38f] text-[18px] animate-pulse">auto_awesome</span>
          <p className="text-xs text-[#b9cbbd] truncate">
            <span className="font-semibold text-[#cdffdc]">Interactive Demo Active</span> — Tap cards, tasks &amp; loggers
          </p>
        </div>
        <span className="text-[10px] text-[#b9cbbd] bg-[#1c2028] px-2 py-0.5 rounded-full shrink-0 font-medium">Live Mock</span>
      </div>

      {/* Welcome Greeting Header */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#dfe2ee] font-display tracking-tight">
            Good morning, {user.name} 👋
          </h2>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ed9000] text-[#583300] shadow-sm font-display">
            <span className="material-symbols-outlined text-[16px]">military_tech</span>
            <span className="text-xs font-bold tracking-tight">LVL {user.level}</span>
          </div>
        </div>
        <p className="text-sm text-[#b9cbbd]">Here&apos;s your personal energy forecast for today.</p>
      </div>

      {/* Hero Energy Forecast Card */}
      <div className="relative overflow-hidden rounded-3xl bg-[#262a33]/90 backdrop-blur-xl p-5 shadow-xl flex flex-col gap-4 border border-white/5">
        {/* Ambient Cyber-Glow Effect Behind Dial */}
        <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-[#00f59b]/15 blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-40 h-40 rounded-full bg-[#ffb86b]/10 blur-2xl pointer-events-none" />

        {/* Upper Section: Ring + Real-Time Readout */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00e38f] animate-ping" />
              <span className="text-[10px] uppercase tracking-wider text-[#00e38f] font-bold font-display">
                Bio-Telemetry Feed
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-[#dfe2ee] font-display tracking-tight">
                {user.energyScore}%
              </span>
              <span className="text-lg text-[#00e38f] font-semibold font-display">Strong Start</span>
            </div>
            <p className="text-xs text-[#b9cbbd] flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-[#ffb86b]">trending_up</span> Peak cellular efficiency detected
            </p>
          </div>

          {/* Neon Kinetic Energy Ring SVG */}
          <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                className="text-[#31353e]/40"
                cx="50"
                cy="50"
                fill="transparent"
                r={radius}
                stroke="currentColor"
                strokeWidth="8"
              />
              <circle
                className="text-[#00f59b] transition-all duration-700 ease-out"
                cx="50"
                cy="50"
                fill="transparent"
                r={radius}
                stroke="currentColor"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                strokeWidth="8"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-[#00f59b] text-[24px]">bolt</span>
              <span className="text-[10px] text-[#00f59b] font-bold font-display">OPTIMAL</span>
            </div>
          </div>
        </div>

        {/* Alert Banner: Predicted Energy Dip */}
        <div className="relative z-10 flex items-center gap-3 p-3 rounded-2xl bg-[#181c24] shadow-sm border border-white/5">
          <div className="w-8 h-8 rounded-full bg-[#ed9000] flex items-center justify-center shrink-0 text-[#583300]">
            <span className="material-symbols-outlined text-[18px]">timelapse</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#dfe2ee]">Predicted Energy Dip</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#ffb86b]/20 text-[#ffb86b] font-bold">Moderate</span>
            </div>
            <p className="text-xs text-[#b9cbbd] truncate">Expected around 1:45 PM based on circadian cycle</p>
          </div>
        </div>

        {/* Immediate Smart Recommendation */}
        <div className="relative z-10 flex flex-col gap-1 p-3 rounded-2xl bg-[#1c2028] border border-white/5">
          <div className="flex items-center gap-1.5 text-[#ffb86b]">
            <span className="material-symbols-outlined text-[18px]">tips_and_updates</span>
            <span className="text-xs font-bold uppercase tracking-wider font-display">Quick Pre-Emptive Fix</span>
          </div>
          <p className="text-xs text-[#dfe2ee] leading-snug">
            🥜 Fuel with <span className="font-semibold text-[#00f59b]">Banana + peanut butter</span> and hydrate with{' '}
            <span className="font-semibold text-[#00f59b]">300ml water</span> before 1:30 PM.
          </p>
        </div>

        {/* Interactive CTA Buttons */}
        <div className="relative z-10 grid grid-cols-2 gap-2.5 pt-1">
          <button
            onClick={onFixEnergy}
            className="py-2.5 px-3 rounded-full bg-[#00f59b] hover:bg-[#00e38f] text-[#003920] text-xs font-bold font-display flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
            <span>Fix My Energy</span>
          </button>
          <button
            onClick={onQuickBoost}
            className="py-2.5 px-3 rounded-full bg-[#1c2028] hover:bg-[#31353e] text-[#ffb86b] text-xs font-bold font-display flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer border border-[#ffb86b]/30"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Log Boost</span>
          </button>
        </div>
      </div>

      {/* Daily Health Score Widget */}
      <div className="flex flex-col gap-3 p-4 rounded-3xl bg-[#1c2028] shadow-md border border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#b9cbbd] uppercase tracking-wider font-semibold font-display">
              System Health Index
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#dfe2ee] font-display">{user.healthIndex}</span>
              <span className="text-sm text-[#b9cbbd]">/ 100</span>
              <div className="flex items-center gap-0.5 text-[#00e38f] bg-[#262a33] px-2 py-0.5 rounded-full ml-1 text-[11px] font-bold">
                <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                <span>+4 pts</span>
              </div>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#262a33] flex items-center justify-center">
            <span className="material-symbols-outlined text-[#00f59b] text-[26px]">vital_signs</span>
          </div>
        </div>

        {/* Health Score Breakdown Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#262a33]">
            <span className="material-symbols-outlined text-[#00f59b] text-[15px]">restaurant</span>
            <span className="text-xs text-[#dfe2ee]">Nutrition</span>
            <span className="text-xs text-[#00f59b] font-bold font-display">{user.healthBreakdown.nutrition}</span>
          </div>
          <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#262a33]">
            <span className="material-symbols-outlined text-[#00e38f] text-[15px]">water_drop</span>
            <span className="text-xs text-[#dfe2ee]">Hydration</span>
            <span className="text-xs text-[#ffb86b] font-bold font-display">{user.healthBreakdown.hydration}</span>
          </div>
          <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#262a33]">
            <span className="material-symbols-outlined text-[#d0bcff] text-[15px]">bedtime</span>
            <span className="text-xs text-[#dfe2ee]">Sleep</span>
            <span className="text-xs text-[#d0bcff] font-bold font-display">{user.healthBreakdown.sleep}</span>
          </div>
          <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#262a33]">
            <span className="material-symbols-outlined text-[#ffb86b] text-[15px]">directions_run</span>
            <span className="text-xs text-[#dfe2ee]">Activity</span>
            <span className="text-xs text-[#ffb86b] font-bold font-display">{user.healthBreakdown.activity}</span>
          </div>
          <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#262a33]">
            <span className="material-symbols-outlined text-[#00f59b] text-[15px]">health_and_safety</span>
            <span className="text-xs text-[#dfe2ee]">Recovery</span>
            <span className="text-xs text-[#00f59b] font-bold font-display">{user.healthBreakdown.recovery}</span>
          </div>
        </div>
      </div>

      {/* Quick Telemetry & Macro Cards (Horizontal Scroll Stream) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#dfe2ee] font-display">Today&apos;s Biometrics</h3>
          <span className="text-xs text-[#b9cbbd]">Live Syncing</span>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
          {/* Card 1: Hydration Tracker */}
          <div className="w-64 shrink-0 rounded-2xl bg-[#1c2028] p-4 flex flex-col justify-between shadow-md border border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#262a33] flex items-center justify-center text-[#00e38f]">
                  <span className="material-symbols-outlined text-[18px]">water_drop</span>
                </div>
                <span className="text-xs font-semibold text-[#dfe2ee] font-display">Hydration</span>
              </div>
              <span className="text-[11px] text-[#b9cbbd]">Goal: {(user.hydrationGoal / 1000).toFixed(1)}L</span>
            </div>

            <div className="my-3 flex flex-col gap-1">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-[#dfe2ee] font-display">
                  {user.hydrationCurrent.toLocaleString()}
                </span>
                <span className="text-xs text-[#b9cbbd]">/ {user.hydrationGoal.toLocaleString()} ml</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#31353e] overflow-hidden">
                <div
                  className="h-full bg-[#00e38f] rounded-full transition-all duration-300 shadow-[0_0_8px_#00e38f]"
                  style={{ width: `${waterPercent}%` }}
                />
              </div>
            </div>

            <button
              onClick={onLogWater}
              className="w-full py-2 rounded-full bg-[#262a33] hover:bg-[#31353e] text-[#00e38f] text-xs font-bold font-display flex items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>+250ml Glass</span>
            </button>
          </div>

          {/* Card 2: Caloric & Macro Density */}
          <div className="w-72 shrink-0 rounded-2xl bg-[#1c2028] p-4 flex flex-col justify-between shadow-md border border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#262a33] flex items-center justify-center text-[#ffb86b]">
                  <span className="material-symbols-outlined text-[18px]">local_dining</span>
                </div>
                <span className="text-xs font-semibold text-[#dfe2ee] font-display">Nutrition Engine</span>
              </div>
              <span className="text-[11px] text-[#b9cbbd]">
                {user.caloriesCurrent} / {user.caloriesGoal} kcal
              </span>
            </div>

            <div className="flex flex-col gap-1.5 my-2">
              <div className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#b9cbbd]">Protein</span>
                  <span className="text-[#00f59b] font-semibold">
                    {user.macros.protein.current}g / {user.macros.protein.goal}g
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#31353e] overflow-hidden">
                  <div
                    className="h-full bg-[#00f59b] rounded-full"
                    style={{ width: `${(user.macros.protein.current / user.macros.protein.goal) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#b9cbbd]">Carbs</span>
                  <span className="text-[#ffb86b] font-semibold">
                    {user.macros.carbs.current}g / {user.macros.carbs.goal}g
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#31353e] overflow-hidden">
                  <div
                    className="h-full bg-[#ffb86b] rounded-full"
                    style={{ width: `${(user.macros.carbs.current / user.macros.carbs.goal) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#b9cbbd]">Healthy Fats</span>
                  <span className="text-[#d0bcff] font-semibold">
                    {user.macros.fat.current}g / {user.macros.fat.goal}g
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#31353e] overflow-hidden">
                  <div
                    className="h-full bg-[#d0bcff] rounded-full"
                    style={{ width: `${(user.macros.fat.current / user.macros.fat.goal) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[#b9cbbd] text-[11px] pt-1">
              <span>Remaining: {user.caloriesGoal - user.caloriesCurrent} kcal</span>
              <span className="text-[#00f59b] font-bold">On Target</span>
            </div>
          </div>

          {/* Card 3: Sleep Rest */}
          <div className="w-60 shrink-0 rounded-2xl bg-[#1c2028] p-4 flex flex-col justify-between shadow-md border border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#262a33] flex items-center justify-center text-[#d0bcff]">
                  <span className="material-symbols-outlined text-[18px]">bedtime</span>
                </div>
                <span className="text-xs font-semibold text-[#dfe2ee] font-display">Sleep Rest</span>
              </div>
              <span className="text-[11px] text-[#00f59b] font-semibold">84% deep</span>
            </div>
            <div className="my-2 flex flex-col">
              <span className="text-2xl font-bold text-[#dfe2ee] font-display">{user.sleepDuration}</span>
              <span className="text-xs text-[#b9cbbd]">REM: 1h 52m • Optimal recovery</span>
            </div>
            <div className="flex items-center gap-1 text-[#00e38f] text-[11px] font-semibold">
              <span className="material-symbols-outlined text-[15px]">check_circle</span>
              <span>Awoke during light phase</span>
            </div>
          </div>

          {/* Card 4: Daily Activity */}
          <div className="w-60 shrink-0 rounded-2xl bg-[#1c2028] p-4 flex flex-col justify-between shadow-md border border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#262a33] flex items-center justify-center text-[#ffb86b]">
                  <span className="material-symbols-outlined text-[18px]">directions_walk</span>
                </div>
                <span className="text-xs font-semibold text-[#dfe2ee] font-display">Activity</span>
              </div>
              <span className="text-[11px] text-[#ffb86b] font-bold">
                {Math.round((user.stepsCurrent / user.stepsGoal) * 100)}%
              </span>
            </div>
            <div className="my-2 flex flex-col gap-1">
              <span className="text-2xl font-bold text-[#dfe2ee] font-display">
                {user.stepsCurrent.toLocaleString()}
              </span>
              <div className="w-full h-2 rounded-full bg-[#31353e] overflow-hidden">
                <div
                  className="h-full bg-[#ffb86b] rounded-full"
                  style={{ width: `${(user.stepsCurrent / user.stepsGoal) * 100}%` }}
                />
              </div>
            </div>
            <span className="text-[11px] text-[#b9cbbd]">
              {(user.stepsGoal - user.stepsCurrent).toLocaleString()} steps to 8.5k goal
            </span>
          </div>

          {/* Card 5: Active Streak */}
          <div className="w-60 shrink-0 rounded-2xl bg-[#262a33] p-4 flex flex-col justify-between shadow-md border border-white/5 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-[#ffb86b]/15 blur-xl pointer-events-none" />
            <div className="flex items-center justify-between relative z-10">
              <span className="text-[10px] text-[#ffb86b] font-bold uppercase tracking-wider font-display">
                Active Streak
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#ed9000] text-[#583300] text-[10px] font-bold font-display">
                +50 XP
              </span>
            </div>
            <div className="my-2 flex items-center gap-3 relative z-10">
              <div className="w-11 h-11 rounded-full bg-[#ffb86b]/20 flex items-center justify-center text-[#ffb86b]">
                <span className="material-symbols-outlined text-[26px]">local_fire_department</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-[#dfe2ee] font-display">{user.streakDays} Days</span>
                <span className="text-[11px] text-[#ffb86b] font-semibold">Badge Unlocked!</span>
              </div>
            </div>
            <span className="text-[11px] text-[#b9cbbd] relative z-10">Next milestone at 10 days</span>
          </div>
        </div>
      </div>

      {/* Gamified Daily Quests Checklist */}
      <div className="flex flex-col gap-3 p-4 rounded-3xl bg-[#1c2028] shadow-md border border-white/5">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00f59b] text-[22px]">stars</span>
              <h3 className="text-base font-bold text-[#dfe2ee] font-display">Daily Quests</h3>
            </div>
            <span className="text-xs text-[#00f59b] font-bold bg-[#262a33] px-2.5 py-1 rounded-full font-display">
              {user.xp} / {user.xpTarget} XP
            </span>
          </div>

          {/* Level Progress Bar */}
          <div className="w-full h-2 rounded-full bg-[#31353e] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00f59b] to-[#53ffab] rounded-full transition-all duration-500 shadow-[0_0_8px_#00f59b]"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[#b9cbbd] text-xs">
            <span>Level {user.level}: Energy Pro</span>
            <span>{user.xpTarget - user.xp} XP to Level {user.level + 1}</span>
          </div>
        </div>

        {/* Task List */}
        <div className="flex flex-col gap-2 pt-1">
          {quests.map((quest) => (
            <div
              key={quest.id}
              onClick={() => onToggleQuest(quest.id, quest.xp)}
              className={`flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer border border-white/5 ${
                quest.completed
                  ? 'bg-[#181c24] opacity-80'
                  : 'bg-[#262a33] hover:bg-[#31353e]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                    quest.completed
                      ? 'bg-[#00f59b] text-[#003920] scale-105'
                      : 'bg-[#0a0e16] text-[#b9cbbd] hover:text-[#00f59b]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px] font-bold">
                    {quest.completed ? 'check' : 'circle'}
                  </span>
                </button>
                <div className="flex flex-col min-w-0">
                  <span
                    className={`text-xs font-semibold text-[#dfe2ee] font-display ${
                      quest.completed ? 'line-through opacity-70' : ''
                    }`}
                  >
                    {quest.title}
                  </span>
                  <span className="text-[11px] text-[#b9cbbd]">{quest.subtitle}</span>
                </div>
              </div>
              <span
                className={`text-xs font-bold shrink-0 font-display ${
                  quest.completed ? 'text-[#00e38f]' : 'text-[#00f59b]'
                }`}
              >
                +{quest.xp} XP
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Save My Food / Zero-Waste Kitchen Alert Card */}
      <div className="relative overflow-hidden rounded-3xl bg-[#1c2028] p-4 shadow-md flex flex-col gap-3 border border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#ed9000] text-[#583300] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-bold text-[#dfe2ee] font-display">Save My Food Alert</h4>
              <span className="text-xs text-[#ffb86b] font-semibold">🥬 2 ingredients need attention soon!</span>
            </div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffb86b] animate-pulse" />
        </div>

        {/* Urgent Ingredients Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCookWithAi('Bananas')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#262a33] text-[#dfe2ee] hover:bg-[#31353e] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#ffb86b]">alarm</span>
            <span className="text-xs font-semibold">Bananas</span>
            <span className="text-xs text-[#ffb86b] font-bold">(Use today!)</span>
          </button>
          <button
            onClick={() => onCookWithAi('Baby Spinach')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#262a33] text-[#dfe2ee] hover:bg-[#31353e] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#849588]">schedule</span>
            <span className="text-xs font-semibold">Baby Spinach</span>
            <span className="text-xs text-[#b9cbbd]">(In 2 days)</span>
          </button>
        </div>

        {/* Chef AI Recommendation Prompt */}
        <div className="p-3 rounded-2xl bg-[#181c24] flex items-center justify-between gap-3 border border-white/5">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[#00f59b] text-[20px] shrink-0">smart_toy</span>
            <p className="text-xs text-[#b9cbbd] truncate">
              AI Suggestion: <span className="text-[#dfe2ee] font-medium">Power Green Smoothie Bowl</span>
            </p>
          </div>
          <button
            onClick={() => onCookWithAi('Smoothie')}
            className="text-xs text-[#00f59b] hover:underline font-bold shrink-0 flex items-center gap-0.5 cursor-pointer font-display"
          >
            <span>Cook with AI</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Visual Lifestyle Fueling Showcase */}
      <div className="relative overflow-hidden rounded-3xl bg-[#1c2028] shadow-md border border-white/5">
        <div className="relative w-full h-44 bg-[#262a33]">
          <img
            className="w-full h-full object-cover"
            alt="Spinach Peanut Pre-Boost Meal"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKFguKFjREHCVlNL2ce9RoUtPs8kUS97VXNumhM69JjfpF3ZmJIJHdegVamPF6jgrRKUlqQMYseAPxwn0I8jgq8wY1f2zCa_zJNQqkE3zzDKP8zlkZU9cD0NESJzm7LX9jVNhOksLIDJBIZKmOysUN6zzcU8NM3Y8b5UAgXIIMyU2o6dHCrdgU8THUHm_eZZNdh-SWVo8Wck6yWq1-K4vE0DEykYhNdRhUez70BL2Dy2NyNsz3vjlQtA"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c2028] via-[#1c2028]/40 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#00f59b] uppercase font-bold tracking-wider font-display">
                Curated Power Snack
              </span>
              <span className="text-base font-bold text-[#dfe2ee] font-display">Spinach Peanut Pre-Boost</span>
            </div>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#0f131c]/80 backdrop-blur-md text-[#dfe2ee] font-semibold border border-white/10 font-display">
              240 kcal • 14g Pro
            </span>
          </div>
        </div>
      </div>

      {/* Quick link to Privacy Vault */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-[#181c24] border border-white/5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#00f59b] text-[18px]">verified_user</span>
          <span className="text-xs text-[#dfe2ee]">Zero-Knowledge Biometrics Vault</span>
        </div>
        <button
          onClick={onOpenPrivacyVault}
          className="text-xs text-[#00f59b] font-bold hover:underline cursor-pointer flex items-center gap-1 font-display"
        >
          <span>Manage Vault</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        </button>
      </div>

      {/* Medical Disclaimer */}
      <div className="flex items-center justify-center gap-1.5 py-2 px-3 text-center">
        <span className="material-symbols-outlined text-[16px] text-[#849588]">info</span>
        <p className="text-[11px] text-[#849588]">
          ⚡ Forecasts are AI estimates based on your patterns, not medical advice.
        </p>
      </div>
    </div>
  );
};
