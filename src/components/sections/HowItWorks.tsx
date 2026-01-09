"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface HowItWorksProps {
  className?: string
}

const steps = [
  {
    number: "1",
    title: "Sign up",
    description: "Join the waitlist and get early access to Mama.",
    image: "/how-it-works/step-1-signup.png",
  },
  {
    number: "2",
    title: "Text Mama",
    description: "Tell Mama what call to make through WhatsApp. She'll handle the rest.",
    image: "/how-it-works/step-2-text.png",
  },
  {
    number: "3",
    title: "Relax",
    description: "Mama makes the call for you. No more phone anxiety or awkward hold music.",
    image: "/how-it-works/step-3-relax.png",
  },
]

export function HowItWorks({ className }: HowItWorksProps) {
  return (
    <section className={cn("relative pt-16 pb-16 md:pt-24 md:pb-24 px-6", className)}>
      {/* Gradient fade from rose to zinc-50 */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(to bottom, #FB7185 0%, #FAFAFA 60px, #FAFAFA 100%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl text-zinc-900 mb-4"
            style={{ fontFamily: "'Righteous', cursive" }}
          >
            How it works
          </h2>
          <p
            className="text-zinc-600 text-lg max-w-lg mx-auto"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Three simple steps to never make a dreaded phone call again.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 md:mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <motion.div
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px -12px rgba(251, 113, 133, 0.15), 0 8px 16px -8px rgba(0, 0, 0, 0.1)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white rounded-3xl border border-zinc-200/80 p-6 lg:p-8 h-full cursor-default shadow-sm hover:border-rose-200/60 transition-colors duration-300"
              >
                {/* Illustration Container */}
                <div className="relative mb-6">
                  <div className="aspect-square w-full max-w-[180px] mx-auto bg-white rounded-2xl p-3 border border-zinc-100 overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={180}
                      height={180}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Step Badge */}
                <div className="flex justify-center mb-4">
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full bg-rose-100 text-rose-500 text-xs font-bold uppercase tracking-wider"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  >
                    Step {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-xl lg:text-2xl text-zinc-900 mb-3 text-center"
                  style={{ fontFamily: "'Righteous', cursive" }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="text-zinc-600 text-center text-sm lg:text-base leading-relaxed"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p
            className="text-zinc-500 text-lg md:text-xl italic"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Embarrassing? Sure.{" "}
            <span className="text-rose-400 font-semibold not-italic">
              But better than calling your mom.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks
