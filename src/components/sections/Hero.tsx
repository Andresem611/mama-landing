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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    // TODO: Integrate with Supabase waitlist API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSubmitted(true)
    setIsSubmitting(false)
    setEmail("")
  }

  return (
    <section
      className={cn(
        "min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 py-16 lg:py-24 gap-12 lg:gap-16",
        className
      )}
    >
      {/* Left side - Content */}
      <div className="flex-1 max-w-xl lg:max-w-lg xl:max-w-xl text-center lg:text-left">
        {/* Headline with WordPullUp animation */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl text-zinc-900 mb-6 leading-tight"
          style={{ fontFamily: "'Titan One', cursive" }}
        >
          <WordPullUp
            words="Stop asking"
            className="justify-center lg:justify-start"
          />
          <span className="relative inline-block mt-2">
            <WordPullUp
              words="your mom."
              className="text-rose-400 justify-center lg:justify-start"
              delayMultiple={0.15}
            />
            <UnderlineDraw delay={1.2} />
          </span>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-lg md:text-xl text-zinc-600 mb-8 max-w-md mx-auto lg:mx-0"
        >
          AI that makes the phone calls you hate. Dentist appointments,
          restaurant reservations, customer service.
        </motion.p>

        {/* Waitlist Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-rose-50 text-rose-600 px-6 py-4 rounded-2xl font-medium"
            >
              You are on the list! We will be in touch soon.
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12 px-5 rounded-full border-zinc-200 focus:border-rose-300 focus:ring-rose-300/50"
              />
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 px-8 rounded-full bg-rose-400 hover:bg-rose-300 text-white font-semibold shadow-lg shadow-rose-400/30 disabled:opacity-70"
                >
                  {isSubmitting ? "Joining..." : "Join the Waitlist"}
                </Button>
              </motion.div>
            </form>
          )}
        </motion.div>

        {/* Privacy note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-sm text-zinc-400 mt-4"
        >
          No spam. Just less phone anxiety.
        </motion.p>
      </div>

      {/* Right side - Mascot with Floating Messages */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex-1 max-w-md lg:max-w-lg xl:max-w-xl relative"
      >
        {/* Floating messages container */}
        <div className="relative w-full aspect-square max-w-sm mx-auto">
          <FloatingMessages className="absolute inset-0" />

          {/* Mascot placeholder in center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center"
            >
              {/* Mama emoji mascot placeholder - replace with actual mascot SVG */}
              <span
                className="text-7xl md:text-8xl select-none"
                role="img"
                aria-label="Mama mascot"
              >
                👩
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
