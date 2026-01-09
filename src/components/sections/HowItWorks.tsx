"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HowItWorksProps {
  className?: string
}

// Custom inline SVG illustrations with hand-drawn line-art style
const SignUpIllustration = () => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    {/* Hand-drawn style signup form/button being tapped */}
    {/* Form/Card outline - slightly wobbly for hand-drawn feel */}
    <path
      d="M25 30c0.5-1 1.5-2 3-2h64c2 0 3.5 1.5 3.5 3.5v55c0 2-1.5 3.5-3.5 3.5H28c-2 0-3.5-1.5-3-3.5V30z"
      stroke="#18181B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Input field lines */}
    <path
      d="M35 45h50M35 55h50"
      stroke="#18181B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="2 3"
    />
    {/* Join button */}
    <rect
      x="40"
      y="68"
      width="40"
      height="14"
      rx="7"
      stroke="#18181B"
      strokeWidth="2"
      fill="none"
    />
    {/* "Join" text in button */}
    <path
      d="M50 77c0 0 0.5-3 2-3s2 4 2 4v-4M56 74v4c0 1 1 2 2 2s2-1 2-2v-4M63 74c-1 0-2 1-2 2v1c0 1 1 2 2 2h1c1 0 2-1 2-2v-1c0-1-1-2-2-2h-1z"
      stroke="#18181B"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
    />
    {/* Pointing finger/hand */}
    <path
      d="M85 58c2-8 8-12 12-10s4 8 2 14l-3 10c-1 4-5 7-9 7h-6c-4 0-7-3-7-7v-4c0-2 1.5-3.5 3.5-3.5h4c2 0 3.5 1.5 3.5 3.5v2"
      stroke="#18181B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Finger detail lines */}
    <path
      d="M89 55c1-4 4-6 6-5M91 62l4-1"
      stroke="#18181B"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Tap effect circles */}
    <circle cx="60" cy="75" r="18" stroke="#FB7185" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.6" fill="none" />
    <circle cx="60" cy="75" r="24" stroke="#FB7185" strokeWidth="1" strokeDasharray="2 5" opacity="0.3" fill="none" />
  </svg>
)

const TextMamaIllustration = () => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    {/* Phone outline - hand-drawn style */}
    <rect
      x="30"
      y="15"
      width="60"
      height="90"
      rx="10"
      stroke="#18181B"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    {/* Phone screen */}
    <rect
      x="35"
      y="25"
      width="50"
      height="65"
      rx="3"
      stroke="#18181B"
      strokeWidth="1.5"
      fill="none"
    />
    {/* Phone speaker */}
    <path
      d="M52 20h16"
      stroke="#18181B"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Home button indicator */}
    <circle cx="60" cy="100" r="4" stroke="#18181B" strokeWidth="1.5" fill="none" />

    {/* WhatsApp-style chat bubbles */}
    {/* Outgoing message (right aligned) */}
    <path
      d="M45 35h30c2 0 3 1 3 3v8c0 2-1 3-3 3H55l-5 5v-5h-5c-2 0-3-1-3-3v-8c0-2 1-3 3-3z"
      stroke="#18181B"
      strokeWidth="1.5"
      fill="none"
      strokeLinejoin="round"
    />
    {/* Message text lines */}
    <path
      d="M48 40h25M48 45h18"
      stroke="#18181B"
      strokeWidth="1"
      strokeLinecap="round"
      strokeDasharray="2 2"
    />

    {/* Incoming message (left aligned) - Mama's response */}
    <path
      d="M40 58h32c2 0 3 1 3 3v10c0 2-1 3-3 3H50l-6 6v-6h-4c-2 0-3-1-3-3v-10c0-2 1-3 3-3z"
      stroke="#18181B"
      strokeWidth="1.5"
      fill="none"
      strokeLinejoin="round"
    />
    {/* Mama's text lines */}
    <path
      d="M44 64h26M44 69h20M44 74h14"
      stroke="#18181B"
      strokeWidth="1"
      strokeLinecap="round"
      strokeDasharray="2 2"
    />

    {/* WhatsApp icon hint - phone in bubble */}
    <circle cx="80" cy="30" r="8" stroke="#25D366" strokeWidth="1.5" fill="none" />
    <path
      d="M77 28c0-1 1-2 2-2h2c1 0 2 1 2 2v4c0 1-1 2-2 2h-2c-1 0-2-1-2-2v-4z"
      stroke="#25D366"
      strokeWidth="1"
      fill="none"
    />

    {/* Decorative dots */}
    <circle cx="90" cy="50" r="2" fill="#FB7185" opacity="0.6" />
    <circle cx="95" cy="60" r="1.5" fill="#FB7185" opacity="0.4" />
    <circle cx="25" cy="55" r="2" fill="#FB7185" opacity="0.5" />
  </svg>
)

const RelaxIllustration = () => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    {/* Hammock - curved line */}
    <path
      d="M15 45c0 0 25 35 45 35s45-35 45-35"
      stroke="#18181B"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    {/* Hammock weave pattern */}
    <path
      d="M25 50c5 10 15 20 35 20s30-10 35-20M30 55c5 8 12 15 30 15s25-7 30-15M35 60c5 6 10 10 25 10s20-4 25-10"
      stroke="#18181B"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.5"
      fill="none"
    />

    {/* Left tree/pole */}
    <path
      d="M10 100V35c0-3 2-5 5-5M15 30l-5 8M15 30l5 8"
      stroke="#18181B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Right tree/pole */}
    <path
      d="M110 100V35c0-3-2-5-5-5M105 30l-5 8M105 30l5 8"
      stroke="#18181B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Person relaxing - simple line art */}
    {/* Head */}
    <circle cx="45" cy="55" r="7" stroke="#18181B" strokeWidth="2" fill="none" />
    {/* Peaceful closed eyes */}
    <path
      d="M42 54c1-1 2-1 3 0M46 54c1-1 2-1 3 0"
      stroke="#18181B"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Slight smile */}
    <path
      d="M43 58c1 1 3 1 4 0"
      stroke="#18181B"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Body reclined */}
    <path
      d="M52 58c5 3 8 8 10 12M62 70c8-2 15-3 20-2"
      stroke="#18181B"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    {/* Arms behind head */}
    <path
      d="M52 55c-3-5-8-8-10-6s0 6 3 8"
      stroke="#18181B"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    {/* Leg bent */}
    <path
      d="M82 68c3 3 5 8 4 12"
      stroke="#18181B"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Drink with straw */}
    <path
      d="M90 62v10c0 2-2 4-4 4h-4c-2 0-4-2-4-4v-10h12z"
      stroke="#18181B"
      strokeWidth="1.5"
      fill="none"
      strokeLinejoin="round"
    />
    <path
      d="M84 62v-8l4-4"
      stroke="#18181B"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Umbrella in drink */}
    <path
      d="M86 55c-4 0-6 3-6 3h12s-2-3-6-3z"
      stroke="#FB7185"
      strokeWidth="1"
      fill="#FB7185"
      opacity="0.3"
    />

    {/* Decorative elements - Z's for sleeping/relaxing */}
    <text x="30" y="42" fill="#FB7185" fontSize="10" fontFamily="serif" opacity="0.7">z</text>
    <text x="24" y="35" fill="#FB7185" fontSize="8" fontFamily="serif" opacity="0.5">z</text>
    <text x="20" y="30" fill="#FB7185" fontSize="6" fontFamily="serif" opacity="0.3">z</text>

    {/* Sun rays */}
    <circle cx="100" cy="20" r="6" stroke="#18181B" strokeWidth="1.5" fill="none" />
    <path
      d="M100 10v4M100 26v4M110 20h-4M94 20h-4M107 13l-3 3M96 24l-3 3M107 27l-3-3M96 16l-3-3"
      stroke="#18181B"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
)

const steps = [
  {
    number: "1",
    title: "Sign up",
    description: "Join the waitlist and get early access to Mama.",
    Illustration: SignUpIllustration,
  },
  {
    number: "2",
    title: "Text Mama",
    description: "Tell Mama what call to make through WhatsApp. She'll handle the rest.",
    Illustration: TextMamaIllustration,
  },
  {
    number: "3",
    title: "Relax",
    description: "Mama makes the call for you. No more phone anxiety or awkward hold music.",
    Illustration: RelaxIllustration,
  },
]

export function HowItWorks({ className }: HowItWorksProps) {
  return (
    <section className={cn("py-16 md:py-24 px-6 bg-zinc-50/50", className)}>
      <div className="max-w-6xl mx-auto">
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
                  <div className="aspect-square w-full max-w-[180px] mx-auto bg-gradient-to-br from-rose-50 to-zinc-50 rounded-2xl p-4 border border-zinc-100">
                    <step.Illustration />
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
