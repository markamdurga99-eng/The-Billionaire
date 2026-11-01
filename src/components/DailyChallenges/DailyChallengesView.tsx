import React from 'react';
import {
  Flame,
  CheckCircle2,
  Calendar,
  Sparkles,
  Award,
  Check,
  Lock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DAILY_CHALLENGES } from '../../data/challengesData';

export const DailyChallengesView: React.FC = () => {
  const { user, completeChallenge } = useApp();

  const completedCount = user.completedChallenges.length;
  const progressPercent = Math.round((completedCount / DAILY_CHALLENGES.length) * 100);

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold">
          <Flame className="w-3.5 h-3.5 fill-current" />
          <span>30-दिवसीय दैनिक एक्शन प्लान (Daily Action Plan)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          दैनिक कर्म और चुनौतियां
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          बड़ा लक्ष्य रोज़ के छोटे-छोटे कार्यों से पूरा होता है। हर दिन केवल 15 मिनट का यह टास्क पूरा करें और अपनी जिंदगी बदलते देखें।
        </p>
      </div>

      {/* Streak & Progress Card */}
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#171b26] via-[#1a1f2e] to-[#12151e] border border-neutral-800 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 shrink-0">
            <Flame className="w-8 h-8 fill-current animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-extrabold text-white">
                {user.streakDays} दिन की स्ट्रीक
              </span>
              <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded font-bold">
                अटूट लगन
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              {completedCount} / 30 दिन के कार्य पूरे हो चुके हैं
            </p>
          </div>
        </div>

        <div className="w-full sm:w-64 space-y-1.5 text-right">
          <div className="flex justify-between text-xs text-neutral-400">
            <span>प्रगति (Progress)</span>
            <span className="text-[#d4af37] font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-300 transition-all duration-500"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Challenges List */}
      <div className="max-w-4xl mx-auto space-y-3.5">
        {DAILY_CHALLENGES.map((challenge) => {
          const isDone = user.completedChallenges.includes(challenge.day);
          const isCurrent =
            challenge.day === completedCount + 1 || (completedCount === 0 && challenge.day === 1);

          return (
            <div
              key={challenge.day}
              className={`rounded-2xl border p-4 sm:p-5 transition-all ${
                isDone
                  ? 'bg-neutral-900/60 border-neutral-800/80 opacity-90'
                  : isCurrent
                  ? 'bg-[#151926] border-[#d4af37] shadow-lg shadow-amber-500/10'
                  : 'bg-[#0f1118] border-neutral-900'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-extrabold px-2.5 py-1 rounded-md border ${
                      isDone
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : isCurrent
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-neutral-800 text-neutral-500 border-neutral-700'
                    }`}
                  >
                    DAY {challenge.day}
                  </span>
                  <span className="text-xs font-semibold text-neutral-400">
                    +{challenge.pointsReward} अंक
                  </span>
                </div>

                {isDone ? (
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    <Check className="w-3.5 h-3.5" /> पूर्ण हुआ
                  </span>
                ) : isCurrent ? (
                  <span className="text-xs text-amber-300 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 animate-pulse">
                    आज का कार्य
                  </span>
                ) : (
                  <span className="text-[11px] text-neutral-500">आने वाला दिन</span>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                {challenge.title}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 mb-3 leading-relaxed">
                {challenge.instruction}
              </p>

              {/* Practical Task Box */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3 mb-3">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  कार्य (Practical Task):
                </span>
                <p className="text-xs text-neutral-200">{challenge.practicalTask}</p>
              </div>

              {/* Financial Wisdom Quote */}
              <p className="text-[11px] text-neutral-400 italic mb-3">
                "{challenge.financialWisdom}"
              </p>

              {/* Action Button */}
              {!isDone && (
                <button
                  onClick={() => completeChallenge(challenge.day, challenge.pointsReward)}
                  className="px-4 py-2 bg-[#d4af37] text-black font-extrabold text-xs rounded-xl hover:bg-amber-400 transition flex items-center gap-1.5 shadow"
                >
                  <Check className="w-4 h-4" />
                  <span>मैंने यह कार्य कर लिया (+{challenge.pointsReward} अंक)</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
