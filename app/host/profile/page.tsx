"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, Check, Edit, Loader2, Mail, Phone, Save, Upload, User } from "lucide-react"
import { HostHeader } from "@/components/host-header"

// Mock user data
const mockUser = {
  id: "host123",
  name: "Alex Johnson",
  email: "alex@example.com",
  phone: "+1 (555) 123-4567",
  bio: "Event organizer with 5+ years of experience in creating memorable social gatherings and matchmaking events.",
  profileImage: "/placeholder.svg?height=200&width=200",
  joinedDate: "2023-05-15T00:00:00Z",
  location: "San Francisco, CA",
  socialLinks: {
    instagram: "alexjohnson",
    twitter: "alexj",
    linkedin: "alexjohnson",
  },
  stats: {
    eventsHosted: 24,
    totalParticipants: 876,
    successfulMatches: 312,
    averageRating: 4.8,
  },
}

export default function HostProfile() {
  const router = useRouter()
  const [user, setUser] = useState(mockUser)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    bio: user.bio,
    location: user.location,
    instagram: user.socialLinks.instagram,
    twitter: user.socialLinks.twitter,
    linkedin: user.socialLinks.linkedin,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)

    try {
      // Mock API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update user data
      setUser({
        ...user,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        bio: formData.bio,
        location: formData.location,
        socialLinks: {
          instagram: formData.instagram,
          twitter: formData.twitter,
          linkedin: formData.linkedin,
        },
      })

      setIsEditing(false)
    } catch (error) {
      console.error("Failed to save profile:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <HostHeader />

      <main className="container px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" size="icon" onClick={() => router.push("/host/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold font-outfit">Host Profile</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Sidebar */}
            <Card className="border-2 border-pale-purple/30 lg:col-span-1">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <Avatar className="w-32 h-32 border-4 border-pale-purple">
                      <AvatarImage src={user.profileImage} alt={user.name} />
                      <AvatarFallback className="bg-pale-purple text-primary-foreground text-2xl">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    {isEditing && (
                      <Button
                        size="icon"
                        className="absolute bottom-0 right-0 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <h2 className="text-xl font-semibold mb-1">{user.name}</h2>
                  <p className="text-muted-foreground mb-4">{user.location}</p>

                  <div className="flex items-center justify-center gap-2 mb-6">
                    <Badge variant="outline" className="bg-pale-purple/20">
                      Host
                    </Badge>
                    <Badge variant="outline" className="bg-mimi-pink/20">
                      Premium
                    </Badge>
                  </div>

                  <div className="w-full space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">{user.email}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">{user.phone}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">
                        Joined{" "}
                        {new Date(user.joinedDate).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="text-center p-3 rounded-lg bg-pale-purple/10">
                      <div className="text-2xl font-semibold">{user.stats.eventsHosted}</div>
                      <div className="text-xs text-muted-foreground">Events</div>
                    </div>

                    <div className="text-center p-3 rounded-lg bg-mimi-pink/10">
                      <div className="text-2xl font-semibold">{user.stats.totalParticipants}</div>
                      <div className="text-xs text-muted-foreground">Participants</div>
                    </div>

                    <div className="text-center p-3 rounded-lg bg-misty-rose/10">
                      <div className="text-2xl font-semibold">{user.stats.successfulMatches}</div>
                      <div className="text-xs text-muted-foreground">Matches</div>
                    </div>

                    <div className="text-center p-3 rounded-lg bg-nyanza/10">
                      <div className="text-2xl font-semibold">{user.stats.averageRating}</div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-2 border-pale-purple/30">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Manage your personal information</CardDescription>
                  </div>

                  {!isEditing ? (
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsEditing(false)
                          setFormData({
                            name: user.name,
                            email: user.email,
                            phone: user.phone,
                            bio: user.bio,
                            location: user.location,
                            instagram: user.socialLinks.instagram,
                            twitter: user.socialLinks.twitter,
                            linkedin: user.socialLinks.linkedin,
                          })
                        }}
                      >
                        Cancel
                      </Button>

                      <Button size="sm" className="gap-2" onClick={handleSave} disabled={isSaving}>
                        {isSaving ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardHeader>

                <CardContent>
                  {!isEditing ? (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">About</h3>
                        <p className="text-sm">{user.bio}</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Social Media</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#E1306C]/10 flex items-center justify-center">
                              <span className="text-[#E1306C] text-xs font-bold">IG</span>
                            </div>
                            <span className="text-sm">@{user.socialLinks.instagram}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#1DA1F2]/10 flex items-center justify-center">
                              <span className="text-[#1DA1F2] text-xs font-bold">TW</span>
                            </div>
                            <span className="text-sm">@{user.socialLinks.twitter}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#0077B5]/10 flex items-center justify-center">
                              <span className="text-[#0077B5] text-xs font-bold">LI</span>
                            </div>
                            <span className="text-sm">{user.socialLinks.linkedin}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input id="location" name="location" value={formData.location} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={4} />
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-4">Social Media</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="instagram" className="flex items-center gap-2">
                              <span className="text-xs font-bold text-[#E1306C]">Instagram</span>
                            </Label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                              <Input
                                id="instagram"
                                name="instagram"
                                value={formData.instagram}
                                onChange={handleChange}
                                className="pl-8"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="twitter" className="flex items-center gap-2">
                              <span className="text-xs font-bold text-[#1DA1F2]">Twitter</span>
                            </Label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                              <Input
                                id="twitter"
                                name="twitter"
                                value={formData.twitter}
                                onChange={handleChange}
                                className="pl-8"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="linkedin" className="flex items-center gap-2">
                              <span className="text-xs font-bold text-[#0077B5]">LinkedIn</span>
                            </Label>
                            <Input id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleChange} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-2 border-pale-purple/30">
                <CardHeader className="pb-2">
                  <CardTitle>Host Verification</CardTitle>
                  <CardDescription>Verified hosts receive more trust from participants</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-pale-purple/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-pale-purple flex items-center justify-center">
                          <Mail className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div>
                          <div className="font-medium">Email Verification</div>
                          <div className="text-sm text-muted-foreground">Your email has been verified</div>
                        </div>
                      </div>

                      <Badge className="bg-green-500">
                        <Check className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-mimi-pink/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-mimi-pink flex items-center justify-center">
                          <Phone className="h-5 w-5 text-secondary-foreground" />
                        </div>
                        <div>
                          <div className="font-medium">Phone Verification</div>
                          <div className="text-sm text-muted-foreground">Verify your phone number</div>
                        </div>
                      </div>

                      <Button size="sm" variant="outline">
                        Verify
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-misty-rose/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-misty-rose flex items-center justify-center">
                          <User className="h-5 w-5 text-accent-foreground" />
                        </div>
                        <div>
                          <div className="font-medium">ID Verification</div>
                          <div className="text-sm text-muted-foreground">Verify your identity</div>
                        </div>
                      </div>

                      <Button size="sm" variant="outline">
                        Verify
                      </Button>
                    </div>
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

