"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MamaMascot } from "@/components/MamaMascot"
import { cn } from "@/lib/utils"

interface FinalCTAProps {
  className?: string
}

export function FinalCTA({ className }: FinalCTAProps) {
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
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          Sign up and let Mama handle the phone calls you dread.
        </motion.p>

        {/* Sign Up Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/login">
            <motion.span
              className={cn(
                // Base retro pill shape
                "relative inline-flex items-center justify-center h-12 px-8 rounded-full",
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
                "outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2"
              )}
              style={{ fontFamily: "'Quicksand', sans-serif" }}
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
                Sign Up Free
              </span>
            </motion.span>
          </Link>
        </motion.div>

        {/* Privacy note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm text-zinc-500 mt-4"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          No spam. Just less phone anxiety.
        </motion.p>
      </div>
    </section>
  )
}

export default FinalCTA
