/**
 * MAMA Personality System
 *
 * Injects ragebaiting comments throughout the onboarding flow.
 * Direction: passive-aggressive mom energy, not quirky sass.
 */

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

const smallTownKeywords = ['ville', 'burg', 'town', 'springs', 'falls', 'creek']

export function getCityComment(city: string): string | null {
  if (!city || city.length < 2) return null

  const normalized = city.toLowerCase().trim()

  // Check exact matches
  if (cityComments[normalized]) {
    return cityComments[normalized]
  }

  // Check if it contains a major city name
  for (const [key, comment] of Object.entries(cityComments)) {
    if (normalized.includes(key)) {
      return comment
    }
  }

  // Check for small town indicators
  if (smallTownKeywords.some(kw => normalized.includes(kw))) {
    return "When are you coming home"
  }

  // Generic fallback (only sometimes)
  return Math.random() > 0.7 ? "Mhm" : null
}

// Use case comments - zero surprise at your incompetence
const useCaseComments: Record<string, string> = {
  'dentist': "When was your last cleaning. Be honest",
  'restaurant': "You could just... walk in",
  'doctor': "Drinking enough water?",
  'customer_service': "What'd you break this time",
  'insurance': "You finally reading those emails I forwarded you?",
  'utilities': "They sent 3 notices before this didn't they",
  'dmv': "Should've done this online 6 months ago",
  'landlord': "Is something broken or do you need them to fix your wifi again",
}

export function getUseCaseComment(useCase: string): string | null {
  const normalized = useCase.toLowerCase().replace(/[\s-]/g, '_')
  return useCaseComments[normalized] || null
}

// Multi-select count reactions
export function getUseCaseCountComment(count: number): string | null {
  if (count <= 2) return null
  if (count <= 4) return "Mhm. Okay"
  if (count <= 6) return "We're gonna be here a while"
  if (count <= 7) return "Your whole life is on hold isn't it"
  return "..."
}

// Persistence slider comments - resigned acceptance
const persistenceComments: Record<number, string> = {
  1: "I'll ask once and give up. Like you want me to",
  2: "Okay. But this is gonna take longer",
  3: "", // Normal, no comment
  4: "They're gonna remember my voice",
  5: "Fine. Don't blame me when they block the number",
}

export function getPersistenceComment(level: number): string | null {
  return persistenceComments[level] || null
}

// Flexibility comments - slight disappointment in your decision-making
const flexibilityComments: Record<string, string> = {
  'strict': "You have plans? Since when",
  'somewhat': "This is the most decisive you've ever been",
  'flexible': "So you're free all day. Interesting",
}

export function getFlexibilityComment(flexibility: string): string | null {
  return flexibilityComments[flexibility.toLowerCase()] || null
}

// Agency level comments - quiet concern about your life choices
const agencyComments: Record<number, string> = {
  1: "So I do the work and you do... what exactly",
  2: "Okay I'll double check before I commit you to anything",
  3: "So now you trust me. After everything",
}

export function getAgencyComment(level: number): string | null {
  return agencyComments[level] || null
}

// Phone entry comments
export function getPhoneComment(phone: string, isComplete: boolean): string | null {
  if (isComplete) return "Finally"
  if (phone.length > 3) return null // Only comment at end
  return null
}

// Console terminal outputs - processing your chaos
export const terminalOutputs = {
  nameLoaded: (name: string) => `OPERATOR REGISTERED... ${name}. Got it`,
  ageSelected: () => "DEMOGRAPHIC CONFIRMED",
  cityEntered: () => "LOCATION ACQUIRED",
  callsSelected: () => "ANXIETY TRIGGERS LOGGED",
  persistenceSet: () => "ASSERTIVENESS CALIBRATED",
  flexibilitySet: () => "SCHEDULE FLEXIBILITY... NOTED",
  agencySet: () => "AUTONOMY LEVEL SET",
  phoneComplete: () => "UPLINK ESTABLISHED",
  allComplete: () => "CONFIGURATION COMPLETE. STANDING BY",
}

// Loading/waiting states
export const loadingMessages = {
  transition: "One sec",
  saving: "Writing this down",
  waiting: "Still here",
  error: "Try that again",
}

// Done page additions
export const donePageComments = [
  "You're welcome btw",
  "Text me when you need something else. You will",
  "Don't forget Mother's Day",
]

export function getRandomDoneComment(): string {
  return donePageComments[Math.floor(Math.random() * donePageComments.length)]
}
