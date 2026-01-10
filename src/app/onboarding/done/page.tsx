'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useOnboarding } from '@/context/OnboardingContext'

const buttonSpring = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 20
}

// Secondary CTA button styles (dark, for share action)
const secondaryCtaClasses = `
  relative h-14 px-8 rounded-full
  font-bold text-base
  border-[3px] border-zinc-700
  bg-gradient-to-b from-zinc-800 to-zinc-900 text-white
  shadow-[0_4px_0_0_#18181B,0_6px_12px_rgba(0,0,0,0.3)]
  transition-all duration-150 ease-out
`

export default function DonePage() {
  const { state } = useOnboarding()

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Mama - Never Make Awkward Calls Again',
        text: 'I just signed up for Mama! It makes phone calls so I don\'t have to.',
        url: 'https://getmama.ai',
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 text-center"
    >
      {/* Celebration Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
          delay: 0.2
        }}
        className="flex justify-center"
      >
        <Image
          src="/icons/openmoji/party-popper.svg"
          alt="Celebration"
          width={80}
          height={80}
        />
      </motion.div>

      {/* Header */}
      <div className="space-y-2">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl text-zinc-900"
          style={{ fontFamily: "'Righteous', cursive" }}
        >
          Consider it handled
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-zinc-600"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          Relax. I&apos;ve got this from here.
        </motion.p>
      </div>

      {/* Phone Confirmation Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-rose-50 rounded-2xl p-6 space-y-3"
      >
        <p
          className="text-zinc-700"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          <span style={{ fontFamily: "'Righteous', cursive" }}>MAMA</span> will text you at
        </p>
        <p
          className="text-2xl font-bold text-rose-500"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          {state.preferences.phone || '(555) 555-5555'}
        </p>
        <p
          className="text-zinc-500 text-sm"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          when you&apos;re off the waitlist
        </p>
      </motion.div>

      {/* Share Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <p
          className="text-zinc-600"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          Want to move up the list?
        </p>
        <motion.button
          whileHover={{
            scale: 1.05,
            y: -2,
            boxShadow: "0 6px 0 0 #18181B, 0 8px 20px rgba(0,0,0,0.4)",
          }}
          whileTap={{
            scale: 0.98,
            y: 2,
            boxShadow: "0 1px 0 0 #18181B, 0 2px 4px rgba(0,0,0,0.2)",
          }}
          transition={buttonSpring}
          onClick={handleShare}
          className={`w-full ${secondaryCtaClasses}`}
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/5 pointer-events-none" />
          <span className="relative z-10">Tell your friends</span>
        </motion.button>
      </motion.div>

      {/* Back to Home Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Link
          href="/"
          className="inline-block text-rose-400 hover:text-rose-500 transition-colors"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          ← Back to home
        </Link>
      </motion.div>
    </motion.div>
  )
}
