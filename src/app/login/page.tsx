import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SocialButtons } from '@/components/auth/SocialButtons'
import { MamaMascot } from '@/components/MamaMascot'

export default async function LoginPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Already logged in - redirect to onboarding
  if (user) {
    redirect('/onboarding/about')
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
          <SocialButtons />

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
