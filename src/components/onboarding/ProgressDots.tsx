'use client'

import { motion } from 'framer-motion'

interface ProgressDotsProps {
  total: number
  current: number
}

export function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {[...Array(total)].map((_, i) => {
        const isCompleted = i < current
        const isCurrent = i === current

        return (
          <motion.div
            key={i}
            className={`rounded-full ${
              isCompleted || isCurrent
                ? 'bg-rose-400'
                : 'bg-zinc-200'
            }`}
            initial={false}
            animate={{
              scale: isCurrent ? 1.3 : 1,
              width: isCurrent ? 10 : 8,
              height: isCurrent ? 10 : 8,
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 17
            }}
          />
        )
      })}
    </div>
  )
}
