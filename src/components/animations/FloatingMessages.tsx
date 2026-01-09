"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingMessagesProps {
  className?: string
  messages?: string[]
  cycleDuration?: number
}

const defaultMessages = [
  "You're 25, call the dentist yourself",
  "Who's calling the restaurant?",
  "Can you schedule my appointment?",
  "I get shy on the phone...",
  "Mom, can you do it for me?",
]

// Viewport-spread positions: corners and edges for immersive scattered feel
// Each position includes parallax speed multiplier for depth effect
const positions = [
  // Top-left corner
  {
    top: "8%",
    left: "4%",
    parallaxSpeed: 0.15,
    rotation: -6,
  },
  // Top-right corner
  {
    top: "12%",
    right: "6%",
    parallaxSpeed: 0.25,
    rotation: 4,
  },
  // Left edge (middle-ish)
  {
    top: "45%",
    left: "2%",
    parallaxSpeed: 0.1,
    rotation: -3,
  },
  // Right edge (middle-ish)
  {
    top: "40%",
    right: "3%",
    parallaxSpeed: 0.2,
    rotation: 5,
  },
  // Bottom-left
  {
    bottom: "15%",
    left: "8%",
    parallaxSpeed: 0.18,
    rotation: -4,
  },
]

export function FloatingMessages({
  className,
  messages = defaultMessages,
  cycleDuration = 2500,
}: FloatingMessagesProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll-based parallax
  const { scrollY } = useScroll()

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % Math.min(messages.length, 5))
    }, cycleDuration)

    return () => clearInterval(interval)
  }, [messages.length, cycleDuration])

  // Create parallax transforms for each position
  const parallaxTransforms = positions.map((pos) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(scrollY, [0, 500], [0, 100 * pos.parallaxSpeed])
  )

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed inset-0 pointer-events-none overflow-hidden z-10",
        className
      )}
    >
      {messages.slice(0, 5).map((message, index) => {
        const isActive = index === activeIndex
        const position = positions[index]
        const parallaxY = parallaxTransforms[index]

        return (
          <motion.div
            key={index}
            className={cn(
              "absolute px-4 py-2.5 rounded-2xl text-sm font-medium",
              "font-sans backdrop-blur-sm",
              "border border-rose-200/50",
              "shadow-lg shadow-rose-200/20",
              "transition-colors duration-500",
              isActive
                ? "bg-rose-100/95 text-rose-600 border-rose-300/60"
                : "bg-white/80 text-zinc-500"
            )}
            style={{
              top: position.top,
              bottom: position.bottom,
              left: position.left,
              right: position.right,
              maxWidth: "220px",
              y: parallaxY,
              rotate: position.rotation,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isActive ? 1 : 0.5,
              scale: isActive ? 1.03 : 1,
            }}
            transition={{
              opacity: { duration: 0.4, ease: "easeOut" },
              scale: { duration: 0.4, ease: "easeOut" },
            }}
            whileInView={{
              opacity: isActive ? 1 : 0.5,
            }}
          >
            {/* Chat bubble tail for active message */}
            {isActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -bottom-1.5 left-4 w-3 h-3 bg-rose-100/95 border-b border-r border-rose-300/60 rotate-45"
              />
            )}
            <span className="relative z-10">{message}</span>
          </motion.div>
        )
      })}
    </div>
  )
}

export default FloatingMessages
