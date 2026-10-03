import React, { useState } from 'react';
import { TelemetryEvent } from '../types';
import { INITIAL_TELEMETRY_EVENTS } from '../mockData';

interface TelemetryDashboardProps {
  onSwitchToMobile: () => void;
}

export const TelemetryDashboard: React.FC<TelemetryDashboardProps> = ({
  onSwitchToMobile,
}) => {
  const [activeDatePreset, setActiveDatePreset] = useState('30D');
  const [dateLabel, setDateLabel] = useState('Last 30 Days (Oct 24 - Nov 23)');
  const [isLiveSyncActive, setIsLiveSyncActive] = useState(true);
  const [events, setEvents] = useState<TelemetryEvent[]>(INITIAL_TELEMETRY_EVENTS);
  const [isStreamPaused, setIsStreamPaused] = useState(false);
  const [activeMetricFilter, setActiveMetricFilter] = useState('All Metrics');
  const [showSqlModal, setShowSqlModal] = useState(false);
  const [sqlQuery, setSqlQuery] = useState(
    'SELECT event_name, count() as total, avg(latency_ms) as latency\nFROM telemetry.production_events\nWHERE timestamp >= now() - INTERVAL 30 DAY\nGROUP BY event_name\nORDER BY total DESC;'
  );
  const [sqlResult, setSqlResult] = useState<string | null>(null);
  const [showDeckModal, setShowDeckModal] = useState(false);

  const handleDatePreset = (preset: string, label: string) => {
    setActiveDatePreset(preset);
    setDateLabel(label);
  };

  const handleExecuteSql = () => {
    setSqlResult('Query OK. 184,290 records scanned in 12ms. (ClickHouse Cluster US-East-1)');
  };

  const handleExportCsvDump = () => {
    const csv =
      'Metric,Value,Change,Period\n' +
      'DAU,184290,+14.2%,Last 30 Days\n' +
      'MAU,682400,+8.4%,Last 30 Days\n' +
      'App Installs,942180,+8.9% WoW,Total\n' +
      'Meals Rescued,312450,+22.1%,Ecosystem\n' +
      'Household Savings,₹1.84 Cr ($220k),,Cumulative\n' +
      'Inference Queries,1.24M,+28.4%,30D\n' +
      'Crash Free Sessions,99.96%,,Play Vitals\n';
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nutripulse_developer_telemetry_dump.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0f131c] text-[#dfe2ee] font-sans antialiased flex">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full w-64 xl:w-72 bg-[#0a0e16]/95 backdrop-blur-xl z-40 flex flex-col justify-between p-4 shadow-xl border-r border-white/5">
        <div className="flex flex-col gap-5">
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3 px-1 py-1">
            <img
              alt="NutriPulse Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1W8IYUWKDaC4HWXtpYbGlYFJrtFFc26A39Q0IA8DbJV16Nw9a0YeihZ7rMpIPbnvbBC_STtpZROj9So_m7wh1Rsr5YW_8QfKeDop9B7RtwxFD-O3H0xrub-BiKGvF3QSIO1M1eHpSY7QwjWStlIypvM-UUB1B_0igErJkDZ9Jygb29mvMb2NvvXD0TFbKHRWbEE63VeFewPqXt5g0jDvySA0D8IZMNJdqcG_bqr4xqN-6J4-e3eGr59S9c"
            />
            <div className="flex flex-col">
              <span className="text-base font-extrabold text-[#53ffab] tracking-tight font-display leading-none">
                NutriPulse
              </span>
              <span className="text-[10px] text-[#b9cbbd] uppercase tracking-wider font-semibold font-display mt-1">
                Dev Core Ops
              </span>
            </div>
          </div>

          {/* Cluster Selector */}
          <div className="bg-[#181c24] rounded-2xl p-3 flex items-center justify-between shadow-sm border border-white/5">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#00e38f] text-lg">terminal</span>
              <div className="flex flex-col">
                <span className="text-xs text-[#dfe2ee] font-bold font-display">Cluster-US-East</span>
                <span className="text-[10px] text-[#b9cbbd]">v1.0.4 • Prod Engine</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#b9cbbd] text-sm">unfold_more</span>
          </div>

          {/* Nav List */}
          <nav className="flex flex-col gap-1">
            <a
              href="#overview"
              className="flex items-center gap-3 px-3.5 py-2.5 bg-[#00f59b] text-[#006b41] font-bold font-display text-xs rounded-xl shadow-[0_0_20px_rgba(0,245,155,0.2)]"
            >
              <span className="material-symbols-outlined text-lg">dashboard</span>
              <span>Overview</span>
            </a>
            <a
              href="#users"
              className="flex items-center gap-3 px-3.5 py-2.5 text-[#b9cbbd] hover:bg-[#262a33] hover:text-[#dfe2ee] font-semibold font-display text-xs rounded-xl transition-all"
            >
              <span className="material-symbols-outlined text-lg">group</span>
              <span>Active Users &amp; DAU</span>
            </a>
            <a
              href="#features"
              className="flex items-center gap-3 px-3.5 py-2.5 text-[#b9cbbd] hover:bg-[#262a33] hover:text-[#dfe2ee] font-semibold font-display text-xs rounded-xl transition-all"
            >
              <span className="material-symbols-outlined text-lg">vital_signs</span>
              <span>Feature Telemetry</span>
            </a>
            <a
              href="#zerowaste"
              className="flex items-center gap-3 px-3.5 py-2.5 text-[#b9cbbd] hover:bg-[#262a33] hover:text-[#dfe2ee] font-semibold font-display text-xs rounded-xl transition-all"
            >
              <span className="material-symbols-outlined text-lg">eco</span>
              <span>Zero-Waste Impact</span>
            </a>
            <a
              href="#vitals"
              className="flex items-center gap-3 px-3.5 py-2.5 text-[#b9cbbd] hover:bg-[#262a33] hover:text-[#dfe2ee] font-semibold font-display text-xs rounded-xl transition-all"
            >
              <span className="material-symbols-outlined text-lg">monitoring</span>
              <span>System Vitals</span>
            </a>
            <a
              href="#governance"
              className="flex items-center gap-3 px-3.5 py-2.5 text-[#b9cbbd] hover:bg-[#262a33] hover:text-[#dfe2ee] font-semibold font-display text-xs rounded-xl transition-all"
            >
              <span className="material-symbols-outlined text-lg">verified_user</span>
              <span>Privacy &amp; Governance</span>
            </a>
            <a
              href="#logs"
              className="flex items-center gap-3 px-3.5 py-2.5 text-[#b9cbbd] hover:bg-[#262a33] hover:text-[#dfe2ee] font-semibold font-display text-xs rounded-xl transition-all"
            >
              <span className="material-symbols-outlined text-lg">bug_report</span>
              <span>API &amp; Crash Logs</span>
            </a>
          </nav>
        </div>

        {/* Bottom Latency Widget & Switch to Mobile button */}
        <div className="flex flex-col gap-3">
          <div className="bg-[#181c24] rounded-2xl p-3 border border-white/5">
            <div className="flex items-center justify-between mb-1.5 font-display">
              <span className="text-[10px] text-[#b9cbbd] uppercase tracking-wider font-semibold">Node Latency</span>
              <span className="text-xs text-[#00e38f] font-bold">18ms</span>
            </div>
            <div className="w-full bg-[#31353e] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#00f59b] h-full w-4/5 rounded-full" />
            </div>
          </div>

          <button
            onClick={onSwitchToMobile}
            className="w-full py-2.5 px-3 rounded-2xl bg-[#00f59b]/15 hover:bg-[#00f59b]/25 border border-[#00f59b]/30 text-[#00f59b] text-xs font-bold font-display flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">smartphone</span>
            <span>Switch to Mobile App</span>
          </button>

          <div className="flex items-center justify-between pt-1 text-[11px] text-[#b9cbbd] font-display">
            <span>Console Build 1.0.4</span>
            <span className="inline-flex h-2 w-2 rounded-full bg-[#00e38f] animate-pulse" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="pl-64 xl:pl-72 flex-1 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-[#0f131c]/85 backdrop-blur-xl border-b border-white/5 h-16 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#b9cbbd] text-lg">
                search
              </span>
              <input
                className="w-full bg-[#181c24] text-[#dfe2ee] text-xs pl-10 pr-4 py-2 rounded-full placeholder:text-[#b9cbbd]/60 focus:outline-none focus:ring-1 focus:ring-[#00f59b] border border-white/5"
                placeholder="Filter telemetry nodes, event payloads, or user IDs..."
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden xl:flex items-center gap-2 bg-[#0a0e16] px-3.5 py-1.5 rounded-full border border-white/5 font-display text-xs">
              <span className="inline-flex h-2 w-2 rounded-full bg-[#00e38f]" />
              <span className="text-[#b9cbbd]">
                Ingestion: <strong className="text-[#53ffab] font-semibold">99.98% Healthy</strong>
              </span>
              <span className="text-[#3b4a3f]">•</span>
              <span className="text-[#b9cbbd]">
                Build <strong className="text-[#dfe2ee]">v1.0.4</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full text-[#b9cbbd] hover:bg-[#1c2028] hover:text-white transition-colors relative cursor-pointer">
                <span className="material-symbols-outlined text-lg">notifications</span>
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-[#ffb86b] rounded-full" />
              </button>
              <button className="p-2 rounded-full text-[#b9cbbd] hover:bg-[#1c2028] hover:text-white transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-lg">tune</span>
              </button>
              <div className="flex items-center gap-2 pl-2 border-l border-white/5">
                <img
                  alt="Admin Lead"
                  className="w-8 h-8 rounded-full object-cover border border-[#00f59b]/30"
                  src="https://lh3.googleusercontent.com/aida/AEtjO1WaB_jZB5obXRZsoAwFVSF3gN8yhqvI_1CR17B0Rpo6kYHwI0sZO9AkGcOX0iiJOmqPrcHwgvzs3oRqRaPz541RkKBY7NxbRTVVaHd9tgv_UelbyeG_7XXtJqTP0lkktuNnFO2Ikqyxm0N4MELXepmLQnynJ2SFM5XUc9-6JwCkK-al9KSawHJ9lj3l5939XxoLUL10W50fqQIaVd2zlNZA-1ItDo2I8q_rBUtx2VTWQJZDfA0WXJJHyiNP"
                />
                <div className="hidden md:flex flex-col">
                  <span className="text-xs text-[#dfe2ee] font-bold font-display leading-tight">Admin Lead</span>
                  <span className="text-[10px] text-[#b9cbbd] leading-tight">Root SecOps</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 p-6 flex flex-col gap-6">
          {/* Operations Action Bar */}
          <section className="flex flex-col gap-4">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[#b9cbbd] text-xs font-display">
                  <span>Console</span>
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  <span>Production</span>
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  <span className="text-[#53ffab] font-semibold">Telemetry Overview</span>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl lg:text-3xl font-extrabold text-[#dfe2ee] font-display tracking-tight">
                    Developer &amp; Product Telemetry
                  </h1>
                  {/* Live Status indicator */}
                  <button
                    onClick={() => setIsLiveSyncActive(!isLiveSyncActive)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#262a33] hover:bg-[#31353e] transition-colors cursor-pointer"
                  >
                    <span className="relative flex h-2 w-2">
                      <span
                        className={`inline-flex h-2 w-2 rounded-full ${
                          isLiveSyncActive ? 'bg-[#00e38f] animate-ping' : 'bg-[#ffb86b]'
                        }`}
                      />
                    </span>
                    <span
                      className={`text-xs font-semibold font-display tracking-wide ${
                        isLiveSyncActive ? 'text-[#00e38f]' : 'text-[#ffb86b]'
                      }`}
                    >
                      {isLiveSyncActive ? 'LIVE SYNC ACTIVE (Ingesting 420 events/sec)' : 'PAUSED (Click to resume)'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Date presets */}
                <div className="flex items-center bg-[#181c24] p-1 rounded-full border border-white/5 font-display text-xs">
                  {[
                    { id: '24h', label: 'Last 24 Hours' },
                    { id: '7D', label: 'Last 7 Days' },
                    { id: '30D', label: 'Last 30 Days (Oct 24 - Nov 23)' },
                    { id: '90D', label: 'Last 90 Days' },
                    { id: 'YTD', label: 'Year to Date' },
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handleDatePreset(preset.id, preset.label)}
                      className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                        activeDatePreset === preset.id
                          ? 'bg-[#00f59b] text-[#006b41] font-bold shadow-sm'
                          : 'text-[#b9cbbd] hover:text-white'
                      }`}
                    >
                      {preset.id}
                    </button>
                  ))}
                </div>

                <div className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#1c2028] text-[#b9cbbd] text-xs font-display border border-white/5">
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                  <span className="text-[#dfe2ee] font-medium">{dateLabel}</span>
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setShowSqlModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] text-xs font-semibold font-display transition-all cursor-pointer border border-white/5"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#53ffab]">terminal</span>
                    <span>Query SQL</span>
                  </button>
                  <button
                    onClick={() => setShowDeckModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] text-xs font-semibold font-display transition-all cursor-pointer border border-white/5"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#ffb86b]">analytics</span>
                    <span className="hidden sm:inline">Investor Deck</span>
                  </button>
                  <button
                    onClick={handleExportCsvDump}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#00f59b] text-[#006b41] text-xs font-bold font-display shadow-md hover:bg-[#53ffab] transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Metric reference banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#181c24] border border-white/5 text-xs font-display">
              <div className="flex items-center gap-2 text-[#b9cbbd]">
                <span className="material-symbols-outlined text-[#53ffab] text-base">info</span>
                <span className="font-bold text-white">Metric Reference:</span>
                <span>DAU/MAU Stickiness (&gt;20% target) • Play Console Vitals crash limit (&lt;1.09%) • 30D Retention in top 5% health tech.</span>
              </div>
              <div className="flex items-center gap-1">
                {['All Metrics', 'User Growth', 'Stability (Vitals)', 'Event Telemetry'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveMetricFilter(filter)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                      activeMetricFilter === filter
                        ? 'bg-[#00f59b] text-[#006b41] font-bold shadow-sm'
                        : 'bg-[#1c2028] text-[#b9cbbd] hover:text-white'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Top 4 Bento KPI Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Card 1: DAU */}
            <div className="relative overflow-hidden rounded-3xl bg-[#181c24] p-5 shadow-md flex flex-col justify-between border border-white/5 hover:bg-[#1c2028] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#b9cbbd] uppercase tracking-wider font-bold font-display">
                  Daily Active Users (DAU)
                </span>
                <span className="flex items-center gap-0.5 text-[#53ffab] text-xs font-bold bg-[#1c2028] px-2 py-0.5 rounded-full font-display">
                  <span className="material-symbols-outlined text-xs">arrow_upward</span>+14.2%
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl lg:text-4xl font-extrabold text-[#dfe2ee] font-display">184,290</span>
                <span className="text-xs text-[#b9cbbd]">users / day</span>
              </div>
              <div className="text-[11px] text-[#b9cbbd] mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[#53ffab] text-xs">verified</span>
                <span>Active unique devices in past 24h • Target: &gt;150k</span>
              </div>
              <div className="h-10 w-full my-2">
                <svg className="w-full h-full text-[#00e38f]" fill="none" viewBox="0 0 160 30">
                  <path d="M0,24 Q20,22 40,16 T80,18 T120,8 T160,2" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
                  <path d="M0,24 Q20,22 40,16 T80,18 T120,8 T160,2 L160,30 L0,30 Z" fill="currentColor" fillOpacity="0.1" />
                </svg>
              </div>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-[#b9cbbd] font-display">
                <span>MAU: <strong className="text-white font-semibold">682,400</strong></span>
                <span className="text-[#53ffab] font-bold">27.0% DAU/MAU</span>
              </div>
            </div>

            {/* Card 2: App Installs */}
            <div className="relative overflow-hidden rounded-3xl bg-[#181c24] p-5 shadow-md flex flex-col justify-between border border-white/5 hover:bg-[#1c2028] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#b9cbbd] uppercase tracking-wider font-bold font-display">
                  Total App Installs
                </span>
                <span className="flex items-center gap-0.5 text-[#ffb86b] text-xs font-bold bg-[#1c2028] px-2 py-0.5 rounded-full font-display">
                  <span className="material-symbols-outlined text-xs">trending_up</span>+8.9% WoW
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl lg:text-4xl font-extrabold text-[#dfe2ee] font-display">942,180</span>
                <span className="text-xs text-[#b9cbbd]">downloads</span>
              </div>
              <div className="text-[11px] text-[#b9cbbd] mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[#ffb86b] text-xs">download</span>
                <span>First-time downloads from Google Play &amp; Beta</span>
              </div>
              <div className="h-10 w-full my-2">
                <svg className="w-full h-full text-[#ffb86b]" fill="none" viewBox="0 0 160 30">
                  <path d="M0,26 Q30,24 60,19 T110,12 T160,4" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
                  <path d="M0,26 Q30,24 60,19 T110,12 T160,4 L160,30 L0,30 Z" fill="currentColor" fillOpacity="0.1" />
                </svg>
              </div>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-[#b9cbbd] font-display">
                <span>Play Store: <strong className="text-white font-semibold">92.4%</strong></span>
                <span>Beta: <strong className="text-white font-semibold">7.6%</strong></span>
              </div>
            </div>

            {/* Card 3: Zero-Waste Impact */}
            <div className="relative overflow-hidden rounded-3xl bg-[#181c24] p-5 shadow-md flex flex-col justify-between border border-white/5 hover:bg-[#1c2028] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#b9cbbd] uppercase tracking-wider font-bold font-display">
                  Zero-Waste Impact
                </span>
                <span className="flex items-center gap-0.5 text-[#53ffab] text-xs font-bold bg-[#1c2028] px-2 py-0.5 rounded-full font-display">
                  <span className="material-symbols-outlined text-xs">eco</span>Ecosystem Total
                </span>
              </div>
              <div className="flex flex-col mt-2">
                <span className="text-3xl lg:text-4xl font-extrabold text-[#53ffab] font-display">312,450</span>
                <span className="text-xs text-[#b9cbbd] font-semibold mt-0.5">Meals Rescued from Landfill</span>
              </div>
              <div className="bg-[#262a33] rounded-xl p-2 px-3 flex items-center justify-between my-2 font-display">
                <span className="text-xs text-[#b9cbbd]">Est. Household Savings:</span>
                <span className="text-xs font-bold text-white">₹1.84 Cr <span className="text-[#b9cbbd] font-normal">($220k)</span></span>
              </div>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-[#b9cbbd] font-display">
                <span>Rescued rate</span>
                <span className="text-white font-semibold">3.4 items / user weekly</span>
              </div>
            </div>

            {/* Card 4: Pulse AI Load */}
            <div className="relative overflow-hidden rounded-3xl bg-[#181c24] p-5 shadow-md flex flex-col justify-between border border-white/5 hover:bg-[#1c2028] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#b9cbbd] uppercase tracking-wider font-bold font-display">
                  Pulse AI Inference Load
                </span>
                <span className="flex items-center gap-0.5 text-[#53ffab] text-xs font-bold bg-[#1c2028] px-2 py-0.5 rounded-full font-display">
                  <span className="material-symbols-outlined text-xs">bolt</span>+28.4%
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl lg:text-4xl font-extrabold text-[#dfe2ee] font-display">1.24M</span>
                <span className="text-xs text-[#b9cbbd]">queries / mo</span>
              </div>
              <div className="my-2 flex flex-col gap-1">
                <div className="flex justify-between text-xs font-display">
                  <span className="text-[#b9cbbd]">Inference Accuracy</span>
                  <span className="text-[#53ffab] font-bold">99.4%</span>
                </div>
                <div className="w-full bg-[#31353e] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#00f59b] h-full w-[99.4%] rounded-full shadow-[0_0_12px_rgba(0,245,155,0.4)]" />
                </div>
              </div>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-[#b9cbbd] font-display">
                <span>Median Latency: <strong className="text-white font-semibold">380ms</strong></span>
                <span>Context: 8k</span>
              </div>
            </div>
          </section>

          {/* Main Visualizations 60/40 Grid */}
          <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* Left Column: Growth & Diurnal Chart (7 Cols) */}
            <div className="xl:col-span-7 flex flex-col gap-6">
              <div className="rounded-3xl bg-[#181c24] p-5 shadow-md flex flex-col gap-4 border border-white/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#53ffab] text-lg">stacked_line_chart</span>
                      <h2 className="text-lg font-bold text-[#dfe2ee] font-display">User Growth &amp; Hourly Biorhythm</h2>
                    </div>
                    <p className="text-xs text-[#b9cbbd] mt-1">
                      Cross-telemetry showing DAU volume vs Diurnal circadian spikes across meal cycles.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-display">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#00f59b] shadow-[0_0_8px_rgba(0,245,155,0.5)]" />
                      <span className="text-white">Daily Active (DAU)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#ffb86b]" />
                      <span className="text-[#b9cbbd]">New Signups</span>
                    </div>
                  </div>
                </div>

                {/* SVG Graph Simulation */}
                <div className="w-full bg-[#1c2028] rounded-2xl p-4 relative overflow-hidden border border-white/5">
                  <div className="absolute top-3 left-1/3 px-2 py-0.5 rounded bg-[#31353e] text-[#53ffab] text-[11px] font-bold font-display flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-xs">sunny</span> Lunch Prep (12-2 PM Peak)
                  </div>
                  <div className="absolute top-3 right-1/4 px-2 py-0.5 rounded bg-[#31353e] text-[#ffb86b] text-[11px] font-bold font-display flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-xs">restaurant</span> Dinner Triage (6-8 PM Peak)
                  </div>

                  <div className="h-64 w-full">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 700 240">
                      <defs>
                        <linearGradient id="gradDau" x1="0%" x2="0%" y1="0%" y2="100%">
                          <stop offset="0%" stopColor="#00f59b" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#00f59b" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="gradSign" x1="0%" x2="0%" y1="0%" y2="100%">
                          <stop offset="0%" stopColor="#ffb86b" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#ffb86b" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <line stroke="#31353e" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="700" y1="40" y2="40" />
                      <line stroke="#31353e" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="700" y1="100" y2="100" />
                      <line stroke="#31353e" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="700" y1="160" y2="160" />
                      <line stroke="#31353e" strokeWidth="1" x1="0" x2="700" y1="210" y2="210" />

                      {/* Signups path */}
                      <path
                        d="M 0 190 Q 70 170, 140 180 T 280 150 T 420 140 T 560 110 T 700 80 L 700 220 L 0 220 Z"
                        fill="url(#gradSign)"
                      />
                      <path
                        d="M 0 190 Q 70 170, 140 180 T 280 150 T 420 140 T 560 110 T 700 80"
                        fill="none"
                        stroke="#ffb86b"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                      />

                      {/* DAU path */}
                      <path
                        d="M 0 160 Q 60 150, 120 130 T 220 50 T 320 120 T 440 35 T 560 70 T 700 20 L 700 220 L 0 220 Z"
                        fill="url(#gradDau)"
                      />
                      <path
                        d="M 0 160 Q 60 150, 120 130 T 220 50 T 320 120 T 440 35 T 560 70 T 700 20"
                        fill="none"
                        stroke="#00f59b"
                        strokeLinecap="round"
                        strokeWidth="3.5"
                      />
                      <circle cx="220" cy="50" fill="#00f59b" r="5" />
                      <circle cx="440" cy="35" fill="#00f59b" r="5" />
                      <circle cx="700" cy="20" fill="#00f59b" r="5" />
                    </svg>
                  </div>

                  <div className="flex justify-between items-center pt-2 text-xs text-[#b9cbbd] font-display">
                    <span>00:00 (Sleep)</span>
                    <span>06:00 (Morning Sync)</span>
                    <span className="text-[#53ffab] font-bold">12:30 (Lunch Peak)</span>
                    <span>16:00 (Snack)</span>
                    <span className="text-[#ffb86b] font-bold">19:30 (Dinner Triage)</span>
                    <span>23:00 (Night Log)</span>
                  </div>
                </div>

                {/* Cohort Retention Snapshot Table */}
                <div className="flex flex-col gap-2 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#dfe2ee] font-display">
                      Rolling 30-Day Cohort Retention Snapshot
                    </span>
                    <span className="text-xs text-[#00e38f] font-display">Benchmark: Day 1 &gt;60% • Day 30 &gt;25%</span>
                  </div>

                  <div className="w-full overflow-x-auto">
                    <table className="w-full text-left text-xs font-display">
                      <thead>
                        <tr className="bg-[#1c2028] text-[#b9cbbd] uppercase tracking-wider text-[11px]">
                          <th className="py-2.5 px-3 rounded-l-xl">Cohort Segment</th>
                          <th className="py-2.5 px-3">Registered</th>
                          <th className="py-2.5 px-3 text-center">Day 1</th>
                          <th className="py-2.5 px-3 text-center">Day 7</th>
                          <th className="py-2.5 px-3 text-center">Day 14</th>
                          <th className="py-2.5 px-3 text-center rounded-r-xl">Day 30</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        <tr className="hover:bg-[#1c2028]/50 transition-colors">
                          <td className="py-3 px-3 font-semibold text-white flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#53ffab]" /> Oct 25 - Oct 31
                          </td>
                          <td className="py-3 px-3 text-[#b9cbbd]">34,120</td>
                          <td className="py-3 px-3 text-center">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#00f59b] text-[#003920] font-bold">
                              68.4%
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#00f59b]/80 text-[#002111] font-bold">
                              44.2%
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#31353e] text-[#53ffab] font-semibold">
                              36.1%
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#262a33] text-white font-medium">
                              28.7%
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-[#1c2028]/50 transition-colors">
                          <td className="py-3 px-3 font-semibold text-white flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#00e38f]" /> Nov 01 - Nov 07
                          </td>
                          <td className="py-3 px-3 text-[#b9cbbd]">41,890</td>
                          <td className="py-3 px-3 text-center">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#00f59b] text-[#003920] font-bold">
                              70.1%
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#00f59b]/80 text-[#002111] font-bold">
                              46.5%
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#31353e] text-[#53ffab] font-semibold">
                              37.8%
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center text-[#b9cbbd]">In Progress</td>
                        </tr>
                        <tr className="hover:bg-[#1c2028]/50 transition-colors">
                          <td className="py-3 px-3 font-semibold text-white flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#ffb86b]" /> Nov 08 - Nov 14
                          </td>
                          <td className="py-3 px-3 text-[#b9cbbd]">39,400</td>
                          <td className="py-3 px-3 text-center">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#00f59b] text-[#003920] font-bold">
                              69.2%
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#00f59b]/80 text-[#002111] font-bold">
                              45.0%
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center text-[#b9cbbd]">In Progress</td>
                          <td className="py-3 px-3 text-center text-[#b9cbbd]">—</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Feature Telemetry (5 Cols) */}
            <div className="xl:col-span-5 flex flex-col gap-6">
              <div className="rounded-3xl bg-[#181c24] p-5 shadow-md flex flex-col gap-4 border border-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#53ffab] text-lg">vital_signs</span>
                    <h2 className="text-lg font-bold text-[#dfe2ee] font-display">Feature Adoption Telemetry</h2>
                  </div>
                  <span className="text-xs text-[#b9cbbd] bg-[#1c2028] px-2.5 py-0.5 rounded-full font-display">
                    30-Day Active
                  </span>
                </div>

                {/* Stack of Features */}
                <div className="flex flex-col gap-3 font-display">
                  {/* Item 1 */}
                  <div className="bg-[#1c2028] p-3 rounded-2xl flex flex-col gap-1.5 border border-white/5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white font-semibold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#53ffab] text-[16px]">schedule</span>
                        Circadian Energy Forecast
                      </span>
                      <span className="text-[#53ffab] font-bold">82% <span className="font-normal text-[#b9cbbd]">adoption</span></span>
                    </div>
                    <div className="w-full bg-[#31353e] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#00f59b] h-full w-[82%] rounded-full shadow-[0_0_8px_#00f59b]" />
                    </div>
                    <span className="text-[11px] text-[#b9cbbd]">Dominates 07:00-09:30 morning routine check-ins</span>
                  </div>

                  {/* Item 2 */}
                  <div className="bg-[#1c2028] p-3 rounded-2xl flex flex-col gap-1.5 border border-white/5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white font-semibold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#ffb86b] text-[16px]">kitchen</span>
                        Kitchen &amp; Zero-Waste Chef AI
                      </span>
                      <span className="text-[#ffb86b] font-bold">64% <span className="font-normal text-[#b9cbbd]">adoption</span></span>
                    </div>
                    <div className="w-full bg-[#31353e] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#ffb86b] h-full w-[64%] rounded-full" />
                    </div>
                    <span className="text-[11px] text-[#b9cbbd]">Primary utilization surge between 17:00 - 20:00</span>
                  </div>

                  {/* Item 3 */}
                  <div className="bg-[#1c2028] p-3 rounded-2xl flex flex-col gap-1.5 border border-white/5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white font-semibold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#00e38f] text-[16px]">forum</span>
                        Pulse AI Chatbot &amp; Assistant
                      </span>
                      <span className="text-white font-bold">51% <span className="font-normal text-[#b9cbbd]">adoption</span></span>
                    </div>
                    <div className="w-full bg-[#31353e] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#00e38f] h-full w-[51%] rounded-full" />
                    </div>
                    <span className="text-[11px] text-[#b9cbbd]">Average 4.2 prompts per conversational user</span>
                  </div>

                  {/* Item 4 */}
                  <div className="bg-[#1c2028] p-3 rounded-2xl flex flex-col gap-1.5 border border-white/5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white font-semibold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#d0bcff] text-[16px]">monitor_heart</span>
                        Biometric Sync (Health Connect)
                      </span>
                      <span className="text-[#d0bcff] font-bold">48% <span className="font-normal text-[#b9cbbd]">connected</span></span>
                    </div>
                    <div className="w-full bg-[#31353e] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#dfcfff] h-full w-[48%] rounded-full" />
                    </div>
                    <span className="text-[11px] text-[#b9cbbd]">Reads glucose continuous telemetry &amp; Garmin / Pixel steps</span>
                  </div>

                  {/* Item 5 */}
                  <div className="bg-[#1c2028] p-3 rounded-2xl flex flex-col gap-1.5 border border-white/5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white font-semibold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#53ffab] text-[16px]">security</span>
                        Zero-Knowledge Privacy Vault
                      </span>
                      <span className="text-[#53ffab] font-bold">98.2% <span className="font-normal text-[#b9cbbd]">opted-in</span></span>
                    </div>
                    <div className="w-full bg-[#31353e] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#00f59b] h-full w-[98.2%] rounded-full" />
                    </div>
                    <span className="text-[11px] text-[#b9cbbd]">Differential privacy salted hashes enabled globally</span>
                  </div>
                </div>

                {/* Kitchen Action Loop Funnel */}
                <div className="bg-[#1c2028]/50 p-3 rounded-2xl flex flex-col gap-2 border border-white/5">
                  <div className="flex items-center justify-between font-display">
                    <span className="text-xs text-white font-bold uppercase tracking-wider">Kitchen Action Loop Funnel</span>
                    <span className="text-xs text-[#00f59b] font-bold">74% Step-through Rate</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-center font-display mt-1">
                    <div className="bg-[#1c2028] p-2 rounded-xl border border-white/5">
                      <span className="text-[10px] text-[#b9cbbd] block">Step 1</span>
                      <span className="block text-white font-bold text-xs">100%</span>
                      <span className="text-[10px] text-[#b9cbbd]">View Recipe</span>
                    </div>
                    <div className="bg-[#1c2028] p-2 rounded-xl border border-white/5">
                      <span className="text-[10px] text-[#b9cbbd] block">Step 2</span>
                      <span className="block text-white font-bold text-xs">89%</span>
                      <span className="text-[10px] text-[#b9cbbd]">Pantry Match</span>
                    </div>
                    <div className="bg-[#1c2028] p-2 rounded-xl border border-white/5">
                      <span className="text-[10px] text-[#b9cbbd] block">Step 3</span>
                      <span className="block text-[#00f59b] font-bold text-xs">81%</span>
                      <span className="text-[10px] text-[#b9cbbd]">Start Cook</span>
                    </div>
                    <div className="bg-[#00f59b]/15 p-2 rounded-xl border border-[#00f59b]/20 text-[#00f59b]">
                      <span className="text-[10px] block opacity-80">Completed</span>
                      <span className="block font-bold text-xs">74%</span>
                      <span className="text-[10px]">Deducted</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Operational Grid (3 Pillars) */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Card A: Android Vitals */}
            <div className="rounded-3xl bg-[#181c24] p-5 shadow-md flex flex-col justify-between border border-white/5">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#53ffab] text-xl">phone_android</span>
                    <h3 className="text-base font-bold text-white font-display">Android Vitals Sync</h3>
                  </div>
                  <span className="text-[11px] text-[#00e38f] bg-[#1c2028] px-2.5 py-0.5 rounded-full font-bold font-display">
                    Play Console
                  </span>
                </div>
                <p className="text-xs text-[#b9cbbd]">
                  Automated hourly sync with Google Play Developer API vitals cluster.
                </p>

                {/* Vitals Grid */}
                <div className="grid grid-cols-2 gap-2.5 pt-1 font-display">
                  <div className="bg-[#1c2028] p-3 rounded-2xl border border-white/5 flex flex-col">
                    <span className="text-[11px] text-[#b9cbbd]">Crash Rate</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xl text-[#00f59b] font-extrabold">0.04%</span>
                      <span className="text-[10px] text-[#b9cbbd]">/ sess</span>
                    </div>
                    <span className="text-[10px] text-[#00e38f] mt-1">Threshold: &lt;1.09%</span>
                  </div>

                  <div className="bg-[#1c2028] p-3 rounded-2xl border border-white/5 flex flex-col">
                    <span className="text-[11px] text-[#b9cbbd]">ANR Rate</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xl text-[#00f59b] font-extrabold">0.02%</span>
                      <span className="text-[10px] text-[#b9cbbd]">/ daily</span>
                    </div>
                    <span className="text-[10px] text-[#00e38f] mt-1">Target: &lt;0.47%</span>
                  </div>

                  <div className="bg-[#1c2028] p-3 rounded-2xl border border-white/5 flex flex-col">
                    <span className="text-[11px] text-[#b9cbbd]">Cold App Launch</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xl text-white font-extrabold">740ms</span>
                    </div>
                    <span className="text-[10px] text-[#b9cbbd] mt-1">P90: 1.1s (Baseline OK)</span>
                  </div>

                  <div className="bg-[#1c2028] p-3 rounded-2xl border border-white/5 flex flex-col">
                    <span className="text-[11px] text-[#b9cbbd]">Battery Impact</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xl text-[#00f59b] font-extrabold">&lt;1.2%</span>
                      <span className="text-[10px] text-[#b9cbbd]">/ hr</span>
                    </div>
                    <span className="text-[10px] text-[#00f59b] mt-1">On-Device NPU active</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#b9cbbd] font-display mt-3">
                <span>Engine: Jetpack Compose v1.6</span>
                <span className="text-[#00f59b] font-bold">Zero Bad Behaviors</span>
              </div>
            </div>

            {/* Card B: Real-Time Ingestion Feed */}
            <div className="rounded-3xl bg-[#181c24] p-5 shadow-md flex flex-col justify-between border border-white/5">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#53ffab] text-xl">stream</span>
                    <h3 className="text-base font-bold text-white font-display">Real-Time Ingestion Feed</h3>
                  </div>
                  <span
                    className={`inline-flex h-2 w-2 rounded-full ${
                      isStreamPaused ? 'bg-[#ffb86b]' : 'bg-[#00f59b] animate-ping'
                    }`}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-[#b9cbbd]">
                  <span>Sampled Kafka stream</span>
                  <span className="font-mono text-[10px] text-[#00e38f] bg-[#1c2028] px-2 py-0.5 rounded-full">
                    [KAFKA: user_events]
                  </span>
                </div>

                {/* Event Feed List */}
                <div className="flex flex-col gap-2 pt-1 font-display">
                  {events.map((evt) => (
                    <div
                      key={evt.id}
                      className="bg-[#1c2028] p-2.5 px-3 rounded-2xl flex items-center justify-between hover:bg-[#262a33] transition-colors border border-white/5"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={`material-symbols-outlined text-base ${
                            evt.type === 'deduct'
                              ? 'text-[#00f59b]'
                              : evt.type === 'prevent'
                              ? 'text-[#ffb86b]'
                              : evt.type === 'ai'
                              ? 'text-[#d0bcff]'
                              : 'text-[#53ffab]'
                          }`}
                        >
                          {evt.type === 'deduct'
                            ? 'check_circle'
                            : evt.type === 'prevent'
                            ? 'bolt'
                            : evt.type === 'ai'
                            ? 'psychology'
                            : 'person_add'}
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className="font-mono text-[11px] text-[#00f59b] truncate">{evt.name}</span>
                          <span className="text-[11px] text-[#dfe2ee] truncate">{evt.details}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#b9cbbd] whitespace-nowrap pl-2">{evt.timeAgo}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#b9cbbd] font-display mt-3">
                <span>Channel: production.events</span>
                <button
                  onClick={() => setIsStreamPaused(!isStreamPaused)}
                  className="text-[#00f59b] font-bold hover:underline cursor-pointer"
                >
                  {isStreamPaused ? 'Resume Stream' : 'Pause Stream'}
                </button>
              </div>
            </div>

            {/* Card C: Privacy & Data Governance Compliance */}
            <div className="rounded-3xl bg-[#181c24] p-5 shadow-md flex flex-col justify-between border border-white/5">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#53ffab] text-xl">verified_user</span>
                    <h3 className="text-base font-bold text-white font-display">Privacy Governance</h3>
                  </div>
                  <span className="text-[11px] text-[#00f59b] bg-[#1c2028] px-2.5 py-0.5 rounded-full font-bold font-display">
                    Audit Passed
                  </span>
                </div>
                <p className="text-xs text-[#b9cbbd]">
                  Strict Zero-Sale &amp; Zero-Broker architecture backed by on-device enclave isolation.
                </p>

                {/* Compliance Items */}
                <div className="flex flex-col gap-2 pt-1 font-display">
                  <div className="bg-[#1c2028] p-2.5 px-3 rounded-2xl flex items-center justify-between border border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#00f59b] text-base">shield_person</span>
                      <span className="text-xs text-white">Data Broker Requests</span>
                    </div>
                    <span className="text-[11px] font-bold text-[#00f59b] bg-[#262a33] px-2.5 py-0.5 rounded-full">
                      0 Requests
                    </span>
                  </div>

                  <div className="bg-[#1c2028] p-2.5 px-3 rounded-2xl flex items-center justify-between border border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#00f59b] text-base">document_scanner</span>
                      <span className="text-xs text-white">On-Device OCR Parsing</span>
                    </div>
                    <span className="text-[11px] font-bold text-[#00f59b] bg-[#262a33] px-2.5 py-0.5 rounded-full">
                      100% Local
                    </span>
                  </div>

                  <div className="bg-[#1c2028] p-2.5 px-3 rounded-2xl flex items-center justify-between border border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#ffb86b] text-base">auto_delete</span>
                      <span className="text-xs text-white">Account Purge SLA</span>
                    </div>
                    <span className="text-[11px] font-bold text-[#ffb86b] bg-[#262a33] px-2.5 py-0.5 rounded-full">
                      38/38 (&lt;2h)
                    </span>
                  </div>

                  <div className="bg-[#1c2028] p-2.5 px-3 rounded-2xl flex items-center justify-between border border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#00f59b] text-base">vpn_key</span>
                      <span className="text-xs text-white">Differential Noise Factor</span>
                    </div>
                    <span className="text-[11px] font-bold text-white bg-[#262a33] px-2.5 py-0.5 rounded-full">
                      ε = 0.50
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#b9cbbd] font-display mt-3">
                <span>Cert: ISO/IEC 27701</span>
                <span className="text-[#00f59b] font-bold">100% Compliant</span>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* SQL Query Sandbox Modal */}
      {showSqlModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0e16]/85 backdrop-blur-sm px-4">
          <div className="bg-[#1c2028] w-full max-w-xl rounded-3xl p-6 flex flex-col gap-4 shadow-2xl border border-white/10 font-display">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00f59b] text-xl">terminal</span>
                <h4 className="text-base font-bold text-white">ClickHouse Telemetry Sandbox</h4>
              </div>
              <button onClick={() => setShowSqlModal(false)} className="text-[#b9cbbd] hover:text-white p-1">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <textarea
              rows={5}
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              className="w-full bg-[#0f131c] text-[#00f59b] font-mono text-xs p-3.5 rounded-2xl border border-white/10 focus:outline-none focus:border-[#00f59b]"
            />

            {sqlResult && (
              <div className="p-3 bg-[#181c24] text-xs font-mono text-[#00e38f] rounded-xl border border-[#00f59b]/20">
                {sqlResult}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={() => setShowSqlModal(false)}
                className="px-4 py-2 rounded-full bg-[#262a33] text-xs font-semibold hover:bg-[#31353e] cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={handleExecuteSql}
                className="px-5 py-2 rounded-full bg-[#00f59b] text-[#006b41] text-xs font-bold shadow-md hover:bg-[#53ffab] cursor-pointer"
              >
                Run Query
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Investor Deck Generator Modal */}
      {showDeckModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0e16]/85 backdrop-blur-sm px-4">
          <div className="bg-[#1c2028] w-full max-w-md rounded-3xl p-6 flex flex-col gap-4 shadow-2xl border border-white/10 font-display">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ffb86b] text-xl">analytics</span>
                <h4 className="text-base font-bold text-white">Investor Metrics Deck</h4>
              </div>
              <button onClick={() => setShowDeckModal(false)} className="text-[#b9cbbd] hover:text-white p-1">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="text-xs text-[#b9cbbd]">
              Ready to generate high-conviction metrics snapshot for Series A stakeholders:
            </p>

            <div className="bg-[#181c24] p-3 rounded-2xl text-xs space-y-1.5 border border-white/5">
              <div className="flex justify-between">
                <span className="text-[#b9cbbd]">DAU Stickiness:</span>
                <span className="font-bold text-[#00f59b]">27.0% (Top Decile)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#b9cbbd]">D30 Cohort Retention:</span>
                <span className="font-bold text-[#00f59b]">28.7% (Industry &gt;25% Benchmark)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#b9cbbd]">Household Food Waste Averted:</span>
                <span className="font-bold text-[#ffb86b]">₹1.84 Cr ($220,000 USD)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#b9cbbd]">Median Inference Latency:</span>
                <span className="font-bold text-[#53ffab]">380ms (On-Device + Cloud Edge)</span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowDeckModal(false);
                alert('Investor executive report generated and copied to clipboard.');
              }}
              className="w-full py-2.5 rounded-full bg-[#00f59b] text-[#006b41] text-xs font-bold shadow-md cursor-pointer"
            >
              Generate Executive Brief
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
