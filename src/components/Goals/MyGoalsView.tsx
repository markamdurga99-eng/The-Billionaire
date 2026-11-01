import React, { useState } from 'react';
import { Target, Crown, CheckCircle2, Circle, Sparkles, Plus, Flag } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MyGoalsView: React.FC = () => {
  const { user } = useApp();

  const [milestones, setMilestones] = useState([
    {
      id: 'm-1',
      title: 'पहला ₹1,000: आपातकालीन ढाल',
      desc: 'किसी के आगे हाथ न फैलाना पड़े, इसलिए ₹20-₹40 रोज बचाकर ₹1,000 का सुरक्षा फंड बनाना।',
      targetAmount: 1000,
      currentAmount: Math.min(1000, user.availableCapital),
      isAchieved: user.availableCapital >= 1000,
      timeline: '1 से 2 महीने',
    },
    {
      id: 'm-2',
      title: 'पहला ₹5,000: बिजनेस का बीज',
      desc: 'बिना किसी ब्याज वाले कर्ज के अपना पहला छोटा साइड-बिजनेस (जैसे मसाले, चाय, बाइक वॉश) शुरू करने की पूंजी।',
      targetAmount: 5000,
      currentAmount: Math.min(5000, user.availableCapital),
      isAchieved: user.availableCapital >= 5000,
      timeline: '3 से 6 महीने',
    },
    {
      id: 'm-3',
      title: '₹20,000 मासिक शुद्ध लाभ',
      desc: 'मजदूरी से ऊपर उठकर अपनी खुद की दुकान या सर्विस से हर महीने ₹20,000 का पक्का शुद्ध लाभ कमाना।',
      targetAmount: 20000,
      currentAmount: 6000,
      isAchieved: false,
      timeline: '1 से 2 वर्ष',
    },
    {
      id: 'm-4',
      title: '₹10,00,000 की कुल संपत्ति (Net Worth)',
      desc: 'दुकान का स्थापित स्टॉक, जमीन/मकान और नियमित म्यूचुअल फंड एसआईपी के जरिए ₹10 लाख का मील का पत्थर।',
      targetAmount: 1000000,
      currentAmount: 150000,
      isAchieved: false,
      timeline: '5 से 7 वर्ष',
    },
    {
      id: 'm-5',
      title: '₹1,00,00,000 (एक करोड़): वित्तीय स्वतंत्रता',
      desc: '15 साल की निरंतर कंपाउंडिंग और व्यवसाय विस्तार के बाद आधिकारिक रूप से करोड़पति बनना।',
      targetAmount: 10000000,
      currentAmount: 250000,
      isAchieved: false,
      timeline: '12 से 15 वर्ष',
    },
  ]);

  const toggleMilestone = (id: string) => {
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, isAchieved: !m.isAchieved } : m
      )
    );
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Target className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>मेरे व्यक्तिगत लक्ष्य और मील के पत्थर</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          शून्य से ₹1 करोड़ के 5 मील के पत्थर
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          एक साथ ₹1 करोड़ नहीं बनते। इन 5 पड़ावों को एक-एक करके पार करें और वित्तीय आजादी हासिल करें।
        </p>
      </div>

      {/* Milestones Stack */}
      <div className="max-w-4xl mx-auto space-y-4">
        {milestones.map((m, idx) => {
          const percent = Math.min(
            100,
            Math.round((m.currentAmount / m.targetAmount) * 100)
          );

          return (
            <div
              key={m.id}
              className={`rounded-2xl border p-5 transition ${
                m.isAchieved
                  ? 'bg-neutral-900/90 border-emerald-500/40 shadow-emerald-500/5 shadow-lg'
                  : 'bg-[#11141c] border-neutral-800'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleMilestone(m.id)}
                    className="shrink-0"
                  >
                    {m.isAchieved ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <Circle className="w-6 h-6 text-neutral-500 hover:text-amber-400" />
                    )}
                  </button>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                      माइलस्टोन {idx + 1} • {m.timeline}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {m.title}
                    </h3>
                  </div>
                </div>

                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-md border ${
                    m.isAchieved
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                  }`}
                >
                  {m.isAchieved ? 'हासिल हुआ ✓' : `${percent}% प्रगति`}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 pl-9 mb-3 leading-relaxed">
                {m.desc}
              </p>

              <div className="pl-9 space-y-1">
                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      m.isAchieved
                        ? 'bg-emerald-400'
                        : 'bg-gradient-to-r from-amber-500 to-yellow-300'
                    }`}
                    style={{ width: `${m.isAchieved ? 100 : Math.max(5, percent)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
                  <span>वर्तमान: ₹{m.currentAmount.toLocaleString('en-IN')}</span>
                  <span>लक्ष्य: ₹{m.targetAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
