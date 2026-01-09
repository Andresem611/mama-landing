"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface UnderlineDrawProps {
  delay?: number
  color?: string
  className?: string
  strokeWidth?: number
}

export function UnderlineDraw({
  delay = 1.2,
  color = "var(--rose-400)",
  className,
  strokeWidth = 3,
}: UnderlineDrawProps) {
  return (
    <motion.svg
      viewBox="0 0 200 20"
      className={cn("absolute -bottom-2 left-0 w-full h-auto", className)}
      preserveAspectRatio="none"
    >
      {/* Hand-drawn wavy line effect using quadratic bezier curves */}
      <motion.path
        d="M0 10 Q25 5, 50 10 T100 10 T150 10 T200 10"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: {
            duration: 0.8,
            delay: delay,
            ease: "easeOut",
          },
          opacity: {
            duration: 0.2,
            delay: delay,
          },
        }}
      />
    </motion.svg>
  )
}

export default UnderlineDraw
