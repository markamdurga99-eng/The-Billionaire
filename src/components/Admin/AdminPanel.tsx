import React, { useState } from 'react';
import {
  Settings,
  BookPlus,
  Lightbulb,
  Users,
  DollarSign,
  Bot,
  Sparkles,
  CheckCircle,
  Plus,
  Save,
  Volume2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BookSummary, BusinessIdea } from '../../types';

export const AdminPanel: React.FC = () => {
  const {
    adminConfig,
    updateAdminConfig,
    adminAddBook,
    adminAddBusinessIdea,
    books,
    businessIdeas,
    user,
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<
    'overview' | 'add-book' | 'add-idea' | 'pricing' | 'ai-control'
  >('overview');

  const [message, setMessage] = useState<string | null>(null);

  // New Book Form State
  const [newBookTitleHi, setNewBookTitleHi] = useState('');
  const [newBookAuthorHi, setNewBookAuthorHi] = useState('');
  const [newBookCategory, setNewBookCategory] = useState('Small Business');
  const [newBookCategoryHi, setNewBookCategoryHi] = useState('छोटा व्यापार');
  const [newBookIntro, setNewBookIntro] = useState('');
  const [newBookAudio, setNewBookAudio] = useState('');

  // New Idea Form State
  const [newIdeaTitleHi, setNewIdeaTitleHi] = useState('');
  const [newIdeaBudget, setNewIdeaBudget] = useState<'0-1000' | '1000-5000' | '5000-10000'>('1000-5000');
  const [newIdeaCustomers, setNewIdeaCustomers] = useState('');
  const [newIdeaProfit, setNewIdeaProfit] = useState('₹10,000 - ₹18,000');
  const [newIdeaEquipment, setNewIdeaEquipment] = useState('');

  // Pricing Form State
  const [premiumPrice, setPremiumPrice] = useState(adminConfig.premiumTierPriceYearly);
  const [proPrice, setProPrice] = useState(adminConfig.proTierPriceYearly);
  const [announcement, setAnnouncement] = useState(adminConfig.announcementHindi);

  const handleCreateBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBookTitleHi || !newBookAuthorHi) return;

    const bookObj: BookSummary = {
      id: 'book-admin-' + Date.now(),
      title: newBookTitleHi,
      titleHi: newBookTitleHi,
      author: newBookAuthorHi,
      authorHi: newBookAuthorHi,
      category: newBookCategory,
      categoryHi: newBookCategoryHi,
      coverColor: 'from-purple-700 to-indigo-900',
      introduction: newBookIntro || 'यह एक मौलिक और व्यावहारिक सारांश है।',
      keyLessons: ['लागत नियंत्रित रखें', 'ग्राहकों से सीधा संपर्क बनाएं', 'मुनाफे का पुनर्निवेश करें'],
      chapterSummaries: [{ chapterNum: 1, title: 'शुरुआत', summary: 'जमीन से व्यापार शुरू करने की रणनीति' }],
      keyPrinciples: ['कड़ी मेहनत', 'ईमानदारी'],
      realLifeApplication: 'अपने छोटे काम में तुरंत लागू करें।',
      sevenDayActionPlan: ['दिन 1: योजना बनाएं', 'दिन 2: शुरू करें'],
      thirtyDayPractice: ['रोज 15 मिनट अभ्यास'],
      audioScript: newBookAudio || `${newBookTitleHi} का संक्षिप्त हिंदी ऑडियो सारांश।`,
      audioDurationMinutes: 10,
      quiz: [{ question: 'इस पुस्तक की मुख्य सीख क्या है?', options: ['मेहनत और ईमानदारी', 'आलस्य'], correctIndex: 0, explanation: 'सही उत्तर है मेहनत और ईमानदारी।' }],
    };

    adminAddBook(bookObj);
    setMessage('✓ नई पुस्तक और ऑडियो सफलतापूर्वक पुस्तकालय में जोड़ दी गई!');
    setNewBookTitleHi('');
    setNewBookAuthorHi('');
    setNewBookIntro('');
    setNewBookAudio('');
    setTimeout(() => setMessage(null), 4000);
  };

  const handleCreateIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIdeaTitleHi) return;

    const ideaObj: BusinessIdea = {
      id: 'idea-admin-' + Date.now(),
      title: newIdeaTitleHi,
      titleHi: newIdeaTitleHi,
      budgetCategory: newIdeaBudget as any,
      budgetCategoryLabel:
        newIdeaBudget === '0-1000'
          ? '₹0 से ₹1,000'
          : newIdeaBudget === '1000-5000'
          ? '₹1,000 से ₹5,000'
          : '₹5,000 से ₹10,000',
      startCostMin: newIdeaBudget === '0-1000' ? 500 : 2000,
      startCostMax: newIdeaBudget === '0-1000' ? 1000 : 4500,
      requiredItems: newIdeaEquipment.split(',').map((s) => s.trim()).filter(Boolean),
      potentialCustomers: newIdeaCustomers || 'मोहल्ले और बाजार के स्थानीय ग्राहक',
      marketDemand: 'High',
      sellingMethod: 'घर-घर या स्टॉल लगाकर सीधे नकद बिक्री',
      monthlyOperatingExpenses: 1500,
      estimatedMonthlyProfit: newIdeaProfit,
      dailyEarningEstimate: '₹400 - ₹700',
      potentialRisks: ['उधारी में माल फंसना'],
      riskMitigation: 'नकद भुगतान पर ही माल बेचें',
      thirtyDayRoadmap: [
        { week: 'सप्ताह 1', tasks: ['सामान जुटाना'] },
        { week: 'सप्ताह 2', tasks: ['पहले 10 ग्राहक बनाना'] },
        { week: 'सप्ताह 3', tasks: ['नियमित बिक्री'] },
        { week: 'सप्ताह 4', tasks: ['हिसाब और विस्तार'] },
      ],
      suitableFor: 'कोई भी मेहनती व्यक्ति',
    };

    adminAddBusinessIdea(ideaObj);
    setMessage('✓ नया बिजनेस आइडिया सफलतापूर्वक जोड़ दिया गया!');
    setNewIdeaTitleHi('');
    setNewIdeaCustomers('');
    setNewIdeaEquipment('');
    setTimeout(() => setMessage(null), 4000);
  };

  const handleSavePricing = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminConfig({
      premiumTierPriceYearly: Number(premiumPrice),
      proTierPriceYearly: Number(proPrice),
      announcementHindi: announcement,
    });
    setMessage('✓ एडमिन कॉन्फ़िगरेशन व कीमतें अपडेट हो गईं!');
    setTimeout(() => setMessage(null), 4000);
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
          <Settings className="w-3.5 h-3.5 text-purple-400" />
          <span>एडमिन डैशबोर्ड एवं कंटेंट कंट्रोल (Admin CMS)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          सिस्टम एडमिनिस्ट्रेशन
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          यहां से आप नई पुस्तकें, ऑडियो सारांश, नए बिजनेस आइडिया जोड़ सकते हैं तथा कीमतों और AI संदेशों को नियंत्रित कर सकते हैं।
        </p>
      </div>

      {message && (
        <div className="max-w-3xl mx-auto p-3.5 bg-emerald-950/60 border border-emerald-500 rounded-xl text-xs text-emerald-200 text-center font-bold">
          {message}
        </div>
      )}

      {/* Admin Nav Tabs */}
      <div className="max-w-3xl mx-auto flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-xl text-xs overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'सिस्टम सांख्यिकी (Stats)', icon: Users },
          { id: 'add-book', label: 'नई पुस्तक व ऑडियो (+)', icon: BookPlus },
          { id: 'add-idea', label: 'नया बिजनेस आइडिया (+)', icon: Lightbulb },
          { id: 'pricing', label: 'सब्सक्रिप्शन व सूचनाएं', icon: DollarSign },
          { id: 'ai-control', label: 'AI गुरु सेटिंग्स', icon: Bot },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`flex-1 py-2 px-3 rounded-lg font-bold whitespace-nowrap transition flex items-center justify-center gap-1.5 ${
                activeAdminTab === tab.id
                  ? 'bg-[#d4af37] text-black shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB: OVERVIEW STATS */}
      {activeAdminTab === 'overview' && (
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#11141c] border border-neutral-800 rounded-2xl p-4 text-center">
              <span className="text-xs text-neutral-400">कुल पुस्तकें</span>
              <p className="text-2xl font-bold text-white mt-1">{books.length}</p>
            </div>
            <div className="bg-[#11141c] border border-neutral-800 rounded-2xl p-4 text-center">
              <span className="text-xs text-neutral-400">कुल बिजनेस आइडिया</span>
              <p className="text-2xl font-bold text-emerald-400 mt-1">{businessIdeas.length}</p>
            </div>
            <div className="bg-[#11141c] border border-neutral-800 rounded-2xl p-4 text-center">
              <span className="text-xs text-neutral-400">सक्रिय यूजर स्ट्रीक</span>
              <p className="text-2xl font-bold text-orange-400 mt-1">{user.streakDays} दिन</p>
            </div>
            <div className="bg-[#11141c] border border-neutral-800 rounded-2xl p-4 text-center">
              <span className="text-xs text-neutral-400">यूजर टियर</span>
              <p className="text-2xl font-bold text-[#d4af37] mt-1 uppercase">{user.tier}</p>
            </div>
          </div>

          <div className="bg-[#11141c] border border-neutral-800 rounded-2xl p-5 space-y-2">
            <h4 className="text-sm font-bold text-white">सिस्टम हेल्थ एवं सर्वर स्थिति</h4>
            <p className="text-xs text-neutral-300">
              • Express + Gemini 3.8 Flash API: <strong>सक्रिय (Online)</strong><br />
              • Web Speech API (हिंदी TTS): <strong>सक्रिय (Native Voice Ready)</strong><br />
              • LocalStorage डेटा बैकअप: <strong>सिंक्रनाइज़्ड (Synced)</strong>
            </p>
          </div>
        </div>
      )}

      {/* TAB: ADD BOOK */}
      {activeAdminTab === 'add-book' && (
        <form
          onSubmit={handleCreateBook}
          className="max-w-3xl mx-auto bg-[#11141c] border border-neutral-800 rounded-3xl p-5 sm:p-7 space-y-4"
        >
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <BookPlus className="w-5 h-5 text-[#d4af37]" />
            <span>लाइब्रेरी में नई पुस्तक व ऑडियो सारांश जोड़ें</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">पुस्तक का हिंदी नाम</label>
              <input
                type="text"
                required
                value={newBookTitleHi}
                onChange={(e) => setNewBookTitleHi(e.target.value)}
                placeholder="उदा. व्यापार के 21 अमर सूत्र"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-xs sm:text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">लेखक का नाम</label>
              <input
                type="text"
                required
                value={newBookAuthorHi}
                onChange={(e) => setNewBookAuthorHi(e.target.value)}
                placeholder="उदा. चाणक्य / जे आर डी टाटा"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-xs sm:text-sm text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-300 block mb-1">पुस्तक का सार (Introduction)</label>
            <textarea
              rows={3}
              value={newBookIntro}
              onChange={(e) => setNewBookIntro(e.target.value)}
              placeholder="इस पुस्तक का संक्षिप्त परिचय लिखें..."
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-xs sm:text-sm text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-300 block mb-1 flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5 text-[#d4af37]" /> ऑडियो स्क्रिप्ट (Audio Script for TTS)
            </label>
            <textarea
              rows={4}
              value={newBookAudio}
              onChange={(e) => setNewBookAudio(e.target.value)}
              placeholder="हिंदी ऑडियो के लिए पाठ लिखें जिसे ऑडियो प्लेयर बोलकर सुनाएगा..."
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-xs sm:text-sm text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#d4af37] text-black font-extrabold rounded-xl hover:bg-amber-400 transition"
          >
            पुस्तक लाइब्रेरी में प्रकाशित करें (+ Publish)
          </button>
        </form>
      )}

      {/* TAB: ADD BUSINESS IDEA */}
      {activeAdminTab === 'add-idea' && (
        <form
          onSubmit={handleCreateIdea}
          className="max-w-3xl mx-auto bg-[#11141c] border border-neutral-800 rounded-3xl p-5 sm:p-7 space-y-4"
        >
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-emerald-400" />
            <span>नया ज़मीनी बिजनेस आइडिया जोड़ें</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">बिजनेस का नाम</label>
              <input
                type="text"
                required
                value={newIdeaTitleHi}
                onChange={(e) => setNewIdeaTitleHi(e.target.value)}
                placeholder="उदा. स्टेशन पर कुल्हड़ लस्सी स्टॉल"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-xs sm:text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">बजट श्रेणी (Budget Slab)</label>
              <select
                value={newIdeaBudget}
                onChange={(e) => setNewIdeaBudget(e.target.value as any)}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-xs sm:text-sm text-white"
              >
                <option value="0-1000">₹0 से ₹1,000</option>
                <option value="1000-5000">₹1,000 से ₹5,000</option>
                <option value="5000-10000">₹5,000 से ₹10,000</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-300 block mb-1">
              आवश्यक सामान (कॉमा लगाकर लिखें)
            </label>
            <input
              type="text"
              value={newIdeaEquipment}
              onChange={(e) => setNewIdeaEquipment(e.target.value)}
              placeholder="उदा. मथानी, मिट्टी के कुल्हड़, दही, बर्फ का डिब्बा"
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-xs sm:text-sm text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">संभावित ग्राहक</label>
              <input
                type="text"
                value={newIdeaCustomers}
                onChange={(e) => setNewIdeaCustomers(e.target.value)}
                placeholder="उदा. बस स्टैंड पर आने-जाने वाले यात्री"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-xs sm:text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">अनुमानित मासिक लाभ</label>
              <input
                type="text"
                value={newIdeaProfit}
                onChange={(e) => setNewIdeaProfit(e.target.value)}
                placeholder="उदा. ₹12,000 - ₹20,000"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-xs sm:text-sm text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-500 text-black font-extrabold rounded-xl hover:bg-emerald-400 transition"
          >
            बिजनेस आइडिया प्रकाशित करें (+ Save)
          </button>
        </form>
      )}

      {/* TAB: PRICING & ANNOUNCEMENTS */}
      {activeAdminTab === 'pricing' && (
        <form
          onSubmit={handleSavePricing}
          className="max-w-3xl mx-auto bg-[#11141c] border border-neutral-800 rounded-3xl p-5 sm:p-7 space-y-5"
        >
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[#d4af37]" />
            <span>सब्सक्रिप्शन कीमतें व ऐप घोषणाएं</span>
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">
                PREMIUM वार्षिक शुल्क (₹/वर्ष)
              </label>
              <input
                type="number"
                value={premiumPrice}
                onChange={(e) => setPremiumPrice(Number(e.target.value))}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-sm text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">
                PRO वार्षिक शुल्क (₹/वर्ष)
              </label>
              <input
                type="number"
                value={proPrice}
                onChange={(e) => setProPrice(Number(e.target.value))}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-sm text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-300 block mb-1">
              ऐप में सबसे ऊपर दिखने वाला हिंदी समाचार / घोषणा
            </label>
            <input
              type="text"
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              placeholder="उदा. विशेष सूचना: हर रविवार को लाइव बिजनेस गुरु सत्र ऐप में उपलब्ध रहेगा।"
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-sm text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#d4af37] text-black font-extrabold rounded-xl hover:bg-amber-400 transition flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>कॉन्फ़िगरेशन सुरक्षित करें (Save)</span>
          </button>
        </form>
      )}

      {/* TAB: AI CONTROL */}
      {activeAdminTab === 'ai-control' && (
        <div className="max-w-3xl mx-auto bg-[#11141c] border border-neutral-800 rounded-3xl p-5 sm:p-7 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Bot className="w-5 h-5 text-[#d4af37]" />
            <span>AI बिजनेस गुरु मॉडल और प्रॉम्प्टिंग नियंत्रण</span>
          </h3>

          <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 space-y-2 text-xs text-neutral-300">
            <p><strong>एक्टिव मॉडल:</strong> <code>gemini-3.8-flash</code></p>
            <p><strong>रोल:</strong> Zero to Crorepati Master Business Strategist & Financial Educator</p>
            <p><strong>भाषा:</strong> शुद्ध और सरल हिंदी (सरल ग्रामीण और दैनिक मजदूरी वालों के अनुकूल)</p>
            <p><strong>सुरक्षा नियम:</strong> नो गेट-रिच-क्विक, नो गैंबलिंग, नो फॉल्स प्रॉमिसेस, 100% गणितीय सच्चाई।</p>
          </div>
        </div>
      )}
    </div>
  );
};
