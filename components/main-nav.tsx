"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Menu, X } from "lucide-react"

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Heart className="w-6 h-6 text-primary-foreground" />
        <span className="text-xl font-bold font-outfit">Find Your Vibe</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
       
        <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
          Pricing
        </Link>
       
      </nav>

      <div className="hidden md:flex items-center gap-4">
        <Link href="/host">
          <Button variant="outline" className="rounded-full">
            Host
          </Button>
        </Link>
        <Link href="/join">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">Join Event</Button>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg z-50 p-4 md:hidden border-t">
          <nav className="flex flex-col gap-4">
            <Link
              href="/about"
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/features"
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="border-t my-2"></div>
            <Link
              href="/host"
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Host an Event
            </Link>
            <Link
              href="/join"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Join an Event
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}

