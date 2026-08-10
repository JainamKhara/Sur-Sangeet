import numpy as np
from sklearn.neighbors import NearestNeighbors
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Tuple
from app.models import Song
from app.schemas import RecommendationRequest, AudioFeatures
from app.config import settings

def build_user_vector(request: RecommendationRequest) -> np.ndarray:
    """
    Constructs a 5-dimensional user preference vector [valence, energy, danceability, acousticness, tempo]
    combining mood, activity, and explicit slider parameters.
    """
    # 1. Base from mood
    mood_config = settings.MOOD_MAPPINGS.get(request.mood.lower(), {"valence": 0.5, "energy": 0.5})
    base_valence = mood_config["valence"]
    
    # 2. Base from activity
    activity_config = settings.ACTIVITY_MAPPINGS.get(request.activity.lower(), {"energy": 0.5, "danceability": 0.5})
    base_energy = (mood_config["energy"] + activity_config["energy"]) / 2.0
    
    # 3. Direct sliders override or blend
    danceability = request.danceability if request.danceability is not None else activity_config.get("danceability", 0.5)
    acousticness = request.acousticness if request.acousticness is not None else 0.5
    tempo = request.tempo if request.tempo is not None else 0.5

    vector = np.array([base_valence, base_energy, danceability, acousticness, tempo], dtype=float)
    return np.clip(vector, 0.0, 1.0)

import random

def generate_recommendations(
    user_request: RecommendationRequest, 
    all_songs: List[Song]
) -> Tuple[List[Song], AudioFeatures]:
    """
    KNN Cosine Similarity recommendation with stochastic diversity sampling.
    """
    if not all_songs:
        return [], AudioFeatures(valence=0.5, energy=0.5, danceability=0.5, acousticness=0.5, tempo=0.5)

    base_user_vec = build_user_vector(user_request)
    
    # Add slight random noise (+/- 0.05) to vector for fresh variety on identical choices
    noise = np.random.uniform(-0.05, 0.05, size=base_user_vec.shape)
    user_vec = np.clip(base_user_vec + noise, 0.0, 1.0).reshape(1, -1)
    
    # Extract matrices from database songs and clean any NaN values
    song_vectors = np.array([s.to_vector() for s in all_songs], dtype=float)
    song_vectors = np.nan_to_num(song_vectors, nan=0.5)
    
    # Calculate Cosine Similarities (higher is better)
    similarities = cosine_similarity(user_vec, song_vectors)[0]
    
    # Take top candidate pool (top 150 matching songs)
    top_candidate_indices = list(np.argsort(similarities)[::-1][:150])
    
    # Shuffle top candidates with weighted probability favoring high similarity
    random.shuffle(top_candidate_indices)
    top_candidate_indices.sort(key=lambda idx: similarities[idx] + random.uniform(-0.08, 0.08), reverse=True)
    
    # Apply Diversity Filter (prevent max 2 songs per artist in a playlist)
    selected_songs: List[Song] = []
    artist_counts = {}
    
    for idx in top_candidate_indices:
        candidate = all_songs[idx]
        artist = candidate.artist
        
        if artist_counts.get(artist, 0) >= 2:
            continue
            
        selected_songs.append(candidate)
        artist_counts[artist] = artist_counts.get(artist, 0) + 1
        
        if len(selected_songs) >= user_request.playlist_size:
            break
            
    # If not enough diversity candidates, fill up to playlist_size from top pool
    if len(selected_songs) < user_request.playlist_size:
        for idx in top_candidate_indices:
            candidate = all_songs[idx]
            if candidate not in selected_songs:
                selected_songs.append(candidate)
                if len(selected_songs) >= user_request.playlist_size:
                    break

    target_audio_features = AudioFeatures(
        valence=float(user_vec[0][0]),
        energy=float(user_vec[0][1]),
        danceability=float(user_vec[0][2]),
        acousticness=float(user_vec[0][3]),
        tempo=float(user_vec[0][4])
    )

    return selected_songs, target_audio_features
