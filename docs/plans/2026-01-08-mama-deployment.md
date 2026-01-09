# Mama Landing Page - Deployment Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Complete Mama landing page with updated mascot, Supabase waitlist storage, and deploy to Vercel.

**Architecture:** Update mascot SVG to Jetsons-style with cat-eye glasses and corded phone. Set up Supabase for waitlist email storage. Create GitHub repo and deploy to Vercel with environment variables.

**Tech Stack:** Next.js 15, Supabase, Vercel, GitHub CLI

---

## Task 1: Update Mama Mascot SVG (Cat-Eye Glasses + Corded Phone)

**Files:**
- Modify: `/Users/andresmartinez/Desktop/mama-landing/public/mama-mascot.svg`

**Step 1: Update the mascot SVG**

Replace the current mascot with Jetsons-style design featuring:
- Cat-eye glasses (the current SVG lacks glasses)
- Corded telephone receiver (current has mobile phone)
- Keep: bouffant hair, earrings, dress, hand-on-hip pose

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" fill="none">
  <!-- Mama Mascot: Jetsons-style with cat-eye glasses and corded phone -->

  <!-- Hair - Bouffant retro style -->
  <path
    d="M60 85 C40 60 50 25 100 20 C150 15 165 55 145 85 C160 70 170 45 155 25 C140 5 60 0 45 35 C30 70 45 95 60 85 Z"
    stroke="#18181B"
    stroke-width="3"
    stroke-linecap="round"
    stroke-linejoin="round"
    fill="none"
  />

  <!-- Hair details / waves -->
  <path d="M55 45 Q70 35 85 50" stroke="#18181B" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M115 35 Q130 30 140 45" stroke="#18181B" stroke-width="2" stroke-linecap="round" fill="none"/>

  <!-- Face outline -->
  <ellipse cx="100" cy="100" rx="42" ry="48" stroke="#18181B" stroke-width="3" fill="none"/>

  <!-- Cat-Eye Glasses Frame -->
  <path
    d="M60 92 L65 88 Q82 85 92 92 L92 102 Q82 108 65 105 L60 100 Z"
    stroke="#18181B"
    stroke-width="2.5"
    fill="none"
  />
  <path
    d="M108 92 Q118 85 135 88 L140 92 L140 100 L135 105 Q118 108 108 102 Z"
    stroke="#18181B"
    stroke-width="2.5"
    fill="none"
  />
  <!-- Glasses bridge -->
  <path d="M92 97 L108 97" stroke="#18181B" stroke-width="2" stroke-linecap="round"/>
  <!-- Cat-eye wing tips -->
  <path d="M60 92 L52 86" stroke="#18181B" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M140 92 L148 86" stroke="#18181B" stroke-width="2.5" stroke-linecap="round"/>

  <!-- Eyes behind glasses -->
  <ellipse cx="78" cy="97" rx="6" ry="7" stroke="#18181B" stroke-width="2" fill="none"/>
  <ellipse cx="122" cy="97" rx="6" ry="7" stroke="#18181B" stroke-width="2" fill="none"/>

  <!-- Pupils -->
  <circle cx="80" cy="98" r="3" fill="#18181B"/>
  <circle cx="124" cy="98" r="3" fill="#18181B"/>

  <!-- Eye shine -->
  <circle cx="81" cy="96" r="1" fill="white"/>
  <circle cx="125" cy="96" r="1" fill="white"/>

  <!-- Eyebrows - above glasses -->
  <path d="M62 82 Q78 76 92 82" stroke="#18181B" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M108 82 Q122 76 138 82" stroke="#18181B" stroke-width="2.5" stroke-linecap="round" fill="none"/>

  <!-- Nose -->
  <path d="M100 105 L100 115 Q100 119 96 121" stroke="#18181B" stroke-width="2" stroke-linecap="round" fill="none"/>

  <!-- Smile -->
  <path d="M85 130 Q100 144 115 130" stroke="#18181B" stroke-width="2.5" stroke-linecap="round" fill="none"/>

  <!-- Cheek blush -->
  <circle cx="65" cy="118" r="7" fill="#FDA4AF" opacity="0.6"/>
  <circle cx="135" cy="118" r="7" fill="#FDA4AF" opacity="0.6"/>

  <!-- Neck -->
  <path d="M88 148 L88 165 M112 148 L112 165" stroke="#18181B" stroke-width="2.5" stroke-linecap="round"/>

  <!-- Collar / Blouse top -->
  <path
    d="M50 175 Q65 160 88 165 L100 172 L112 165 Q135 160 150 175 L155 200 L45 200 Z"
    stroke="#18181B"
    stroke-width="3"
    stroke-linejoin="round"
    fill="none"
  />

  <!-- Collar details -->
  <path d="M88 165 L95 180 L100 172 L105 180 L112 165" stroke="#18181B" stroke-width="2" stroke-linejoin="round" fill="none"/>

  <!-- Body / Dress -->
  <path
    d="M45 200 L35 270 L165 270 L155 200"
    stroke="#18181B"
    stroke-width="3"
    stroke-linejoin="round"
    fill="none"
  />

  <!-- Dress waist detail -->
  <path d="M55 220 Q100 215 145 220" stroke="#18181B" stroke-width="2" stroke-linecap="round" fill="none"/>

  <!-- Left arm (holding corded phone to ear) -->
  <path
    d="M45 200 Q25 210 20 180 Q18 160 30 145 Q40 135 45 140"
    stroke="#18181B"
    stroke-width="3"
    stroke-linecap="round"
    stroke-linejoin="round"
    fill="none"
  />

  <!-- Left hand -->
  <ellipse cx="42" cy="138" rx="10" ry="12" stroke="#18181B" stroke-width="2.5" fill="none"/>

  <!-- Corded Phone Handset (retro style) -->
  <!-- Earpiece (top) -->
  <ellipse cx="42" cy="110" rx="12" ry="8" stroke="#18181B" stroke-width="2.5" fill="none"/>
  <!-- Handle (middle) -->
  <rect x="38" y="118" width="8" height="25" rx="2" stroke="#18181B" stroke-width="2" fill="none"/>
  <!-- Mouthpiece (bottom) -->
  <ellipse cx="42" cy="150" rx="12" ry="8" stroke="#18181B" stroke-width="2.5" fill="none"/>
  <!-- Cord (spiral) -->
  <path
    d="M30 150 Q20 155 25 165 Q30 175 20 180 Q10 185 15 195 Q20 205 10 210"
    stroke="#18181B"
    stroke-width="2"
    stroke-linecap="round"
    fill="none"
  />

  <!-- Phone signal waves (from earpiece) -->
  <path d="M56 105 Q62 100 56 95" stroke="#FB7185" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M62 108 Q72 100 62 92" stroke="#FB7185" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M68 112 Q82 100 68 88" stroke="#FB7185" stroke-width="2" stroke-linecap="round" fill="none"/>

  <!-- Right arm (hand on hip) -->
  <path
    d="M155 200 Q175 210 180 230 Q185 250 175 260"
    stroke="#18181B"
    stroke-width="3"
    stroke-linecap="round"
    stroke-linejoin="round"
    fill="none"
  />

  <!-- Right hand on hip -->
  <ellipse cx="160" cy="235" rx="10" ry="8" stroke="#18181B" stroke-width="2.5" fill="none"/>

  <!-- Earrings -->
  <circle cx="56" cy="115" r="5" stroke="#FCD34D" stroke-width="2" fill="none"/>
  <circle cx="144" cy="115" r="5" stroke="#FCD34D" stroke-width="2" fill="none"/>

  <!-- Pearl necklace -->
  <circle cx="85" cy="168" r="3" stroke="#18181B" stroke-width="1.5" fill="none"/>
  <circle cx="100" cy="172" r="3" stroke="#18181B" stroke-width="1.5" fill="none"/>
  <circle cx="115" cy="168" r="3" stroke="#18181B" stroke-width="1.5" fill="none"/>
</svg>
```

**Step 2: Verify mascot renders**

Run: Open http://localhost:3000 in browser
Expected: Mascot shows with cat-eye glasses and corded telephone

**Step 3: Commit**

```bash
cd /Users/andresmartinez/Desktop/mama-landing
git add public/mama-mascot.svg
git commit -m "feat: update mascot with cat-eye glasses and corded phone"
```

---

## Task 2: Create GitHub Repository

**Files:**
- None (CLI operations only)

**Step 1: Initialize git if needed and create GitHub repo**

```bash
cd /Users/andresmartinez/Desktop/mama-landing
git status  # Check current state
gh repo create mama-landing --public --source=. --remote=origin --push
```

Expected: Repository created at github.com/[username]/mama-landing

**Step 2: Verify repo exists**

```bash
gh repo view --web
```

Expected: Opens GitHub repo in browser

---

## Task 3: Set Up Supabase Project

**Files:**
- Create: `/Users/andresmartinez/Desktop/mama-landing/.env.local`

**Step 1: Create Supabase project (manual)**

1. Go to https://supabase.com
2. Sign in with GitHub
3. Create new project: "mama-waitlist"
4. Wait for project to provision
5. Copy Project URL and anon key from Settings > API

**Step 2: Create waitlist table in Supabase SQL Editor**

```sql
-- Create waitlist table
CREATE TABLE waitlist (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for waitlist form)
CREATE POLICY "Allow anonymous inserts" ON waitlist
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow reading own row (optional, for "already signed up" check)
CREATE POLICY "Allow reading by email" ON waitlist
  FOR SELECT TO anon
  USING (true);
```

**Step 3: Create .env.local with Supabase credentials**

```bash
cat > /Users/andresmartinez/Desktop/mama-landing/.env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
EOF
```

**Step 4: Verify Supabase lib exists**

Check that `/Users/andresmartinez/Desktop/mama-landing/src/lib/supabase.ts` exists:

```typescript
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

If not, create it.

**Step 5: Test waitlist submission locally**

1. Restart dev server: `npm run dev`
2. Go to http://localhost:3000
3. Enter email in waitlist form
4. Submit and check Supabase dashboard for new row

---

## Task 4: Deploy to Vercel

**Files:**
- None (CLI operations)

**Step 1: Install Vercel CLI if needed**

```bash
npm i -g vercel
```

**Step 2: Deploy to Vercel**

```bash
cd /Users/andresmartinez/Desktop/mama-landing
vercel --prod
```

Follow prompts:
- Link to existing project? No
- Project name: mama-landing
- Directory: ./
- Override settings? No

**Step 3: Add environment variables in Vercel**

1. Go to Vercel dashboard > mama-landing > Settings > Environment Variables
2. Add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key

**Step 4: Redeploy with environment variables**

```bash
vercel --prod
```

**Step 5: Verify production deployment**

1. Visit the Vercel URL
2. Test waitlist form submission
3. Verify email appears in Supabase

---

## Verification Checklist

After completing all tasks:

- [ ] Mascot displays with cat-eye glasses and corded phone
- [ ] GitHub repo exists with all code pushed
- [ ] Supabase project created with waitlist table
- [ ] .env.local has correct Supabase credentials
- [ ] Vercel deployment live with environment variables
- [ ] Waitlist form submits successfully to Supabase

---

## Notes

- Supabase setup requires GitHub login (manual step)
- Keep .env.local out of git (should already be in .gitignore)
- Vercel will auto-deploy on git push after initial setup
