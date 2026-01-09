"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingMessagesProps {
  className?: string
  messages?: string[]
  cycleDuration?: number
}

const defaultMessages = [
  "You're 25, call the dentist yourself",
  "Who's calling the restaurant?",
  "Can you please make this call? I get shy",
  "Mom, can you schedule my appointment?",
]

// Position configuration for messages around a center point
// Top, Right, Bottom, Left arrangement
const positions = [
  { top: "0%", left: "50%", transform: "translate(-50%, 0)" },           // Top
  { top: "50%", right: "0%", transform: "translate(0, -50%)" },          // Right
  { bottom: "0%", left: "50%", transform: "translate(-50%, 0)" },        // Bottom
  { top: "50%", left: "0%", transform: "translate(0, -50%)" },           // Left
]

export function FloatingMessages({
  className,
  messages = defaultMessages,
  cycleDuration = 2500,
}: FloatingMessagesProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % messages.length)
    }, cycleDuration)

    return () => clearInterval(interval)
  }, [messages.length, cycleDuration])

  return (
    <div className={cn("relative w-full h-full", className)}>
      {messages.slice(0, 4).map((message, index) => {
        const isActive = index === activeIndex
        const position = positions[index]

        return (
          <motion.div
            key={index}
            className={cn(
              "absolute px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap",
              "font-quicksand transition-colors duration-300",
              isActive
                ? "bg-rose-100 text-rose-600"
                : "bg-rose-50 text-zinc-400"
            )}
            style={{
              ...position,
              maxWidth: index % 2 === 0 ? "280px" : "220px",
              whiteSpace: "normal",
              textAlign: "center",
            }}
            animate={{
              opacity: isActive ? 1 : 0.35,
              scale: isActive ? 1.02 : 1,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            {message}
          </motion.div>
        )
      })}
    </div>
  )
}

export default FloatingMessages
