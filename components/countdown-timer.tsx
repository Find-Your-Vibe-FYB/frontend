"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CountdownTimerProps {
  timeLeft: number
  className?: string
  onComplete?: () => void
}

export function CountdownTimer({ timeLeft, className, onComplete }: CountdownTimerProps) {
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  React.useEffect(() => {
    if (timeLeft === 0 && onComplete) {
      onComplete()
    }
  }, [timeLeft, onComplete])

  return (
    <Card className={cn("p-4 text-center", className)}>
      <motion.div
        key={timeLeft}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-4xl font-bold tabular-nums"
      >
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </motion.div>
      <p className="text-sm text-muted-foreground mt-2">
        Time until matching begins
      </p>
      <motion.div
        className="h-1 bg-primary/20 mt-3 rounded-full overflow-hidden"
        style={{ transformOrigin: "left" }}
      >
        <motion.div
          className="h-full bg-primary"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: timeLeft, ease: "linear" }}
        />
      </motion.div>
    </Card>
  )
}
