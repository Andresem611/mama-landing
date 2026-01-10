import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SocialButtons } from '@/components/auth/SocialButtons'

export default async function LoginPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Already logged in - redirect to onboarding
  if (user) {
    redirect('/onboarding/about')
  }

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-titan text-4xl md:text-5xl text-zinc-900 mb-4">
            Let Mama handle it
          </h1>
          <p className="font-quicksand text-zinc-600 text-lg">
            Sign up and never make an awkward phone call again.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <SocialButtons />

          <p className="text-center text-zinc-400 text-sm font-quicksand mt-6">
            By signing up, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    </main>
  )
}
