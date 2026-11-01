import React, { useState } from 'react';
import {
  X,
  Volume2,
  CheckCircle,
  HelpCircle,
  Award,
  Sparkles,
  ArrowRight,
  BookmarkCheck,
  Check,
} from 'lucide-react';
import { Lesson } from '../../types';
import { useApp } from '../../context/AppContext';

interface LessonModalProps {
  lesson: Lesson;
  onClose: () => void;
  onNextLesson?: () => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  lesson,
  onClose,
  onNextLesson,
}) => {
  const { user, completeLesson, playAudioTrack } = useApp();
  const [selectedAnswers, setSelectedAnswers] = useState<{ [index: number]: number }>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [actionDone, setActionDone] = useState(false);

  const isCompleted = user.completedLessons.includes(lesson.id);

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (showQuizResults) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleFinishLesson = () => {
    completeLesson(lesson.id, lesson.levelNumber);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#12151e] border border-neutral-700 rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between bg-[#151924]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded">
                लेवल {lesson.levelNumber} का पाठ
              </span>
              <span className="text-xs text-neutral-400">• {lesson.durationMinutes} मिनट</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white mt-1 leading-snug">
              {lesson.titleHi}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                playAudioTrack({
                  id: lesson.id,
                  title: lesson.titleHi,
                  subtitle: `लेवल ${lesson.levelNumber} ऑडियो पाठ`,
                  text: lesson.content.replace(/[#*`_]/g, ''),
                })
              }
              className="p-2 rounded-xl bg-neutral-800 text-[#d4af37] hover:bg-neutral-700 transition"
              title="हिंदी में ऑडियो सुनें"
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-neutral-800 text-neutral-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-neutral-200">
          {/* Key Takeaway Box */}
          <div className="bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-amber-500/5 border-l-4 border-[#d4af37] rounded-r-xl p-4">
            <p className="text-xs font-bold text-[#d4af37] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> मुख्य सीख (Key Takeaway)
            </p>
            <p className="text-sm font-semibold text-white leading-relaxed">
              {lesson.keyTakeaway}
            </p>
          </div>

          {/* Formatted Hindi Reading Content */}
          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-neutral-300 font-sans">
            {lesson.content.split('\n\n').map((paragraph, idx) => {
              const trimmed = paragraph.trim();
              if (trimmed.startsWith('###')) {
                return (
                  <h3 key={idx} className="text-lg font-bold text-white pt-2 border-b border-neutral-800 pb-1">
                    {trimmed.replace('###', '').trim()}
                  </h3>
                );
              }
              if (trimmed.startsWith('####')) {
                return (
                  <h4 key={idx} className="text-base font-bold text-[#d4af37] pt-1">
                    {trimmed.replace('####', '').trim()}
                  </h4>
                );
              }
              if (trimmed.startsWith('>')) {
                return (
                  <blockquote key={idx} className="p-3 bg-neutral-900 border-l-2 border-amber-500 rounded text-neutral-200 italic text-sm">
                    {trimmed.replace('>', '').trim()}
                  </blockquote>
                );
              }
              return (
                <p key={idx} className="leading-relaxed whitespace-pre-line">
                  {trimmed}
                </p>
              );
            })}
          </div>

          {/* Practical Assignment / Action Box */}
          <div className="bg-neutral-900/90 border border-neutral-700/80 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookmarkCheck className="w-4 h-4" /> आज का व्यावहारिक अभ्यास (Practical Action)
              </span>
            </div>
            <p className="text-sm text-neutral-200 mb-3 leading-relaxed">
              {lesson.practicalAction}
            </p>
            <button
              onClick={() => setActionDone(!actionDone)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                actionDone
                  ? 'bg-emerald-500 text-black font-bold'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 border border-neutral-600'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{actionDone ? 'अभ्यास पूर्ण हुआ ✓' : 'मैंने यह कर लिया (Mark as Done)'}</span>
            </button>
          </div>

          {/* Quiz Section if present */}
          {lesson.quiz && lesson.quiz.length > 0 && (
            <div className="bg-[#161a26] border border-neutral-700 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base border-b border-neutral-800 pb-2">
                <HelpCircle className="w-4 h-4 text-[#d4af37]" />
                <span>ज्ञान परीक्षा (Quick Test) - सही उत्तर चुनें:</span>
              </div>

              {lesson.quiz.map((q, qIdx) => (
                <div key={qIdx} className="space-y-3">
                  <p className="text-sm font-semibold text-white">
                    {qIdx + 1}. {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[qIdx] === oIdx;
                      const isCorrect = q.correctAnswerIndex === oIdx;
                      let optionStyle =
                        'bg-neutral-900 border-neutral-700 text-neutral-300 hover:bg-neutral-800';

                      if (showQuizResults) {
                        if (isCorrect) {
                          optionStyle = 'bg-emerald-900/60 border-emerald-500 text-emerald-200';
                        } else if (isSelected && !isCorrect) {
                          optionStyle = 'bg-red-900/60 border-red-500 text-red-200';
                        }
                      } else if (isSelected) {
                        optionStyle = 'bg-[#d4af37]/20 border-[#d4af37] text-white';
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectOption(qIdx, oIdx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between ${optionStyle}`}
                        >
                          <span>{opt}</span>
                          {showQuizResults && isCorrect && (
                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {showQuizResults && (
                    <div className="p-3 bg-neutral-900/90 rounded-lg text-xs text-neutral-300 border border-neutral-800">
                      <span className="font-bold text-[#d4af37]">व्याख्या: </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              ))}

              {!showQuizResults ? (
                <button
                  disabled={Object.keys(selectedAnswers).length < lesson.quiz.length}
                  onClick={() => setShowQuizResults(true)}
                  className="w-full py-2.5 rounded-xl bg-neutral-800 text-neutral-200 font-bold text-xs disabled:opacity-40 hover:bg-neutral-700 border border-neutral-600 transition"
                >
                  उत्तर जांचें
                </button>
              ) : (
                <p className="text-xs text-center text-emerald-400 font-bold">
                  ✓ बहुत बढ़िया! आपने टेस्ट पूरा कर लिया।
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-4 border-t border-neutral-800 bg-[#151924] flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            {isCompleted ? (
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <CheckCircle className="w-4 h-4" /> पाठ पूरा हो चुका है (+50 अंक)
              </span>
            ) : (
              <span className="text-amber-400 font-semibold">
                पूरा करने पर +50 अंक मिलेंगे
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!isCompleted ? (
              <button
                onClick={handleFinishLesson}
                className="gold-gradient-bg text-black font-extrabold px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition text-xs sm:text-sm flex items-center gap-1.5"
              >
                <span>पाठ पूरा करें ✓</span>
              </button>
            ) : onNextLesson ? (
              <button
                onClick={() => {
                  onClose();
                  onNextLesson();
                }}
                className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold px-4 py-2.5 rounded-xl border border-neutral-700 transition text-xs sm:text-sm flex items-center gap-1.5"
              >
                <span>अगला पाठ पढ़ें</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="bg-neutral-800 text-white font-semibold px-4 py-2 rounded-xl text-xs"
              >
                बंद करें
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
