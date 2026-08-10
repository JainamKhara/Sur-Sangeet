# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Music enthusiasts, casual listeners, and audio lovers seeking tailored mood and activity-driven music playlists matched via quantitative audio feature vectors (danceability, energy, acousticness, valence, tempo).

## Product Purpose

SurSangeet empowers users to generate personalized, non-repetitive playlists instantly through an intuitive 5-step vector calibration wizard, and play them directly using a retro-modern Hi-Fi turntable sound deck interface integrated with YouTube audio streaming.

## Positioning

SurSangeet differentiates itself from traditional genre/search-based music apps by executing real-time **K-Nearest Neighbors (KNN) Cosine Distance** vector matching across normalized audio features with an automated **Artist Diversity Filter** to prevent repetitive sequence clustering.

## Operating Context

Used on desktop and mobile web browsers for background playback during workouts, study sessions, relaxation, or social gatherings.

## Capabilities and Constraints

- **5-Step Preference Wizard**: Interactive mapping of mood, activity, danceability, tempo, and acoustic preferences.
- **KNN ML Recommendation Engine**: Fast vector distance search across a 10,000+ song catalog hosted on Neon serverless PostgreSQL.
- **Hi-Fi Sound Deck Player**: Integrated YouTube IFrame audio engine with interactive tonearm animation, spinning vinyl cover disc, track scrubber, volume control, and queue management.
- **Constraints**: Relies on public YouTube audio stream IDs and Neon PostgreSQL connectivity.

## Brand Commitments

- **Name**: SurSangeet (KNN Audio Vector Sound Deck)
- **Visual Flexibility**: Open to visual evolution, micro-interactions, and visual polishing while respecting dark-mode usability.

## Evidence on Hand

- `backend/app/ml/recommendations.py`: Production-grade KNN cosine similarity engine implementation.
- `backend/seed_data.py`: Multi-thousand track CSV dataset seed script for Neon DB.
- `frontend/src/app/player/page.tsx`: Full interactive turntable player page.

## Product Principles

1. **Audio Vector Precision**: Ground recommendations on quantitative audio features rather than raw keyword tags.
2. **Dynamic Playlist Flow**: Enforce artist diversity to ensure refreshing listening sessions.
3. **Tactile Music Experience**: Provide feedback through physical hardware-inspired UI elements (turntable tonearm, vinyl grooves, scrubber).

## Accessibility & Inclusion

- Responsive layout across desktop and mobile viewports.
- Keyboard accessible player controls and clear high-contrast text ratios.
