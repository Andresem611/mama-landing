import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { OnboardingProvider } from '@/context/OnboardingContext'
import { JetsonsConsole } from '@/components/onboarding/JetsonsConsole'

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch existing profile and preferences
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: preferences } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', user.id)
    .single()

  // If onboarding already completed, redirect to done
  if (preferences?.onboarding_completed) {
    redirect('/onboarding/done')
  }

  return (
    <OnboardingProvider
      initialState={{
        profile: profile ?? {},
        preferences: preferences ?? {},
      }}
    >
      <div className="min-h-screen grid lg:grid-cols-2 bg-cream">
        {/* Left: Jetsons Console - NO divider line */}
        <JetsonsConsole />

        {/* Right: Form Steps */}
        <main className="flex items-center justify-center p-6 md:p-12 bg-white">
          <div className="w-full max-w-md">
            {children}
          </div>
        </main>
      </div>
    </OnboardingProvider>
  )
}
