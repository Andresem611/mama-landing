---
date: 2026-01-08
tags: [mama, landing-page, frontend, design-spec]
status: ready-to-build
stack-decision: 2026-01-08
---

# Mama Landing Page - Technical Spec

**Status:** DRAFT
**Date:** 2026-01-08

---

## Overview

Landing page for Mama — a consumer voice AI that makes phone calls for Gen Z users who hate making calls.

**Pitch:** "Are you 25 asking your mom to call the dentist? Just download Mama, make her do it for you."

**Target:** Gen Z (18-28) with phone anxiety
**Goal:** Waitlist signups via viral, personality-driven positioning

---

## Design Direction

### Aesthetic

| Element | Choice |
|---------|--------|
| **Vibe** | Hybrid — light background with warm gradient accents |
| **Mascot** | Retro-futuristic 2D mom, Jetsons aesthetic, simple line art |
| **Feel** | Playful, consumer-friendly, not enterprise AI |

### Inspiration

- **Claude.ai** — clean white space, interactive demo feel
- **Jeton.com** — warm coral palette, bold gradient, immersive motion

---

## Page Structure

### Sections (Top to Bottom)

1. **Hero** — Split layout, headline + CTA left, Mama mascot + floating messages right
2. **Use Cases** — Dual carousel (opposite scroll directions)
3. **How It Works** — 3 steps with tagline
4. **Final CTA** — Centered with mini Mama
5. **Footer** — Minimal

---

## Design System

### Color Palette

```css
/* Background */
--white: #FFFFFF;
--gray-50: #FAFAFA;

/* Primary (Rose) */
--rose-400: #FB7185;  /* Main brand color */
--rose-300: #FDA4AF;  /* Hover states */
--rose-600: #E11D48;  /* Active/pressed */

/* Secondary */
--rose-50: #FFF1F2;   /* Light backgrounds */
--rose-100: #FFE4E6;  /* Subtle accents */

/* Text */
--zinc-900: #18181B;  /* Headlines */
--zinc-600: #52525B;  /* Body text */
--zinc-400: #A1A1AA;  /* Muted text */

/* Optional Accent */
--amber-300: #FCD34D; /* Highlights */
```

### Typography

| Element | Font | Size (Desktop) | Size (Mobile) | Weight |
|---------|------|----------------|---------------|--------|
| Display | Titan One | 64-72px | 40px | 400 |
| H1 | Titan One | 48px | 32px | 400 |
| H2 | Titan One | 36px | 28px | 400 |
| H3 | Quicksand | 24px | 20px | 600 |
| Body | Quicksand | 16-18px | 16px | 400-500 |
| Button | Quicksand | 16px | 14px | 600 |
| Caption | Quicksand | 14px | 12px | 400 |

**Font Loading:**
```html
<link href="https://fonts.googleapis.com/css2?family=Titan+One&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Button Styles

**Shape:** Full pill (`border-radius: 9999px`)

| Variant | Background | Text | Border |
|---------|------------|------|--------|
| Primary | rose-400 | white | none |
| Secondary | transparent | rose-400 | 2px rose-400 |

**States:**
```css
/* Primary */
.btn-primary {
  background: var(--rose-400);
  color: white;
  border-radius: 9999px;
  padding: 12px 32px;
  font-family: 'Quicksand', sans-serif;
  font-weight: 600;
}

.btn-primary:hover {
  background: var(--rose-300);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(251, 113, 133, 0.3);
}

.btn-primary:active {
  background: var(--rose-600);
  transform: translateY(0);
}
```

---

## Components

### 1. Hero Section

**Layout:** Split — 50/50 on desktop, stacked on mobile

**Left Side:**
- Headline with Word Pull Up animation
- Hand-drawn underline on "your mom"
- Subheadline (Quicksand)
- CTA button

**Right Side:**
- Mama mascot (centered)
- 4-5 floating messages positioned around mascot

**Headline:**
```
Stop asking
your mom.
~~~~~~~~ (hand-drawn underline animates in)
```

### 2. Floating Messages Component

**Messages (examples):**
- "You're 25, you can call the dentist yourself"
- "Who's calling the restaurant?"
- "Can you please make this call? I get shy"
- "Mom, can you schedule my appointment?"
- "I'll do it tomorrow..." (never does)

**Positioning:**
```
        [Message 1 - top]
              ↓
[Msg 2]    [MAMA]    [Msg 3]
              ↓
        [Message 4 - bottom]
```

**Animation Pattern (Framer Motion):**
```tsx
import { animate, stagger } from "framer-motion"

const messages = [
  "You're 25, you can call the dentist yourself",
  "Who's calling the restaurant?",
  "Can you please make this call? I get shy",
  "Mom, can you schedule my appointment?",
]

useEffect(() => {
  const sequence = messages.map((_, index) => [
    `.message-${index}`,
    {
      opacity: [0.35, 1, 0.35],
      scale: [1, 1.02, 1],
      color: ["var(--zinc-400)", "var(--rose-600)", "var(--zinc-400)"]
    },
    { duration: 2.5 },
  ])

  animate(sequence, {
    repeat: Infinity,
  })
}, [])
```

**Styling:**
```css
.floating-message {
  font-family: 'Quicksand', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: var(--zinc-400);
  background: var(--rose-50);
  padding: 8px 16px;
  border-radius: 12px;
  position: absolute;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.floating-message.active {
  color: var(--rose-600);
  background: var(--rose-100);
  transform: scale(1.02);
}
```

### 3. Dual Carousel (Use Cases)

**Structure:**
- Top row: scrolls RIGHT continuously
- Bottom row: scrolls LEFT continuously
- ~30s per full cycle
- Pause on hover

**Content:** Use case cards showing what calls Mama makes
- Dentist appointments
- Restaurant reservations
- Doctor's office
- Customer service
- Landlord calls
- Utilities
- etc.

**Animation:**
```tsx
// Top row - scrolls right
<motion.div
  animate={{ x: ['0%', '-50%'] }}
  transition={{
    duration: 30,
    repeat: Infinity,
    ease: 'linear'
  }}
>
  {[...useCases, ...useCases].map(card => <Card />)}
</motion.div>

// Bottom row - scrolls left
<motion.div
  animate={{ x: ['-50%', '0%'] }}
  transition={{
    duration: 30,
    repeat: Infinity,
    ease: 'linear'
  }}
>
  {[...useCases, ...useCases].map(card => <Card />)}
</motion.div>
```

### 4. How It Works

**Steps:**
1. **Sign up** — Join the waitlist
2. **Text through WhatsApp** — Tell Mama what call to make
3. **Don't worry about calls** — Mama handles it

**Tagline:** "Embarrassing? Sure. But better than calling your mom."

**Animation:** Scroll-triggered reveal using Intersection Observer
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, delay: index * 0.2 }}
>
```

### 5. Final CTA

**Layout:** Centered
- Mini Mama mascot (smaller version)
- Headline: "Ready to stop calling?"
- CTA button: "Join the Waitlist"
- Optional: "No spam. Just less phone anxiety."

### 6. Footer

**Minimal:**
- Logo
- Copyright
- Social links (optional)

---

## Animation System

### Summary

| Element | Animation | Trigger | Library |
|---------|-----------|---------|---------|
| Headline | Word Pull Up | Page load | Framer Motion |
| Underline | SVG path draw | After headline | Framer Motion |
| Floating Messages | Opacity cycle | Continuous | Framer Motion animate() |
| Mama Mascot | Subtle idle float | Continuous | CSS keyframes |
| Dual Carousel | Infinite scroll | Continuous | Framer Motion |
| How It Works | Fade + slide up | Scroll into view | Framer Motion |
| Buttons | Spring hover/tap | Interaction | Framer Motion |

### Word Pull Up Implementation

```tsx
import { motion } from "framer-motion"

const WordPullUp = ({ words, className }) => {
  const wordArray = words.split(" ")

  return (
    <div className={className}>
      {wordArray.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: i * 0.15,
            ease: [0.2, 0.65, 0.3, 0.9]
          }}
          className="inline-block mr-3"
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}
```

### Hand-Drawn Underline

```tsx
const UnderlineDraw = () => (
  <motion.svg
    viewBox="0 0 200 20"
    className="absolute -bottom-2 left-0 w-full"
  >
    <motion.path
      d="M0 10 Q50 0, 100 10 T200 10"
      stroke="var(--rose-400)"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{
        duration: 0.8,
        delay: 1.2, // after headline finishes
        ease: "easeOut"
      }}
    />
  </motion.svg>
)
```

### Button Spring

```tsx
const buttonVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -2,
    boxShadow: "0 8px 20px rgba(251, 113, 133, 0.3)",
    transition: { type: "spring", stiffness: 400, damping: 17 }
  },
  tap: {
    scale: 0.98,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 17 }
  }
}

<motion.button
  variants={buttonVariants}
  initial="rest"
  whileHover="hover"
  whileTap="tap"
/>
```

---

## Technical Stack (Finalized 2026-01-08)

| Layer | Technology | Why |
|-------|------------|-----|
| **Framework** | Next.js 15 (App Router) | Latest, best DX, server components |
| **Components** | shadcn/ui | Copy-paste ownership, built on Radix, Tailwind-based |
| **Styling** | Tailwind CSS | Pairs with shadcn, utility-first |
| **Animation** | Motion (Framer Motion) | Best React integration, declarative API |
| **Waitlist** | Supabase | Free tier, simple table, expandable for backend |
| **Email** | Resend | Clean API, works with Supabase |
| **Fonts** | Google Fonts (Titan One, Quicksand) | Brand typography |
| **Deployment** | Vercel | Zero-config for Next.js |
| **Analytics** | PostHog (optional) | Privacy-friendly |

### Architecture Notes

- **Separate repos** — Frontend (landing/waitlist) separate from backend (voice AI)
- **Friend builds backend** — Twilio/voice services, will integrate later
- **Waitlist flow:** Form → Supabase table → Resend confirmation email

---

## Responsive Breakpoints

```css
/* Mobile first */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

**Hero:**
- Mobile: Stacked (mascot on top, content below)
- Desktop: Split 50/50

**Floating Messages:**
- Mobile: 2-3 messages only, smaller text
- Desktop: All 4-5 messages

---

## Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "framer-motion": "^11.0.0",
    "tailwindcss": "^3.4.0"
  }
}
```

---

## Project Structure

```
mama-landing/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, fonts, metadata
│   │   ├── page.tsx            # Landing page (assembles sections)
│   │   ├── globals.css         # Tailwind imports, CSS vars
│   │   └── api/
│   │       └── waitlist/
│   │           └── route.ts    # Waitlist API endpoint
│   ├── components/
│   │   ├── ui/                 # shadcn/ui base components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   ├── sections/           # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── UseCases.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── FinalCTA.tsx
│   │   │   └── Footer.tsx
│   │   └── animations/         # Animation components
│   │       ├── WordPullUp.tsx
│   │       ├── UnderlineDraw.tsx
│   │       ├── FloatingMessages.tsx
│   │       └── DualCarousel.tsx
│   └── lib/
│       ├── utils.ts            # cn() helper, utilities
│       └── supabase.ts         # Supabase client
├── public/
│   ├── mama-mascot.svg
│   └── fonts/                  # Local fonts if needed
├── components.json             # shadcn/ui config
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── .env.local                  # SUPABASE_URL, SUPABASE_ANON_KEY, RESEND_API_KEY
```

---

## Next Steps

1. [ ] Design Mama mascot illustration (Jetsons style)
2. [ ] Set up Next.js project with Tailwind
3. [ ] Build Hero component with animations
4. [ ] Build FloatingMessages component
5. [ ] Build DualCarousel component
6. [ ] Build HowItWorks section
7. [ ] Build FinalCTA and Footer
8. [ ] Add waitlist form integration (e.g., Loops, Resend)
9. [ ] Test responsive design
10. [ ] Deploy to Vercel

---

## Sources

- 21st.dev components: WordPullUp, Feature Block Animated Card (animation pattern)
- Inspiration: Claude.ai, Jeton.com
- Market research: Mama - Market Research.md
