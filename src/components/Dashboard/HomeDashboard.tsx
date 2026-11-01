import React from 'react';
import {
  Crown,
  Flame,
  ArrowRight,
  Sparkles,
  BookOpen,
  Lightbulb,
  Bot,
  Calculator,
  Compass,
  Wallet,
  CheckCircle2,
  Lock,
  Play,
  Volume2,
  TrendingUp,
  Award,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ROADMAP_LEVELS } from '../../data/roadmapData';
import { BOOKS_LIBRARY } from '../../data/booksData';
import { BUSINESS_IDEAS } from '../../data/businessIdeasData';
import { DAILY_CHALLENGES } from '../../data/challengesData';

interface HomeDashboardProps {
  onNavigate: (tab: string, extraData?: any) => void;
  onSelectLesson: (lesson: any) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onNavigate,
  onSelectLesson,
}) => {
  const { user, playAudioTrack, adminConfig } = useApp();

  // Find next lesson to learn
  const allLessons = ROADMAP_LEVELS.flatMap((lvl) => lvl.lessons);
  const nextLesson =
    allLessons.find((l) => !user.completedLessons.includes(l.id)) || allLessons[0];

  const featuredBook = BOOKS_LIBRARY.find((b) => b.id === adminConfig.featuredBookId) || BOOKS_LIBRARY[0];
  const todayChallenge = DAILY_CHALLENGES.find((c) => c.day === (user.completedChallenges.length + 1)) || DAILY_CHALLENGES[0];

  const totalLessons = allLessons.length;
  const progressPercent = Math.round((user.completedLessons.length / totalLessons) * 100);

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-in fade-in duration-300">
      {/* Announcement Bar if set */}
      {adminConfig.announcementHindi && (
        <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/20 to-amber-500/10 border border-[#d4af37]/30 rounded-xl px-4 py-2 text-xs text-amber-300 flex items-center justify-between gap-2 shadow-sm">
          <div className="flex items-center gap-2 truncate">
            <Sparkles className="w-4 h-4 text-[#d4af37] shrink-0 animate-spin [animation-duration:12s]" />
            <span className="truncate">{adminConfig.announcementHindi}</span>
          </div>
          <button
            onClick={() => onNavigate('ai-guru')}
            className="text-[11px] underline font-bold hover:text-white shrink-0"
          >
            गुरुजी से पूछें
          </button>
        </div>
      )}

      {/* Hero Card */}
      <div className="relative rounded-3xl overflow-hidden border border-[#d4af37]/40 bg-gradient-to-br from-[#12151f] via-[#161a26] to-[#0a0c12] p-5 sm:p-7 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>भारत का #1 ज़मीनी बिजनेस लर्निंग ऐप</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
              ₹200 प्रतिदिन से <span className="gold-gradient-text">₹1 करोड़ की संपत्ति</span> बनाने तक का सफर।
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
              कोई लॉटरी या जादुई दावा नहीं। मजदूरी के साथ बचत, व्यावहारिक सेलिंग हुनर, छोटे बजट का व्यापार और 15 साल की चक्रवृद्धि (Compounding) योजना।
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onSelectLesson(nextLesson)}
                className="gold-gradient-bg text-black font-extrabold px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition flex items-center gap-2 text-sm"
              >
                <span>पढ़ाई जारी रखें</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('ai-guru')}
                className="bg-neutral-800/90 hover:bg-neutral-700 text-white font-semibold px-4 py-2.5 rounded-xl border border-neutral-700 transition flex items-center gap-2 text-sm"
              >
                <Bot className="w-4 h-4 text-[#d4af37]" />
                <span>AI बिजनेस गुरु से रोडमैप लें</span>
              </button>
            </div>
          </div>

          {/* User Fast Stats Card */}
          <div className="bg-[#0b0d14]/90 border border-neutral-800 rounded-2xl p-4 sm:p-5 shrink-0 w-full md:w-72 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div>
                <p className="text-xs text-neutral-400">आपकी वर्तमान आय</p>
                <p className="text-lg font-bold text-white">₹{user.dailyIncome} <span className="text-xs font-normal text-neutral-400">/ दिन</span></p>
              </div>
              <div className="text-right">
                <p className="text-xs text-neutral-400">उपलब्ध पूंजी</p>
                <p className="text-lg font-bold text-emerald-400">₹{user.availableCapital}</p>
              </div>
            </div>

            {/* Overall Roadmap Progress */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-neutral-400">12-लेवल रोडमैप प्रगति</span>
                <span className="text-amber-400 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-500"
                  style={{ width: `${Math.max(5, progressPercent)}%` }}
                />
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">
                {user.completedLessons.length} पाठ पूरे / {user.unlockedLevels.length} लेवल्स अनलॉक
              </p>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="flex items-center gap-1 text-orange-400 font-semibold">
                <Flame className="w-3.5 h-3.5 fill-current" /> {user.streakDays} दिन स्ट्रीक
              </span>
              <span className="flex items-center gap-1 text-yellow-300 font-semibold">
                <Award className="w-3.5 h-3.5" /> {user.points} अंक
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Gateways (Quick Access Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div
          onClick={() => onNavigate('roadmap')}
          className="dark-card dark-card-hover rounded-2xl p-4 cursor-pointer relative group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-[#d4af37] mb-3 group-hover:scale-110 transition">
            <Crown className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-sm mb-1">12-लेवल रोडमैप</h3>
          <p className="text-xs text-neutral-400 line-clamp-2">गरीबी की सोच से लेकर ₹1 करोड़ की नेटवर्थ तक</p>
        </div>

        <div
          onClick={() => onNavigate('ideas')}
          className="dark-card dark-card-hover rounded-2xl p-4 cursor-pointer relative group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-sm mb-1">50+ बिजनेस आइडिया</h3>
          <p className="text-xs text-neutral-400 line-clamp-2">₹0 से ₹5 लाख बजट के 100% व्यावहारिक व्यापार</p>
        </div>

        <div
          onClick={() => onNavigate('library')}
          className="dark-card dark-card-hover rounded-2xl p-4 cursor-pointer relative group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-110 transition">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-sm mb-1">1000+ पुस्तकें व ऑडियो</h3>
          <p className="text-xs text-neutral-400 line-clamp-2">20 श्रेणियों में दुनिया की सर्वश्रेष्ठ बिजनेस किताबें</p>
        </div>

        <div
          onClick={() => onNavigate('ai-guru')}
          className="dark-card dark-card-hover rounded-2xl p-4 cursor-pointer relative group border-[#d4af37]/30"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-black flex items-center justify-center mb-3 group-hover:scale-110 transition">
            <Bot className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-sm mb-1 flex items-center gap-1">
            AI बिजनेस गुरु
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </h3>
          <p className="text-xs text-neutral-400 line-clamp-2">आपकी स्थिति के अनुसार निजी बिजनेस सलाह</p>
        </div>
      </div>

      {/* Up Next Learning Card & Today's Challenge */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Next Lesson Card */}
        <div className="bg-[#10131b] border border-neutral-800 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] bg-[#d4af37]/10 px-2.5 py-1 rounded-md border border-[#d4af37]/20">
                अगला पाठ (Next Lesson)
              </span>
              <span className="text-xs text-neutral-400">
                लेवल {nextLesson.levelNumber}
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 leading-snug">
              {nextLesson.titleHi}
            </h3>
            <p className="text-xs text-neutral-300 line-clamp-2 mb-4">
              {nextLesson.summary}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-neutral-800/80">
            <span className="text-xs text-neutral-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> +50 लर्निंग प्वाइंट्स
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  playAudioTrack({
                    id: nextLesson.id,
                    title: nextLesson.titleHi,
                    subtitle: `लेवल ${nextLesson.levelNumber} ऑडियो पाठ`,
                    text: nextLesson.content.replace(/[#*`_]/g, ''),
                  })
                }
                className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[#d4af37] border border-neutral-700 transition"
                title="ऑडियो सुनें"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectLesson(nextLesson)}
                className="px-4 py-2 bg-[#d4af37] hover:bg-amber-400 text-black text-xs font-bold rounded-lg transition"
              >
                पाठ पढ़ें
              </button>
            </div>
          </div>
        </div>

        {/* Daily Action Challenge Card */}
        <div className="bg-[#10131b] border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-md border border-orange-500/20 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-current" /> आज का एक्शन टास्क (Day {todayChallenge.day})
              </span>
              <span className="text-xs font-semibold text-neutral-400">
                +{todayChallenge.pointsReward} अंक
              </span>
            </div>

            <h3 className="text-base font-bold text-white mb-2 leading-snug">
              {todayChallenge.title}
            </h3>
            <p className="text-xs text-neutral-300 line-clamp-2 mb-3">
              {todayChallenge.instruction}
            </p>
          </div>

          <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
            <span className="text-[11px] text-neutral-400 italic">
              "अनुशासन ही लक्ष्य को सच बनाता है"
            </span>
            <button
              onClick={() => onNavigate('challenges')}
              className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-lg border border-neutral-700 transition"
            >
              टास्क पूरा करें →
            </button>
          </div>
        </div>
      </div>

      {/* Featured Book of the Week */}
      <div className="bg-gradient-to-r from-neutral-900 via-[#131620] to-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5">
        <div className="w-24 h-32 rounded-xl bg-gradient-to-br from-amber-600 to-yellow-800 p-2 shrink-0 shadow-lg flex flex-col justify-between text-white text-center">
          <span className="text-[9px] uppercase tracking-wider bg-black/30 px-1 py-0.5 rounded">
            बेस्टसेलर
          </span>
          <span className="text-xs font-bold leading-tight font-serif">
            {featuredBook.titleHi.split('(')[0]}
          </span>
          <span className="text-[9px] text-amber-200 truncate">
            {featuredBook.authorHi}
          </span>
        </div>

        <div className="space-y-2 flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-xs font-semibold text-[#d4af37]">इस सप्ताह की विशेष पुस्तक</span>
            <span className="text-[11px] text-neutral-400">• {featuredBook.categoryHi}</span>
          </div>
          <h4 className="text-lg font-bold text-white">{featuredBook.titleHi}</h4>
          <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
            {featuredBook.introduction}
          </p>

          <div className="flex items-center justify-center sm:justify-start gap-3 pt-1">
            <button
              onClick={() => onNavigate('library', { bookId: featuredBook.id })}
              className="text-xs font-bold text-black bg-[#d4af37] hover:bg-amber-400 px-4 py-1.5 rounded-lg transition"
            >
              किताब का सारांश पढ़ें
            </button>
            <button
              onClick={() =>
                playAudioTrack({
                  id: featuredBook.id,
                  title: featuredBook.titleHi,
                  subtitle: featuredBook.authorHi,
                  text: featuredBook.audioScript,
                })
              }
              className="text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-700 transition flex items-center gap-1.5"
            >
              <Volume2 className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>ऑडियो सुनें</span>
            </button>
          </div>
        </div>
      </div>

      {/* Financial Reality Check / Compounding Sneak-peek */}
      <div className="bg-[#0e1118] border border-[#d4af37]/20 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-white text-base">
            गणित जो आपकी किस्मत बदल सकता है (Compounding Reality)
          </h3>
        </div>
        <p className="text-xs text-neutral-300 mb-4 leading-relaxed">
          यदि आप आज ₹200 रोज कमाते हैं और सिगरेट, गुटखा या फिजूलखर्च रोककर केवल <strong>₹40 प्रतिदिन (महीने का ₹1,200)</strong> बचाकर 12% वार्षिक रिटर्न पर निवेश करते हैं:
        </p>

        <div className="grid grid-cols-3 gap-2.5 text-center mb-4">
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3">
            <p className="text-[11px] text-neutral-400">3 साल में</p>
            <p className="text-sm sm:text-base font-bold text-white">₹52,000</p>
            <p className="text-[10px] text-amber-400">पहला पक्का बिजनेस फंड</p>
          </div>
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3">
            <p className="text-[11px] text-neutral-400">10 साल में</p>
            <p className="text-sm sm:text-base font-bold text-emerald-400">₹2,80,000</p>
            <p className="text-[10px] text-neutral-400">वित्तीय सुरक्षा ढाल</p>
          </div>
          <div className="bg-neutral-900/90 border border-amber-500/30 rounded-xl p-3 bg-amber-500/5">
            <p className="text-[11px] text-neutral-400">20 साल में</p>
            <p className="text-sm sm:text-base font-extrabold text-[#d4af37]">₹12,00,000+</p>
            <p className="text-[10px] text-amber-300">चक्रवृद्धि का जादू</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[11px] text-neutral-400 italic">
            *और जैसे-जैसे बिजनेस से आपकी बचत बढ़ेगी, आप 15 साल में ₹1 करोड़ का लक्ष्य छू सकते हैं।
          </p>
          <button
            onClick={() => onNavigate('calculators')}
            className="text-xs font-bold text-[#d4af37] hover:underline flex items-center gap-1"
          >
            <span>सभी 10 कैलकुलेटर देखें</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
