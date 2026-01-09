"use client"

import { motion, Variants } from "framer-motion"
import { cn } from "@/lib/utils"

interface WordPullUpProps {
  words: string
  className?: string
  delayMultiple?: number
}

const pullUpVariants: Variants = {
  initial: {
    y: 20,
    opacity: 0,
  },
  animate: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.15,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  }),
}

export function WordPullUp({
  words,
  className,
  delayMultiple = 0.15,
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
        delay: i * delayMultiple,
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
          className="inline-block mr-3 last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

export default WordPullUp
