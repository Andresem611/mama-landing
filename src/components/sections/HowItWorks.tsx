"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HowItWorksProps {
  className?: string
}

const steps = [
  {
    number: "1",
    title: "Sign up",
    description: "Join the waitlist and get early access to Mama.",
    icon: "✍️",
  },
  {
    number: "2",
    title: "Text Mama",
    description:
      "Tell Mama what call to make through WhatsApp. She'll handle the rest.",
    icon: "💬",
  },
  {
    number: "3",
    title: "Relax",
    description:
      "Mama makes the call for you. No more phone anxiety or awkward hold music.",
    icon: "😌",
  },
]

export function HowItWorks({ className }: HowItWorksProps) {
  return (
    <section className={cn("py-16 md:py-24 px-6", className)}>
      <div className="max-w-5xl mx-auto">
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
            style={{ fontFamily: "'Titan One', cursive" }}
          >
            How it works
          </h2>
          <p className="text-zinc-600 text-lg max-w-lg mx-auto">
            Three simple steps to never make a dreaded phone call again.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center"
            >
              {/* Icon */}
              <div className="mb-4 flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="w-20 h-20 bg-rose-50 rounded-2xl flex items-center justify-center"
                >
                  <span className="text-4xl" role="img" aria-label={step.title}>
                    {step.icon}
                  </span>
                </motion.div>
              </div>

              {/* Step Number */}
              <div className="text-rose-400 font-bold text-sm mb-2 uppercase tracking-wider">
                Step {step.number}
              </div>

              {/* Title */}
              <h3
                className="text-xl md:text-2xl text-zinc-900 mb-2"
                style={{ fontFamily: "'Titan One', cursive" }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-600 max-w-xs mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-zinc-500 text-lg md:text-xl italic">
            Embarrassing? Sure.{" "}
            <span className="text-rose-400 font-medium not-italic">
              But better than calling your mom.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks
