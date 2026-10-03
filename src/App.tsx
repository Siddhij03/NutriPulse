import React, { useState } from 'react';
import {
  INITIAL_USER,
  INITIAL_QUESTS,
  INITIAL_INVENTORY,
  INITIAL_RECIPES,
  INITIAL_MESSAGES,
} from './mockData';
import { UserProfile, DailyQuest, InventoryItem, Recipe, ChatMessage } from './types';
import { LaunchScreen } from './components/LaunchScreen';
import { HomeScreen } from './components/HomeScreen';
import { EnergyScreen } from './components/EnergyScreen';
import { KitchenScreen } from './components/KitchenScreen';
import { AssistantScreen } from './components/AssistantScreen';
import { PrivacyVaultScreen } from './components/PrivacyVaultScreen';
import { TelemetryDashboard } from './components/TelemetryDashboard';
import { FlowShowcase } from './components/FlowShowcase';

type AppMode = 'mobile' | 'dashboard' | 'flow';
type MobileTab = 'launch' | 'home' | 'energy' | 'kitchen' | 'assistant' | 'privacy';

export default function App() {
  const [mode, setMode] = useState<AppMode>('mobile');
  const [mobileTab, setMobileTab] = useState<MobileTab>('home');
  const [useDeviceFrame, setUseDeviceFrame] = useState(true);

  // App interactive states
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [quests, setQuests] = useState<DailyQuest[]>(INITIAL_QUESTS);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [recipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);

  // Toast feedback state
  const [toast, setToast] = useState<{ message: string; icon: string; visible: boolean }>({
    message: '',
    icon: 'check',
    visible: false,
  });

  const triggerToast = (message: string, icon = 'check') => {
    setToast({ message, icon, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2800);
  };

  // Hydration logger
  const handleLogWater = () => {
    setUser((prev) => {
      const nextWater = Math.min(prev.hydrationCurrent + 250, 3200);
      const nextScore = Math.min(prev.healthIndex + 1, 99);
      const nextHydrationScore = Math.min(prev.healthBreakdown.hydration + 2, 98);
      return {
        ...prev,
        hydrationCurrent: nextWater,
        healthIndex: nextScore,
        healthBreakdown: {
          ...prev.healthBreakdown,
          hydration: nextHydrationScore,
        },
      };
    });
    triggerToast(`Hydration +250ml logged! (${user.hydrationCurrent + 250}ml)`, 'water_drop');
  };

  // Toggle Quest
  const handleToggleQuest = (questId: string, xpPoints: number) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === questId) {
          const nextCompleted = !q.completed;
          if (nextCompleted) {
            triggerToast(`Quest Completed! +${xpPoints} XP`, 'military_tech');
          }
          return {
            ...q,
            completed: nextCompleted,
            completedAt: nextCompleted ? 'Just now' : undefined,
          };
        }
        return q;
      })
    );

    setUser((prev) => {
      const quest = quests.find((q) => q.id === questId);
      const isFinishing = quest && !quest.completed;
      const delta = isFinishing ? xpPoints : -xpPoints;
      let newXp = prev.xp + delta;
      let newLevel = prev.level;
      if (newXp >= prev.xpTarget) {
        newLevel += 1;
        newXp = newXp - prev.xpTarget;
      } else if (newXp < 0) {
        newXp = 0;
      }
      return {
        ...prev,
        xp: newXp,
        level: newLevel,
      };
    });
  };

  // Fix Energy Action
  const handleFixEnergy = () => {
    setUser((prev) => ({
      ...prev,
      energyScore: 89,
    }));
    triggerToast('Energy Plan Optimized! Banana + 300ml Water logged to agenda.', 'bolt');
  };

  const handleQuickBoost = () => {
    triggerToast('Quick Energy Boost logged! (+15 min stamina buffer)', 'bolt');
  };

  // Cook Recipe & Auto-Deduct
  const handleCookRecipe = (recipeId: string) => {
    const rec = recipes.find((r) => r.id === recipeId);
    if (!rec) return;

    // Deduct quantities
    setInventory((prev) =>
      prev.map((item) => {
        if (rec.usesExpiring.some((u) => item.name.toLowerCase().includes(u.toLowerCase()))) {
          return {
            ...item,
            quantity: Math.max(0, item.quantity - 1),
          };
        }
        return item;
      })
    );

    setUser((prev) => ({
      ...prev,
      caloriesCurrent: prev.caloriesCurrent + rec.calories,
      macros: {
        ...prev.macros,
        protein: {
          ...prev.macros.protein,
          current: prev.macros.protein.current + rec.proteinG,
        },
      },
    }));

    triggerToast(`Cooked "${rec.title}"! Auto-deducted ingredients & saved ₹${rec.wasteSavedRupees}`, 'skillet');
  };

  // Add Item to Inventory
  const handleAddItem = (newItem: Omit<InventoryItem, 'id'>) => {
    const item: InventoryItem = {
      ...newItem,
      id: `inv-${Date.now()}`,
    };
    setInventory((prev) => [item, ...prev]);
    triggerToast(`Added ${item.name} to Pantry!`, 'check');
  };

  // Conversational Assistant message sender
  const handleSendMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);

    // Simulated contextual AI response
    setTimeout(() => {
      let aiText = `I analyzed your biometric status and kitchen ingredients for "${text}". `;
      let richCard: ChatMessage['richCard'] | undefined = undefined;

      if (text.toLowerCase().includes('banana') || text.toLowerCase().includes('smoothie')) {
        aiText = "Here's a fast zero-waste smoothie recommendation using your expiring bananas:";
        richCard = {
          recipeId: 'rec-2',
          title: 'Blender Banana Peanut Oat',
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAUxdpuVFWsKEKOYNPvHvxErhlHLF0gA__0-ZWmgeQF9bzEL9I2gT1fiHI8MMSkRLkkIelXWv_X0zIFYTghrERYyl_9n3Ir1abVS5rwRp6m-8zVY8GEcnxYiE2R7l2T8oXhYNOGvc40qc62pFgTGJQ8FJFLZXYkTDs6XsdQ2S1JnpcaFbVVprhm-LXFiypPJnS_RzhoKSF5g-TyAq-2VrYmc9Obomiptpqkw7hrKFnTTEMfvjtg0ieDxg',
          prepTime: 'Ready in 4 min',
          calories: 340,
          protein: '22g Protein',
          staminaTag: '+3.5h Stamina',
          wasteTag: 'Uses 2 Bananas',
          sustainedStaminaNote: 'Fast-acting glucose pairs with slow-burning oats for steady energy.',
          kitchenWinNote: 'Rescues ripe bananas scheduled to spoil tonight.',
          xpBonus: 15,
        };
      } else if (text.toLowerCase().includes('slump') || text.toLowerCase().includes('tired')) {
        aiText =
          'To sidestep the 2:15 PM slump, consume 350ml cold water with a pinch of electrolytes and a handful of almonds to balance glycemic variance.';
      } else if (text.toLowerCase().includes('dinner')) {
        aiText =
          'For dinner tonight, the Spinach & Paneer Power Bowl will provide 28g of clean recovery protein and magnesium for deep slow-wave delta sleep.';
      } else {
        aiText +=
          'Recommended action: maintain steady glucose with high-fiber pre-fuel and 300ml water to sustain optimal mitochondrial output!';
      }

      const aiMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        subtext: 'Pulse AI Biometric Sync',
        richCard,
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#070A0F] text-[#dfe2ee] font-sans antialiased flex flex-col selection:bg-[#00f59b] selection:text-[#002111]">
      {/* Top Global Mode Switcher Bar */}
      <header className="sticky top-0 z-50 bg-[#0a0e16]/95 backdrop-blur-xl border-b border-white/10 px-4 py-2 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img
              alt="NutriPulse Logo"
              className="h-7 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1W8IYUWKDaC4HWXtpYbGlYFJrtFFc26A39Q0IA8DbJV16Nw9a0YeihZ7rMpIPbnvbBC_STtpZROj9So_m7wh1Rsr5YW_8QfKeDop9B7RtwxFD-O3H0xrub-BiKGvF3QSIO1M1eHpSY7QwjWStlIypvM-UUB1B_0igErJkDZ9Jygb29mvMb2NvvXD0TFbKHRWbEE63VeFewPqXt5g0jDvySA0D8IZMNJdqcG_bqr4xqN-6J4-e3eGr59S9c"
            />
            <span className="font-extrabold text-[#00f59b] font-display text-base tracking-tight">NutriPulse</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#181c24] text-[10px] text-[#53ffab] border border-[#00f59b]/20 font-display">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b] animate-pulse" />
            <span>Circadian Fuel &amp; Zero-Waste Engine</span>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 bg-[#181c24] p-1 rounded-full border border-white/10 font-display text-xs">
          <button
            onClick={() => setMode('mobile')}
            className={`px-3 py-1.5 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              mode === 'mobile'
                ? 'bg-[#00f59b] text-[#003920] shadow-[0_0_12px_rgba(0,245,155,0.3)]'
                : 'text-[#b9cbbd] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">smartphone</span>
            <span>Mobile App</span>
          </button>

          <button
            onClick={() => setMode('dashboard')}
            className={`px-3 py-1.5 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              mode === 'dashboard'
                ? 'bg-[#00f59b] text-[#003920] shadow-[0_0_12px_rgba(0,245,155,0.3)]'
                : 'text-[#b9cbbd] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">monitoring</span>
            <span>Web Telemetry Console</span>
          </button>

          <button
            onClick={() => setMode('flow')}
            className={`px-3 py-1.5 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              mode === 'flow'
                ? 'bg-[#00f59b] text-[#003920] shadow-[0_0_12px_rgba(0,245,155,0.3)]'
                : 'text-[#b9cbbd] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">account_tree</span>
            <span>Flow Showcase</span>
          </button>
        </div>

        {/* Right Aux controls */}
        {mode === 'mobile' && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setUseDeviceFrame(!useDeviceFrame)}
              className="text-[11px] font-display text-[#b9cbbd] hover:text-white px-2.5 py-1 rounded-full bg-[#181c24] border border-white/5 flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">
                {useDeviceFrame ? 'crop_free' : 'stay_current_portrait'}
              </span>
              <span>{useDeviceFrame ? 'Frame: ON' : 'Frame: Full'}</span>
            </button>
          </div>
        )}
      </header>

      {/* Screen Mode Renderings */}
      {mode === 'dashboard' && <TelemetryDashboard onSwitchToMobile={() => setMode('mobile')} />}

      {mode === 'flow' && (
        <FlowShowcase
          onSelectScreen={(screen) => {
            setMode('mobile');
            setMobileTab(screen);
          }}
          onOpenDashboard={() => setMode('dashboard')}
        />
      )}

      {mode === 'mobile' && (
        <div className="flex-1 flex justify-center py-4 sm:py-6 px-2 sm:px-4 bg-[#070A0F]">
          {/* Mobile Shell Wrapper */}
          <div
            className={`relative w-full ${
              useDeviceFrame
                ? 'max-w-[430px] rounded-[48px] border-4 border-slate-800/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden bg-[#0f131c]'
                : 'max-w-2xl rounded-3xl bg-[#0f131c] border border-white/5 shadow-2xl p-2 sm:p-4'
            } flex flex-col justify-between`}
          >
            {/* Mobile Header (When not on launch screen) */}
            {mobileTab !== 'launch' && (
              <header className="sticky top-0 z-40 bg-[#0f131c]/90 backdrop-blur-xl border-b border-white/5 px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    alt="NutriPulse Logo"
                    className="h-7 w-auto object-contain"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDha3t4ASCYoxSRhfLqrSHfRXWSIbMSJRZaFBivli_SfOMhHox9lVheMVCnq-PodDuPXYlhVTpaQeM7T1xYRVPca--rEv4ZG17rGu3crH_7Nz_HppKhMjfqMPs-r6XBmBKHEK5KxstUBVY2dOcOMrk6EdVLukKUjfOhBU5Kzd08dGnPI2YjGvL5f95B01dD0T-kGXNLXHoZ4epIFg5dFkeM_MeG5UAHLdjj-tGTnCTN-WGT-TzbX1M-Q"
                  />
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-[10px] text-[#00f59b] tracking-widest uppercase">
                      NutriPulse
                    </span>
                    <h1 className="font-display font-bold text-sm text-[#dfe2ee] leading-tight">
                      {mobileTab === 'home' && 'Home'}
                      {mobileTab === 'energy' && 'Energy'}
                      {mobileTab === 'kitchen' && 'Kitchen'}
                      {mobileTab === 'assistant' && 'Pulse AI'}
                      {mobileTab === 'privacy' && 'Privacy Vault'}
                    </h1>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-[#1c2028] px-2.5 py-1 rounded-full border border-white/5 font-display">
                    <span className="material-symbols-outlined text-[#ffb86b] text-[16px]">
                      local_fire_department
                    </span>
                    <span className="text-xs font-bold text-[#ffb86b]">{user.streakDays}d</span>
                  </div>

                  <button
                    onClick={() => setMobileTab('privacy')}
                    className="relative cursor-pointer group"
                    title="Privacy Vault"
                  >
                    <img
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border border-[#00f59b]/40 group-hover:border-[#00f59b] transition-colors"
                      src={user.avatar}
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#00f59b] ring-2 ring-[#0f131c]" />
                  </button>
                </div>
              </header>
            )}

            {/* Mobile Body Content */}
            <main className="flex-1 w-full p-4 overflow-y-auto max-h-[820px]">
              {mobileTab === 'launch' && (
                <LaunchScreen
                  onLaunch={() => setMobileTab('home')}
                  onExploreDemo={() => setMobileTab('home')}
                  onOpenDashboard={() => setMode('dashboard')}
                />
              )}

              {mobileTab === 'home' && (
                <HomeScreen
                  user={user}
                  quests={quests}
                  onToggleQuest={handleToggleQuest}
                  onLogWater={handleLogWater}
                  onFixEnergy={handleFixEnergy}
                  onQuickBoost={handleQuickBoost}
                  onCookWithAi={(ing) => {
                    setMobileTab('kitchen');
                    handleSendMessage(`What can I cook using ${ing}?`);
                  }}
                  onOpenPrivacyVault={() => setMobileTab('privacy')}
                />
              )}

              {mobileTab === 'energy' && (
                <EnergyScreen
                  onBoostRecalculate={() => triggerToast('Energy curve recalculated!', 'bolt')}
                  onCookSnack={() => {
                    setMobileTab('kitchen');
                    triggerToast('Switched to Kitchen for Almond & Banana bites', 'kitchen');
                  }}
                />
              )}

              {mobileTab === 'kitchen' && (
                <KitchenScreen
                  inventory={inventory}
                  recipes={recipes}
                  onCookRecipe={handleCookRecipe}
                  onUpdateQuantity={(id, delta) => {
                    setInventory((prev) =>
                      prev.map((i) =>
                        i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i
                      )
                    );
                  }}
                  onAddItem={handleAddItem}
                  onAskAi={(prompt) => {
                    setMobileTab('assistant');
                    handleSendMessage(prompt);
                  }}
                />
              )}

              {mobileTab === 'assistant' && (
                <AssistantScreen
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  onAddPlanXp={(xp) => {
                    setUser((prev) => ({ ...prev, xp: prev.xp + xp }));
                    triggerToast(`Added to plan! +${xp} XP`, 'military_tech');
                  }}
                  onDeductPantry={() => {
                    handleCookRecipe('rec-2');
                  }}
                />
              )}

              {mobileTab === 'privacy' && (
                <PrivacyVaultScreen onBackToHome={() => setMobileTab('home')} />
              )}
            </main>

            {/* Bottom Dock Navigation Bar */}
            {mobileTab !== 'launch' && (
              <div className="sticky bottom-0 inset-x-0 z-40 p-2 bg-gradient-to-t from-[#0f131c] via-[#0f131c]/95 to-transparent">
                <nav className="h-16 w-full max-w-sm mx-auto bg-[#1c2028]/90 backdrop-blur-2xl rounded-full border border-white/10 shadow-[0_12px_32px_-4px_rgba(0,0,0,0.8),0_0_20px_-2px_rgba(0,245,155,0.2)] flex items-center justify-around px-2 font-display">
                  {/* Tab 1: Home */}
                  <button
                    onClick={() => setMobileTab('home')}
                    className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 transition-all cursor-pointer ${
                      mobileTab === 'home'
                        ? 'text-[#00f59b]'
                        : 'text-[#b9cbbd] hover:text-white'
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-9 h-7 rounded-full transition-all ${
                        mobileTab === 'home' ? 'bg-[#00f59b]/15 shadow-[0_0_12px_rgba(0,245,155,0.3)]' : ''
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">home</span>
                    </div>
                    <span className="text-[10px] font-semibold tracking-tight">Home</span>
                  </button>

                  {/* Tab 2: Meals & Kitchen */}
                  <button
                    onClick={() => setMobileTab('kitchen')}
                    className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 transition-all cursor-pointer ${
                      mobileTab === 'kitchen'
                        ? 'text-[#00f59b]'
                        : 'text-[#b9cbbd] hover:text-white'
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-9 h-7 rounded-full transition-all ${
                        mobileTab === 'kitchen' ? 'bg-[#00f59b]/15 shadow-[0_0_12px_rgba(0,245,155,0.3)]' : ''
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">soup_kitchen</span>
                    </div>
                    <span className="text-[10px] font-semibold tracking-tight">Kitchen</span>
                  </button>

                  {/* Tab 3: Energy Forecast */}
                  <button
                    onClick={() => setMobileTab('energy')}
                    className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 transition-all cursor-pointer ${
                      mobileTab === 'energy'
                        ? 'text-[#00f59b]'
                        : 'text-[#b9cbbd] hover:text-white'
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-9 h-7 rounded-full transition-all ${
                        mobileTab === 'energy' ? 'bg-[#00f59b]/15 shadow-[0_0_12px_rgba(0,245,155,0.3)]' : ''
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">bolt</span>
                    </div>
                    <span className="text-[10px] font-semibold tracking-tight">Energy</span>
                  </button>

                  {/* Tab 4: Pulse AI Assistant */}
                  <button
                    onClick={() => setMobileTab('assistant')}
                    className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 transition-all cursor-pointer ${
                      mobileTab === 'assistant'
                        ? 'text-[#00f59b]'
                        : 'text-[#b9cbbd] hover:text-white'
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-9 h-7 rounded-full transition-all ${
                        mobileTab === 'assistant' ? 'bg-[#00f59b]/15 shadow-[0_0_12px_rgba(0,245,155,0.3)]' : ''
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                    </div>
                    <span className="text-[10px] font-semibold tracking-tight">Coach</span>
                  </button>
                </nav>

                {/* Home Indicator */}
                <div className="w-full pt-1.5 pb-0.5 flex justify-center items-center">
                  <div className="w-32 h-1 bg-slate-700/60 rounded-full" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Global Toast Notification */}
      {toast.visible && (
        <div className="fixed top-16 inset-x-4 max-w-sm mx-auto z-50 transition-all duration-300 rounded-2xl bg-[#262a33] px-4 py-3 shadow-2xl flex items-center gap-3 border border-[#00f59b]/40 font-display">
          <div className="w-8 h-8 rounded-full bg-[#00f59b] text-[#003920] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[18px]">{toast.icon}</span>
          </div>
          <span className="text-xs font-bold text-white leading-tight">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
