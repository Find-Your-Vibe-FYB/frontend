"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getMatchResults, expressInterest } from "@/lib/actions"
import { MatchReveal } from "@/components/match-reveal"
import { useToast } from "@/components/ui/use-toast"
import type { Match } from "@/types/api"

export default function MatchPage({ params }: { params: { code: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [matchData, setMatchData] = useState<Match | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const data = await getMatchResults(params.code)
        setMatchData(data)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error loading match",
          description: error instanceof Error ? error.message : "Please try refreshing the page"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchMatchData()
  }, [params.code, toast])

  const handleViewProfile = () => {
    if (!matchData) return
    const participantId = matchData.match.yourRole === 'participant1' 
      ? matchData.match.participant2 
      : matchData.match.participant1
    router.push(`/event/${params.code}/profile/${participantId}`)
  }

  const handleExpressInterest = async () => {
    try {
      await expressInterest(params.code, true)
      toast({
        title: "Interest sent!",
        description: "They'll be notified of your interest",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to express interest",
        description: "Please try again",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container py-12 px-4">
      {matchData && (
        <MatchReveal
          matchName={matchData.match.yourRole === 'participant1' 
            ? matchData.match.participant2
            : matchData.match.participant1}
          matchDescription={`${matchData.match.score}% compatibility based on your answers`}
          compatibilityScores={matchData.categoryScores}
          onViewProfile={handleViewProfile}
          onExpressInterest={handleExpressInterest}
        />
      )}
    </div>
  )
}

