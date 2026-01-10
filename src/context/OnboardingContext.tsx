'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { OnboardingState } from '@/types/onboarding'

interface OnboardingContextType {
  state: OnboardingState
  updateProfile: (data: Partial<OnboardingState['profile']>) => void
  updatePreferences: (data: Partial<OnboardingState['preferences']>) => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function OnboardingProvider({
  children,
  initialState
}: {
  children: ReactNode
  initialState?: Partial<OnboardingState>
}) {
  const [state, setState] = useState<OnboardingState>({
    profile: initialState?.profile ?? {},
    preferences: initialState?.preferences ?? {
      use_cases: [],
      persistence: 3,
      flexibility: 'somewhat',
      agency: 2,
    },
  })

  const updateProfile = (data: Partial<OnboardingState['profile']>) => {
    setState(prev => ({
      ...prev,
      profile: { ...prev.profile, ...data },
    }))
  }

  const updatePreferences = (data: Partial<OnboardingState['preferences']>) => {
    setState(prev => ({
      ...prev,
      preferences: { ...prev.preferences, ...data },
    }))
  }

  return (
    <OnboardingContext.Provider value={{ state, updateProfile, updatePreferences }}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider')
  }
  return context
}
