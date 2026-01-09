# Mama Landing Page Redesign Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign the landing page to match Jeton's immersive style with proper Mama mascot integration, spread-out message bubbles, and polished motion design.

**Architecture:** Update existing components to follow Jeton reference, integrate actual Mama mascot SVG, use OpenMoji for carousel and Corgi-style illustrations for How It Works.

**Tech Stack:** Next.js 15, Tailwind CSS, Framer Motion, OpenMoji icons, custom SVG illustrations

---

## Reference Assets

| Asset | Source | Usage |
|-------|--------|-------|
| Jeton hero | Image reference | Full-bleed gradient hero layout |
| Mama mascot | SVG line art | Hero section, Final CTA |
| OpenMoji | https://openmoji.org | Carousel use case icons |
| Corgi-style | Image 6 reference | How It Works illustrations |

---

## Design Changes Summary

### Hero Section (Major Redesign)

**Current Issues:**
- Split 50/50 layout doesn't match Jeton's immersive feel
- Using emoji instead of actual Mama mascot
- Message bubbles too clustered around mascot
- Missing hand-drawn underline
- CTA says "Join Waitlist" instead of "Join MAMA"

**New Design:**
- Full-viewport rose gradient background (like Jeton's coral)
- Headline "Stop asking your mom." bottom-left with WordPullUp
- Hand-drawn underline on "your mom" with SVG animation
- CTA + description on right side
- Mama mascot large, floating with subtle animation
- Message bubbles spread across entire viewport (corners, edges)
- CTA button: "Join MAMA" with spring animation

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│  [Logo: Mama]                                       │
│                                                     │
│  [Bubble: top-left]           [Bubble: top-right]  │
│                                                     │
│              [MAMA MASCOT - large]                  │
│                                                     │
│  [Bubble: left]               [Bubble: right]      │
│                                                     │
│  Stop asking                  AI that makes calls  │
│  your mom.                    you hate.            │
│  ~~~~~~~~~                                         │
│                               [Email] [Join MAMA]  │
│                                                    │
│  [Bubble: bottom-left]        [Bubble: btm-right] │
└─────────────────────────────────────────────────────┘
```

### Use Cases Carousel (Polish)

**Changes:**
- Replace emoji with OpenMoji icons
- Add subtle texture/grain to cards
- Keep dual-carousel motion
- Slightly larger cards with more padding

**OpenMoji Icons to Use:**
- 🦷 Tooth → dentist
- 🍽️ Fork and knife → restaurant
- 🏥 Hospital → doctor
- 📞 Telephone → customer service
- 🏠 House → landlord
- ⚡ Lightning → utilities
- 💇 Haircut → salon
- 🔧 Wrench → repairs

### How It Works (Visual Upgrade)

**Changes:**
- Replace emoji with Corgi-style illustrations
- Hand-drawn, vintage black & white style
- Halftone texture effect
- Keep scroll-triggered reveal animation

**Illustrations needed:**
1. Step 1: Signing up (hand writing on paper)
2. Step 2: Texting (vintage phone with chat bubble)
3. Step 3: Relaxing (person in hammock or lounging)

### Final CTA & Footer

**Changes:**
- Use Mama mascot SVG (smaller version)
- Rose-50 background with subtle gradient
- "Join MAMA" button

---

## Implementation Tasks

### Phase 1: Assets & Setup

**Task 1: Add Mama mascot SVG**
- Convert line art to optimized SVG
- Create component with idle animation
- Save to `public/mama-mascot.svg`

**Task 2: Download OpenMoji icons**
- Download needed icons as SVG
- Save to `public/icons/openmoji/`

### Phase 2: Hero Redesign

**Task 3: Update Hero layout**
- Full-viewport gradient background
- Reposition headline to bottom-left
- Add CTA group to right side
- Change button text to "Join MAMA"

**Task 4: Add UnderlineDraw to Hero**
- Wire up the existing UnderlineDraw component
- Position under "your mom"
- Trigger after WordPullUp completes

**Task 5: Redesign FloatingMessages**
- Spread across full viewport
- Position at corners and edges
- Reduce to 4-5 messages
- Add subtle parallax on scroll

**Task 6: Integrate Mama mascot**
- Add SVG to hero
- Center with subtle float animation
- Size appropriately (40-50% viewport height)

### Phase 3: Carousel & How It Works

**Task 7: Update DualCarousel**
- Replace emoji with OpenMoji SVGs
- Add texture/grain effect to cards
- Increase card padding

**Task 8: Update HowItWorks**
- Create placeholder for Corgi-style illustrations
- Update card styling to match reference
- Add halftone texture effect

### Phase 4: Polish

**Task 9: Add missing animations**
- Review design spec for motion requirements
- Check 21st.dev for components
- Add any missing transitions

**Task 10: Final CTA update**
- Use Mama mascot SVG
- Update button text

---

## File Changes

| File | Action |
|------|--------|
| `public/mama-mascot.svg` | Create |
| `public/icons/openmoji/*.svg` | Create |
| `src/components/sections/Hero.tsx` | Major rewrite |
| `src/components/animations/FloatingMessages.tsx` | Update positions |
| `src/components/animations/DualCarousel.tsx` | Update icons + texture |
| `src/components/sections/HowItWorks.tsx` | Update illustrations |
| `src/components/sections/FinalCTA.tsx` | Update mascot + CTA |

---

## Success Criteria

- [ ] Hero matches Jeton's immersive gradient feel
- [ ] Mama mascot SVG integrated and animated
- [ ] Message bubbles spread across viewport
- [ ] Hand-drawn underline animates after headline
- [ ] CTA says "Join MAMA"
- [ ] OpenMoji icons in carousel
- [ ] Cards have subtle texture
- [ ] All animations from design spec implemented
