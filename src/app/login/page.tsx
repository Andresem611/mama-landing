import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SocialButtons } from '@/components/auth/SocialButtons'
import { MamaMascot } from '@/components/MamaMascot'

// TODO: Set to false for production
const BYPASS_AUTH_FOR_TESTING = true

export default async function LoginPage() {
  // Skip Supabase check entirely in test mode
  if (!BYPASS_AUTH_FOR_TESTING) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Already logged in - redirect to onboarding
    if (user) {
      redirect('/onboarding/about')
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: '#FFFBF5' }}
    >
      <div className="w-full max-w-md">
        {/* Mama Mascot */}
        <div className="flex justify-center mb-6">
          <MamaMascot width={100} height={140} />
        </div>

        <div className="text-center mb-8">
          <h1
            className="text-4xl md:text-5xl text-zinc-900 mb-4"
            style={{ fontFamily: "'Righteous', cursive" }}
          >
            Let Mama handle it
          </h1>
          <p
            className="text-zinc-600 text-lg"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Sign up and never make an awkward phone call again.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          {BYPASS_AUTH_FOR_TESTING ? (
            // Test mode: Skip OAuth, go directly to onboarding
            <div className="flex flex-col gap-4">
              <Link
                href="/onboarding/about"
                className="relative flex items-center justify-center gap-3 w-full rounded-full px-6 py-4 bg-gradient-to-b from-rose-400 to-rose-500 text-white border-[3px] border-rose-500 shadow-[0_4px_0_0_#be123c,0_6px_12px_rgba(225,29,72,0.4)] transition-all duration-150 ease-out hover:translate-y-[-2px] hover:shadow-[0_6px_0_0_#be123c,0_8px_16px_rgba(225,29,72,0.5)] active:translate-y-[2px] active:shadow-[0_1px_0_0_#be123c,0_2px_4px_rgba(225,29,72,0.2)]"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/10 pointer-events-none" />
                <span className="relative font-semibold">Continue as Test User</span>
              </Link>

              <p
                className="text-center text-amber-600 text-xs mt-2 bg-amber-50 rounded-lg p-2"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                ⚠️ Test mode enabled - OAuth bypassed
              </p>
            </div>
          ) : (
            // Production: Real OAuth buttons
            <SocialButtons />
          )}

          <p
            className="text-center text-zinc-400 text-sm mt-6"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            By signing up, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    </main>
  )
}
