'use client';

import React from 'react';
import Link from 'next/link';
import { Disc3, Sliders, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-[#232736] bg-[#0b0c10] px-3 sm:px-8 py-3" suppressHydrationWarning>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2" suppressHydrationWarning>
        
        {/* Brand Stamp */}
        <Link href="/" aria-label="SurSangeet Home Deck" className="flex items-center gap-2 sm:gap-3 group shrink-0" suppressHydrationWarning>
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-none bg-[#f43f5e] text-black border-2 border-white font-mono font-black shadow-[2px_2px_0px_#ffffff] sm:shadow-[3px_3px_0px_#ffffff] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" suppressHydrationWarning>
            <Disc3 className="h-5 w-5 sm:h-6 sm:w-6 animate-[spin_6s_linear_infinite]" suppressHydrationWarning />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <h1 className="font-heading text-lg sm:text-xl font-black tracking-tighter text-[#f1ede6] uppercase truncate">
                SUR<span className="text-[#f43f5e]">SANGEET</span>
              </h1>
            </div>
            <p className="hidden sm:block text-[10px] font-mono text-slate-400 tracking-wider truncate">
              KNN AUDIO VECTOR SOUND DECK
            </p>
          </div>
        </Link>

        {/* Navigation Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="hidden lg:flex items-center gap-2 font-mono text-xs font-bold text-slate-300 bg-[#12141c] border-2 border-[#232736] px-3 py-1.5 shadow-[2px_2px_0px_#000000]">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>18,154 TRACK MATRIX OK</span>
          </div>

          <Link
            href="/calibrate"
            aria-label="Open Vector Calibration Wizard"
            className="font-mono text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#f43f5e] text-white border-2 border-white hover:bg-rose-600 brutalist-button transition-colors min-h-11 flex-row justify-center"
            suppressHydrationWarning
          >
            <Sliders className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" suppressHydrationWarning />
            <span>CALIBRATE</span>
          </Link>

          <Link
            href="/player"
            aria-label="Open Studio Player Deck"
            className="font-mono text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#f1ede6] text-black border-2 border-black hover:bg-[#f43f5e] hover:text-white brutalist-button transition-colors min-h-11 flex-row justify-center"
            suppressHydrationWarning
          >
            <span className="hidden xs:inline">STUDIO </span><span>PLAYER</span>
            <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" suppressHydrationWarning />
          </Link>
        </div>
      </div>
    </header>
  );
}
