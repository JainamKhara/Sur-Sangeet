'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Player from '../components/Player';
import { 
  Sliders, Play, Disc3, Sparkles, ArrowRight, Zap, Flame, 
  Compass, Activity, ShieldCheck, Database, Radio, BarChart3 
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#f1ede6] font-sans antialiased pb-28 bg-grain">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-8 pt-12 space-y-24 relative z-10">
        
        {/* HERO SECTION */}
        <section className="text-center space-y-8 max-w-4xl mx-auto font-mono pt-8">
          <div className="inline-flex items-center gap-2 border-2 border-[#232736] bg-[#12141c] px-4 py-2 text-xs font-black text-[#f43f5e] uppercase shadow-[3px_3px_0px_#000000]">
            <Disc3 className="h-4 w-4 text-[#f43f5e] animate-spin" />
            <span>SURSANGEET AI VECTOR AUDIO DECK</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-7xl font-black tracking-tighter text-[#f1ede6] uppercase leading-tight">
            INTELLIGENT <span className="text-[#f43f5e]">MUSIC</span> DISCOVERY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f43f5e] via-amber-300 to-emerald-400">
              POWERED BY 5D VECTOR KNN
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed border-l-4 border-[#f43f5e] pl-4 text-left font-sans">
            SurSangeet maps 18,154 real Spotify & YouTube tracks across a 5-dimensional audio vector space (valence, energy, danceability, acousticness, tempo) using mathematical K-Nearest Neighbors cosine similarity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/calibrate"
              aria-label="Start Vector Calibration"
              className="w-full sm:w-auto font-mono text-sm font-black uppercase tracking-wider flex items-center justify-center gap-3 px-8 py-4 bg-[#f43f5e] text-white border-2 border-white brutalist-button hover:bg-rose-600 transition-colors shadow-[4px_4px_0px_#000000]"
            >
              <Sliders className="h-5 w-5" />
              <span>START CALIBRATION</span>
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/player"
              aria-label="Launch Studio Deck"
              className="w-full sm:w-auto font-mono text-sm font-black uppercase tracking-wider flex items-center justify-center gap-3 px-8 py-4 bg-[#12141c] text-slate-200 border-2 border-[#232736] brutalist-button hover:border-white transition-colors"
            >
              <Play className="h-5 w-5 text-[#f43f5e]" />
              <span>STUDIO DECK</span>
            </Link>
          </div>
        </section>

        {/* DYNAMIC STUDIO EXPERIENCE SHOWCASE */}
        <section className="space-y-12 font-mono">
          <div className="border-2 border-[#232736] bg-[#12141c] p-8 sm:p-12 shadow-[8px_8px_0px_#040507] relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              
              {/* Left Column: Authentic Product Explanation */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 border border-[#f43f5e] bg-[#f43f5e]/10 px-3 py-1 text-xs font-bold text-[#f43f5e] uppercase">
                  <Activity className="h-4 w-4 animate-pulse" />
                  <span>COSINE SIMILARITY ENGINE</span>
                </div>

                <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase text-[#f1ede6] leading-tight">
                  REAL-TIME <br />
                  <span className="text-[#f43f5e]">VECTOR MATCHING</span>
                </h2>

                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  Unlike traditional metadata filters, SurSangeet measures the exact Euclidean and Cosine distances across 5 audio dimensions directly from 18,154 tracks in Neon PostgreSQL.
                </p>

                <div className="grid grid-cols-2 gap-4 text-xs font-bold pt-2">
                  <div className="border border-[#232736] bg-[#0b0c10] p-3">
                    <span className="text-slate-400 block text-[10px]">VALENCE & ENERGY</span>
                    <span className="text-white text-sm">EMOTIONAL MOOD</span>
                  </div>
                  <div className="border border-[#232736] bg-[#0b0c10] p-3">
                    <span className="text-slate-400 block text-[10px]">TEMPO & ACOUSTICS</span>
                    <span className="text-white text-sm">TIMBRE & SPEED</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/calibrate"
                    aria-label="Calibrate Audio Vector Deck"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-[#f43f5e] text-white border-2 border-white text-sm font-black uppercase brutalist-button hover:bg-rose-600 transition-colors shadow-[4px_4px_0px_#000000]"
                  >
                    <Sliders className="h-5 w-5" />
                    <span>LAUNCH VECTOR CALIBRATION</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Visual Hi-Fi Hardware Teaser */}
              <div className="border-2 border-[#232736] bg-[#0b0c10] p-6 space-y-6 brutalist-card">
                <div className="flex items-center justify-between border-b border-[#232736] pb-4">
                  <div className="flex items-center gap-2">
                    <Disc3 className="h-5 w-5 text-[#f43f5e] animate-spin" />
                    <span className="text-xs font-black text-white uppercase">ANALOG VINYL TURNTABLE</span>
                  </div>
                </div>

                <div className="relative aspect-square max-w-[280px] mx-auto rounded-full bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 border-4 border-[#1e2230] p-4 flex items-center justify-center shadow-2xl">
                  <div className="w-full h-full rounded-full border-2 border-dashed border-slate-700/50 flex items-center justify-center animate-[spin_12s_linear_infinite]">
                    <div className="w-20 h-20 rounded-full border-2 border-[#f43f5e] bg-[#f43f5e]/20 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-[#f43f5e]" />
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase">18,154 KAGGLE SPOTIFY & YOUTUBE DATASET</span>
                  <p className="text-xs font-bold text-slate-200">INTERACTIVE STUDIO SOUND DECK</p>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
