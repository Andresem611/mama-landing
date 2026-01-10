'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useOnboarding } from '@/context/OnboardingContext'

const buttonSpring = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 17
}

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
      {/* Celebration Emoji */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
          delay: 0.2
        }}
        className="text-7xl"
      >
        🎉
      </motion.div>

      {/* Header */}
      <div className="space-y-2">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-titan text-3xl md:text-4xl text-zinc-900"
        >
          Consider it handled
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-quicksand text-zinc-600"
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
        <p className="font-quicksand text-zinc-700">
          We&apos;ll text you at
        </p>
        <p className="font-quicksand text-2xl font-bold text-rose-500">
          {state.preferences.phone || '(555) 555-5555'}
        </p>
        <p className="font-quicksand text-zinc-500 text-sm">
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
        <p className="font-quicksand text-zinc-600">
          Want to move up the list?
        </p>
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={buttonSpring}
          onClick={handleShare}
          className="w-full bg-zinc-900 text-white rounded-full py-4 font-quicksand font-semibold transition-colors hover:bg-zinc-800"
        >
          Tell your friends
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
          className="inline-block font-quicksand text-rose-400 hover:text-rose-500 transition-colors"
        >
          ← Back to home
        </Link>
      </motion.div>
    </motion.div>
  )
}
