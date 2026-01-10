"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "border-b border-rose-200/30",
        className
      )}
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="text-2xl md:text-3xl text-rose-400 tracking-wide"
            style={{ fontFamily: "'Righteous', cursive" }}
          >
            MAMA
          </Link>
        </motion.div>

        {/* Sign Up Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link href="/login">
            <motion.span
              className={cn(
                // Base retro pill shape
                "relative inline-flex items-center px-6 py-2.5 rounded-full",
                "font-semibold text-sm md:text-base",
                // Retro thick border
                "border-[3px] border-rose-400",
                // Background and text - solid white, no gradient
                "bg-white text-rose-500",
                // 3D shadow effect (arcade button style)
                "shadow-[0_4px_0_0_#e11d48,0_6px_12px_rgba(225,29,72,0.3)]",
                // Smooth transitions
                "transition-all duration-150 ease-out",
                // Focus styles
                "outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2"
              )}
              whileHover={{
                scale: 1.05,
                y: -2,
                boxShadow: "0 6px 0 0 #e11d48, 0 8px 20px rgba(225,29,72,0.4)",
              }}
              whileTap={{
                scale: 0.98,
                y: 2,
                boxShadow: "0 1px 0 0 #e11d48, 0 2px 4px rgba(225,29,72,0.2)",
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 20,
              }}
            >
              <span className="relative z-10" style={{ fontFamily: "'Righteous', cursive" }}>
                Sign Up
              </span>
            </motion.span>
          </Link>
        </motion.div>
      </nav>
    </header>
  )
}

export default Header
