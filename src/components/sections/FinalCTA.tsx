"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

    // TODO: Integrate with Supabase waitlist API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSubmitted(true)
    setIsSubmitting(false)
    setEmail("")
  }

  return (
    <section className={cn("py-16 md:py-24 px-6 bg-rose-50", className)}>
      <div className="max-w-2xl mx-auto text-center">
        {/* Mini Mascot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          className="mb-6"
        >
          <motion.span
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-6xl md:text-7xl inline-block select-none"
            role="img"
            aria-label="Mama mascot"
          >
            👩
          </motion.span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl text-zinc-900 mb-4"
          style={{ fontFamily: "'Titan One', cursive" }}
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
              className="bg-white text-rose-600 px-6 py-4 rounded-2xl font-medium shadow-sm"
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
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm text-zinc-500 mt-4"
        >
          No spam. Just less phone anxiety.
        </motion.p>
      </div>
    </section>
  )
}

export default FinalCTA
