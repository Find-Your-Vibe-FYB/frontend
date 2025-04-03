"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface ProgressIndicatorProps {
  currentQuestion: number
  totalQuestions: number
  category: string
  className?: string
}

export function ProgressIndicator({
  currentQuestion,
  totalQuestions,
  category,
  className,
}: ProgressIndicatorProps) {
  const categories = {
    P: { name: "Personality", color: "text-[hsl(var(--personality))]" },
    F: { name: "Flirting", color: "text-[hsl(var(--flirting))]" },
    S: { name: "Social", color: "text-[hsl(var(--social))]" },
    D: { name: "Decision", color: "text-[hsl(var(--decision))]" },
    O: { name: "Interest", color: "text-[hsl(var(--interest))]" },
  }

  const currentCategory = categories[category as keyof typeof categories]
  const progress = (currentQuestion / totalQuestions) * 100

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between text-sm">
        <span className={cn("font-medium", currentCategory.color)}>
          {currentCategory.name}
        </span>
        <span className="text-muted-foreground">
          Question {currentQuestion} of {totalQuestions}
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}
