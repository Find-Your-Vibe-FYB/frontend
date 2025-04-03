import type React from "react"
import { Poppins, Outfit } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Find Your Vibe (FYV) - Matchmaking Events</title>
        <meta
          name="description"
          content="Find Your Vibe (FYV) - Create and join matchmaking events that connect people through shared interests and vibes."
        />
      </head>
      <body className={`${poppins.variable} ${outfit.variable} font-poppins`}>{children}</body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
