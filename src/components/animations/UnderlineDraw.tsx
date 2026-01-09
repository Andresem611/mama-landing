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
      viewBox="0 0 200 24"
      className={cn("w-full h-6 sm:h-8", className)}
      preserveAspectRatio="none"
    >
      {/* Hand-drawn wavy line effect - more pronounced wave */}
      <motion.path
        d="M0 12 Q30 4, 60 12 T120 12 T180 12 L200 12"
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
