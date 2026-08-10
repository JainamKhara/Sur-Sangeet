from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from app.database import Base

class Song(Base):
    __tablename__ = "songs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    artist = Column(String, nullable=False, index=True)
    album = Column(String, nullable=True)
    youtube_id = Column(String(20), nullable=False, unique=True, index=True)
    duration = Column(Integer, default=200)  # seconds
    thumbnail_url = Column(String, nullable=True)
    genre = Column(String, default="Pop")

    # Audio Vector Features (Normalized 0.0 to 1.0)
    valence = Column(Float, default=0.5)      # Positivity / Mood
    energy = Column(Float, default=0.5)       # Intensity / Activity
    danceability = Column(Float, default=0.5) # Rhythm stability
    acousticness = Column(Float, default=0.5) # Electronic vs Acoustic
    tempo = Column(Float, default=0.5)        # Speed normalized

    created_at = Column(DateTime, default=datetime.utcnow)

    def to_vector(self):
        """Returns feature vector array for ML calculations with safe defaults"""
        return [
            self.valence if self.valence is not None else 0.5,
            self.energy if self.energy is not None else 0.5,
            self.danceability if self.danceability is not None else 0.5,
            self.acousticness if self.acousticness is not None else 0.5,
            self.tempo if self.tempo is not None else 0.5
        ]
