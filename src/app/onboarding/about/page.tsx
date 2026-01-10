'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useOnboarding } from '@/context/OnboardingContext'
import { ProgressDots } from '@/components/onboarding/ProgressDots'
import { createClient } from '@/lib/supabase/client'

const AGE_OPTIONS = ['18-24', '25-30', '31-40', '40+'] as const

const buttonSpring = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 17
}

export default function AboutPage() {
  const router = useRouter()
  const { state, updateProfile } = useOnboarding()
  const [loading, setLoading] = useState(false)

  const handleContinue = async () => {
    setLoading(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      await supabase
        .from('profiles')
        .update({
          age_range: state.profile.age_range,
          location: state.profile.location,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
    }

    router.push('/onboarding/calls')
  }

  const isValid = state.profile.age_range && state.profile.location

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
          A little about you
        </h1>
        <p className="font-quicksand text-zinc-600">
          Just the basics. I&apos;m not nosy... okay maybe a little.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Age Range - Pill Buttons */}
        <div className="space-y-3">
          <label className="font-quicksand font-semibold text-zinc-900">
            Age range
          </label>
          <div className="grid grid-cols-2 gap-3">
            {AGE_OPTIONS.map((age) => (
              <motion.button
                key={age}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={buttonSpring}
                onClick={() => updateProfile({ age_range: age })}
                className={`py-3 px-4 rounded-2xl font-quicksand font-medium transition-colors ${
                  state.profile.age_range === age
                    ? 'bg-rose-400 text-white'
                    : 'bg-rose-50 text-zinc-600 hover:bg-rose-100 border-2 border-transparent'
                }`}
              >
                {age}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Location Input */}
        <div className="space-y-3">
          <label className="font-quicksand font-semibold text-zinc-900">
            Where are you based?
          </label>
          <input
            type="text"
            placeholder="City or zip code"
            value={state.profile.location ?? ''}
            onChange={(e) => updateProfile({ location: e.target.value })}
            className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 font-quicksand text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-400 transition-all"
          />
        </div>
      </div>

      {/* Continue Button */}
      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={buttonSpring}
        onClick={handleContinue}
        disabled={!isValid || loading}
        className="w-full bg-rose-400 text-white rounded-full py-4 font-quicksand font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-rose-300"
      >
        {loading ? 'Saving...' : 'Continue'}
      </motion.button>

      {/* Progress Dots */}
      <ProgressDots total={4} current={0} />
    </motion.div>
  )
}
