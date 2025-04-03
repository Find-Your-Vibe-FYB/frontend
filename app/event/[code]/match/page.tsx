"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MatchReveal } from "@/components/match-reveal"
import { Header } from "@/components/header"

export default function MatchPage() {
  const [showMatch, setShowMatch] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-pale-purple/30 via-mimi-pink/20 to-white">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Event: Summer Vibes Mixer</h1>
          <p className="text-muted-foreground mb-8">
            The matching phase is complete! Get ready to discover your perfect match.
          </p>

          {!showMatch && (
            <Button
              size="lg"
              onClick={() => setShowMatch(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6"
            >
              Reveal My Match
            </Button>
          )}
        </div>

        {showMatch && (
          <div className="max-w-md mx-auto">
            <MatchReveal
              matchName="Alex Chen"
              matchDescription="95% compatibility based on your answers"
              onViewProfile={() => alert("View profile clicked")}
              onExpressInterest={() => alert("Interest expressed!")}
            />
          </div>
        )}
      </main>
    </div>
  )
}

