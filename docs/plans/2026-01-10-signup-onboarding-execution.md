# Signup & Onboarding Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a signup flow with Supabase Auth (Google/Apple) and a 4-step onboarding that collects user preferences via an interactive Jetsons-style console UI.

**Architecture:** Split-screen layout with animated retro console (left) that fills in as users complete form steps (right). Data stored in Supabase `profiles` and `user_preferences` tables with RLS.

**Tech Stack:** Next.js 16 App Router, Supabase Auth + SSR, Framer Motion, Tailwind CSS, MAMA design system (rose palette, Titan One/Quicksand fonts)

---

## Task 1: Install Auth Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install Supabase SSR package**

```bash
npm install @supabase/ssr
```

**Step 2: Verify installation**

```bash
cat package.json | grep supabase
```

Expected: Both `@supabase/supabase-js` and `@supabase/ssr` listed.

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add @supabase/ssr for auth"
```

---

## Task 2: Create Supabase Client Utilities

**Files:**
- Create: `src/lib/supabase/client.ts`
- Create: `src/lib/supabase/server.ts`
- Create: `src/lib/supabase/middleware.ts`
- Modify: `src/lib/supabase.ts` (keep for backwards compat)

**Step 1: Create browser client**

Create `src/lib/supabase/client.ts`:

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**Step 2: Create server client**

Create `src/lib/supabase/server.ts`:

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Called from Server Component
          }
        },
      },
    }
  )
}
```

**Step 3: Create middleware helper**

Create `src/lib/supabase/middleware.ts`:

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Redirect unauthenticated users from onboarding to login
  if (
    !user &&
    request.nextUrl.pathname.startsWith('/onboarding')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
```

**Step 4: Commit**

```bash
git add src/lib/supabase/
git commit -m "feat: add Supabase SSR client utilities"
```

---

## Task 3: Create Middleware

**Files:**
- Create: `src/middleware.ts`

**Step 1: Create middleware file**

Create `src/middleware.ts`:

```typescript
import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

**Step 2: Commit**

```bash
git add src/middleware.ts
git commit -m "feat: add auth middleware for session refresh"
```

---

## Task 4: Create Auth Callback Route

**Files:**
- Create: `src/app/auth/callback/route.ts`

**Step 1: Create callback handler**

Create `src/app/auth/callback/route.ts`:

```typescript
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/onboarding/about'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Return to login on error
  return NextResponse.redirect(`${origin}/login?error=auth`)
}
```

**Step 2: Commit**

```bash
git add src/app/auth/callback/
git commit -m "feat: add OAuth callback route"
```

---

## Task 5: Create Social Login Buttons Component

**Files:**
- Create: `src/components/auth/SocialButtons.tsx`

**Step 1: Create component**

Create `src/components/auth/SocialButtons.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'

const buttonVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -2,
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  },
  tap: {
    scale: 0.98,
    y: 0,
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  }
}

export function SocialButtons() {
  const supabase = createClient()

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  const handleAppleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <motion.button
        variants={buttonVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-3 w-full bg-white border-2 border-zinc-200 rounded-full px-6 py-4 font-quicksand font-semibold text-zinc-900 hover:border-zinc-300 transition-colors"
      >
        <GoogleIcon />
        Continue with Google
      </motion.button>

      <motion.button
        variants={buttonVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        onClick={handleAppleLogin}
        className="flex items-center justify-center gap-3 w-full bg-zinc-900 rounded-full px-6 py-4 font-quicksand font-semibold text-white hover:bg-zinc-800 transition-colors"
      >
        <AppleIcon />
        Continue with Apple
      </motion.button>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/auth/
git commit -m "feat: add social login buttons component"
```

---

## Task 6: Create Login Page

**Files:**
- Create: `src/app/login/page.tsx`

**Step 1: Create login page**

Create `src/app/login/page.tsx`:

```tsx
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
```

**Step 2: Commit**

```bash
git add src/app/login/
git commit -m "feat: add login page with social auth"
```

---

## Task 7: Create Database Tables (Supabase Dashboard)

**Note:** Run these SQL commands in Supabase SQL Editor.

**Step 1: Create profiles table**

```sql
-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  age_range TEXT CHECK (age_range IN ('18-24', '25-30', '31-40', '40+')),
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read own profile
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can insert own profile
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Policy: Users can update own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);
```

**Step 2: Create user_preferences table**

```sql
-- Create user_preferences table
CREATE TABLE public.user_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  use_cases TEXT[] DEFAULT '{}',
  frequency TEXT CHECK (frequency IN ('daily', 'weekly', 'monthly', 'occasionally')),
  persistence INT CHECK (persistence >= 1 AND persistence <= 5) DEFAULT 3,
  flexibility TEXT CHECK (flexibility IN ('strict', 'somewhat', 'flexible')) DEFAULT 'somewhat',
  agency INT CHECK (agency >= 1 AND agency <= 3) DEFAULT 2,
  phone TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read own preferences
CREATE POLICY "Users can read own preferences"
  ON public.user_preferences FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert own preferences
CREATE POLICY "Users can insert own preferences"
  ON public.user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update own preferences
CREATE POLICY "Users can update own preferences"
  ON public.user_preferences FOR UPDATE
  USING (auth.uid() = user_id);
```

**Step 3: Create auto-profile trigger**

```sql
-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', '')
  );

  INSERT INTO public.user_preferences (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users insert
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

**Step 4: Save SQL to docs for reference**

Create `docs/database/schema.sql` with all the above SQL.

**Step 5: Commit**

```bash
git add docs/database/
git commit -m "docs: add database schema SQL"
```

---

## Task 8: Create Onboarding Types

**Files:**
- Create: `src/types/onboarding.ts`

**Step 1: Create types file**

Create `src/types/onboarding.ts`:

```typescript
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
```

**Step 2: Commit**

```bash
git add src/types/
git commit -m "feat: add onboarding types and options"
```

---

## Task 9: Create Onboarding Context

**Files:**
- Create: `src/context/OnboardingContext.tsx`

**Step 1: Create context**

Create `src/context/OnboardingContext.tsx`:

```tsx
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
```

**Step 2: Commit**

```bash
git add src/context/
git commit -m "feat: add onboarding context for state management"
```

---

## Task 10: Create Jetsons Console Component

**Files:**
- Create: `src/components/onboarding/JetsonsConsole.tsx`

**Step 1: Create console component**

Create `src/components/onboarding/JetsonsConsole.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'
import { useOnboarding } from '@/context/OnboardingContext'
import { USE_CASE_OPTIONS } from '@/types/onboarding'

export function JetsonsConsole() {
  const { state } = useOnboarding()
  const { profile, preferences } = state

  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-rose-50 to-cream p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Console Frame */}
        <div className="bg-white rounded-3xl shadow-xl border-4 border-rose-200 overflow-hidden">
          {/* Header */}
          <div className="bg-rose-400 px-6 py-4 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-200 animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-rose-200 animate-pulse delay-100" />
              <div className="w-3 h-3 rounded-full bg-rose-200 animate-pulse delay-200" />
            </div>
            <span className="font-titan text-white text-lg tracking-wider">
              M A M A
            </span>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-200 animate-pulse delay-300" />
              <div className="w-3 h-3 rounded-full bg-rose-200 animate-pulse delay-400" />
              <div className="w-3 h-3 rounded-full bg-rose-200 animate-pulse delay-500" />
            </div>
          </div>

          {/* Console Body */}
          <div className="p-6 space-y-6">
            {/* Operator Section */}
            <ConsoleSection title="OPERATOR">
              <ConsoleField label="Name" value={profile.name} />
              <ConsoleField label="Age" value={profile.age_range} />
              <ConsoleField label="City" value={profile.location} />
            </ConsoleSection>

            {/* Call Types Section */}
            <ConsoleSection title="CALL TYPES">
              <div className="grid grid-cols-2 gap-2">
                {USE_CASE_OPTIONS.slice(0, 6).map((option) => (
                  <ConsoleCheckbox
                    key={option.id}
                    label={option.icon}
                    checked={preferences.use_cases?.includes(option.id) ?? false}
                  />
                ))}
              </div>
            </ConsoleSection>

            {/* Personality Section */}
            <ConsoleSection title="PERSONALITY">
              <ConsoleDial
                label="PERSISTENCE"
                value={preferences.persistence ?? 3}
                max={5}
              />
              <ConsoleToggle
                label="FLEXIBILITY"
                value={preferences.flexibility ?? 'somewhat'}
              />
              <ConsoleGauge
                label="AGENCY"
                value={preferences.agency ?? 2}
                max={3}
              />
            </ConsoleSection>

            {/* Uplink Section */}
            <ConsoleSection title="📞 UPLINK">
              <ConsoleField
                label="Phone"
                value={preferences.phone}
                placeholder="___ ___ ____"
              />
            </ConsoleSection>
          </div>

          {/* Footer Lights */}
          <div className="bg-zinc-100 px-6 py-3 flex justify-center gap-2">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-rose-300"
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function ConsoleSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-2 border-zinc-200 rounded-xl p-4">
      <h3 className="font-quicksand font-bold text-xs text-zinc-400 tracking-wider mb-3">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function ConsoleField({
  label,
  value,
  placeholder = '___'
}: {
  label: string
  value?: string | null
  placeholder?: string
}) {
  return (
    <div className="flex items-center gap-2 font-quicksand text-sm">
      <span className="text-zinc-400 w-12">{label}:</span>
      <motion.span
        key={value ?? 'empty'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={value ? 'text-rose-600 font-semibold' : 'text-zinc-300'}
      >
        {value || placeholder}
      </motion.span>
    </div>
  )
}

function ConsoleCheckbox({ label, checked }: { label: string; checked: boolean }) {
  return (
    <motion.div
      animate={{
        scale: checked ? 1.1 : 1,
        opacity: checked ? 1 : 0.4,
      }}
      className="text-center text-lg"
    >
      {label}
    </motion.div>
  )
}

function ConsoleDial({ label, value, max }: { label: string; value: number; max: number }) {
  const percentage = (value / max) * 100

  return (
    <div className="space-y-1">
      <span className="font-quicksand text-xs text-zinc-400">{label}</span>
      <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-rose-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 100 }}
        />
      </div>
    </div>
  )
}

function ConsoleToggle({ label, value }: { label: string; value: string }) {
  const positions = { strict: 0, somewhat: 50, flexible: 100 }
  const pos = positions[value as keyof typeof positions] ?? 50

  return (
    <div className="space-y-1">
      <span className="font-quicksand text-xs text-zinc-400">{label}</span>
      <div className="relative h-2 bg-zinc-100 rounded-full">
        <motion.div
          className="absolute w-4 h-4 bg-rose-400 rounded-full -top-1"
          animate={{ left: `calc(${pos}% - 8px)` }}
          transition={{ type: 'spring', stiffness: 200 }}
        />
      </div>
    </div>
  )
}

function ConsoleGauge({ label, value, max }: { label: string; value: number; max: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-quicksand text-xs text-zinc-400">{label}:</span>
      <div className="flex gap-1">
        {[...Array(max)].map((_, i) => (
          <motion.div
            key={i}
            className={`w-4 h-4 rounded-sm ${i < value ? 'bg-rose-400' : 'bg-zinc-200'}`}
            animate={{
              scale: i < value ? 1 : 0.8,
            }}
          />
        ))}
      </div>
      <span className="font-quicksand text-sm text-rose-600 font-bold">
        {value}/{max}
      </span>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/onboarding/JetsonsConsole.tsx
git commit -m "feat: add Jetsons console component with animations"
```

---

## Task 11: Create Progress Indicator Component

**Files:**
- Create: `src/components/onboarding/ProgressDots.tsx`

**Step 1: Create component**

Create `src/components/onboarding/ProgressDots.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'

interface ProgressDotsProps {
  total: number
  current: number
}

export function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {[...Array(total)].map((_, i) => (
        <motion.div
          key={i}
          className={`w-2.5 h-2.5 rounded-full ${
            i < current
              ? 'bg-rose-400'
              : i === current
              ? 'bg-rose-400'
              : 'bg-zinc-200'
          }`}
          animate={{
            scale: i === current ? 1.2 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
      ))}
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/onboarding/ProgressDots.tsx
git commit -m "feat: add progress dots component"
```

---

## Task 12: Create Onboarding Layout

**Files:**
- Create: `src/app/onboarding/layout.tsx`

**Step 1: Create layout**

Create `src/app/onboarding/layout.tsx`:

```tsx
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
      <div className="min-h-screen grid lg:grid-cols-2">
        {/* Left: Jetsons Console */}
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
```

**Step 2: Commit**

```bash
git add src/app/onboarding/layout.tsx
git commit -m "feat: add onboarding layout with split screen"
```

---

## Task 13: Create Step 1 - About You

**Files:**
- Create: `src/app/onboarding/about/page.tsx`

**Step 1: Create about page**

Create `src/app/onboarding/about/page.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useOnboarding } from '@/context/OnboardingContext'
import { ProgressDots } from '@/components/onboarding/ProgressDots'
import { createClient } from '@/lib/supabase/client'

const AGE_OPTIONS = ['18-24', '25-30', '31-40', '40+'] as const

export default function AboutPage() {
  const router = useRouter()
  const { state, updateProfile } = useOnboarding()
  const [loading, setLoading] = useState(false)

  const handleContinue = async () => {
    setLoading(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      await supabase
        .from('profiles')
        .update({
          age_range: state.profile.age_range,
          location: state.profile.location,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
    }

    router.push('/onboarding/calls')
  }

  const isValid = state.profile.age_range && state.profile.location

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h1 className="font-titan text-3xl md:text-4xl text-zinc-900">
          A little about you
        </h1>
        <p className="font-quicksand text-zinc-600">
          Just the basics. I&apos;m not nosy... okay maybe a little.
        </p>
      </div>

      <div className="space-y-6">
        {/* Age Range */}
        <div className="space-y-3">
          <label className="font-quicksand font-semibold text-zinc-900">
            Age range
          </label>
          <div className="grid grid-cols-2 gap-3">
            {AGE_OPTIONS.map((age) => (
              <motion.button
                key={age}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updateProfile({ age_range: age })}
                className={`py-3 px-4 rounded-xl font-quicksand font-medium transition-all ${
                  state.profile.age_range === age
                    ? 'bg-rose-400 text-white'
                    : 'bg-rose-50 text-zinc-600 hover:bg-rose-100'
                }`}
              >
                {age}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="space-y-3">
          <label className="font-quicksand font-semibold text-zinc-900">
            Where are you based?
          </label>
          <input
            type="text"
            placeholder="City, State"
            value={state.profile.location ?? ''}
            onChange={(e) => updateProfile({ location: e.target.value })}
            className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 font-quicksand text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-400 transition-all"
          />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleContinue}
        disabled={!isValid || loading}
        className="w-full bg-rose-400 text-white rounded-full py-4 font-quicksand font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-rose-300"
      >
        {loading ? 'Saving...' : 'Continue'}
      </motion.button>

      <ProgressDots total={5} current={1} />
    </motion.div>
  )
}
```

**Step 2: Commit**

```bash
git add src/app/onboarding/about/
git commit -m "feat: add onboarding step 1 - about you"
```

---

## Task 14: Create Step 2 - What Calls

**Files:**
- Create: `src/app/onboarding/calls/page.tsx`

**Step 1: Create calls page**

Create `src/app/onboarding/calls/page.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useOnboarding } from '@/context/OnboardingContext'
import { ProgressDots } from '@/components/onboarding/ProgressDots'
import { USE_CASE_OPTIONS, FREQUENCY_OPTIONS } from '@/types/onboarding'
import { createClient } from '@/lib/supabase/client'

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
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h1 className="font-titan text-3xl md:text-4xl text-zinc-900">
          The dreaded calls list
        </h1>
        <p className="font-quicksand text-zinc-600">
          Be honest. I won&apos;t judge.
        </p>
      </div>

      <div className="space-y-6">
        {/* Use Cases */}
        <div className="space-y-3">
          <label className="font-quicksand font-semibold text-zinc-900">
            Select all that apply
          </label>
          <div className="grid grid-cols-2 gap-3">
            {USE_CASE_OPTIONS.map((option) => {
              const isSelected = state.preferences.use_cases?.includes(option.id)
              return (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleUseCase(option.id)}
                  className={`py-3 px-4 rounded-xl font-quicksand text-sm font-medium transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-rose-400 text-white'
                      : 'bg-rose-50 text-zinc-600 hover:bg-rose-100'
                  }`}
                >
                  <span>{option.icon}</span>
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updatePreferences({ frequency: option.id })}
                className={`py-3 px-4 rounded-xl font-quicksand font-medium transition-all ${
                  state.preferences.frequency === option.id
                    ? 'bg-rose-400 text-white'
                    : 'bg-rose-50 text-zinc-600 hover:bg-rose-100'
                }`}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleContinue}
        disabled={!isValid || loading}
        className="w-full bg-rose-400 text-white rounded-full py-4 font-quicksand font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-rose-300"
      >
        {loading ? 'Saving...' : 'Continue'}
      </motion.button>

      <ProgressDots total={5} current={2} />
    </motion.div>
  )
}
```

**Step 2: Commit**

```bash
git add src/app/onboarding/calls/
git commit -m "feat: add onboarding step 2 - what calls"
```

---

## Task 15: Create Step 3 - Mama's Style

**Files:**
- Create: `src/app/onboarding/style/page.tsx`

**Step 1: Create style page**

Create `src/app/onboarding/style/page.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useOnboarding } from '@/context/OnboardingContext'
import { ProgressDots } from '@/components/onboarding/ProgressDots'
import { FLEXIBILITY_OPTIONS, AGENCY_OPTIONS } from '@/types/onboarding'
import { createClient } from '@/lib/supabase/client'

export default function StylePage() {
  const router = useRouter()
  const { state, updatePreferences } = useOnboarding()
  const [loading, setLoading] = useState(false)

  const handleContinue = async () => {
    setLoading(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      await supabase
        .from('user_preferences')
        .update({
          persistence: state.preferences.persistence,
          flexibility: state.preferences.flexibility,
          agency: state.preferences.agency,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
    }

    router.push('/onboarding/phone')
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h1 className="font-titan text-3xl md:text-4xl text-zinc-900">
          What&apos;s my vibe?
        </h1>
        <p className="font-quicksand text-zinc-600">
          Tune me up.
        </p>
      </div>

      <div className="space-y-6">
        {/* Persistence Slider */}
        <div className="space-y-3">
          <label className="font-quicksand font-semibold text-zinc-900">
            How pushy should Mama be?
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="1"
              max="5"
              value={state.preferences.persistence ?? 3}
              onChange={(e) => updatePreferences({ persistence: parseInt(e.target.value) })}
              className="w-full h-2 bg-rose-100 rounded-full appearance-none cursor-pointer accent-rose-400"
            />
            <div className="flex justify-between text-sm font-quicksand text-zinc-400">
              <span>Chill</span>
              <span>Persistent</span>
            </div>
          </div>
        </div>

        {/* Flexibility */}
        <div className="space-y-3">
          <label className="font-quicksand font-semibold text-zinc-900">
            Okay with alternatives?
          </label>
          <p className="text-sm text-zinc-500 font-quicksand">
            e.g., 7pm booked → 7:30pm offered
          </p>
          <div className="space-y-2">
            {FLEXIBILITY_OPTIONS.map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => updatePreferences({ flexibility: option.id })}
                className={`w-full py-3 px-4 rounded-xl font-quicksand text-left transition-all ${
                  state.preferences.flexibility === option.id
                    ? 'bg-rose-400 text-white'
                    : 'bg-rose-50 text-zinc-600 hover:bg-rose-100'
                }`}
              >
                <span className="font-semibold">{option.label}</span>
                <span className="text-sm opacity-80 ml-2">— {option.description}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Agency */}
        <div className="space-y-3">
          <label className="font-quicksand font-semibold text-zinc-900">
            How much can Mama decide?
          </label>
          <div className="space-y-2">
            {AGENCY_OPTIONS.map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => updatePreferences({ agency: option.id })}
                className={`w-full py-3 px-4 rounded-xl font-quicksand text-left transition-all ${
                  state.preferences.agency === option.id
                    ? 'bg-rose-400 text-white'
                    : 'bg-rose-50 text-zinc-600 hover:bg-rose-100'
                }`}
              >
                <span className="font-semibold">{option.label}</span>
                <span className="text-sm opacity-80 ml-2">— {option.description}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleContinue}
        disabled={loading}
        className="w-full bg-rose-400 text-white rounded-full py-4 font-quicksand font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-rose-300"
      >
        {loading ? 'Saving...' : 'Continue'}
      </motion.button>

      <ProgressDots total={5} current={3} />
    </motion.div>
  )
}
```

**Step 2: Commit**

```bash
git add src/app/onboarding/style/
git commit -m "feat: add onboarding step 3 - mama's style"
```

---

## Task 16: Create Step 4 - Phone Number

**Files:**
- Create: `src/app/onboarding/phone/page.tsx`

**Step 1: Create phone page**

Create `src/app/onboarding/phone/page.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useOnboarding } from '@/context/OnboardingContext'
import { ProgressDots } from '@/components/onboarding/ProgressDots'
import { createClient } from '@/lib/supabase/client'

export default function PhonePage() {
  const router = useRouter()
  const { state, updatePreferences } = useOnboarding()
  const [loading, setLoading] = useState(false)

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/)
    if (match) {
      const parts = [match[1], match[2], match[3]].filter(Boolean)
      if (parts.length === 0) return ''
      if (parts.length === 1) return parts[0]
      if (parts.length === 2) return `(${parts[0]}) ${parts[1]}`
      return `(${parts[0]}) ${parts[1]}-${parts[2]}`
    }
    return value
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    updatePreferences({ phone: formatted })
  }

  const handleComplete = async () => {
    setLoading(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      await supabase
        .from('user_preferences')
        .update({
          phone: state.preferences.phone,
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
    }

    router.push('/onboarding/done')
  }

  const phoneDigits = (state.preferences.phone ?? '').replace(/\D/g, '')
  const isValid = phoneDigits.length === 10

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h1 className="font-titan text-3xl md:text-4xl text-zinc-900">
          Where should I reach you?
        </h1>
        <p className="font-quicksand text-zinc-600">
          I&apos;ll text you when I&apos;m ready to start making calls.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="font-quicksand font-semibold text-zinc-900">
            Phone number
          </label>
          <input
            type="tel"
            placeholder="(555) 123-4567"
            value={state.preferences.phone ?? ''}
            onChange={handlePhoneChange}
            maxLength={14}
            className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-4 font-quicksand text-xl text-zinc-900 text-center placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-400 transition-all tracking-wider"
          />
          <p className="text-sm text-zinc-400 font-quicksand text-center">
            We&apos;ll only text you about Mama. No spam, promise.
          </p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleComplete}
        disabled={!isValid || loading}
        className="w-full bg-rose-400 text-white rounded-full py-4 font-quicksand font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-rose-300"
      >
        {loading ? 'Completing setup...' : 'Complete Setup'}
      </motion.button>

      <ProgressDots total={5} current={4} />
    </motion.div>
  )
}
```

**Step 2: Commit**

```bash
git add src/app/onboarding/phone/
git commit -m "feat: add onboarding step 4 - phone number"
```

---

## Task 17: Create Done Page

**Files:**
- Create: `src/app/onboarding/done/page.tsx`

**Step 1: Create done page**

Create `src/app/onboarding/done/page.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useOnboarding } from '@/context/OnboardingContext'

export default function DonePage() {
  const { state } = useOnboarding()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        className="text-6xl"
      >
        🎉
      </motion.div>

      <div className="space-y-2">
        <h1 className="font-titan text-3xl md:text-4xl text-zinc-900">
          Consider it handled
        </h1>
        <p className="font-quicksand text-zinc-600">
          Relax. I&apos;ve got this from here.
        </p>
      </div>

      <div className="bg-rose-50 rounded-2xl p-6 space-y-4">
        <p className="font-quicksand text-zinc-700">
          We&apos;ll text you at
        </p>
        <p className="font-quicksand text-2xl font-bold text-rose-600">
          {state.preferences.phone}
        </p>
        <p className="font-quicksand text-zinc-500 text-sm">
          when you&apos;re off the waitlist
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-quicksand text-zinc-600">
          Want to move up the list?
        </p>
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-zinc-900 text-white rounded-full py-4 font-quicksand font-semibold transition-all hover:bg-zinc-800"
        >
          Share with friends
        </motion.button>
      </div>

      <Link
        href="/"
        className="inline-block font-quicksand text-rose-400 hover:text-rose-500 transition-colors"
      >
        ← Back to home
      </Link>
    </motion.div>
  )
}
```

**Step 2: Commit**

```bash
git add src/app/onboarding/done/
git commit -m "feat: add onboarding done page"
```

---

## Task 18: Create Onboarding Index Redirect

**Files:**
- Create: `src/app/onboarding/page.tsx`

**Step 1: Create redirect page**

Create `src/app/onboarding/page.tsx`:

```tsx
import { redirect } from 'next/navigation'

export default function OnboardingPage() {
  redirect('/onboarding/about')
}
```

**Step 2: Commit**

```bash
git add src/app/onboarding/page.tsx
git commit -m "feat: add onboarding index redirect"
```

---

## Task 19: Configure OAuth Providers (Manual Step)

**Note:** These steps are done in external dashboards.

**Step 1: Enable Google OAuth in Supabase**

1. Go to Supabase Dashboard → Authentication → Providers
2. Enable Google
3. Add Google Client ID and Secret (from Google Cloud Console)
4. Set redirect URL: `https://your-project.supabase.co/auth/v1/callback`

**Step 2: Enable Apple OAuth in Supabase**

1. Go to Supabase Dashboard → Authentication → Providers
2. Enable Apple
3. Add Apple credentials (from Apple Developer Console)
4. Set redirect URL: `https://your-project.supabase.co/auth/v1/callback`

**Step 3: Update redirect URLs for local dev**

Add to Supabase → Authentication → URL Configuration:
- Site URL: `http://localhost:3000`
- Redirect URLs: `http://localhost:3000/auth/callback`

---

## Task 20: Test Full Flow

**Step 1: Start dev server**

```bash
npm run dev
```

**Step 2: Test login flow**

1. Navigate to `http://localhost:3000/login`
2. Click "Continue with Google"
3. Complete OAuth flow
4. Verify redirect to `/onboarding/about`

**Step 3: Test onboarding flow**

1. Complete each step
2. Verify console updates on left side
3. Verify data saves to Supabase
4. Complete phone step
5. Verify redirect to `/onboarding/done`

**Step 4: Verify database**

Check Supabase tables:
- `profiles` has new row with user data
- `user_preferences` has preferences with `onboarding_completed: true`

---

## Task 21: Final Commit

```bash
git add .
git commit -m "feat: complete signup and onboarding flow"
```

---

## Summary

| Phase | Tasks | Status |
|-------|-------|--------|
| Auth Setup | Tasks 1-6 | Pending |
| Database | Task 7 | Pending |
| Types & Context | Tasks 8-9 | Pending |
| UI Components | Tasks 10-11 | Pending |
| Onboarding Pages | Tasks 12-18 | Pending |
| OAuth Config | Task 19 | Pending |
| Testing | Task 20 | Pending |
