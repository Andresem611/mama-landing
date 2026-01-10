'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useOnboarding } from '@/context/OnboardingContext'
import { ProgressDots } from '@/components/onboarding/ProgressDots'
import { CityCombobox } from '@/components/onboarding/CityCombobox'
import { createClient } from '@/lib/supabase/client'
import { getCityComment } from '@/lib/personality'

const AGE_OPTIONS = ['18-24', '25-30', '31-40', '40+'] as const

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

// Selection pill styles (matching DualCarousel)
const selectionPillClasses = {
  base: `py-3 px-4 rounded-2xl font-medium transition-all duration-300`,
  selected: `bg-rose-400 text-white shadow-lg shadow-rose-900/20`,
  unselected: `bg-white/95 text-zinc-600 border-2 border-white/60 shadow-lg shadow-rose-900/10 hover:shadow-xl`,
}

export default function AboutPage() {
  const router = useRouter()
  const { state, updateProfile, addMessage, clearMessages } = useOnboarding()
  const [loading, setLoading] = useState(false)
  const [lastCommentedCity, setLastCommentedCity] = useState<string | null>(null)

  // Clear messages when component mounts
  useEffect(() => {
    clearMessages()
  }, [clearMessages])

  // Handle city selection - immediately show comment
  const handleCityChange = (city: string) => {
    updateProfile({ location: city })

    // Only comment if it's a new city selection
    if (city && city !== lastCommentedCity) {
      const cityComment = getCityComment(city)
      if (cityComment) {
        addMessage(cityComment)
        setLastCommentedCity(city)
      }
    }
  }

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
        <h1
          className="text-3xl md:text-4xl text-zinc-900"
          style={{ fontFamily: "'Righteous', cursive" }}
        >
          A little about you
        </h1>
        <p
          className="text-zinc-600"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          Just the basics. I&apos;m not nosy... okay maybe a little.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Age Range - Pill Buttons */}
        <div className="space-y-3">
          <label
            className="font-semibold text-zinc-900"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Age range
          </label>
          <div className="grid grid-cols-2 gap-3">
            {AGE_OPTIONS.map((age) => {
              const isSelected = state.profile.age_range === age
              return (
                <motion.button
                  key={age}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={buttonSpring}
                  onClick={() => updateProfile({ age_range: age })}
                  className={`${selectionPillClasses.base} ${
                    isSelected ? selectionPillClasses.selected : selectionPillClasses.unselected
                  }`}
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  {age}
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Location Dropdown */}
        <div className="space-y-3">
          <label
            className="font-semibold text-zinc-900"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Where are you based?
          </label>
          <CityCombobox
            value={state.profile.location ?? ''}
            onValueChange={handleCityChange}
          />
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
        disabled={!isValid || loading}
        className={`w-full ${primaryCtaClasses}`}
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/10 pointer-events-none" />
        <span className="relative z-10">
          {loading ? 'Saving...' : 'Continue'}
        </span>
      </motion.button>

      {/* Progress Dots */}
      <ProgressDots total={4} current={0} />
    </motion.div>
  )
}
