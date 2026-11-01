import React, { useState } from 'react';
import {
  Calculator,
  Coins,
  TrendingUp,
  Percent,
  PiggyBank,
  Crown,
  Scale,
  Sparkles,
  DollarSign,
  ArrowRight,
  Info,
} from 'lucide-react';

export const CalculatorsView: React.FC = () => {
  const [activeCalc, setActiveCalc] = useState<
    | 'daily'
    | 'monthly'
    | 'saving'
    | 'profit'
    | 'breakeven'
    | 'sip'
    | 'compound'
    | 'growth'
    | 'networth'
    | 'crore'
  >('crore');

  // Calculator States
  // 1. Daily
  const [dailyHours, setDailyHours] = useState(8);
  const [hourlyRate, setHourlyRate] = useState(25);

  // 2. Monthly
  const [monthlyDailyWage, setMonthlyDailyWage] = useState(200);
  const [workingDays, setWorkingDays] = useState(26);
  const [sideIncome, setSideIncome] = useState(1500);

  // 3. Saving (70-20-10)
  const [savingTotalIncome, setSavingTotalIncome] = useState(6000);

  // 4. Profit
  const [unitSellPrice, setUnitSellPrice] = useState(50);
  const [unitCostPrice, setUnitCostPrice] = useState(25);
  const [dailyUnitsSold, setDailyUnitsSold] = useState(30);
  const [monthlyShopExpense, setMonthlyShopExpense] = useState(3000);

  // 5. Break-Even
  const [fixedOverheadMonthly, setFixedOverheadMonthly] = useState(5000);
  const [itemPrice, setItemPrice] = useState(100);
  const [itemVariableCost, setItemVariableCost] = useState(60);

  // 6. Investment SIP
  const [sipMonthly, setSipMonthly] = useState(1000);
  const [sipYears, setSipYears] = useState(15);
  const [sipRate, setSipRate] = useState(12);

  // 7. Compound Interest Lumpsum
  const [compoundPrincipal, setCompoundPrincipal] = useState(10000);
  const [compoundYears, setCompoundYears] = useState(10);
  const [compoundRate, setCompoundRate] = useState(12);

  // 8. Business Growth
  const [currentSales, setCurrentSales] = useState(15000);
  const [targetSales, setTargetSales] = useState(40000);
  const [growthMonths, setGrowthMonths] = useState(12);

  // 9. Net Worth
  const [assetCash, setAssetCash] = useState(15000);
  const [assetInventory, setAssetInventory] = useState(25000);
  const [assetProperty, setAssetProperty] = useState(150000);
  const [assetInvestments, setAssetInvestments] = useState(20000);
  const [debtLoans, setDebtLoans] = useState(30000);
  const [debtInformal, setDebtInformal] = useState(10000);

  // 10. ₹1 Crore Goal
  const [targetYears, setTargetYears] = useState(15);
  const [expectedReturn, setExpectedReturn] = useState(13);

  // CALCULATIONS
  // 1. Daily
  const calculatedDailyTotal = dailyHours * hourlyRate;

  // 2. Monthly
  const calculatedMonthlyTotal = monthlyDailyWage * workingDays + sideIncome;

  // 3. Savings
  const needs70 = (savingTotalIncome * 0.7).toFixed(0);
  const businessSaving20 = (savingTotalIncome * 0.2).toFixed(0);
  const emergency10 = (savingTotalIncome * 0.1).toFixed(0);

  // 4. Profit
  const unitMargin = unitSellPrice - unitCostPrice;
  const grossMonthlyProfit = unitMargin * dailyUnitsSold * 30;
  const netMonthlyProfit = grossMonthlyProfit - monthlyShopExpense;

  // 5. Break-even
  const contributionPerUnit = Math.max(1, itemPrice - itemVariableCost);
  const breakEvenUnits = Math.ceil(fixedOverheadMonthly / contributionPerUnit);

  // 6. SIP Calculation: M * [ (1+i)^n - 1 ] * (1+i)/i
  const monthlyRate = sipRate / 100 / 12;
  const totalMonths = sipYears * 12;
  const sipFutureValue = Math.round(
    sipMonthly *
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
      (1 + monthlyRate)
  );
  const sipTotalInvested = sipMonthly * totalMonths;
  const sipTotalReturns = sipFutureValue - sipTotalInvested;

  // 7. Compound Interest
  const compoundFutureValue = Math.round(
    compoundPrincipal * Math.pow(1 + compoundRate / 100, compoundYears)
  );

  // 8. Growth
  const monthlyGrowthRequired = (
    (Math.pow(targetSales / Math.max(1, currentSales), 1 / growthMonths) - 1) *
    100
  ).toFixed(1);

  // 9. Net Worth
  const totalAssets = assetCash + assetInventory + assetProperty + assetInvestments;
  const totalLiabilities = debtLoans + debtInformal;
  const netWorthValue = totalAssets - totalLiabilities;

  // 10. ₹1 Crore Goal Monthly Needed
  // FV = 1,00,00,000. Find Monthly P
  const croreMonths = targetYears * 12;
  const croreRate = expectedReturn / 100 / 12;
  const croreMonthlyRequired = Math.round(
    10000000 /
      (((Math.pow(1 + croreRate, croreMonths) - 1) / croreRate) * (1 + croreRate))
  );

  const calcList = [
    { id: 'crore', label: '₹1 करोड़ लक्ष्य', icon: Crown, highlight: true },
    { id: 'profit', label: 'शुद्ध मुनाफा', icon: TrendingUp },
    { id: 'saving', label: '70-20-10 बजट', icon: PiggyBank },
    { id: 'sip', label: 'एसआईपी (SIP)', icon: Coins },
    { id: 'compound', label: 'चक्रवृद्धि ब्याज', icon: Percent },
    { id: 'networth', label: 'नेटवर्थ हिसाब', icon: Scale },
    { id: 'daily', label: 'दैनिक आमदनी', icon: Calculator },
    { id: 'monthly', label: 'मासिक आमदनी', icon: DollarSign },
    { id: 'breakeven', label: 'ब्रेक-ईवन', icon: Info },
    { id: 'growth', label: 'बिजनेस ग्रोथ', icon: TrendingUp },
  ];

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Calculator className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>10 शक्तिशाली बिजनेस व वित्तीय कैलकुलेटर</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          बिजनेस एवं वेल्थ कैलकुलेटर
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          अंदाजे से नहीं, गणित से व्यापार चलाएं। लाभ, लागत, चक्रवृद्धि और ₹1 करोड़ तक पहुंचने का सटीक खाका देखें।
        </p>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        {calcList.map((c) => {
          const Icon = c.icon;
          const isActive = activeCalc === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActiveCalc(c.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold whitespace-nowrap transition border ${
                isActive
                  ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-md'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Container */}
      <div className="max-w-3xl mx-auto bg-[#11141c] border border-neutral-800 rounded-3xl p-5 sm:p-7 shadow-xl">
        {/* 10. ₹1 CRORE GOAL CALCULATOR */}
        {activeCalc === 'crore' && (
          <div className="space-y-6">
            <div className="border-b border-neutral-800 pb-3">
              <span className="text-[10px] font-bold uppercase text-[#d4af37] bg-[#d4af37]/10 px-2 py-0.5 rounded">
                MASTER WEALTH CALCULATOR
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                ₹1 करोड़ की संपत्ति का लक्ष्य कैलकुलेटर
              </h3>
              <p className="text-xs text-neutral-400">
                यदि आप तय समय में ₹1,00,00,000 (एक करोड़) बनाना चाहते हैं, तो आपको आज से कितना निवेश करना होगा?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-neutral-300 mb-1">
                    <span>समय सीमा (Years)</span>
                    <span className="text-amber-400 font-bold">{targetYears} वर्ष</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={30}
                    step={1}
                    value={targetYears}
                    onChange={(e) => setTargetYears(Number(e.target.value))}
                    className="w-full accent-[#d4af37]"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500">
                    <span>5 वर्ष</span>
                    <span>15 वर्ष (अनुशंसित)</span>
                    <span>30 वर्ष</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-neutral-300 mb-1">
                    <span>अपेक्षित वार्षिक रिटर्न (%)</span>
                    <span className="text-emerald-400 font-bold">{expectedReturn}%</span>
                  </div>
                  <input
                    type="range"
                    min={8}
                    max={18}
                    step={0.5}
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">
                    (भारत के निफ्टी 50 इंडेक्स व बिजनेस री-इन्वेस्टमेंट का ऐतिहासिक औसत 12%-14%)
                  </p>
                </div>
              </div>

              {/* Result Box */}
              <div className="bg-gradient-to-br from-neutral-900 to-[#171b26] border border-[#d4af37]/40 rounded-2xl p-5 flex flex-col justify-between text-center shadow-lg">
                <div>
                  <p className="text-xs text-neutral-400 font-medium">आवश्यक मासिक बचत व निवेश</p>
                  <p className="text-3xl sm:text-4xl font-extrabold gold-gradient-text my-2">
                    ₹{croreMonthlyRequired.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-neutral-300">प्रति माह (या रोज के ₹{Math.round(croreMonthlyRequired / 30)})</p>
                </div>

                <div className="pt-3 border-t border-neutral-800 text-[11px] text-neutral-400 leading-relaxed">
                  यदि आज आप केवल ₹500/माह से भी शुरू करें और हर साल अपने बिजनेस का मुनाफा 20% बढ़ाते जाएं, तो आप इस लक्ष्य को आसानी से पा सकते हैं!
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. PROFIT CALCULATOR */}
        {activeCalc === 'profit' && (
          <div className="space-y-6">
            <div className="border-b border-neutral-800 pb-3">
              <h3 className="text-xl font-bold text-white">
                यूनिट और मासिक शुद्ध मुनाफा कैलकुलेटर
              </h3>
              <p className="text-xs text-neutral-400">
                एक पीस पर होने वाली लागत और दुकान के कुल खर्च काटकर असली शुद्ध मुनाफा निकालें।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  एक पीस की बिक्री कीमत (Selling Price ₹)
                </label>
                <input
                  type="number"
                  value={unitSellPrice}
                  onChange={(e) => setUnitSellPrice(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  एक पीस का कच्चा माल/लागत (Cost Price ₹)
                </label>
                <input
                  type="number"
                  value={unitCostPrice}
                  onChange={(e) => setUnitCostPrice(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  प्रतिदिन बिकने वाले पीस (Daily Units)
                </label>
                <input
                  type="number"
                  value={dailyUnitsSold}
                  onChange={(e) => setDailyUnitsSold(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  मासिक अन्य खर्चे - किराया, बिजली, भाड़ा (₹)
                </label>
                <input
                  type="number"
                  value={monthlyShopExpense}
                  onChange={(e) => setMonthlyShopExpense(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center pt-2">
              <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                <span className="text-[10px] text-neutral-400">एक पीस पर मार्जिन</span>
                <p className="text-base font-bold text-white">₹{unitMargin}</p>
              </div>
              <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                <span className="text-[10px] text-neutral-400">मासिक कुल बिक्री</span>
                <p className="text-base font-bold text-neutral-300">
                  ₹{(unitSellPrice * dailyUnitsSold * 30).toLocaleString('en-IN')}
                </p>
              </div>
              <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/40">
                <span className="text-[10px] text-emerald-300">मासिक शुद्ध मुनाफा (Net Profit)</span>
                <p className="text-lg font-extrabold text-emerald-400">
                  ₹{netMonthlyProfit.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. SAVINGS 70-20-10 */}
        {activeCalc === 'saving' && (
          <div className="space-y-6">
            <div className="border-b border-neutral-800 pb-3">
              <h3 className="text-xl font-bold text-white">
                कम आय के लिए 70-20-10 बचत कैलकुलेटर
              </h3>
              <p className="text-xs text-neutral-400">
                ₹200-₹500 रोज कमाने वालों के लिए सबसे व्यावहारिक वित्तीय ढांचा।
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                आपकी कुल मासिक कमाई (Total Monthly Income ₹)
              </label>
              <input
                type="number"
                value={savingTotalIncome}
                onChange={(e) => setSavingTotalIncome(Number(e.target.value))}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-base text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 space-y-1">
                <span className="text-xs font-bold text-amber-400">70% अनिवार्य भोजन व छत</span>
                <p className="text-2xl font-bold text-white">₹{needs70}</p>
                <p className="text-[11px] text-neutral-400">रोटी, कपड़ा, मकान व बुनियादी जीवन हेतु।</p>
              </div>

              <div className="bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/40 space-y-1">
                <span className="text-xs font-bold text-emerald-400">20% बिजनेस व बचत फंड</span>
                <p className="text-2xl font-extrabold text-emerald-300">₹{businessSaving20}</p>
                <p className="text-[11px] text-neutral-300">यह आपके पहले व्यापार की पूंजी बनेगी।</p>
              </div>

              <div className="bg-blue-950/30 p-4 rounded-xl border border-blue-500/40 space-y-1">
                <span className="text-xs font-bold text-blue-400">10% आपातकालीन ढाल</span>
                <p className="text-2xl font-bold text-blue-300">₹{emergency10}</p>
                <p className="text-[11px] text-neutral-400">बीमारी या संकट में किसी के आगे हाथ न फैलाना पड़े।</p>
              </div>
            </div>
          </div>
        )}

        {/* 6. SIP / MUTUAL FUND */}
        {activeCalc === 'sip' && (
          <div className="space-y-6">
            <div className="border-b border-neutral-800 pb-3">
              <h3 className="text-xl font-bold text-white">
                म्यूचुअल फंड व एसआईपी (SIP) कैलकुलेटर
              </h3>
              <p className="text-xs text-neutral-400">
                हर महीने की छोटी सी बचत समय के साथ कितनी विशाल बन सकती है।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">मासिक निवेश (₹)</label>
                <input
                  type="number"
                  value={sipMonthly}
                  onChange={(e) => setSipMonthly(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">अवधि (Years)</label>
                <input
                  type="number"
                  value={sipYears}
                  onChange={(e) => setSipYears(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">अपेक्षित रिटर्न (%)</label>
                <input
                  type="number"
                  value={sipRate}
                  onChange={(e) => setSipRate(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                <span className="text-[10px] text-neutral-400">कुल जमा पूंजी</span>
                <p className="text-sm sm:text-base font-bold text-white">₹{sipTotalInvested.toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                <span className="text-[10px] text-neutral-400">कंपाउंडिंग से अर्जित लाभ</span>
                <p className="text-sm sm:text-base font-bold text-emerald-400">₹{sipTotalReturns.toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-amber-500/10 p-3 rounded-xl border border-[#d4af37]/40">
                <span className="text-[10px] text-[#d4af37]">कुल मैच्योरिटी मूल्य</span>
                <p className="text-base sm:text-lg font-extrabold text-[#d4af37]">₹{sipFutureValue.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        )}

        {/* 9. NET WORTH CALCULATOR */}
        {activeCalc === 'networth' && (
          <div className="space-y-6">
            <div className="border-b border-neutral-800 pb-3">
              <h3 className="text-xl font-bold text-white">
                वास्तविक नेटवर्थ कैलकुलेटर (Net Worth)
              </h3>
              <p className="text-xs text-neutral-400">
                कुल संपत्तियां (Assets) - कुल देनदारियां/कर्ज (Liabilities) = आपकी सच्ची दौलत
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-3 bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
                <h4 className="text-xs font-bold text-emerald-400 uppercase">कुल संपत्तियां (Assets)</h4>
                <div>
                  <label className="text-[11px] text-neutral-400">नकद व बैंक बैलेंस (₹)</label>
                  <input
                    type="number"
                    value={assetCash}
                    onChange={(e) => setAssetCash(Number(e.target.value))}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-neutral-400">दुकान का माल / स्टॉक / औजार (₹)</label>
                  <input
                    type="number"
                    value={assetInventory}
                    onChange={(e) => setAssetInventory(Number(e.target.value))}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-neutral-400">जमीन / मकान का मूल्य (₹)</label>
                  <input
                    type="number"
                    value={assetProperty}
                    onChange={(e) => setAssetProperty(Number(e.target.value))}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-neutral-400">सोना / FD / निवेश (₹)</label>
                  <input
                    type="number"
                    value={assetInvestments}
                    onChange={(e) => setAssetInvestments(Number(e.target.value))}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-3 bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
                <h4 className="text-xs font-bold text-red-400 uppercase">कुल देनदारियां (Debts & Loans)</h4>
                <div>
                  <label className="text-[11px] text-neutral-400">बैंक / संस्थागत कर्ज (₹)</label>
                  <input
                    type="number"
                    value={debtLoans}
                    onChange={(e) => setDebtLoans(Number(e.target.value))}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-neutral-400">साहूकार / रिश्तेदारों की उधारी (₹)</label>
                  <input
                    type="number"
                    value={debtInformal}
                    onChange={(e) => setDebtInformal(Number(e.target.value))}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs text-neutral-400">आपकी कुल शुद्ध संपत्ति (Net Worth)</span>
                <p className={`text-2xl font-extrabold ${netWorthValue >= 0 ? 'text-[#d4af37]' : 'text-red-400'}`}>
                  ₹{netWorthValue.toLocaleString('en-IN')}
                </p>
              </div>
              <span className="text-xs text-neutral-400 text-right">
                Assets: ₹{totalAssets.toLocaleString('en-IN')}<br/>
                Debts: ₹{totalLiabilities.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        )}

        {/* 1. DAILY INCOME */}
        {activeCalc === 'daily' && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-white">दैनिक आमदनी व प्रति घंटा मूल्य</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-neutral-300">रोज कितने घंटे काम करते हैं?</label>
                <input
                  type="number"
                  value={dailyHours}
                  onChange={(e) => setDailyHours(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-300">प्रति घंटा कमाई (₹/घंटा)</label>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
            </div>
            <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 text-center">
              <span className="text-xs text-neutral-400">कुल दैनिक आय</span>
              <p className="text-3xl font-extrabold text-[#d4af37]">₹{calculatedDailyTotal}</p>
            </div>
          </div>
        )}

        {/* 2. MONTHLY INCOME */}
        {activeCalc === 'monthly' && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-white">मासिक कुल आमदनी कैलकुलेटर</h3>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-neutral-300">दैनिक दिहाड़ी (₹)</label>
                <input
                  type="number"
                  value={monthlyDailyWage}
                  onChange={(e) => setMonthlyDailyWage(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-300">महीने के काम के दिन</label>
                <input
                  type="number"
                  value={workingDays}
                  onChange={(e) => setWorkingDays(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-300">अतिरिक्त साइड कमाई (₹)</label>
                <input
                  type="number"
                  value={sideIncome}
                  onChange={(e) => setSideIncome(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
            </div>
            <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 text-center">
              <span className="text-xs text-neutral-400">कुल अनुमानित मासिक कमाई</span>
              <p className="text-3xl font-extrabold text-emerald-400">₹{calculatedMonthlyTotal.toLocaleString('en-IN')}</p>
            </div>
          </div>
        )}

        {/* 5. BREAK-EVEN CALCULATOR */}
        {activeCalc === 'breakeven' && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-white">ब्रेक-ईवन (Break-Even) कैलकुलेटर</h3>
            <p className="text-xs text-neutral-400">
              आपको महीने में कम से कम कितने पीस बेचने होंगे ताकि दुकान का किराया और बिजली निकल सके और घाटा न हो?
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-neutral-300">दुकान का फिक्स खर्च (₹)</label>
                <input
                  type="number"
                  value={fixedOverheadMonthly}
                  onChange={(e) => setFixedOverheadMonthly(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-300">सामान का बिक्री भाव (₹)</label>
                <input
                  type="number"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-300">प्रति पीस कच्ची लागत (₹)</label>
                <input
                  type="number"
                  value={itemVariableCost}
                  onChange={(e) => setItemVariableCost(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
            </div>
            <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 text-center">
              <span className="text-xs text-neutral-400">नो-प्रॉफिट नो-लॉस के लिए न्यूनतम मासिक बिक्री</span>
              <p className="text-3xl font-extrabold text-[#d4af37]">{breakEvenUnits} पीस</p>
              <p className="text-xs text-neutral-400 mt-1">
                (यानी रोज कम से कम {Math.ceil(breakEvenUnits / 30)} पीस बिकना जरूरी है)
              </p>
            </div>
          </div>
        )}

        {/* 7. COMPOUND INTEREST */}
        {activeCalc === 'compound' && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-white">चक्रवृद्धि ब्याज (Compound Interest) कैलकुलेटर</h3>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-neutral-300">एकमुश्त मूलधन (₹)</label>
                <input
                  type="number"
                  value={compoundPrincipal}
                  onChange={(e) => setCompoundPrincipal(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-300">अवधि (Years)</label>
                <input
                  type="number"
                  value={compoundYears}
                  onChange={(e) => setCompoundYears(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-300">वार्षिक ब्याज दर (%)</label>
                <input
                  type="number"
                  value={compoundRate}
                  onChange={(e) => setCompoundRate(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
            </div>
            <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 text-center">
              <span className="text-xs text-neutral-400">{compoundYears} साल बाद कुल राशि</span>
              <p className="text-3xl font-extrabold text-[#d4af37]">₹{compoundFutureValue.toLocaleString('en-IN')}</p>
            </div>
          </div>
        )}

        {/* 8. BUSINESS GROWTH */}
        {activeCalc === 'growth' && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-white">बिजनेस ग्रोथ रेट कैलकुलेटर</h3>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-neutral-300">वर्तमान मासिक बिक्री (₹)</label>
                <input
                  type="number"
                  value={currentSales}
                  onChange={(e) => setCurrentSales(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-300">लक्ष्य मासिक बिक्री (₹)</label>
                <input
                  type="number"
                  value={targetSales}
                  onChange={(e) => setTargetSales(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-300">समय सीमा (महीने)</label>
                <input
                  type="number"
                  value={growthMonths}
                  onChange={(e) => setGrowthMonths(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
            </div>
            <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 text-center">
              <span className="text-xs text-neutral-400">आवश्यक मासिक वृद्धि दर (MoM Growth Rate)</span>
              <p className="text-3xl font-extrabold text-emerald-400">{monthlyGrowthRequired}% प्रति माह</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
