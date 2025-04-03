"use client"

import { useEffect, useState } from "react"
import confetti from "canvas-confetti"

interface ConfettiExplosionProps {
  duration?: number
  particleCount?: number
  spread?: number
  origin?: { x: number; y: number }
  colors?: string[]
  onComplete?: () => void
}

export function ConfettiExplosion({
  duration = 3000,
  particleCount = 100,
  spread = 70,
  origin = { x: 0.5, y: 0.5 },
  colors = ["#ff69b4", "#ba55d3", "#9370db", "#8a2be2", "#ff1493"],
  onComplete,
}: ConfettiExplosionProps) {
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const end = Date.now() + duration

    // Create a canvas-confetti instance
    const confettiInstance = confetti.create(undefined, {
      resize: true,
      useWorker: true,
    })

    // Launch initial burst
    confettiInstance({
      particleCount: particleCount,
      spread: spread,
      origin: origin,
      colors: colors,
      disableForReducedMotion: true,
    })

    // Create a continuous effect
    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval)
        setIsComplete(true)
        if (onComplete) onComplete()
        return
      }

      confettiInstance({
        particleCount: particleCount / 3,
        spread: spread - 20,
        origin: {
          x: origin.x + (Math.random() - 0.5) * 0.2,
          y: origin.y + (Math.random() - 0.5) * 0.2,
        },
        colors: colors,
        disableForReducedMotion: true,
      })
    }, 250)

    return () => {
      clearInterval(interval)
      confettiInstance.reset()
    }
  }, [duration, particleCount, spread, origin, colors, onComplete])

  return null
}

