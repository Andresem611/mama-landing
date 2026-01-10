# Unified Split-Console & City Dropdown Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign JetsonsConsole as ONE unified panel with the body split into two columns (left: config data, right: MAMA messages), and replace city text input with a searchable dropdown.

**Architecture:** The console remains a single metallic frame with header/footer, but the body becomes a CSS grid with two columns. Left shows OPERATOR/CALL TYPES/PERSONALITY/UPLINK sections. Right shows animated MAMA message bubbles. City selection uses shadcn Command + Popover (combobox pattern) with predefined cities plus "Other" option.

**Tech Stack:** React, Framer Motion, shadcn/ui (Command, Popover), Tailwind CSS

---

### Task 1: Update Personality Comments for Cities

**Files:**
- Modify: `src/lib/personality.ts:9-22`

**Step 1: Update cityComments with new sarcastic content**

Replace the cityComments object:

```typescript
// City comments - sarcastic but helpful mom energy
const cityComments: Record<string, string> = {
  'new york': "Running late to everything as usual?",
  'nyc': "Running late to everything as usual?",
  'los angeles': "Sitting in traffic right now aren't you",
  'la': "Sitting in traffic right now aren't you",
  'chicago': "Bundle up. You never dress warm enough",
  'houston': "Drinking enough water in that heat?",
  'phoenix': "It's a dry heat. Sure it is",
  'philadelphia': "Still can't parallel park can you",
  'san antonio': "Did you eat yet today",
  'san diego': "Must be nice with that weather",
  'dallas': "Everything really is bigger there huh",
  'austin': "Everyone moved there. It's not special anymore",
  'san jose': "Tech job or just expensive rent?",
  'jacksonville': "I had to look that up",
  'san francisco': "Is your landlord raising rent again?",
  'sf': "Is your landlord raising rent again?",
  'seattle': "You taking your vitamin D?",
  'denver': "The altitude is why you're tired, not your sleep schedule",
  'boston': "Still can't parallel park can you",
  'miami': "I hope this isn't another course seller, OnlyFans, or crypto thing",
  'atlanta': "Traffic there is something else",
  'other': "Okay mystery person",
}
```

**Step 2: Update getCityComment to handle exact matches from dropdown**

The function already handles exact matches, so it should work. No changes needed.

**Step 3: Commit**

```bash
git add src/lib/personality.ts
git commit -m "feat: update city comments with sarcastic mom energy"
```

---

### Task 2: Create CityCombobox Component

**Files:**
- Create: `src/components/onboarding/CityCombobox.tsx`

**Step 1: Create the component file**

```tsx
'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const CITIES = [
  { value: 'new york', label: 'New York' },
  { value: 'los angeles', label: 'Los Angeles' },
  { value: 'chicago', label: 'Chicago' },
  { value: 'houston', label: 'Houston' },
  { value: 'phoenix', label: 'Phoenix' },
  { value: 'philadelphia', label: 'Philadelphia' },
  { value: 'san antonio', label: 'San Antonio' },
  { value: 'san diego', label: 'San Diego' },
  { value: 'dallas', label: 'Dallas' },
  { value: 'austin', label: 'Austin' },
  { value: 'san jose', label: 'San Jose' },
  { value: 'san francisco', label: 'San Francisco' },
  { value: 'seattle', label: 'Seattle' },
  { value: 'denver', label: 'Denver' },
  { value: 'boston', label: 'Boston' },
  { value: 'miami', label: 'Miami' },
  { value: 'atlanta', label: 'Atlanta' },
  { value: 'other', label: 'Other' },
] as const

interface CityComboboxProps {
  value: string
  onValueChange: (value: string) => void
}

export function CityCombobox({ value, onValueChange }: CityComboboxProps) {
  const [open, setOpen] = React.useState(false)

  const selectedCity = CITIES.find((city) => city.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className="w-full flex items-center justify-between bg-white border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 hover:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-400 transition-all"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          <span className={selectedCity ? 'text-zinc-900' : 'text-zinc-400'}>
            {selectedCity?.label ?? 'Select your city...'}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-zinc-400" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
      >
        <Command>
          <CommandInput
            placeholder="Search city..."
            className="h-10"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          />
          <CommandList>
            <CommandEmpty
              className="py-3 text-center text-sm text-zinc-500"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              No city found. Select &quot;Other&quot;.
            </CommandEmpty>
            <CommandGroup>
              {CITIES.map((city) => (
                <CommandItem
                  key={city.value}
                  value={city.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue)
                    setOpen(false)
                  }}
                  className="cursor-pointer"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === city.value ? 'opacity-100 text-rose-500' : 'opacity-0'
                    )}
                  />
                  {city.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
```

**Step 2: Install lucide-react if not present**

```bash
npm list lucide-react || npm install lucide-react
```

**Step 3: Commit**

```bash
git add src/components/onboarding/CityCombobox.tsx
git commit -m "feat: add CityCombobox component with top US cities"
```

---

### Task 3: Update About Page to Use CityCombobox

**Files:**
- Modify: `src/app/onboarding/about/page.tsx`

**Step 1: Replace imports and remove city timeout logic**

Replace lines 1-71 with:

```tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useOnboarding } from '@/context/OnboardingContext'
import { ProgressDots } from '@/components/onboarding/ProgressDots'
import { CityCombobox } from '@/components/onboarding/CityCombobox'
import { createClient } from '@/lib/supabase/client'
import { getCityComment } from '@/lib/personality'

const AGE_OPTIONS = ['18-24', '25-30', '31-40', '40+'] as const

const buttonSpring = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 20
}

// Primary CTA button styles (arcade style matching landing page)
const primaryCtaClasses = `
  relative h-14 px-8 rounded-full
  font-bold text-base
  border-[3px] border-rose-500
  bg-gradient-to-b from-rose-400 to-rose-500 text-white
  shadow-[0_4px_0_0_#be123c,0_6px_12px_rgba(225,29,72,0.4)]
  transition-all duration-150 ease-out
  disabled:opacity-50 disabled:cursor-not-allowed
`

// Selection pill styles (matching DualCarousel)
const selectionPillClasses = {
  base: `py-3 px-4 rounded-2xl font-medium transition-all duration-300`,
  selected: `bg-rose-400 text-white shadow-lg shadow-rose-900/20`,
  unselected: `bg-white/95 text-zinc-600 border-2 border-white/60 shadow-lg shadow-rose-900/10 hover:shadow-xl`,
}

export default function AboutPage() {
  const router = useRouter()
  const { state, updateProfile, addMessage, clearMessages } = useOnboarding()
  const [loading, setLoading] = useState(false)
  const [lastCommentedCity, setLastCommentedCity] = useState<string | null>(null)

  // Clear messages when component mounts
  useEffect(() => {
    clearMessages()
  }, [clearMessages])

  // Handle city selection - immediately show comment
  const handleCityChange = (city: string) => {
    updateProfile({ location: city })

    // Only comment if it's a new city selection
    if (city && city !== lastCommentedCity) {
      const cityComment = getCityComment(city)
      if (cityComment) {
        addMessage(cityComment)
        setLastCommentedCity(city)
      }
    }
  }
```

**Step 2: Update the form section (lines 151-167)**

Replace the location input section with:

```tsx
        {/* Location Dropdown */}
        <div className="space-y-3">
          <label
            className="font-semibold text-zinc-900"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Where are you based?
          </label>
          <CityCombobox
            value={state.profile.location ?? ''}
            onValueChange={handleCityChange}
          />
        </div>
```

**Step 3: Commit**

```bash
git add src/app/onboarding/about/page.tsx
git commit -m "feat: replace city text input with searchable dropdown"
```

---

### Task 4: Redesign JetsonsConsole with Split Body

**Files:**
- Modify: `src/components/onboarding/JetsonsConsole.tsx`

**Step 1: Update the component to have split body layout**

Replace the entire JetsonsConsole function (lines 113-326) with this new implementation that has a unified console with split body:

```tsx
export function JetsonsConsole() {
  const { state, messages } = useOnboarding()
  const { profile, preferences } = state
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll messages when new ones arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Track which sections have data for status lights
  const hasOperatorData = !!(profile.name || profile.age_range || profile.location)
  const hasCallData = (preferences.use_cases?.length ?? 0) > 0
  const hasPersonalityData = !!(preferences.persistence || preferences.flexibility || preferences.agency)
  const hasUplinkData = !!preferences.phone

  const completedSteps = [hasOperatorData, hasCallData, hasPersonalityData, hasUplinkData]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="hidden lg:flex items-center justify-center bg-white p-8"
    >
      <div className="w-full max-w-2xl">
        {/* Console Frame - Metallic 3D Look */}
        <div className="relative">
          {/* Outer metallic frame */}
          <div
            className="rounded-3xl p-1"
            style={{
              background: 'linear-gradient(145deg, #e8e8e8 0%, #a8a8a8 50%, #888888 100%)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5)'
            }}
          >
            {/* Inner bevel */}
            <div
              className="rounded-[22px] p-1"
              style={{
                background: 'linear-gradient(145deg, #d0d0d0 0%, #b8b8b8 50%, #a0a0a0 100%)',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2), inset 0 -1px 2px rgba(255,255,255,0.3)'
              }}
            >
              {/* Screen Container */}
              <div className="relative bg-white rounded-[18px] overflow-hidden">
                {/* Subtle scan lines overlay */}
                <div
                  className="absolute inset-0 pointer-events-none z-20 opacity-[0.02]"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.1) 1px, rgba(0,0,0,0.1) 2px)',
                    backgroundSize: '100% 2px'
                  }}
                />

                {/* Header with Status Lights */}
                <div
                  className="px-6 py-4 flex items-center justify-between relative z-30"
                  style={{
                    background: 'linear-gradient(180deg, #fb7185 0%, #e11d48 100%)',
                    borderBottom: '2px solid rgba(0,0,0,0.1)'
                  }}
                >
                  {/* Status Lights */}
                  <div className="flex gap-2">
                    {completedSteps.map((completed, i) => (
                      <StatusLight key={i} active={completed} index={i} />
                    ))}
                  </div>

                  <span
                    className="text-white text-xs tracking-[0.2em] drop-shadow-md"
                    style={{ fontFamily: "'Righteous', cursive" }}
                  >
                    MAMA CONFIGURATION
                  </span>

                  {/* Decorative screws */}
                  <div className="flex gap-3">
                    <Screw />
                    <Screw />
                  </div>
                </div>

                {/* SPLIT BODY - Two columns */}
                <div className="grid grid-cols-2 relative z-30">
                  {/* LEFT: Configuration Data */}
                  <div className="p-4 space-y-3 border-r border-zinc-100">
                    {/* Operator Section */}
                    <ConsoleSection title="OPERATOR" hasData={hasOperatorData} index={0}>
                      <ConsoleField label="NAME" value={profile.name} />
                      <ConsoleField label="AGE" value={profile.age_range} />
                      <ConsoleField label="CITY" value={profile.location} />
                    </ConsoleSection>

                    {/* Call Types Section */}
                    <ConsoleSection title="CALL TYPES" hasData={hasCallData} index={1}>
                      <div className="grid grid-cols-4 gap-1.5">
                        {USE_CASES.map((option) => (
                          <ConsoleCheckbox
                            key={option.id}
                            icon={option.icon}
                            checked={preferences.use_cases?.includes(option.id) ?? false}
                          />
                        ))}
                      </div>
                    </ConsoleSection>

                    {/* Personality Section */}
                    <ConsoleSection title="PERSONALITY" hasData={hasPersonalityData} index={2}>
                      <div className="flex items-center gap-3">
                        <NeedleGauge
                          value={preferences.persistence ?? 0}
                          max={5}
                          label="PERSIST"
                        />
                        <div className="flex-1 space-y-1.5">
                          <MiniIndicator label="FLEX" value={preferences.flexibility ?? '---'} />
                          <MiniIndicator label="AGENCY" value={preferences.agency ? `LVL ${preferences.agency}` : '---'} />
                        </div>
                      </div>
                    </ConsoleSection>

                    {/* Uplink Section */}
                    <ConsoleSection title="UPLINK" hasData={hasUplinkData} index={3}>
                      <div className="flex items-center gap-3">
                        <SignalIndicator active={hasUplinkData} />
                        <span className="text-zinc-400 text-xs" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                          PHONE:
                        </span>
                        <AnimatePresence mode="wait">
                          {preferences.phone ? (
                            <motion.span
                              key={preferences.phone}
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-rose-500 font-semibold text-xs"
                              style={{ fontFamily: "'Quicksand', sans-serif" }}
                            >
                              {preferences.phone}
                            </motion.span>
                          ) : (
                            <TerminalTyping text="CONNECTING..." typingSpeed={70} />
                          )}
                        </AnimatePresence>
                      </div>
                    </ConsoleSection>
                  </div>

                  {/* RIGHT: MAMA Messages */}
                  <div className="p-4 bg-zinc-50/50 flex flex-col">
                    {/* Messages Header */}
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-zinc-100">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-rose-400 to-rose-500 flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold" style={{ fontFamily: "'Righteous', cursive" }}>
                          M
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-zinc-400 tracking-wider" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                        MAMA SAYS
                      </span>
                      <div className="flex-1" />
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto space-y-2 min-h-[200px] max-h-[280px]">
                      {messages.length === 0 ? (
                        <div className="h-full flex items-center justify-center">
                          <p
                            className="text-xs text-zinc-300 text-center"
                            style={{ fontFamily: "'Quicksand', sans-serif" }}
                          >
                            Fill out the form and<br />I&apos;ll have thoughts...
                          </p>
                        </div>
                      ) : (
                        <AnimatePresence mode="popLayout">
                          {messages.map((message) => (
                            <motion.div
                              key={message.id}
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{
                                type: 'spring',
                                stiffness: 500,
                                damping: 30,
                              }}
                              className="flex justify-start"
                            >
                              <div className="max-w-[90%] bg-white rounded-xl rounded-tl-sm px-3 py-2 shadow-sm border border-zinc-100">
                                <p
                                  className="text-xs text-zinc-700 leading-relaxed"
                                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                  {message.text}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                </div>

                {/* Footer with animated wave */}
                <div
                  className="px-6 py-3 relative z-30 bg-zinc-50"
                  style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}
                >
                  <WaveformDisplay active={hasUplinkData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
```

**Step 2: Add useRef import at top of file**

Update the imports at line 5:

```tsx
import { useEffect, useState, useCallback, useRef } from 'react'
```

**Step 3: Remove MamaPrototype import (line 7)**

Delete this line:
```tsx
import { MamaPrototype } from './MamaPrototype'
```

**Step 4: Commit**

```bash
git add src/components/onboarding/JetsonsConsole.tsx
git commit -m "feat: redesign console with unified split body (config left, messages right)"
```

---

### Task 5: Update Layout to Single Column for Console

**Files:**
- Modify: `src/app/onboarding/layout.tsx`

**Step 1: Remove the grid-cols-2 from console, it's now self-contained**

The layout should remain as 2-column (console | form), but the console itself handles the split internally. The current layout at line 29 should be:

```tsx
<div className="min-h-screen grid lg:grid-cols-2 bg-white">
```

This is already correct - the JetsonsConsole now handles its own internal split. No changes needed.

**Step 2: Verify and commit if any changes**

```bash
git status
# If changes needed:
git add src/app/onboarding/layout.tsx
git commit -m "chore: verify layout for unified console"
```

---

### Task 6: Delete MamaPrototype Component (Optional Cleanup)

**Files:**
- Delete: `src/components/onboarding/MamaPrototype.tsx`

**Step 1: Remove the file**

```bash
rm src/components/onboarding/MamaPrototype.tsx
```

**Step 2: Commit**

```bash
git add -A
git commit -m "chore: remove unused MamaPrototype component"
```

---

### Task 7: Test and Verify

**Step 1: Run build**

```bash
npm run build
```

Expected: Build passes with no errors.

**Step 2: Run dev server and test**

```bash
npm run dev
```

**Step 3: Verify in browser**

- [ ] Console shows as ONE unified panel with metallic frame
- [ ] Body is split into two columns
- [ ] Left column shows OPERATOR, CALL TYPES, PERSONALITY, UPLINK sections
- [ ] Right column shows MAMA SAYS header with message bubbles
- [ ] City dropdown works - shows top cities + Other
- [ ] Selecting a city immediately triggers sarcastic comment in right column
- [ ] Miami comment shows: "I hope this isn't another course seller, OnlyFans, or crypto thing"
- [ ] Messages auto-scroll when new ones arrive

**Step 4: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: final adjustments for unified console"
```

---

## Summary of Files Changed

1. `src/lib/personality.ts` - Updated city comments with sarcastic content
2. `src/components/onboarding/CityCombobox.tsx` - NEW: Searchable city dropdown
3. `src/app/onboarding/about/page.tsx` - Use CityCombobox instead of text input
4. `src/components/onboarding/JetsonsConsole.tsx` - Unified split body design
5. `src/components/onboarding/MamaPrototype.tsx` - DELETED (merged into console)

---

Plan complete and saved to `docs/plans/2026-01-10-unified-console-city-dropdown.md`. Two execution options:

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

Which approach?
