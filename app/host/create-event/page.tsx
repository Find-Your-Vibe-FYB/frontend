"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { QRCode } from "@/components/qr-code"
import { HostHeader } from "@/components/host-header"
import { ArrowLeft, Calendar, Clock, Loader2, MapPin, QrCode, Save } from "lucide-react"

export default function CreateEvent() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [eventCreated, setEventCreated] = useState(false)
  const [eventCode, setEventCode] = useState("")

  const [formData, setFormData] = useState({
    eventName: "",
    eventType: "",
    venueName: "",
    venueAddress: "",
    dateTime: "",
    description: "",
    ageRangeMin: "18",
    ageRangeMax: "99",
    dress: "",
    admissionFeeAmount: "",
    admissionFeeCurrency: "USD",
    maxAttendees: "50",
    countdownDuration: "300", // 5 minutes in seconds
    questionSet: "default",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Mock API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate successful event creation
      setEventCreated(true)
      setEventCode("PARTY" + Math.floor(1000 + Math.random() * 9000))
    } catch (error) {
      console.error("Event creation failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <div className="min-h-screen bg-background">
      <HostHeader />

      <main className="container px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" size="icon" onClick={() => router.push("/host/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold">Create New Event</h1>
          </div>

          {!eventCreated ? (
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex justify-between mb-6">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      step === 1 ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    1
                  </div>
                  <div className="flex-1 mx-2 h-1 bg-muted">
                    <div className="h-full bg-primary" style={{ width: step >= 2 ? "100%" : "0%" }} />
                  </div>
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      step === 2 ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    2
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="eventName">Event Name *</Label>
                          <Input
                            id="eventName"
                            name="eventName"
                            placeholder="Summer Mixer Party"
                            value={formData.eventName}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="eventType">Event Type *</Label>
                          <Select
                            value={formData.eventType}
                            onValueChange={(value) => handleSelectChange("eventType", value)}
                            required
                          >
                            <SelectTrigger id="eventType">
                              <SelectValue placeholder="Select event type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="party">Party</SelectItem>
                              <SelectItem value="social">Social</SelectItem>
                              <SelectItem value="dating">Dating</SelectItem>
                              <SelectItem value="networking">Networking</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="venueName">Venue Name *</Label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                              <Input
                                id="venueName"
                                name="venueName"
                                placeholder="Skyline Lounge"
                                value={formData.venueName}
                                onChange={handleChange}
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="venueAddress">Venue Address *</Label>
                            <Input
                              id="venueAddress"
                              name="venueAddress"
                              placeholder="123 Main St, City"
                              value={formData.venueAddress}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="dateTime">Date *</Label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                              <Input id="date" name="date" type="date" className="pl-10" required />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="time">Time *</Label>
                            <div className="relative">
                              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                              <Input id="time" name="time" type="time" className="pl-10" required />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            name="description"
                            placeholder="Tell participants what to expect at your event..."
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button type="button" onClick={nextStep}>
                          Next
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="ageRangeMin">Minimum Age</Label>
                            <Input
                              id="ageRangeMin"
                              name="ageRangeMin"
                              type="number"
                              min="18"
                              max="99"
                              value={formData.ageRangeMin}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="ageRangeMax">Maximum Age</Label>
                            <Input
                              id="ageRangeMax"
                              name="ageRangeMax"
                              type="number"
                              min="18"
                              max="99"
                              value={formData.ageRangeMax}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="dress">Dress Code</Label>
                          <Input
                            id="dress"
                            name="dress"
                            placeholder="Casual, Formal, etc."
                            value={formData.dress}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="admissionFeeAmount">Admission Fee (Optional)</Label>
                            <Input
                              id="admissionFeeAmount"
                              name="admissionFeeAmount"
                              type="number"
                              min="0"
                              step="0.01"
                              placeholder="0.00"
                              value={formData.admissionFeeAmount}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="admissionFeeCurrency">Currency</Label>
                            <Select
                              value={formData.admissionFeeCurrency}
                              onValueChange={(value) => handleSelectChange("admissionFeeCurrency", value)}
                            >
                              <SelectTrigger id="admissionFeeCurrency">
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="USD">USD</SelectItem>
                                <SelectItem value="EUR">EUR</SelectItem>
                                <SelectItem value="GBP">GBP</SelectItem>
                                <SelectItem value="CAD">CAD</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="maxAttendees">Maximum Attendees *</Label>
                            <Input
                              id="maxAttendees"
                              name="maxAttendees"
                              type="number"
                              min="2"
                              value={formData.maxAttendees}
                              onChange={handleChange}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="countdownDuration">Countdown Duration (seconds) *</Label>
                            <Input
                              id="countdownDuration"
                              name="countdownDuration"
                              type="number"
                              min="60"
                              value={formData.countdownDuration}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="questionSet">Question Set *</Label>
                          <Select
                            value={formData.questionSet}
                            onValueChange={(value) => handleSelectChange("questionSet", value)}
                            required
                          >
                            <SelectTrigger id="questionSet">
                              <SelectValue placeholder="Select question set" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="default">Default Questions</SelectItem>
                              <SelectItem value="personality">Personality Focus</SelectItem>
                              <SelectItem value="interests">Interests & Hobbies</SelectItem>
                              <SelectItem value="values">Values & Priorities</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={prevStep}>
                          Back
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Create Event
                            </>
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </form>
              </CardContent>
            </Card>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-2 border-primary/20">
                <CardContent className="pt-6 pb-6">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <QrCode className="h-8 w-8 text-primary" />
                    </div>

                    <h2 className="text-2xl font-bold mb-2">Event Created Successfully!</h2>
                    <p className="text-muted-foreground mb-6">
                      Share this code or QR with your participants to join the event.
                    </p>

                    <div className="text-4xl font-bold mb-6 tracking-wider">{eventCode}</div>

                    <div className="mb-6 p-4 bg-white rounded-lg">
                      <QRCode value={`https://datinggame.app/join/${eventCode}`} size={200} />
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center">
                      <Button onClick={() => router.push(`/host/event/${eventCode}`)}>Manage Event</Button>
                      <Button variant="outline" onClick={() => router.push("/host/dashboard")}>
                        Back to Dashboard
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  )
}

