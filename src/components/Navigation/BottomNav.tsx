import React, { useState } from 'react';
import {
  Home,
  Map,
  BookOpen,
  Lightbulb,
  Bot,
  Menu,
  Calculator,
  Wallet,
  Flame,
  Award,
  Crown,
  Target,
  Settings,
  X,
  Compass,
  HardDrive,
  Smartphone,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface BottomNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, setCurrentTab }) => {
  const { user } = useApp();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const mainTabs = [
    { id: 'home', label: 'होम', icon: Home },
    { id: 'roadmap', label: '12 लेवल्स', icon: Map },
    { id: 'library', label: 'पुस्तकालय', icon: BookOpen },
    { id: 'ideas', label: 'बिजनेस', icon: Lightbulb },
    { id: 'ai-guru', label: 'AI गुरु', icon: Bot, highlight: true },
  ];

  const moreItems = [
    { id: 'apk-guide', label: 'Android APK गाइड', icon: Smartphone, badge: 'मोबाइल' },
    { id: 'drive', label: 'Google Drive (Picker)', icon: HardDrive, badge: 'दस्तावेज' },
    { id: 'calculators', label: 'बिजनेस कैलकुलेटर', icon: Calculator, badge: '10 टूल्स' },
    { id: 'money', label: 'खाता-बही व बजट', icon: Wallet, badge: 'पैसे का हिसाब' },
    { id: 'challenges', label: '30-दिवसीय एक्शन प्लान', icon: Flame, badge: 'दैनिक कार्य' },
    { id: 'stories', label: 'सफलता की कहानियां', icon: Compass, badge: 'प्रेरणा' },
    { id: 'goals', label: 'मेरे वित्तीय लक्ष्य', icon: Target, badge: '₹1 Cr प्लान' },
    { id: 'progress', label: 'मेरी प्रगति व बैज', icon: Award, badge: `${user.points} अंक` },
    { id: 'admin', label: 'एडमिन पैनल', icon: Settings, badge: 'कंट्रोल' },
  ];

  return (
    <>
      {/* Bottom Floating Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#0d0f16]/95 backdrop-blur-lg border-t border-neutral-800/80 px-2 py-1.5 md:hidden">
        <div className="flex items-center justify-around">
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setCurrentTab(tab.id);
                  setIsMoreMenuOpen(false);
                }}
                className={`flex flex-col items-center justify-center py-1 px-2 relative transition ${
                  isActive
                    ? 'text-[#d4af37]'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {tab.highlight ? (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-black flex items-center justify-center -mt-3 shadow-lg shadow-amber-500/20">
                    <Icon className="w-4 h-4" />
                  </div>
                ) : (
                  <Icon className="w-5 h-5 mb-0.5" />
                )}
                <span className="text-[10.5px] font-medium leading-none">
                  {tab.label}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] absolute -top-1" />
                )}
              </button>
            );
          })}

          {/* More Menu Trigger */}
          <button
            onClick={() => setIsMoreMenuOpen(true)}
            className={`flex flex-col items-center justify-center py-1 px-2 transition ${
              isMoreMenuOpen ? 'text-[#d4af37]' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Menu className="w-5 h-5 mb-0.5" />
            <span className="text-[10.5px] font-medium leading-none">अन्य मेन्यू</span>
          </button>
        </div>
      </nav>

      {/* Desktop Left / Top Sidebar Secondary Navigation */}
      <div className="hidden md:block bg-[#0e1017] border-b border-neutral-800/60 py-2 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs overflow-x-auto gap-4 no-scrollbar">
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {mainTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition ${
                    isActive
                      ? 'bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {moreItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition text-xs font-medium ${
                    isActive
                      ? 'bg-neutral-800 text-[#d4af37] border border-neutral-700'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile "More" Drawer Modal */}
      {isMoreMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end md:hidden">
          <div className="bg-[#12151e] border-t border-neutral-700 rounded-t-3xl p-5 max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#d4af37]" />
                <h3 className="font-bold text-white text-base">संपूर्ण मेन्यू (All Modules)</h3>
              </div>
              <button
                onClick={() => setIsMoreMenuOpen(false)}
                className="p-1.5 rounded-full bg-neutral-800 text-neutral-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {moreItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentTab(item.id);
                      setIsMoreMenuOpen(false);
                    }}
                    className={`flex flex-col items-start p-3 rounded-xl border text-left transition ${
                      currentTab === item.id
                        ? 'bg-[#d4af37]/15 border-[#d4af37]/50 text-white'
                        : 'bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:bg-neutral-800'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-[#d4af37]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] bg-neutral-800 text-[#d4af37] px-1.5 py-0.5 rounded">
                        {item.badge}
                      </span>
                    </div>
                    <span className="text-xs font-bold leading-tight text-white mb-0.5">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
