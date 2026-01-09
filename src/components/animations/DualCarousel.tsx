"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface UseCase {
  title: string
  icon: string // Path to OpenMoji SVG
}

interface DualCarouselProps {
  className?: string
  useCases?: UseCase[]
  cycleDuration?: number
}

const defaultUseCases: UseCase[] = [
  { title: "Dentist appointments", icon: "/icons/openmoji/tooth.svg" },
  { title: "Restaurant reservations", icon: "/icons/openmoji/fork-knife-plate.svg" },
  { title: "Doctor's office", icon: "/icons/openmoji/hospital.svg" },
  { title: "Customer service", icon: "/icons/openmoji/telephone.svg" },
  { title: "Landlord calls", icon: "/icons/openmoji/house.svg" },
  { title: "Utilities", icon: "/icons/openmoji/lightning.svg" },
  { title: "Salon appointments", icon: "/icons/openmoji/scissors.svg" },
  { title: "Home repairs", icon: "/icons/openmoji/wrench.svg" },
  { title: "Pharmacy refills", icon: "/icons/openmoji/pill.svg" },
  { title: "Bank inquiries", icon: "/icons/openmoji/bank.svg" },
]

function UseCaseCard({ useCase }: { useCase: UseCase }) {
  return (
    <div
      className={cn(
        "relative flex items-center gap-4 px-6 py-4",
        "bg-gradient-to-br from-rose-50 via-rose-50 to-rose-100/80",
        "rounded-2xl border border-rose-200/60",
        "whitespace-nowrap shrink-0",
        "shadow-sm hover:shadow-md transition-shadow duration-300"
      )}
    >
      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* OpenMoji Icon */}
      <div className="relative w-8 h-8 flex-shrink-0">
        <Image
          src={useCase.icon}
          alt=""
          width={32}
          height={32}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Title */}
      <span
        className="relative text-zinc-700 font-semibold text-base"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        {useCase.title}
      </span>
    </div>
  )
}

export function DualCarousel({
  className,
  useCases = defaultUseCases,
  cycleDuration = 35,
}: DualCarouselProps) {
  const [isPaused, setIsPaused] = useState(false)

  // Split use cases for two rows
  const topRowCases = useCases.filter((_, i) => i % 2 === 0)
  const bottomRowCases = useCases.filter((_, i) => i % 2 === 1)

  // Duplicate for seamless loop
  const topRowItems = [...topRowCases, ...topRowCases, ...topRowCases]
  const bottomRowItems = [...bottomRowCases, ...bottomRowCases, ...bottomRowCases]

  return (
    <div
      className={cn("w-full overflow-hidden py-8", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top row - scrolls right */}
      <motion.div
        className="flex gap-5 mb-5"
        animate={{
          x: isPaused ? undefined : ["0%", "-33.33%"],
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
        className="flex gap-5"
        animate={{
          x: isPaused ? undefined : ["-33.33%", "0%"],
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
