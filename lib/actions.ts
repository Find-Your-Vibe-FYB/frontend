import { api } from './api-client';

export async function submitAnswers(eventCode: string, answers: Record<string, string>) {
  const participantId = localStorage.getItem(`participant-${eventCode}`);
  if (!participantId) {
    throw new Error('Participant ID not found');
  }

  // Convert answers to API format
  const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
    questionId,
    answer
  }));

  return api.submitQuestionnaire(eventCode, participantId, formattedAnswers);
}

export async function joinEvent(eventCode: string, nickname: string) {
  const response = await api.joinEvent(eventCode, { nickname });
  
  // Store participant ID for later use
  localStorage.setItem(`participant-${eventCode}`, response.participantId);
  
  return response;
}

export async function getMatchResults(eventCode: string) {
  const participantId = localStorage.getItem(`participant-${eventCode}`);
  if (!participantId) {
    throw new Error('Participant ID not found');
  }

  return api.getMatch(eventCode, participantId);
}

export async function expressInterest(eventCode: string, interested: boolean) {
  const participantId = localStorage.getItem(`participant-${eventCode}`);
  if (!participantId) {
    throw new Error('Participant ID not found');
  }

  return api.updateInterest(eventCode, participantId, interested);
}
