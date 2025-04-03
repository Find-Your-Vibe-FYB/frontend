"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CountdownTimer } from "@/components/countdown-timer"
import { Heart } from "lucide-react"
import { socket, connectSocket, disconnectSocket } from "@/lib/socket"
import { useToast } from "@/components/ui/use-toast"

export default function WaitingPage({ params }: { params: { code: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes

  useEffect(() => {
    connectSocket()

    socket.emit("joinEvent", { eventCode: params.code })

    socket.on("matchReady", ({ matchId }) => {
      router.push(`/event/${params.code}/match?id=${matchId}`)
    })

    socket.on("countdownUpdate", ({ timeLeft: serverTimeLeft }) => {
      setTimeLeft(serverTimeLeft)
    })

    socket.on("error", (error) => {
      toast({
        variant: "destructive",
        title: "Connection error",
        description: "Please refresh the page",
      })
    })

    return () => {
      socket.off("matchReady")
      socket.off("countdownUpdate")
      socket.off("error")
      disconnectSocket()
    }
  }, [params.code, router, toast])

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
