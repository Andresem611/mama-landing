"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"

interface MamaMascotProps {
  /** Width of the mascot in pixels */
  width?: number
  /** Height of the mascot in pixels */
  height?: number
  /** Additional CSS classes */
  className?: string
  /** Alt text for accessibility */
  alt?: string
}

/**
 * Mama Mascot - Retro-futuristic mom with phone
 *
 * A Jetsons-inspired line art mascot.
 * The mascot represents MAMA AI making phone calls on your behalf.
 */
export function MamaMascot({
  width = 200,
  height = 280,
  className,
  alt = "MAMA - Your AI assistant for phone calls",
}: MamaMascotProps) {
  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width, height }}
    >
      {/* Subtle static glow behind mascot for depth on cream bg */}
      <div
        className="absolute inset-0 bg-gradient-radial from-zinc-200/30 via-zinc-100/10 to-transparent rounded-full blur-3xl opacity-40"
      />

      {/* Mascot PNG */}
      <Image
        src="/mama-mascot.png"
        alt={alt}
        width={width}
        height={height}
        className="relative z-10 drop-shadow-lg"
        priority
      />
    </div>
  )
}

export default MamaMascot
