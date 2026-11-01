import React from 'react';
import { Compass, Sparkles, MapPin, TrendingUp, Quote, CheckCircle2 } from 'lucide-react';
import { SUCCESS_STORIES } from '../../data/storiesData';

export const SuccessStoriesView: React.FC = () => {
  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5 text-blue-400" />
          <span>सच्ची प्रेरणा: ज़मीन से शिखर तक</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          सफलता की असली कहानियां
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          ये वो भारतीय हैं जिन्होंने ₹150-₹200 की दैनिक मजदूरी से शुरुआत की और बिना किसी बड़ी सिफारिश या लॉटरी के करोड़ों का कारोबार खड़ा किया।
        </p>
      </div>

      {/* Stories Grid */}
      <div className="max-w-4xl mx-auto space-y-5">
        {SUCCESS_STORIES.map((story) => (
          <div
            key={story.id}
            className="bg-[#11141c] border border-neutral-800 hover:border-[#d4af37]/40 rounded-3xl p-5 sm:p-7 shadow-xl space-y-4 transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {story.name}
                </h3>
                <p className="text-xs text-neutral-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#d4af37]" /> {story.location}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-xl text-right">
                  <span className="text-[10px] text-neutral-400 block">शुरुआती आय</span>
                  <span className="text-xs font-bold text-red-400">{story.previousIncome}</span>
                </div>
                <div className="bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-right">
                  <span className="text-[10px] text-emerald-300 block">वर्तमान उपलब्धि</span>
                  <span className="text-xs sm:text-sm font-extrabold text-emerald-400">
                    {story.currentNetWorthOrTurnover}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                वर्तमान व्यवसाय: {story.currentBusiness}
              </span>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                {story.story}
              </p>
            </div>

            {/* Key Strategy Box */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3.5 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-white">सफलता की मुख्य रणनीति (Key Strategy):</span>
                <p className="text-xs text-neutral-300 mt-0.5">{story.keyStrategy}</p>
              </div>
            </div>

            {/* Quote */}
            <div className="border-l-2 border-[#d4af37] pl-3 italic text-xs sm:text-sm text-neutral-400">
              {story.quote}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
