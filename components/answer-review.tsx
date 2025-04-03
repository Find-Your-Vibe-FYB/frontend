"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Edit2 } from "lucide-react"

interface Answer {
  questionId: string
  value: string
  questionText: string
  answerText: string
}

interface AnswerReviewProps {
  answers: Answer[]
  onEditAnswer: (questionId: string) => void
  onSubmit: () => void
}

export function AnswerReview({ answers, onEditAnswer, onSubmit }: AnswerReviewProps) {
  const groupedAnswers = answers.reduce((acc, answer) => {
    const category = answer.questionId[0]
    if (!acc[category]) acc[category] = []
    acc[category].push(answer)
    return acc
  }, {} as Record<string, Answer[]>)

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Review Your Answers</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {Object.entries(groupedAnswers).map(([category, answers]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h3 className="font-semibold mb-3">
                {category === "P" && "Personality"}
                {category === "F" && "Flirting Style"}
                {category === "S" && "Social Preferences"}
                {category === "D" && "Decision Making"}
                {category === "O" && "Dating Preferences"}
              </h3>
              <div className="space-y-3">
                {answers.map((answer) => (
                  <div
                    key={answer.questionId}
                    className="flex items-start justify-between p-3 rounded-lg border"
                  >
                    <div>
                      <p className="text-sm font-medium">{answer.questionText}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {answer.answerText}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditAnswer(answer.questionId)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </ScrollArea>
        <Button onClick={onSubmit} className="w-full mt-6">
          Submit Answers
        </Button>
      </CardContent>
    </Card>
  )
}
