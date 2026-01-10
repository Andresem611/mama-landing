# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mama is a consumer voice AI landing page targeting Gen Z users with phone anxiety. The product makes phone calls on behalf of users (dentist appointments, restaurant reservations, etc.). This repo is the waitlist/landing page only — the voice AI backend is in a separate repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Run production build
npm run lint     # Run ESLint
```

## Tech Stack

- **Next.js 16** (App Router) with React 19 and TypeScript
- **Tailwind CSS 4** with PostCSS
- **Framer Motion** for animations
- **shadcn/ui** components (Radix UI primitives)
- **Supabase** for waitlist storage
- **Resend** for confirmation emails

## Architecture

```
src/
├── app/
│   ├── page.tsx              # Main landing page (assembles sections)
│   ├── layout.tsx            # Root layout with fonts
│   └── api/waitlist/route.ts # Waitlist signup endpoint
├── components/
│   ├── sections/             # Page sections (Hero, UseCases, HowItWorks, FinalCTA, Footer)
│   ├── animations/           # Framer Motion components (WordPullUp, UnderlineDraw, FloatingMessages, DualCarousel)
│   └── ui/                   # shadcn/ui base components
└── lib/
    ├── supabase.ts           # Supabase client
    └── utils.ts              # cn() helper
```

## Design System

- **Colors:** Rose palette (rose-400 `#FB7185` primary), white background, zinc text
- **Typography:** Titan One (display/headlines), Quicksand (body/UI)
- **Buttons:** Full pill shape (`rounded-full`)

## Environment Variables

Copy `.env.example` to `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `RESEND_API_KEY`

## Key Files

- `docs/DESIGN_SPEC.md` — Full design spec with colors, typography, animations, component specs
- `docs/MARKET_RESEARCH.md` — Target audience and positioning research
