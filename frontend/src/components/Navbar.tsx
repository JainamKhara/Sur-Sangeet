'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Disc3, Sliders, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-slate-900 dark:border-[#232736] bg-white dark:bg-[#0b0c10] px-3 sm:px-8 py-3 transition-colors" suppressHydrationWarning>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2" suppressHydrationWarning>
        
        {/* Brand Stamp */}
        <Link href="/" aria-label="SurSangeet Home Deck" className="flex items-center gap-2 sm:gap-3 group shrink" suppressHydrationWarning>
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-none bg-[#f43f5e] text-white dark:text-black border-2 border-slate-900 dark:border-white font-mono font-black group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform shrink-0" suppressHydrationWarning>
            <Disc3 className="h-5 w-5 sm:h-6 sm:w-6 animate-[spin_6s_linear_infinite]" suppressHydrationWarning />
          </div>

          <div className="min-w-0" suppressHydrationWarning>
            <h1 className="font-heading text-lg sm:text-xl font-black tracking-tighter uppercase truncate" suppressHydrationWarning>
              <span className="text-black dark:text-white" suppressHydrationWarning>SUR</span>
              <span className="text-[#f43f5e]" suppressHydrationWarning>SANGEET</span>
            </h1>
            <p className="hidden md:block text-[10px] font-mono text-slate-600 dark:text-slate-400 tracking-wider truncate" suppressHydrationWarning>
              KNN AUDIO VECTOR SOUND DECK
            </p>
          </div>
        </Link>

        {/* Navigation Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0" suppressHydrationWarning>
          <div className="hidden lg:flex items-center gap-2 font-mono text-xs font-bold text-slate-900 dark:text-slate-300 bg-slate-100 dark:bg-[#12141c] border-2 border-slate-900 dark:border-[#232736] px-3 py-1.5 shadow-[2px_2px_0px_#000000]" suppressHydrationWarning>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" suppressHydrationWarning />
            <span className="text-slate-900 dark:text-slate-300 font-extrabold" suppressHydrationWarning>18,154 TRACK MATRIX OK</span>
          </div>

          <Link
            href="/calibrate"
            aria-label="Open Vector Calibration Wizard"
            className="font-mono text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1 sm:gap-1.5 px-2 sm:px-4 py-1.5 sm:py-2 bg-[#f43f5e] text-white border-2 border-slate-900 dark:border-white hover:bg-rose-600 brutalist-button transition-colors min-h-11 justify-center"
            suppressHydrationWarning
          >
            <Sliders className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" suppressHydrationWarning />
            <span className="hidden xs:inline" suppressHydrationWarning>CALIBRATE</span>
          </Link>

          <Link
            href="/player"
            aria-label="Open Studio Player Deck"
            className="font-mono text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1 sm:gap-1.5 px-2 sm:px-4 py-1.5 sm:py-2 bg-slate-900 dark:bg-[#f1ede6] text-white dark:text-black border-2 border-slate-900 dark:border-black hover:bg-[#f43f5e] hover:text-white brutalist-button transition-colors min-h-11 justify-center"
            suppressHydrationWarning
          >
            <span suppressHydrationWarning>PLAYER</span>
            <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" suppressHydrationWarning />
          </Link>

          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${mounted && theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            className="font-mono text-xs font-black p-2 sm:px-3 sm:py-2 bg-slate-100 dark:bg-[#12141c] text-slate-900 dark:text-white border-2 border-slate-900 dark:border-[#232736] hover:border-[#f43f5e] brutalist-button transition-colors flex items-center justify-center gap-1.5 min-h-11 shrink-0"
            suppressHydrationWarning
          >
            {mounted && theme === 'light' ? (
              <>
                <Moon className="h-4 w-4 text-indigo-600" suppressHydrationWarning />
                <span className="hidden sm:inline" suppressHydrationWarning>DARK</span>
              </>
            ) : (
              <>
                <Sun className="h-4 w-4 text-amber-400" suppressHydrationWarning />
                <span className="hidden sm:inline" suppressHydrationWarning>LIGHT</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
