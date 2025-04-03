"use client"

import { Calendar } from "@/components/ui/calendar"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HostHeader } from "@/components/host-header"
import { ArrowLeft, BarChart3, Download, Heart, PieChart, ThumbsUp, Users } from "lucide-react"

// Mock analytics data
const mockAnalytics = {
  totalEvents: 5,
  totalParticipants: 127,
  totalMatches: 58,
  matchRate: 91.4, // percentage
  followUpRate: 72.3, // percentage
  events: [
    {
      id: "1",
      eventName: "Summer Mixer",
      eventCode: "SUMMER23",
      dateTime: "2025-06-15T19:00:00",
      participants: 24,
      matches: 12,
      followUps: 8,
      outfits: 18,
      outfitVotes: 156,
    },
    {
      id: "2",
      eventName: "Coffee Connections",
      eventCode: "COFFEE22",
      dateTime: "2025-05-10T10:00:00",
      participants: 18,
      matches: 9,
      followUps: 7,
      outfits: 12,
      outfitVotes: 98,
    },
    {
      id: "3",
      eventName: "Networking Night",
      eventCode: "NETWORK21",
      dateTime: "2025-04-20T18:30:00",
      participants: 42,
      matches: 21,
      followUps: 14,
      outfits: 35,
      outfitVotes: 287,
    },
  ],
}

export default function AnalyticsPage() {
  const router = useRouter()
  const [analytics, setAnalytics] = useState(mockAnalytics)

  return (
    <div className="min-h-screen bg-background">
      <HostHeader />

      <main className="container px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" size="icon" onClick={() => router.push("/host/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold">Analytics</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">{analytics.totalEvents}</div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Participants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">{analytics.totalParticipants}</div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Match Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">{analytics.matchRate}%</div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Follow-up Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">{analytics.followUpRate}%</div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <ThumbsUp className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="events" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="charts">Charts</TabsTrigger>
            </TabsList>

            <TabsContent value="events">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Event Analytics</h2>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export Data
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {analytics.events.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="border-2 hover:border-primary/20 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="md:w-1/3">
                              <h3 className="text-xl font-bold mb-1">{event.eventName}</h3>
                              <div className="text-sm text-muted-foreground mb-2">Code: {event.eventCode}</div>
                              <div className="text-sm">
                                {new Date(event.dateTime).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </div>
                            </div>

                            <div className="md:w-2/3">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="space-y-1">
                                  <div className="text-sm font-medium text-muted-foreground">Participants</div>
                                  <div className="text-2xl font-bold">{event.participants}</div>
                                </div>

                                <div className="space-y-1">
                                  <div className="text-sm font-medium text-muted-foreground">Matches</div>
                                  <div className="text-2xl font-bold">{event.matches}</div>
                                </div>

                                <div className="space-y-1">
                                  <div className="text-sm font-medium text-muted-foreground">Follow-ups</div>
                                  <div className="text-2xl font-bold">{event.followUps}</div>
                                </div>

                                <div className="space-y-1">
                                  <div className="text-sm font-medium text-muted-foreground">Outfit Votes</div>
                                  <div className="text-2xl font-bold">{event.outfitVotes}</div>
                                </div>
                              </div>

                              <div className="flex justify-end mt-4">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => router.push(`/host/event/${event.id}/analytics`)}
                                >
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="charts">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Performance Charts</h2>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export Charts
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Participants by Event
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center">
                        <div className="text-muted-foreground">Chart visualization would appear here</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PieChart className="h-5 w-5" />
                        Match Success Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center">
                        <div className="text-muted-foreground">Chart visualization would appear here</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 md:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="h-5 w-5" />
                        Follow-up Interest Over Time
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center">
                        <div className="text-muted-foreground">Chart visualization would appear here</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  )
}

