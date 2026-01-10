// import { redirect } from 'next/navigation'
// import { createClient } from '@/lib/supabase/server'
import { OnboardingProvider } from '@/context/OnboardingContext'
import { JetsonsConsole } from '@/components/onboarding/JetsonsConsole'

// TODO: Re-enable auth after testing
const BYPASS_AUTH_FOR_TESTING = true

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TEMPORARY: Bypass auth for local UI testing
  // Remove this block and uncomment the auth code below for production
  if (BYPASS_AUTH_FOR_TESTING) {
    return (
      <OnboardingProvider
        initialState={{
          profile: { name: 'Test User' },
          preferences: {
            use_cases: [],
            persistence: 3,
            flexibility: 'somewhat',
            agency: 2,
          },
        }}
      >
        <div className="min-h-screen grid lg:grid-cols-2 bg-white">
          <JetsonsConsole />
          <main className="flex items-center justify-center p-6 md:p-12 bg-white">
            <div className="w-full max-w-md">{children}</div>
          </main>
        </div>
      </OnboardingProvider>
    )
  }

  /*
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

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

  if (preferences?.onboarding_completed) {
    redirect('/onboarding/done')
  }
  */

  return (
    <OnboardingProvider
      initialState={{
        profile: {},
        preferences: {},
      }}
    >
      <div className="min-h-screen grid lg:grid-cols-2 bg-white">
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
