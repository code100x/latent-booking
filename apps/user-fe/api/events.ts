// Events related API calls
import { apiClient } from './client';
import { PaginatedResponse } from './types';

export interface Event {
  id: string;
  eventName: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  eventType: string;
  ageRating: string;
  reviews: number;
  ticketPrice: number;
}

export const eventsApi = {
  getAll: async (page = 1, limit = 10) => {
    const response = await apiClient.get<PaginatedResponse<Event>>('/events', {
      params: { page, limit },
    });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get<Event>(`/events/${id}`);
    return response.data;
  },

  bookTicket: async (eventId: string, quantity: number) => {
    const response = await apiClient.post(`/events/${eventId}/book`, { quantity });
    return response.data;
  },
}; 