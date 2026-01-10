'use client'

import { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import { OnboardingState } from '@/types/onboarding'

export interface MamaMessage {
  id: string
  text: string
  timestamp: Date
}

interface OnboardingContextType {
  state: OnboardingState
  updateProfile: (data: Partial<OnboardingState['profile']>) => void
  updatePreferences: (data: Partial<OnboardingState['preferences']>) => void
  // MAMA personality messages
  messages: MamaMessage[]
  addMessage: (text: string) => void
  setMessage: (text: string) => void  // Replace all messages with one
  clearMessages: () => void
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

  const [messages, setMessages] = useState<MamaMessage[]>([])

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

  const addMessage = useCallback((text: string) => {
    const newMessage: MamaMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, newMessage])
  }, [])

  // Replace all messages with a single new message
  const setMessage = useCallback((text: string) => {
    const newMessage: MamaMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text,
      timestamp: new Date(),
    }
    setMessages([newMessage])
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  return (
    <OnboardingContext.Provider value={{
      state,
      updateProfile,
      updatePreferences,
      messages,
      addMessage,
      setMessage,
      clearMessages,
    }}>
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
