import React from 'react';

interface FlowShowcaseProps {
  onSelectScreen: (screen: 'launch' | 'home' | 'energy' | 'kitchen' | 'assistant') => void;
  onOpenDashboard: () => void;
}

export const FlowShowcase: React.FC<FlowShowcaseProps> = ({
  onSelectScreen,
  onOpenDashboard,
}) => {
  return (
    <div className="min-h-screen bg-[#0f131c] text-[#dfe2ee] font-sans antialiased flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#0f131c]/90 backdrop-blur-xl border-b border-white/5 h-16 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            alt="NutriPulse Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1W8IYUWKDaC4HWXtpYbGlYFJrtFFc26A39Q0IA8DbJV16Nw9a0YeihZ7rMpIPbnvbBC_STtpZROj9So_m7wh1Rsr5YW_8QfKeDop9B7RtwxFD-O3H0xrub-BiKGvF3QSIO1M1eHpSY7QwjWStlIypvM-UUB1B_0igErJkDZ9Jygb29mvMb2NvvXD0TFbKHRWbEE63VeFewPqXt5g0jDvySA0D8IZMNJdqcG_bqr4xqN-6J4-e3eGr59S9c"
          />
          <span className="text-lg font-extrabold text-[#00f59b] font-display tracking-tight">NutriPulse</span>
          <span className="hidden md:inline-block px-2.5 py-0.5 rounded-full bg-[#262a33] text-[10px] text-[#b9cbbd] font-display uppercase tracking-wider">
            Flow Showcase
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDashboard}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#262a33] hover:bg-[#31353e] text-xs font-semibold text-white font-display transition-all cursor-pointer border border-white/5"
          >
            <span className="material-symbols-outlined text-[16px] text-[#00f59b]">analytics</span>
            <span>View Web Console</span>
          </button>
        </div>
      </header>

      {/* Main Flow Canvas */}
      <main className="flex-1 flex flex-col w-full">
        {/* Intro banner */}
        <section className="w-full px-6 py-6 bg-[#181c24] border-b border-white/5">
          <div className="max-w-[1720px] mx-auto flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#00f59b] animate-pulse shadow-[0_0_10px_#00f59b]" />
                <span className="text-[10px] uppercase tracking-wider text-[#00f59b] font-bold font-display">
                  Interactive Flow Blueprint • v2.4 Spec
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-white font-display">
                NutriPulse Mobile App Experience
              </h1>
              <p className="text-xs text-[#b9cbbd] mt-0.5">
                Sync your daily energy levels and turn what&apos;s in your fridge into healthy, energizing meals.
              </p>
            </div>

            {/* Quick KPI Chips */}
            <div className="flex flex-wrap items-center gap-2 font-display text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#262a33] border border-white/5">
                <span className="material-symbols-outlined text-[#00f59b] text-[16px]">devices</span>
                <span className="text-white">5 Live Viewports</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#262a33] border border-white/5">
                <span className="material-symbols-outlined text-[#00f59b] text-[16px]">lock</span>
                <span className="text-white">100% Private to You</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#262a33] border border-white/5">
                <span className="material-symbols-outlined text-[#ffb86b] text-[16px]">bolt</span>
                <span className="text-white">Daily Energy Forecast</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#262a33] border border-white/5">
                <span className="material-symbols-outlined text-[#00f59b] text-[16px]">kitchen</span>
                <span className="text-white">Smart Recipe Helper</span>
              </div>
            </div>
          </div>
        </section>

        {/* Horizontal Scrollable 5-Device Ribbon */}
        <div className="w-full px-6 py-8 overflow-x-auto">
          <div className="min-w-[1580px] max-w-[1720px] mx-auto flex flex-col gap-6">
            {/* Sequence Progress Bar */}
            <div className="relative w-full mb-2">
              <div className="h-1 w-full bg-[#31353e] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#00f59b] via-[#ffb86b] to-[#00f59b] w-full rounded-full opacity-60" />
              </div>
              <div className="flex justify-between items-center -mt-3.5 px-6 font-display text-xs">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c2028] text-[#00f59b] shadow-[0_0_12px_rgba(0,245,155,0.3)] border border-[#00f59b]/30">
                  <span className="w-2 h-2 rounded-full bg-[#00f59b]" /> 01. Connect &amp; Start
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c2028] text-[#b9cbbd] border border-white/5">
                  <span className="w-2 h-2 rounded-full bg-[#31353e]" /> 02. Daily Energy Hub
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c2028] text-[#ffb86b] shadow-[0_0_12px_rgba(255,184,107,0.2)] border border-[#ffb86b]/30">
                  <span className="w-2 h-2 rounded-full bg-[#ffb86b]" /> 03. Energy Dip Warning
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c2028] text-[#b9cbbd] border border-white/5">
                  <span className="w-2 h-2 rounded-full bg-[#31353e]" /> 04. Smart Kitchen
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c2028] text-[#00f59b] shadow-[0_0_12px_rgba(0,245,155,0.3)] border border-[#00f59b]/30">
                  <span className="w-2 h-2 rounded-full bg-[#00f59b]" /> 05. Helpful Assistant
                </div>
              </div>
            </div>

            {/* 5 Device Columns Grid */}
            <div className="grid grid-cols-5 gap-6 items-start">
              {/* Device 1: Launch */}
              <div className="flex flex-col gap-4">
                <div className="p-4 bg-[#181c24] rounded-2xl flex flex-col gap-1 shadow-md border border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#00f59b] font-display">01</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#00f59b]/10 text-[#00f59b] text-[10px] font-bold uppercase font-display">
                      Phase 1
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white font-display">Get Started &amp; Connect</h3>
                  <p className="text-[11px] text-[#b9cbbd]">Connect your fitness watch and get ready.</p>
                  <button
                    onClick={() => onSelectScreen('launch')}
                    className="mt-2 py-1.5 px-3 rounded-full bg-[#262a33] hover:bg-[#31353e] text-[#00f59b] text-xs font-bold font-display transition-colors cursor-pointer"
                  >
                    Open Live Screen ↗
                  </button>
                </div>

                {/* Mockup shell */}
                <div className="w-full max-w-[310px] mx-auto bg-[#0a0e16] p-2 rounded-[38px] shadow-2xl border border-white/10">
                  <div className="w-full bg-[#070A0F] rounded-[30px] overflow-hidden flex flex-col h-[560px] relative p-4 text-center justify-between">
                    <div className="flex justify-between items-center text-[10px] text-[#b9cbbd] px-1 font-display">
                      <span>09:41</span>
                      <div className="w-3 h-3 rounded-full bg-black mx-auto" />
                      <span>5G 100%</span>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-20 h-20 rounded-full border border-[#00f59b]/40 p-1 shadow-[0_0_24px_rgba(0,245,155,0.3)]">
                        <img
                          alt="Logo"
                          className="w-full h-full object-cover rounded-full"
                          src="https://lh3.googleusercontent.com/aida/AEtjO1W8IYUWKDaC4HWXtpYbGlYFJrtFFc26A39Q0IA8DbJV16Nw9a0YeihZ7rMpIPbnvbBC_STtpZROj9So_m7wh1Rsr5YW_8QfKeDop9B7RtwxFD-O3H0xrub-BiKGvF3QSIO1M1eHpSY7QwjWStlIypvM-UUB1B_0igErJkDZ9Jygb29mvMb2NvvXD0TFbKHRWbEE63VeFewPqXt5g0jDvySA0D8IZMNJdqcG_bqr4xqN-6J4-e3eGr59S9c"
                        />
                      </div>
                      <h4 className="text-xl font-extrabold text-white font-display">
                        Nutri<span className="text-[#00f59b]">Pulse</span>
                      </h4>
                      <p className="text-xs text-[#b9cbbd] max-w-[200px] leading-tight">
                        Predict your energy. Eat smarter. Waste less.
                      </p>
                      <div className="bg-[#181c24] px-3 py-1.5 rounded-full text-[10px] text-[#00f59b] font-bold font-display border border-[#00f59b]/30">
                        84% Stamina Ready
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectScreen('launch')}
                      className="w-full py-2.5 rounded-full bg-[#00f59b] text-[#003920] font-bold font-display text-xs shadow-md"
                    >
                      Launch Experience
                    </button>
                  </div>
                </div>
              </div>

              {/* Device 2: Home */}
              <div className="flex flex-col gap-4">
                <div className="p-4 bg-[#181c24] rounded-2xl flex flex-col gap-1 shadow-md border border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#00f59b] font-display">02</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#00f59b]/10 text-[#00f59b] text-[10px] font-bold uppercase font-display">
                      Phase 2
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white font-display">Daily Energy Hub</h3>
                  <p className="text-[11px] text-[#b9cbbd]">Daily Energy &amp; Meal Planner</p>
                  <button
                    onClick={() => onSelectScreen('home')}
                    className="mt-2 py-1.5 px-3 rounded-full bg-[#262a33] hover:bg-[#31353e] text-[#00f59b] text-xs font-bold font-display transition-colors cursor-pointer"
                  >
                    Open Live Screen ↗
                  </button>
                </div>

                <div className="w-full max-w-[310px] mx-auto bg-[#0a0e16] p-2 rounded-[38px] shadow-2xl border border-white/10">
                  <div className="w-full bg-[#0f131c] rounded-[30px] overflow-hidden flex flex-col h-[560px] relative p-3 text-left justify-between">
                    <div className="flex justify-between items-center text-[10px] text-[#b9cbbd] px-1 font-display">
                      <span>09:42</span>
                      <div className="w-3 h-3 rounded-full bg-black mx-auto" />
                      <span className="text-[#00f59b]">94% Synced</span>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <div className="bg-[#1c2028] p-3 rounded-2xl border border-white/5">
                        <span className="text-[10px] text-[#00f59b] uppercase font-bold font-display">Bio-Telemetry</span>
                        <div className="text-2xl font-extrabold text-white font-display">84% Strong Start</div>
                        <p className="text-[10px] text-[#b9cbbd]">Peak cellular efficiency detected</p>
                      </div>

                      <div className="bg-[#262a33] p-2.5 rounded-xl border border-white/5">
                        <span className="text-[10px] text-[#ffb86b] font-bold block font-display">
                          Predicted Energy Dip at 1:45 PM
                        </span>
                        <p className="text-[10px] text-[#dfe2ee]">Fuel with Banana + peanut butter + water</p>
                      </div>

                      <div className="bg-[#1c2028] p-2.5 rounded-xl flex justify-between items-center text-xs font-display">
                        <span>Hydration Goal</span>
                        <span className="text-[#00f59b] font-bold">1,400 / 2,200 ml</span>
                      </div>
                    </div>

                    <div className="h-10 bg-[#181c24] rounded-full flex items-center justify-around px-2 text-xs">
                      <span className="text-[#00f59b] font-bold">Home</span>
                      <span className="text-[#b9cbbd]">Forecast</span>
                      <span className="text-[#b9cbbd]">Kitchen</span>
                      <span className="text-[#b9cbbd]">Coach</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Device 3: Energy */}
              <div className="flex flex-col gap-4">
                <div className="p-4 bg-[#181c24] rounded-2xl flex flex-col gap-1 shadow-md border border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#ffb86b] font-display">03</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#ffb86b]/10 text-[#ffb86b] text-[10px] font-bold uppercase font-display">
                      Phase 3
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white font-display">Energy Dip Warning</h3>
                  <p className="text-[11px] text-[#b9cbbd]">Know when you&apos;ll feel tired &amp; prevent it</p>
                  <button
                    onClick={() => onSelectScreen('energy')}
                    className="mt-2 py-1.5 px-3 rounded-full bg-[#262a33] hover:bg-[#31353e] text-[#ffb86b] text-xs font-bold font-display transition-colors cursor-pointer"
                  >
                    Open Live Screen ↗
                  </button>
                </div>

                <div className="w-full max-w-[310px] mx-auto bg-[#0a0e16] p-2 rounded-[38px] shadow-2xl border border-white/10">
                  <div className="w-full bg-[#0f131c] rounded-[30px] overflow-hidden flex flex-col h-[560px] relative p-3 text-left justify-between">
                    <div className="flex justify-between items-center text-[10px] text-[#b9cbbd] px-1 font-display">
                      <span>09:43</span>
                      <div className="w-3 h-3 rounded-full bg-black mx-auto" />
                      <span className="text-[#ffb86b]">Dip at 14:15</span>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <div className="bg-[#1c2028] p-3 rounded-2xl border border-white/5">
                        <span className="text-[10px] text-[#b9cbbd] font-bold font-display">24-Hour Diurnal Model</span>
                        <div className="h-20 w-full my-1">
                          <svg className="w-full h-full" viewBox="0 0 240 60">
                            <path d="M0,45 Q30,42 60,30 T120,12 T180,50 T240,40" fill="none" stroke="#00f59b" strokeWidth="2.5" />
                            <circle cx="180" cy="50" fill="#ffb86b" r="4" />
                          </svg>
                        </div>
                        <div className="flex justify-between text-[9px] text-[#b9cbbd] font-display">
                          <span>8:00 AM</span>
                          <span className="text-[#00f59b]">Peak</span>
                          <span className="text-[#ffb86b]">2:15 PM Slump</span>
                        </div>
                      </div>

                      <div className="bg-[#262a33] p-2.5 rounded-xl border border-white/5">
                        <span className="text-[10px] text-[#ffb86b] font-bold font-display block">Almond Matcha Bites</span>
                        <p className="text-[10px] text-[#b9cbbd]">180 cal • 9g Protein • Steady Energy</p>
                      </div>
                    </div>

                    <div className="h-10 bg-[#181c24] rounded-full flex items-center justify-around px-2 text-xs">
                      <span className="text-[#b9cbbd]">Home</span>
                      <span className="text-[#ffb86b] font-bold">Forecast</span>
                      <span className="text-[#b9cbbd]">Kitchen</span>
                      <span className="text-[#b9cbbd]">Coach</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Device 4: Kitchen */}
              <div className="flex flex-col gap-4">
                <div className="p-4 bg-[#181c24] rounded-2xl flex flex-col gap-1 shadow-md border border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#00f59b] font-display">04</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#00f59b]/10 text-[#00f59b] text-[10px] font-bold uppercase font-display">
                      Phase 4
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white font-display">Smart Kitchen &amp; Recipes</h3>
                  <p className="text-[11px] text-[#b9cbbd]">Save food, cook easily, update fridge</p>
                  <button
                    onClick={() => onSelectScreen('kitchen')}
                    className="mt-2 py-1.5 px-3 rounded-full bg-[#262a33] hover:bg-[#31353e] text-[#00f59b] text-xs font-bold font-display transition-colors cursor-pointer"
                  >
                    Open Live Screen ↗
                  </button>
                </div>

                <div className="w-full max-w-[310px] mx-auto bg-[#0a0e16] p-2 rounded-[38px] shadow-2xl border border-white/10">
                  <div className="w-full bg-[#0f131c] rounded-[30px] overflow-hidden flex flex-col h-[560px] relative p-3 text-left justify-between">
                    <div className="flex justify-between items-center text-[10px] text-[#b9cbbd] px-1 font-display">
                      <span>09:44</span>
                      <div className="w-3 h-3 rounded-full bg-black mx-auto" />
                      <span>28 in Fridge</span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="bg-[#262a33] p-2.5 rounded-xl border border-white/5">
                        <span className="text-[10px] text-[#ffb86b] font-bold font-display block">
                          2 items expiring soon: Spinach &amp; Yogurt
                        </span>
                      </div>

                      <div className="bg-[#1c2028] p-3 rounded-2xl border border-white/5">
                        <span className="text-[10px] text-[#00f59b] font-bold font-display">100% In Stock</span>
                        <h5 className="text-xs font-bold text-white font-display">Spinach &amp; Paneer Power Bowl</h5>
                        <p className="text-[10px] text-[#b9cbbd]">410 kcal • 28g Protein • Saves ₹90</p>
                        <button className="w-full mt-2 py-1.5 rounded-full bg-[#00f59b] text-[#003920] font-bold text-[10px]">
                          Cook &amp; Auto-Deduct
                        </button>
                      </div>
                    </div>

                    <div className="h-10 bg-[#181c24] rounded-full flex items-center justify-around px-2 text-xs">
                      <span className="text-[#b9cbbd]">Home</span>
                      <span className="text-[#b9cbbd]">Forecast</span>
                      <span className="text-[#00f59b] font-bold">Kitchen</span>
                      <span className="text-[#b9cbbd]">Coach</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Device 5: Assistant */}
              <div className="flex flex-col gap-4">
                <div className="p-4 bg-[#181c24] rounded-2xl flex flex-col gap-1 shadow-md border border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#00f59b] font-display">05</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#00f59b]/10 text-[#00f59b] text-[10px] font-bold uppercase font-display">
                      Phase 5
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white font-display">Helpful Food Coach</h3>
                  <p className="text-[11px] text-[#b9cbbd]">Friendly tips tailored to how you feel</p>
                  <button
                    onClick={() => onSelectScreen('assistant')}
                    className="mt-2 py-1.5 px-3 rounded-full bg-[#262a33] hover:bg-[#31353e] text-[#00f59b] text-xs font-bold font-display transition-colors cursor-pointer"
                  >
                    Open Live Screen ↗
                  </button>
                </div>

                <div className="w-full max-w-[310px] mx-auto bg-[#0a0e16] p-2 rounded-[38px] shadow-2xl border border-white/10">
                  <div className="w-full bg-[#0f131c] rounded-[30px] overflow-hidden flex flex-col h-[560px] relative p-3 text-left justify-between">
                    <div className="flex justify-between items-center text-[10px] text-[#b9cbbd] px-1 font-display">
                      <span>09:45</span>
                      <div className="w-3 h-3 rounded-full bg-black mx-auto" />
                      <span className="text-[#00f59b]">Coach Online</span>
                    </div>

                    <div className="flex flex-col gap-2 text-xs">
                      <div className="bg-[#1c2028] p-2.5 rounded-xl text-[11px] text-[#dfe2ee] border border-white/5">
                        Why do I feel tired around 2 PM?
                      </div>
                      <div className="bg-[#262a33] p-2.5 rounded-xl text-[10px] text-[#b9cbbd] border border-white/5">
                        High-glycemic lunch caused an insulin spike. Add more fiber to smooth out your afternoon energy curve!
                      </div>
                    </div>

                    <div className="h-10 bg-[#181c24] rounded-full flex items-center justify-around px-2 text-xs">
                      <span className="text-[#b9cbbd]">Home</span>
                      <span className="text-[#b9cbbd]">Forecast</span>
                      <span className="text-[#b9cbbd]">Kitchen</span>
                      <span className="text-[#00f59b] font-bold">Coach</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Specifications Grid */}
        <section className="w-full px-6 py-12 bg-[#0a0e16] border-t border-white/5">
          <div className="max-w-[1720px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] text-[#00f59b] uppercase tracking-wider font-bold font-display">
                  How NutriPulse Helps You
                </span>
                <h2 className="text-2xl font-extrabold text-white font-display">
                  Designed for Real Life, Built for Real Energy
                </h2>
              </div>
              <div className="hidden md:flex items-center gap-2 font-display text-xs">
                <span className="px-3 py-1 rounded-full bg-[#181c24] text-white border border-white/5">
                  Easy to Use
                </span>
                <span className="px-3 py-1 rounded-full bg-[#181c24] text-white border border-white/5">
                  100% Private
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-[#181c24] border border-white/5 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#00f59b]/15 flex items-center justify-center text-[#00f59b]">
                  <span className="material-symbols-outlined text-[24px]">vital_signs</span>
                </div>
                <h3 className="text-base font-bold text-white font-display">Energy Dip Prediction</h3>
                <p className="text-xs text-[#b9cbbd] leading-relaxed">
                  Instead of just counting calories, NutriPulse learns your natural daily rhythm and suggests the right food at the right time so you never feel sluggish.
                </p>
                <div className="pt-2 flex items-center gap-1 text-[#00f59b] text-xs font-bold font-display">
                  <span>Steady Energy All Day</span>
                  <span className="material-symbols-outlined text-[16px]">north_east</span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#181c24] border border-white/5 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#ffb86b]/20 flex items-center justify-center text-[#ffb86b]">
                  <span className="material-symbols-outlined text-[24px]">kitchen</span>
                </div>
                <h3 className="text-base font-bold text-white font-display">Smart Recipe Maker</h3>
                <p className="text-xs text-[#b9cbbd] leading-relaxed">
                  Tell NutriPulse what&apos;s in your fridge. It gives you tasty recipes using ingredients that expire soon so nothing goes to waste and you save money.
                </p>
                <div className="pt-2 flex items-center gap-1 text-[#ffb86b] text-xs font-bold font-display">
                  <span>Save Food &amp; Money</span>
                  <span className="material-symbols-outlined text-[16px]">north_east</span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#181c24] border border-white/5 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#00f59b]/15 flex items-center justify-center text-[#00f59b]">
                  <span className="material-symbols-outlined text-[24px]">security</span>
                </div>
                <h3 className="text-base font-bold text-white font-display">Strict Privacy Guarantee</h3>
                <p className="text-xs text-[#b9cbbd] leading-relaxed">
                  Your photos, health records, and meal history stay on your device. We believe your personal health should always belong to you.
                </p>
                <div className="pt-2 flex items-center gap-1 text-[#00f59b] text-xs font-bold font-display">
                  <span>Never Sold or Shared</span>
                  <span className="material-symbols-outlined text-[16px]">north_east</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
