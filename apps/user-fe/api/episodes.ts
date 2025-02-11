// Episodes related API calls
import { apiClient } from './client';
import { PaginatedResponse } from './types';

export interface Episode {
  id: string;
  title: string;
  thumbnail: string;
  episodeNumber: number;
  youtubeId: string;
  isPremium: boolean;
}

export const episodesApi = {
  getAll: async (page = 1, limit = 10) => {
    const response = await apiClient.get<PaginatedResponse<Episode>>('/episodes', {
      params: { page, limit },
    });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get<Episode>(`/episodes/${id}`);
    return response.data;
  },

  getPremiumEpisodes: async (page = 1, limit = 10) => {
    const response = await apiClient.get<PaginatedResponse<Episode>>('/episodes/premium', {
      params: { page, limit },
    });
    return response.data;
  },
}; 