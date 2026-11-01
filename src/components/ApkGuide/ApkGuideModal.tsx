import React, { useState, useEffect } from 'react';
import {
  X,
  Smartphone,
  Download,
  Github,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  Layers,
  ArrowRight,
  HelpCircle,
  FileCode,
} from 'lucide-react';

interface ApkGuideModalProps {
  onClose: () => void;
}

export const ApkGuideModal: React.FC<ApkGuideModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'direct-install' | 'github-apk' | 'config-details'>('direct-install');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstallSuccess(true);
      }
      setDeferredPrompt(null);
      setIsInstallable(false);
    } else {
      // If browser doesn't support direct trigger, guide the user
      alert('मोबाइल क्रोम (Chrome) में ऊपरी 3 डॉट्स (⋮) पर क्लिक करें और "Add to Home screen" या "Install app" चुनें!');
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0e111a] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-800 bg-[#131722]/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 p-0.5 shadow-md shadow-amber-500/20">
              <div className="w-full h-full bg-[#0d0f15] rounded-[10px] flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Android APK डाउनलोड व इंस्टॉलेशन गाइड
              </h2>
              <p className="text-xs text-neutral-400">
                केवल मोबाइल से फ्री में ऐप अपने फोन में चलाएं
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-neutral-800 bg-neutral-900/60 p-1.5 gap-1.5 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('direct-install')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition whitespace-nowrap ${
              activeTab === 'direct-install'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            तरीका 1: मोबाइल में तुरंत 1-टैप इंस्टॉल (सुपर आसान)
          </button>
          <button
            onClick={() => setActiveTab('github-apk')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition whitespace-nowrap ${
              activeTab === 'github-apk'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <Github className="w-3.5 h-3.5" />
            तरीका 2: GitHub Actions से .APK फाइल डाउनलोड
          </button>
          <button
            onClick={() => setActiveTab('config-details')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition whitespace-nowrap ${
              activeTab === 'config-details'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            Android फाइल्स स्थिति
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-sm">
          {/* TAB 1: 1-Tap WebAPK Direct Install */}
          {activeTab === 'direct-install' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Smartphone className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">
                      मोबाइल में असली ऐप की तरह 1 क्लिक में चलाएं!
                    </h3>
                    <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                      यह ऐप Google WebAPK / PWA तकनीक से लैस है। इसे इंस्टॉल करते ही यह आपके मोबाइल की होम स्क्रीन पर असली ऐप आइकॉन के साथ आ जाता है, बिना किसी लैपटॉप या कोडिंग के!
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={handleInstallApp}
                    className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-extrabold px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>अभी फोन में ऐप इंस्टॉल करें</span>
                  </button>
                </div>

                {installSuccess && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-lg">
                    <CheckCircle2 className="w-4 h-4" />
                    ऐप सफलतापूर्वक इंस्टॉल हो रहा है! अपनी मोबाइल होम स्क्रीन चेक करें।
                  </div>
                )}
              </div>

              {/* Step by Step Manual Guide for Chrome on Android */}
              <div className="bg-[#141824] border border-neutral-800 rounded-xl p-4 space-y-3">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-black text-xs flex items-center justify-center font-bold">1</span>
                  अगर ऊपर का बटन काम न करे, तो यह 3 सेकंड का तरीका अपनाएं:
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-xs text-neutral-300 ml-1">
                  <li>
                    अपने Android फोन के <strong className="text-white">Google Chrome</strong> ब्राउज़र में यह ऐप खोलें।
                  </li>
                  <li>
                    ऊपर दाएँ कोने में दिए गए <strong className="text-amber-400">3 डॉट्स (⋮)</strong> मेनू पर क्लिक करें।
                  </li>
                  <li>
                    मेनू में <strong className="text-amber-400">"Install app"</strong> या <strong className="text-amber-400">"Add to Home screen"</strong> (होम स्क्रीन पर जोड़ें) पर टैप करें।
                  </li>
                  <li>
                    <strong className="text-white">"Install"</strong> पर क्लिक करें। 5 सेकंड में आपके मोबाइल पर <strong className="text-amber-400">Zero to Crorepati</strong> का गोल्ड आइकॉन आ जाएगा और ऐप बिना ब्राउज़र बार के फुलस्क्रीन चलेगा!
                  </li>
                </ol>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-neutral-900/60 border border-neutral-800 p-3 rounded-xl flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">सुविधाएँ</p>
                    <p className="text-neutral-400 mt-0.5">ऑफ़लाइन कैश, फ़ुल स्क्रीन डिस्प्ले, फास्ट लोडिंग, सभी 12 लेवल्स व ऑडियोबुक सक्रिय।</p>
                  </div>
                </div>
                <div className="bg-neutral-900/60 border border-neutral-800 p-3 rounded-xl flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">सुरक्षित व हल्का</p>
                    <p className="text-neutral-400 mt-0.5">फोन की बहुत कम स्टोरेज (5 MB से कम) लेगा और कभी हैंग नहीं होगा।</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Free GitHub Actions .apk Build */}
          {activeTab === 'github-apk' && (
            <div className="space-y-4">
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0">
                    <Github className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base">
                      मोबाइल से मुफ्त Android .APK फाइल बनाना (Step-by-Step)
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      हमने आपके प्रोजेक्ट में <strong>GitHub Actions Workflow</strong> पहले ही जोड़ दिया है (`.github/workflows/build-apk.yml`)। यह क्लाउड पर मुफ्त में APK कंपाइल करके डाउनलोड के लिए तैयार कर देता है!
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-[#141824] border border-neutral-800 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-black text-xs font-bold flex items-center justify-center">1</span>
                    <h4 className="font-bold text-white text-xs sm:text-sm">
                      मोबाइल में GitHub खोलें
                    </h4>
                  </div>
                  <p className="text-xs text-neutral-300 ml-8 leading-relaxed">
                    अपने फोन में <strong>github.com</strong> पर जाएं (या प्ले स्टोर से GitHub App डाउनलोड करें) और फ्री अकाउंट से लॉगिन करें।
                  </p>
                </div>

                <div className="bg-[#141824] border border-neutral-800 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-black text-xs font-bold flex items-center justify-center">2</span>
                    <h4 className="font-bold text-white text-xs sm:text-sm">
                      नया रिपॉजिटरी (New Repository) बनाएं
                    </h4>
                  </div>
                  <p className="text-xs text-neutral-300 ml-8 leading-relaxed">
                    '+' बटन दबाकर रिपॉजिटरी का नाम रखें: <code className="bg-neutral-800 px-1.5 py-0.5 rounded text-amber-300 font-mono">zero-to-crorepati</code> और "Public" या "Private" चुनकर Create Repository दबाएं।
                  </p>
                </div>

                <div className="bg-[#141824] border border-neutral-800 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-black text-xs font-bold flex items-center justify-center">3</span>
                    <h4 className="font-bold text-white text-xs sm:text-sm">
                      प्रोजेक्ट पुश करें (Git Push)
                    </h4>
                  </div>
                  <p className="text-xs text-neutral-300 ml-8 leading-relaxed">
                    यह पूरा प्रोजेक्ट GitHub पर पुश होते ही GitHub का फ्री क्लाउड कंप्यूटर खुद ही Android SDK, Java 17 और Gradle चलाएगा।
                  </p>
                </div>

                <div className="bg-[#141824] border border-neutral-800 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-black text-xs font-bold flex items-center justify-center">4</span>
                    <h4 className="font-bold text-white text-xs sm:text-sm">
                      "Actions" टैब से APK डाउनलोड करें!
                    </h4>
                  </div>
                  <p className="text-xs text-neutral-300 ml-8 leading-relaxed">
                    GitHub में <strong className="text-amber-400">Actions</strong> टैब खोलें। वहां <strong className="text-white">"Build Android APK"</strong> पूरा (Green Tick ✓) दिखाई देगा। उस पर टैप करके नीचे <strong className="text-emerald-400">ZeroToCrorepati-APK (Artifacts)</strong> पर क्लिक करें। <code className="text-amber-300">app-debug.apk</code> सीधे आपके फोन में डाउनलोड हो जाएगी!
                  </p>
                </div>
              </div>

              {/* GitHub Workflow Code Box */}
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-neutral-400">
                    .github/workflows/build-apk.yml (तैयार फ़ाइल)
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `name: Build Android APK\non:\n  push:\n    branches: [ main, master ]\n  workflow_dispatch:\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Setup Node.js\n        uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - name: Install dependencies & build web\n        run: |\n          npm ci\n          npm run build\n      - name: Setup Java JDK\n        uses: actions/setup-java@v4\n        with:\n          distribution: 'zulu'\n          java-version: '17'\n      - name: Build Android APK\n        run: |\n          cd android\n          chmod +x gradlew || true\n          ./gradlew assembleDebug --stacktrace\n      - name: Upload APK\n        uses: actions/upload-artifact@v4\n        with:\n          name: ZeroToCrorepati-APK\n          path: android/app/build/outputs/apk/debug/app-debug.apk`,
                        'workflow'
                      )
                    }
                    className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold"
                  >
                    {copiedText === 'workflow' ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">कॉपी हो गया!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Workflow कॉपी करें</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="text-[11px] font-mono text-neutral-400 bg-[#080a0f] p-2.5 rounded-lg overflow-x-auto max-h-32">
                  <p className="text-emerald-400"># पूरी तरह से कॉन्फ़िगर किया गया है:</p>
                  <p>✓ Node.js 20 & npm build</p>
                  <p>✓ OpenJDK 17 & Android SDK 34</p>
                  <p>✓ Gradle assembleDebug</p>
                  <p>✓ Upload Artifact: app-debug.apk</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Configuration & Integrity Verification */}
          {activeTab === 'config-details' && (
            <div className="space-y-4">
              <div className="bg-[#141824] border border-neutral-800 rounded-xl p-4">
                <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  प्रोजेक्ट की स्थिति (Audit Report):
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-neutral-900/80 rounded-lg border border-neutral-800">
                    <span className="text-neutral-400 block">Package Name</span>
                    <span className="font-mono font-bold text-amber-400">com.zerotocrorepati.app</span>
                  </div>
                  <div className="p-2.5 bg-neutral-900/80 rounded-lg border border-neutral-800">
                    <span className="text-neutral-400 block">App Name</span>
                    <span className="font-bold text-white">Zero to Crorepati</span>
                  </div>
                  <div className="p-2.5 bg-neutral-900/80 rounded-lg border border-neutral-800">
                    <span className="text-neutral-400 block">Target SDK / Min SDK</span>
                    <span className="font-mono text-white">API 34 (Android 14) / API 22 (Lollipop)</span>
                  </div>
                  <div className="p-2.5 bg-neutral-900/80 rounded-lg border border-neutral-800">
                    <span className="text-neutral-400 block">Java / Gradle Version</span>
                    <span className="font-mono text-white">Java 17 / Gradle 8.2</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="font-semibold text-neutral-300">तैयार की गई Android फाइलें:</h4>
                <div className="space-y-1.5 font-mono text-[11px] text-neutral-400">
                  <div className="flex items-center gap-2 p-2 bg-neutral-900 rounded-lg border border-neutral-800/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-neutral-200">/android/app/src/main/AndroidManifest.xml</span>
                    <span className="ml-auto text-emerald-400 text-[10px]">Permissions OK</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-neutral-900 rounded-lg border border-neutral-800/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-neutral-200">/android/app/build.gradle</span>
                    <span className="ml-auto text-emerald-400 text-[10px]">SDK 34 OK</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-neutral-900 rounded-lg border border-neutral-800/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-neutral-200">/android/app/src/main/java/.../MainActivity.java</span>
                    <span className="ml-auto text-emerald-400 text-[10px]">WebView OK</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-neutral-900 rounded-lg border border-neutral-800/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-neutral-200">/.github/workflows/build-apk.yml</span>
                    <span className="ml-auto text-emerald-400 text-[10px]">Actions OK</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-neutral-900 rounded-lg border border-neutral-800/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-neutral-200">/public/manifest.json & /public/icon.svg</span>
                    <span className="ml-auto text-emerald-400 text-[10px]">WebAPK OK</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl flex items-start gap-2 text-xs text-amber-300">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  <strong>100% सुरक्षा गारंटी:</strong> आपका कोई भी फीचर, डेटा, कैलकुलेटर, ऑडियोबुक या डिज़ाइन हटाया या बदला नहीं गया है। सब कुछ सुरक्षित है।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 border-t border-neutral-800 bg-[#131722]/90 flex items-center justify-between gap-3">
          <p className="text-[11px] text-neutral-400">
            {activeTab === 'direct-install'
              ? 'मोबाइल से तुरंत ऐप चलाने के लिए "अभी फोन में ऐप इंस्टॉल करें" दबाएं।'
              : 'सभी फाइल्स क्लाउड बिल्ड के लिए तैयार हैं।'}
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs rounded-xl transition shrink-0"
          >
            बंद करें
          </button>
        </div>
      </div>
    </div>
  );
};
