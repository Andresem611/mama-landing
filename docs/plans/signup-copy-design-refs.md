# Signup Flow: Copy & Design References

## Voice & Tone

**Personality:** Sassy mom who handles business
**Core phrase:** "Relax, I've got this covered."
**Target:** Gen Z with phone anxiety

---

## Final Copy Deck

### Login Page
- **Headline:** "Let Mama handle it"
- **Subheadline:** "Sign up and never make an awkward phone call again."
- **CTA:** "Continue with Google" / "Continue with Apple"
- **Footer:** "By signing up, you agree to our Terms and Privacy Policy."

### Step 1: About You
- **Headline:** "A little about you"
- **Subheadline:** "Just the basics. I'm not nosy... okay maybe a little."
- **Age options:** "18-24", "25-30", "31-40", "40+"
- **Location placeholder:** "City or zip code"
- **CTA:** "Continue"

### Step 2: The Dreaded Calls
- **Headline:** "The dreaded calls list"
- **Subheadline:** "Be honest. I won't judge."
- **Use case options (with OpenMoji icons):**
  - Dentist appointments (`tooth.svg`)
  - Restaurant reservations (`fork-knife-plate.svg`)
  - Doctor's office (`hospital.svg`)
  - Customer service (`telephone.svg`)
  - Landlord calls (`house.svg`)
  - Utilities (`lightning.svg`)
  - Government/DMV (`bank.svg`)
  - Other (`sparkles.svg` or similar)
- **Frequency options:** "Daily", "Weekly", "Monthly", "Occasionally"
- **CTA:** "Continue"

### Step 3: Mama's Style
- **Headline:** "What's my vibe?"
- **Subheadline:** "Tune me up."
- **Persistence (1-5 slider):**
  - Label: "How persistent should I be?"
  - 1 = "Chill - one try is fine"
  - 5 = "Relentless - don't stop until it's done"
  - Icon: dial/gauge
- **Flexibility options:**
  - "Strict" - "Follow my instructions exactly"
  - "Somewhat" - "Use your judgment"
  - "Flexible" - "Do whatever works"
  - Icon: different expressions (face emojis)
- **Agency options:**
  - 1 = "Report only" - "Just tell me what happened"
  - 2 = "Negotiate + confirm" - "Handle it but check with me first"
  - 3 = "Full auto" - "Just get it done, I trust you"
  - Icon: hand/robot progression
- **CTA:** "Continue"

### Step 4: Phone Number
- **Headline:** "Where should I reach you?"
- **Subheadline:** "I'll text you when I'm ready to start making calls."
- **Input placeholder:** "(555) 555-5555"
- **CTA:** "Complete Setup"

### Done Page
- **Headline:** "Consider it handled"
- **Subheadline:** "Relax. I've got this from here."
- **Body:** "You're on the list! We'll text you at [phone] when Mama is ready to make calls."
- **Share CTA:** "Tell your friends"
- **Secondary:** "Back to home"

### Console Panel (Left Side)
- **Header:** "MAMA CONFIGURATION"
- **Sections:** OPERATOR, CALL TYPES, PERSONALITY, UPLINK

---

## Design References

### Split Screen Layout
- **Reference:** Screenshot from user (onboarding flow)
- **Key details:**
  - NO divider line between left and right panels
  - Left: Visual/product showcase (Jetsons console in our case)
  - Right: Clean form with headline + subheadline + inputs
  - "Continue" button centered at bottom of right panel
  - Generous whitespace

### Selection Buttons
- **Reference:** Landing page pill buttons in "Calls Mama makes for you" carousel
- **Styling:**
  - Pill shape (`rounded-2xl` or `rounded-full`)
  - White background with subtle border
  - OpenMoji icon + text
  - Spring press feedback: `whileTap={{ scale: 0.98 }}`
  - Selected state: `bg-rose-400 text-white` or `border-rose-400 border-2`
  - Transition: `type: "spring", stiffness: 400, damping: 17`

### Icons
- **Source:** OpenMoji SVGs in `/public/icons/openmoji/`
- **Existing icons:**
  - `tooth.svg`, `fork-knife-plate.svg`, `hospital.svg`
  - `telephone.svg`, `house.svg`, `lightning.svg`
  - `scissors.svg`, `wrench.svg`, `pill.svg`, `bank.svg`
- **May need to add:**
  - Dial/gauge for persistence
  - Face expressions for flexibility
  - Hand/robot for agency

### Component Sourcing
- **21st.dev:** Check for components that fit MAMA design system
- **Focus areas:** Animated buttons, sliders, multi-select grids

---

## Button CTAs Summary

| Screen | Primary CTA |
|--------|-------------|
| Login | "Continue with Google" / "Continue with Apple" |
| Step 1-3 | "Continue" |
| Step 4 | "Complete Setup" |
| Done | "Tell your friends" |
