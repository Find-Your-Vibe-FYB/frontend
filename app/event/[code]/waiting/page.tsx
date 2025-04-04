"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CountdownTimer } from "@/components/countdown-timer"
import { Heart } from "lucide-react"
import { socket, connectSocket, disconnectSocket, connectToEvent } from "@/lib/socket"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"

export default function WaitingPage({ params }: { params: { code: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    connectSocket()

    const handlers = {
      onCountdownUpdate: (serverTimeLeft: number) => {
        setTimeLeft(serverTimeLeft)
      },
      onMatchReady: (matchId: string) => {
        router.push(`/event/${params.code}/match?id=${matchId}`)
      },
      onError: (error: any) => {
        setError(error.message)
        toast({
          variant: "destructive",
          title: "Connection error",
          description: error.message || "Please refresh the page",
        })
      }
    }

    connectToEvent(params.code, handlers)

    return () => {
      disconnectSocket()
    }
  }, [params.code, router, toast])

  if (error) {
    return (
      <div className="container max-w-md mx-auto py-12 px-4">
        <Card className="text-center p-6">
          <CardContent>
            <p className="text-destructive">{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!timeLeft) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin">Connecting...</div>
      </div>
    )
  }

  return (
    <div className="container max-w-md mx-auto py-12 px-4">
      <Card className="text-center p-6">
        <CardHeader>
          <Heart className="w-12 h-12 text-primary mx-auto animate-pulse-gentle" />
          <CardTitle>Finding Your Match</CardTitle>
        </CardHeader>
        <CardContent>
          <CountdownTimer
            timeLeft={timeLeft}
            onComplete={() => router.push(`/event/${params.code}/match`)}
            className="mt-6"
          />
        </CardContent>
      </Card>
    </div>
  )
}
