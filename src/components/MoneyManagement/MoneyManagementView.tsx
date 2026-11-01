import React, { useState } from 'react';
import {
  Wallet,
  PlusCircle,
  TrendingDown,
  TrendingUp,
  PiggyBank,
  RefreshCw,
  Trash2,
  Calendar,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MoneyManagementView: React.FC = () => {
  const { khataTransactions, addKhataTransaction, deleteKhataTransaction, user } =
    useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  const [formType, setFormType] = useState<
    'income' | 'expense' | 'savings' | 'reinvest'
  >('income');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('दैनिक मजदूरी');
  const [note, setNote] = useState('');

  // Calculations
  const totalIncome = khataTransactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = khataTransactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalSavings = khataTransactions
    .filter((t) => t.type === 'savings')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalReinvest = khataTransactions
    .filter((t) => t.type === 'reinvest')
    .reduce((acc, t) => acc + t.amount, 0);

  const currentCashInHand = totalIncome - totalExpense - totalSavings - totalReinvest;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;

    addKhataTransaction({
      type: formType,
      amount: Number(amount),
      category,
      note: note.trim() || category,
    });

    setAmount('');
    setNote('');
    setShowAddModal(false);
  };

  const categoriesByType = {
    income: ['दैनिक मजदूरी', 'दुकान की बिक्री', 'अतिरिक्त साइड काम', 'उधारी वसूली', 'अन्य आमदनी'],
    expense: ['आटा, दाल, राशन', 'कमरे का किराया', 'चाय, नाश्ता, गुटखा', 'दवा व इलाज', 'बिजली बिल / रिचार्ज', 'अन्य खर्चा'],
    savings: ['बिजनेस पूंजी गुल्लक', 'आपातकालीन फंड', 'बैंक RD / डाकघर', 'सोने की बचत'],
    reinvest: ['दुकान का नया सामान', 'औजार / उपकरण खरीद', 'विज्ञापन / बोर्ड', 'थोक माल एडवांस'],
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <Wallet className="w-3.5 h-3.5 text-emerald-400" />
          <span>डिजिटल खाता-बही व नकद प्रबंधन</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          पैसा और खाता-बही (Khata Bahi)
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          एक-एक रुपये का सच्चा हिसाब। रोज की आमदनी, खर्च, बचत और बिजनेस में पुनर्निवेश दर्ज करें।
        </p>
      </div>

      {/* Summary Stat Cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#11141c] border border-neutral-800 rounded-2xl p-4 text-center">
          <span className="text-[11px] text-neutral-400 flex items-center justify-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> कुल आमदनी
          </span>
          <p className="text-lg sm:text-xl font-bold text-emerald-400 mt-1">
            ₹{totalIncome.toLocaleString('en-IN')}
          </p>
        </div>

        <div className="bg-[#11141c] border border-neutral-800 rounded-2xl p-4 text-center">
          <span className="text-[11px] text-neutral-400 flex items-center justify-center gap-1">
            <TrendingDown className="w-3.5 h-3.5 text-red-400" /> कुल खर्चे
          </span>
          <p className="text-lg sm:text-xl font-bold text-red-400 mt-1">
            ₹{totalExpense.toLocaleString('en-IN')}
          </p>
        </div>

        <div className="bg-[#11141c] border border-amber-500/30 rounded-2xl p-4 text-center bg-amber-500/5">
          <span className="text-[11px] text-amber-300 flex items-center justify-center gap-1">
            <PiggyBank className="w-3.5 h-3.5 text-[#d4af37]" /> सुरक्षित बचत
          </span>
          <p className="text-lg sm:text-xl font-extrabold text-[#d4af37] mt-1">
            ₹{totalSavings.toLocaleString('en-IN')}
          </p>
        </div>

        <div className="bg-[#11141c] border border-blue-500/30 rounded-2xl p-4 text-center bg-blue-500/5">
          <span className="text-[11px] text-blue-300 flex items-center justify-center gap-1">
            <RefreshCw className="w-3.5 h-3.5 text-blue-400" /> बिजनेस में री-इन्वेस्ट
          </span>
          <p className="text-lg sm:text-xl font-bold text-blue-400 mt-1">
            ₹{totalReinvest.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <span>हाल के लेनदेन (Recent Ledger)</span>
          <span className="text-xs font-normal text-neutral-400">
            ({khataTransactions.length} प्रविष्टियां)
          </span>
        </h3>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#d4af37] hover:bg-amber-400 text-black font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow"
        >
          <PlusCircle className="w-4 h-4" />
          <span>नया हिसाब जोड़ें (+ Add)</span>
        </button>
      </div>

      {/* Transaction List */}
      <div className="max-w-4xl mx-auto space-y-2.5">
        {khataTransactions.map((tx) => {
          let badgeColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
          let sign = '+';

          if (tx.type === 'expense') {
            badgeColor = 'text-red-400 bg-red-500/10 border-red-500/20';
            sign = '-';
          } else if (tx.type === 'savings') {
            badgeColor = 'text-[#d4af37] bg-amber-500/10 border-amber-500/20';
            sign = 'बचत:';
          } else if (tx.type === 'reinvest') {
            badgeColor = 'text-blue-400 bg-blue-500/10 border-blue-500/20';
            sign = 'री-इन्वेस्ट:';
          }

          return (
            <div
              key={tx.id}
              className="bg-[#11141c] border border-neutral-800 rounded-xl p-3.5 flex items-center justify-between gap-3 hover:border-neutral-700 transition"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 border ${badgeColor}`}
                >
                  {tx.type === 'income' && <TrendingUp className="w-4 h-4" />}
                  {tx.type === 'expense' && <TrendingDown className="w-4 h-4" />}
                  {tx.type === 'savings' && <PiggyBank className="w-4 h-4" />}
                  {tx.type === 'reinvest' && <RefreshCw className="w-4 h-4" />}
                </div>

                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                    {tx.category}
                  </h4>
                  <p className="text-[11px] text-neutral-400 truncate">
                    {tx.note} • {tx.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`text-sm sm:text-base font-extrabold font-mono ${
                    tx.type === 'income'
                      ? 'text-emerald-400'
                      : tx.type === 'expense'
                      ? 'text-red-400'
                      : tx.type === 'savings'
                      ? 'text-[#d4af37]'
                      : 'text-blue-400'
                  }`}
                >
                  {sign} ₹{tx.amount.toLocaleString('en-IN')}
                </span>

                <button
                  onClick={() => deleteKhataTransaction(tx.id)}
                  className="p-1.5 text-neutral-600 hover:text-red-400 transition"
                  title="हटाएं"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}

        {khataTransactions.length === 0 && (
          <div className="text-center py-10 text-neutral-500 bg-[#11141c] rounded-2xl border border-neutral-800">
            <p className="text-sm">अभी कोई खाता प्रविष्टि नहीं है।</p>
            <p className="text-xs mt-1">आज का अपना पहला खर्च या आमदनी दर्ज करें।</p>
          </div>
        )}
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141822] border border-neutral-700 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-bold text-white text-base">नया हिसाब दर्ज करें</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type Switcher */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  प्रकार चुनें (Transaction Type):
                </label>
                <div className="grid grid-cols-4 gap-1.5 text-xs">
                  {[
                    { id: 'income', label: 'आमदनी', color: 'hover:border-emerald-500' },
                    { id: 'expense', label: 'खर्चा', color: 'hover:border-red-500' },
                    { id: 'savings', label: 'बचत', color: 'hover:border-amber-500' },
                    { id: 'reinvest', label: 'री-इन्वेस्ट', color: 'hover:border-blue-500' },
                  ].map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => {
                        setFormType(t.id as any);
                        setCategory(categoriesByType[t.id as keyof typeof categoriesByType][0]);
                      }}
                      className={`py-2 rounded-xl border text-center font-bold transition ${
                        formType === t.id
                          ? 'bg-[#d4af37] text-black border-[#d4af37]'
                          : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  रकम (Amount ₹):
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="उदा. 200"
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-lg font-bold text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  श्रेणी (Category):
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                >
                  {categoriesByType[formType].map((c, idx) => (
                    <option key={idx} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Note */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  विवरण / नोट (वैकल्पिक):
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="उदा. शाम की दिहाड़ी, दुकान का 2 किलो जीरा"
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#d4af37] text-black font-extrabold rounded-xl hover:bg-amber-400 transition"
              >
                खाता में जोड़ें (+ Save)
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
