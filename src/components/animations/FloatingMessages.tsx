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
  "Mom can you call for me pleaseee",
  "I'm literally an adult why is this hard",
  "Not me rehearsing what to say...",
  "Can you pretend to be me?",
  "I'll do the dishes for a month",
]

// Positions closer to center, staggered around mascot
// Avoiding header (top 8%), headline area (bottom-left), and keeping away from edges
const positions = [
  // Left side - upper (below header, staggered)
  {
    top: "12%",
    left: "8%",
    parallaxSpeed: 0.15,
    rotation: -3,
  },
  // Right side - upper (below header, staggered)
  {
    top: "10%",
    right: "10%",
    parallaxSpeed: 0.2,
    rotation: 2,
  },
  // Left side - middle
  {
    top: "28%",
    left: "5%",
    parallaxSpeed: 0.12,
    rotation: -2,
  },
  // Right side - middle
  {
    top: "24%",
    right: "6%",
    parallaxSpeed: 0.18,
    rotation: 3,
  },
  // Left side - lower-middle (above headline zone)
  {
    top: "42%",
    left: "10%",
    parallaxSpeed: 0.1,
    rotation: -1,
  },
  // Right side - lower-middle
  {
    top: "38%",
    right: "8%",
    parallaxSpeed: 0.22,
    rotation: 2,
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
      setActiveIndex((prev) => (prev + 1) % Math.min(messages.length, 6))
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
      {messages.slice(0, 6).map((message, index) => {
        const isActive = index === activeIndex
        const position = positions[index]
        const parallaxY = parallaxTransforms[index]

        return (
          <motion.div
            key={index}
            className={cn(
              "absolute px-3 py-2 rounded-xl text-xs font-medium",
              "font-sans",
              "transition-all duration-400",
              isActive
                ? "bg-rose-400 text-white border-2 border-rose-500 shadow-lg shadow-rose-300/30"
                : "bg-white/80 text-zinc-400 border border-zinc-200/50 shadow-sm shadow-zinc-200/20"
            )}
            style={{
              top: position.top,
              left: "left" in position ? position.left : undefined,
              right: "right" in position ? position.right : undefined,
              maxWidth: "180px",
              y: parallaxY,
              rotate: position.rotation,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isActive ? 0.95 : 0.45,
              scale: isActive ? 1.05 : 0.95,
            }}
            transition={{
              opacity: { duration: 0.3, ease: "easeOut" },
              scale: { duration: 0.3, ease: "easeOut" },
            }}
            whileInView={{
              opacity: isActive ? 0.95 : 0.45,
            }}
          >
            {/* Chat bubble tail for active message */}
            {isActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -bottom-1.5 left-4 w-3 h-3 bg-rose-400 border-b-2 border-r-2 border-rose-500 rotate-45"
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
