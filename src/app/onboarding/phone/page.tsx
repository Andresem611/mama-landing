'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useOnboarding } from '@/context/OnboardingContext'
import { ProgressDots } from '@/components/onboarding/ProgressDots'
import { createClient } from '@/lib/supabase/client'

const buttonSpring = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 17
}

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
        <h1 className="font-titan text-3xl md:text-4xl text-zinc-900">
          Where should I reach you?
        </h1>
        <p className="font-quicksand text-zinc-600">
          I&apos;ll text you when I&apos;m ready to start making calls.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        <div className="space-y-3">
          <label className="font-quicksand font-semibold text-zinc-900">
            Phone number
          </label>
          <input
            type="tel"
            placeholder="(555) 555-5555"
            value={state.preferences.phone ?? ''}
            onChange={handlePhoneChange}
            maxLength={14}
            className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-4 font-quicksand text-xl text-zinc-900 text-center placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-400 transition-all tracking-wider"
          />
          <p className="text-sm text-zinc-400 font-quicksand text-center">
            We&apos;ll only text you about Mama. No spam, promise.
          </p>
        </div>
      </div>

      {/* Complete Setup Button */}
      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={buttonSpring}
        onClick={handleComplete}
        disabled={!isValid || loading}
        className="w-full bg-rose-400 text-white rounded-full py-4 font-quicksand font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-rose-300"
      >
        {loading ? 'Completing setup...' : 'Complete Setup'}
      </motion.button>

      {/* Progress Dots */}
      <ProgressDots total={4} current={3} />
    </motion.div>
  )
}
