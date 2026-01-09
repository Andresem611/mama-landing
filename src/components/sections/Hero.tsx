"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  WordPullUp,
  UnderlineDraw,
  FloatingMessages,
} from "@/components/animations"
import { cn } from "@/lib/utils"

interface HeroProps {
  className?: string
}

export function Hero({ className }: HeroProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [showUnderline, setShowUnderline] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok && response.status !== 200) {
        throw new Error(data.error || "Something went wrong")
      }

      setSubmitted(true)
      setEmail("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Animation timing constants
  // First line "Stop asking" = 2 words * 0.15s delay each = 0.3s total stagger
  // Plus 0.5s duration for animation = first line done at ~0.65s
  // Add small buffer, start second line at 0.5s (overlapping slightly for flow)
  const firstLineWords = 2
  const secondLineStartDelay = firstLineWords * 0.15 + 0.2 // 0.5s

  return (
    <section
      className={cn(
        "relative min-h-screen w-full overflow-hidden",
        className
      )}
    >
      {/* Full-viewport rose gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #FB7185 0%, #F43F5E 50%, #E11D48 100%)",
        }}
      />

      {/* Subtle texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating Messages - handled by another agent */}
      <FloatingMessages className="absolute inset-0 z-10" />

      {/* Main content container */}
      <div className="relative z-20 min-h-screen flex flex-col justify-end px-6 sm:px-8 lg:px-12 xl:px-16 pb-12 sm:pb-16 lg:pb-20">

        {/* Bottom section with headline left, CTA right */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16">

          {/* Left side - Headline */}
          <div className="flex-shrink-0">
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl text-white leading-[0.95] tracking-tight"
              style={{ fontFamily: "'Titan One', cursive" }}
            >
              <WordPullUp
                words="Stop asking"
                className="justify-start"
              />
              <span className="relative inline-block mt-1 sm:mt-2">
                <WordPullUp
                  words="your mom."
                  className="justify-start"
                  delayMultiple={0.15}
                  startDelay={secondLineStartDelay}
                  onAnimationComplete={() => setShowUnderline(true)}
                />
                {/* Hand-drawn underline - triggers after WordPullUp completes */}
                {showUnderline && (
                  <UnderlineDraw
                    delay={0}
                    color="white"
                    strokeWidth={4}
                    className="absolute -bottom-1 sm:-bottom-2 left-0 w-full"
                  />
                )}
              </span>
            </h1>
          </div>

          {/* Right side - CTA + Description */}
          <div className="flex-shrink-0 max-w-md lg:max-w-sm xl:max-w-md lg:text-right">
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="text-lg sm:text-xl text-white/90 mb-6 leading-relaxed"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              AI that makes the phone calls you hate. Dentist appointments, restaurant reservations, customer service.
            </motion.p>

            {/* Waitlist Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/20 backdrop-blur-sm text-white px-6 py-4 rounded-2xl font-medium border border-white/30"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  You are on the list! We will be in touch soon.
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 h-12 sm:h-14 px-5 rounded-full bg-white/95 border-0 text-zinc-900 placeholder:text-zinc-400 focus:ring-2 focus:ring-white/50 focus:bg-white shadow-lg"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  />
                  <motion.div
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97, y: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-12 sm:h-14 px-8 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-base shadow-xl shadow-zinc-900/30 disabled:opacity-70 transition-colors"
                      style={{ fontFamily: "'Quicksand', sans-serif" }}
                    >
                      {isSubmitting ? "Joining..." : "Join MAMA"}
                    </Button>
                  </motion.div>
                </form>
              )}

              {/* Error message */}
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-white/80 text-sm mt-3"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  {error}
                </motion.p>
              )}
            </motion.div>

            {/* Privacy note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="text-sm text-white/70 mt-4"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              No spam. Just less phone anxiety.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2"
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-white/60"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
