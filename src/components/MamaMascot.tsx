"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface MamaMascotProps {
  /** Width of the mascot in pixels */
  width?: number
  /** Height of the mascot in pixels */
  height?: number
  /** Additional CSS classes */
  className?: string
  /** Whether to animate the mascot */
  animate?: boolean
  /** Animation intensity (0-1) */
  intensity?: number
  /** Alt text for accessibility */
  alt?: string
}

/**
 * Mama Mascot - Retro-futuristic mom with phone
 *
 * A Jetsons-inspired line art mascot with a subtle floating/bobbing animation.
 * The mascot represents MAMA AI making phone calls on your behalf.
 */
export function MamaMascot({
  width = 200,
  height = 280,
  className,
  animate = true,
  intensity = 1,
  alt = "MAMA - Your AI assistant for phone calls",
}: MamaMascotProps) {
  // Calculate animation values based on intensity
  const floatDistance = 12 * intensity
  const rotateAmount = 2 * intensity

  return (
    <motion.div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width, height }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={
        animate
          ? {
              opacity: 1,
              scale: 1,
              y: [0, -floatDistance, 0],
              rotate: [-rotateAmount, rotateAmount, -rotateAmount],
            }
          : { opacity: 1, scale: 1 }
      }
      transition={
        animate
          ? {
              opacity: { duration: 0.6, ease: "easeOut" },
              scale: { duration: 0.6, ease: "easeOut" },
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
              rotate: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }
          : { duration: 0.6 }
      }
    >
      {/* Glow effect behind mascot */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-rose-200/40 via-rose-100/20 to-transparent rounded-full blur-2xl"
        animate={
          animate
            ? {
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.6, 0.4],
              }
            : {}
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Mascot SVG */}
      <Image
        src="/mama-mascot.svg"
        alt={alt}
        width={width}
        height={height}
        className="relative z-10 drop-shadow-lg"
        priority
      />

      {/* Decorative sparkles around mascot */}
      {animate && (
        <>
          <Sparkle
            className="absolute -top-2 -right-2"
            delay={0}
            size={12}
          />
          <Sparkle
            className="absolute top-1/4 -left-4"
            delay={0.5}
            size={10}
          />
          <Sparkle
            className="absolute bottom-1/3 -right-6"
            delay={1}
            size={14}
          />
        </>
      )}
    </motion.div>
  )
}

/**
 * Decorative sparkle animation
 */
function Sparkle({
  className,
  delay = 0,
  size = 12,
}: {
  className?: string
  delay?: number
  size?: number
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn("text-amber-300", className)}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        rotate: [0, 180],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 1,
        ease: "easeInOut",
      }}
    >
      <path
        d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
        fill="currentColor"
      />
    </motion.svg>
  )
}

export default MamaMascot
