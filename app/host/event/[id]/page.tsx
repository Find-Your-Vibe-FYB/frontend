"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { QRCode } from "@/components/qr-code"
import { HostHeader } from "@/components/host-header"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ArrowLeft, Calendar, Clock, Edit, MapPin, QrCode, Sparkles, Trash2, Users, User } from "lucide-react"

// Mock event data
const mockEvent = {
  id: "1",
  eventName: "Summer Mixer",
  eventCode: "SUMMER23",
  eventType: "party",
  dateTime: "2025-06-15T19:00:00",
  venue: { name: "Skyline Lounge", address: "123 Main St" },
  description: "Join us for a fun summer mixer with games, drinks, and matchmaking!",
  status: "upcoming",
  participantCount: 24,
  maxAttendees: 50,
  ageRange: { min: 21, max: 45 },
  dress: "Smart casual",
  admissionFee: { amount: 15, currency: "USD" },
  countdownDuration: 300, // 5 minutes in seconds
  questionSet: "default",
  participants: [
    { id: "p1", nickname: "Alex", joinedAt: "2025-06-14T10:30:00" },
    { id: "p2", nickname: "Jordan", joinedAt: "2025-06-14T11:15:00" },
    { id: "p3", nickname: "Taylor", joinedAt: "2025-06-14T12:45:00" },
    { id: "p4", nickname: "Casey", joinedAt: "2025-06-14T13:20:00" },
    { id: "p5", nickname: "Riley", joinedAt: "2025-06-14T14:10:00" },
  ],
}

export default function EventManagement({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [event, setEvent] = useState(mockEvent)
  const [countdown, setCountdown] = useState(event.countdownDuration)
  const [isCountdownActive, setIsCountdownActive] = useState(false)
  const [matchingStarted, setMatchingStarted] = useState(false)

  // Format countdown time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Start countdown
  const startCountdown = () => {
    setIsCountdownActive(true)
  }

  // Start matching
  const startMatching = () => {
    setMatchingStarted(true)
  }

  // Delete event
  const deleteEvent = () => {
    router.push("/host/dashboard")
  }

  // Simulate countdown
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isCountdownActive && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    } else if (countdown === 0 && isCountdownActive) {
      setMatchingStarted(true)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isCountdownActive, countdown])

  return (
    <div className="min-h-screen bg-background">
      <HostHeader />

      <main className="container px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" size="icon" onClick={() => router.push("/host/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold">{event.eventName}</h1>
            <Badge
              variant={event.status === "upcoming" ? "outline" : event.status === "active" ? "default" : "secondary"}
              className={event.status === "active" ? "bg-green-500" : ""}
            >
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Event Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Event Code</div>
                        <div className="text-lg font-bold">{event.eventCode}</div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Event Type</div>
                        <div>{event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}</div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Venue</div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                          <div>
                            <div>{event.venue.name}</div>
                            <div className="text-sm text-muted-foreground">{event.venue.address}</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Date & Time</div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(event.dateTime).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(event.dateTime).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Age Range</div>
                        <div>
                          {event.ageRange.min} - {event.ageRange.max} years
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Dress Code</div>
                        <div>{event.dress}</div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Admission Fee</div>
                        <div>
                          {event.admissionFee.amount > 0
                            ? `${event.admissionFee.amount} ${event.admissionFee.currency}`
                            : "Free"}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Participants</div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {event.participantCount} / {event.maxAttendees}
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Question Set</div>
                        <div>{event.questionSet.charAt(0).toUpperCase() + event.questionSet.slice(1)}</div>
                      </div>
                    </div>
                  </div>

                  {event.description && (
                    <div className="mt-4">
                      <div className="text-sm font-medium text-muted-foreground mb-1">Description</div>
                      <div className="text-sm">{event.description}</div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3 mt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => router.push(`/host/event/${event.id}/edit`)}
                    >
                      <Edit className="h-4 w-4" />
                      Edit Event
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 text-destructive border-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete Event
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the event "{event.eventName}" and all associated data. This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={deleteEvent}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Matching Control</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center text-center">
                    <div className="text-5xl font-bold mb-4">{formatTime(countdown)}</div>

                    <p className="text-muted-foreground mb-6">
                      {!isCountdownActive
                        ? "Start the countdown when you're ready to begin matching"
                        : countdown > 0
                          ? "Countdown to matching..."
                          : "Matching complete!"}
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                      {!isCountdownActive && !matchingStarted && (
                        <Button onClick={startCountdown} className="gap-2">
                          <Clock className="h-4 w-4" />
                          Start Countdown
                        </Button>
                      )}

                      {isCountdownActive && countdown > 0 && (
                        <Button variant="outline" onClick={() => setIsCountdownActive(false)}>
                          Pause Countdown
                        </Button>
                      )}

                      {!matchingStarted && (
                        <Button onClick={startMatching} className="gap-2" disabled={isCountdownActive && countdown > 0}>
                          <Sparkles className="h-4 w-4" />
                          Start Matching Now
                        </Button>
                      )}

                      {matchingStarted && (
                        <Button
                          variant="outline"
                          onClick={() => router.push(`/host/event/${event.id}/analytics`)}
                          className="gap-2"
                        >
                          View Results
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">QR Code</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-lg mb-4">
                    <QRCode value={`https://datinggame.app/join/${event.eventCode}`} size={180} />
                  </div>

                  <p className="text-sm text-center text-muted-foreground mb-4">
                    Participants can scan this QR code to join the event
                  </p>

                  <Button variant="outline" className="w-full gap-2">
                    <QrCode className="h-4 w-4" />
                    Download QR Code
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Participants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-muted-foreground">{event.participants.length} joined</div>
                    <Badge variant="outline">
                      {event.participantCount} / {event.maxAttendees}
                    </Badge>
                  </div>

                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                    {event.participants.map((participant) => (
                      <div
                        key={participant.id}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{participant.nickname}</div>
                            <div className="text-xs text-muted-foreground">
                              Joined{" "}
                              {new Date(participant.joinedAt).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

