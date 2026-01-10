'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface PersonalityToastProps {
  message: string | null
  duration?: number
  onDismiss?: () => void
}

export function PersonalityToast({
  message,
  duration = 4000,
  onDismiss,
}: PersonalityToastProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (message) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        onDismiss?.()
      }, duration)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [message, duration, onDismiss])

  return (
    <AnimatePresence>
      {isVisible && message && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 lg:bottom-8 lg:left-auto lg:right-8 lg:translate-x-0"
        >
          <div
            className="bg-white border border-zinc-200 rounded-2xl px-5 py-3 shadow-lg shadow-zinc-900/10 max-w-xs"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            <div className="flex items-start gap-3">
              {/* Mini MAMA avatar */}
              <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                <span
                  className="text-rose-500 text-xs font-bold"
                  style={{ fontFamily: "'Righteous', cursive" }}
                >
                  M
                </span>
              </div>
              <p className="text-zinc-700 text-sm leading-relaxed pt-1">
                {message}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Hook for managing personality comments
export function usePersonalityComment() {
  const [comment, setComment] = useState<string | null>(null)

  const showComment = (message: string | null, delay = 500) => {
    if (!message) return

    // Delay before showing to feel more natural
    setTimeout(() => {
      setComment(message)
    }, delay)
  }

  const clearComment = () => {
    setComment(null)
  }

  return {
    comment,
    showComment,
    clearComment,
  }
}
