import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  Crown,
  TrendingUp,
  ShieldAlert,
  Calendar,
  DollarSign,
  MessageSquare,
  FileText,
  RotateCcw,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AiGuruView: React.FC = () => {
  const { user, updateUser } = useApp();
  const [activeTab, setActiveTab] = useState<'generator' | 'chat'>('generator');

  // Form State
  const [formData, setFormData] = useState({
    dailyIncome: user.dailyIncome || 200,
    currentJob: user.currentOccupation || 'दैनिक निर्माण मजदूर (Daily Wage Worker)',
    education: '8वीं पास / व्यावहारिक समझ',
    location: `${user.cityOrVillage || 'कस्बा'}, ${user.state || 'उत्तर प्रदेश'}`,
    capital: user.availableCapital || 1000,
    timePerDay: '2 से 3 घंटे (शाम को)',
    skills: 'मेहनत, ग्राहकों से विनम्र बातचीत, बुनियादी गणित व हिसाब',
    businessTypeInterest: 'कम पूंजी वाला खाद्य, सेवा या वितरण कार्य',
  });

  const [isLoadingPlan, setIsLoadingPlan] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);
  const [errorPlan, setErrorPlan] = useState<string | null>(null);

  // Chat State
  const [chatMessages, setChatMessages] = useState<
    Array<{ role: 'user' | 'assistant'; content: string }>
  >([
    {
      role: 'assistant',
      content:
        'प्रणाम भाई! मैं आपका व्यक्तिगत AI बिजनेस गुरु हूँ। आप मुझसे अपने काम, बचत, ग्राहक बनाने, उधारी रोकने या नया छोटा बिजनेस शुरू करने से जुड़ा कोई भी सवाल बिना किसी झिझक के हिंदी में पूछ सकते हैं। आप आज क्या जानना चाहते हैं?',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isSendingChat, setIsSendingChat] = useState(false);

  // Generate Personalized Plan via Express Backend
  const handleGenerateRoadmap = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingPlan(true);
    setErrorPlan(null);

    try {
      const res = await fetch('/api/ai/guru', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setGeneratedPlan(data.data);
        // update user context with points
        updateUser({
          points: user.points + 100,
          dailyIncome: Number(formData.dailyIncome),
          availableCapital: Number(formData.capital),
        });
      } else {
        throw new Error(data.error || 'योजना तैयार करने में असमर्थ।');
      }
    } catch (err: any) {
      console.error(err);
      setErrorPlan(
        err.message || 'इंटरनेट या सर्वर में समस्या है। कृपया पुनः प्रयास करें।'
      );
    } finally {
      setIsLoadingPlan(false);
    }
  };

  // Chat with AI Guru via Express Backend
  const handleSendChat = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || isSendingChat) return;

    const userMsg = chatInput.trim();
    setChatInput('');
    const newHistory = [...chatMessages, { role: 'user' as const, content: userMsg }];
    setChatMessages(newHistory);
    setIsSendingChat(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory,
          userContext: {
            ...formData,
            points: user.points,
            streak: user.streakDays,
          },
        }),
      });

      const data = await res.json();
      if (data.success && data.reply) {
        setChatMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.reply },
        ]);
      } else {
        throw new Error(data.error || 'उत्तर नहीं मिल पाया।');
      }
    } catch (err: any) {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'माफ़ कीजिये भाई, तकनीकी कारण से संपर्क टूट गया। कृपया दोबारा पूछें।',
        },
      ]);
    } finally {
      setIsSendingChat(false);
    }
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/15 to-yellow-500/15 border border-[#d4af37]/30 text-amber-300 text-xs font-semibold">
          <Bot className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>व्यक्तिगत एआई बिजनेस सलाहकार (Powered by Gemini)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          AI बिजनेस गुरु
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          अपनी कमाई, समय और हुनर बताएं - गुरुजी आपके लिए शून्य से ₹1 करोड़ तक का चरणबद्ध हिंदी बिजनेस प्लान तैयार करेंगे।
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="max-w-md mx-auto flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-xl text-xs">
        <button
          onClick={() => setActiveTab('generator')}
          className={`flex-1 py-2 rounded-lg font-bold transition flex items-center justify-center gap-1.5 ${
            activeTab === 'generator'
              ? 'bg-[#d4af37] text-black shadow'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>रोडमैप प्लानर (Form)</span>
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-2 rounded-lg font-bold transition flex items-center justify-center gap-1.5 ${
            activeTab === 'chat'
              ? 'bg-[#d4af37] text-black shadow'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>गुरुजी से सीधी बातचीत (Chat)</span>
        </button>
      </div>

      {/* TAB 1: FORM & GENERATED PLAN */}
      {activeTab === 'generator' && (
        <div className="max-w-3xl mx-auto space-y-6">
          {!generatedPlan ? (
            <div className="bg-[#11141c] border border-neutral-800 rounded-2xl p-5 sm:p-7 shadow-xl">
              <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#d4af37]" />
                <span>अपनी वर्तमान स्थिति दर्ज करें:</span>
              </h3>

              <form onSubmit={handleGenerateRoadmap} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Daily Income */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      1. प्रतिदिन कितनी कमाई होती है? (₹)
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formData.dailyIncome}
                      onChange={(e) =>
                        setFormData({ ...formData, dailyIncome: Number(e.target.value) })
                      }
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  {/* Available Capital */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      2. कितनी पूंजी/बचत उपलब्ध है? (₹)
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formData.capital}
                      onChange={(e) =>
                        setFormData({ ...formData, capital: Number(e.target.value) })
                      }
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  {/* Current Job */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      3. वर्तमान में क्या काम करते हैं?
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.currentJob}
                      onChange={(e) =>
                        setFormData({ ...formData, currentJob: e.target.value })
                      }
                      placeholder="उदा. दैनिक मजदूर, किसान, दुकान पर हेल्पर, बेरोजगार"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  {/* Education */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      4. शिक्षा कितनी है?
                    </label>
                    <select
                      value={formData.education}
                      onChange={(e) =>
                        setFormData({ ...formData, education: e.target.value })
                      }
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option>अक्षर ज्ञान / व्यावहारिक समझ</option>
                      <option>5वीं पास</option>
                      <option>8वीं पास</option>
                      <option>10वीं पास (मैट्रिक)</option>
                      <option>12वीं पास (इंटर)</option>
                      <option>स्नातक (Graduate)</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      5. किस राज्य और गांव/कस्बे/शहर में रहते हैं?
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      placeholder="उदा. बदायूं, उत्तर प्रदेश या समस्तीपुर, बिहार"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  {/* Time per day */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      6. प्रतिदिन नया काम सीखने/करने के लिए कितना समय दे सकते हैं?
                    </label>
                    <select
                      value={formData.timePerDay}
                      onChange={(e) =>
                        setFormData({ ...formData, timePerDay: e.target.value })
                      }
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option>1 से 2 घंटे (सुबह या शाम)</option>
                      <option>2 से 4 घंटे (खाली समय में)</option>
                      <option>पूरा दिन (पूर्णकालिक बिजनेस हेतु)</option>
                    </select>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    7. कौन सा हुनर या अनुभव जानते हैं?
                  </label>
                  <input
                    type="text"
                    value={formData.skills}
                    onChange={(e) =>
                      setFormData({ ...formData, skills: e.target.value })
                    }
                    placeholder="उदा. साइकिल चलाना, बातचीत करना, चाय बनाना, वेल्डिंग, खेती, फोन चलाना"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                {/* Business interest */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    8. किस प्रकार के काम या व्यापार में रुचि है?
                  </label>
                  <input
                    type="text"
                    value={formData.businessTypeInterest}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        businessTypeInterest: e.target.value,
                      })
                    }
                    placeholder="उदा. खाने-पीने का काम, रिपेयरिंग, किराना सप्लाई, गांव में देसी उत्पाद"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                {errorPlan && (
                  <div className="p-3 bg-red-950/60 border border-red-500 rounded-xl text-xs text-red-200 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorPlan}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoadingPlan}
                  className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-extrabold text-sm sm:text-base hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-amber-500/20 disabled:opacity-50 transition flex items-center justify-center gap-2"
                >
                  {isLoadingPlan ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-black" />
                      <span>AI बिजनेस गुरु आपकी योजना तैयार कर रहे हैं...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-black" />
                      <span>मेरा व्यक्तिगत बिजनेस रोडमैप बनाएं (Generate Roadmap)</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Generated Roadmap Display */
            <div className="bg-[#11141c] border border-[#d4af37]/40 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6 animate-in fade-in">
              <div className="flex items-start justify-between gap-3 border-b border-neutral-800 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#d4af37] bg-[#d4af37]/10 px-2 py-0.5 rounded border border-[#d4af37]/30">
                    आपका व्यक्तिगत मास्टर रोडमैप
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                    {generatedPlan.title}
                  </h2>
                  <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                    {generatedPlan.summary}
                  </p>
                </div>
                <button
                  onClick={() => setGeneratedPlan(null)}
                  className="p-2 rounded-xl bg-neutral-800 text-neutral-400 hover:text-white shrink-0 flex items-center gap-1 text-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>नया फॉर्म</span>
                </button>
              </div>

              {/* Realistic Estimate Cards */}
              {generatedPlan.realisticEstimate && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                  <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                    <span className="text-[10px] text-neutral-400 block">शुरुआती लागत</span>
                    <span className="text-xs sm:text-sm font-bold text-white">
                      {generatedPlan.realisticEstimate.startCost}
                    </span>
                  </div>
                  <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                    <span className="text-[10px] text-neutral-400 block">अनुमानित लाभ (3 माह)</span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-400">
                      {generatedPlan.realisticEstimate.monthlyExpectedProfitFirstQuarter}
                    </span>
                  </div>
                  <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                    <span className="text-[10px] text-neutral-400 block">पहला लाभ कब?</span>
                    <span className="text-xs sm:text-sm font-bold text-[#d4af37]">
                      {generatedPlan.realisticEstimate.timeToFirstProfit}
                    </span>
                  </div>
                  <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                    <span className="text-[10px] text-neutral-400 block">मुख्य सुरक्षा</span>
                    <span className="text-[11px] font-semibold text-neutral-200 line-clamp-2">
                      {generatedPlan.realisticEstimate.primaryRisk}
                    </span>
                  </div>
                </div>
              )}

              {/* Phases */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#d4af37]" /> चरणबद्ध कार्य योजना (Phases of Growth)
                </h3>

                <div className="space-y-3">
                  {generatedPlan.phases?.map((phase: any, pIdx: number) => (
                    <div
                      key={pIdx}
                      className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-amber-500/20 text-[#d4af37] text-xs font-extrabold flex items-center justify-center border border-amber-500/30">
                            {phase.phaseNumber || pIdx + 1}
                          </span>
                          <span>{phase.title}</span>
                        </h4>
                      </div>

                      <ul className="text-xs sm:text-sm text-neutral-300 space-y-1.5 pl-8 list-disc">
                        {phase.actionItems?.map((act: string, aIdx: number) => (
                          <li key={aIdx}>{act}</li>
                        ))}
                      </ul>

                      {phase.rule && (
                        <div className="text-[11px] bg-neutral-950 p-2.5 rounded-xl border border-neutral-800 text-amber-300 font-medium">
                          <strong>सुनहरा नियम:</strong> {phase.rule}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Habit & Warning */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {generatedPlan.dailyHabit && (
                  <div className="bg-emerald-950/20 border border-emerald-500/30 p-4 rounded-2xl space-y-1">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4" /> 15 मिनट की दैनिक आदत (Daily Habit)
                    </span>
                    <p className="text-xs text-neutral-200 leading-relaxed">
                      {generatedPlan.dailyHabit}
                    </p>
                  </div>
                )}

                {generatedPlan.warning && (
                  <div className="bg-red-950/20 border border-red-500/30 p-4 rounded-2xl space-y-1">
                    <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4" /> क्या कतई नहीं करना है (Critical Warning)
                    </span>
                    <p className="text-xs text-neutral-200 leading-relaxed">
                      {generatedPlan.warning}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveTab('chat')}
                  className="px-5 py-2.5 bg-[#d4af37] text-black font-bold text-xs sm:text-sm rounded-xl hover:bg-amber-400 transition flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>इस प्लान के बारे में गुरुजी से सवाल पूछें</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: LIVE CHAT WITH AI GURU */}
      {activeTab === 'chat' && (
        <div className="max-w-3xl mx-auto bg-[#11141c] border border-neutral-800 rounded-3xl h-[620px] flex flex-col shadow-2xl overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 bg-[#141824] border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-black flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                  AI बिजनेस गुरु (Live Consultation)
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-xs text-neutral-400">
                  शुद्ध व सरल हिंदी में 24/7 व्यावहारिक सलाह
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {['उधारी कैसे रोकें?', 'पहला ग्राहक कैसे पाएं?', '₹1000 में काम'].map(
                (quick, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setChatInput(quick);
                    }}
                    className="text-[11px] bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-2 py-1 rounded-md hidden lg:inline-block border border-neutral-700"
                  >
                    {quick}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-[#0c0e14]">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-[#d4af37] flex items-center justify-center shrink-0 mt-1 border border-amber-500/30">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-semibold rounded-br-sm'
                      : 'bg-[#151924] border border-neutral-800 text-neutral-200 rounded-bl-sm whitespace-pre-line'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isSendingChat && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-[#d4af37] flex items-center justify-center shrink-0 border border-amber-500/30">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-[#151924] border border-neutral-800 text-neutral-400 rounded-2xl px-4 py-3 text-xs flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#d4af37]" />
                  <span>गुरुजी सोच रहे हैं...</span>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={handleSendChat}
            className="p-3 bg-[#141824] border-t border-neutral-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="गुरुजी से अपना सवाल पूछें (जैसे: ₹500 में क्या काम शुरू करूँ?)..."
              className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
            />
            <button
              type="submit"
              disabled={!chatInput.trim() || isSendingChat}
              className="px-4 py-2.5 bg-[#d4af37] hover:bg-amber-400 text-black font-bold rounded-xl disabled:opacity-40 transition flex items-center gap-1.5 shrink-0"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">भेजें</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
