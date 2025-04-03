"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Heart, QrCode, Scan } from "lucide-react"
import { MainNav } from "@/components/main-nav"

export default function JoinPage() {
  const router = useRouter()
  const [eventCode, setEventCode] = useState("")
  const [isScanning, setIsScanning] = useState(false)

  const handleJoin = () => {
    if (eventCode.trim()) {
      router.push(`/join/${eventCode}`)
    }
  }

  const toggleScanner = () => {
    setIsScanning(!isScanning)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-mimi-pink/30 to-white">
      <header className="w-full bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <MainNav />
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-2 border-mimi-pink/30 shadow-lg overflow-hidden">
              <CardHeader className="text-center bg-gradient-to-r from-mimi-pink/30 to-misty-rose/30 pb-6">
                <div className="mx-auto w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2">
                  <Heart className="w-6 h-6 text-secondary-foreground" />
                </div>
                <CardTitle className="text-2xl font-outfit">Join an Event</CardTitle>
                <CardDescription>Enter an event code or scan a QR code to join</CardDescription>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                {!isScanning ? (
                  <div className="space-y-6">
                    <div className="relative">
                      <Input
                        placeholder="Enter event code"
                        value={eventCode}
                        onChange={(e) => setEventCode(e.target.value)}
                        className="pr-12 rounded-full border-2 focus-visible:ring-secondary"
                      />
                      <Button
                        className="absolute right-0 top-0 h-full rounded-l-none rounded-r-full"
                        onClick={handleJoin}
                        disabled={!eventCode.trim()}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-mimi-pink/20 to-misty-rose/20 rounded-full blur-md"></div>
                      <Button
                        variant="outline"
                        className="w-full relative gap-2 py-6 text-lg border-2 hover:bg-background/80 rounded-full"
                        onClick={toggleScanner}
                      >
                        <QrCode className="w-5 h-5" />
                        Scan QR Code
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-pale-purple/20 animate-float">
                        <div className="w-10 h-10 rounded-full bg-pale-purple flex items-center justify-center">
                          <Heart className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <p className="text-center text-sm font-medium">Find Your Match</p>
                      </div>
                      <div
                        className="flex flex-col items-center gap-2 p-4 rounded-xl bg-misty-rose/20 animate-float"
                        style={{ animationDelay: "0.5s" }}
                      >
                        <div className="w-10 h-10 rounded-full bg-misty-rose flex items-center justify-center">
                          <QrCode className="w-5 h-5 text-accent-foreground" />
                        </div>
                        <p className="text-center text-sm font-medium">Rate Outfits</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="aspect-square bg-muted rounded-xl flex flex-col items-center justify-center border-2 border-dashed">
                      <Scan className="w-12 h-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground text-center">Point your camera at the event QR code</p>
                    </div>

                    <Button variant="outline" className="w-full rounded-full" onClick={toggleScanner}>
                      Cancel Scanning
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

