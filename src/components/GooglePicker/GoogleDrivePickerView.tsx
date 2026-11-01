import React, { useState, useEffect } from 'react';
import {
  FolderOpen,
  FileText,
  ExternalLink,
  Trash2,
  Sparkles,
  Bot,
  AlertCircle,
  CheckCircle2,
  HardDrive,
  LogOut,
  UploadCloud,
  FileSpreadsheet,
  FileImage,
  RefreshCw,
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  initAuth,
  googleSignIn,
  logoutGoogle,
  getAccessToken,
} from '../../services/googleAuth';
import {
  openGooglePicker,
  PickedGoogleDriveFile,
} from '../../services/googlePicker';
import { useApp } from '../../context/AppContext';

interface GoogleDrivePickerViewProps {
  onAnalyzeWithAi?: (file: PickedGoogleDriveFile) => void;
}

export const GoogleDrivePickerView: React.FC<GoogleDrivePickerViewProps> = ({
  onAnalyzeWithAi,
}) => {
  const { user: appUser, updateUser } = useApp();
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isPickerOpening, setIsPickerOpening] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Saved picked files in local state
  const [pickedFiles, setPickedFiles] = useState<PickedGoogleDriveFile[]>(() => {
    try {
      const saved = localStorage.getItem('ztc_picked_drive_files');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ztc_picked_drive_files', JSON.stringify(pickedFiles));
    } catch (e) {}
  }, [pickedFiles]);

  // Initialize auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setGoogleUser(user);
        setAccessToken(token);
      },
      () => {
        // Not authenticated
        setGoogleUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    setErrorMsg(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setGoogleUser(result.user);
        setAccessToken(result.accessToken);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        err.message || 'Google साइन-इन असफल रहा। कृपया दोबारा प्रयास करें।'
      );
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    const confirmed = window.confirm('क्या आप Google खाते से लॉग आउट करना चाहते हैं?');
    if (!confirmed) return;
    await logoutGoogle();
    setGoogleUser(null);
    setAccessToken(null);
  };

  const handleOpenPicker = async () => {
    setErrorMsg(null);
    setIsPickerOpening(true);

    try {
      let currentToken = accessToken;
      if (!currentToken) {
        // Attempt sign in if not already signed in
        const result = await googleSignIn();
        if (!result) throw new Error('कृपया पहले Google खाते से जुड़ें।');
        currentToken = result.accessToken;
        setGoogleUser(result.user);
        setAccessToken(result.accessToken);
      }

      await openGooglePicker({
        accessToken: currentToken,
        onFilePicked: (file) => {
          setPickedFiles((prev) => {
            const exists = prev.some((f) => f.id === file.id);
            if (exists) return prev;
            return [file, ...prev];
          });
          // Award learning points for connecting Google Drive
          updateUser({ points: appUser.points + 40 });
        },
        onCancel: () => {
          console.log('Picker cancelled by user');
        },
      });
    } catch (err: any) {
      console.error('Picker error:', err);
      setErrorMsg(
        err.message || 'Google Picker खोलने में समस्या हुई। कृपया पुनः प्रयास करें।'
      );
    } finally {
      setIsPickerOpening(false);
    }
  };

  // Explicit confirmation dialog for deleting items as strictly mandated by workspace-integration guidelines
  const handleDeleteFile = (fileId: string, fileName: string) => {
    const confirmed = window.confirm(
      `क्या आप निश्चित हैं कि आप इस फ़ाइल '${fileName}' को ऐप सूची से हटाना चाहते हैं?`
    );
    if (!confirmed) return;

    setPickedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('spreadsheet') || mimeType.includes('sheet') || mimeType.includes('excel')) {
      return <FileSpreadsheet className="w-5 h-5 text-emerald-400" />;
    }
    if (mimeType.includes('image')) {
      return <FileImage className="w-5 h-5 text-amber-400" />;
    }
    return <FileText className="w-5 h-5 text-blue-400" />;
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
          <HardDrive className="w-3.5 h-3.5 text-blue-400" />
          <span>Google Picker & Google Drive इंटीग्रेशन</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Google Drive से बिजनेस दस्तावेज़ और पुस्तकें
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Google Picker के माध्यम से अपने व्यक्तिगत Google Drive से व्यावसायिक बही-खाता, चालान, रसीदें, PDF नोट्स और किताबें सुरक्षित रूप से चुनें।
        </p>
      </div>

      {errorMsg && (
        <div className="max-w-3xl mx-auto p-4 bg-red-950/60 border border-red-500/50 rounded-2xl text-xs sm:text-sm text-red-200 flex items-center gap-2.5 shadow-lg">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Connection & Launcher Card */}
      <div className="max-w-3xl mx-auto bg-[#11141c] border border-neutral-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <FolderOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Google खाता स्थिति</h3>
              {googleUser ? (
                <p className="text-xs text-emerald-400 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>जुड़ा हुआ है: {googleUser.email || googleUser.displayName}</span>
                </p>
              ) : (
                <p className="text-xs text-neutral-400 mt-0.5">
                  Google Drive से फ़ाइलें चुनने के लिए साइन-इन करें
                </p>
              )}
            </div>
          </div>

          <div>
            {!googleUser ? (
              /* Official Google Sign-In Button as required by guidelines */
              <button
                onClick={handleSignIn}
                disabled={isSigningIn}
                className="gsi-material-button inline-flex items-center justify-center border border-neutral-700 bg-white hover:bg-neutral-100 text-neutral-800 font-semibold px-4 py-2.5 rounded-xl transition shadow-sm text-xs sm:text-sm cursor-pointer disabled:opacity-50"
              >
                <div className="w-4 h-4 mr-2.5 shrink-0">
                  <svg viewBox="0 0 48 48" className="w-full h-full">
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                </div>
                <span>{isSigningIn ? 'साइन-इन हो रहा है...' : 'Sign in with Google'}</span>
              </button>
            ) : (
              <button
                onClick={handleSignOut}
                className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold border border-neutral-700 transition flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>लॉग आउट</span>
              </button>
            )}
          </div>
        </div>

        {/* Primary Action Button: Launch Google Picker */}
        <div className="bg-gradient-to-br from-[#151926] to-[#0e111a] border border-[#d4af37]/30 rounded-2xl p-5 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-[#d4af37] flex items-center justify-center mx-auto">
            <UploadCloud className="w-6 h-6" />
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              Google Picker डायलॉग खोलें
            </h4>
            <p className="text-xs text-neutral-300 max-w-md mx-auto mt-1 leading-relaxed">
              अपने Google Drive में रखी कोई भी फ़ाइल (पीडीएफ, स्प्रेडशीट, बिल, या व्यापार दस्तावेज़) सीधे इस ऐप में चुनें।
            </p>
          </div>

          <button
            onClick={handleOpenPicker}
            disabled={isPickerOpening}
            className="gold-gradient-bg text-black font-extrabold px-6 py-3 rounded-xl shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition text-xs sm:text-sm inline-flex items-center gap-2"
          >
            {isPickerOpening ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
                <span>Google Picker खुल रहा है...</span>
              </>
            ) : (
              <>
                <FolderOpen className="w-4 h-4 text-black" />
                <span>फ़ाइल चुनें (Open Google Picker)</span>
              </>
            )}
          </button>
        </div>

        {/* Practical Indian Micro-Business Use-Cases */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <div className="p-3 bg-neutral-900/70 border border-neutral-800 rounded-xl space-y-1">
            <span className="text-[11px] font-bold text-amber-400 block">१. खाता-बही व उधारी स्प्रेडशीट</span>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Google Sheets में बना ग्राहकों का उधारी हिसाब सीधे खोलें।
            </p>
          </div>

          <div className="p-3 bg-neutral-900/70 border border-neutral-800 rounded-xl space-y-1">
            <span className="text-[11px] font-bold text-emerald-400 block">२. थोक खरीद चालान व बिल</span>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              मंडी से मिले नकद या पक्के बिलों की फोटो ड्राइव से लिंक करें।
            </p>
          </div>

          <div className="p-3 bg-neutral-900/70 border border-neutral-800 rounded-xl space-y-1">
            <span className="text-[11px] font-bold text-blue-400 block">३. व्यापार पुस्तकें व नोट्स</span>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              अपनी व्यक्तिगत ई-बुक्स व सरकारी योजनाओं के PDF दस्तावेज पढ़ें।
            </p>
          </div>
        </div>
      </div>

      {/* Picked Files List */}
      <div className="max-w-3xl mx-auto space-y-3.5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <span>चुनी गई ड्राइव फ़ाइलें (Imported Drive Files)</span>
            <span className="text-xs font-normal text-neutral-400">
              ({pickedFiles.length} फ़ाइलें)
            </span>
          </h3>
        </div>

        <div className="space-y-2.5">
          {pickedFiles.map((file) => (
            <div
              key={file.id}
              className="bg-[#11141c] border border-neutral-800 hover:border-neutral-700 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition shadow-md"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 mt-0.5">
                  {getFileIcon(file.mimeType)}
                </div>

                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">
                    {file.name}
                  </h4>
                  <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                    MIME: {file.mimeType} {file.sizeBytes ? `• ${Math.round(file.sizeBytes / 1024)} KB` : ''}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                {file.url && (
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs transition flex items-center gap-1 border border-neutral-700"
                    title="Google Drive में देखें"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>देखें</span>
                  </a>
                )}

                {onAnalyzeWithAi && (
                  <button
                    onClick={() => onAnalyzeWithAi(file)}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold transition flex items-center gap-1.5"
                  >
                    <Bot className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>AI गुरु से पूछें</span>
                  </button>
                )}

                <button
                  onClick={() => handleDeleteFile(file.id, file.name)}
                  className="p-2 rounded-xl bg-neutral-900 hover:bg-red-950 text-neutral-500 hover:text-red-400 border border-neutral-800 hover:border-red-500/30 transition"
                  title="सूची से हटाएं"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {pickedFiles.length === 0 && (
            <div className="text-center py-10 bg-[#11141c] border border-neutral-800 rounded-2xl text-neutral-500 space-y-1">
              <FolderOpen className="w-8 h-8 mx-auto text-neutral-600 mb-2" />
              <p className="text-sm font-semibold">अभी कोई फ़ाइल नहीं चुनी गई है।</p>
              <p className="text-xs">
                'फ़ाइल चुनें (Open Google Picker)' बटन दबाकर अपनी पहली फ़ाइल चुनें।
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
