"use client"

import { motion, Variants } from "framer-motion"
import { cn } from "@/lib/utils"

interface WordPullUpProps {
  words: string
  className?: string
  delayMultiple?: number
  startDelay?: number
  onAnimationComplete?: () => void
}

export function WordPullUp({
  words,
  className,
  delayMultiple = 0.15,
  startDelay = 0,
  onAnimationComplete,
}: WordPullUpProps) {
  const wordArray = words.split(" ")

  const customVariants: Variants = {
    initial: {
      y: 20,
      opacity: 0,
    },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: startDelay + i * delayMultiple,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  }

  return (
    <div className={cn("flex flex-wrap", className)}>
      {wordArray.map((word, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={customVariants}
          initial="initial"
          animate="animate"
          onAnimationComplete={
            i === wordArray.length - 1 ? onAnimationComplete : undefined
          }
          className="inline-block mr-3 last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

export default WordPullUp
