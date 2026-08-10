'use client';

import React from 'react';
import { Play, Volume2 } from 'lucide-react';
import { Song } from '../types';
import { usePlayerStore } from '../store/usePlayerStore';

interface SongCardProps {
  song: Song;
  index: number;
}

export default function SongCard({ song, index }: SongCardProps) {
  const { currentSong, isPlaying, playSong, playlist } = usePlayerStore();
  const isCurrent = currentSong?.id === song.id || currentSong?.youtube_id === song.youtube_id;

  const handlePlay = () => {
    const songIndex = playlist.findIndex((s) => s.id === song.id || s.youtube_id === song.youtube_id);
    if (songIndex !== -1) {
      playSong(songIndex);
    }
  };

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      onClick={handlePlay}
      className={`group flex items-center justify-between p-3 border-2 transition-all duration-150 cursor-pointer brutalist-card ${
        isCurrent
          ? 'border-[#f43f5e] bg-[#1f0d14] text-white shadow-[3px_3px_0px_#f43f5e]'
          : 'border-[#232736] bg-[#0b0c10] hover:border-slate-400'
      }`}
    >
      {/* Left Details */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center border-2 border-[#232736] bg-black overflow-hidden">
          <img
            src={song.thumbnail_url}
            alt={song.title}
            onError={(e) => {
              // Fallback to high quality music artwork if YouTube thumbnail is broken/blocked
              (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&auto=format&fit=crop&q=80`;
            }}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform"
          />
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/60 transition-opacity ${
              isCurrent ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
          >
            {isCurrent && isPlaying ? (
              <Volume2 className="h-5 w-5 text-[#f43f5e] animate-pulse" />
            ) : (
              <Play className="h-5 w-5 fill-white text-white ml-0.5" />
            )}
          </div>
        </div>

        <div className="min-w-0">
          <h4 className={`truncate text-xs font-black uppercase font-heading ${isCurrent ? 'text-[#f43f5e]' : 'text-[#f1ede6]'}`}>
            {song.title}
          </h4>
          <p className="truncate text-[10px] font-mono text-slate-400 mt-0.5">
            {song.artist} <span className="text-slate-500">•</span> <span className="text-slate-300 font-bold">{song.genre || 'Soundtrack'}</span>
          </p>
        </div>
      </div>

      {/* Right Section: Clean Index Number & Duration */}
      <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
        <span className={`text-xs font-black transition-colors ${isCurrent ? 'text-[#f43f5e]' : 'text-slate-500 group-hover:text-slate-300'}`}>
          {index < 9 ? `0${index + 1}` : index + 1}
        </span>
        <span className="text-slate-400 font-bold text-[11px] w-10 text-right">
          {formatDuration(song.duration)}
        </span>
      </div>
    </div>
  );
}
