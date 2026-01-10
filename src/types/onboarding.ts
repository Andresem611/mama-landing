export interface Profile {
  id: string
  name: string | null
  age_range: '18-24' | '25-30' | '31-40' | '40+' | null
  location: string | null
  created_at: string
  updated_at: string
}

export interface UserPreferences {
  id: string
  user_id: string
  use_cases: string[]
  frequency: 'daily' | 'weekly' | 'monthly' | 'occasionally' | null
  persistence: number // 1-5
  flexibility: 'strict' | 'somewhat' | 'flexible'
  agency: number // 1-3
  phone: string | null
  onboarding_completed: boolean
  created_at: string
  updated_at: string
}

export interface OnboardingState {
  profile: Partial<Profile>
  preferences: Partial<UserPreferences>
}

export const USE_CASE_OPTIONS = [
  { id: 'dentist', label: 'Dentist appointments', icon: '🦷' },
  { id: 'restaurant', label: 'Restaurant reservations', icon: '🍽️' },
  { id: 'doctor', label: "Doctor's office", icon: '🏥' },
  { id: 'utilities', label: 'Utilities & bills', icon: '💡' },
  { id: 'landlord', label: 'Landlord / property', icon: '🏠' },
  { id: 'customer_service', label: 'Customer service', icon: '📞' },
  { id: 'government', label: 'Government offices', icon: '🏛️' },
  { id: 'other', label: 'Other', icon: '✨' },
] as const

export const FREQUENCY_OPTIONS = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'occasionally', label: 'Occasionally' },
] as const

export const FLEXIBILITY_OPTIONS = [
  { id: 'strict', label: 'Strict', description: 'Only exactly what I ask' },
  { id: 'somewhat', label: 'Somewhat', description: 'Small changes are okay' },
  { id: 'flexible', label: 'Flexible', description: 'Whatever works!' },
] as const

export const AGENCY_OPTIONS = [
  { id: 1, label: 'Report Only', description: 'Just tell me yes or no' },
  { id: 2, label: 'Negotiate + Confirm', description: 'Find options, then ask me' },
  { id: 3, label: 'Full Auto', description: 'Handle it completely' },
] as const
