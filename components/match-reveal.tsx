"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Share2 } from "lucide-react"
import { Radar } from "react-chartjs-2"
import { toast } from "sonner"
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

interface CompatibilityScores {
  personality: number
  flirting: number
  social: number
  decision: number
  interests: number
  overall: number
}

interface MatchRevealProps {
  matchName: string
  matchDescription?: string
  compatibilityScores: CompatibilityScores
  onViewProfile: () => void
  onExpressInterest: () => void
}

export function MatchReveal({
  matchName,
  matchDescription,
  compatibilityScores,
  onViewProfile,
  onExpressInterest,
}: MatchRevealProps) {
  const chartData = {
    labels: ["Personality", "Flirting", "Social", "Decision", "Interests"],
    datasets: [{
      label: "Match Compatibility",
      data: [
        compatibilityScores.personality,
        compatibilityScores.flirting,
        compatibilityScores.social,
        compatibilityScores.decision,
        compatibilityScores.interests
      ],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 2,
      fill: true
    }]
  }

  const chartOptions = {
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: { stepSize: 20 }
      }
    }
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "My Match on FYV!",
          text: `I matched with ${matchName} with ${compatibilityScores.overall}% compatibility!`,
          url: window.location.href,
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        toast.success("Match link copied to clipboard!")
      }
    } catch (error) {
      toast.error("Failed to share match")
    }
  }

  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Heart className="w-6 h-6 text-primary" />
            It's a Match!
          </CardTitle>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold mt-2"
          >
            {matchName}
          </motion.h2>
        </CardHeader>
        <CardContent>
          <div className="mb-6 aspect-square">
            <Radar data={chartData} options={chartOptions} />
          </div>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            {matchDescription && (
              <p className="text-center text-muted-foreground">{matchDescription}</p>
            )}
            
            <div className="grid gap-3 mt-6">
              <div className="flex justify-between items-center">
                <span>Overall Match</span>
                <span className="font-bold text-primary">{compatibilityScores.overall}%</span>
              </div>
              <Button onClick={onViewProfile} className="w-full">
                View Profile
              </Button>
              <Button onClick={onExpressInterest} variant="outline" className="w-full">
                Express Interest
              </Button>
              <Button 
                onClick={handleShare}
                variant="outline" 
                className="w-full"
                aria-label="Share match results"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Results
              </Button>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

