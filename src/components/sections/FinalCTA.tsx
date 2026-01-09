"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { MamaMascot } from "@/components/MamaMascot"
import { cn } from "@/lib/utils"

interface FinalCTAProps {
  className?: string
}

export function FinalCTA({ className }: FinalCTAProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok || response.status === 200) {
        setSubmitted(true)
        setEmail("")
      }
    } catch {
      // Silently fail - user can try again
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      className={cn(
        "py-16 md:py-24 px-6",
        "bg-gradient-to-b from-rose-50 to-rose-100/80",
        className
      )}
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* Mama Mascot (smaller version) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          className="mb-6 flex justify-center"
        >
          <MamaMascot
            width={120}
            height={168}
          />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl text-zinc-900 mb-4"
          style={{ fontFamily: "'Righteous', cursive" }}
        >
          Ready to stop calling?
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-zinc-600 text-lg mb-8 max-w-md mx-auto"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          Join the waitlist and let Mama handle the phone calls you dread.
        </motion.p>

        {/* Waitlist Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white text-rose-600 px-6 py-4 rounded-2xl font-medium shadow-sm border border-rose-100"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              You are on the list! We will be in touch soon.
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12 px-5 rounded-full border-rose-200 bg-white focus:border-rose-300 focus:ring-rose-300/50"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              />
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  // Base retro pill shape
                  "relative h-12 px-8 rounded-full",
                  "font-bold text-base",
                  // Retro thick border
                  "border-[3px] border-zinc-900",
                  // Background and text
                  "bg-gradient-to-b from-zinc-800 to-zinc-900 text-white",
                  // 3D shadow effect (arcade button style)
                  "shadow-[0_4px_0_0_#18181b,0_6px_12px_rgba(24,24,27,0.4)]",
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
                  boxShadow: "0 6px 0 0 #18181b, 0 8px 20px rgba(24,24,27,0.5)",
                }}
                whileTap={{
                  scale: 0.98,
                  y: 2,
                  boxShadow: "0 1px 0 0 #18181b, 0 2px 4px rgba(24,24,27,0.2)",
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
                  {isSubmitting ? "Joining..." : "Join MAMA"}
                </span>
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Privacy note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm text-zinc-500 mt-4"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          No spam. Just less phone anxiety.
        </motion.p>
      </div>
    </section>
  )
}

export default FinalCTA
