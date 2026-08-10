export interface AudioFeatures {
  valence: number;
  energy: number;
  danceability: number;
  acousticness: number;
  tempo: number;
}

export interface Song {
  id: number;
  title: string;
  artist: string;
  album?: string;
  youtube_id: string;
  duration: number;
  thumbnail_url: string;
  genre?: string;
  features?: AudioFeatures;
  danceability?: number;
  energy?: number;
  acousticness?: number;
  tempo?: number;
  valence?: number;
}

export interface RecommendationRequest {
  mood: string;
  activity: string;
  danceability: number;
  acousticness: number;
  tempo: number;
  playlist_size: number;
}

export interface PlaylistResponse {
  playlist: Song[];
  total_songs: number;
  total_duration_seconds: number;
  target_vector: AudioFeatures;
}
