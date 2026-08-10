'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { 
  Sliders, Play, Disc3, ArrowRight, Activity
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b0c10] theme-bg-main text-[#f1ede6] theme-text-main font-sans antialiased pb-28 bg-grain transition-colors" suppressHydrationWarning>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-8 pt-12 space-y-24 relative z-10" suppressHydrationWarning>
        
        {/* HERO SECTION */}
        <section className="text-center space-y-8 max-w-4xl mx-auto font-mono pt-8" suppressHydrationWarning>
          <div className="inline-flex items-center gap-2 border-2 border-[#232736] theme-border bg-[#12141c] theme-bg-card px-4 py-2 text-xs font-black text-[#f43f5e] uppercase shadow-[3px_3px_0px_#000000]" suppressHydrationWarning>
            <Disc3 className="h-4 w-4 text-[#f43f5e] animate-spin" suppressHydrationWarning />
            <span suppressHydrationWarning>SURSANGEET AI VECTOR AUDIO DECK</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-7xl font-black tracking-tighter text-[#f1ede6] theme-text-main uppercase leading-tight" suppressHydrationWarning>
            INTELLIGENT <span className="text-[#f43f5e]" suppressHydrationWarning>MUSIC</span> DISCOVERY <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#f43f5e] via-amber-500 to-emerald-500" suppressHydrationWarning>
              POWERED BY 5D VECTOR KNN
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 theme-text-muted max-w-2xl mx-auto leading-relaxed border-l-4 border-[#f43f5e] pl-4 text-left font-sans" suppressHydrationWarning>
            SurSangeet maps 18,154 real Spotify & YouTube tracks across a 5-dimensional audio vector space (valence, energy, danceability, acousticness, tempo) using mathematical K-Nearest Neighbors cosine similarity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4" suppressHydrationWarning>
            <Link
              href="/calibrate"
              aria-label="Start Vector Calibration"
              className="w-full sm:w-auto font-mono text-sm font-black uppercase tracking-wider flex items-center justify-center gap-3 px-8 py-4 bg-[#f43f5e] text-white border-2 border-slate-900 dark:border-white brutalist-button hover:bg-rose-600 transition-colors shadow-[4px_4px_0px_#000000]"
              suppressHydrationWarning
            >
              <Sliders className="h-5 w-5" suppressHydrationWarning />
              <span suppressHydrationWarning>START CALIBRATION</span>
              <ArrowRight className="h-5 w-5" suppressHydrationWarning />
            </Link>

            <Link
              href="/player"
              aria-label="Launch Studio Deck"
              className="w-full sm:w-auto font-mono text-sm font-black uppercase tracking-wider flex items-center justify-center gap-3 px-8 py-4 bg-[#12141c] theme-bg-card text-slate-200 theme-text-main border-2 border-[#232736] theme-border brutalist-button hover:border-slate-900 transition-colors"
              suppressHydrationWarning
            >
              <Play className="h-5 w-5 text-[#f43f5e]" suppressHydrationWarning />
              <span suppressHydrationWarning>STUDIO DECK</span>
            </Link>
          </div>
        </section>

        {/* DYNAMIC STUDIO EXPERIENCE SHOWCASE */}
        <section className="space-y-12 font-mono" suppressHydrationWarning>
          <div className="border-2 border-[#232736] theme-border bg-[#12141c] theme-bg-card p-6 sm:p-12 shadow-[8px_8px_0px_#040507] relative overflow-hidden" suppressHydrationWarning>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center" suppressHydrationWarning>
              
              {/* Left Column: Authentic Product Explanation */}
              <div className="space-y-6" suppressHydrationWarning>
                <div className="inline-flex items-center gap-2 border border-[#f43f5e] bg-[#f43f5e]/10 px-3 py-1 text-xs font-bold text-[#f43f5e] uppercase" suppressHydrationWarning>
                  <Activity className="h-4 w-4 animate-pulse" suppressHydrationWarning />
                  <span suppressHydrationWarning>COSINE SIMILARITY ENGINE</span>
                </div>

                <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase text-[#f1ede6] theme-text-main leading-tight" suppressHydrationWarning>
                  REAL-TIME <br />
                  <span className="text-[#f43f5e]" suppressHydrationWarning>VECTOR MATCHING</span>
                </h2>

                <p className="text-sm text-slate-300 theme-text-muted font-sans leading-relaxed" suppressHydrationWarning>
                  Unlike traditional metadata filters, SurSangeet measures the exact Euclidean and Cosine distances across 5 audio dimensions directly from 18,154 tracks in Neon PostgreSQL.
                </p>

                <div className="grid grid-cols-2 gap-4 text-xs font-bold pt-2" suppressHydrationWarning>
                  <div className="border border-[#232736] theme-border bg-[#0b0c10] theme-bg-surface p-3" suppressHydrationWarning>
                    <span className="text-slate-400 theme-text-muted block text-[10px]" suppressHydrationWarning>VALENCE & ENERGY</span>
                    <span className="text-white theme-text-main text-sm" suppressHydrationWarning>EMOTIONAL MOOD</span>
                  </div>
                  <div className="border border-[#232736] theme-border bg-[#0b0c10] theme-bg-surface p-3" suppressHydrationWarning>
                    <span className="text-slate-400 theme-text-muted block text-[10px]" suppressHydrationWarning>TEMPO & ACOUSTICS</span>
                    <span className="text-white theme-text-main text-sm" suppressHydrationWarning>TIMBRE & SPEED</span>
                  </div>
                </div>

                <div className="pt-4" suppressHydrationWarning>
                  <Link
                    href="/calibrate"
                    aria-label="Calibrate Audio Vector Deck"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-[#f43f5e] text-white border-2 border-slate-900 dark:border-white text-sm font-black uppercase brutalist-button hover:bg-rose-600 transition-colors shadow-[4px_4px_0px_#000000]"
                    suppressHydrationWarning
                  >
                    <Sliders className="h-5 w-5" suppressHydrationWarning />
                    <span suppressHydrationWarning>LAUNCH VECTOR CALIBRATION</span>
                    <ArrowRight className="h-5 w-5" suppressHydrationWarning />
                  </Link>
                </div>
              </div>

              {/* Right Column: Visual Hi-Fi Hardware Teaser */}
              <div className="border-2 border-[#232736] theme-border bg-[#0b0c10] theme-bg-surface p-6 space-y-6 brutalist-card" suppressHydrationWarning>
                <div className="flex items-center justify-between border-b border-[#232736] theme-border pb-4" suppressHydrationWarning>
                  <div className="flex items-center gap-2" suppressHydrationWarning>
                    <Disc3 className="h-5 w-5 text-[#f43f5e] animate-spin" suppressHydrationWarning />
                    <span className="text-xs font-black text-slate-900 dark:text-white uppercase" suppressHydrationWarning>ANALOG VINYL TURNTABLE</span>
                  </div>
                </div>

                <div className="relative aspect-square max-w-[280px] mx-auto rounded-full bg-slate-900 dark:bg-slate-950 border-4 border-[#1e2230] p-4 flex items-center justify-center shadow-2xl" suppressHydrationWarning>
                  <div className="w-full h-full rounded-full border-2 border-dashed border-slate-500/50 flex items-center justify-center animate-[spin_12s_linear_infinite]" suppressHydrationWarning>
                    <div className="w-20 h-20 rounded-full border-2 border-[#f43f5e] bg-[#f43f5e]/20 flex items-center justify-center" suppressHydrationWarning>
                      <div className="w-4 h-4 rounded-full bg-[#f43f5e]" suppressHydrationWarning />
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-1" suppressHydrationWarning>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase" suppressHydrationWarning>18,154 KAGGLE SPOTIFY & YOUTUBE DATASET</span>
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-200" suppressHydrationWarning>INTERACTIVE STUDIO SOUND DECK</p>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
