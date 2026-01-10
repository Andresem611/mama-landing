'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useOnboarding } from '@/context/OnboardingContext'
import { ProgressDots } from '@/components/onboarding/ProgressDots'
import { FLEXIBILITY_OPTIONS, AGENCY_OPTIONS } from '@/types/onboarding'
import { createClient } from '@/lib/supabase/client'

const buttonSpring = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 17
}

export default function StylePage() {
  const router = useRouter()
  const { state, updatePreferences } = useOnboarding()
  const [loading, setLoading] = useState(false)

  const handleContinue = async () => {
    setLoading(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      await supabase
        .from('user_preferences')
        .update({
          persistence: state.preferences.persistence,
          flexibility: state.preferences.flexibility,
          agency: state.preferences.agency,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
    }

    router.push('/onboarding/phone')
  }

  const persistenceLabels = ['Chill', '', '', '', 'Relentless']

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
          What&apos;s my vibe?
        </h1>
        <p className="font-quicksand text-zinc-600">
          Tune me up.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Persistence Slider */}
        <div className="space-y-3">
          <label className="font-quicksand font-semibold text-zinc-900">
            How persistent should I be?
          </label>
          <div className="space-y-2">
            <div className="relative pt-1">
              <input
                type="range"
                min="1"
                max="5"
                value={state.preferences.persistence ?? 3}
                onChange={(e) => updatePreferences({ persistence: parseInt(e.target.value) })}
                className="w-full h-2 bg-rose-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-rose-400 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-rose-400 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
              />
            </div>
            <div className="flex justify-between text-sm font-quicksand text-zinc-400">
              <span>{persistenceLabels[0]}</span>
              <span className="text-rose-500 font-semibold">{state.preferences.persistence ?? 3}/5</span>
              <span>{persistenceLabels[4]}</span>
            </div>
          </div>
        </div>

        {/* Flexibility */}
        <div className="space-y-3">
          <label className="font-quicksand font-semibold text-zinc-900">
            Okay with alternatives?
          </label>
          <div className="space-y-2">
            {FLEXIBILITY_OPTIONS.map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={buttonSpring}
                onClick={() => updatePreferences({ flexibility: option.id })}
                className={`w-full py-3 px-4 rounded-2xl font-quicksand text-left transition-colors ${
                  state.preferences.flexibility === option.id
                    ? 'bg-rose-400 text-white'
                    : 'bg-rose-50 text-zinc-600 hover:bg-rose-100'
                }`}
              >
                <span className="font-semibold">{option.label}</span>
                <span className={`text-sm ml-2 ${
                  state.preferences.flexibility === option.id
                    ? 'text-white/80'
                    : 'text-zinc-400'
                }`}>
                  — {option.description}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Agency */}
        <div className="space-y-3">
          <label className="font-quicksand font-semibold text-zinc-900">
            How much can Mama decide?
          </label>
          <div className="space-y-2">
            {AGENCY_OPTIONS.map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={buttonSpring}
                onClick={() => updatePreferences({ agency: option.id })}
                className={`w-full py-3 px-4 rounded-2xl font-quicksand text-left transition-colors ${
                  state.preferences.agency === option.id
                    ? 'bg-rose-400 text-white'
                    : 'bg-rose-50 text-zinc-600 hover:bg-rose-100'
                }`}
              >
                <span className="font-semibold">{option.label}</span>
                <span className={`text-sm ml-2 ${
                  state.preferences.agency === option.id
                    ? 'text-white/80'
                    : 'text-zinc-400'
                }`}>
                  — {option.description}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={buttonSpring}
        onClick={handleContinue}
        disabled={loading}
        className="w-full bg-rose-400 text-white rounded-full py-4 font-quicksand font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-rose-300"
      >
        {loading ? 'Saving...' : 'Continue'}
      </motion.button>

      {/* Progress Dots */}
      <ProgressDots total={4} current={2} />
    </motion.div>
  )
}
