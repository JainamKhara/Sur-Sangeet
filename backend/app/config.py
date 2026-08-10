import os
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()

class Settings(BaseModel):
    PROJECT_NAME: str = "SurSangeet API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./sursangeet.db")
    
    # CORS
    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
    ]
    
    # ML Config
    DEFAULT_PLAYLIST_SIZE: int = 15
    KNN_K_NEIGHBORS: int = 30
    
    # Mood mappings to Audio Features (Valence, Energy)
    MOOD_MAPPINGS: dict[str, dict[str, float]] = {
        "happy": {"valence": 0.9, "energy": 0.8},
        "energetic": {"valence": 0.7, "energy": 0.95},
        "calm": {"valence": 0.6, "energy": 0.25},
        "sad": {"valence": 0.2, "energy": 0.3},
        "romantic": {"valence": 0.75, "energy": 0.5},
        "focused": {"valence": 0.5, "energy": 0.4},
    }
    
    # Activity mappings to Audio Features (Energy, Danceability)
    ACTIVITY_MAPPINGS: dict[str, dict[str, float]] = {
        "workout": {"energy": 0.95, "danceability": 0.85},
        "party": {"energy": 0.9, "danceability": 0.95},
        "studying": {"energy": 0.3, "danceability": 0.2},
        "relaxing": {"energy": 0.2, "danceability": 0.3},
        "driving": {"energy": 0.7, "danceability": 0.6},
        "coding": {"energy": 0.5, "danceability": 0.4},
    }

settings = Settings()
