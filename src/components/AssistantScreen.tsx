import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

interface AssistantScreenProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onAddPlanXp: (xp: number) => void;
  onDeductPantry: () => void;
}

export const AssistantScreen: React.FC<AssistantScreenProps> = ({
  messages,
  onSendMessage,
  onAddPlanXp,
  onDeductPantry,
}) => {
  const [inputText, setInputText] = useState('');
  const [isAudioMode, setIsAudioMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mitigatedIds, setMitigatedIds] = useState<Record<string, boolean>>({});
  const [addedPlans, setAddedPlans] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleSuggestionClick = (query: string) => {
    onSendMessage(query);
  };

  const handleApplyFix = (msgId: string) => {
    setMitigatedIds((prev) => ({ ...prev, [msgId]: true }));
  };

  const handleAddPlan = (msgId: string, xp: number) => {
    setAddedPlans((prev) => ({ ...prev, [msgId]: true }));
    onAddPlanXp(xp);
  };

  return (
    <div className="flex flex-col w-full pb-6 gap-space-md text-[#dfe2ee]">
      {/* AI System Status Card & Telemetry Sensor Hub */}
      <section className="flex flex-col w-full bg-[#181c24] rounded-3xl p-4 shadow-md gap-3 border border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-[#00f59b]/20 text-[#00f59b]">
              <span className="material-symbols-outlined text-[22px]">smart_toy</span>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#00f59b] shadow-[0_0_8px_#00f59b]" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-[#dfe2ee] font-display">Pulse AI</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#31353e] text-[#b9cbbd] text-[10px] font-bold font-display uppercase">
                  v2.4
                </span>
              </div>
              <span className="text-[11px] text-[#00e38f] flex items-center gap-1 font-display">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e38f] inline-block animate-pulse" />
                Biotelemetry Live Sync
              </span>
            </div>
          </div>

          {/* Voice Interaction Trigger */}
          <button
            onClick={() => setIsAudioMode(!isAudioMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold font-display transition-all cursor-pointer ${
              isAudioMode
                ? 'bg-[#00f59b] text-[#003920] shadow-[0_0_12px_rgba(0,245,155,0.4)]'
                : 'bg-[#262a33] text-[#dfe2ee] hover:bg-[#31353e]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isAudioMode ? 'mic' : 'graphic_eq'}
            </span>
            <span>{isAudioMode ? 'Listening...' : 'Audio Mode'}</span>
          </button>
        </div>

        {/* Audio Waveform Banner when Audio Mode is active */}
        {isAudioMode && (
          <div className="bg-[#1c2028] p-3 rounded-2xl flex items-center justify-between border border-[#00f59b]/30 animate-pulse">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 h-5">
                <span className="w-1 h-3 bg-[#00f59b] rounded-full animate-bounce" />
                <span className="w-1 h-5 bg-[#00f59b] rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-1 h-4 bg-[#00f59b] rounded-full animate-bounce [animation-delay:0.3s]" />
                <span className="w-1 h-2 bg-[#00f59b] rounded-full animate-bounce [animation-delay:0.45s]" />
              </div>
              <span className="text-xs font-semibold text-[#00f59b] font-display">
                Listening for speech biometrics...
              </span>
            </div>
            <button
              onClick={() => {
                onSendMessage('What can I cook right now to prevent an afternoon crash?');
                setIsAudioMode(false);
              }}
              className="text-[11px] bg-[#00f59b]/20 text-[#00f59b] px-2 py-0.5 rounded-full font-bold font-display"
            >
              Simulate Speak
            </button>
          </div>
        )}

        {/* Active Real-time Context Chips */}
        <div className="flex items-center gap-2 overflow-x-auto py-0.5 no-scrollbar">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00f59b]/10 text-[#00f59b] text-[11px] font-semibold whitespace-nowrap shadow-sm font-display">
            <span className="material-symbols-outlined text-[14px]">bolt</span>
            <span>84% Metabolic Stamina</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ffb86b]/15 text-[#ffb86b] text-[11px] font-semibold whitespace-nowrap shadow-sm font-display">
            <span className="material-symbols-outlined text-[14px]">warning</span>
            <span>2:15 PM Slump Risk</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#262a33] text-[#b9cbbd] text-[11px] font-semibold whitespace-nowrap shadow-sm font-display">
            <span className="material-symbols-outlined text-[14px]">inventory_2</span>
            <span>2 Items Expiring</span>
          </div>
        </div>
      </section>

      {/* Interactive Chat Stream */}
      <div className="flex flex-col w-full gap-4">
        {messages.map((msg) => {
          if (msg.sender === 'user') {
            return (
              <div key={msg.id} className="flex items-start justify-end gap-2.5 ml-auto max-w-[85%]">
                <div className="flex flex-col items-end gap-1">
                  <div className="p-3.5 rounded-2xl rounded-tr-none bg-[#cdffdc] text-[#003920] text-xs font-semibold shadow-sm">
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-[#b9cbbd]/70 px-1">{msg.time}</span>
                </div>
                <div className="w-7 h-7 rounded-full bg-[#00f59b]/20 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                  <span className="material-symbols-outlined text-[16px] text-[#dfe2ee]">person</span>
                </div>
              </div>
            );
          }

          // AI Message
          const isMitigated = mitigatedIds[msg.id];
          const isPlanAdded = addedPlans[msg.id];

          return (
            <div key={msg.id} className="flex items-start gap-2.5 w-full">
              <div className="w-7 h-7 rounded-full bg-[#262a33] flex items-center justify-center shrink-0 mt-1 text-[#00e38f] shadow-sm">
                <span className="material-symbols-outlined text-[16px]">smart_toy</span>
              </div>
              <div className="flex flex-col gap-2 w-full min-w-0">
                {/* Standard text bubble */}
                <div className="p-3.5 rounded-2xl rounded-tl-none bg-[#1c2028] text-[#dfe2ee] text-xs leading-relaxed shadow-sm border border-white/5">
                  {msg.text}
                </div>

                {/* Rich Recipe Card if present */}
                {msg.richCard && (
                  <div className="flex flex-col w-full bg-[#1c2028] rounded-3xl p-4 shadow-lg gap-3 border border-white/5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-[#00f59b]/15 text-[#00f59b] text-[10px] font-bold font-display uppercase tracking-wide">
                        Pre-Workout Fuel &amp; Zero-Waste
                      </span>
                      <span className="text-[11px] text-[#ffb86b] flex items-center gap-1 font-semibold font-display">
                        <span className="material-symbols-outlined text-[14px]">eco</span>
                        Zero-Waste Match
                      </span>
                    </div>

                    <div className="flex gap-3 items-center">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-[#262a33] shadow-inner">
                        <img
                          className="w-full h-full object-cover"
                          alt={msg.richCard.title}
                          src={msg.richCard.image}
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <h3 className="text-sm font-bold text-[#dfe2ee] font-display truncate">
                          {msg.richCard.title}
                        </h3>
                        <p className="text-[11px] text-[#b9cbbd]">
                          {msg.richCard.prepTime} • {msg.richCard.calories} kcal • {msg.richCard.protein}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1 text-[11px] font-display">
                          <span className="text-[#00f59b] font-semibold">{msg.richCard.staminaTag}</span>
                          <span className="text-[#b9cbbd]">•</span>
                          <span className="text-[#ffb86b] font-semibold">{msg.richCard.wasteTag}</span>
                        </div>
                      </div>
                    </div>

                    {/* Breakdown details */}
                    <div className="flex flex-col gap-1.5 bg-[#181c24] p-3 rounded-2xl border border-white/5 text-xs">
                      <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[16px] text-[#00e38f] mt-0.5">verified</span>
                        <p className="text-[#dfe2ee] leading-snug">
                          <strong className="font-semibold text-[#00f59b]">Sustained Stamina:</strong>{' '}
                          {msg.richCard.sustainedStaminaNote}
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[16px] text-[#ffb86b] mt-0.5">delete_sweep</span>
                        <p className="text-[#dfe2ee] leading-snug">
                          <strong className="font-semibold text-[#ffb86b]">Kitchen Win:</strong>{' '}
                          {msg.richCard.kitchenWinNote}
                        </p>
                      </div>
                    </div>

                    {/* Action Controls */}
                    <div className="flex flex-col gap-2 pt-1">
                      <button
                        onClick={() => handleAddPlan(msg.id, msg.richCard!.xpBonus)}
                        className={`w-full py-2.5 px-4 rounded-full text-xs font-bold font-display flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md cursor-pointer ${
                          isPlanAdded
                            ? 'bg-[#181c24] text-[#00f59b] border border-[#00f59b]/30'
                            : 'bg-[#00f59b] text-[#003920] hover:bg-[#00e38f]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {isPlanAdded ? 'check_circle' : 'add_task'}
                        </span>
                        <span>
                          {isPlanAdded ? 'Added to Plan ✓' : `Add to Daily Energy Plan (+${msg.richCard.xpBonus} XP)`}
                        </span>
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onSendMessage('Show me the 4-step preparation guide for this smoothie')}
                          className="py-2 px-3 rounded-full bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] text-xs font-bold font-display flex items-center justify-center gap-1.5 active:scale-95 transition-transform cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">menu_book</span>
                          <span>Cook Guide</span>
                        </button>
                        <button
                          onClick={onDeductPantry}
                          className="py-2 px-3 rounded-full bg-[#262a33] hover:bg-[#31353e] text-[#00e38f] text-xs font-bold font-display flex items-center justify-center gap-1.5 active:scale-95 transition-transform cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">check_circle</span>
                          <span>Deduct Pantry</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Trajectory Forecast Diagnostic Visual Card */}
                {msg.trajectoryData && (
                  <div className="bg-[#181c24] rounded-3xl p-3.5 flex flex-col gap-2.5 shadow-inner border border-white/5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#b9cbbd] uppercase font-bold font-display">
                        Metabolic Trajectory Forecast
                      </span>
                      <span
                        className={`text-xs font-bold font-display flex items-center gap-1 ${
                          isMitigated ? 'text-[#00f59b]' : 'text-[#ffb86b]'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full inline-block ${
                            isMitigated ? 'bg-[#00f59b]' : 'bg-[#ffb86b]'
                          }`}
                        />
                        {isMitigated ? 'Protected' : `-${msg.trajectoryData.dropPercent}% Dip`}
                      </span>
                    </div>

                    {/* Telemetry SVG graph */}
                    <div className="w-full h-24 relative flex items-center justify-center">
                      <svg className="w-full h-full" fill="none" viewBox="0 0 300 80">
                        <line
                          className="text-[#31353e]/40"
                          stroke="currentColor"
                          strokeDasharray="2 4"
                          x1="0"
                          x2="300"
                          y1="20"
                          y2="20"
                        />
                        <line
                          className="text-[#31353e]/40"
                          stroke="currentColor"
                          strokeDasharray="2 4"
                          x1="0"
                          x2="300"
                          y1="50"
                          y2="50"
                        />
                        {/* Baseline drop curve */}
                        <path
                          d="M 10 25 C 70 20, 110 30, 150 72 C 180 75, 230 45, 290 35"
                          stroke="#ffb86b"
                          strokeLinecap="round"
                          strokeWidth="3"
                          opacity={isMitigated ? 0.3 : 1}
                        />
                        {/* Mitigated compensated curve */}
                        <path
                          d="M 10 25 C 70 22, 110 28, 150 36 C 180 34, 230 30, 290 26"
                          stroke="#00f59b"
                          strokeDasharray={isMitigated ? '0' : '4 4'}
                          strokeLinecap="round"
                          strokeWidth={isMitigated ? 3.5 : 2.5}
                          opacity={isMitigated ? 1 : 0.8}
                        />
                        <circle cx="150" cy={isMitigated ? 36 : 72} fill={isMitigated ? '#00f59b' : '#ffb86b'} r="5" />
                      </svg>
                    </div>

                    <div className="flex justify-between text-[11px] text-[#b9cbbd] font-display">
                      <span>12:30 PM</span>
                      <span className={isMitigated ? 'text-[#00f59b] font-bold' : 'text-[#ffb86b] font-bold'}>
                        {msg.trajectoryData.timeLabel}
                      </span>
                      <span>4:00 PM</span>
                      <span>6:00 PM (Workout)</span>
                    </div>

                    {/* Tactical Solution Box */}
                    <div className="bg-[#262a33] p-2.5 rounded-2xl flex items-center justify-between gap-2 border border-white/5">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="material-symbols-outlined text-[20px] text-[#00e38f]">water_drop</span>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-semibold text-[#dfe2ee] truncate font-display">
                            {msg.trajectoryData.solutionText}
                          </span>
                          <span className="text-[10px] text-[#b9cbbd] truncate">
                            {msg.trajectoryData.solutionDetail}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleApplyFix(msg.id)}
                        disabled={isMitigated}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold font-display shrink-0 active:scale-95 transition-all cursor-pointer ${
                          isMitigated
                            ? 'bg-[#00f59b] text-[#003920]'
                            : 'bg-[#00f59b]/20 hover:bg-[#00f59b]/30 text-[#00f59b]'
                        }`}
                      >
                        {isMitigated ? 'Applied ✓' : 'Apply Fix'}
                      </button>
                    </div>
                  </div>
                )}

                <span className="text-[10px] text-[#b9cbbd]/70 px-1 font-display">
                  {msg.time} {msg.subtext ? `• ${msg.subtext}` : ''}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Inquiries Chips */}
      <section className="flex flex-col gap-1.5 w-full pt-1">
        <div className="flex items-center justify-between px-0.5">
          <span className="text-[10px] text-[#b9cbbd] uppercase tracking-wider font-bold font-display">
            Suggested Inquiries
          </span>
          <span className="text-[10px] text-[#00e38f] font-semibold font-display">Dynamic suggestions</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
          {[
            { icon: '🍌', text: 'Use expiring bananas' },
            { icon: '⚡', text: 'Fix 2:15 PM slump' },
            { icon: '🏋️', text: 'HIIT carb strategy' },
            { icon: '🥗', text: '15-min low-GI dinner' },
            { icon: '🛒', text: 'Smart grocery audit' },
          ].map((sug, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestionClick(sug.text)}
              className="px-3 py-2 rounded-full bg-[#1c2028] hover:bg-[#262a33] text-[#dfe2ee] text-xs font-semibold whitespace-nowrap active:scale-95 transition-all flex items-center gap-1.5 shadow-sm font-display cursor-pointer border border-white/5"
            >
              <span>{sug.icon}</span>
              <span>{sug.text}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Prompt Input Bar */}
      <section className="bg-[#262a33] rounded-2xl p-2 flex items-center gap-2 shadow-xl border border-white/10 sticky bottom-20 z-30">
        <button
          onClick={() => onSendMessage('Identify ingredients in fridge photo')}
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#b9cbbd] hover:text-white hover:bg-[#31353e] active:scale-95 transition-all shrink-0 cursor-pointer"
          title="Scan food or fridge"
        >
          <span className="material-symbols-outlined text-[20px]">photo_camera</span>
        </button>

        <form onSubmit={handleSend} className="flex-1 flex items-center gap-2">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-transparent text-[#dfe2ee] placeholder:text-[#b9cbbd]/60 text-xs focus:outline-none min-w-0 px-1"
            placeholder="Ask Pulse AI anything (food, energy, recipes)..."
            type="text"
          />
          <button
            type="button"
            onClick={() => setIsRecording(!isRecording)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shrink-0 cursor-pointer ${
              isRecording
                ? 'bg-[#ff5370] text-white animate-pulse'
                : 'bg-[#1c2028] hover:bg-[#31353e] text-[#00f59b]'
            }`}
            title="Voice input"
          >
            <span className="material-symbols-outlined text-[18px]">mic</span>
          </button>
          <button
            type="submit"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-[#00f59b] hover:bg-[#00e38f] text-[#003920] active:scale-95 transition-all shrink-0 shadow-md cursor-pointer"
            title="Send query"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
          </button>
        </form>
      </section>
    </div>
  );
};
