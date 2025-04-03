"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { QuestionCard } from "@/components/question-card"
import { ProgressIndicator } from "@/components/progress-indicator"
import { AnswerReview } from "@/components/answer-review"
import { CountdownTimer } from "@/components/countdown-timer"
import { useToast } from "@/components/ui/use-toast"
import { useLocalStorage } from "@/hooks/use-local-storage"

// Mock questions - replace with API call
const mockQuestions = [
  {
    questionId: "P1",
    text: "How do you typically spend your free time?",
    type: "choice" as const,
    options: [
      { value: "A", label: "Socializing with friends" },
      { value: "B", label: "Pursuing hobbies alone" },
      { value: "C", label: "Mix of both" },
      { value: "D", label: "Trying new experiences" },
    ],
  },
  // Add more questions...
]

export default function QuestionnairePage({ params }: { params: { code: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useLocalStorage<Record<string, string>>(
    `questionnaire-${params.code}`,
    {}
  )
  const [isReviewing, setIsReviewing] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => {
      setIsOnline(false)
      toast({
        title: "You're offline",
        description: "Your answers will be saved locally and submitted when you're back online",
      })
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [toast])

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [mockQuestions[currentQuestionIndex].questionId]: value
    }))

    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      setIsReviewing(true)
    }
  }

  const handleEditAnswer = (questionId: string) => {
    const index = mockQuestions.findIndex(q => q.questionId === questionId)
    setCurrentQuestionIndex(index)
    setIsReviewing(false)
  }

  const handleSubmit = async () => {
    if (!isOnline) {
      toast({
        title: "Can't submit while offline",
        description: "Your answers are saved and will be submitted when you're back online",
      })
      return
    }

    try {
      // Submit answers to API
      await submitAnswers(params.code, answers)
      localStorage.removeItem(`questionnaire-${params.code}`)
      // Redirect to waiting room
      router.push(`/event/${params.code}/waiting`)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to submit answers",
        description: "Please try again. Your answers are saved locally.",
      })
    }
  }

  const currentQuestion = mockQuestions[currentQuestionIndex]

  if (isReviewing) {
    const formattedAnswers = Object.entries(answers).map(([questionId, value]) => {
      const question = mockQuestions.find(q => q.questionId === questionId)!
      const answer = question.options.find(o => o.value === value)!
      return {
        questionId,
        value,
        questionText: question.text,
        answerText: answer.label,
      }
    })

    return (
      <AnswerReview
        answers={formattedAnswers}
        onEditAnswer={handleEditAnswer}
        onSubmit={handleSubmit}
      />
    )
  }

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <ProgressIndicator
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={mockQuestions.length}
        category={currentQuestion.questionId[0]}
        className="mb-8"
      />
      <QuestionCard
        question={currentQuestion}
        onAnswer={handleAnswer}
        selectedAnswer={answers[currentQuestion.questionId]}
      />
    </div>
  )
}
