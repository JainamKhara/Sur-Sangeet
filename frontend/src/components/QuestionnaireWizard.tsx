'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Zap, Compass, CloudRain, Heart, Sparkles,
  Dumbbell, Disc, BookOpen, Coffee, Navigation, Terminal,
  Sliders, ArrowRight, ArrowLeft, Activity, Radio, Gauge, Check
} from 'lucide-react';
import { RecommendationRequest } from '../types';

interface QuestionnaireProps {
  onSubmit: (params: RecommendationRequest) => void;
  isLoading: boolean;
}

const MOODS = [
  { id: 'happy', label: 'Euphoric & Upbeat', icon: Flame, badge: 'VALENCE: HIGH' },
  { id: 'energetic', label: 'Kinetic Drive', icon: Zap, badge: 'ENERGY: MAXIMUM' },
  { id: 'calm', label: 'Ambient Serenity', icon: Compass, badge: 'ACOUSTIC: SOFT' },
  { id: 'sad', label: 'Melancholic Tone', icon: CloudRain, badge: 'VALENCE: LOW' },
  { id: 'romantic', label: 'Warm Passion', icon: Heart, badge: 'VALENCE: MID-HIGH' },
  { id: 'focused', label: 'Cerebral Focus', icon: Sparkles, badge: 'TEMPO: STABLE' },
];

const ACTIVITIES = [
  { id: 'workout', label: 'Heavy Athletic Workout', icon: Dumbbell, code: 'ACT_01' },
  { id: 'party', label: 'Club Dance Floor', icon: Disc, code: 'ACT_02' },
  { id: 'studying', label: 'Deep Academic Study', icon: BookOpen, code: 'ACT_03' },
  { id: 'relaxing', label: 'Lounge & Unwind', icon: Coffee, code: 'ACT_04' },
  { id: 'driving', label: 'Night Highway Cruise', icon: Navigation, code: 'ACT_05' },
  { id: 'coding', label: 'Engineering Flow State', icon: Terminal, code: 'ACT_06' },
];

export default function QuestionnaireWizard({ onSubmit, isLoading }: QuestionnaireProps) {
  const [step, setStep] = useState(1);
  const [selectedMood, setSelectedMood] = useState('happy');
  const [selectedActivity, setSelectedActivity] = useState('relaxing');
  const [danceability, setDanceability] = useState(0.7);
  const [acousticness, setAcousticness] = useState(0.3);
  const [tempo, setTempo] = useState(0.6);
  const [playlistSize, setPlaylistSize] = useState(15);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleGenerateClick = () => {
    if (isLoading) return;
    onSubmit({
      mood: selectedMood,
      activity: selectedActivity,
      danceability,
      acousticness,
      tempo,
      playlist_size: playlistSize
    });
  };

  return (
    <div className="mx-auto max-w-4xl border-2 border-[#232736] bg-[#12141c] p-6 sm:p-10 shadow-[8px_8px_0px_#040507] relative">
      {/* Editorial Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-[#232736] pb-6 gap-4 font-mono">
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#f1ede6] uppercase tracking-tight">
            {step === 1 && "1. Emotional Vector Baseline"}
            {step === 2 && "2. Environment Context Setup"}
            {step === 3 && "3. 5D Vector Fine-Tuning"}
          </h2>
        </div>

        {/* Step Counter */}
        <div className="flex items-center gap-2 bg-[#0b0c10] border-2 border-[#232736] px-4 py-2 text-xs font-bold text-slate-300">
          <span>PROGRESS: [{step}/3]</span>
        </div>
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="wait">
          {/* STEP 1: MOOD */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {MOODS.map((m) => {
                const Icon = m.icon;
                const isSelected = selectedMood === m.id;
                return (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setSelectedMood(m.id)}
                    className={`flex flex-col justify-between p-5 text-left border-2 transition-all brutalist-card ${
                      isSelected
                        ? 'border-[#f43f5e] bg-[#1c1f2e] text-white shadow-[4px_4px_0px_#f43f5e]'
                        : 'border-[#232736] bg-[#0b0c10] text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2.5 border-2 ${isSelected ? 'bg-[#f43f5e] border-white text-black' : 'bg-[#181a25] border-[#2d3246] text-slate-400'}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      {isSelected && <Check className="h-5 w-5 text-[#f43f5e]" />}
                    </div>

                    <div>
                      <span className="font-mono text-[9px] font-bold text-slate-400 block mb-1 uppercase">
                        {m.badge}
                      </span>
                      <h4 className="font-heading font-black text-base uppercase text-[#f1ede6]">{m.label}</h4>
                    </div>
                  </button>
                );
              })}
            </motion.div>
          )}

          {/* STEP 2: ACTIVITY */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {ACTIVITIES.map((act) => {
                const Icon = act.icon;
                const isSelected = selectedActivity === act.id;
                return (
                  <button
                    type="button"
                    key={act.id}
                    onClick={() => setSelectedActivity(act.id)}
                    className={`flex items-start gap-4 p-5 text-left border-2 transition-all brutalist-card ${
                      isSelected
                        ? 'border-[#f43f5e] bg-[#1c1f2e] text-white shadow-[4px_4px_0px_#f43f5e]'
                        : 'border-[#232736] bg-[#0b0c10] text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <div className={`p-3 border-2 shrink-0 ${isSelected ? 'bg-[#f43f5e] border-white text-black' : 'bg-[#181a25] border-[#2d3246] text-slate-400'}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] font-bold text-slate-400 block uppercase">{act.code}</span>
                      <h4 className="font-heading font-black text-sm uppercase text-[#f1ede6] mt-0.5">{act.label}</h4>
                    </div>
                  </button>
                );
              })}
            </motion.div>
          )}

          {/* STEP 3: TACTILE SLIDERS */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6 font-mono"
            >
              {/* Danceability */}
              <div className="border-2 border-[#232736] bg-[#0b0c10] p-5 space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-[#f1ede6] uppercase flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-[#f43f5e]" /> DANCEABILITY / GROOVE
                  </span>
                  <span className="text-[#f43f5e] bg-[#1e2232] px-2 py-0.5 border border-[#343b57]">
                    {(danceability * 100).toFixed(0)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={danceability}
                  onChange={(e) => setDanceability(parseFloat(e.target.value))}
                  aria-label="Target danceability and groove percentage"
                  className="w-full cursor-pointer"
                />
              </div>

              {/* Acousticness */}
              <div className="border-2 border-[#232736] bg-[#0b0c10] p-5 space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-[#f1ede6] uppercase flex items-center gap-2">
                    <Sliders className="h-4 w-4 text-cyan-400" /> ACOUSTIC VS SYNTHETIC TIMBRE
                  </span>
                  <span className="text-cyan-400 bg-[#1e2232] px-2 py-0.5 border border-[#343b57]">
                    {(acousticness * 100).toFixed(0)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={acousticness}
                  onChange={(e) => setAcousticness(parseFloat(e.target.value))}
                  aria-label="Target acoustic versus synthetic timbre ratio"
                  className="w-full cursor-pointer"
                />
              </div>

              {/* Tempo */}
              <div className="border-2 border-[#232736] bg-[#0b0c10] p-5 space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-[#f1ede6] uppercase flex items-center gap-2">
                    <Radio className="h-4 w-4 text-amber-400" /> TEMPO & SPEED DENSITY
                  </span>
                  <span className="text-amber-400 bg-[#1e2232] px-2 py-0.5 border border-[#343b57]">
                    {(tempo * 100).toFixed(0)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={tempo}
                  onChange={(e) => setTempo(parseFloat(e.target.value))}
                  aria-label="Target tempo and speed density ratio"
                  className="w-full cursor-pointer"
                />
              </div>

              {/* Playlist Count */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-2 border-[#232736] bg-[#0b0c10] p-4 sm:p-5 gap-3">
                <div>
                  <span className="text-xs font-bold text-white uppercase block">OUTPUT TRACK LIMIT</span>
                  <span className="text-xs text-slate-400">Select candidate count</span>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                  {[10, 15, 20].map((count) => (
                    <button
                      type="button"
                      key={count}
                      onClick={() => setPlaylistSize(count)}
                      aria-label={`Set output track limit to ${count} songs`}
                      className={`min-h-11 text-xs font-bold px-3 sm:px-4 py-2 border-2 transition-all shrink-0 ${
                        playlistSize === count
                          ? 'border-white bg-[#f43f5e] text-white shadow-[2px_2px_0px_#000000]'
                          : 'border-[#232736] bg-[#181a25] text-slate-400 hover:border-slate-500'
                      }`}
                    >
                      {count} TRACKS
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Nav Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t-2 border-[#232736] pt-6 font-mono">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className={`min-h-11 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 px-4 sm:px-5 py-3 border-2 transition-all w-full sm:w-auto ${
              step === 1
                ? 'hidden sm:flex opacity-0 cursor-default'
                : 'border-[#232736] bg-[#0b0c10] text-slate-300 hover:border-slate-500'
            }`}
          >
            <ArrowLeft className="h-4 w-4 shrink-0" /> PREV STAGE
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="min-h-11 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 px-6 py-3 bg-[#f1ede6] text-black border-2 border-black hover:bg-[#f43f5e] hover:text-white brutalist-button transition-colors w-full sm:w-auto"
            >
              NEXT STAGE <ArrowRight className="h-4 w-4 shrink-0" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleGenerateClick}
              disabled={isLoading}
              className="min-h-11 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 bg-[#f43f5e] text-white border-2 border-white brutalist-button hover:bg-rose-600 transition-colors disabled:opacity-50 w-full sm:w-auto"
            >
              {isLoading ? (
                <span>CALCULATING VECTOR MATRIX...</span>
              ) : (
                <>
                  <Activity className="h-4 w-4 text-white animate-pulse shrink-0" />
                  <span>GENERATE VECTOR PLAYLIST</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
