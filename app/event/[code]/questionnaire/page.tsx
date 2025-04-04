"use client"

import type { Question } from "@/types/api"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { submitAnswers } from "@/lib/actions"
import { Card } from "@/components/ui/card"
import { QuestionCard } from "@/components/question-card"
import { ProgressIndicator } from "@/components/progress-indicator"
import { AnswerReview } from "@/components/answer-review"
import { CountdownTimer } from "@/components/countdown-timer"
import { useToast } from "@/components/ui/use-toast"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { api } from "@/lib/api-client"

export default function QuestionnairePage({ params }: { params: { code: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useLocalStorage<Record<string, string>>(
    `questionnaire-${params.code}`,
    {}
  )
  const [isReviewing, setIsReviewing] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const fetchEventQuestions = async () => {
      try {
        const response = await api.getEventQuestions(params.code)
        setQuestions(response.questions)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error loading questions",
          description: error instanceof Error ? error.message : "Please try again"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchEventQuestions()
  }, [params.code, toast])

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
    setAnswers({
      ...answers,
      [questions[currentQuestionIndex].questionId]: value
    })

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      setIsReviewing(true)
    }
  }

  const handleEditAnswer = (questionId: string) => {
    const index = questions.findIndex(q => q.questionId === questionId)
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

  const currentQuestion = questions[currentQuestionIndex]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin">Loading...</div>
      </div>
    )
  }

  if (isReviewing) {
    const formattedAnswers = Object.entries(answers).map(([questionId, value]) => {
      const question = questions.find(q => q.questionId === questionId)!
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
        totalQuestions={questions.length}
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
