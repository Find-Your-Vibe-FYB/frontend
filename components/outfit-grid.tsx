"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, MessageCircle } from "lucide-react"
import type { Outfit } from "@/types/api"

interface OutfitGridProps {
  outfits: Outfit[]
  onVote: (outfitId: string) => void
  onComment: (outfitId: string) => void
}

export function OutfitGrid({ outfits, onVote, onComment }: OutfitGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {outfits.map((outfit) => (
        <motion.div
          key={outfit.outfitId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={outfit.imagePath}
                alt={outfit.description}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-3">
              <div className="flex gap-2 mb-2">
                <Badge>{outfit.category}</Badge>
                <Badge variant="outline">{outfit.style}</Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {outfit.description}
              </p>
              <div className="flex justify-between items-center mt-3">
                <button
                  onClick={() => onVote(outfit.outfitId)}
                  className="flex items-center gap-1 text-sm"
                >
                  <ThumbsUp className="w-4 h-4" />
                  {outfit.votes}
                </button>
                <button
                  onClick={() => onComment(outfit.outfitId)}
                  className="flex items-center gap-1 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  {outfit.comments.length}
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
