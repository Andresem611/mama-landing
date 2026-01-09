"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import {
  WordPullUp,
  UnderlineDraw,
  FloatingMessages,
} from "@/components/animations"
import { MamaMascot } from "@/components/MamaMascot"
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
      {/* Full-viewport warm cream background */}
      <div
        className="absolute inset-0"
        style={{
          background: "#FEFAF6",
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

      {/* Mama Mascot - prominently centered in hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none pt-16"
      >
        <MamaMascot
          width={320}
          height={448}
          className="drop-shadow-2xl sm:scale-100 md:scale-110 lg:scale-125 xl:scale-150"
        />
      </motion.div>

      {/* Main content container */}
      <div className="relative z-20 min-h-screen flex flex-col justify-end px-6 sm:px-8 lg:px-12 xl:px-16 pb-12 sm:pb-16 lg:pb-20">

        {/* Bottom section with headline left, CTA right */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16">

          {/* Left side - Headline */}
          <div className="flex-shrink-0">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl text-zinc-900 leading-[0.95] tracking-tight"
              style={{ fontFamily: "'Righteous', cursive" }}
            >
              <WordPullUp
                words="Stop asking"
                className="justify-start"
              />
              <span className="relative inline-block mt-1 sm:mt-2 pb-3 sm:pb-4">
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
                    color="#FB7185"
                    strokeWidth={5}
                    className="absolute bottom-0 left-0 w-full"
                  />
                )}
              </span>
              {/* Second line - Call to action */}
              <span className="block mt-2 sm:mt-3 text-rose-400">
                <WordPullUp
                  words="Start calling MAMA."
                  className="justify-start"
                  delayMultiple={0.15}
                  startDelay={secondLineStartDelay + 0.6}
                />
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
              className="text-lg sm:text-xl text-zinc-600 mb-6 leading-relaxed"
              style={{ fontFamily: "'Nunito', sans-serif" }}
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
                  className="bg-rose-100 text-rose-700 px-6 py-4 rounded-2xl font-medium border border-rose-200"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
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
                    className="flex-1 h-12 sm:h-14 px-5 rounded-full bg-white border-2 border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:ring-2 focus:ring-rose-200 focus:border-rose-300 shadow-md"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  />
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      // Base retro pill shape
                      "relative h-12 sm:h-14 px-8 rounded-full",
                      "font-bold text-base",
                      // Retro thick border
                      "border-[3px] border-rose-500",
                      // Background and text
                      "bg-gradient-to-b from-rose-400 to-rose-500 text-white",
                      // 3D shadow effect (arcade button style)
                      "shadow-[0_4px_0_0_#be123c,0_6px_12px_rgba(225,29,72,0.4)]",
                      // Smooth transitions
                      "transition-all duration-150 ease-out",
                      // Focus styles
                      "outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2",
                      // Disabled state
                      "disabled:opacity-70"
                    )}
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      boxShadow: "0 6px 0 0 #be123c, 0 8px 20px rgba(225,29,72,0.5)",
                    }}
                    whileTap={{
                      scale: 0.98,
                      y: 2,
                      boxShadow: "0 1px 0 0 #be123c, 0 2px 4px rgba(225,29,72,0.2)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 20,
                    }}
                  >
                    {/* Subtle inner glow/highlight for retro effect */}
                    <span className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/10 pointer-events-none" />
                    <span className="relative z-10">
                      {isSubmitting ? "Joining..." : <>Join <span style={{ fontFamily: "'Righteous', cursive" }}>MAMA</span></>}
                    </span>
                  </motion.button>
                </form>
              )}

              {/* Error message */}
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-rose-600 text-sm mt-3"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
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
              className="text-sm text-zinc-500 mt-4"
              style={{ fontFamily: "'Nunito', sans-serif" }}
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
          className="w-6 h-10 rounded-full border-2 border-zinc-300 flex items-start justify-center p-2"
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-rose-400"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
