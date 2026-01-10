# Signup & Onboarding Flow Design

**Date:** 2026-01-10
**Status:** Planning

---

## Overview

Build a signup flow that creates real user accounts while collecting product research data through an engaging onboarding experience. Users "wire up" their personal Mama AI by configuring preferences.

**Goals:**
- Create early access accounts (ready for launch)
- Collect user preferences to inform product decisions
- Engaging, on-brand experience that feels like configuring an AI

---

## Decisions

### Auth System
- [ ] **Supabase Auth** — Already using Supabase, single source of truth
- [ ] **Social login:** Google + Apple
- [ ] No email/password (social only for Gen Z simplicity)

### Onboarding Flow (4 steps after auth)

| Step | Screen | Data Collected |
|------|--------|----------------|
| 1 | Sign Up | Google/Apple OAuth |
| 2 | About You | Age range, location |
| 3 | What Calls? | Use cases (multi-select), frequency |
| 4 | Mama's Style | Persistence, flexibility, agency level |
| 5 | Phone Number | Phone (for waitlist text notification) |
| 6 | Done | Confirmation + optional share CTA |

### Layout Design
- [ ] **Split screen:** Console left, form right
- [ ] **Left side:** Jetsons-style control panel that fills in as user progresses
- [ ] **Right side:** Form inputs with progress indicator
- [ ] **Concept:** "Wiring up Mama" — configuring your personal AI

### Console Visual Zones

```
╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
│   ◉ ◉ ◉    M A M A    ◉ ◉ ◉      │
│          CONFIGURATION            │
├───────────────────────────────────┤
│  OPERATOR        │  CALL TYPES    │
│  Name: ___       │  ☐ Dentist     │
│  Age:  ___       │  ☐ Restaurant  │
│  City: ___       │  ☐ Doctor      │
├───────────────────────────────────┤
│         PERSONALITY               │
│  PERSISTENCE: ○━━━●━━━○           │
│  FLEXIBILITY: ○━━●━━━━○           │
│  AGENCY:      [ 2 / 3 ]           │
├───────────────────────────────────┤
│  📞 UPLINK: ___ ___ ____          │
│     (Mama will text here)         │
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
```

---

## Data Schema

### `profiles` table (extends Supabase auth.users)

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | FK to auth.users |
| name | text | Display name |
| age_range | text | '18-24', '25-30', '31-40', '40+' |
| location | text | City/state or timezone |
| created_at | timestamp | |

### `user_preferences` table

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | PK |
| user_id | uuid | FK to profiles |
| use_cases | text[] | Array: dentist, restaurant, doctor, utilities, etc. |
| frequency | text | 'daily', 'weekly', 'monthly', 'occasionally' |
| persistence | int | 1-5 scale (1=chill, 5=pushy) |
| flexibility | text | 'strict', 'somewhat', 'flexible' |
| agency | int | 1-3 (1=report only, 2=negotiate+confirm, 3=full auto) |
| phone | text | Phone number for waitlist notification |
| created_at | timestamp | |
| updated_at | timestamp | |

---

## Implementation Checklist

### Phase 1: Auth Setup
- [ ] Install Supabase Auth dependencies
- [ ] Configure Google OAuth provider in Supabase dashboard
- [ ] Configure Apple OAuth provider in Supabase dashboard
- [ ] Create auth callback route (`/auth/callback`)
- [ ] Create sign-in page with social buttons

### Phase 2: Database
- [ ] Create `profiles` table with RLS policies
- [ ] Create `user_preferences` table with RLS policies
- [ ] Create trigger to auto-create profile on user signup
- [ ] Test RLS policies

### Phase 3: Onboarding UI
- [ ] Create onboarding layout (split screen)
- [ ] Build Jetsons console component (left side)
- [ ] Build step 1: About You form
- [ ] Build step 2: What Calls form
- [ ] Build step 3: Mama's Style form
- [ ] Build step 4: Phone number form
- [ ] Build confirmation/done screen
- [ ] Add progress indicator
- [ ] Wire console animations (fill in as user progresses)

### Phase 4: Integration
- [ ] Connect forms to Supabase (save preferences)
- [ ] Add form validation
- [ ] Handle errors gracefully
- [ ] Test full flow end-to-end

### Phase 5: Polish
- [ ] Mobile responsive (stack on mobile, console hidden or simplified)
- [ ] Loading states
- [ ] Transitions between steps
- [ ] Console micro-animations (dials moving, lights blinking)

---

## Open Questions

- [ ] What happens if user abandons mid-onboarding? Save partial data?
- [ ] Skip option for any steps?
- [ ] Referral/share CTA on confirmation screen?
- [ ] Migrate existing waitlist emails to new system?

---

## File Structure (Proposed)

```
src/
├── app/
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts       # OAuth callback handler
│   ├── login/
│   │   └── page.tsx           # Sign in page
│   ├── onboarding/
│   │   ├── layout.tsx         # Split screen layout
│   │   ├── page.tsx           # Redirect to step 1
│   │   ├── about/
│   │   │   └── page.tsx       # Step 1: About You
│   │   ├── calls/
│   │   │   └── page.tsx       # Step 2: What Calls
│   │   ├── style/
│   │   │   └── page.tsx       # Step 3: Mama's Style
│   │   ├── phone/
│   │   │   └── page.tsx       # Step 4: Phone
│   │   └── done/
│   │       └── page.tsx       # Confirmation
├── components/
│   ├── onboarding/
│   │   ├── JetsonsConsole.tsx # Left side console
│   │   ├── ProgressDots.tsx   # Progress indicator
│   │   └── OnboardingCard.tsx # Right side form container
│   └── auth/
│       └── SocialButtons.tsx  # Google/Apple login buttons
└── lib/
    └── supabase.ts            # Already exists
```

---

## Next Steps

1. Review and finalize this plan
2. Set up Supabase Auth (Phase 1)
3. Create database tables (Phase 2)
4. Build UI components (Phase 3)
