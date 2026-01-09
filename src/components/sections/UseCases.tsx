"use client"

import { motion } from "framer-motion"
import { DualCarousel } from "@/components/animations"
import { cn } from "@/lib/utils"

interface UseCasesProps {
  className?: string
}

export function UseCases({ className }: UseCasesProps) {
  return (
    <section className={cn("py-16 md:py-24 bg-zinc-50", className)}>
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center px-6 mb-8 md:mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl text-zinc-900 mb-4"
          style={{ fontFamily: "'Titan One', cursive" }}
        >
          Calls Mama makes for you
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-zinc-600 text-lg max-w-lg mx-auto"
        >
          From dentist appointments to customer service nightmares, Mama handles
          the calls you dread.
        </motion.p>
      </div>

      {/* Dual Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <DualCarousel cycleDuration={25} />
      </motion.div>
    </section>
  )
}

export default UseCases
