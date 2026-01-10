'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useOnboarding } from '@/context/OnboardingContext'
import { ProgressDots } from '@/components/onboarding/ProgressDots'
import { createClient } from '@/lib/supabase/client'

const buttonSpring = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 20
}

// Primary CTA button styles (arcade style matching landing page)
const primaryCtaClasses = `
  relative h-14 px-8 rounded-full
  font-bold text-base
  border-[3px] border-rose-500
  bg-gradient-to-b from-rose-400 to-rose-500 text-white
  shadow-[0_4px_0_0_#be123c,0_6px_12px_rgba(225,29,72,0.4)]
  transition-all duration-150 ease-out
  disabled:opacity-50 disabled:cursor-not-allowed
`

export default function PhonePage() {
  const router = useRouter()
  const { state, updatePreferences } = useOnboarding()
  const [loading, setLoading] = useState(false)

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '')

    // Format as (XXX) XXX-XXXX
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/)
    if (match) {
      const parts = [match[1], match[2], match[3]].filter(Boolean)
      if (parts.length === 0) return ''
      if (parts.length === 1) return `(${parts[0]}`
      if (parts.length === 2) return `(${parts[0]}) ${parts[1]}`
      return `(${parts[0]}) ${parts[1]}-${parts[2]}`
    }
    return value
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    updatePreferences({ phone: formatted })
  }

  const handleComplete = async () => {
    setLoading(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      await supabase
        .from('user_preferences')
        .update({
          phone: state.preferences.phone,
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
    }

    router.push('/onboarding/done')
  }

  const phoneDigits = (state.preferences.phone ?? '').replace(/\D/g, '')
  const isValid = phoneDigits.length === 10

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <h1
          className="text-3xl md:text-4xl text-zinc-900"
          style={{ fontFamily: "'Righteous', cursive" }}
        >
          Where should I reach you?
        </h1>
        <p
          className="text-zinc-600"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          I&apos;ll text you when I&apos;m ready to start making calls.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        <div className="space-y-3">
          <label
            className="font-semibold text-zinc-900"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Phone number
          </label>
          <input
            type="tel"
            placeholder="(555) 555-5555"
            value={state.preferences.phone ?? ''}
            onChange={handlePhoneChange}
            maxLength={14}
            className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-4 text-xl text-zinc-900 text-center placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-400 transition-all tracking-wider"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          />
          <p
            className="text-sm text-zinc-400 text-center"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            We&apos;ll only text you about Mama. No spam, promise.
          </p>
        </div>
      </div>

      {/* Complete Setup Button - Arcade Style */}
      <motion.button
        whileHover={{
          scale: 1.05,
          y: -2,
          boxShadow: "0 6px 0 0 #be123c, 0 8px 20px rgba(225,29,72,0.5)",
        }}
        whileTap={{
          scale: 0.98,
          y: 2,
          boxShadow: "0 1px 0 0 #be123c, 0 2px 4px rgba(225,29,72,0.2)",
        }}
        transition={buttonSpring}
        onClick={handleComplete}
        disabled={!isValid || loading}
        className={`w-full ${primaryCtaClasses}`}
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/10 pointer-events-none" />
        <span className="relative z-10">
          {loading ? 'Completing setup...' : 'Complete Setup'}
        </span>
      </motion.button>

      {/* Progress Dots */}
      <ProgressDots total={4} current={3} />
    </motion.div>
  )
}
