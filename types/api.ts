export interface Event {
  eventId: string;
  eventName: string;
  eventType: 'party' | 'social' | 'networking';
  venue?: {
    name: string;
    address: string;
  };
  dateTime: string;
  description?: string;
  countdownDuration: number;
  maxAttendees: number;
  questionSet: string;
}

export interface Match {
  categoryScores: CategoryScores;
  match: {
    yourRole: string;
    eventId: string;
    participant1: string;
    participant2: string;
    score: number;
    createdAt: string;
  };
  yourRole: 'participant1' | 'participant2';
}

export interface CategoryScores {
  personality: number;
  flirting: number;
  social: number;
  decision: number;
  interests: number;
}

export interface MatchAnalytics {
  matchScore: number;
  categoryScores: CategoryScores;
  commonAnswers: number;
  complementaryAnswers: number;
  mutualInterest: boolean;
}

export interface Outfit {
  outfitId: string;
  participantId: string;
  imagePath: string;
  description: string;
  category: 'casual' | 'formal' | 'party' | 'costume' | 'other';
  style: 'vintage' | 'modern' | 'edgy' | 'classic' | 'creative';
  votes: number;
  comments: Array<{
    participantId: string;
    text: string;
    createdAt: string;
  }>;
}

export interface Question {
  questionId: string;
  text: string;
  type: 'choice';
  options: Array<{
    value: string;
    label: string;
  }>;
  category: 'personality' | 'flirting' | 'social' | 'decision' | 'interest';
}
