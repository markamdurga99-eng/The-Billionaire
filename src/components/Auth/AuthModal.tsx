import React, { useState } from 'react';
import { X, User, Phone, MapPin, Briefcase, DollarSign, RotateCcw, ShieldCheck, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { user, updateUser, resetAllProgress } = useApp();

  const [name, setName] = useState(user.name);
  const [phoneOrEmail, setPhoneOrEmail] = useState(user.phoneOrEmail);
  const [dailyIncome, setDailyIncome] = useState(user.dailyIncome);
  const [occupation, setOccupation] = useState(user.currentOccupation);
  const [cityOrVillage, setCityOrVillage] = useState(user.cityOrVillage);
  const [state, setState] = useState(user.state);
  const [capital, setCapital] = useState(user.availableCapital);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name,
      phoneOrEmail,
      dailyIncome: Number(dailyIncome),
      currentOccupation: occupation,
      cityOrVillage,
      state,
      availableCapital: Number(capital),
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#12151e] border border-neutral-700 rounded-3xl w-full max-w-lg p-5 sm:p-7 shadow-2xl space-y-5 my-auto">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-black flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">मेरी प्रोफाइल व सेटिंग्स</h3>
              <p className="text-xs text-neutral-400">उपयोगकर्ता खाता एवं वित्तीय विवरण</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {savedSuccess && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-500 rounded-xl text-xs text-emerald-200 text-center font-bold flex items-center justify-center gap-2">
            <Check className="w-4 h-4" /> प्रोफाइल सुरक्षित कर दी गई!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">पूरा नाम</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-xs sm:text-sm text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">मोबाइल नंबर / ईमेल</label>
              <input
                type="text"
                value={phoneOrEmail}
                onChange={(e) => setPhoneOrEmail(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-xs sm:text-sm text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">दैनिक कमाई (₹/दिन)</label>
              <input
                type="number"
                min={0}
                value={dailyIncome}
                onChange={(e) => setDailyIncome(Number(e.target.value))}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-xs sm:text-sm text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">उपलब्ध बचत पूंजी (₹)</label>
              <input
                type="number"
                min={0}
                value={capital}
                onChange={(e) => setCapital(Number(e.target.value))}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-xs sm:text-sm text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-300 block mb-1">वर्तमान कार्य / पेशा</label>
            <input
              type="text"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-xs sm:text-sm text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">गांव या शहर</label>
              <input
                type="text"
                value={cityOrVillage}
                onChange={(e) => setCityOrVillage(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-xs sm:text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">राज्य</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-xs sm:text-sm text-white"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('क्या आप सच में अपनी सारी प्रगति रीसेट करना चाहते हैं?')) {
                  resetAllProgress();
                  onClose();
                }
              }}
              className="px-3 py-2 text-neutral-400 hover:text-red-400 text-xs flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>प्रगति रीसेट करें</span>
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 bg-[#d4af37] text-black font-extrabold text-xs sm:text-sm rounded-xl hover:bg-amber-400 transition"
            >
              प्रोफ़ाइल सुरक्षित करें (Save)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
