# Ralph Wiggum Prompts: Auth & Types Tasks (1-9)

> **Install Ralph:** `/plugin marketplace add anthropics/claude-plugins-official` then `/plugin install ralph-wiggum`

---

## MAMA DESIGN SYSTEM REFERENCE

**Skill location:** `~/.claude/skills/mama-frontend/SKILL.md`
**Detailed refs:** `~/.claude/skills/mama-frontend/references/details.md`

### MANDATORY Design Tokens (Use These Exactly)

```
COLORS:
- Primary: rose-400 (#FB7185)
- Hover: rose-300 (#FDA4AF)
- Active: rose-600 (#E11D48)
- Light BG: rose-50 (#FFF1F2)
- Page BG: cream (#FFFBF5) or white
- Text: zinc-900 (headlines), zinc-600 (body), zinc-400 (muted)

TYPOGRAPHY:
- Headlines: font-titan (Titan One) - NEVER Inter/Roboto/Arial
- Body/UI: font-quicksand (Quicksand) - NEVER system fonts
- Sizes: text-4xl+ for headlines, text-base for body

BUTTONS:
- Shape: rounded-full (pill shape, NOT rounded-xl)
- Primary: bg-rose-400 text-white hover:bg-rose-300
- Animation: whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
- Spring: type: "spring", stiffness: 400, damping: 17

INPUTS:
- Shape: rounded-xl
- Border: border border-zinc-200
- Focus: focus:border-rose-400 focus:ring-2 focus:ring-rose-100
- Placeholder: placeholder:text-zinc-400

CARDS:
- Background: bg-rose-50 or bg-white
- Border radius: rounded-2xl or rounded-xl
- Shadow: shadow-sm (soft, NOT harsh)
```

---

## RALPH LOOP: Tasks 1-6 (Auth Infrastructure)

Run this in **Tab 1**:

```bash
/ralph-loop "You are implementing the Auth infrastructure for MAMA signup flow.

PROJECT: /Users/andresmartinez/Projects/mama-landing
PLAN: docs/plans/2026-01-10-signup-onboarding-execution.md

## CRITICAL: DESIGN SYSTEM
FIRST: Use the Skill tool to invoke 'mama-frontend' skill for design guidelines.
SKILL FILE: ~/.claude/skills/mama-frontend/SKILL.md
REFERENCE: ~/.claude/skills/mama-frontend/references/details.md

MANDATORY DESIGN TOKENS FOR UI TASKS (5 & 6):
- Typography: font-titan (headlines), font-quicksand (body) - NEVER Inter/Roboto/Arial
- Colors: rose-400 primary, rose-300 hover, bg-cream (#FFFBF5) page background
- Buttons: rounded-full, bg-rose-400, spring animation (stiffness: 400, damping: 17)
- Cards: bg-white rounded-2xl shadow-sm

TASKS TO COMPLETE (in order):

1. INSTALL DEPENDENCIES
   - npm install @supabase/ssr
   - Commit: 'chore: add @supabase/ssr for auth'

2. CREATE SUPABASE CLIENT UTILITIES
   - src/lib/supabase/client.ts (browser client with createBrowserClient)
   - src/lib/supabase/server.ts (server client with cookies)
   - src/lib/supabase/middleware.ts (session refresh + auth redirect)
   - Commit: 'feat: add Supabase SSR client utilities'

3. CREATE MIDDLEWARE
   - src/middleware.ts (calls updateSession, matcher excludes static)
   - Commit: 'feat: add auth middleware for session refresh'

4. CREATE AUTH CALLBACK ROUTE
   - src/app/auth/callback/route.ts
   - Exchange code for session, redirect to /onboarding/about
   - Commit: 'feat: add OAuth callback route'

5. CREATE SOCIAL LOGIN BUTTONS (DESIGN-CRITICAL)
   - src/components/auth/SocialButtons.tsx
   - 'use client' component with Framer Motion
   - Google button: bg-white border-2 border-zinc-200 rounded-full
   - Apple button: bg-zinc-900 text-white rounded-full
   - MUST use: font-quicksand font-semibold
   - MUST use spring animation: whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
   - transition: type: 'spring', stiffness: 400, damping: 17
   - Commit: 'feat: add social login buttons component'

6. CREATE LOGIN PAGE (DESIGN-CRITICAL)
   - src/app/login/page.tsx
   - Server component, checks auth (redirect if logged in)
   - MUST use: bg-cream (#FFFBF5) for page background
   - HEADLINE: "Let Mama handle it" (font-titan text-4xl md:text-5xl text-zinc-900)
   - SUBHEADLINE: "Sign up and never make an awkward phone call again." (font-quicksand text-zinc-600)
   - White card: bg-white rounded-2xl p-8 shadow-sm
   - Commit: 'feat: add login page with social auth'

COMPLETION CRITERIA:
- All 6 files created with correct code
- All 6 commits made
- npm run build passes without errors
- Login page renders at /login
- DESIGN CHECK: No Inter/Roboto/Arial fonts, uses rose palette, pill buttons

Read the FULL implementation code from: docs/plans/2026-01-10-signup-onboarding-execution.md

After each task:
1. Read the task section from the plan file
2. For UI tasks (5,6): Read ~/.claude/skills/mama-frontend/SKILL.md first
3. Implement exactly as specified with correct design tokens
4. Commit with the specified message
5. Move to next task

When ALL tasks complete and build passes, output: <promise>COMPLETE</promise>" --completion-promise "COMPLETE" --max-iterations 30
```

---

## RALPH LOOP: Task 7 (Database Schema)

Run this in **Tab 2**:

```bash
/ralph-loop "You are creating the database schema for MAMA signup flow.

PROJECT: /Users/andresmartinez/Projects/mama-landing
PLAN: docs/plans/2026-01-10-signup-onboarding-execution.md

TASK: Create SQL schema file

CREATE FILE: docs/database/schema.sql

CONTENTS:
1. profiles table
   - id UUID (FK to auth.users, PK)
   - name TEXT
   - age_range TEXT (CHECK: '18-24', '25-30', '31-40', '40+')
   - location TEXT
   - created_at, updated_at TIMESTAMPTZ
   - Enable RLS
   - Policies: users can SELECT/INSERT/UPDATE own row

2. user_preferences table
   - id UUID (PK)
   - user_id UUID (FK to profiles)
   - use_cases TEXT[]
   - frequency TEXT (CHECK: 'daily', 'weekly', 'monthly', 'occasionally')
   - persistence INT (1-5)
   - flexibility TEXT (CHECK: 'strict', 'somewhat', 'flexible')
   - agency INT (1-3)
   - phone TEXT
   - onboarding_completed BOOLEAN
   - created_at, updated_at TIMESTAMPTZ
   - Enable RLS
   - Policies: users can SELECT/INSERT/UPDATE own row

3. handle_new_user() trigger function
   - Creates profile row on auth.users insert
   - Creates user_preferences row
   - Extracts name from raw_user_meta_data

4. Trigger on auth.users AFTER INSERT

Read FULL SQL from: docs/plans/2026-01-10-signup-onboarding-execution.md (Task 7)

COMPLETION CRITERIA:
- docs/database/schema.sql exists
- Contains all tables, RLS, policies, trigger
- Committed: 'docs: add database schema SQL'

When complete, output: <promise>COMPLETE</promise>" --completion-promise "COMPLETE" --max-iterations 10
```

---

## RALPH LOOP: Tasks 8-9 (Types & Context)

Run this in **Tab 2** (after Task 7 completes):

```bash
/ralph-loop "You are creating TypeScript types and React context for MAMA onboarding.

PROJECT: /Users/andresmartinez/Projects/mama-landing
PLAN: docs/plans/2026-01-10-signup-onboarding-execution.md

TASKS TO COMPLETE:

TASK 8: CREATE ONBOARDING TYPES
File: src/types/onboarding.ts

Include:
- Profile interface (id, name, age_range, location, timestamps)
- UserPreferences interface (all fields from DB)
- OnboardingState interface
- USE_CASE_OPTIONS array:
  - dentist 🦷, restaurant 🍽️, doctor 🏥, utilities 💡
  - landlord 🏠, customer_service 📞, government 🏛️, other ✨
- FREQUENCY_OPTIONS array (daily, weekly, monthly, occasionally)
- FLEXIBILITY_OPTIONS array with descriptions
- AGENCY_OPTIONS array with descriptions (1-3)

Commit: 'feat: add onboarding types and options'

TASK 9: CREATE ONBOARDING CONTEXT
File: src/context/OnboardingContext.tsx

Include:
- 'use client' directive
- OnboardingProvider with initialState prop
- State: { profile, preferences }
- updateProfile(data) function
- updatePreferences(data) function
- useOnboarding() hook with error if outside provider
- Default preferences: use_cases=[], persistence=3, flexibility='somewhat', agency=2

Commit: 'feat: add onboarding context for state management'

Read FULL code from: docs/plans/2026-01-10-signup-onboarding-execution.md (Tasks 8-9)

COMPLETION CRITERIA:
- Both files created with correct TypeScript
- Both commits made
- npm run build passes
- No TypeScript errors

When complete, output: <promise>COMPLETE</promise>" --completion-promise "COMPLETE" --max-iterations 15
```

---

## RALPH LOOP: Tasks 10-18 (UI Components & Pages)

Run this in **Tab 3**:

```bash
/ralph-loop "You are building the onboarding UI for MAMA signup flow.

PROJECT: /Users/andresmartinez/Projects/mama-landing
PLAN: docs/plans/2026-01-10-signup-onboarding-execution.md
COPY REFERENCE: docs/plans/signup-copy-design-refs.md

## CRITICAL: DESIGN SYSTEM
FIRST: Use the Skill tool to invoke 'mama-frontend' skill for design guidelines.
SKILL FILE: ~/.claude/skills/mama-frontend/SKILL.md
REFERENCE: ~/.claude/skills/mama-frontend/references/details.md

## MANDATORY DESIGN TOKENS
COLORS: rose-400 primary, rose-300 hover, rose-50 light bg, cream (#FFFBF5) page bg
TYPOGRAPHY: font-titan (headlines) font-quicksand (body) - NEVER Inter/Roboto/Arial
BUTTONS: rounded-full, spring animation (stiffness: 400, damping: 17)
INPUTS: rounded-xl, border-zinc-200, focus:border-rose-400 focus:ring-rose-100

## SELECTION BUTTONS (CRITICAL)
Reference: Landing page pill buttons in DualCarousel component
- Pill shape (rounded-2xl) with OpenMoji icon + text
- Spring press feedback: whileTap={{ scale: 0.98 }}
- Selected state: bg-rose-400 text-white OR border-2 border-rose-400
- Transition: type: 'spring', stiffness: 400, damping: 17

## SPLIT SCREEN LAYOUT
- NO divider line between left and right panels
- Left: Jetsons console (hidden on mobile)
- Right: Clean form with headline + inputs
- Continue button centered at bottom

## ICONS
Use OpenMoji SVGs from /public/icons/openmoji/:
- tooth.svg, fork-knife-plate.svg, hospital.svg, telephone.svg
- house.svg, lightning.svg, bank.svg

## COPYWRITING (USE EXACTLY)

VOICE: Sassy mom who handles business

STEP 1 - ABOUT YOU:
- Headline: 'A little about you'
- Subheadline: 'Just the basics. I'm not nosy... okay maybe a little.'

STEP 2 - WHAT CALLS:
- Headline: 'The dreaded calls list'
- Subheadline: 'Be honest. I won't judge.'

STEP 3 - MAMA'S STYLE:
- Headline: 'What's my vibe?'
- Subheadline: 'Tune me up.'

STEP 4 - PHONE:
- Headline: 'Where should I reach you?'
- Subheadline: 'I'll text you when I'm ready to start making calls.'

DONE PAGE:
- Headline: 'Consider it handled'
- Subheadline: 'Relax. I've got this from here.'

CONSOLE HEADER: 'MAMA CONFIGURATION'

## TASKS TO COMPLETE

TASK 10: JETSONS CONSOLE COMPONENT (DESIGN-CRITICAL)
File: src/components/onboarding/JetsonsConsole.tsx
- Header: 'MAMA CONFIGURATION'
- Sections: OPERATOR (name/age/city), CALL TYPES (checkboxes), PERSONALITY (dials), UPLINK (phone)
- Retro-futuristic with animated lights, progress bars, gauges
- Uses OnboardingContext to read state
- Commit: 'feat: add Jetsons console component with animations'

TASK 11: PROGRESS DOTS COMPONENT
File: src/components/onboarding/ProgressDots.tsx
- Props: total, current
- Animated dots with spring scale on current (rose-400 active, zinc-200 inactive)
- Commit: 'feat: add progress dots component'

TASK 12: ONBOARDING LAYOUT (DESIGN-CRITICAL)
File: src/app/onboarding/layout.tsx
- Server component, checks auth (redirect to /login if not)
- Split screen: NO divider line, JetsonsConsole left (hidden mobile), form right
- bg-cream (#FFFBF5) background
- Wraps children in OnboardingProvider
- Commit: 'feat: add onboarding layout with split screen'

TASK 13: STEP 1 - ABOUT YOU (DESIGN-CRITICAL)
File: src/app/onboarding/about/page.tsx
- Headline: 'A little about you' (font-titan)
- Subheadline: 'Just the basics. I'm not nosy... okay maybe a little.' (font-quicksand text-zinc-600)
- Age range: 4 pill buttons ('18-24', '25-30', '31-40', '40+') with spring press
- Location: text input with placeholder 'City or zip code'
- CTA: 'Continue' button (rounded-full bg-rose-400)
- Commit: 'feat: add onboarding step 1 - about you'

TASK 14: STEP 2 - WHAT CALLS (DESIGN-CRITICAL)
File: src/app/onboarding/calls/page.tsx
- Headline: 'The dreaded calls list' (font-titan)
- Subheadline: 'Be honest. I won't judge.' (font-quicksand text-zinc-600)
- Use cases: Grid of pill buttons with OpenMoji icons, multi-select
- Frequency: 4 options ('Daily', 'Weekly', 'Monthly', 'Occasionally')
- CTA: 'Continue' button
- Commit: 'feat: add onboarding step 2 - what calls'

TASK 15: STEP 3 - MAMA'S STYLE (DESIGN-CRITICAL)
File: src/app/onboarding/style/page.tsx
- Headline: 'What's my vibe?' (font-titan)
- Subheadline: 'Tune me up.' (font-quicksand text-zinc-600)
- Persistence: slider 1-5 with labels ('Chill' to 'Relentless')
- Flexibility: 3 buttons ('Strict', 'Somewhat', 'Flexible') with descriptions
- Agency: 3 buttons with descriptions (Report only, Negotiate+confirm, Full auto)
- CTA: 'Continue' button
- Commit: 'feat: add onboarding step 3 - mamas style'

TASK 16: STEP 4 - PHONE NUMBER (DESIGN-CRITICAL)
File: src/app/onboarding/phone/page.tsx
- Headline: 'Where should I reach you?' (font-titan)
- Subheadline: 'I'll text you when I'm ready to start making calls.' (font-quicksand text-zinc-600)
- Phone input with formatting (xxx) xxx-xxxx
- CTA: 'Complete Setup' button (rounded-full bg-rose-400)
- Commit: 'feat: add onboarding step 4 - phone number'

TASK 17: DONE PAGE (DESIGN-CRITICAL)
File: src/app/onboarding/done/page.tsx
- Headline: 'Consider it handled' (font-titan)
- Subheadline: 'Relax. I've got this from here.' (font-quicksand text-zinc-600)
- Shows phone number they entered
- CTA: 'Tell your friends' button
- Secondary: 'Back to home' link
- Commit: 'feat: add onboarding done page'

TASK 18: ONBOARDING INDEX REDIRECT
File: src/app/onboarding/page.tsx
- Simple redirect to /onboarding/about
- Commit: 'feat: add onboarding index redirect'

## COMPLETION CRITERIA
- All 9 files created
- All 9 commits made
- npm run build passes
- All pages render without errors
- DESIGN CHECK: font-titan headlines, font-quicksand body, rose palette, pill buttons with spring animation
- COPY CHECK: Exact headlines/subheadlines as specified above

Read FULL implementation code from: docs/plans/2026-01-10-signup-onboarding-execution.md

When ALL complete, output: <promise>COMPLETE</promise>" --completion-promise "COMPLETE" --max-iterations 50
```

---

## Parallel Execution Plan

| Tab | Ralph Loop | Tasks | Est. Iterations |
|-----|------------|-------|-----------------|
| Tab 1 | Auth Infrastructure | 1-6 | ~30 |
| Tab 2 | Database + Types | 7, 8-9 | ~25 |
| Tab 3 | UI Components | 10-18 | ~50 |

**Start all 3 tabs simultaneously.** Each operates independently.

---

## Post-Completion Review

After all loops complete, run in any tab:

```bash
/ralph-loop "You are reviewing the complete MAMA signup implementation.

PROJECT: /Users/andresmartinez/Projects/mama-landing
INVOKE SKILL: /mama

REVIEW CHECKLIST:

1. AUTH FLOW
   - /login page renders with Google/Apple buttons
   - OAuth redirects work
   - Session persists

2. DATABASE
   - SQL schema is complete and correct
   - RLS policies protect user data

3. ONBOARDING FLOW
   - All 4 steps work (/about, /calls, /style, /phone)
   - Data saves to Supabase
   - Jetsons console updates in real-time
   - /done page shows confirmation

4. DESIGN COMPLIANCE (mama-frontend)
   - Titan One headlines, Quicksand body
   - Rose palette throughout
   - Full pill buttons with spring animations
   - No generic fonts

5. BUILD & TYPES
   - npm run build passes
   - No TypeScript errors
   - No console warnings

Run: npm run build
Run: npm run lint

Report any issues found. If all checks pass, output: <promise>REVIEW-COMPLETE</promise>" --completion-promise "REVIEW-COMPLETE" --max-iterations 10
```

---

## Quick Start

**Terminal 1:**
```bash
cd /Users/andresmartinez/Projects/mama-landing
# Paste Tasks 1-6 Ralph loop
```

**Terminal 2:**
```bash
cd /Users/andresmartinez/Projects/mama-landing
# Paste Task 7 Ralph loop, then Tasks 8-9 after
```

**Terminal 3:**
```bash
cd /Users/andresmartinez/Projects/mama-landing
# Paste Tasks 10-18 Ralph loop
```

All three can run in parallel. They'll iterate until complete.
