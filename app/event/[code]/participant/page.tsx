"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Heart,
  Image,
  Loader2,
  MapPin,
  MessageCircle,
  ThumbsUp,
  Upload,
  User,
} from "lucide-react"
import Link from "next/link"

// Mock event data
const mockEvent = {
  id: "1",
  eventName: "Summer Mixer",
  eventCode: "SUMMER23",
  venue: { name: "Skyline Lounge", address: "123 Main St" },
  dateTime: "2025-06-15T19:00:00",
  description: "Join us for a fun summer mixer with games, drinks, and matchmaking!",
  countdownDuration: 300, // 5 minutes in seconds
}

// Mock outfits data
const mockOutfits = [
  {
    id: "o1",
    participantId: "p1",
    participantNickname: "Alex",
    description: "Casual summer outfit with linen shirt and chinos",
    imageUrl: "/placeholder.svg?height=300&width=300",
    category: "casual",
    style: "modern",
    tags: ["summer", "linen", "comfortable"],
    votes: 12,
    comments: [
      { id: "c1", participantId: "p2", participantNickname: "Jordan", text: "Love the color combination!" },
      { id: "c2", participantId: "p3", participantNickname: "Taylor", text: "Where did you get that shirt?" },
    ],
  },
  {
    id: "o2",
    participantId: "p2",
    participantNickname: "Jordan",
    description: "Vintage-inspired dress with floral pattern",
    imageUrl: "/placeholder.svg?height=300&width=300",
    category: "party",
    style: "vintage",
    tags: ["floral", "dress", "retro"],
    votes: 18,
    comments: [{ id: "c3", participantId: "p4", participantNickname: "Casey", text: "This is stunning!" }],
  },
  {
    id: "o3",
    participantId: "p3",
    participantNickname: "Taylor",
    description: "Minimalist black ensemble with statement accessories",
    imageUrl: "/placeholder.svg?height=300&width=300",
    category: "formal",
    style: "modern",
    tags: ["black", "minimalist", "accessories"],
    votes: 15,
    comments: [],
  },
]

export default function ParticipantPage({ params }: { params: { code: string } }) {
  const router = useRouter()
  const [event, setEvent] = useState(mockEvent)
  const [outfits, setOutfits] = useState(mockOutfits)
  const [countdown, setCountdown] = useState(event.countdownDuration)
  const [isCountdownActive, setIsCountdownActive] = useState(true)
  const [matchRevealed, setMatchRevealed] = useState(false)
  const [match, setMatch] = useState<{ id: string; nickname: string } | null>(null)
  const [showInterestSent, setShowInterestSent] = useState(false)
  const [outfitFormData, setOutfitFormData] = useState({
    description: "",
    category: "casual",
    style: "modern",
    tags: [],
  })
  const [newComment, setNewComment] = useState("")
  const [isSubmittingOutfit, setIsSubmittingOutfit] = useState(false)

  // Format countdown time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Handle outfit submission
  const handleOutfitSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingOutfit(true)

    try {
      // Mock API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Add new outfit to the list
      const newOutfit = {
        id: `o${outfits.length + 1}`,
        participantId: "self",
        participantNickname: "You",
        description: outfitFormData.description,
        imageUrl: "/placeholder.svg?height=300&width=300",
        category: outfitFormData.category,
        style: outfitFormData.style,
        tags: outfitFormData.tags,
        votes: 0,
        comments: [],
      }

      setOutfits([newOutfit, ...outfits])
      setOutfitFormData({
        description: "",
        category: "casual",
        style: "modern",
        tags: [],
      })
    } catch (error) {
      console.error("Error submitting outfit:", error)
    } finally {
      setIsSubmittingOutfit(false)
    }
  }

  // Handle voting
  const handleVote = (outfitId: string) => {
    setOutfits(outfits.map((outfit) => (outfit.id === outfitId ? { ...outfit, votes: outfit.votes + 1 } : outfit)))
  }

  // Handle comment submission
  const handleCommentSubmit = (outfitId: string) => {
    if (!newComment.trim()) return

    setOutfits(
      outfits.map((outfit) =>
        outfit.id === outfitId
          ? {
              ...outfit,
              comments: [
                ...outfit.comments,
                {
                  id: `c${Math.random().toString(36).substr(2, 9)}`,
                  participantId: "self",
                  participantNickname: "You",
                  text: newComment,
                },
              ],
            }
          : outfit,
      ),
    )

    setNewComment("")
  }

  // Express interest in match
  const expressInterest = () => {
    setShowInterestSent(true)
  }

  // Simulate countdown
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isCountdownActive && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    } else if (countdown === 0 && isCountdownActive) {
      // Reveal match
      setMatchRevealed(true)
      setMatch({ id: "p5", nickname: "Riley" })
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isCountdownActive, countdown])

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Find Your Vibe</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm font-medium">
              Event Code: <span className="font-bold">{event.eventCode}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-6">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">{event.eventName}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="md:col-span-2 border-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Event Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <div className="font-medium">{event.venue.name}</div>
                        <div className="text-sm text-muted-foreground">{event.venue.address}</div>
                      </div>
                    </div>
                  </div>

                  <div>
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

                {event.description && <div className="mt-4 text-sm">{event.description}</div>}
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Countdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl font-bold mb-2">{formatTime(countdown)}</div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {countdown > 0 ? "Until matches are revealed" : "Matches are ready!"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="match" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="match">Matchmaking</TabsTrigger>
              <TabsTrigger value="outfits">Outfit Rating</TabsTrigger>
            </TabsList>

            <TabsContent value="match" className="mt-6">
              <Card className="border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Your Match</CardTitle>
                </CardHeader>
                <CardContent>
                  {!matchRevealed ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 animate-pulse">
                        <Heart className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Waiting for your match...</h3>
                      <p className="text-muted-foreground">Matches will be revealed when the countdown ends</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                      >
                        <User className="h-10 w-10 text-primary" />
                      </motion.div>

                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        <h3 className="text-2xl font-bold mb-2">You matched with {match?.nickname}!</h3>
                        <p className="text-muted-foreground mb-6">
                          Based on your questionnaire responses, you might be a great match!
                        </p>

                        {!showInterestSent ? (
                          <Button onClick={expressInterest} className="gap-2">
                            <Heart className="h-4 w-4" />
                            Express Interest
                          </Button>
                        ) : (
                          <div className="flex items-center justify-center gap-2 text-green-500">
                            <Check className="h-5 w-5" />
                            <span>Interest sent!</span>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="outfits" className="mt-6 space-y-6">
              <Card className="border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Submit Your Outfit</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleOutfitSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="outfitDescription">Description</Label>
                      <Textarea
                        id="outfitDescription"
                        placeholder="Describe your outfit..."
                        value={outfitFormData.description}
                        onChange={(e) => setOutfitFormData({ ...outfitFormData, description: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={outfitFormData.category}
                          onValueChange={(value) => setOutfitFormData({ ...outfitFormData, category: value })}
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="formal">Formal</SelectItem>
                            <SelectItem value="party">Party</SelectItem>
                            <SelectItem value="costume">Costume</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="style">Style</Label>
                        <Select
                          value={outfitFormData.style}
                          onValueChange={(value) => setOutfitFormData({ ...outfitFormData, style: value })}
                        >
                          <SelectTrigger id="style">
                            <SelectValue placeholder="Select style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="modern">Modern</SelectItem>
                            <SelectItem value="vintage">Vintage</SelectItem>
                            <SelectItem value="classic">Classic</SelectItem>
                            <SelectItem value="edgy">Edgy</SelectItem>
                            <SelectItem value="creative">Creative</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Upload Image (Optional)</Label>
                      <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center">
                        <Image className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">Drag and drop an image, or click to browse</p>
                        <Button type="button" variant="outline" size="sm" className="gap-2">
                          <Upload className="h-4 w-4" />
                          Upload Image
                        </Button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmittingOutfit || !outfitFormData.description.trim()}
                    >
                      {isSubmittingOutfit ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Outfit"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Outfits Gallery</h2>

                {outfits.map((outfit) => (
                  <Card key={outfit.id} className="border-2 hover:border-primary/20 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/3">
                          <img
                            src={outfit.imageUrl || "/placeholder.svg"}
                            alt={outfit.description}
                            className="w-full h-auto rounded-md object-cover aspect-square"
                          />
                        </div>

                        <div className="md:w-2/3 space-y-4">
                          <div>
                            <div className="flex items-center justify-between">
                              <div className="font-bold">{outfit.participantNickname}</div>
                              <div className="flex items-center gap-1">
                                <Badge variant="outline" className="bg-secondary/50">
                                  {outfit.category}
                                </Badge>
                                <Badge variant="outline" className="bg-secondary/50">
                                  {outfit.style}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm mt-1">{outfit.description}</p>
                          </div>

                          <div className="flex items-center gap-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2"
                              onClick={() => handleVote(outfit.id)}
                              disabled={outfit.participantId === "self"}
                            >
                              <ThumbsUp className="h-4 w-4" />
                              {outfit.votes}
                            </Button>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-2">
                                  <MessageCircle className="h-4 w-4" />
                                  {outfit.comments.length}
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Comments</AlertDialogTitle>
                                </AlertDialogHeader>
                                <div className="max-h-[300px] overflow-y-auto space-y-3 my-4">
                                  {outfit.comments.length === 0 ? (
                                    <p className="text-sm text-muted-foreground text-center py-4">
                                      No comments yet. Be the first to comment!
                                    </p>
                                  ) : (
                                    outfit.comments.map((comment) => (
                                      <div key={comment.id} className="border-b pb-2">
                                        <div className="font-medium">{comment.participantNickname}</div>
                                        <p className="text-sm">{comment.text}</p>
                                      </div>
                                    ))
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Input
                                    placeholder="Add a comment..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                  />
                                  <Button onClick={() => handleCommentSubmit(outfit.id)} disabled={!newComment.trim()}>
                                    Send
                                  </Button>
                                </div>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Close</AlertDialogCancel>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  )
}

