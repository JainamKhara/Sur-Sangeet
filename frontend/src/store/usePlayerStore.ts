import { create } from 'zustand';
import { Song } from '../types';

interface PlayerState {
  playlist: Song[];
  currentIndex: number;
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  repeatMode: 'off' | 'one' | 'all';
  
  // Actions
  setPlaylist: (songs: Song[], startIndex?: number) => void;
  playSong: (index: number) => void;
  togglePlay: () => void;
  setIsPlaying: (playing: boolean) => void;
  nextSong: () => void;
  previousSong: () => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  setRepeatMode: (mode: 'off' | 'one' | 'all') => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  playlist: [],
  currentIndex: -1,
  currentSong: null,
  isPlaying: false,
  volume: 80,
  isMuted: false,
  repeatMode: 'off',

  setPlaylist: (songs, startIndex = 0) => {
    if (!songs || songs.length === 0) return;
    const index = Math.min(Math.max(0, startIndex), songs.length - 1);
    set({
      playlist: songs,
      currentIndex: index,
      currentSong: songs[index],
      isPlaying: true,
    });
  },

  playSong: (index) => {
    const { playlist, currentIndex, isPlaying } = get();
    if (index >= 0 && index < playlist.length) {
      if (index === currentIndex) {
        set({ isPlaying: !isPlaying });
      } else {
        set({
          currentIndex: index,
          currentSong: playlist[index],
          isPlaying: true,
        });
      }
    }
  },

  togglePlay: () => {
    const { isPlaying, currentSong } = get();
    if (currentSong) {
      set({ isPlaying: !isPlaying });
    }
  },

  setIsPlaying: (playing) => set({ isPlaying: playing }),

  nextSong: () => {
    const { playlist, currentIndex, repeatMode } = get();
    if (playlist.length === 0) return;

    if (repeatMode === 'one') {
      set({ isPlaying: true });
      return;
    }

    let nextIdx = currentIndex + 1;
    if (nextIdx >= playlist.length) {
      if (repeatMode === 'all') {
        nextIdx = 0;
      } else {
        set({ isPlaying: false });
        return;
      }
    }

    set({
      currentIndex: nextIdx,
      currentSong: playlist[nextIdx],
      isPlaying: true,
    });
  },

  previousSong: () => {
    const { playlist, currentIndex } = get();
    if (playlist.length === 0) return;

    let prevIdx = currentIndex - 1;
    if (prevIdx < 0) {
      prevIdx = playlist.length - 1;
    }

    set({
      currentIndex: prevIdx,
      currentSong: playlist[prevIdx],
      isPlaying: true,
    });
  },

  setVolume: (vol) => set({ volume: vol, isMuted: vol === 0 }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setRepeatMode: (mode) => set({ repeatMode: mode }),
}));
