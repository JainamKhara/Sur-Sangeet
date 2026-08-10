import sys
import os

backend_dir = os.path.dirname(os.path.abspath(__file__))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

import re
import pandas as pd

from app.database import SessionLocal, engine, Base
from app.models import Song

Base.metadata.create_all(bind=engine)

def extract_youtube_id(url: str) -> str:
    """Extracts 11-character YouTube video ID from URL"""
    if not isinstance(url, str):
        return ""
    match = re.search(r"(?:v=|\/)([a-zA-Z0-9_-]{11})", url)
    return match.group(1) if match else ""

def seed_spotify_dataset(csv_filepath: str, max_songs: int = 10000):
    """
    Ingests Kaggle Spotify Datasets (e.g., Maharshi Pandya's 114k Spotify Dataset or Spotify_Youtube.csv)
    Computes 5D Audio Vector Features & assigns streaming video IDs.
    """
    if not os.path.exists(csv_filepath):
        print(f"[!] CSV file not found at '{csv_filepath}'.")
        return

    print(f"[+] Reading Spotify dataset from: {csv_filepath}...")
    
    try:
        df = pd.read_csv(csv_filepath, encoding='utf-8')
    except UnicodeDecodeError:
        df = pd.read_csv(csv_filepath, encoding='latin-1')

    db = SessionLocal()
    try:
        print("[+] Ingesting Spotify tracks into SurSangeet DB...")
        count = 0
        existing_titles = set(row[0].lower() for row in db.query(Song.title).all())
        existing_yt_ids = set(row[0] for row in db.query(Song.youtube_id).all())

        for idx, row in df.iterrows():
            if count >= max_songs:
                break

            title = str(row.get('track_name', row.get('Track', row.get('title', 'Unknown Track'))))
            artist = str(row.get('artists', row.get('Artist', row.get('artist', 'Unknown Artist'))))
            album = str(row.get('album_name', row.get('Album', 'Single')))
            genre = str(row.get('track_genre', row.get('genre', 'Pop')))
            youtube_url = str(row.get('Url_youtube', ''))

            if not title or title.lower() in existing_titles:
                continue

            # Only ingest tracks with real, valid YouTube video IDs
            yt_id = extract_youtube_id(youtube_url)
            if not yt_id or yt_id in existing_yt_ids:
                continue
            existing_yt_ids.add(yt_id)

            # Audio vector features (normalized 0-1)
            danceability = float(row.get('danceability', row.get('Danceability', 0.5)))
            energy = float(row.get('energy', row.get('Energy', 0.5)))
            valence = float(row.get('valence', row.get('Valence', 0.5)))
            acousticness = float(row.get('acousticness', row.get('Acousticness', 0.3)))
            
            bpm = float(row.get('tempo', row.get('Tempo', 120.0)))
            norm_tempo = min(max(bpm / 200.0, 0.0), 1.0)
            
            duration_ms = float(row.get('duration_ms', row.get('duration', 210000)))
            duration_sec = int(duration_ms / 1000) if duration_ms > 1000 else int(duration_ms)

            # Real YouTube video thumbnail URL
            cover_art = f"https://img.youtube.com/vi/{yt_id}/hqdefault.jpg"

            song = Song(
                title=title,
                artist=artist,
                album=album,
                genre=genre,
                youtube_id=yt_id,
                duration=duration_sec if duration_sec > 0 else 210,
                thumbnail_url=cover_art,
                valence=valence,
                energy=energy,
                danceability=danceability,
                acousticness=acousticness,
                tempo=norm_tempo
            )
            db.add(song)
            existing_titles.add(title.lower())
            count += 1

            if count % 1000 == 0:
                db.commit()
                print(f"  Processed {count} Spotify tracks...")

        db.commit()
        print(f"[SUCCESS] Ingested {count} Spotify tracks into SurSangeet DB!")
    except Exception as e:
        print(f"[ERROR] Error seeding Spotify CSV: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    data_dir = os.path.join(os.path.dirname(__file__), "data")
    
    csv_file = None
    for name in ["dataset.csv", "spotify_tracks.csv", "Spotify_Youtube.csv"]:
        target = os.path.join(data_dir, name)
        if os.path.exists(target):
            csv_file = target
            break

    if csv_file:
        seed_spotify_dataset(csv_file)
    else:
        print(f"[!] Please place your Kaggle dataset CSV ('dataset.csv' or 'spotify_tracks.csv') in: {data_dir}")
