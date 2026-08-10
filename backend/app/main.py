from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from app.config import settings
from app.database import get_db, engine, Base
from app.models import Song
from app.schemas import (
    SongResponse, 
    SongCreate, 
    RecommendationRequest, 
    PlaylistResponse, 
    AudioFeatures
)
from app.ml.recommendations import generate_recommendations

# Initialize Database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="SurSangeet AI/ML Music Playlist Generator & Recommendation API"
)

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "app": "SurSangeet API",
        "status": "online",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/api/songs", response_model=List[SongResponse])
def get_all_songs(limit: int = 100, db: Session = Depends(get_db)):
    songs = db.query(Song).limit(limit).all()
    result = []
    for s in songs:
        result.append(SongResponse(
            id=s.id,
            title=s.title,
            artist=s.artist,
            album=s.album,
            youtube_id=s.youtube_id,
            duration=s.duration,
            thumbnail_url=s.thumbnail_url if (s.thumbnail_url and "http" in s.thumbnail_url) else f"https://itunes.apple.com/search?term={s.artist}+{s.title}",
            genre=s.genre,
            features=AudioFeatures(
                valence=s.valence if s.valence is not None else 0.5,
                energy=s.energy if s.energy is not None else 0.5,
                danceability=s.danceability if s.danceability is not None else 0.5,
                acousticness=s.acousticness if s.acousticness is not None else 0.5,
                tempo=s.tempo if s.tempo is not None else 0.5
            ),
            created_at=s.created_at
        ))
    return result

@app.post("/api/recommendations", response_model=PlaylistResponse)
def get_playlist_recommendations(
    request: RecommendationRequest, 
    db: Session = Depends(get_db)
):
    all_songs = db.query(Song).all()
    if not all_songs:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="No songs found in database. Please run seed script first."
        )

    recommended_songs, target_vector = generate_recommendations(request, all_songs)
    
    formatted_songs = []
    total_seconds = 0
    
    for s in recommended_songs:
        total_seconds += s.duration
        formatted_songs.append(SongResponse(
            id=s.id,
            title=s.title,
            artist=s.artist,
            album=s.album,
            youtube_id=s.youtube_id,
            duration=s.duration,
            thumbnail_url=s.thumbnail_url or f"https://img.youtube.com/vi/{s.youtube_id}/hqdefault.jpg",
            genre=s.genre,
            features=AudioFeatures(
                valence=s.valence if s.valence is not None else 0.5,
                energy=s.energy if s.energy is not None else 0.5,
                danceability=s.danceability if s.danceability is not None else 0.5,
                acousticness=s.acousticness if s.acousticness is not None else 0.5,
                tempo=s.tempo if s.tempo is not None else 0.5
            ),
            created_at=s.created_at
        ))

    return PlaylistResponse(
        playlist=formatted_songs,
        total_songs=len(formatted_songs),
        total_duration_seconds=total_seconds,
        target_vector=target_vector
    )
