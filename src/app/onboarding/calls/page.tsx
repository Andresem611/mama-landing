'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useOnboarding } from '@/context/OnboardingContext'
import { ProgressDots } from '@/components/onboarding/ProgressDots'
import { FREQUENCY_OPTIONS } from '@/types/onboarding'
import { createClient } from '@/lib/supabase/client'
import { getUseCaseComment, getUseCaseCountComment } from '@/lib/personality'

// Use cases with OpenMoji icons
const USE_CASES = [
  { id: 'dentist', label: 'Dentist', icon: '/icons/openmoji/tooth.svg' },
  { id: 'restaurant', label: 'Restaurants', icon: '/icons/openmoji/fork-knife-plate.svg' },
  { id: 'doctor', label: 'Doctor', icon: '/icons/openmoji/hospital.svg' },
  { id: 'customer_service', label: 'Support', icon: '/icons/openmoji/telephone.svg' },
  { id: 'landlord', label: 'Landlord', icon: '/icons/openmoji/house.svg' },
  { id: 'utilities', label: 'Utilities', icon: '/icons/openmoji/lightning.svg' },
  { id: 'government', label: 'Gov/DMV', icon: '/icons/openmoji/bank.svg' },
  { id: 'other', label: 'Other', icon: '/icons/openmoji/clipboard.svg' },
]

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

// Selection pill styles - clean modern look
const selectionPillClasses = {
  base: `py-3 px-4 rounded-2xl font-medium transition-all duration-300 flex items-center gap-3`,
  selected: `bg-zinc-800 text-white shadow-lg shadow-zinc-900/20`,
  unselected: `bg-white text-zinc-600 border border-zinc-200 shadow-sm hover:shadow-md hover:border-zinc-300`,
}

export default function CallsPage() {
  const router = useRouter()
  const { state, updatePreferences, setMessage } = useOnboarding()
  const [loading, setLoading] = useState(false)

  const toggleUseCase = (id: string) => {
    const current = state.preferences.use_cases ?? []
    const isAdding = !current.includes(id)
    const updated = isAdding
      ? [...current, id]
      : current.filter((c) => c !== id)
    updatePreferences({ use_cases: updated })

    // Show personality comment when adding
    if (isAdding) {
      // First check for individual use case comment (50% chance)
      const useCaseComment = getUseCaseComment(id)
      if (useCaseComment && Math.random() > 0.5) {
        setMessage(useCaseComment)
        return
      }

      // Then check for count-based comment
      const countComment = getUseCaseCountComment(updated.length)
      if (countComment) {
        setMessage(countComment)
      }
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
          use_cases: state.preferences.use_cases,
          frequency: state.preferences.frequency,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
    }

    router.push('/onboarding/style')
  }

  const isValid =
    (state.preferences.use_cases?.length ?? 0) > 0 &&
    state.preferences.frequency

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
          The dreaded calls list
        </h1>
        <p
          className="text-zinc-600"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          Be honest. I won&apos;t judge.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Use Cases - Grid of Pill Buttons with Icons */}
        <div className="space-y-3">
          <label
            className="font-semibold text-zinc-900"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Select all that apply
          </label>
          <div className="grid grid-cols-2 gap-3">
            {USE_CASES.map((option) => {
              const isSelected = state.preferences.use_cases?.includes(option.id)
              return (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={buttonSpring}
                  onClick={() => toggleUseCase(option.id)}
                  className={`${selectionPillClasses.base} ${
                    isSelected ? selectionPillClasses.selected : selectionPillClasses.unselected
                  }`}
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  <Image
                    src={option.icon}
                    alt=""
                    width={32}
                    height={32}
                    className={isSelected ? 'brightness-0 invert' : ''}
                  />
                  <span>{option.label}</span>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Frequency */}
        <div className="space-y-3">
          <label
            className="font-semibold text-zinc-900"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            How often would you use Mama?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {FREQUENCY_OPTIONS.map((option) => {
              const isSelected = state.preferences.frequency === option.id
              return (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={buttonSpring}
                  onClick={() => updatePreferences({ frequency: option.id })}
                  className={`py-3 px-4 rounded-2xl font-medium transition-all duration-300 ${
                    isSelected
                      ? 'bg-zinc-800 text-white shadow-lg shadow-zinc-900/20'
                      : 'bg-white text-zinc-600 border border-zinc-200 shadow-sm hover:shadow-md hover:border-zinc-300'
                  }`}
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  {option.label}
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
      <ProgressDots total={4} current={1} />
    </motion.div>
  )
}
