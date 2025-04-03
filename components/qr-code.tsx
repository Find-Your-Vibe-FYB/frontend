"use client"

import { useEffect, useRef } from "react"
import QRCodeLibrary from "qrcode"

interface QRCodeProps {
  value: string
  size?: number
  bgColor?: string
  fgColor?: string
}

export function QRCode({ value, size = 200, bgColor = "#FFFFFF", fgColor = "#000000" }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      QRCodeLibrary.toCanvas(
        canvasRef.current,
        value,
        {
          width: size,
          margin: 2,
          color: {
            dark: fgColor,
            light: bgColor,
          },
        },
        (error) => {
          if (error) console.error("Error generating QR code:", error)
        },
      )
    }
  }, [value, size, bgColor, fgColor])

  return <canvas ref={canvasRef} />
}

