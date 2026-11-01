import React from 'react';
import {
  Flame,
  Award,
  Crown,
  User,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Monitor,
  HardDrive,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NavbarProps {
  onOpenProfile: () => void;
  onOpenPricing: () => void;
  onOpenApkGuide: () => void;
  isMobileFrame: boolean;
  toggleMobileFrame: () => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenProfile,
  onOpenPricing,
  onOpenApkGuide,
  isMobileFrame,
  toggleMobileFrame,
  currentTab,
  setCurrentTab,
}) => {
  const { user, adminConfig } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-[#0a0c12]/95 backdrop-blur-md border-b border-neutral-800/80 px-4 py-2.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* App Title & Branding */}
        <div
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition">
            <div className="w-full h-full bg-[#0d0f15] rounded-[10px] flex items-center justify-center">
              <Crown className="w-5 h-5 text-[#d4af37]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base tracking-wider text-white">
                ZERO TO <span className="gold-gradient-text">CROREPATI</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold px-1.5 py-0.2 bg-amber-500/10 text-amber-400 rounded border border-amber-500/20">
                बिजनेस ऐप
              </span>
            </div>
            <p className="text-[10.5px] text-neutral-400 hidden xs:block truncate max-w-[200px] sm:max-w-none">
              ₹200 प्रतिदिन से ₹1 करोड़ की संपत्ति का सफर
            </p>
          </div>
        </div>

        {/* User Stats & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Daily Streak */}
          <div
            onClick={() => setCurrentTab('challenges')}
            className="flex items-center gap-1.5 bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/40 px-2.5 py-1.5 rounded-full cursor-pointer transition"
            title="दैनिक स्ट्रीक (Daily Streak)"
          >
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-bounce" />
            <span className="text-xs font-bold text-orange-400">{user.streakDays}</span>
            <span className="text-[11px] text-neutral-400 hidden sm:inline">दिन</span>
          </div>

          {/* Points / Coins */}
          <div
            onClick={() => setCurrentTab('progress')}
            className="flex items-center gap-1.5 bg-neutral-900/90 border border-neutral-800 hover:border-yellow-500/40 px-2.5 py-1.5 rounded-full cursor-pointer transition"
            title="लर्निंग प्वाइंट्स (Learning Points)"
          >
            <Award className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-bold text-yellow-300">{user.points}</span>
            <span className="text-[11px] text-neutral-400 hidden sm:inline">अंक</span>
          </div>

          {/* Google Drive Picker Quick Access */}
          <button
            onClick={() => setCurrentTab('drive')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold border transition ${
              currentTab === 'drive'
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700'
            }`}
            title="Google Drive से फ़ाइलें चुनें (Picker)"
          >
            <HardDrive className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Drive Picker</span>
          </button>

          {/* Android APK Modal Trigger */}
          <button
            onClick={onOpenApkGuide}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition shadow-sm"
            title="Android APK बनाएं व डाउनलोड करें"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            <span>APK डाउनलोड</span>
          </button>

          {/* Subscription Tier Button */}
          <button
            onClick={onOpenPricing}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition shadow-sm ${
              user.tier === 'pro'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                : user.tier === 'premium'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black'
                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            {user.tier === 'pro' ? 'PRO सदस्य' : user.tier === 'premium' ? 'PREMIUM' : 'अपग्रेड'}
          </button>

          {/* Mobile vs Desktop View Toggle (Pure Convenience for Builder / Reviewer) */}
          <button
            onClick={toggleMobileFrame}
            className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition hidden md:flex items-center gap-1 text-xs"
            title={isMobileFrame ? 'फुलस्क्रीन व्यू' : 'मोबाइल स्क्रीन व्यू'}
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-amber-400" />
                <span>डेस्कटॉप व्यू</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span>मोबाइल फ्रेम</span>
              </>
            )}
          </button>

          {/* Profile / Account Button */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-full bg-gradient-to-r from-neutral-800 to-neutral-900 hover:from-neutral-700 hover:to-neutral-800 border border-neutral-700 text-neutral-200 transition"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-black font-bold text-xs flex items-center justify-center">
              {user.name ? user.name[0] : 'U'}
            </div>
            <span className="text-xs font-semibold hidden md:inline max-w-[100px] truncate">
              {user.name.split(' ')[0]}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
