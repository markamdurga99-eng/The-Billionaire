import React, { useState } from 'react';
import {
  Crown,
  Lock,
  CheckCircle2,
  Play,
  Volume2,
  Sparkles,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ROADMAP_LEVELS } from '../../data/roadmapData';
import { Lesson } from '../../types';

interface RoadmapViewProps {
  onSelectLesson: (lesson: Lesson) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ onSelectLesson }) => {
  const { user, playAudioTrack } = useApp();
  const [expandedLevel, setExpandedLevel] = useState<number>(() => {
    // default expand latest unlocked level
    const maxUnlocked = Math.max(...user.unlockedLevels, 1);
    return maxUnlocked;
  });

  const toggleLevel = (lvlNum: number) => {
    setExpandedLevel((prev) => (prev === lvlNum ? 0 : lvlNum));
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>12-लेवल बिजनेस महा-प्रोग्राम</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          शून्य से करोड़पति रोडमैप
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          हर लेवल को क्रमबद्ध तरीके से पूरा करें। पाठ पढ़ें, टेस्ट दें और अपने जीवन में व्यावहारिक एक्शन लें।
        </p>
      </div>

      {/* Levels Timeline Stack */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {ROADMAP_LEVELS.map((level) => {
          const isUnlocked = user.unlockedLevels.includes(level.levelNumber);
          const isExpanded = expandedLevel === level.levelNumber;
          const completedInThisLevel = level.lessons.filter((l) =>
            user.completedLessons.includes(l.id)
          ).length;
          const isLevelComplete = completedInThisLevel === level.lessons.length && level.lessons.length > 0;

          return (
            <div
              key={level.levelNumber}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isUnlocked
                  ? 'bg-[#11141c] border-neutral-800 hover:border-[#d4af37]/40 shadow-lg'
                  : 'bg-[#0d0f14]/70 border-neutral-900 opacity-70'
              }`}
            >
              {/* Level Accordion Header */}
              <div
                onClick={() => isUnlocked && toggleLevel(level.levelNumber)}
                className={`p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none ${
                  isUnlocked ? 'hover:bg-neutral-800/30' : 'cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Level Number Badge */}
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center font-extrabold text-sm shrink-0 border ${
                      isLevelComplete
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : isUnlocked
                        ? 'bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/40'
                        : 'bg-neutral-900 text-neutral-600 border-neutral-800'
                    }`}
                  >
                    {isLevelComplete ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : isUnlocked ? (
                      `L${level.levelNumber}`
                    ) : (
                      <Lock className="w-5 h-5 text-neutral-500" />
                    )}
                  </div>

                  {/* Level Title & Tagline */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                        LEVEL {level.levelNumber}
                      </span>
                      {isLevelComplete && (
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-500/20 font-bold">
                          पूर्ण हुआ ✓
                        </span>
                      )}
                      {!isUnlocked && (
                        <span className="text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.2 rounded">
                          {level.requiredPointsToUnlock} अंक चाहिए
                        </span>
                      )}
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-white truncate">
                      {level.titleHi}
                    </h2>
                    <p className="text-xs text-neutral-400 truncate hidden sm:block">
                      {level.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {/* Progress ratio */}
                  {isUnlocked && (
                    <div className="text-right hidden xs:block">
                      <span className="text-xs font-bold text-neutral-300">
                        {completedInThisLevel}/{level.lessons.length} पाठ
                      </span>
                      <div className="w-16 h-1.5 bg-neutral-800 rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-yellow-300"
                          style={{
                            width: `${(completedInThisLevel / Math.max(1, level.lessons.length)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {isUnlocked ? (
                    isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-neutral-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-neutral-400" />
                    )
                  ) : (
                    <Lock className="w-5 h-5 text-neutral-600" />
                  )}
                </div>
              </div>

              {/* Level Expanded Lessons List */}
              {isExpanded && isUnlocked && (
                <div className="border-t border-neutral-800/80 p-4 sm:p-5 bg-[#0e1117] space-y-3 animate-in fade-in duration-200">
                  <p className="text-xs text-neutral-300 mb-3 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800">
                    {level.description}
                  </p>

                  <div className="space-y-2.5">
                    {level.lessons.map((lesson, idx) => {
                      const isLessonDone = user.completedLessons.includes(lesson.id);

                      return (
                        <div
                          key={lesson.id}
                          className="bg-neutral-900/80 hover:bg-neutral-800/80 border border-neutral-800/90 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition"
                        >
                          <div className="flex items-start gap-3 min-w-0">
                            <div className="mt-0.5 shrink-0">
                              {isLessonDone ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                              ) : (
                                <div className="w-5 h-5 rounded-full border-2 border-neutral-600 flex items-center justify-center text-[10px] text-neutral-400">
                                  {idx + 1}
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-sm font-bold text-white truncate">
                                {lesson.titleHi}
                              </h4>
                              <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
                                {lesson.summary}
                              </p>
                              <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-500">
                                <span>{lesson.durationMinutes} मिनट</span>
                                <span>•</span>
                                <span className="text-amber-400/90">+50 अंक</span>
                                {lesson.quiz && lesson.quiz.length > 0 && (
                                  <>
                                    <span>•</span>
                                    <span className="text-emerald-400">टेस्ट उपलब्ध</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                playAudioTrack({
                                  id: lesson.id,
                                  title: lesson.titleHi,
                                  subtitle: `लेवल ${level.levelNumber} ऑडियो पाठ`,
                                  text: lesson.content.replace(/[#*`_]/g, ''),
                                });
                              }}
                              className="p-2 rounded-lg bg-neutral-800 text-[#d4af37] hover:bg-neutral-700 transition"
                              title="ऑडियो सुनें"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => onSelectLesson(lesson)}
                              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                                isLessonDone
                                  ? 'bg-neutral-800 text-neutral-300 hover:text-white'
                                  : 'bg-[#d4af37] text-black font-bold hover:bg-amber-400'
                              }`}
                            >
                              {isLessonDone ? 'दोबारा पढ़ें' : 'पाठ शुरू करें'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
