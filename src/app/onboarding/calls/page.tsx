'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useOnboarding } from '@/context/OnboardingContext'
import { ProgressDots } from '@/components/onboarding/ProgressDots'
import { FREQUENCY_OPTIONS } from '@/types/onboarding'
import { createClient } from '@/lib/supabase/client'

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
  stiffness: 400,
  damping: 17
}

export default function CallsPage() {
  const router = useRouter()
  const { state, updatePreferences } = useOnboarding()
  const [loading, setLoading] = useState(false)

  const toggleUseCase = (id: string) => {
    const current = state.preferences.use_cases ?? []
    const updated = current.includes(id)
      ? current.filter((c) => c !== id)
      : [...current, id]
    updatePreferences({ use_cases: updated })
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
        <h1 className="font-titan text-3xl md:text-4xl text-zinc-900">
          The dreaded calls list
        </h1>
        <p className="font-quicksand text-zinc-600">
          Be honest. I won&apos;t judge.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Use Cases - Grid of Pill Buttons with Icons */}
        <div className="space-y-3">
          <label className="font-quicksand font-semibold text-zinc-900">
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
                  className={`py-3 px-4 rounded-2xl font-quicksand text-sm font-medium transition-colors flex items-center gap-2 ${
                    isSelected
                      ? 'bg-rose-400 text-white'
                      : 'bg-rose-50 text-zinc-600 hover:bg-rose-100 border-2 border-transparent'
                  }`}
                >
                  <Image
                    src={option.icon}
                    alt=""
                    width={24}
                    height={24}
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
          <label className="font-quicksand font-semibold text-zinc-900">
            How often would you use Mama?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {FREQUENCY_OPTIONS.map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={buttonSpring}
                onClick={() => updatePreferences({ frequency: option.id })}
                className={`py-3 px-4 rounded-2xl font-quicksand font-medium transition-colors ${
                  state.preferences.frequency === option.id
                    ? 'bg-rose-400 text-white'
                    : 'bg-rose-50 text-zinc-600 hover:bg-rose-100 border-2 border-transparent'
                }`}
              >
                {option.label}
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
        disabled={!isValid || loading}
        className="w-full bg-rose-400 text-white rounded-full py-4 font-quicksand font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-rose-300"
      >
        {loading ? 'Saving...' : 'Continue'}
      </motion.button>

      {/* Progress Dots */}
      <ProgressDots total={4} current={1} />
    </motion.div>
  )
}
