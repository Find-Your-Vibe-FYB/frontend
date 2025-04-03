"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, Sparkles, Users, Star } from "lucide-react"
import { ConfettiExplosion } from "./confetti-explosion"

interface MatchRevealProps {
  matchName: string
  matchImage?: string
  matchDescription?: string
  onViewProfile?: () => void
  onExpressInterest?: () => void
}

export function MatchReveal({
  matchName,
  matchImage,
  matchDescription = "Based on your questionnaire",
  onViewProfile,
  onExpressInterest,
}: MatchRevealProps) {
  const [showCountdown, setShowCountdown] = useState(true)
  const [countdown, setCountdown] = useState(3)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showMatch, setShowMatch] = useState(false)

  useEffect(() => {
    if (!showCountdown) return

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setShowCountdown(false)
          setShowConfetti(true)
          setTimeout(() => setShowMatch(true), 500)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [showCountdown])

  return (
    <div className="relative w-full max-w-md mx-auto">
      {showConfetti && <ConfettiExplosion duration={4000} />}

      <div className="absolute inset-0 bg-gradient-pastel-horizontal rounded-3xl blur-xl opacity-70 -z-10"></div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-mimi-pink/30">
        <div className="p-6 bg-gradient-pastel-horizontal">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary" />
              <h3 className="font-semibold text-lg">Your Match</h3>
            </div>
            <div className="px-3 py-1 rounded-full bg-white/80 text-xs font-medium">
              <Sparkles className="w-3 h-3 inline mr-1" />
              Perfect Match
            </div>
          </div>

          <AnimatePresence>
            {showCountdown && (
              <motion.div
                className="py-12 flex flex-col items-center justify-center"
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-center mb-4 font-medium">Your match will be revealed in</p>
                <motion.div
                  key={countdown}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg animate-pulse-gentle"
                >
                  <span className="text-4xl font-bold text-primary">{countdown}</span>
                </motion.div>
                <div className="mt-6 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-mimi-pink animate-pulse"></div>
                  <div
                    className="w-3 h-3 rounded-full bg-pale-purple animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-3 h-3 rounded-full bg-misty-rose animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {showMatch && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6"
            >
              <div className="mb-6">
                <h4 className="font-medium mb-3">Your Match is Ready!</h4>
                <motion.div
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-glow"></div>
                    {matchImage ? (
                      <img
                        src={matchImage || "/placeholder.svg"}
                        alt={matchName}
                        className="w-16 h-16 rounded-full object-cover border-2 border-white animate-scale-in"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-pale-purple flex items-center justify-center animate-scale-in">
                        <Users className="w-8 h-8 text-primary" />
                      </div>
                    )}
                    <motion.div
                      className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1, duration: 0.3 }}
                    >
                      <Star className="w-4 h-4 text-primary fill-primary" />
                    </motion.div>
                  </div>
                  <div>
                    <motion.div
                      className="font-semibold text-lg"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6, duration: 0.3 }}
                    >
                      {matchName}
                    </motion.div>
                    <motion.div
                      className="text-sm text-muted-foreground"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7, duration: 0.3 }}
                    >
                      {matchDescription}
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="flex justify-between"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.3 }}
              >
                <Button variant="outline" size="sm" className="rounded-full" onClick={onViewProfile}>
                  View Profile
                </Button>
                <Button
                  className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground animate-pop"
                  size="sm"
                  onClick={onExpressInterest}
                >
                  Express Interest
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

