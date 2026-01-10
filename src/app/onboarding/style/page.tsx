'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useOnboarding } from '@/context/OnboardingContext'
import { ProgressDots } from '@/components/onboarding/ProgressDots'
import { FLEXIBILITY_OPTIONS, AGENCY_OPTIONS } from '@/types/onboarding'
import { createClient } from '@/lib/supabase/client'
import { getPersistenceComment, getFlexibilityComment, getAgencyComment } from '@/lib/personality'

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

// List-style selection buttons (for options with descriptions)
const listButtonClasses = {
  base: `w-full py-3 px-4 rounded-2xl text-left transition-all duration-300`,
  selected: `bg-zinc-800 text-white shadow-lg shadow-zinc-900/20`,
  unselected: `bg-white text-zinc-600 border border-zinc-200 shadow-sm hover:shadow-md hover:border-zinc-300`,
}

export default function StylePage() {
  const router = useRouter()
  const { state, updatePreferences, setMessage } = useOnboarding()
  const [loading, setLoading] = useState(false)
  const sliderTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handle persistence slider changes with debounce
  const handlePersistenceChange = (value: number) => {
    updatePreferences({ persistence: value })

    // Clear any pending timeout
    if (sliderTimeoutRef.current) {
      clearTimeout(sliderTimeoutRef.current)
    }

    sliderTimeoutRef.current = setTimeout(() => {
      const persistenceComment = getPersistenceComment(value)
      if (persistenceComment) {
        setMessage(persistenceComment)
      }
    }, 500)
  }

  // Handle flexibility selection
  const handleFlexibilityChange = (flexibilityId: 'strict' | 'somewhat' | 'flexible') => {
    updatePreferences({ flexibility: flexibilityId })
    const flexComment = getFlexibilityComment(flexibilityId)
    if (flexComment) {
      setMessage(flexComment)
    }
  }

  // Handle agency selection
  const handleAgencyChange = (agencyId: number) => {
    updatePreferences({ agency: agencyId })
    const agencyComment = getAgencyComment(agencyId)
    if (agencyComment) {
      setMessage(agencyComment)
    }
  }

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
        <h1
          className="text-3xl md:text-4xl text-zinc-900"
          style={{ fontFamily: "'Righteous', cursive" }}
        >
          What&apos;s my vibe?
        </h1>
        <p
          className="text-zinc-600"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          Tune me up.
        </p>
        <p
          className="text-zinc-400 text-sm italic"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          PS: I&apos;ll learn your preferences as we chat. This is just our starting point.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Persistence Slider */}
        <div className="space-y-3">
          <label
            className="font-semibold text-zinc-900"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            How persistent should I be?
          </label>
          <div className="space-y-2">
            <div className="relative pt-1">
              <input
                type="range"
                min="1"
                max="5"
                value={state.preferences.persistence ?? 3}
                onChange={(e) => handlePersistenceChange(parseInt(e.target.value))}
                className="w-full h-2 bg-rose-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-rose-400 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-rose-400 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
              />
            </div>
            <div
              className="flex justify-between text-sm text-zinc-400"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              <span>{persistenceLabels[0]}</span>
              <span className="text-rose-500 font-semibold">{state.preferences.persistence ?? 3}/5</span>
              <span>{persistenceLabels[4]}</span>
            </div>
          </div>
        </div>

        {/* Flexibility */}
        <div className="space-y-3">
          <label
            className="font-semibold text-zinc-900"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Okay with alternatives?
          </label>
          <div className="space-y-2">
            {FLEXIBILITY_OPTIONS.map((option) => {
              const isSelected = state.preferences.flexibility === option.id
              return (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  transition={buttonSpring}
                  onClick={() => handleFlexibilityChange(option.id)}
                  className={`${listButtonClasses.base} ${
                    isSelected ? listButtonClasses.selected : listButtonClasses.unselected
                  }`}
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  <span className="font-semibold">{option.label}</span>
                  <span className={`text-sm ml-2 ${
                    isSelected ? 'text-white/80' : 'text-zinc-400'
                  }`}>
                    — {option.description}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Agency */}
        <div className="space-y-3">
          <label
            className="font-semibold text-zinc-900"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            How much can Mama decide?
          </label>
          <div className="space-y-2">
            {AGENCY_OPTIONS.map((option) => {
              const isSelected = state.preferences.agency === option.id
              return (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  transition={buttonSpring}
                  onClick={() => handleAgencyChange(option.id)}
                  className={`${listButtonClasses.base} ${
                    isSelected ? listButtonClasses.selected : listButtonClasses.unselected
                  }`}
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  <span className="font-semibold">{option.label}</span>
                  <span className={`text-sm ml-2 ${
                    isSelected ? 'text-white/80' : 'text-zinc-400'
                  }`}>
                    — {option.description}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Continue Button - Arcade Style */}
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
        onClick={handleContinue}
        disabled={loading}
        className={`w-full ${primaryCtaClasses}`}
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/10 pointer-events-none" />
        <span className="relative z-10">
          {loading ? 'Saving...' : 'Continue'}
        </span>
      </motion.button>

      {/* Progress Dots */}
      <ProgressDots total={4} current={2} />
    </motion.div>
  )
}
