"use client"

import { cn } from "@/lib/utils"

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={cn(
        "py-8 md:py-12 px-6 border-t border-zinc-100",
        className
      )}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div
          className="text-2xl md:text-3xl text-rose-400"
          style={{ fontFamily: "'Righteous', cursive" }}
        >
          Mama
        </div>

        {/* Copyright */}
        <p className="text-sm text-zinc-400 text-center md:text-right">
          {currentYear} Mama. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
