'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Repeat, ArrowUpRight, Disc3 } from 'lucide-react';
import { usePlayerStore } from '../store/usePlayerStore';

export default function Player() {
  const pathname = usePathname();
  const { 
    currentSong, isPlaying, volume, isMuted, repeatMode,
    togglePlay, nextSong, previousSong, setVolume, toggleMute, setRepeatMode
  } = usePlayerStore();

  if (!currentSong) return null;

  // On dedicated player page (/player), hide bottom bar so controls aren't duplicated
  if (pathname === '/player') return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-[#232736] bg-[#0b0c10] p-3 sm:p-4 shadow-[0px_-4px_10px_rgba(0,0,0,0.5)] font-mono">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        
        {/* Track Info */}
        <div className="flex items-center gap-3 min-w-0 w-1/3">
          <div className="relative h-11 w-11 border-2 border-black bg-black shrink-0 overflow-hidden">
            <img
              src={currentSong.thumbnail_url}
              alt={currentSong.title}
              className="h-full w-full object-cover"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Disc3 className="h-5 w-5 text-[#f43f5e] animate-spin" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="truncate text-xs font-black text-white uppercase font-heading">{currentSong.title}</h4>
            <p className="truncate text-[10px] text-slate-400 font-bold uppercase">{currentSong.artist}</p>
          </div>

          <Link
            href="/player"
            aria-label="Open Studio Player Deck page"
            className="hidden sm:flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-black bg-[#f1ede6] hover:bg-[#f43f5e] hover:text-white px-2.5 py-1 border-2 border-black brutalist-button transition-all shrink-0"
          >
            <span>STUDIO PLAYER</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Transport Controls */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 w-1/3">
          <button
            onClick={() => setRepeatMode(repeatMode === 'off' ? 'all' : repeatMode === 'all' ? 'one' : 'off')}
            aria-label={`Repeat mode: currently ${repeatMode}`}
            className={`min-h-11 min-w-11 text-xs p-1.5 border-2 transition-all flex items-center justify-center ${
              repeatMode !== 'off' ? 'border-white bg-[#f43f5e] text-white shadow-[2px_2px_0px_#000000]' : 'border-[#232736] bg-[#12141c] text-slate-400 hover:border-slate-400'
            }`}
          >
            <Repeat className="h-4 w-4" />
          </button>

          <button
            onClick={previousSong}
            aria-label="Play previous song"
            className="min-h-11 min-w-11 p-1.5 border-2 border-[#232736] bg-[#12141c] text-slate-300 hover:border-white transition-colors flex items-center justify-center"
          >
            <SkipBack className="h-5 w-5" />
          </button>

          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause track" : "Play track"}
            className="flex h-11 w-11 min-h-11 min-w-11 items-center justify-center border-2 border-black bg-[#f43f5e] text-white brutalist-button hover:bg-rose-600 transition-all"
          >
            {isPlaying ? <Pause className="h-5 w-5 fill-white" /> : <Play className="h-5 w-5 fill-white ml-0.5" />}
          </button>

          <button
            onClick={nextSong}
            aria-label="Skip to next song"
            className="min-h-11 min-w-11 p-1.5 border-2 border-[#232736] bg-[#12141c] text-slate-300 hover:border-white transition-colors flex items-center justify-center"
          >
            <SkipForward className="h-5 w-5" />
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center justify-end gap-3 w-1/3">
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleMute}
              aria-label={isMuted || volume === 0 ? "Unmute sound" : "Mute sound"}
              className="text-slate-400 hover:text-white"
            >
              {isMuted || volume === 0 ? <VolumeX className="h-4 w-4 text-[#f43f5e]" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              aria-label="Bottom player volume level"
              className="w-20 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
