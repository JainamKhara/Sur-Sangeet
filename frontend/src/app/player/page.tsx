'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, 
  Repeat, ArrowLeft, Disc3, Heart, ListMusic,
  Sliders, Activity, Cpu
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import { usePlayerStore } from '../../store/usePlayerStore';
import SongCard from '../../components/SongCard';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function PlayerPage() {
  const { 
    currentSong, isPlaying, volume, isMuted, repeatMode, playlist,
    togglePlay, setIsPlaying, nextSong, previousSong, setVolume, toggleMute, setRepeatMode
  } = usePlayerStore();

  const playerRef = useRef<any>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Load YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, []);

  // Initialize YT Player when currentSong changes
  useEffect(() => {
    if (!currentSong) return;

    setProgress(0);
    setCurrentTime(0);

    const initOrLoadPlayer = () => {
      if (playerRef.current && typeof playerRef.current.loadVideoById === 'function') {
        try {
          playerRef.current.loadVideoById(currentSong.youtube_id);
          if (isPlaying) {
            playerRef.current.playVideo();
          }
        } catch (e) {
          console.warn("loadVideoById error", e);
        }
      } else if (window.YT && window.YT.Player) {
        try {
          playerRef.current = new window.YT.Player('dedicated-yt-player', {
            height: '0',
            width: '0',
            videoId: currentSong.youtube_id,
            playerVars: {
              autoplay: 1,
              controls: 0,
              modestbranding: 1,
              rel: 0,
              origin: typeof window !== 'undefined' ? window.location.origin : '',
            },
            events: {
              onReady: (event: any) => {
                setIsReady(true);
                try {
                  event.target.setVolume(isMuted ? 0 : volume);
                  event.target.playVideo();
                } catch (e) {}
                setIsPlaying(true);
              },
              onStateChange: (event: any) => {
                if (!event || event.data === undefined) return;
                if (event.data === window.YT.PlayerState.PLAYING) {
                  setIsPlaying(true);
                  if (playerRef.current && typeof playerRef.current.getDuration === 'function') {
                    const d = playerRef.current.getDuration();
                    if (d > 0) setDuration(d);
                  }
                } else if (event.data === window.YT.PlayerState.PAUSED) {
                  setIsPlaying(false);
                } else if (event.data === window.YT.PlayerState.ENDED) {
                  const state = usePlayerStore.getState();
                  if (state.repeatMode === 'one') {
                    if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
                      playerRef.current.seekTo(0, true);
                      playerRef.current.playVideo();
                    }
                  } else {
                    state.nextSong();
                  }
                }
              },
            },
          });
        } catch (err) {
          console.warn("Error instantiating YT.Player", err);
        }
      }
    };

    if (window.YT && window.YT.Player) {
      initOrLoadPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initOrLoadPlayer;
    }
  }, [currentSong ? `${currentSong.id}_${currentSong.youtube_id}` : '']);

  // Sync play/pause state
  useEffect(() => {
    if (!playerRef.current) return;
    try {
      if (isPlaying) {
        if (typeof playerRef.current.playVideo === 'function') {
          playerRef.current.playVideo();
        }
      } else {
        if (typeof playerRef.current.pauseVideo === 'function') {
          playerRef.current.pauseVideo();
        }
      }
    } catch (e) {
      console.warn("Sync play/pause error", e);
    }
  }, [isPlaying]);

  // Sync volume state
  useEffect(() => {
    if (!playerRef.current) return;
    try {
      if (typeof playerRef.current.setVolume === 'function') {
        playerRef.current.setVolume(isMuted ? 0 : volume);
      }
    } catch (e) {
      console.warn("Sync volume error", e);
    }
  }, [volume, isMuted]);

  // Track position timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPlaying) return;

      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        try {
          const curr = playerRef.current.getCurrentTime();
          const dur = playerRef.current.getDuration() || currentSong?.duration || 210;
          if (typeof curr === 'number' && !isNaN(curr) && curr >= 0) {
            setCurrentTime(curr);
            setDuration(dur);
            setProgress((curr / dur) * 100);
            return;
          }
        } catch (e) {
          // fallback below
        }
      }
      
      setCurrentTime((prevTime) => {
        const dur = duration || currentSong?.duration || 210;
        const nextTime = Math.min(prevTime + 0.5, dur);
        setProgress((nextTime / dur) * 100);
        return nextTime;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isPlaying, currentSong?.id, duration]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPercent = parseFloat(e.target.value);
    const dur = duration || currentSong?.duration || 210;
    const newTime = (newPercent / 100) * dur;

    setProgress(newPercent);
    setCurrentTime(newTime);

    if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
      try {
        playerRef.current.seekTo(newTime, true);
        if (isPlaying && typeof playerRef.current.playVideo === 'function') {
          playerRef.current.playVideo();
        }
      } catch (err) {
        console.warn("YouTube seek error", err);
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] theme-bg-main text-[#f1ede6] theme-text-main font-sans antialiased pb-16 bg-grain transition-colors" suppressHydrationWarning>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-8 pt-8 space-y-8 relative z-10 font-mono" suppressHydrationWarning>
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#232736] theme-border pb-4" suppressHydrationWarning>
          <Link
            href="/"
            className="text-[10px] sm:text-xs font-black uppercase tracking-wider inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-[#12141c] theme-bg-card border-2 border-[#232736] theme-border text-slate-900 dark:text-[#f1ede6] hover:border-rose-500 brutalist-button transition-all w-full sm:w-auto"
            suppressHydrationWarning
          >
            <ArrowLeft className="h-4 w-4 shrink-0" suppressHydrationWarning /> RE-CALIBRATE VECTOR MATRIX
          </Link>

          <div className="flex items-center justify-center gap-2 text-[10px] sm:text-xs text-[#f43f5e] font-black uppercase tracking-widest bg-[#1f0d14] dark:bg-[#1f0d14] light:bg-rose-50 px-3 py-1.5 border border-[#63182b] theme-border w-full sm:w-auto" suppressHydrationWarning>
            <Activity className="h-4 w-4 animate-pulse shrink-0" suppressHydrationWarning /> LIVE HARDWARE TRANSMISSION
          </div>
        </div>

        {currentSong ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Left Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Main Player Card */}
              <div className="border-2 border-[#232736] theme-border bg-[#12141c] theme-bg-card p-4 sm:p-6 shadow-[4px_4px_0px_#040507] sm:shadow-[6px_6px_0px_#040507] space-y-6">
                {/* Background YouTube Audio Engine */}
                <div className="w-0 h-0 opacity-0 pointer-events-none absolute overflow-hidden">
                  <div id="dedicated-yt-player" />
                </div>

                {/* Premium Hardware Turntable Deck Stage */}
                <div className="relative py-8 sm:py-12 flex flex-col items-center justify-center bg-linear-to-b from-[#0b0d13] to-[#050608] dark:from-[#0b0d13] dark:to-[#050608] light:from-slate-100 light:to-slate-200 border-2 border-[#232736] theme-border overflow-hidden group shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]">
                  {/* Turntable Metallic Accents & Platter */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-6 flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#f43f5e] animate-ping" />
                    <span className="text-[9px] sm:text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-widest">STEREO HI-FI</span>
                  </div>

                  {/* Tonearm Hardware Visual */}
                  <div className="absolute top-20 right-20 z-20 pointer-events-none transition-transform duration-700 ease-in-out origin-top-right hidden sm:flex flex-col items-center" style={{ transform: isPlaying ? 'rotate(40deg)' : 'rotate(0deg)' }}>
                    <div className="w-6 h-6 rounded-full bg-[#232736] border-2 border-slate-300 shadow-md flex items-center justify-center -mb-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-200 border border-slate-700" />
                    </div>
                    <div className="w-1.5 h-36 bg-linear-to-r from-slate-300 via-white to-slate-400 rounded-full shadow-md" />
                    <div className="w-4 h-7 bg-[#f43f5e] rounded-sm border border-white shadow-lg flex items-end justify-center pb-0.5 -mt-0.5">
                      <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full" />
                    </div>
                  </div>

                  {/* Spinning Vinyl Hardware Deck */}
                  <div className="relative h-56 w-56 xs:h-64 xs:w-64 sm:h-80 sm:w-80 rounded-full border-4 sm:border-8 border-[#1a1d2b] bg-black shadow-[0_0_50px_rgba(0,0,0,0.95)] flex items-center justify-center overflow-hidden my-4">
                    <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-10 rounded-full" />
                    <div className="absolute inset-2 rounded-full border border-slate-800/90 pointer-events-none" />
                    <div className="absolute inset-5 rounded-full border border-slate-800/70 pointer-events-none" />
                    <div className="absolute inset-8 rounded-full border border-slate-800/50 pointer-events-none" />
                    <div className="absolute inset-12 rounded-full border border-slate-800/40 pointer-events-none" />
                    <div className="absolute inset-16 rounded-full border border-slate-800/30 pointer-events-none" />

                    <div className={`relative h-28 w-28 xs:h-36 xs:w-36 sm:h-44 sm:w-44 rounded-full border-4 border-[#f43f5e] overflow-hidden shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-transform ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }}>
                      <img
                        src={
                          currentSong.thumbnail_url && currentSong.thumbnail_url.trim() !== '' && currentSong.thumbnail_url !== 'undefined'
                            ? currentSong.thumbnail_url
                            : 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&auto=format&fit=crop&q=80'
                        }
                        alt={currentSong.title}
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.onerror = null;
                          target.src = 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&auto=format&fit=crop&q=80';
                        }}
                        className="h-full w-full object-cover scale-105"
                      />
                      <div className="absolute inset-0 m-auto h-7 w-7 rounded-full bg-[#12141c] border-2 border-white shadow-[inset_0_0_6px_rgba(0,0,0,0.8)] z-20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-slate-400 border border-black" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Track Metadata Info */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 dark:text-[#f1ede6] uppercase tracking-tight">
                      {currentSong.title}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase font-bold">
                      ARTIST: <span className="text-slate-900 dark:text-white">{currentSong.artist}</span> | GENRE: <span className="text-[#f43f5e]">{currentSong.genre || 'Soundtrack'}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    aria-label={isLiked ? "Remove song from liked tracks" : "Like this song"}
                    className={`p-3 border-2 transition-all ${
                      isLiked
                        ? 'border-[#f43f5e] bg-[#f43f5e] text-white shadow-[2px_2px_0px_#000000]'
                        : 'border-[#232736] theme-border bg-[#0b0c10] theme-bg-surface text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-white' : ''}`} />
                  </button>
                </div>

                {/* Scrubber */}
                <div className="space-y-2 font-mono">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    value={progress}
                    onChange={handleSeek}
                    aria-label="Track playback timeline position"
                    className="w-full cursor-pointer"
                  />
                  <div className="flex justify-between text-xs font-black text-slate-500 dark:text-slate-400">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Hardware Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    onClick={() => setRepeatMode(repeatMode === 'off' ? 'all' : repeatMode === 'all' ? 'one' : 'off')}
                    aria-label={`Repeat mode: currently ${repeatMode}`}
                    className={`min-h-11 min-w-11 p-3 border-2 transition-all ${
                      repeatMode !== 'off'
                        ? 'border-[#f43f5e] bg-[#f43f5e] text-white shadow-[2px_2px_0px_#000000]'
                        : 'border-[#232736] theme-border bg-[#0b0c10] theme-bg-surface text-slate-600 dark:text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    <Repeat className="h-5 w-5" />
                  </button>

                  <div className="flex items-center gap-3 sm:gap-4">
                    <button
                      onClick={previousSong}
                      aria-label="Play previous track in queue"
                      className="min-h-11 min-w-11 p-3 border-2 border-[#232736] theme-border bg-[#0b0c10] theme-bg-surface text-slate-800 dark:text-slate-200 hover:border-slate-900 dark:hover:border-white transition-all"
                    >
                      <SkipBack className="h-6 w-6" />
                    </button>

                    <button
                      onClick={togglePlay}
                      aria-label={isPlaying ? "Pause track" : "Play track"}
                      className="flex h-14 w-14 min-h-11 min-w-11 items-center justify-center border-2 border-slate-900 dark:border-white bg-[#f43f5e] text-white brutalist-button hover:bg-rose-600 transition-all"
                    >
                      {isPlaying ? (
                        <Pause className="h-7 w-7 fill-white" />
                      ) : (
                        <Play className="h-7 w-7 fill-white ml-0.5" />
                      )}
                    </button>

                    <button
                      onClick={nextSong}
                      aria-label="Skip to next track in queue"
                      className="min-h-11 min-w-11 p-3 border-2 border-[#232736] theme-border bg-[#0b0c10] theme-bg-surface text-slate-800 dark:text-slate-200 hover:border-slate-900 dark:hover:border-white transition-all"
                    >
                      <SkipForward className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Volume Slider */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMute}
                      aria-label={isMuted || volume === 0 ? "Unmute audio" : "Mute audio"}
                      className="min-h-11 min-w-11 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="h-5 w-5 text-[#f43f5e]" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => setVolume(parseInt(e.target.value))}
                      aria-label="Audio volume level"
                      className="w-16 sm:w-20 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* 5D Feature Telemetry */}
              <div className="border-2 border-[#232736] theme-border bg-[#12141c] theme-bg-card p-6 space-y-4 font-mono">
                <div className="flex items-center justify-between border-b border-[#232736] theme-border pb-3">
                  <span className="text-xs font-black uppercase text-[#f43f5e] flex items-center gap-2">
                    <Cpu className="h-4 w-4" /> 5D VECTOR SPECTRUM TELEMETRY
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-[#0f241a] dark:bg-[#0f241a] light:bg-emerald-50 px-2 py-0.5 border border-emerald-800 theme-border">
                    COSINE METRIC MATCH
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="border border-[#232736] theme-border bg-[#0b0c10] theme-bg-surface p-3">
                    <span className="text-[9px] text-slate-500 dark:text-slate-400 block font-bold">VALENCE</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white">
                      {((currentSong.features?.valence ?? currentSong.valence ?? currentSong.danceability ?? 0.74) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="border border-[#232736] theme-border bg-[#0b0c10] theme-bg-surface p-3">
                    <span className="text-[9px] text-slate-500 dark:text-slate-400 block font-bold">ENERGY</span>
                    <span className="text-sm font-black text-[#f43f5e]">
                      {((currentSong.features?.energy ?? currentSong.energy ?? 0.88) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="border border-[#232736] theme-border bg-[#0b0c10] theme-bg-surface p-3">
                    <span className="text-[9px] text-slate-500 dark:text-slate-400 block font-bold">ACOUSTIC</span>
                    <span className="text-sm font-black text-cyan-600 dark:text-cyan-400">
                      {((currentSong.features?.acousticness ?? currentSong.acousticness ?? 0.15) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="border border-[#232736] theme-border bg-[#0b0c10] theme-bg-surface p-3">
                    <span className="text-[9px] text-slate-500 dark:text-slate-400 block font-bold">TEMPO</span>
                    <span className="text-sm font-black text-amber-600 dark:text-amber-400">
                      {Math.round(currentSong.features?.tempo ?? currentSong.tempo ?? 124)} BPM
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Playlist Vector Queue (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="border-2 border-[#232736] theme-border bg-[#12141c] theme-bg-card p-6 shadow-[6px_6px_0px_#040507] space-y-4">
                <div className="flex items-center justify-between border-b-2 border-[#232736] theme-border pb-4">
                  <div className="flex items-center gap-2">
                    <ListMusic className="h-5 w-5 text-[#f43f5e]" />
                    <h3 className="font-heading text-lg font-black text-slate-900 dark:text-[#f1ede6] uppercase">UP NEXT VECTOR QUEUE</h3>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-600 dark:text-slate-400 bg-[#0b0c10] theme-bg-surface px-2.5 py-1 border border-[#232736] theme-border">
                    {playlist.length} TRACKS
                  </span>
                </div>

                {/* Queue List */}
                <div className="space-y-3 max-h-150 overflow-y-auto pr-1">
                  {playlist.map((song, idx) => (
                    <SongCard key={song.id || idx} song={song} index={idx} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-[#232736] theme-border bg-[#12141c] theme-bg-card space-y-4 max-w-xl mx-auto p-8">
            <Disc3 className="h-16 w-16 text-[#f43f5e] animate-pulse mx-auto" suppressHydrationWarning />
            <h3 className="font-heading text-2xl font-black uppercase text-slate-900 dark:text-[#f1ede6]">NO VECTOR PLAYLIST ACTIVE</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Please generate a vector playlist from the baseline deck first.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#f43f5e] text-white border-2 border-slate-900 dark:border-white text-xs font-black uppercase brutalist-button hover:bg-rose-600 transition-colors"
              suppressHydrationWarning
            >
              <Sliders className="h-4 w-4" suppressHydrationWarning /> CALIBRATE VECTOR MATRIX
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
