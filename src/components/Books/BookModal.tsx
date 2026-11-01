import React, { useState } from 'react';
import {
  X,
  Volume2,
  Bookmark,
  Sparkles,
  ListOrdered,
  Calendar,
  CheckCircle2,
  HelpCircle,
  Share2,
} from 'lucide-react';
import { BookSummary } from '../../types';
import { useApp } from '../../context/AppContext';

interface BookModalProps {
  book: BookSummary;
  onClose: () => void;
}

export const BookModal: React.FC<BookModalProps> = ({ book, onClose }) => {
  const { user, toggleBookmarkBook, playAudioTrack } = useApp();
  const [activeTab, setActiveTab] = useState<'summary' | 'chapters' | 'action' | 'quiz'>('summary');
  const [selectedAnswers, setSelectedAnswers] = useState<{ [index: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const isBookmarked = user.bookmarkedBooks.includes(book.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#12151e] border border-neutral-700 rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Book Header Banner */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-neutral-900 via-[#171b26] to-neutral-900 border-b border-neutral-800 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className={`w-16 h-24 sm:w-20 sm:h-28 rounded-xl bg-gradient-to-br ${book.coverColor} p-2 text-white shrink-0 shadow-xl flex flex-col justify-between text-center`}
            >
              <span className="text-[8px] uppercase tracking-wider bg-black/40 rounded px-1">
                SUMMARY
              </span>
              <p className="text-[11px] sm:text-xs font-bold leading-tight font-serif">
                {book.titleHi.split('(')[0]}
              </p>
              <span className="text-[8px] text-neutral-300 truncate">{book.authorHi}</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37] bg-[#d4af37]/15 px-2 py-0.5 rounded border border-[#d4af37]/30">
                {book.categoryHi}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {book.titleHi}
              </h2>
              <p className="text-xs text-neutral-400">
                लेखक: <span className="text-neutral-300 font-semibold">{book.authorHi}</span> ({book.author})
              </p>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() =>
                    playAudioTrack({
                      id: book.id,
                      title: book.titleHi,
                      subtitle: `${book.authorHi} • हिंदी ऑडियो सारांश`,
                      text: book.audioScript,
                    })
                  }
                  className="px-3 py-1.5 rounded-lg bg-[#d4af37] text-black text-xs font-bold hover:bg-amber-400 transition flex items-center gap-1.5 shadow"
                >
                  <Volume2 className="w-3.5 h-3.5 fill-current" />
                  <span>ऑडियो सुनें ({book.audioDurationMinutes} मिनट)</span>
                </button>
                <button
                  onClick={() => toggleBookmarkBook(book.id)}
                  className={`p-1.5 rounded-lg border transition ${
                    isBookmarked
                      ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                      : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white'
                  }`}
                  title="बुकमार्क करें"
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-[#0f1118] border-b border-neutral-800 text-xs overflow-x-auto no-scrollbar">
          {[
            { id: 'summary', label: 'परिचय व मुख्य सीख' },
            { id: 'chapters', label: 'अध्यायवार सारांश' },
            { id: 'action', label: '7-दिन एक्शन प्लान' },
            { id: 'quiz', label: 'क्विज व टेस्ट' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition shrink-0 ${
                activeTab === tab.id
                  ? 'bg-neutral-800 text-[#d4af37] border border-neutral-700 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-neutral-200 text-sm leading-relaxed">
          {activeTab === 'summary' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  किताब का सार (Introduction)
                </h4>
                <p className="text-neutral-300 leading-relaxed font-sans">
                  {book.introduction}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> 4 मुख्य सीखें (Key Lessons)
                </h4>
                <div className="space-y-2">
                  {book.keyLessons.map((lesson, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-neutral-900/90 border border-neutral-800 rounded-xl flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#d4af37] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-neutral-200">{lesson}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1.5">
                  वास्तविक जीवन में उपयोग (Real Life Application)
                </h4>
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-neutral-200 text-xs sm:text-sm leading-relaxed">
                  {book.realLifeApplication}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chapters' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                महत्वपूर्ण अध्यायों का निष्कर्ष (Chapter Summaries)
              </h4>
              {book.chapterSummaries.map((ch) => (
                <div
                  key={ch.chapterNum}
                  className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#d4af37] bg-[#d4af37]/15 px-2 py-0.5 rounded">
                      अध्याय {ch.chapterNum}
                    </span>
                    <h5 className="font-bold text-white text-sm">{ch.title}</h5>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed pl-1">
                    {ch.summary}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'action' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> 7 दिन का क्रियान्वयन प्लान (7-Day Action Plan)
                </h4>
                <div className="space-y-2">
                  {book.sevenDayActionPlan.map((act, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs sm:text-sm text-neutral-200 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                  30 दिन का अभ्यास (30-Day Long-Term Practice)
                </h4>
                <div className="p-4 bg-neutral-900/90 border border-neutral-800 rounded-xl space-y-2 text-xs sm:text-sm text-neutral-300">
                  {book.thirtyDayPractice.map((p, idx) => (
                    <p key={idx}>• {p}</p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
                <HelpCircle className="w-4 h-4 text-[#d4af37]" />
                <h4 className="font-bold text-white text-sm sm:text-base">
                  पुस्तक समझ परीक्षा (Book Quiz)
                </h4>
              </div>

              {book.quiz.map((q, qIdx) => (
                <div key={qIdx} className="space-y-3 bg-neutral-900 p-4 rounded-xl border border-neutral-800">
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    {qIdx + 1}. {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[qIdx] === oIdx;
                      const isCorrect = q.correctIndex === oIdx;
                      let btnStyle =
                        'bg-neutral-800/80 border-neutral-700 text-neutral-300 hover:bg-neutral-700';

                      if (showResults) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-red-950 border-red-500 text-red-200';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-[#d4af37]/20 border-[#d4af37] text-white';
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={showResults}
                          onClick={() =>
                            setSelectedAnswers((prev) => ({ ...prev, [qIdx]: oIdx }))
                          }
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {showResults && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {showResults && (
                    <p className="text-xs text-neutral-300 p-2.5 bg-neutral-950 rounded border border-neutral-800">
                      <strong className="text-[#d4af37]">व्याख्या:</strong> {q.explanation}
                    </p>
                  )}
                </div>
              ))}

              {!showResults ? (
                <button
                  disabled={Object.keys(selectedAnswers).length < book.quiz.length}
                  onClick={() => setShowResults(true)}
                  className="w-full py-2.5 bg-[#d4af37] text-black font-bold text-xs rounded-xl disabled:opacity-40 hover:bg-amber-400 transition"
                >
                  उत्तर जांचें
                </button>
              ) : (
                <p className="text-xs text-emerald-400 font-bold text-center">
                  ✓ बहुत खूब! आपने यह क्विज पूरा कर लिया।
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
