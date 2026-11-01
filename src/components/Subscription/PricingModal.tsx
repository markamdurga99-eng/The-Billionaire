import React from 'react';
import { X, Crown, Check, Sparkles, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { UserTier } from '../../types';

interface PricingModalProps {
  onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ onClose }) => {
  const { user, setUserTier, adminConfig } = useApp();

  const handleSelectTier = (tier: UserTier) => {
    setUserTier(tier);
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#a855f7', '#ffffff'],
      });
    } catch (e) {}
    onClose();
  };

  const tiers = [
    {
      id: 'free' as UserTier,
      name: 'FREE',
      nameHi: 'शुरुआती मुफ्त योजना',
      price: '₹0',
      period: 'हमेशा के लिए',
      badge: 'शुरुआती शिक्षा',
      features: [
        'लेवल 1 व 2 के सभी बुनियादी पाठ',
        'सीमित डिजिटल पुस्तकें',
        'सीमित हिंदी ऑडियोबुक सारांश',
        'बेसिक आय व बचत कैलकुलेटर',
        'दैनिक चुनौतियां व स्ट्रीक',
      ],
      buttonStyle: 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700',
    },
    {
      id: 'premium' as UserTier,
      name: 'PREMIUM',
      nameHi: 'प्रीमियम उद्यमी',
      price: `₹${adminConfig.premiumTierPriceYearly}`,
      period: 'प्रति वर्ष (Yearly)',
      badge: 'सबसे लोकप्रिय',
      highlight: true,
      features: [
        'संपूर्ण 12-लेवल रोडमैप अनलॉक',
        '1000+ डिजिटल बुक्स लाइब्रेरी',
        'सभी पुस्तकों के उच्च-गुणवत्ता हिंदी ऑडियो',
        '50+ कम लागत बिजनेस आइडिया',
        'सभी 10 बिजनेस व वेल्थ कैलकुलेटर',
        'ऑफ़लाइन पढ़ाई व बुकमार्क',
      ],
      buttonStyle: 'gold-gradient-bg text-black font-extrabold shadow-lg shadow-amber-500/25',
    },
    {
      id: 'pro' as UserTier,
      name: 'PRO',
      nameHi: 'प्रो बिजनेस लीडर',
      price: `₹${adminConfig.proTierPriceYearly}`,
      period: 'प्रति वर्ष (Yearly)',
      badge: 'AI + निजी मेंटरशिप',
      features: [
        'प्रीमियम के सभी फीचर्स शामिल',
        'AI बिजनेस गुरु: असीमित निजी कंसल्टेशन',
        'व्यक्तिगत बिजनेस प्लान जेनरेशन (PDF)',
        'एडवांस वैल्यूएशन व ₹1 Cr नेटवर्थ ट्रैकर',
        'खाता-बही डेटा क्लाउड बैकअप',
        'विशेष कोर्स व सर्टिफिकेट',
      ],
      buttonStyle: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold shadow-lg',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#12151e] border border-neutral-700 rounded-3xl w-full max-w-4xl p-5 sm:p-7 shadow-2xl space-y-6 my-auto">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-[#d4af37]" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                सदस्यता योजनाएं (Choose Your Plan)
              </h2>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              अपनी जरूरत और सीखने की गति के अनुसार सही प्लान चुनें। कभी भी बदल सकते हैं।
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((t) => {
            const isCurrent = user.tier === t.id;

            return (
              <div
                key={t.id}
                className={`rounded-2xl border p-5 flex flex-col justify-between transition relative ${
                  t.highlight
                    ? 'bg-[#151926] border-[#d4af37] shadow-xl'
                    : 'bg-neutral-900/80 border-neutral-800'
                }`}
              >
                {t.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#d4af37] text-black text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow">
                    {t.badge}
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="font-extrabold text-lg text-white">{t.name}</h3>
                    <p className="text-xs text-neutral-400">{t.nameHi}</p>
                  </div>

                  <div>
                    <span className="text-3xl font-extrabold text-white">{t.price}</span>
                    <span className="text-xs text-neutral-400 ml-1">/ {t.period}</span>
                  </div>

                  <ul className="space-y-2 text-xs text-neutral-300 pt-2 border-t border-neutral-800">
                    {t.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5">
                  <button
                    onClick={() => handleSelectTier(t.id)}
                    className={`w-full py-2.5 rounded-xl text-xs transition ${
                      isCurrent
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                        : t.buttonStyle
                    }`}
                  >
                    {isCurrent ? 'वर्तमान एक्टिव प्लान ✓' : `${t.name} सक्रिय करें`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center text-[11px] text-neutral-500 flex items-center justify-center gap-1.5 pt-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>100% सुरक्षित • कोई छिपा हुआ शुल्क नहीं • ग्रामीण भारत के हर नागरिक के लिए सुलभ</span>
        </div>
      </div>
    </div>
  );
};
