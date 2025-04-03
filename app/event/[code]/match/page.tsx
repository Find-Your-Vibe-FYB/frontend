"use client"

import { useState, useEffect } from "react"
import { MatchReveal } from "@/components/match-reveal"

export default function MatchPage({ params }: { params: { code: string } }) {
  // Mock data - replace with API call
  const matchData = {
    matchName: "Alex Chen",
    matchDescription: "95% compatibility based on your answers",
    compatibilityScores: {
      personality: 90,
      flirting: 85,
      social: 95,
      decision: 88,
      interests: 92,
      overall: 95
    }
  }

  const handleViewProfile = () => {
    // Implement profile view
  }

  const handleExpressInterest = () => {
    // Implement interest expression
  }

  return (
    <div className="container py-12 px-4">
      <MatchReveal
        {...matchData}
        onViewProfile={handleViewProfile}
        onExpressInterest={handleExpressInterest}
      />
    </div>
  )
}

