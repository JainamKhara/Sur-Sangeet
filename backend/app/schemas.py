from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class AudioFeatures(BaseModel):
    valence: float = Field(0.5, ge=0.0, le=1.0)
    energy: float = Field(0.5, ge=0.0, le=1.0)
    danceability: float = Field(0.5, ge=0.0, le=1.0)
    acousticness: float = Field(0.5, ge=0.0, le=1.0)
    tempo: float = Field(0.5, ge=0.0, le=1.0)

class SongBase(BaseModel):
    title: str
    artist: str
    album: Optional[str] = None
    youtube_id: str
    duration: int = 200
    thumbnail_url: Optional[str] = None
    genre: Optional[str] = "Pop"

class SongCreate(SongBase):
    valence: float = 0.5
    energy: float = 0.5
    danceability: float = 0.5
    acousticness: float = 0.5
    tempo: float = 0.5

class SongResponse(SongBase):
    id: int
    features: AudioFeatures
    created_at: datetime

    class Config:
        from_attributes = True

class RecommendationRequest(BaseModel):
    mood: Optional[str] = Field("happy", description="happy, energetic, calm, sad, romantic, focused")
    activity: Optional[str] = Field("relaxing", description="workout, party, studying, relaxing, driving, coding")
    danceability: Optional[float] = Field(0.5, ge=0.0, le=1.0)
    acousticness: Optional[float] = Field(0.5, ge=0.0, le=1.0)
    tempo: Optional[float] = Field(0.5, ge=0.0, le=1.0)
    playlist_size: int = Field(15, ge=5, le=50)

class PlaylistResponse(BaseModel):
    playlist: List[SongResponse]
    total_songs: int
    total_duration_seconds: int
    target_vector: AudioFeatures
