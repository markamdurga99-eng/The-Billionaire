import React, { useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  X,
  Maximize2,
  Minimize2,
  Clock,
  Sparkles,
  BookmarkCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AudioPlayerBar: React.FC = () => {
  const { audioState, pauseAudio, resumeAudio, stopAudio, seekAudio, setAudioPlaybackRate } =
    useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!audioState.trackId && !audioState.isPlaying) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = audioState.duration
    ? Math.min(100, (audioState.currentTime / audioState.duration) * 100)
    : 0;

  const speedOptions = [1.0, 1.25, 1.5, 2.0];

  return (
    <>
      {/* Mini Bottom Bar Player */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-40 bg-[#12151e]/95 backdrop-blur-md border-t border-[#d4af37]/30 shadow-2xl px-3 py-2.5 transition-all">
        {/* Progress Bar (Clickable/Visual) */}
        <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden mb-2 relative">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          {/* Track Info */}
          <div
            className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
            onClick={() => setIsExpanded(true)}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-600/30 border border-[#d4af37]/40 flex items-center justify-center shrink-0">
              <Volume2 className="w-5 h-5 text-[#d4af37] animate-pulse" />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-white truncate flex items-center gap-1.5">
                {audioState.trackTitle || 'ऑडियोबुक चल रहा है'}
                <span className="text-[10px] bg-[#d4af37]/20 text-[#d4af37] px-1.5 py-0.5 rounded border border-[#d4af37]/30 shrink-0">
                  हिंदी आवाज
                </span>
              </h4>
              <p className="text-xs text-neutral-400 truncate">
                {audioState.trackSubtitle || 'Zero to Crorepati Audio'}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1 md:gap-3 shrink-0">
            {/* Speed Badge */}
            <button
              onClick={() => {
                const nextIndex =
                  (speedOptions.indexOf(audioState.playbackRate) + 1) % speedOptions.length;
                setAudioPlaybackRate(speedOptions[nextIndex]);
              }}
              className="px-2 py-1 text-xs font-bold rounded bg-neutral-800 text-[#d4af37] hover:bg-neutral-700 transition"
              title="ऑडियो स्पीड बदलें"
            >
              {audioState.playbackRate}x
            </button>

            {/* Rewind 15s */}
            <button
              onClick={() => seekAudio(-15)}
              className="p-1.5 text-neutral-400 hover:text-white transition"
              title="15 सेकंड पीछे"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={audioState.isPlaying ? pauseAudio : resumeAudio}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition"
              title={audioState.isPlaying ? 'रोकें' : 'चलाएं'}
            >
              {audioState.isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            {/* Forward 15s */}
            <button
              onClick={() => seekAudio(15)}
              className="p-1.5 text-neutral-400 hover:text-white transition"
              title="15 सेकंड आगे"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Expand / Close */}
            <button
              onClick={() => setIsExpanded(true)}
              className="p-1.5 text-neutral-400 hover:text-white hidden sm:block"
              title="बड़ा करें"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={stopAudio}
              className="p-1.5 text-neutral-400 hover:text-red-400 transition"
              title="बंद करें"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Modal Audio Player */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="bg-[#141822] border border-[#d4af37]/40 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-semibold text-[#d4af37] tracking-wider uppercase">
                  ऑडियोबुक और पाठ वाचक
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1.5 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setIsExpanded(false);
                    stopAudio();
                  }}
                  className="p-1.5 rounded-lg bg-neutral-800 text-neutral-300 hover:text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Center Vinyl/Art */}
            <div className="p-6 flex flex-col items-center text-center">
              <div className="relative w-40 h-40 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-amber-950/40 border-2 border-[#d4af37]/40 flex items-center justify-center shadow-2xl overflow-hidden mb-5">
                <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:12px_12px] opacity-20" />
                <div
                  className={`w-28 h-28 rounded-full border-4 border-amber-500/30 flex items-center justify-center bg-black/60 shadow-inner ${audioState.isPlaying ? 'animate-spin [animation-duration:8s]' : ''}`}
                >
                  <Sparkles className="w-10 h-10 text-[#d4af37]" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-1 px-4 leading-tight">
                {audioState.trackTitle}
              </h3>
              <p className="text-sm text-neutral-400 mb-4">{audioState.trackSubtitle}</p>

              {/* Progress Slider */}
              <div className="w-full px-2 mb-2">
                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden relative cursor-pointer">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-neutral-500 mt-1.5 font-mono">
                  <span>{formatTime(audioState.currentTime)}</span>
                  <span>{formatTime(audioState.duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6 mt-3">
                {/* 15s back */}
                <button
                  onClick={() => seekAudio(-15)}
                  className="p-2.5 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 transition"
                  title="15 सेकंड पीछे"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>

                {/* Big Play/Pause */}
                <button
                  onClick={audioState.isPlaying ? pauseAudio : resumeAudio}
                  className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition"
                >
                  {audioState.isPlaying ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  )}
                </button>

                {/* 15s forward */}
                <button
                  onClick={() => seekAudio(15)}
                  className="p-2.5 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 transition"
                  title="15 सेकंड आगे"
                >
                  <RotateCw className="w-5 h-5" />
                </button>
              </div>

              {/* Speed Buttons */}
              <div className="flex items-center gap-2 mt-5">
                <span className="text-xs text-neutral-400 mr-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> गति (Speed):
                </span>
                {speedOptions.map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setAudioPlaybackRate(rate)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition ${
                      audioState.playbackRate === rate
                        ? 'bg-[#d4af37] text-black border-[#d4af37]'
                        : 'bg-neutral-800/60 text-neutral-300 border-neutral-700 hover:border-neutral-500'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>

            {/* Synchronized Text View / Transcript */}
            <div className="flex-1 overflow-y-auto px-6 py-4 bg-neutral-900/60 border-t border-neutral-800/80 text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                  <BookmarkCheck className="w-3.5 h-3.5 text-[#d4af37]" /> हिंदी ऑडियो ट्रांसक्रिप्ट (Audio Script)
                </span>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed font-sans whitespace-pre-line">
                {audioState.textToSpeak || 'ऑडियो सामग्री लोड हो रही है...'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
