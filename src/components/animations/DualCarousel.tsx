"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface UseCase {
  title: string
  icon?: string
}

interface DualCarouselProps {
  className?: string
  useCases?: UseCase[]
  cycleDuration?: number
}

const defaultUseCases: UseCase[] = [
  { title: "Dentist appointments", icon: "🦷" },
  { title: "Restaurant reservations", icon: "🍽️" },
  { title: "Doctor's office", icon: "🏥" },
  { title: "Customer service", icon: "📞" },
  { title: "Landlord calls", icon: "🏠" },
  { title: "Utilities", icon: "💡" },
  { title: "Insurance claims", icon: "📋" },
  { title: "Bank inquiries", icon: "🏦" },
  { title: "Pharmacy refills", icon: "💊" },
  { title: "Appointment changes", icon: "📅" },
]

function UseCaseCard({ useCase }: { useCase: UseCase }) {
  return (
    <div className="flex items-center gap-3 px-6 py-3 bg-rose-50 rounded-full border border-rose-100 whitespace-nowrap shrink-0">
      {useCase.icon && <span className="text-lg">{useCase.icon}</span>}
      <span className="text-zinc-700 font-medium font-quicksand">
        {useCase.title}
      </span>
    </div>
  )
}

export function DualCarousel({
  className,
  useCases = defaultUseCases,
  cycleDuration = 30,
}: DualCarouselProps) {
  const [isPaused, setIsPaused] = useState(false)

  // Split use cases for two rows
  const topRowCases = useCases.filter((_, i) => i % 2 === 0)
  const bottomRowCases = useCases.filter((_, i) => i % 2 === 1)

  // Duplicate for seamless loop
  const topRowItems = [...topRowCases, ...topRowCases]
  const bottomRowItems = [...bottomRowCases, ...bottomRowCases]

  return (
    <div
      className={cn("w-full overflow-hidden py-8", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top row - scrolls right */}
      <motion.div
        className="flex gap-4 mb-4"
        animate={{
          x: isPaused ? undefined : ["0%", "-50%"],
        }}
        transition={{
          x: {
            duration: cycleDuration,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        style={{ width: "fit-content" }}
      >
        {topRowItems.map((useCase, index) => (
          <UseCaseCard key={`top-${index}`} useCase={useCase} />
        ))}
      </motion.div>

      {/* Bottom row - scrolls left */}
      <motion.div
        className="flex gap-4"
        animate={{
          x: isPaused ? undefined : ["-50%", "0%"],
        }}
        transition={{
          x: {
            duration: cycleDuration,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        style={{ width: "fit-content" }}
      >
        {bottomRowItems.map((useCase, index) => (
          <UseCaseCard key={`bottom-${index}`} useCase={useCase} />
        ))}
      </motion.div>
    </div>
  )
}

export default DualCarousel
