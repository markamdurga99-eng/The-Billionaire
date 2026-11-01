import React from 'react';
import {
  Award,
  Flame,
  Crown,
  CheckCircle2,
  Lock,
  Sparkles,
  Printer,
  Download,
  Share2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ROADMAP_LEVELS } from '../../data/roadmapData';

export const MyProgressView: React.FC = () => {
  const { user } = useApp();

  const allLessons = ROADMAP_LEVELS.flatMap((l) => l.lessons);
  const totalLessons = allLessons.length;
  const completedLessonsCount = user.completedLessons.length;
  const progressPercent = Math.round((completedLessonsCount / totalLessons) * 100);

  const allBadges = [
    {
      id: 'badge-first-step',
      titleHi: 'पहला कदम',
      desc: 'गरीबी की सोच त्यागकर सीखने का पहला कदम उठाया',
      icon: 'Footprints',
    },
    {
      id: 'badge-streak-3',
      titleHi: 'अनुशासित साधक',
      desc: 'लगातार 3 दिन तक बिजनेस की पढ़ाई पूरी की',
      icon: 'Flame',
    },
    {
      id: 'badge-first-quiz',
      titleHi: 'सच्चा विद्यार्थी',
      desc: 'पहला वित्तीय टेस्ट 100% सही उत्तरों के साथ पास किया',
      icon: 'Award',
    },
    {
      id: 'badge-business-plan',
      titleHi: 'नन्हा उद्यमी',
      desc: 'पहला बिजनेस आइडिया चुना और यूनिट इकोनॉमिक्स समझी',
      icon: 'Rocket',
    },
    {
      id: 'badge-crore-vision',
      titleHi: 'करोड़पति विजन',
      desc: '15 साल का ₹1 करोड़ का रोडमैप पूरा समझा',
      icon: 'Crown',
    },
  ];

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-xs font-semibold">
          <Award className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>मेरी प्रगति, उपलब्धियां और बैज (Gamification)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          मेरी सीखने की यात्रा
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          हर पाठ, हर टेस्ट और हर बचत आपको वित्तीय स्वतंत्रता के एक कदम और करीब ले जाती है।
        </p>
      </div>

      {/* Hero Stats */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-[#11141c] border border-neutral-800 rounded-2xl p-5 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-2">
            <Flame className="w-7 h-7 fill-current animate-pulse" />
          </div>
          <span className="text-xs text-neutral-400">दैनिक स्ट्रीक</span>
          <p className="text-2xl font-extrabold text-white">{user.streakDays} दिन</p>
        </div>

        <div className="bg-[#11141c] border border-neutral-800 rounded-2xl p-5 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 text-yellow-300 flex items-center justify-center mb-2">
            <Award className="w-7 h-7" />
          </div>
          <span className="text-xs text-neutral-400">कुल लर्निंग प्वाइंट्स</span>
          <p className="text-2xl font-extrabold text-[#d4af37]">{user.points} अंक</p>
        </div>

        <div className="bg-[#11141c] border border-neutral-800 rounded-2xl p-5 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
            <Crown className="w-7 h-7" />
          </div>
          <span className="text-xs text-neutral-400">अनलॉक लेवल्स</span>
          <p className="text-2xl font-extrabold text-white">{user.unlockedLevels.length} / 12</p>
        </div>
      </div>

      {/* Badges Collection */}
      <div className="max-w-4xl mx-auto bg-[#11141c] border border-neutral-800 rounded-3xl p-5 sm:p-7 space-y-4">
        <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#d4af37]" />
          <span>सफलता के बैज (Achievement Badges)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {allBadges.map((badge) => {
            const isEarned = user.badges.some((b) => b.id === badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition ${
                  isEarned
                    ? 'bg-neutral-900/90 border-[#d4af37]/40 shadow'
                    : 'bg-neutral-950/40 border-neutral-800/60 opacity-50'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                      isEarned
                        ? 'bg-gradient-to-tr from-amber-500 to-yellow-300 text-black shadow-md shadow-amber-500/20'
                        : 'bg-neutral-800 text-neutral-600'
                    }`}
                  >
                    {isEarned ? <Award className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                  </div>

                  {isEarned ? (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      अर्जित ✓
                    </span>
                  ) : (
                    <span className="text-[10px] text-neutral-500 bg-neutral-900 px-2 py-0.5 rounded">
                      अनलॉक होना बाकी
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-white">{badge.titleHi}</h4>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  {badge.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificate Preview Card */}
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#121622] via-[#161a29] to-[#0e111a] border-2 border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Crown className="w-48 h-48 text-[#d4af37]" />
        </div>

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-black flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30">
          <Crown className="w-9 h-9" />
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#d4af37]">
            ZERO TO CROREPATI • आधिकारिक वित्तीय साक्षरता प्रमाण
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            उद्यमी प्रगति प्रमाण पत्र
          </h2>
          <p className="text-xs text-neutral-300 max-w-lg mx-auto">
            यह प्रमाणित करता है कि <strong>{user.name}</strong> ने शून्य से बिजनेस शुरू करने के 12-लेवल रोडमैप पर निरंतर अध्ययन और दैनिक बचत का अनुशासित अभ्यास किया है।
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-3 text-xs text-neutral-300 border-t border-neutral-800 max-w-md mx-auto">
          <div>
            <span className="text-neutral-500 block text-[10px]">सक्रिय स्ट्रीक</span>
            <strong className="text-orange-400">{user.streakDays} दिन</strong>
          </div>
          <div>
            <span className="text-neutral-500 block text-[10px]">पूरे किए गए पाठ</span>
            <strong className="text-white">{completedLessonsCount} पाठ</strong>
          </div>
          <div>
            <span className="text-neutral-500 block text-[10px]">अर्जित अंक</span>
            <strong className="text-amber-300">{user.points} अंक</strong>
          </div>
        </div>

        <div className="pt-2 flex justify-center">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-xl border border-neutral-700 transition flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-[#d4af37]" />
            <span>प्रगति रिपोर्ट प्रिंट / सेव करें</span>
          </button>
        </div>
      </div>
    </div>
  );
};
