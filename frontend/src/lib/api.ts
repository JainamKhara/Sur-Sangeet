import axios from 'axios';
import { RecommendationRequest, PlaylistResponse, Song } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchAllSongs = async (): Promise<Song[]> => {
  const response = await apiClient.get<Song[]>('/api/songs');
  return response.data;
};

export const fetchRecommendations = async (params: RecommendationRequest): Promise<PlaylistResponse> => {
  const response = await apiClient.post<PlaylistResponse>('/api/recommendations', params);
  return response.data;
};
