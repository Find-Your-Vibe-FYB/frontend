"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

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
          <RadioGroupPrimitive.Root
            value={selectedAnswer}
            onValueChange={onAnswer}
            className="space-y-3"
          >
            {question.options.map((option) => (
              <div key={option.value} className="relative">
                <RadioGroupPrimitive.Item
                  value={option.value}
                  id={option.value}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={option.value}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-all",
                    "hover:bg-muted/50",
                    "peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                  )}
                >
                  <div className="h-4 w-4 rounded-full border border-primary flex items-center justify-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary scale-0 transition-transform peer-data-[state=checked]:scale-100" />
                  </div>
                  <span className="flex-grow">
                    <span className="font-semibold">{option.value}.</span>{" "}
                    {option.label}
                  </span>
                </Label>
              </div>
            ))}
          </RadioGroupPrimitive.Root>
        </CardContent>
      </Card>
    </motion.div>
  )
}
