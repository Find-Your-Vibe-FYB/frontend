import type { Question, CategoryScores } from "./api"

export interface FormattedAnswer {
  questionId: string
  value: string
  questionText: string
  answerText: string
}

export interface EventQuestionResponse {
  questions: Question[]
  totalQuestions: number
  categories: string[]
}

export interface MatchReviewProps {
  matchId: string
  scores: CategoryScores
  questions: Question[]
  answers: Record<string, string>
  compatibilityDetails: {
    commonInterests: string[]
    complementaryTraits: string[]
  }
}
