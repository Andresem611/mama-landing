"use client"

import { motion } from "framer-motion"
import { DualCarousel } from "@/components/animations"
import { cn } from "@/lib/utils"

interface UseCasesProps {
  className?: string
}

export function UseCases({ className }: UseCasesProps) {
  return (
    <section className={cn("relative pt-16 pb-16 md:pt-24 md:pb-24", className)}>
      {/* Gradient fade from cream to rose */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(to bottom, #FEFAF6 0%, #FB7185 60px, #FB7185 100%)",
        }}
      />

      {/* Section Header */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 mb-8 md:mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl text-white mb-4"
          style={{ fontFamily: "'Righteous', cursive" }}
        >
          Calls Mama makes for you
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/90 text-lg max-w-lg mx-auto"
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
        className="relative z-10"
      >
        <DualCarousel cycleDuration={25} />
      </motion.div>
    </section>
  )
}

export default UseCases
