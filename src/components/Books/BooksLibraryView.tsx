import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Volume2,
  Bookmark,
  Sparkles,
  Play,
  ArrowRight,
  Headphones,
  HardDrive,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BookSummary } from '../../types';
import { BookModal } from './BookModal';

export const BooksLibraryView: React.FC<{
  initialBookId?: string;
  onNavigateToDrive?: () => void;
}> = ({
  initialBookId,
  onNavigateToDrive,
}) => {
  const { books, user, toggleBookmarkBook, playAudioTrack } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBook, setSelectedBook] = useState<BookSummary | null>(() => {
    if (initialBookId) {
      return books.find((b) => b.id === initialBookId) || null;
    }
    return null;
  });

  const categories = [
    { id: 'all', label: 'सभी (All)' },
    { id: 'Money Psychology', label: 'धन का मनोविज्ञान' },
    { id: 'Personal Finance', label: 'पर्सनल फाइनेंस' },
    { id: 'Wealth Creation', label: 'धन निर्माण' },
    { id: 'Sales', label: 'बिक्री (Sales)' },
    { id: 'Marketing', label: 'मार्केटिंग' },
    { id: 'Digital Marketing', label: 'डिजिटल मार्केटिंग' },
    { id: 'Small Business', label: 'छोटा व्यापार' },
    { id: 'Rural Business', label: 'ग्रामीण बिजनेस' },
    { id: 'Startup', label: 'स्टार्टअप' },
    { id: 'Investing', label: 'निवेश' },
    { id: 'Self Improvement', label: 'आत्म सुधार' },
    { id: 'Negotiation', label: 'बातचीत व मोलभाव' },
    { id: 'Accounting', label: 'लेखांकन व मुनाफा' },
    { id: 'Productivity', label: 'उत्पादकता' },
    { id: 'Leadership', label: 'लीडरशिप' },
    { id: 'Communication Skills', label: 'बातचीत का हुनर' },
    { id: 'Business Management', label: 'मैनेजमेंट' },
    { id: 'Rich Mindset', label: 'अमीर सोच' },
  ];

  const filteredBooks = books.filter((b) => {
    const matchesCategory =
      selectedCategory === 'all' || b.category === selectedCategory;
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.titleHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.authorHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.categoryHi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
          <Headphones className="w-3.5 h-3.5 text-blue-400" />
          <span>1000+ डिजिटल बुक्स व हिंदी ऑडियोबुक्स लाइब्रेरी</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          व्यापार एवं वित्तीय पुस्तकालय
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          दुनिया के सबसे सफल व्यापारियों और अर्थशास्त्रियों की अमर किताबों का हिंदी सार, ऑडियो और 7-दिवसीय एक्शन प्लान।
        </p>
      </div>

      {/* Google Drive Import Banner */}
      {onNavigateToDrive && (
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-950/40 via-neutral-900 to-blue-950/40 border border-blue-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Google Drive से पुस्तकें व नोट्स आयात करें</h4>
              <p className="text-xs text-neutral-400">Google Picker के जरिए अपनी व्यक्तिगत PDF व व्यापार फाइलें सीधे जोड़ें।</p>
            </div>
          </div>
          <button
            onClick={onNavigateToDrive}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition flex items-center gap-1.5 shrink-0"
          >
            <span>Google Picker खोलें</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="max-w-4xl mx-auto space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="किताब का नाम, लेखक या श्रेणी खोजें (उदा. रिच डैड, साइकोलॉजी, सेल्स)..."
            className="w-full bg-[#11141b] border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition border ${
                selectedCategory === cat.id
                  ? 'bg-[#d4af37] text-black border-[#d4af37] font-bold shadow-sm'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBooks.map((book) => {
          const isBookmarked = user.bookmarkedBooks.includes(book.id);

          return (
            <div
              key={book.id}
              className="bg-[#10131b] border border-neutral-800 hover:border-[#d4af37]/40 rounded-2xl p-4 flex flex-col justify-between transition-all hover:-translate-y-1 group shadow-lg"
            >
              <div>
                {/* Book Card Top Banner */}
                <div className="flex items-start gap-3.5 mb-3">
                  <div
                    className={`w-16 h-22 rounded-xl bg-gradient-to-br ${book.coverColor} p-2 text-white shrink-0 shadow-md flex flex-col justify-between text-center`}
                  >
                    <span className="text-[7.5px] uppercase font-bold tracking-wider bg-black/40 px-1 py-0.5 rounded">
                      SUMMARY
                    </span>
                    <span className="text-[10px] font-bold leading-tight font-serif">
                      {book.titleHi.split('(')[0]}
                    </span>
                    <span className="text-[7.5px] text-neutral-300 truncate">
                      {book.authorHi}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase text-[#d4af37] bg-[#d4af37]/10 px-2 py-0.5 rounded border border-[#d4af37]/20">
                      {book.categoryHi}
                    </span>
                    <h3 className="font-bold text-white text-sm sm:text-base leading-snug mt-1 group-hover:text-amber-300 transition line-clamp-2">
                      {book.titleHi}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5 truncate">
                      {book.authorHi}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleBookmarkBook(book.id)}
                    className={`p-1.5 rounded-lg border transition shrink-0 ${
                      isBookmarked
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-500 hover:text-white'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>

                <p className="text-xs text-neutral-300 line-clamp-2 mb-3 leading-relaxed">
                  {book.introduction}
                </p>

                {/* Key Lesson Pill */}
                <div className="bg-neutral-900/90 border border-neutral-800/80 rounded-xl p-2.5 mb-3">
                  <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1 mb-0.5">
                    <Sparkles className="w-3 h-3" /> मुख्य सीख:
                  </span>
                  <p className="text-xs text-neutral-300 line-clamp-1 italic">
                    "{book.keyLessons[0]}"
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80">
                <button
                  onClick={() =>
                    playAudioTrack({
                      id: book.id,
                      title: book.titleHi,
                      subtitle: `${book.authorHi} • ऑडियो सारांश`,
                      text: book.audioScript,
                    })
                  }
                  className="flex items-center gap-1.5 text-xs text-[#d4af37] font-semibold hover:text-amber-300 p-1"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>ऑडियो सुनें</span>
                </button>

                <button
                  onClick={() => setSelectedBook(book)}
                  className="px-3.5 py-1.5 bg-neutral-800 hover:bg-[#d4af37] hover:text-black text-white text-xs font-semibold rounded-lg transition"
                >
                  सारांश पढ़ें
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12 text-neutral-400">
          <BookOpen className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
          <p className="text-sm font-semibold">कोई पुस्तक नहीं मिली।</p>
          <p className="text-xs mt-1">कृपया कोई अन्य शब्द या श्रेणी चुनें।</p>
        </div>
      )}

      {/* Book Detail Modal */}
      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
};
