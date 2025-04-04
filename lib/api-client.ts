import { CategoryScores, Event, Match, MatchAnalytics, Outfit } from "@/types/api"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiClientOptions {
  headers?: Record<string, string>;
  body?: any;
}

async function apiClient<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET',
  options: ApiClientOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
}

export const api = {
  // Host endpoints
  hostLogin: (credentials: { email: string; password: string }) =>
    apiClient<{ token: string }>('/hosts/login', 'POST', { body: credentials }),

  hostRegister: (credentials: { email: string; password: string }) =>
    apiClient<{ token: string }>('/hosts/register', 'POST', { body: credentials }),

  // Event endpoints
  createEvent: (data: {
    eventName: string
    questionSet: string
    maxAttendees: number
    countdownDuration: number
  }) =>
    apiClient<{ eventId: string; eventCode: string; qrCodeUrl: string }>(
      '/events',
      'POST',
      { body: data }
    ),

  getEvent: (eventId: string) => 
    apiClient<Event>(`/events/${eventId}`),

  updateEvent: (eventId: string, data: Partial<Event>) =>
    apiClient<void>(`/events/${eventId}`, 'PATCH', { body: data }),

  deleteEvent: (eventId: string) =>
    apiClient<void>(`/events/${eventId}`, 'DELETE'),

  startMatching: (eventId: string) =>
    apiClient<void>(`/events/${eventId}/match`, 'POST'),

  getEventQuestions: (eventId: string) =>
    apiClient<EventQuestionResponse>(`/events/${eventId}/questions`),

  // Participant endpoints
  joinEvent: (eventCode: string, data: { nickname: string }) =>
    apiClient<{ participantId: string }>(`/events/${eventCode}/join`, 'POST', { 
      body: data 
    }),

  submitQuestionnaire: (
    eventId: string,
    participantId: string,
    answers: Array<{ questionId: string; answer: string }>
  ) =>
    apiClient<void>(`/events/${eventId}/participants/${participantId}/questionnaire`, 'POST', {
      body: { answers }
    }),

  // Match endpoints
  getMatch: (eventId: string, participantId: string) =>
    apiClient<Match>(`/events/${eventId}/participants/${participantId}/match`),

  updateInterest: (eventId: string, participantId: string, interested: boolean) =>
    apiClient<void>(`/events/${eventId}/participants/${participantId}/interest`, 'POST', {
      body: { interested }
    }),

  getMatchAnalytics: (eventId: string, matchId: string) =>
    apiClient<MatchAnalytics>(`/events/${eventId}/matches/${matchId}/analytics`),

  // Outfit endpoints
  submitOutfit: (eventId: string, formData: FormData) =>
    apiClient<{ outfitId: string; imagePath: string }>(
      `/events/${eventId}/outfits`,
      'POST',
      { body: formData }
    ),

  voteOnOutfit: (eventId: string, outfitId: string, data: { participantId: string; value: number }) =>
    apiClient<void>(`/events/${eventId}/outfits/${outfitId}/vote`, 'POST', { body: data }),

  getOutfitLeaderboard: (eventId: string, limit: number = 5) =>
    apiClient<Array<Outfit>>(`/events/${eventId}/outfits/leaderboard?limit=${limit}`),

  addOutfitComment: (eventId: string, outfitId: string, data: { participantId: string; text: string }) =>
    apiClient<void>(`/events/${eventId}/outfits/${outfitId}/comments`, 'POST', { body: data }),

  getTrendingOutfits: (eventId: string) =>
    apiClient<Array<Outfit>>(`/events/${eventId}/outfits/trending`),

  getOutfitsByCategory: (eventId: string, category?: string, style?: string) => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (style) params.append('style', style);
    return apiClient<Array<Outfit>>(`/events/${eventId}/outfits/category?${params}`);
  },
};
