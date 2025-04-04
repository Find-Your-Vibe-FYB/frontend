"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
          <RadioGroup
            value={selectedAnswer}
            onValueChange={onAnswer}
            className="space-y-4"
          >
            {question.options.map((option) => (
              <motion.div
                key={option.value}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <div className={cn(
                  "flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-all duration-200",
                  "hover:border-primary/50 hover:bg-accent hover:scale-[1.02]",
                  selectedAnswer === option.value && "border-primary bg-primary/5 shadow-sm"
                )}>
                  <div className="relative flex items-center">
                    <RadioGroupItem value={option.value} id={option.value} />
                    {selectedAnswer === option.value && (
                      <motion.div
                        layoutId="highlight"
                        className="absolute inset-0 rounded-full bg-primary/10"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2 }}
                      />
                    )}
                  </div>
                  <Label
                    htmlFor={option.value}
                    className="flex-1 cursor-pointer select-none"
                  >
                    <span className="font-semibold mr-2">{option.value}.</span>
                    {option.label}
                  </Label>
                </div>
              </motion.div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </motion.div>
  )
}
