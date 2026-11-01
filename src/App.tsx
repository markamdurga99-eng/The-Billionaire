import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navigation/Navbar';
import { BottomNav } from './components/Navigation/BottomNav';
import { AudioPlayerBar } from './components/AudioPlayer/AudioPlayerBar';
import { HomeDashboard } from './components/Dashboard/HomeDashboard';
import { RoadmapView } from './components/Roadmap/RoadmapView';
import { LessonModal } from './components/Roadmap/LessonModal';
import { BooksLibraryView } from './components/Books/BooksLibraryView';
import { BusinessIdeasView } from './components/BusinessIdeas/BusinessIdeasView';
import { AiGuruView } from './components/AiGuru/AiGuruView';
import { CalculatorsView } from './components/Calculators/CalculatorsView';
import { MoneyManagementView } from './components/MoneyManagement/MoneyManagementView';
import { DailyChallengesView } from './components/DailyChallenges/DailyChallengesView';
import { SuccessStoriesView } from './components/SuccessStories/SuccessStoriesView';
import { MyProgressView } from './components/MyProgress/MyProgressView';
import { MyGoalsView } from './components/Goals/MyGoalsView';
import { AdminPanel } from './components/Admin/AdminPanel';
import { GoogleDrivePickerView } from './components/GooglePicker/GoogleDrivePickerView';
import { AuthModal } from './components/Auth/AuthModal';
import { PricingModal } from './components/Subscription/PricingModal';
import { ApkGuideModal } from './components/ApkGuide/ApkGuideModal';
import { Lesson } from './types';
import { ROADMAP_LEVELS } from './data/roadmapData';

function MainApp() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [libraryInitialBookId, setLibraryInitialBookId] = useState<string | undefined>(undefined);
  const [isMobileFrame, setIsMobileFrame] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showApkModal, setShowApkModal] = useState(false);

  // Navigate with optional parameters
  const handleNavigate = (tab: string, extraData?: any) => {
    if (tab === 'apk-guide') {
      setShowApkModal(true);
      return;
    }
    setCurrentTab(tab);
    if (tab === 'library' && extraData?.bookId) {
      setLibraryInitialBookId(extraData.bookId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Next lesson trigger in lesson modal
  const handleNextLesson = () => {
    if (!selectedLesson) return;
    const allLessons = ROADMAP_LEVELS.flatMap((l) => l.lessons);
    const currentIndex = allLessons.findIndex((l) => l.id === selectedLesson.id);
    if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
      setSelectedLesson(allLessons[currentIndex + 1]);
    } else {
      setSelectedLesson(null);
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#07090d] text-[#f5f5f7] flex flex-col items-center transition-all ${
        isMobileFrame ? 'p-2 sm:p-6 bg-neutral-950' : ''
      }`}
    >
      {/* Mobile Frame Container if enabled */}
      <div
        className={`w-full flex-1 flex flex-col bg-[#0b0d14] ${
          isMobileFrame
            ? 'max-w-[430px] rounded-[42px] border-[10px] border-neutral-800 shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden my-auto max-h-[92vh]'
            : 'max-w-6xl'
        }`}
      >
        {/* Navigation Bar */}
        <Navbar
          onOpenProfile={() => setShowProfileModal(true)}
          onOpenPricing={() => setShowPricingModal(true)}
          onOpenApkGuide={() => setShowApkModal(true)}
          isMobileFrame={isMobileFrame}
          toggleMobileFrame={() => setIsMobileFrame(!isMobileFrame)}
          currentTab={currentTab}
          setCurrentTab={handleNavigate}
        />

        {/* Dynamic Main View */}
        <main className="flex-1 px-3 sm:px-6 pt-4 overflow-y-auto">
          {currentTab === 'home' && (
            <HomeDashboard
              onNavigate={handleNavigate}
              onSelectLesson={(l) => setSelectedLesson(l)}
            />
          )}

          {currentTab === 'roadmap' && (
            <RoadmapView onSelectLesson={(l) => setSelectedLesson(l)} />
          )}

          {currentTab === 'library' && (
            <BooksLibraryView
              initialBookId={libraryInitialBookId}
              onNavigateToDrive={() => handleNavigate('drive')}
            />
          )}

          {currentTab === 'ideas' && <BusinessIdeasView />}

          {currentTab === 'ai-guru' && <AiGuruView />}

          {currentTab === 'calculators' && <CalculatorsView />}

          {currentTab === 'money' && <MoneyManagementView />}

          {currentTab === 'challenges' && <DailyChallengesView />}

          {currentTab === 'stories' && <SuccessStoriesView />}

          {currentTab === 'progress' && <MyProgressView />}

          {currentTab === 'goals' && <MyGoalsView />}

          {currentTab === 'drive' && (
            <GoogleDrivePickerView
              onAnalyzeWithAi={(file) => {
                handleNavigate('ai-guru');
              }}
            />
          )}

          {currentTab === 'admin' && <AdminPanel />}
        </main>

        {/* Fixed Mini / Expanded Audio Player */}
        <AudioPlayerBar />

        {/* Bottom Tab Bar (Mobile Navigation) */}
        <BottomNav currentTab={currentTab} setCurrentTab={handleNavigate} />
      </div>

      {/* Lesson Reader & Quiz Modal */}
      {selectedLesson && (
        <LessonModal
          lesson={selectedLesson}
          onClose={() => setSelectedLesson(null)}
          onNextLesson={handleNextLesson}
        />
      )}

      {/* Profile & Account Settings Modal */}
      {showProfileModal && (
        <AuthModal onClose={() => setShowProfileModal(false)} />
      )}

      {/* Subscription Pricing Modal */}
      {showPricingModal && (
        <PricingModal onClose={() => setShowPricingModal(false)} />
      )}

      {/* Android APK Download & Installation Modal */}
      {showApkModal && (
        <ApkGuideModal onClose={() => setShowApkModal(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
