"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface QuestionOption {
  value: string
  label: string
}

interface Question {
  questionId: string
  text: string
  type: 'choice'
  options: QuestionOption[]
}

interface QuestionCardProps {
  question: Question
  onAnswer: (value: string) => void
  selectedAnswer?: string
  className?: string
}

export function QuestionCard({ question, onAnswer, selectedAnswer, className }: QuestionCardProps) {
  const categoryColors = {
    P: "bg-[hsl(var(--personality))]",
    F: "bg-[hsl(var(--flirting))]",
    S: "bg-[hsl(var(--social))]",
    D: "bg-[hsl(var(--decision))]",
    O: "bg-[hsl(var(--interest))]",
  }

  const category = question.questionId[0]
  const categoryColor = categoryColors[category as keyof typeof categoryColors]

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className={cn("w-full max-w-2xl mx-auto", className)}
    >
      <Card>
        <CardHeader>
          <div className={cn("px-2 py-1 text-sm rounded-full w-fit", categoryColor, "text-white")}>
            Question {question.questionId}
          </div>
          <h3 className="text-lg font-semibold mt-4">{question.text}</h3>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {question.options.map((option) => (
              <Button
                key={option.value}
                variant={selectedAnswer === option.value ? "default" : "outline"}
                className="w-full justify-start text-left"
                onClick={() => onAnswer(option.value)}
              >
                <span className="font-semibold mr-2">{option.value}.</span>
                {option.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
