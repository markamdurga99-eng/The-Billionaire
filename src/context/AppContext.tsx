import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  Badge,
  KhataTransaction,
  AudioPlaybackState,
  UserTier,
  BookSummary,
  BusinessIdea,
} from '../types';
import { BOOKS_LIBRARY } from '../data/booksData';
import { BUSINESS_IDEAS } from '../data/businessIdeasData';
import { ROADMAP_LEVELS } from '../data/roadmapData';

const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-first-step',
    title: 'First Step',
    titleHi: 'पहला कदम',
    description: 'Began the journey from ₹200/day to Crorepati',
    descriptionHi: 'गरीबी की सोच त्यागकर सीखने का पहला कदम उठाया',
    icon: 'Footprints',
    earnedAt: new Date().toISOString(),
    criteria: 'ऐप में पहला पाठ शुरू करने पर',
  },
  {
    id: 'badge-streak-3',
    title: 'Discipline Seeker',
    titleHi: 'अनुशासित साधक',
    description: 'Maintained a 3-day learning streak',
    descriptionHi: 'लगातार 3 दिन तक बिजनेस की पढ़ाई पूरी की',
    icon: 'Flame',
    earnedAt: new Date().toISOString(),
    criteria: '3 दिन की लगातार स्ट्रीक बनाने पर',
  },
  {
    id: 'badge-first-quiz',
    title: 'Knowledge Tester',
    titleHi: 'सच्चा विद्यार्थी',
    description: 'Passed the first financial literacy test',
    descriptionHi: 'पहला वित्तीय टेस्ट 100% सही उत्तरों के साथ पास किया',
    icon: 'Award',
    criteria: 'पहला क्विज पास करने पर',
  },
  {
    id: 'badge-business-plan',
    title: 'Budding Entrepreneur',
    titleHi: 'नन्हा उद्यमी',
    description: 'Selected the first business idea and calculated profit',
    descriptionHi: 'पहला बिजनेस आइडिया चुना और यूनिट इकोनॉमिक्स समझी',
    icon: 'Rocket',
    criteria: 'पहला बिजनेस आइडिया सेव करने पर',
  },
  {
    id: 'badge-crore-vision',
    title: 'Crorepati Visionary',
    titleHi: 'करोड़पति विजन',
    description: 'Unlocked level 12 and calculated 15-year net worth plan',
    descriptionHi: '15 साल का ₹1 करोड़ का रोडमैप पूरा समझा',
    icon: 'Crown',
    criteria: 'लेवल 12 तक पहुंचने पर',
  },
];

const DEFAULT_USER: UserProfile = {
  id: 'usr_default_1',
  name: 'रामकुमार जी (Ramkumar)',
  phoneOrEmail: '+91 98765 43210',
  dailyIncome: 200,
  currentOccupation: 'दैनिक निर्माण मजदूर (Daily Wage Worker)',
  cityOrVillage: 'कस्बा बिलसंडा',
  state: 'उत्तर प्रदेश (Uttar Pradesh)',
  availableCapital: 1000,
  tier: 'free',
  streakDays: 3,
  lastActiveDate: new Date().toISOString(),
  points: 240,
  completedLessons: ['l1-1'],
  completedChallenges: [1, 2],
  unlockedLevels: [1, 2],
  badges: INITIAL_BADGES.slice(0, 2),
  savedIdeas: ['idea-1', 'idea-6'],
  bookmarkedBooks: ['book-1', 'book-2'],
  isAdmin: false,
};

interface AdminConfig {
  freeTierLabel: string;
  premiumTierPriceYearly: number;
  proTierPriceYearly: number;
  featuredBookId: string;
  announcementHindi: string;
}

interface AppContextType {
  user: UserProfile;
  books: BookSummary[];
  businessIdeas: BusinessIdea[];
  khataTransactions: KhataTransaction[];
  audioState: AudioPlaybackState;
  adminConfig: AdminConfig;
  updateUser: (updates: Partial<UserProfile>) => void;
  completeLesson: (lessonId: string, levelNumber: number) => void;
  completeChallenge: (day: number, points: number) => void;
  toggleBookmarkBook: (bookId: string) => void;
  toggleSaveIdea: (ideaId: string) => void;
  addKhataTransaction: (t: Omit<KhataTransaction, 'id' | 'date'>) => void;
  deleteKhataTransaction: (id: string) => void;
  setUserTier: (tier: UserTier) => void;
  // Audio Player Controls
  playAudioTrack: (params: { id: string; title: string; subtitle: string; text: string }) => void;
  pauseAudio: () => void;
  resumeAudio: () => void;
  stopAudio: () => void;
  seekAudio: (secondsDelta: number) => void;
  setAudioPlaybackRate: (rate: number) => void;
  // Admin Operations
  adminAddBook: (newBook: BookSummary) => void;
  adminAddBusinessIdea: (newIdea: BusinessIdea) => void;
  updateAdminConfig: (newConfig: Partial<AdminConfig>) => void;
  toggleAdminMode: () => void;
  resetAllProgress: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load User from LocalStorage
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('ztc_user_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_USER;
  });

  // Books (Built-in + Admin added)
  const [books, setBooks] = useState<BookSummary[]>(() => {
    try {
      const saved = localStorage.getItem('ztc_custom_books');
      if (saved) {
        const custom = JSON.parse(saved);
        return [...BOOKS_LIBRARY, ...custom];
      }
    } catch (e) {
      console.error(e);
    }
    return BOOKS_LIBRARY;
  });

  // Business Ideas (Built-in + Admin added)
  const [businessIdeas, setBusinessIdeas] = useState<BusinessIdea[]>(() => {
    try {
      const saved = localStorage.getItem('ztc_custom_ideas');
      if (saved) {
        const custom = JSON.parse(saved);
        return [...BUSINESS_IDEAS, ...custom];
      }
    } catch (e) {
      console.error(e);
    }
    return BUSINESS_IDEAS;
  });

  // Khata Bahi Transactions
  const [khataTransactions, setKhataTransactions] = useState<KhataTransaction[]>(() => {
    try {
      const saved = localStorage.getItem('ztc_khata_txs');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'tx-1',
        date: new Date(Date.now() - 86400000 * 2).toLocaleDateString('hi-IN'),
        type: 'income',
        amount: 200,
        category: 'दैनिक मजदूरी',
        note: 'दिन भर की मजदूरी मिली',
      },
      {
        id: 'tx-2',
        date: new Date(Date.now() - 86400000 * 2).toLocaleDateString('hi-IN'),
        type: 'expense',
        amount: 140,
        category: 'आटा व दाल राशन',
        note: 'घर का अनिवार्य भोजन',
      },
      {
        id: 'tx-3',
        date: new Date(Date.now() - 86400000 * 2).toLocaleDateString('hi-IN'),
        type: 'savings',
        amount: 40,
        category: 'बिजनेस पूंजी गुल्लक',
        note: 'पहले व्यापार के लिए बचत',
      },
      {
        id: 'tx-4',
        date: new Date(Date.now() - 86400000 * 1).toLocaleDateString('hi-IN'),
        type: 'income',
        amount: 250,
        category: 'मजदूरी + ओवर-टाइम',
        note: '2 घंटे अतिरिक्त काम का पैसा',
      },
      {
        id: 'tx-5',
        date: new Date(Date.now() - 86400000 * 1).toLocaleDateString('hi-IN'),
        type: 'savings',
        amount: 60,
        category: 'बिजनेस पूंजी गुल्लक',
        note: 'गुल्लक में जमा',
      },
    ];
  });

  // Admin Config
  const [adminConfig, setAdminConfig] = useState<AdminConfig>(() => {
    try {
      const saved = localStorage.getItem('ztc_admin_config');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      freeTierLabel: 'मुफ्त (Free)',
      premiumTierPriceYearly: 199,
      proTierPriceYearly: 499,
      featuredBookId: 'book-1',
      announcementHindi: 'विशेष सूचना: हर रविवार को लाइव बिजनेस गुरु सत्र ऐप में उपलब्ध रहेगा।',
    };
  });

  // Audio Playback State
  const [audioState, setAudioState] = useState<AudioPlaybackState>({
    isPlaying: false,
    trackId: null,
    trackTitle: '',
    trackSubtitle: '',
    textToSpeak: '',
    playbackRate: 1.0,
    currentTime: 0,
    duration: 300,
    isSynthesizing: false,
    history: [],
  });

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('ztc_user_profile', JSON.stringify(user));
    } catch (e) {}
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('ztc_khata_txs', JSON.stringify(khataTransactions));
    } catch (e) {}
  }, [khataTransactions]);

  useEffect(() => {
    try {
      localStorage.setItem('ztc_admin_config', JSON.stringify(adminConfig));
    } catch (e) {}
  }, [adminConfig]);

  // SpeechSynthesis Web API integration for pristine Hindi Voice
  useEffect(() => {
    let intervalId: any = null;

    if (audioState.isPlaying) {
      intervalId = setInterval(() => {
        setAudioState((prev) => {
          if (!prev.isPlaying) return prev;
          if (prev.currentTime >= prev.duration) {
            window.speechSynthesis?.cancel();
            return { ...prev, isPlaying: false, currentTime: 0 };
          }
          return { ...prev, currentTime: prev.currentTime + 1 };
        });
      }, 1000);
    } else {
      if (intervalId) clearInterval(intervalId);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [audioState.isPlaying, audioState.duration]);

  // Audio Controls with SpeechSynthesis
  const playAudioTrack = ({
    id,
    title,
    subtitle,
    text,
  }: {
    id: string;
    title: string;
    subtitle: string;
    text: string;
  }) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = audioState.playbackRate;
      utterance.pitch = 1.0;

      // Detect Indian Hindi voice or Hindi language
      const voices = window.speechSynthesis.getVoices();
      const hindiVoice = voices.find(
        (v) => v.lang.includes('hi') || v.lang.includes('IN') || v.name.includes('Hindi')
      );
      if (hindiVoice) {
        utterance.voice = hindiVoice;
      }
      utterance.lang = 'hi-IN';

      utterance.onend = () => {
        setAudioState((prev) => ({ ...prev, isPlaying: false, currentTime: 0 }));
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis note:', e);
      };

      window.speechSynthesis.speak(utterance);
    }

    // Estimate duration: ~130 words per minute
    const words = text.split(/\s+/).length;
    const estSeconds = Math.max(60, Math.round((words / 130) * 60));

    setAudioState((prev) => ({
      ...prev,
      isPlaying: true,
      trackId: id,
      trackTitle: title,
      trackSubtitle: subtitle,
      textToSpeak: text,
      currentTime: 0,
      duration: estSeconds,
      history: prev.history.includes(id) ? prev.history : [id, ...prev.history],
    }));
  };

  const pauseAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
    setAudioState((prev) => ({ ...prev, isPlaying: false }));
  };

  const resumeAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else if (audioState.textToSpeak) {
        // restart with current rate
        const utterance = new SpeechSynthesisUtterance(audioState.textToSpeak);
        utterance.rate = audioState.playbackRate;
        utterance.lang = 'hi-IN';
        window.speechSynthesis.speak(utterance);
      }
    }
    setAudioState((prev) => ({ ...prev, isPlaying: true }));
  };

  const stopAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setAudioState((prev) => ({
      ...prev,
      isPlaying: false,
      currentTime: 0,
    }));
  };

  const seekAudio = (secondsDelta: number) => {
    setAudioState((prev) => {
      const nextTime = Math.max(0, Math.min(prev.duration, prev.currentTime + secondsDelta));
      return { ...prev, currentTime: nextTime };
    });
  };

  const setAudioPlaybackRate = (rate: number) => {
    setAudioState((prev) => ({ ...prev, playbackRate: rate }));
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (audioState.isPlaying) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(audioState.textToSpeak);
        utterance.rate = rate;
        utterance.lang = 'hi-IN';
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const completeLesson = (lessonId: string, levelNumber: number) => {
    setUser((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;

      const newCompleted = [...prev.completedLessons, lessonId];
      const newPoints = prev.points + 50;

      // Check if next level should be unlocked
      const nextLevel = levelNumber + 1;
      const newUnlocked = prev.unlockedLevels.includes(nextLevel)
        ? prev.unlockedLevels
        : [...prev.unlockedLevels, nextLevel];

      // Check badge unlocks
      const newBadges = [...prev.badges];
      if (newCompleted.length >= 3 && !newBadges.some((b) => b.id === 'badge-first-quiz')) {
        const found = INITIAL_BADGES.find((b) => b.id === 'badge-first-quiz');
        if (found) newBadges.push({ ...found, earnedAt: new Date().toISOString() });
      }
      if (newUnlocked.includes(12) && !newBadges.some((b) => b.id === 'badge-crore-vision')) {
        const found = INITIAL_BADGES.find((b) => b.id === 'badge-crore-vision');
        if (found) newBadges.push({ ...found, earnedAt: new Date().toISOString() });
      }

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#f3c642', '#ffffff'],
        });
      } catch (e) {}

      return {
        ...prev,
        completedLessons: newCompleted,
        points: newPoints,
        unlockedLevels: newUnlocked,
        badges: newBadges,
      };
    });
  };

  const completeChallenge = (day: number, pointsReward: number) => {
    setUser((prev) => {
      if (prev.completedChallenges.includes(day)) return prev;

      const newChallenges = [...prev.completedChallenges, day];
      const newPoints = prev.points + pointsReward;
      const newStreak = prev.streakDays + 1;

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#ff8c00', '#10b981'],
        });
      } catch (e) {}

      return {
        ...prev,
        completedChallenges: newChallenges,
        points: newPoints,
        streakDays: newStreak,
      };
    });
  };

  const toggleBookmarkBook = (bookId: string) => {
    setUser((prev) => {
      const exists = prev.bookmarkedBooks.includes(bookId);
      return {
        ...prev,
        bookmarkedBooks: exists
          ? prev.bookmarkedBooks.filter((id) => id !== bookId)
          : [...prev.bookmarkedBooks, bookId],
      };
    });
  };

  const toggleSaveIdea = (ideaId: string) => {
    setUser((prev) => {
      const exists = prev.savedIdeas.includes(ideaId);
      const newSaved = exists
        ? prev.savedIdeas.filter((id) => id !== ideaId)
        : [...prev.savedIdeas, ideaId];

      const newBadges = [...prev.badges];
      if (newSaved.length > 0 && !newBadges.some((b) => b.id === 'badge-business-plan')) {
        const found = INITIAL_BADGES.find((b) => b.id === 'badge-business-plan');
        if (found) newBadges.push({ ...found, earnedAt: new Date().toISOString() });
      }

      return {
        ...prev,
        savedIdeas: newSaved,
        badges: newBadges,
      };
    });
  };

  const addKhataTransaction = (t: Omit<KhataTransaction, 'id' | 'date'>) => {
    const newTx: KhataTransaction = {
      ...t,
      id: 'tx-' + Date.now(),
      date: new Date().toLocaleDateString('hi-IN'),
    };
    setKhataTransactions((prev) => [newTx, ...prev]);
    // Reward points for bookkeeping
    setUser((prev) => ({ ...prev, points: prev.points + 20 }));
  };

  const deleteKhataTransaction = (id: string) => {
    setKhataTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const setUserTier = (tier: UserTier) => {
    setUser((prev) => ({ ...prev, tier }));
  };

  const adminAddBook = (newBook: BookSummary) => {
    setBooks((prev) => {
      const updated = [newBook, ...prev];
      try {
        const customOnly = updated.filter((b) => !BOOKS_LIBRARY.some((bl) => bl.id === b.id));
        localStorage.setItem('ztc_custom_books', JSON.stringify(customOnly));
      } catch (e) {}
      return updated;
    });
  };

  const adminAddBusinessIdea = (newIdea: BusinessIdea) => {
    setBusinessIdeas((prev) => {
      const updated = [newIdea, ...prev];
      try {
        const customOnly = updated.filter((i) => !BUSINESS_IDEAS.some((bi) => bi.id === i.id));
        localStorage.setItem('ztc_custom_ideas', JSON.stringify(customOnly));
      } catch (e) {}
      return updated;
    });
  };

  const updateAdminConfig = (newConfig: Partial<AdminConfig>) => {
    setAdminConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const toggleAdminMode = () => {
    setUser((prev) => ({ ...prev, isAdmin: !prev.isAdmin }));
  };

  const resetAllProgress = () => {
    setUser(DEFAULT_USER);
    localStorage.removeItem('ztc_user_profile');
    localStorage.removeItem('ztc_khata_txs');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        books,
        businessIdeas,
        khataTransactions,
        audioState,
        adminConfig,
        updateUser,
        completeLesson,
        completeChallenge,
        toggleBookmarkBook,
        toggleSaveIdea,
        addKhataTransaction,
        deleteKhataTransaction,
        setUserTier,
        playAudioTrack,
        pauseAudio,
        resumeAudio,
        stopAudio,
        seekAudio,
        setAudioPlaybackRate,
        adminAddBook,
        adminAddBusinessIdea,
        updateAdminConfig,
        toggleAdminMode,
        resetAllProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
