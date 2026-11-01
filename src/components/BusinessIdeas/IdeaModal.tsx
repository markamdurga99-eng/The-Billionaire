import React from 'react';
import {
  X,
  Bookmark,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Package,
  Users,
  Calendar,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import { BusinessIdea } from '../../types';
import { useApp } from '../../context/AppContext';

interface IdeaModalProps {
  idea: BusinessIdea;
  onClose: () => void;
}

export const IdeaModal: React.FC<IdeaModalProps> = ({ idea, onClose }) => {
  const { user, toggleSaveIdea } = useApp();
  const isSaved = user.savedIdeas.includes(idea.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#12151e] border border-neutral-700 rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-neutral-900 via-[#151924] to-neutral-900 border-b border-neutral-800 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {idea.budgetCategoryLabel} बजट
              </span>
              <span className="text-[10px] font-semibold text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
                उपयुक्त: {idea.suitableFor}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {idea.titleHi}
            </h2>
            <p className="text-xs text-neutral-400">{idea.title}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveIdea(idea.id)}
              className={`p-2 rounded-xl border transition ${
                isSaved
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                  : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white'
              }`}
              title="बिजनेस आइडिया सेव करें"
            >
              <Bookmark className="w-5 h-5 fill-current" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-neutral-800 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Financial Highlights */}
        <div className="grid grid-cols-3 gap-2 px-5 py-3 bg-[#0d1016] border-b border-neutral-800 text-center">
          <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800">
            <p className="text-[10px] text-neutral-400">शुरुआती लागत</p>
            <p className="text-xs sm:text-sm font-bold text-white">
              ₹{idea.startCostMin} - ₹{idea.startCostMax}
            </p>
          </div>
          <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800">
            <p className="text-[10px] text-neutral-400">अनुमानित मासिक लाभ</p>
            <p className="text-xs sm:text-sm font-bold text-emerald-400">
              {idea.estimatedMonthlyProfit}
            </p>
          </div>
          <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800">
            <p className="text-[10px] text-neutral-400">दैनिक कमाई</p>
            <p className="text-xs sm:text-sm font-bold text-[#d4af37]">
              {idea.dailyEarningEstimate}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-sm text-neutral-200">
          {/* Required Items */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5" /> आवश्यक सामान व सामग्री (Required Equipment)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {idea.requiredItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-900 p-2.5 rounded-xl border border-neutral-800 text-xs text-neutral-200 flex items-center gap-2"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Customers & Selling Method */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-neutral-900/90 p-4 rounded-xl border border-neutral-800 space-y-1.5">
              <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-400" /> संभावित ग्राहक (Target Customers)
              </h5>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {idea.potentialCustomers}
              </p>
            </div>

            <div className="bg-neutral-900/90 p-4 rounded-xl border border-neutral-800 space-y-1.5">
              <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> बिक्री का तरीका (Selling Method)
              </h5>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {idea.sellingMethod}
              </p>
            </div>
          </div>

          {/* Risk & Mitigation */}
          <div className="bg-red-950/20 border border-red-500/30 p-4 rounded-xl space-y-2">
            <h5 className="text-xs font-bold text-red-400 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" /> संभावित जोखिम और बचने का तरीका (Risks & Mitigation)
            </h5>
            <div className="text-xs text-neutral-300 space-y-1">
              <p><strong>जोखिम:</strong> {idea.potentialRisks.join(', ')}</p>
              <p className="text-emerald-300"><strong>सुरक्षा उपाय:</strong> {idea.riskMitigation}</p>
            </div>
          </div>

          {/* 30-Day Launch Roadmap */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> 30-दिन का शुरुआती रोडमैप (30-Day Launch Plan)
            </h4>
            <div className="space-y-2">
              {idea.thirtyDayRoadmap.map((w, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-900/90 border border-neutral-800 p-3 rounded-xl space-y-1"
                >
                  <span className="text-[11px] font-bold text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded">
                    {w.week}
                  </span>
                  <ul className="text-xs text-neutral-300 list-disc pl-5 space-y-0.5 pt-1">
                    {w.tasks.map((task, tIdx) => (
                      <li key={tIdx}>{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 bg-[#151924] flex items-center justify-between">
          <p className="text-xs text-neutral-400">
            मासिक परिचालन खर्च: <strong className="text-white">₹{idea.monthlyOperatingExpenses}</strong>
          </p>
          <button
            onClick={() => {
              toggleSaveIdea(idea.id);
              onClose();
            }}
            className="px-4 py-2 bg-[#d4af37] text-black font-bold text-xs rounded-xl hover:bg-amber-400 transition"
          >
            {isSaved ? 'सेव हो चुका है ✓' : 'यह आइडिया सेव करें'}
          </button>
        </div>
      </div>
    </div>
  );
};
