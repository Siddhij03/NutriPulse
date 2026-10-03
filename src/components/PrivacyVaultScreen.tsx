import React, { useState } from 'react';
import { PrivacySetting } from '../types';
import { PRIVACY_SETTINGS } from '../mockData';

interface PrivacyVaultScreenProps {
  onBackToHome: () => void;
}

export const PrivacyVaultScreen: React.FC<PrivacyVaultScreenProps> = ({
  onBackToHome,
}) => {
  const [settings, setSettings] = useState<PrivacySetting[]>(PRIVACY_SETTINGS);
  const [dialogChoice, setDialogChoice] = useState<'pending' | 'allowed' | 'denied'>('pending');
  const [purgeLogsCleared, setPurgeLogsCleared] = useState(false);
  const [showPurgeModal, setShowPurgeModal] = useState(false);

  const toggleSetting = (id: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleExportJson = () => {
    const data = {
      archive_version: '2.4.0',
      exported_at: new Date().toISOString(),
      user: {
        id: 'maya_9021',
        biometrics: {
          circadian_dip_scheduled: '14:15',
          stamina_baseline: '84%',
          hydration_goal_ml: 2200,
        },
        pantry_inventory_count: 14,
        zero_waste_metrics: {
          items_rescued_count: 6,
          rupees_saved: 380,
          carbon_averted_kg: 1.8,
        },
      },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nutripulse_health_kitchen_archive.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCsv = () => {
    const csvContent =
      'Date,Time,Event,Category,Status,Metric\n' +
      '2026-10-24,08:00,Breakfast Log,Nutrition,Success,420 kcal\n' +
      '2026-10-24,11:00,Hydration Green Tea,Hydration,Logged,500 ml\n' +
      '2026-10-24,13:00,Lunch Turkey Sweet Potato,Nutrition,Logged,580 kcal\n' +
      '2026-10-24,14:15,Circadian Slump Countermeasure,Bio-Telemetry,Protected,+20% Lift\n' +
      '2026-10-24,17:45,Pantry Auto-Deduct Bananas,Zero-Waste,Averted Spoilage,2 pcs\n';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nutripulse_telemetry_logs.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col w-full pb-8 gap-space-lg text-[#dfe2ee]">
      {/* Breadcrumb & Navigation */}
      <div className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs text-[#b9cbbd] hover:text-[#00f59b] transition-colors py-1 cursor-pointer font-display"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Home</span>
          </button>
          <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#00f59b]/10 border border-[#00f59b]/25">
            <span className="material-symbols-outlined text-[#00f59b] text-[14px]">lock</span>
            <span className="text-[10px] font-bold text-[#00f59b] uppercase tracking-wide font-display">
              Zero-Knowledge Vault
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-[#dfe2ee] font-display tracking-tight">
            Privacy &amp; Data Governance
          </h1>
          <p className="text-xs text-[#b9cbbd] mt-1 leading-relaxed">
            You own your biometric identity. NutriPulse enforces strict on-device data processing, zero third-party broker sales, and instantaneous record deletion.
          </p>
        </div>
      </div>

      {/* Data Sovereignty Pledge Card */}
      <div className="relative overflow-hidden rounded-3xl bg-[#1c2028] border border-white/10 p-4 shadow-lg">
        <div className="absolute -right-8 -top-8 w-28 h-28 bg-[#00f59b]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#00f59b]/15 border border-[#00f59b]/30 flex items-center justify-center flex-shrink-0 text-[#00f59b]">
            <span className="material-symbols-outlined text-[22px]">verified_user</span>
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#dfe2ee] font-display">Data Sovereignty Pledge</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00f59b]/20 text-[#00f59b] font-bold font-display">
                100% PRIVATE
              </span>
            </div>
            <p className="text-xs text-[#b9cbbd] mt-1 leading-relaxed">
              Your daily energy curves, food logs, and fridge inventory are isolated in your encrypted storage vault. Never shared with insurance firms or commercial advertisers.
            </p>
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/5 flex-wrap">
              <div className="flex items-center gap-1 text-[11px] text-[#b9cbbd]">
                <span className="material-symbols-outlined text-[#00f59b] text-[15px]">check_circle</span>
                <span>AES-256 Cloud</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-[#b9cbbd]">
                <span className="material-symbols-outlined text-[#00f59b] text-[15px]">check_circle</span>
                <span>On-Device AI</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-[#b9cbbd]">
                <span className="material-symbols-outlined text-[#00f59b] text-[15px]">check_circle</span>
                <span>GDPR / HIPAA Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Android System Dialog Simulation */}
      <div className="relative bg-[#1c2028] rounded-3xl p-4 overflow-hidden shadow-xl border border-white/5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#262a33] flex items-center justify-center text-[#00e38f]">
            <span className="material-symbols-outlined text-[20px]">notifications_active</span>
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-xs font-bold text-[#dfe2ee] block font-display">
              Android System Prompt Preview
            </span>
            <span className="text-[11px] text-[#b9cbbd]">Estimated volume: ~2 alerts / day</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#262a33] text-[#00e38f] text-[10px] font-bold font-display">
            Preview
          </span>
        </div>

        <div className="bg-[#181c24] rounded-2xl p-3.5 flex flex-col gap-2.5 border border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#00f59b] flex items-center justify-center text-[#003920] text-[10px]">
              ⚡
            </div>
            <span className="text-[11px] text-[#dfe2ee] uppercase tracking-wider font-semibold font-display">
              NutriPulse Engine
            </span>
          </div>
          <p className="text-xs text-[#dfe2ee] font-medium leading-relaxed">
            Allow NutriPulse to send you predictive stamina alerts and zero-waste reminders?
          </p>
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={() => setDialogChoice('denied')}
              className={`px-3 py-1.5 rounded-full text-xs font-display font-semibold transition-colors cursor-pointer ${
                dialogChoice === 'denied'
                  ? 'bg-[#31353e] text-white'
                  : 'bg-[#262a33] text-[#b9cbbd] hover:text-white'
              }`}
            >
              Don&apos;t allow
            </button>
            <button
              onClick={() => setDialogChoice('allowed')}
              className={`px-4 py-1.5 rounded-full text-xs font-display font-bold shadow-md transition-transform active:scale-95 cursor-pointer ${
                dialogChoice === 'allowed'
                  ? 'bg-[#00e38f] text-[#002111]'
                  : 'bg-[#00f59b] text-[#002111] hover:bg-[#00e38f]'
              }`}
            >
              {dialogChoice === 'allowed' ? 'Allowed ✓' : 'Allow'}
            </button>
          </div>
        </div>
      </div>

      {/* Granular Permissions Toggles */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold text-[#b9cbbd] tracking-wide uppercase font-display">
            Data Permissions &amp; Telemetry
          </h2>
          <button
            onClick={() => setSettings(PRIVACY_SETTINGS)}
            className="text-[11px] text-[#00f59b] cursor-pointer font-medium hover:underline font-display"
          >
            Reset Defaults
          </button>
        </div>

        <div className="flex flex-col rounded-3xl bg-[#1c2028] border border-white/5 divide-y divide-white/5 overflow-hidden shadow-sm">
          {settings.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleSetting(item.id)}
              className="p-3.5 flex items-center justify-between gap-3 hover:bg-[#262a33]/40 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-[#262a33] flex items-center justify-center flex-shrink-0 text-[#00f59b] mt-0.5">
                  <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#dfe2ee] font-display">{item.title}</span>
                  <p className="text-[11px] text-[#b9cbbd] leading-snug mt-0.5">{item.description}</p>
                </div>
              </div>

              {/* Functional Switch Toggle */}
              <div
                className={`w-11 h-6 rounded-full relative cursor-pointer flex-shrink-0 flex items-center p-0.5 transition-colors ${
                  item.enabled ? 'bg-[#00f59b] shadow-[0_0_8px_rgba(0,245,155,0.4)]' : 'bg-[#31353e]'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-[#0f131c] rounded-full shadow-md transform transition-transform ${
                    item.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lock Screen Previews */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold text-[#dfe2ee] font-display">Lock Screen Previews</h2>
          <span className="text-[11px] text-[#b9cbbd]">Real-world feel</span>
        </div>

        <div className="bg-[#181c24] rounded-2xl p-3.5 shadow-md flex flex-col gap-1.5 border border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-[#00f59b] font-bold">⚡</span>
              <span className="text-[10px] uppercase tracking-wide text-[#b9cbbd] font-display">
                NutriPulse • 1:45 PM
              </span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffb86b] animate-pulse" />
          </div>
          <p className="text-xs font-bold text-[#dfe2ee] font-display">Afternoon Energy Dip in 30 mins</p>
          <p className="text-[11px] text-[#b9cbbd]">
            Grab your Almond &amp; Matcha snack to maintain stable focus and sidestep a blood sugar crash.
          </p>
        </div>

        <div className="bg-[#181c24] rounded-2xl p-3.5 shadow-md flex flex-col gap-1.5 border border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-[#00f59b] font-bold">⚡</span>
              <span className="text-[10px] uppercase tracking-wide text-[#b9cbbd] font-display">
                NutriPulse • 5:00 PM
              </span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e38f]" />
          </div>
          <p className="text-xs font-bold text-[#dfe2ee] font-display">2 Ingredients Expire Tonight</p>
          <p className="text-[11px] text-[#b9cbbd]">
            Spinach &amp; Greek yogurt are ready to go. Tap to view a 5-minute High-Protein Green Dip recipe.
          </p>
        </div>
      </div>

      {/* Data Export & Portability */}
      <div className="flex flex-col gap-2.5">
        <h2 className="text-xs font-bold text-[#b9cbbd] uppercase tracking-wide px-1 font-display">
          Data Portability &amp; Export
        </h2>
        <div className="rounded-3xl bg-[#1c2028] border border-white/5 p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-[#dfe2ee] font-display">Full Health &amp; Kitchen Archive</h3>
              <p className="text-[11px] text-[#b9cbbd] mt-0.5">
                Includes meals, hydration logs, sleep trends, and XP streak history.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#00f59b] bg-[#00f59b]/10 px-2 py-0.5 rounded border border-[#00f59b]/20">
              3.4 MB
            </span>
          </div>

          <div className="flex gap-2 pt-1 flex-wrap">
            <button
              onClick={handleExportJson}
              className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] text-xs font-bold font-display border border-white/5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#00f59b]">download</span>
              <span>Export JSON Archive</span>
            </button>
            <button
              onClick={handleExportCsv}
              className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] text-xs font-bold font-display border border-white/5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#ffb86b]">table_view</span>
              <span>Export CSV Sheet</span>
            </button>
          </div>
        </div>
      </div>

      {/* Clarification Notice */}
      <div className="rounded-2xl bg-[#1c2028]/60 border border-white/5 p-3.5 flex items-start gap-2.5">
        <span className="material-symbols-outlined text-[#ffb86b] text-[18px] flex-shrink-0 mt-0.5">info</span>
        <div className="text-[11px] text-[#b9cbbd] leading-relaxed">
          <span className="font-semibold text-white">Medical &amp; Diagnostic Clarification:</span> NutriPulse energy forecasts and sleep calculations are algorithmic estimates designed for lifestyle optimization, not medical diagnostics. Always consult a licensed physician for healthcare concerns.
        </div>
      </div>

      {/* Danger Zone: Reset & Account Purge */}
      <div className="flex flex-col gap-2.5">
        <h2 className="text-xs font-bold text-[#ffb4ab] uppercase tracking-wide px-1 font-display">
          Data Erasure &amp; Account Purge
        </h2>
        <div className="rounded-3xl bg-[#1c2028] border border-[#ffb4ab]/20 p-4 flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-[#dfe2ee] font-display">Clear 30-Day Biometrics Log</h3>
              <p className="text-[11px] text-[#b9cbbd] mt-0.5">
                {purgeLogsCleared ? '✓ Logs cleared from local storage' : 'Wipe meal entries, energy slumps, and water logs while keeping pantry.'}
              </p>
            </div>
            <button
              onClick={() => setPurgeLogsCleared(true)}
              className="px-3 py-1.5 rounded-xl border border-white/10 text-xs font-bold text-[#dfe2ee] hover:bg-[#262a33] transition-colors cursor-pointer font-display"
            >
              {purgeLogsCleared ? 'Cleared' : 'Clear Logs'}
            </button>
          </div>

          <div className="h-px bg-white/5" />

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-[#ffb4ab] font-display">Permanently Delete Account</h3>
              <p className="text-[11px] text-[#b9cbbd] mt-0.5">
                Purges all biometric records, pantry data, and credentials within 24 hours.
              </p>
            </div>
            <button
              onClick={() => setShowPurgeModal(true)}
              className="px-3 py-1.5 rounded-xl bg-[#93000a]/30 border border-[#ffb4ab]/40 text-xs font-bold text-[#ffb4ab] hover:bg-[#93000a]/50 transition-colors cursor-pointer font-display"
            >
              Delete All
            </button>
          </div>
        </div>
      </div>

      {/* Purge Modal */}
      {showPurgeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0e16]/85 backdrop-blur-sm px-4">
          <div className="bg-[#1c2028] w-full max-w-sm rounded-3xl p-5 flex flex-col gap-3 shadow-2xl border border-[#ffb4ab]/30">
            <h4 className="text-base font-bold text-[#ffb4ab] font-display">Confirm Account Deletion</h4>
            <p className="text-xs text-[#b9cbbd]">
              This will immediately purge all encryption keys, food logs, and local biometric models on this device.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowPurgeModal(false)}
                className="flex-1 py-2 rounded-xl bg-[#262a33] text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowPurgeModal(false);
                  alert('Account and cryptographic enclave keys purged.');
                }}
                className="flex-1 py-2 rounded-xl bg-[#93000a] text-white text-xs font-bold cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
