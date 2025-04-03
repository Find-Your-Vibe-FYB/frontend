"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Calendar, ChevronDown, Clock, Edit, MoreHorizontal, Plus, Search, Trash2, User, Users } from "lucide-react"
import { HostHeader } from "@/components/host-header"

// Mock data for events
const mockEvents = [
  {
    id: "1",
    eventName: "Summer Mixer",
    eventCode: "SUMMER23",
    eventType: "party",
    dateTime: "2025-06-15T19:00:00",
    venue: { name: "Skyline Lounge", address: "123 Main St" },
    status: "upcoming",
    participantCount: 24,
    maxAttendees: 50,
  },
  {
    id: "2",
    eventName: "Coffee Connections",
    eventCode: "COFFEE22",
    eventType: "social",
    dateTime: "2025-05-10T10:00:00",
    venue: { name: "Brew & Bean", address: "456 Park Ave" },
    status: "active",
    participantCount: 18,
    maxAttendees: 30,
  },
  {
    id: "3",
    eventName: "Networking Night",
    eventCode: "NETWORK21",
    eventType: "networking",
    dateTime: "2025-04-20T18:30:00",
    venue: { name: "Tech Hub", address: "789 Innovation Blvd" },
    status: "completed",
    participantCount: 42,
    maxAttendees: 50,
  },
]

export default function HostDashboard() {
  const router = useRouter()
  const [events, setEvents] = useState(mockEvents)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredEvents = events
    .filter(
      (event) =>
        event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.eventCode.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((event) => filterStatus === "all" || event.status === filterStatus)

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId))
  }

  return (
    <div className="min-h-screen bg-background">
      <HostHeader />

      <main className="container px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold">Your Events</h1>
            <p className="text-muted-foreground">Manage and monitor your dating game events</p>
          </div>

          <Link href="/host/create-event">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create New Event
            </Button>
          </Link>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search events..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                Status: {filterStatus === "all" ? "All" : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFilterStatus("all")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("upcoming")}>Upcoming</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("active")}>Active</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("completed")}>Completed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {filteredEvents.length === 0 ? (
          <Card className="border-dashed border-2 bg-muted/50">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No events found</p>
              <Link href="/host/create-event">
                <Button variant="outline" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Your First Event
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{event.eventName}</CardTitle>
                        <CardDescription>Code: {event.eventCode}</CardDescription>
                      </div>

                      <Badge
                        variant={
                          event.status === "upcoming" ? "outline" : event.status === "active" ? "default" : "secondary"
                        }
                        className={event.status === "active" ? "bg-green-500" : ""}
                      >
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="pb-2">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {new Date(event.dateTime).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {new Date(event.dateTime).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {event.participantCount} / {event.maxAttendees} participants
                        </span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-2">
                    <div className="flex justify-between items-center w-full">
                      <Button variant="outline" size="sm" onClick={() => router.push(`/host/event/${event.id}`)}>
                        View Details
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/host/event/${event.id}`)}>
                            <User className="h-4 w-4 mr-2" />
                            Manage Event
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/host/event/${event.id}/edit`)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Event
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Event
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete the event "{event.eventName}" and all associated data.
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteEvent(event.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

