import React, { useState } from 'react';
import {
  Lightbulb,
  Search,
  Filter,
  Bookmark,
  TrendingUp,
  Package,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BusinessIdea } from '../../types';
import { IdeaModal } from './IdeaModal';

export const BusinessIdeasView: React.FC = () => {
  const { businessIdeas, user, toggleSaveIdea } = useApp();
  const [selectedBudget, setSelectedBudget] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSuitability, setSelectedSuitability] = useState<string>('all');
  const [selectedIdea, setSelectedIdea] = useState<BusinessIdea | null>(null);

  const budgetSlabs = [
    { id: 'all', label: 'सभी बजट' },
    { id: '0-1000', label: '₹0 से ₹1,000' },
    { id: '1000-5000', label: '₹1,000 से ₹5,000' },
    { id: '5000-10000', label: '₹5,000 से ₹10,000' },
    { id: '10000-25000', label: '₹10,000 से ₹25,000' },
    { id: '25000-50000', label: '₹25,000 से ₹50,000' },
    { id: '50000-100000', label: '₹50,000 से ₹1 लाख' },
    { id: '100000-500000', label: '₹1 लाख से ₹5 लाख' },
  ];

  const suitabilityOptions = [
    { id: 'all', label: 'सभी के लिए' },
    { id: 'गांव और देहात', label: 'गांव और देहात' },
    { id: 'कस्बा व शहर', label: 'कस्बा व शहर' },
    { id: 'महिलाएं व गृहणियां', label: 'महिलाएं' },
    { id: 'दुकानदार', label: 'दुकानदार' },
  ];

  const filteredIdeas = businessIdeas.filter((idea) => {
    const matchesBudget =
      selectedBudget === 'all' || idea.budgetCategory === selectedBudget;
    const matchesSuitability =
      selectedSuitability === 'all' || idea.suitableFor === selectedSuitability;
    const matchesSearch =
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.titleHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.potentialCustomers.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesBudget && matchesSuitability && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>कम बजट के 50+ ज़मीनी व्यापार आइडिया</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          बिजनेस आइडिया जनरेटर
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          अपनी जेब और बचत के अनुसार सही व्यापार चुनें। हर आइडिया में शुरुआती सामान, संभावित ग्राहक, जोखिम और 30-दिन का लॉन्च प्लान शामिल है।
        </p>
      </div>

      {/* Search & Filters */}
      <div className="max-w-4xl mx-auto space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="बिजनेस या सेवा का नाम खोजें (उदा. चाय, बाइक धुलाई, किराना, मसाले)..."
            className="w-full bg-[#11141b] border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        {/* Budget Slabs Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          {budgetSlabs.map((slab) => (
            <button
              key={slab.id}
              onClick={() => setSelectedBudget(slab.id)}
              className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition border ${
                selectedBudget === slab.id
                  ? 'bg-emerald-500 text-black border-emerald-400 font-bold shadow-sm'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
            >
              {slab.label}
            </button>
          ))}
        </div>

        {/* Suitability Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-[11px] text-neutral-500 shrink-0 font-medium">क्षेत्र / वर्ग:</span>
          {suitabilityOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedSuitability(opt.id)}
              className={`px-2.5 py-1 rounded-lg text-xs transition border ${
                selectedSuitability === opt.id
                  ? 'bg-neutral-800 text-amber-400 border-amber-500/40 font-semibold'
                  : 'bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:text-neutral-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ideas Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIdeas.map((idea) => {
          const isSaved = user.savedIdeas.includes(idea.id);

          return (
            <div
              key={idea.id}
              className="bg-[#10131b] border border-neutral-800 hover:border-[#d4af37]/40 rounded-2xl p-4 flex flex-col justify-between transition-all hover:-translate-y-1 shadow-lg group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {idea.budgetCategoryLabel}
                  </span>
                  <button
                    onClick={() => toggleSaveIdea(idea.id)}
                    className={`p-1.5 rounded-lg border transition shrink-0 ${
                      isSaved
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-500 hover:text-white'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>

                <h3 className="font-bold text-white text-base leading-snug group-hover:text-amber-300 transition mb-1">
                  {idea.titleHi}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-1 mb-3">
                  {idea.title}
                </p>

                {/* Micro Stats */}
                <div className="grid grid-cols-2 gap-2 bg-neutral-900/90 p-2.5 rounded-xl border border-neutral-800 mb-3 text-center">
                  <div>
                    <span className="text-[10px] text-neutral-400 block">दैनिक कमाई</span>
                    <span className="text-xs font-bold text-[#d4af37]">
                      {idea.dailyEarningEstimate}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block">मासिक लाभ</span>
                    <span className="text-xs font-bold text-emerald-400">
                      {idea.estimatedMonthlyProfit}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 line-clamp-2 mb-3">
                  <strong>ग्राहक:</strong> {idea.potentialCustomers}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                <span className="text-[10.5px] text-neutral-400">
                  लागत: <strong>₹{idea.startCostMin} - ₹{idea.startCostMax}</strong>
                </span>
                <button
                  onClick={() => setSelectedIdea(idea)}
                  className="px-3.5 py-1.5 bg-[#d4af37] text-black font-bold text-xs rounded-lg hover:bg-amber-400 transition flex items-center gap-1"
                >
                  <span>पूरी योजना देखें</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredIdeas.length === 0 && (
        <div className="text-center py-12 text-neutral-400">
          <Lightbulb className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
          <p className="text-sm font-semibold">कोई बिजनेस आइडिया नहीं मिला।</p>
          <p className="text-xs mt-1">कृपया बजट फिल्टर रीसेट करें।</p>
        </div>
      )}

      {selectedIdea && (
        <IdeaModal idea={selectedIdea} onClose={() => setSelectedIdea(null)} />
      )}
    </div>
  );
};
