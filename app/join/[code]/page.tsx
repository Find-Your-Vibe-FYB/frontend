"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Heart, Loader2 } from "lucide-react"
import Link from "next/link"

export default function JoinEvent({ params }: { params: { code: string } }) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [nickname, setNickname] = useState("")
  const [questionnaire, setQuestionnaire] = useState({
    q1: 3, // How much do you enjoy meeting new people? (1-5)
    q2: 3, // Do you prefer deep conversations over small talk? (1-5)
    q3: 3, // How adventurous are you with trying new things? (1-5)
  })

  const handleSliderChange = (name: string, value: number[]) => {
    setQuestionnaire((prev) => ({ ...prev, [name]: value[0] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Mock API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Move to next step or redirect to participant page
      if (step === 1) {
        setStep(2)
      } else {
        router.push(`/event/${params.code}/participant`)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Mock event data
  const eventData = {
    eventName: "Summer Mixer",
    venue: { name: "Skyline Lounge", address: "123 Main St" },
    dateTime: "2025-06-15T19:00:00",
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <Card className="border-2 border-primary/20 shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="w-6 h-6 text-primary" />
              <CardTitle className="text-2xl">Join {eventData.eventName}</CardTitle>
            </div>
            <CardDescription>
              {step === 1 ? "Enter your nickname to join" : "Answer a few questions to find your match"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nickname">Your Nickname</Label>
                    <Input
                      id="nickname"
                      placeholder="How others will see you"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Event Details</div>
                    <div className="text-sm space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Venue:</span>
                        <span>{eventData.venue.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Address:</span>
                        <span>{eventData.venue.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Date:</span>
                        <span>
                          {new Date(eventData.dateTime).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Time:</span>
                        <span>
                          {new Date(eventData.dateTime).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-base">How much do you enjoy meeting new people?</Label>
                    <div className="space-y-3">
                      <Slider
                        defaultValue={[questionnaire.q1]}
                        max={5}
                        min={1}
                        step={1}
                        onValueChange={(value) => handleSliderChange("q1", value)}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Not much</span>
                        <span>Neutral</span>
                        <span>Very much</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base">Do you prefer deep conversations over small talk?</Label>
                    <div className="space-y-3">
                      <Slider
                        defaultValue={[questionnaire.q2]}
                        max={5}
                        min={1}
                        step={1}
                        onValueChange={(value) => handleSliderChange("q2", value)}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Small talk</span>
                        <span>Both</span>
                        <span>Deep talks</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base">How adventurous are you with trying new things?</Label>
                    <div className="space-y-3">
                      <Slider
                        defaultValue={[questionnaire.q3]}
                        max={5}
                        min={1}
                        step={1}
                        onValueChange={(value) => handleSliderChange("q3", value)}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Cautious</span>
                        <span>Balanced</span>
                        <span>Very adventurous</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading || (step === 1 && !nickname.trim())}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {step === 1 ? "Joining..." : "Submitting..."}
                  </>
                ) : step === 1 ? (
                  "Join Event"
                ) : (
                  "Find My Match"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-xs text-muted-foreground text-center">
              By joining, you agree to participate in the matchmaking process and outfit rating.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

