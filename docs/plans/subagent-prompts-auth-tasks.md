# Subagent Prompts: Auth & Types Tasks (1-9)

> **Usage:** Copy each prompt into a separate Claude Code session/tab to execute in parallel.
> **Required skills:** `mama-frontend`, `superpowers:requesting-code-review`

---

## Context for All Subagents

```
PROJECT: mama-landing
LOCATION: /Users/andresmartinez/Projects/mama-landing
STACK: Next.js 16, React 19, Supabase, Tailwind CSS 4, Framer Motion

DESIGN SYSTEM: Invoke `/mama` or `mama-frontend` skill for design tokens:
- Colors: Rose palette (rose-400 #FB7185 primary)
- Typography: Titan One (headlines), Quicksand (body)
- Buttons: Full pill (rounded-full), spring animations

PLAN FILE: docs/plans/2026-01-10-signup-onboarding-execution.md
```

---

## TASK 1: Install Auth Dependencies

### Implementer Prompt

```
You are implementing Task 1 of the MAMA signup flow.

PROJECT: /Users/andresmartinez/Projects/mama-landing
TASK: Install @supabase/ssr package for server-side auth

STEPS:
1. Run: npm install @supabase/ssr
2. Verify both @supabase/supabase-js and @supabase/ssr are in package.json
3. Commit: git add package.json package-lock.json && git commit -m "chore: add @supabase/ssr for auth"

DONE WHEN:
- Package installed
- Committed to git

Execute this task now.
```

---

## TASK 2: Create Supabase Client Utilities

### Implementer Prompt

```
You are implementing Task 2 of the MAMA signup flow.

PROJECT: /Users/andresmartinez/Projects/mama-landing
TASK: Create Supabase SSR client utilities for browser, server, and middleware

FILES TO CREATE:
- src/lib/supabase/client.ts (browser client)
- src/lib/supabase/server.ts (server client with cookies)
- src/lib/supabase/middleware.ts (middleware helper with auth redirect)

REQUIREMENTS:
1. Browser client uses createBrowserClient from @supabase/ssr
2. Server client uses createServerClient with cookies() from next/headers
3. Middleware helper refreshes session and redirects unauthenticated users from /onboarding to /login

Read the full implementation from: docs/plans/2026-01-10-signup-onboarding-execution.md (Task 2)

COMMIT MESSAGE: "feat: add Supabase SSR client utilities"

Execute this task now. Read the plan file for exact code.
```

---

## TASK 3: Create Middleware

### Implementer Prompt

```
You are implementing Task 3 of the MAMA signup flow.

PROJECT: /Users/andresmartinez/Projects/mama-landing
TASK: Create Next.js middleware for auth session refresh

FILE TO CREATE:
- src/middleware.ts

REQUIREMENTS:
1. Import updateSession from @/lib/supabase/middleware
2. Export middleware function that calls updateSession
3. Configure matcher to exclude static files

Read the full implementation from: docs/plans/2026-01-10-signup-onboarding-execution.md (Task 3)

COMMIT MESSAGE: "feat: add auth middleware for session refresh"

Execute this task now.
```

---

## TASK 4: Create Auth Callback Route

### Implementer Prompt

```
You are implementing Task 4 of the MAMA signup flow.

PROJECT: /Users/andresmartinez/Projects/mama-landing
TASK: Create OAuth callback route handler

FILE TO CREATE:
- src/app/auth/callback/route.ts

REQUIREMENTS:
1. Handle GET request with code parameter
2. Exchange code for session using supabase.auth.exchangeCodeForSession
3. Redirect to /onboarding/about on success
4. Redirect to /login?error=auth on failure

Read the full implementation from: docs/plans/2026-01-10-signup-onboarding-execution.md (Task 4)

COMMIT MESSAGE: "feat: add OAuth callback route"

Execute this task now.
```

---

## TASK 5: Create Social Login Buttons

### Implementer Prompt

```
You are implementing Task 5 of the MAMA signup flow.

PROJECT: /Users/andresmartinez/Projects/mama-landing
TASK: Create Google and Apple social login buttons component

INVOKE SKILL FIRST: /mama (for design tokens)

FILE TO CREATE:
- src/components/auth/SocialButtons.tsx

REQUIREMENTS:
1. 'use client' component
2. Google button: white bg, zinc border, Google colored icon
3. Apple button: zinc-900 bg, white text, Apple icon
4. Both use Framer Motion spring animations (stiffness: 400, damping: 17)
5. Call supabase.auth.signInWithOAuth with redirectTo to /auth/callback
6. Use font-quicksand, rounded-full buttons

DESIGN TOKENS (from mama-frontend skill):
- Button animation: whileHover={{ scale: 1.02, y: -2 }}, whileTap={{ scale: 0.98 }}
- Font: font-quicksand font-semibold
- Border radius: rounded-full

Read the full implementation from: docs/plans/2026-01-10-signup-onboarding-execution.md (Task 5)

COMMIT MESSAGE: "feat: add social login buttons component"

Execute this task now.
```

---

## TASK 6: Create Login Page

### Implementer Prompt

```
You are implementing Task 6 of the MAMA signup flow.

PROJECT: /Users/andresmartinez/Projects/mama-landing
TASK: Create login page with social auth

INVOKE SKILL FIRST: /mama (for design tokens)

FILE TO CREATE:
- src/app/login/page.tsx

REQUIREMENTS:
1. Server component that checks if user already logged in (redirect to /onboarding/about)
2. Centered layout with bg-cream background
3. Headline: "Let Mama handle it" in font-titan
4. Subheadline: "Sign up and never make an awkward phone call again." in font-quicksand text-zinc-600
5. White card (rounded-2xl) containing SocialButtons component
6. Terms disclaimer text at bottom

DESIGN TOKENS (from mama-frontend skill):
- Background: bg-cream (#FFFBF5)
- Headline: font-titan text-4xl md:text-5xl text-zinc-900
- Body: font-quicksand text-zinc-600
- Card: bg-white rounded-2xl p-8 shadow-sm

Read the full implementation from: docs/plans/2026-01-10-signup-onboarding-execution.md (Task 6)

COMMIT MESSAGE: "feat: add login page with social auth"

Execute this task now.
```

---

## TASK 7: Create Database Tables

### Implementer Prompt

```
You are implementing Task 7 of the MAMA signup flow.

PROJECT: /Users/andresmartinez/Projects/mama-landing
TASK: Create SQL schema for profiles and user_preferences tables

FILE TO CREATE:
- docs/database/schema.sql

NOTE: This SQL needs to be run manually in Supabase Dashboard SQL Editor.

REQUIREMENTS:
1. profiles table:
   - id (UUID, FK to auth.users, PK)
   - name (text)
   - age_range (text, CHECK: '18-24', '25-30', '31-40', '40+')
   - location (text)
   - created_at, updated_at (timestamptz)
   - RLS policies for own row access

2. user_preferences table:
   - id (UUID, PK)
   - user_id (UUID, FK to profiles)
   - use_cases (text[])
   - frequency (text, CHECK: 'daily', 'weekly', 'monthly', 'occasionally')
   - persistence (int, 1-5)
   - flexibility (text, CHECK: 'strict', 'somewhat', 'flexible')
   - agency (int, 1-3)
   - phone (text)
   - onboarding_completed (boolean)
   - RLS policies for own row access

3. Trigger function handle_new_user():
   - Auto-creates profile row on auth.users insert
   - Auto-creates user_preferences row
   - Extracts name from user metadata

Read the full SQL from: docs/plans/2026-01-10-signup-onboarding-execution.md (Task 7)

COMMIT MESSAGE: "docs: add database schema SQL"

Execute this task now.
```

---

## TASK 8: Create Onboarding Types

### Implementer Prompt

```
You are implementing Task 8 of the MAMA signup flow.

PROJECT: /Users/andresmartinez/Projects/mama-landing
TASK: Create TypeScript types and constants for onboarding

FILE TO CREATE:
- src/types/onboarding.ts

REQUIREMENTS:
1. Profile interface matching database schema
2. UserPreferences interface matching database schema
3. OnboardingState interface combining both
4. USE_CASE_OPTIONS constant array with id, label, icon
5. FREQUENCY_OPTIONS constant array
6. FLEXIBILITY_OPTIONS constant array with descriptions
7. AGENCY_OPTIONS constant array with descriptions

USE CASES TO INCLUDE:
- dentist (🦷), restaurant (🍽️), doctor (🏥), utilities (💡)
- landlord (🏠), customer_service (📞), government (🏛️), other (✨)

Read the full implementation from: docs/plans/2026-01-10-signup-onboarding-execution.md (Task 8)

COMMIT MESSAGE: "feat: add onboarding types and options"

Execute this task now.
```

---

## TASK 9: Create Onboarding Context

### Implementer Prompt

```
You are implementing Task 9 of the MAMA signup flow.

PROJECT: /Users/andresmartinez/Projects/mama-landing
TASK: Create React context for onboarding state management

FILE TO CREATE:
- src/context/OnboardingContext.tsx

REQUIREMENTS:
1. 'use client' component
2. OnboardingProvider component with initialState prop
3. State holds profile and preferences
4. updateProfile function for partial updates
5. updatePreferences function for partial updates
6. useOnboarding hook with error if used outside provider
7. Default preferences: use_cases=[], persistence=3, flexibility='somewhat', agency=2

Read the full implementation from: docs/plans/2026-01-10-signup-onboarding-execution.md (Task 9)

COMMIT MESSAGE: "feat: add onboarding context for state management"

Execute this task now.
```

---

## Code Review Prompt (Use After Each Task)

```
You are reviewing code for the MAMA signup flow.

INVOKE SKILL: /mama (to verify design compliance)
INVOKE SKILL: superpowers:requesting-code-review

REVIEW CHECKLIST:

1. SPEC COMPLIANCE
   - Does the code match the task requirements exactly?
   - Nothing missing? Nothing extra added?

2. MAMA DESIGN SYSTEM COMPLIANCE
   - Titan One for headlines, Quicksand for body?
   - Rose palette (rose-400 primary)?
   - Full pill buttons (rounded-full)?
   - Spring animations (stiffness: 400, damping: 17)?
   - No generic fonts (Inter, Roboto, Arial)?

3. CODE QUALITY
   - TypeScript types correct?
   - No console.log statements left?
   - Error handling present?
   - Clean, readable code?

Run: git diff HEAD~1 --stat
Then: git show HEAD

Report:
- ✅ APPROVED or ❌ ISSUES FOUND
- List any issues with file:line references
```

---

## Parallel Execution Strategy

**Independent tasks (can run simultaneously):**
- Tasks 1-4 (auth infrastructure)
- Task 7 (database SQL - just creates file)
- Task 8 (types - no dependencies)

**Sequential dependencies:**
```
Task 1 (install)
    → Task 2 (clients)
    → Task 3 (middleware)
    → Task 4 (callback)
    → Tasks 5-6 (UI - need clients)

Task 8 (types) → Task 9 (context - needs types)
```

**Recommended parallel groups:**
- **Group A:** Tasks 1 → 2 → 3 → 4 → 5 → 6
- **Group B:** Tasks 7, 8 → 9

---

## Quick Start Commands

**Tab 1 - Auth Infrastructure:**
```
cd /Users/andresmartinez/Projects/mama-landing
# Paste Task 1 prompt, then Task 2, etc.
```

**Tab 2 - Types & Database:**
```
cd /Users/andresmartinez/Projects/mama-landing
# Paste Task 7 prompt
# Paste Task 8 prompt
# Then Task 9 prompt after Task 8 completes
```
