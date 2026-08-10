'use client';

import React from 'react';
import Link from 'next/link';
import { Disc3, Radio, Sliders, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-[#232736] bg-[#0b0c10] px-4 sm:px-8 py-3.5" suppressHydrationWarning>
      <div className="mx-auto flex max-w-7xl items-center justify-between" suppressHydrationWarning>
        
        {/* Brand Stamp */}
        <Link href="/" aria-label="SurSangeet Home Deck" className="flex items-center gap-3 group" suppressHydrationWarning>
          <div className="flex h-10 w-10 items-center justify-center rounded-none bg-[#f43f5e] text-black border-2 border-white font-mono font-black shadow-[3px_3px_0px_#ffffff] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" suppressHydrationWarning>
            <Disc3 className="h-6 w-6 animate-[spin_6s_linear_infinite]" suppressHydrationWarning />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-xl font-black tracking-tighter text-[#f1ede6] uppercase">
                SUR<span className="text-[#f43f5e]">SANGEET</span>
              </h1>
            </div>
            <p className="text-[10px] font-mono text-slate-400 tracking-wider">
              KNN AUDIO VECTOR SOUND DECK
            </p>
          </div>
        </Link>

        {/* Tactile Controls Indicator */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 font-mono text-xs font-bold text-slate-300 bg-[#12141c] border-2 border-[#232736] px-3 py-1.5 shadow-[2px_2px_0px_#000000]">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>18,154 TRACK MATRIX OK</span>
          </div>

          <Link
            href="/calibrate"
            aria-label="Open Vector Calibration Wizard"
            className="font-mono text-xs font-black uppercase tracking-wider flex items-center gap-1.5 px-4 py-2 bg-[#f43f5e] text-white border-2 border-white hover:bg-rose-600 brutalist-button transition-colors"
            suppressHydrationWarning
          >
            <Sliders className="h-4 w-4" suppressHydrationWarning />
            <span>CALIBRATE</span>
          </Link>

          <Link
            href="/player"
            aria-label="Open Studio Player Deck"
            className="font-mono text-xs font-black uppercase tracking-wider flex items-center gap-1.5 px-4 py-2 bg-[#f1ede6] text-black border-2 border-black hover:bg-[#f43f5e] hover:text-white brutalist-button transition-colors"
            suppressHydrationWarning
          >
            <span>STUDIO PLAYER</span>
            <ArrowUpRight className="h-4 w-4" suppressHydrationWarning />
          </Link>
        </div>
      </div>
    </header>
  );
}
