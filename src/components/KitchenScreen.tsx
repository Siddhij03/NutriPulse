import React, { useState } from 'react';
import { InventoryItem, Recipe } from '../types';

interface KitchenScreenProps {
  inventory: InventoryItem[];
  recipes: Recipe[];
  onCookRecipe: (recipeId: string) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onAddItem: (item: Omit<InventoryItem, 'id'>) => void;
  onAskAi: (prompt: string) => void;
}

export const KitchenScreen: React.FC<KitchenScreenProps> = ({
  inventory,
  recipes,
  onCookRecipe,
  onUpdateQuantity,
  onAddItem,
  onAskAi,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [promptText, setPromptText] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<'Produce' | 'Dairy & Protein' | 'Pantry Staples'>('Produce');
  const [newItemQty, setNewItemQty] = useState('1');
  const [showStatsModal, setShowStatsModal] = useState(false);

  // Filter inventory items
  const filteredInventory = inventory.filter((item) => {
    const matchesCategory =
      activeCategory === 'All' ||
      (activeCategory === 'Produce' && item.category === 'Produce') ||
      (activeCategory === 'Dairy & Protein' && item.category === 'Dairy & Protein') ||
      (activeCategory === 'Pantry Staples' && item.category === 'Pantry Staples');
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filter recipes
  const filteredRecipes = recipes.filter((rec) => {
    if (activeFilter === 'High Protein (>25g)') return rec.proteinG >= 25;
    if (activeFilter === 'Quick (<15 min)') return rec.prepTimeMin <= 15;
    return true;
  });

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    onAddItem({
      name: newItemName.trim(),
      category: newItemCategory,
      quantity: parseInt(newItemQty) || 1,
      unit: newItemCategory === 'Produce' ? 'pcs' : newItemCategory === 'Dairy & Protein' ? 'g' : 'g',
      location: newItemCategory === 'Produce' ? 'Pantry Basket' : 'Fridge',
      expiresInDays: 5,
      statusBadge: 'Fresh',
      isUrgent: false,
      emoji: newItemCategory === 'Produce' ? '🥑' : newItemCategory === 'Dairy & Protein' ? '🧀' : '🌾',
    });
    setNewItemName('');
    setShowAddModal(false);
  };

  const handleSendPrompt = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promptText.trim()) return;
    onAskAi(promptText.trim());
    setPromptText('');
  };

  return (
    <div className="flex flex-col w-full pb-6 gap-space-lg text-[#dfe2ee]">
      {/* Top Intro & Sustainable Impact Card */}
      <section className="flex flex-col gap-3 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#00f59b] uppercase tracking-widest font-bold font-display flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span> Zero-Waste Engine
            </span>
            <h2 className="text-2xl font-extrabold text-[#dfe2ee] font-display tracking-tight mt-0.5">
              My Kitchen &amp; Chef AI
            </h2>
          </div>
          <button
            onClick={() => setShowStatsModal(true)}
            className="flex items-center gap-1 bg-[#262a33] hover:bg-[#31353e] px-3 py-1.5 rounded-full text-[#00f59b] text-xs font-bold font-display active:scale-95 transition-transform cursor-pointer border border-[#00f59b]/20"
          >
            <span className="material-symbols-outlined text-[16px]">eco</span>
            <span>Stats</span>
          </button>
        </div>

        {/* Impact & Gamified Streak Banner */}
        <div className="bg-[#1c2028] rounded-3xl p-4 shadow-lg relative overflow-hidden border border-white/5">
          <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-[#00f59b]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#00f59b]/15 flex items-center justify-center text-[#00f59b]">
                <span className="material-symbols-outlined text-[22px]">savings</span>
              </div>
              <div>
                <p className="text-xs text-[#b9cbbd]">Food Saved This Week</p>
                <p className="text-lg font-bold text-[#dfe2ee] font-display">
                  6 items <span className="text-[#00f59b] text-sm font-semibold">(₹380 saved)</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="bg-[#ed9000]/20 text-[#ffb86b] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 font-display">
                <span className="material-symbols-outlined text-[14px]">local_fire_department</span> 5d Streak
              </span>
            </div>
          </div>

          {/* Level Progress */}
          <div className="flex flex-col gap-1.5 bg-[#181c24] p-2.5 rounded-2xl border border-white/5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#b9cbbd] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#00f59b]">military_tech</span> Level 3 Zero-Waster
              </span>
              <span className="text-[#53ffab] font-bold font-display">+50 XP to Next Tier</span>
            </div>
            <div className="w-full bg-[#31353e] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#00f59b] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_#00f59b]"
                style={{ width: '78%' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Expiring Soon Section */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffb86b] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ffb86b]" />
            </span>
            <h3 className="text-base font-bold text-[#dfe2ee] font-display">Expiring Soon</h3>
          </div>
          <span className="text-[10px] text-[#ffb86b] bg-[#ffb86b]/10 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-display">
            3 Needs Cooked
          </span>
        </div>

        {/* Horizontal Swipeable Cards */}
        <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
          {/* Item 1 */}
          <div className="min-w-[210px] max-w-[210px] bg-[#1c2028] rounded-2xl p-3.5 flex flex-col justify-between shadow-md relative overflow-hidden border border-white/5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🍌</span>
                <span className="text-[10px] bg-[#ffb4ab]/20 text-[#ffb4ab] px-2 py-0.5 rounded-full font-bold animate-pulse font-display">
                  TODAY
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#dfe2ee] font-display truncate">Organic Bananas</h4>
              <p className="text-[11px] text-[#b9cbbd]">2 left in fruit basket</p>
            </div>
            <button
              onClick={() => onAskAi('Cook something delicious using my ripe Organic Bananas')}
              className="mt-3 w-full bg-[#262a33] hover:bg-[#31353e] text-[#00f59b] text-xs font-bold font-display py-2 px-3 rounded-full flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              <span>Cook with AI</span>
            </button>
          </div>

          {/* Item 2 */}
          <div className="min-w-[210px] max-w-[210px] bg-[#1c2028] rounded-2xl p-3.5 flex flex-col justify-between shadow-md relative overflow-hidden border border-white/5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🥬</span>
                <span className="text-[10px] bg-[#ffb86b]/20 text-[#ffb86b] px-2 py-0.5 rounded-full font-bold font-display">
                  2 Days
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#dfe2ee] font-display truncate">Baby Spinach</h4>
              <p className="text-[11px] text-[#b9cbbd]">180g in crisper drawer</p>
            </div>
            <button
              onClick={() => onAskAi('How can I cook and rescue my Baby Spinach before it wilts?')}
              className="mt-3 w-full bg-[#262a33] hover:bg-[#31353e] text-[#00f59b] text-xs font-bold font-display py-2 px-3 rounded-full flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              <span>Cook with AI</span>
            </button>
          </div>

          {/* Item 3 */}
          <div className="min-w-[210px] max-w-[210px] bg-[#1c2028] rounded-2xl p-3.5 flex flex-col justify-between shadow-md relative overflow-hidden border border-white/5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🥛</span>
                <span className="text-[10px] bg-[#31353e] text-[#b9cbbd] px-2 py-0.5 rounded-full font-bold font-display">
                  3 Days
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#dfe2ee] font-display truncate">Greek Yogurt</h4>
              <p className="text-[11px] text-[#b9cbbd]">Half tub remaining</p>
            </div>
            <button
              onClick={() => onAskAi('Give me a high protein recipe with Greek Yogurt')}
              className="mt-3 w-full bg-[#262a33] hover:bg-[#31353e] text-[#00f59b] text-xs font-bold font-display py-2 px-3 rounded-full flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              <span>Cook with AI</span>
            </button>
          </div>
        </div>
      </section>

      {/* AI Personal Chef Generator */}
      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#00f59b] text-[22px]">smart_toy</span>
              <h3 className="text-base font-bold text-[#dfe2ee] font-display">Chef AI Meal Engine</h3>
            </div>
            <span className="text-[11px] bg-[#00f59b]/15 text-[#00f59b] px-2.5 py-0.5 rounded-full flex items-center gap-1 font-bold font-display">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b] animate-pulse" /> 8 In-Stock Ready
            </span>
          </div>
          <p className="text-xs text-[#b9cbbd]">Instant recipes prioritized by expiry timeline &amp; sustained stamina</p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar text-nowrap">
          {['All (3 Ready)', 'High Protein (>25g)', 'Quick (<15 min)'].map((filter) => {
            const isSelected = activeFilter === filter || (filter === 'All (3 Ready)' && activeFilter === 'All');
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter === 'All (3 Ready)' ? 'All' : filter)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-display transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#00f59b] text-[#003920] shadow-[0_0_12px_rgba(0,245,155,0.25)]'
                    : 'bg-[#1c2028] hover:bg-[#262a33] text-[#b9cbbd]'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Recipe Cards List */}
        <div className="flex flex-col gap-4">
          {filteredRecipes.map((rec) => (
            <article
              key={rec.id}
              className="bg-[#1c2028] rounded-3xl p-4 flex flex-col gap-3 shadow-lg border border-white/5 relative overflow-hidden"
            >
              {/* Recipe Image & Badges */}
              <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-[#262a33]">
                <img className="w-full h-full object-cover" alt={rec.title} src={rec.image} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f131c]/90 via-[#0f131c]/20 to-transparent" />
                <div className="absolute top-2.5 left-2.5 flex gap-1.5 flex-wrap">
                  <span className="bg-[#00f59b] text-[#003920] text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md font-display">
                    <span className="material-symbols-outlined text-[14px]">verified</span> 100% In Stock
                  </span>
                  {rec.isWasteSaverNumber && (
                    <span className="bg-[#ed9000] text-[#583300] text-[10px] font-bold px-2 py-0.5 rounded-full font-display">
                      Waste Saver #{rec.isWasteSaverNumber}
                    </span>
                  )}
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[#dfe2ee] text-xs font-display">
                  <span className="flex items-center gap-1 bg-[#0f131c]/80 backdrop-blur-md px-2 py-0.5 rounded-md">
                    <span className="material-symbols-outlined text-[14px]">schedule</span> {rec.prepTimeMin} min
                  </span>
                  <span className="flex items-center gap-1 bg-[#0f131c]/80 backdrop-blur-md px-2 py-0.5 rounded-md">
                    <span className="material-symbols-outlined text-[14px]">local_fire_department</span> {rec.calories} kcal
                  </span>
                  <span className="flex items-center gap-1 bg-[#0f131c]/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[#00f59b] font-bold">
                    <span className="material-symbols-outlined text-[14px]">fitness_center</span> {rec.proteinG}g Protein
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="flex flex-col gap-1">
                <h4 className="text-base font-bold text-[#dfe2ee] font-display">{rec.title}</h4>
                <p className="text-xs text-[#b9cbbd]">
                  Uses: {rec.usesExpiring.join(', ')} <span className="text-[#ffb86b] font-semibold">(Expiring!)</span>.
                </p>
              </div>

              {/* AI Benefit Pill */}
              <div className="bg-[#181c24] p-2.5 rounded-2xl flex items-center justify-between border border-white/5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00f59b] text-[18px]">battery_charging_full</span>
                  <span className="text-xs text-[#dfe2ee] font-medium">{rec.staminaBenefit}</span>
                </div>
                <span className="text-xs text-[#00f59b] font-bold font-display">Saves ₹{rec.wasteSavedRupees}</span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onCookRecipe(rec.id)}
                className="w-full bg-[#00f59b] hover:bg-[#00e38f] text-[#003920] font-display text-xs font-bold py-3 rounded-full flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,245,155,0.25)] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Cook Recipe &amp; Auto-Deduct</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </article>
          ))}

          {/* Missing 1 Item Smart Substitute Card */}
          <article className="bg-[#1c2028] rounded-3xl p-4 flex flex-col gap-3 shadow-lg border border-white/5 opacity-90">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-[#31353e] text-[#b9cbbd] text-[10px] px-2 py-0.5 rounded-full font-display">
                    Missing 1 Item
                  </span>
                  <span className="text-[10px] text-[#00e38f] font-bold font-display">Smart Sub Ready</span>
                </div>
                <h4 className="text-sm font-bold text-[#dfe2ee] font-display">Skillet Egg &amp; Veggie Scramble</h4>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-[#b9cbbd] block">8 min • 290 kcal</span>
                <span className="text-xs text-[#00f59b] font-bold font-display">24g Protein</span>
              </div>
            </div>
            <div className="bg-[#181c24] p-2.5 rounded-2xl text-xs text-[#b9cbbd] flex items-center gap-2 border border-white/5">
              <span className="material-symbols-outlined text-[#ffb86b] text-[18px]">swap_horiz</span>
              <span>
                Missing <strong className="text-white">Sourdough Bread</strong> — swap easily with your in-stock{' '}
                <strong className="text-[#00f59b]">Rolled Oats</strong>.
              </span>
            </div>
          </article>
        </div>
      </section>

      {/* Pantry & Fridge Hub */}
      <section className="flex flex-col gap-3 mt-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#dfe2ee] font-display">Pantry &amp; Fridge Hub</h3>
            <p className="text-xs text-[#b9cbbd]">Live telemetry of stored fuel ({inventory.length} items)</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#00f59b] hover:bg-[#00e38f] text-[#003920] text-xs font-bold font-display px-3.5 py-1.5 rounded-full flex items-center gap-1 shadow-[0_0_12px_rgba(0,245,155,0.25)] active:scale-95 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add</span> Add Item
          </button>
        </div>

        {/* Search & Scan Bar */}
        <div className="flex items-center gap-2 bg-[#1c2028] px-3.5 py-2 rounded-full border border-white/5">
          <span className="material-symbols-outlined text-[#b9cbbd] text-[20px]">search</span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm text-[#dfe2ee] placeholder:text-[#b9cbbd]/60 focus:outline-none w-full"
            placeholder="Search ingredients or scan receipt..."
            type="text"
          />
          <button
            onClick={() => onAskAi('Analyze receipt items from camera')}
            className="text-[#b9cbbd] hover:text-[#00f59b] p-1 rounded-full transition-colors cursor-pointer"
            title="Scan Barcode"
          >
            <span className="material-symbols-outlined text-[20px]">barcode_scanner</span>
          </button>
          <button
            onClick={() => onAskAi('OCR scan fridge photo')}
            className="text-[#b9cbbd] hover:text-[#00f59b] p-1 rounded-full transition-colors cursor-pointer"
            title="Receipt Vision AI"
          >
            <span className="material-symbols-outlined text-[20px]">photo_camera</span>
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar text-nowrap">
          {['All', 'Produce', 'Dairy & Protein', 'Pantry Staples'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold font-display transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#31353e] text-white'
                  : 'bg-[#1c2028] text-[#b9cbbd] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Inventory Item List */}
        <div className="flex flex-col gap-2">
          {filteredInventory.map((item) => (
            <div
              key={item.id}
              className="bg-[#1c2028] p-3 rounded-2xl flex items-center justify-between border border-white/5"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[#262a33] flex items-center justify-center text-xl shrink-0">
                  {item.emoji}
                </div>
                <div className="flex flex-col min-w-0">
                  <h5 className="text-xs font-bold text-[#dfe2ee] font-display truncate">{item.name}</h5>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span
                      className={`font-semibold ${
                        item.expiresInDays === 0
                          ? 'text-[#ffb4ab]'
                          : item.expiresInDays <= 2
                          ? 'text-[#ffb86b]'
                          : 'text-[#b9cbbd]'
                      }`}
                    >
                      {item.expiresInDays === 0 ? 'Expires today' : `Expires in ${item.expiresInDays}d`}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#31353e]" />
                    <span className="text-[#b9cbbd] truncate">{item.location}</span>
                  </div>
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-2 bg-[#181c24] px-2 py-1 rounded-full border border-white/5 shrink-0">
                <button
                  onClick={() => onUpdateQuantity(item.id, -1)}
                  className="text-[#b9cbbd] hover:text-white w-6 h-6 flex items-center justify-center font-bold text-sm cursor-pointer"
                >
                  -
                </button>
                <span className="text-xs font-semibold text-[#dfe2ee] font-display min-w-[28px] text-center">
                  {item.quantity}{item.unit === 'g' ? 'g' : ''}
                </span>
                <button
                  onClick={() => onUpdateQuantity(item.id, 1)}
                  className="text-[#b9cbbd] hover:text-white w-6 h-6 flex items-center justify-center font-bold text-sm cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pantry Intelligence */}
      <section className="flex flex-col gap-2.5 mt-1">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#ffb86b] text-[20px]">psychology</span>
          <h3 className="text-base font-bold text-[#dfe2ee] font-display">Pantry Intelligence</h3>
        </div>

        {/* Negative Guardrail */}
        <div className="bg-[#262a33]/60 p-3 rounded-2xl flex items-start gap-3 border border-white/5">
          <span className="material-symbols-outlined text-[#ffb86b] text-[20px] mt-0.5">do_not_disturb_on</span>
          <div>
            <h5 className="text-xs font-bold text-[#dfe2ee] font-display">Avoid Buying: Eggs, Oats &amp; Basmati Rice</h5>
            <p className="text-[11px] text-[#b9cbbd] mt-0.5 leading-snug">
              Telemetry predicts adequate supplies to cover 4 days of meal macros. Buying more risks spoilage.
            </p>
          </div>
        </div>

        {/* Unlocking suggestion */}
        <div className="bg-[#1c2028] p-3 rounded-2xl flex items-center justify-between border border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#00f59b]/15 flex items-center justify-center text-[#00f59b]">
              <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
            </div>
            <div>
              <h5 className="text-xs font-bold text-[#dfe2ee] font-display">Unlock 4 Recipes with 2 items</h5>
              <p className="text-[11px] text-[#b9cbbd]">
                Recommended restock: <strong className="text-white">Chia Seeds</strong> &amp; <strong className="text-white">Lemons</strong>
              </p>
            </div>
          </div>
          <button
            onClick={() => onAskAi('Show me what recipes unlock with Chia Seeds and Lemons')}
            className="bg-[#262a33] hover:bg-[#31353e] text-[#00f59b] p-2 rounded-full transition-colors cursor-pointer"
            title="Add to Smart Cart"
          >
            <span className="material-symbols-outlined text-[18px]">playlist_add</span>
          </button>
        </div>
      </section>

      {/* Sticky Conversational AI Bar */}
      <section className="bg-[#262a33] rounded-2xl p-2.5 flex items-center gap-2 shadow-xl sticky bottom-20 z-30 border border-white/10">
        <div className="w-8 h-8 rounded-full bg-[#00f59b] flex items-center justify-center text-[#003920] shadow-[0_0_10px_rgba(0,245,155,0.4)] shrink-0">
          <span className="material-symbols-outlined text-[18px]">neurology</span>
        </div>
        <form onSubmit={handleSendPrompt} className="flex items-center w-full gap-2">
          <input
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            className="bg-transparent text-xs text-[#dfe2ee] placeholder:text-[#b9cbbd]/70 focus:outline-none w-full"
            placeholder="Ask AI: What can I cook in under 10 min?"
            type="text"
          />
          <button
            type="submit"
            className="bg-[#00f59b] hover:bg-[#00e38f] text-[#003920] p-1.5 rounded-full flex items-center justify-center active:scale-95 transition-transform shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </section>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0e16]/85 backdrop-blur-sm px-4">
          <div className="bg-[#1c2028] w-full max-w-sm rounded-3xl p-5 flex flex-col gap-4 shadow-2xl border border-white/10">
            <div className="flex justify-between items-center">
              <h4 className="text-base font-bold text-[#dfe2ee] font-display">Add Kitchen Ingredient</h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#b9cbbd] hover:text-white p-1 rounded-full cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddNewItem} className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-[#b9cbbd] mb-1 block">Item Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sourdough Loaf, Blueberries"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full bg-[#181c24] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f59b]"
                />
              </div>

              <div>
                <label className="text-xs text-[#b9cbbd] mb-1 block">Category</label>
                <select
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value as any)}
                  className="w-full bg-[#181c24] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f59b]"
                >
                  <option value="Produce">Produce</option>
                  <option value="Dairy & Protein">Dairy &amp; Protein</option>
                  <option value="Pantry Staples">Pantry Staples</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-[#b9cbbd] mb-1 block">Estimated Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={newItemQty}
                  onChange={(e) => setNewItemQty(e.target.value)}
                  className="w-full bg-[#181c24] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f59b]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setNewItemName('Greek Yogurt (200g)');
                    setNewItemCategory('Dairy & Protein');
                  }}
                  className="p-2 rounded-xl bg-[#262a33] text-[10px] text-center font-display hover:bg-[#31353e] cursor-pointer"
                >
                  🥛 Yogurt
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNewItemName('Avocados');
                    setNewItemCategory('Produce');
                  }}
                  className="p-2 rounded-xl bg-[#262a33] text-[10px] text-center font-display hover:bg-[#31353e] cursor-pointer"
                >
                  🥑 Avocado
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNewItemName('Almond Butter');
                    setNewItemCategory('Pantry Staples');
                  }}
                  className="p-2 rounded-xl bg-[#262a33] text-[10px] text-center font-display hover:bg-[#31353e] cursor-pointer"
                >
                  🥜 Nut Butter
                </button>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 rounded-full bg-[#00f59b] text-[#003920] font-bold font-display text-xs cursor-pointer shadow-md"
              >
                Save to Pantry
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Stats Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0e16]/85 backdrop-blur-sm px-4">
          <div className="bg-[#1c2028] w-full max-w-sm rounded-3xl p-5 flex flex-col gap-3 shadow-2xl border border-white/10">
            <div className="flex justify-between items-center">
              <h4 className="text-base font-bold text-[#dfe2ee] font-display">Zero-Waste Scorecard</h4>
              <button onClick={() => setShowStatsModal(false)} className="text-[#b9cbbd] hover:text-white p-1">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="bg-[#181c24] p-3 rounded-2xl flex justify-between">
                <span className="text-[#b9cbbd]">Weekly Rescued Items:</span>
                <span className="font-bold text-[#00f59b]">6 ingredients</span>
              </div>
              <div className="bg-[#181c24] p-3 rounded-2xl flex justify-between">
                <span className="text-[#b9cbbd]">Estimated Household Savings:</span>
                <span className="font-bold text-[#ffb86b]">₹380 ($4.60)</span>
              </div>
              <div className="bg-[#181c24] p-3 rounded-2xl flex justify-between">
                <span className="text-[#b9cbbd]">Landfill Methane Averted:</span>
                <span className="font-bold text-[#00f59b]">~1.8 kg CO₂e</span>
              </div>
            </div>
            <button
              onClick={() => setShowStatsModal(false)}
              className="w-full mt-1 py-2 rounded-full bg-[#262a33] text-[#dfe2ee] font-bold font-display text-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
