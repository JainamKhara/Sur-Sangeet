'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { fetchRecommendations } from '../../lib/api';
import { RecommendationRequest, PlaylistResponse } from '../../types';
import { usePlayerStore } from '../../store/usePlayerStore';
import Navbar from '../../components/Navbar';
import QuestionnaireWizard from '../../components/QuestionnaireWizard';
import Player from '../../components/Player';

export default function CalibratePage() {
  const router = useRouter();
  const { setPlaylist } = usePlayerStore();

  const recommendationMutation = useMutation({
    mutationFn: (params: RecommendationRequest) => fetchRecommendations(params),
    onSuccess: (data: PlaylistResponse) => {
      setPlaylist(data.playlist, 0);
      router.push('/player');
    },
  });

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#f1ede6] font-sans antialiased pb-28 bg-grain">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-8 pt-12 space-y-8 relative z-10">
        <section className="text-center space-y-3 max-w-3xl mx-auto font-mono">
          <h1 className="font-heading text-3xl sm:text-5xl font-black tracking-tighter text-[#f1ede6] uppercase">
            CALIBRATE <span className="text-[#f43f5e]">AUDIO VECTOR</span>
          </h1>
          <p className="text-sm text-slate-400">
            Tune your 5D acoustic metrics below to retrieve high-similarity tracks powered by KNN cosine distance.
          </p>
        </section>

        <section className="pb-12">
          <QuestionnaireWizard
            onSubmit={(params) => recommendationMutation.mutate(params)}
            isLoading={recommendationMutation.isPending}
          />
        </section>
      </main>
    </div>
  );
}
