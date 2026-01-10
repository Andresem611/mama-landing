'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useOnboarding } from '@/context/OnboardingContext'
import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'

// Retro terminal typing effect for empty states
function TerminalTyping({
  text,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseBeforeDelete = 1500,
  pauseBeforeType = 500,
  loop = true,
}: {
  text: string
  typingSpeed?: number
  deletingSpeed?: number
  pauseBeforeDelete?: number
  pauseBeforeType?: number
  loop?: boolean
}) {
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const typeCharacter = useCallback(() => {
    if (isPaused) return

    if (!isDeleting) {
      // Typing forward
      if (displayText.length < text.length) {
        setDisplayText(text.slice(0, displayText.length + 1))
      } else if (loop) {
        // Finished typing, pause before deleting
        setIsPaused(true)
        setTimeout(() => {
          setIsPaused(false)
          setIsDeleting(true)
        }, pauseBeforeDelete)
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1))
      } else {
        // Finished deleting, pause before typing again
        setIsPaused(true)
        setTimeout(() => {
          setIsPaused(false)
          setIsDeleting(false)
        }, pauseBeforeType)
      }
    }
  }, [displayText, isDeleting, isPaused, loop, pauseBeforeDelete, pauseBeforeType, text])

  useEffect(() => {
    if (isPaused) return

    const speed = isDeleting ? deletingSpeed : typingSpeed
    const timer = setTimeout(typeCharacter, speed)
    return () => clearTimeout(timer)
  }, [typeCharacter, isDeleting, isPaused, typingSpeed, deletingSpeed])

  return (
    <span
      className="font-mono text-emerald-500/70"
      style={{
        textShadow: '0 0 8px rgba(16, 185, 129, 0.3)',
      }}
    >
      {displayText}
      <motion.span
        className="inline-block w-[0.6em] h-[1.1em] bg-emerald-500/70 ml-0.5 align-middle"
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          times: [0, 0.5, 0.5, 1],
        }}
        style={{
          boxShadow: '0 0 6px rgba(16, 185, 129, 0.5)',
        }}
      />
    </span>
  )
}

// Use cases with OpenMoji icons (matching calls page)
const USE_CASES = [
  { id: 'dentist', label: 'Dentist', icon: '/icons/openmoji/tooth.svg' },
  { id: 'restaurant', label: 'Restaurants', icon: '/icons/openmoji/fork-knife-plate.svg' },
  { id: 'doctor', label: 'Doctor', icon: '/icons/openmoji/hospital.svg' },
  { id: 'customer_service', label: 'Support', icon: '/icons/openmoji/telephone.svg' },
  { id: 'landlord', label: 'Landlord', icon: '/icons/openmoji/house.svg' },
  { id: 'utilities', label: 'Utilities', icon: '/icons/openmoji/lightning.svg' },
  { id: 'government', label: 'Gov/DMV', icon: '/icons/openmoji/bank.svg' },
  { id: 'other', label: 'Other', icon: '/icons/openmoji/clipboard.svg' },
]

// Flicker animation for when data arrives
const flickerVariants = {
  hidden: { opacity: 0.3 },
  flicker: {
    opacity: [0.3, 1, 0.5, 1, 0.7, 1],
    transition: { duration: 0.4, times: [0, 0.1, 0.2, 0.3, 0.5, 1] }
  },
  visible: { opacity: 1 }
}

export function JetsonsConsole() {
  const { state } = useOnboarding()
  const { profile, preferences } = state

  // Track which sections have data for status lights
  const hasOperatorData = !!(profile.name || profile.age_range || profile.location)
  const hasCallData = (preferences.use_cases?.length ?? 0) > 0
  const hasPersonalityData = !!(preferences.persistence || preferences.flexibility || preferences.agency)
  const hasUplinkData = !!preferences.phone

  const completedSteps = [hasOperatorData, hasCallData, hasPersonalityData, hasUplinkData]

  return (
    <div className="hidden lg:flex items-center justify-center bg-white p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
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
              {/* Screen Container - WHITE THEME */}
              <div className="relative bg-white rounded-[18px] overflow-hidden">
                {/* Subtle scan lines overlay */}
                <div
                  className="absolute inset-0 pointer-events-none z-20 opacity-[0.02]"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.1) 1px, rgba(0,0,0,0.1) 2px)',
                    backgroundSize: '100% 2px'
                  }}
                />

                {/* Subtle vignette */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.05) 100%)',
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
                  {/* Status Lights - 4 for each step */}
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

                {/* Console Body - LIGHT THEME */}
                <div className="p-5 space-y-4 relative z-30">
                  {/* Operator Section */}
                  <ConsoleSection
                    title="OPERATOR"
                    hasData={hasOperatorData}
                    index={0}
                  >
                    <ConsoleField label="NAME" value={profile.name} />
                    <ConsoleField label="AGE" value={profile.age_range} />
                    <ConsoleField label="CITY" value={profile.location} />
                  </ConsoleSection>

                  {/* Call Types Section */}
                  <ConsoleSection
                    title="CALL TYPES"
                    hasData={hasCallData}
                    index={1}
                  >
                    <div className="grid grid-cols-4 gap-2">
                      {USE_CASES.map((option) => (
                        <ConsoleCheckbox
                          key={option.id}
                          icon={option.icon}
                          checked={preferences.use_cases?.includes(option.id) ?? false}
                        />
                      ))}
                    </div>
                  </ConsoleSection>

                  {/* Personality Section with Gauge */}
                  <ConsoleSection
                    title="PERSONALITY"
                    hasData={hasPersonalityData}
                    index={2}
                  >
                    <div className="flex items-center gap-4">
                      {/* Needle Gauge */}
                      <NeedleGauge
                        value={preferences.persistence ?? 0}
                        max={5}
                        label="PERSISTENCE"
                      />

                      {/* Vertical indicators */}
                      <div className="flex-1 space-y-2">
                        <MiniIndicator
                          label="FLEX"
                          value={preferences.flexibility ?? '---'}
                        />
                        <MiniIndicator
                          label="AGENCY"
                          value={preferences.agency ? `LVL ${preferences.agency}` : '---'}
                        />
                      </div>
                    </div>
                  </ConsoleSection>

                  {/* Uplink Section */}
                  <ConsoleSection
                    title="UPLINK"
                    hasData={hasUplinkData}
                    index={3}
                  >
                    <div className="flex items-center gap-4">
                      <SignalIndicator active={hasUplinkData} />
                      <span
                        className="text-zinc-400 text-base"
                        style={{ fontFamily: "'Quicksand', sans-serif" }}
                      >
                        PHONE:
                      </span>
                      <div className="flex-1">
                        <AnimatePresence mode="wait">
                          {preferences.phone ? (
                            <motion.span
                              key={preferences.phone}
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 5 }}
                              transition={{ type: 'spring', stiffness: 300 }}
                              className="text-rose-500 font-semibold text-base tracking-wider"
                              style={{ fontFamily: "'Quicksand', sans-serif" }}
                            >
                              {preferences.phone}
                            </motion.span>
                          ) : (
                            <motion.span
                              key="empty"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <TerminalTyping
                                text="CONNECTING..."
                                typingSpeed={70}
                                deletingSpeed={35}
                                pauseBeforeDelete={2000}
                                pauseBeforeType={800}
                              />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </ConsoleSection>
                </div>

                {/* Footer with animated wave */}
                <div
                  className="px-6 py-3 relative z-30 bg-zinc-50"
                  style={{
                    borderTop: '1px solid rgba(0,0,0,0.05)'
                  }}
                >
                  <WaveformDisplay active={hasUplinkData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Status light that pulses when active
function StatusLight({ active, index }: { active: boolean; index: number }) {
  return (
    <motion.div
      className="relative"
      initial={false}
      animate={active ? 'active' : 'inactive'}
    >
      {/* Glow effect */}
      {active && (
        <motion.div
          className="absolute inset-0 rounded-full bg-emerald-400 blur-sm"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
        />
      )}
      {/* Light bulb */}
      <div
        className="relative w-3 h-3 rounded-full"
        style={{
          background: active
            ? 'radial-gradient(circle at 30% 30%, #86efac, #22c55e 50%, #15803d)'
            : 'radial-gradient(circle at 30% 30%, #d4d4d8, #a1a1aa 50%, #71717a)',
          boxShadow: active
            ? '0 0 8px rgba(34,197,94,0.8), inset 0 1px 2px rgba(255,255,255,0.3)'
            : 'inset 0 1px 2px rgba(0,0,0,0.2), inset 0 -1px 1px rgba(255,255,255,0.3)'
        }}
      />
    </motion.div>
  )
}

// Decorative screw for metallic look
function Screw() {
  return (
    <div
      className="w-3 h-3 rounded-full"
      style={{
        background: 'conic-gradient(from 45deg, #999, #ccc, #999, #666, #999)',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3), 0 1px 1px rgba(255,255,255,0.5)'
      }}
    />
  )
}

// Console section with flicker effect - LIGHT THEME
function ConsoleSection({
  title,
  children,
  hasData,
  index
}: {
  title: string;
  children: React.ReactNode;
  hasData: boolean;
  index: number;
}) {
  const [hasFlickered, setHasFlickered] = useState(false)
  const [wasEmpty, setWasEmpty] = useState(true)

  useEffect(() => {
    if (hasData && wasEmpty) {
      setHasFlickered(true)
      setWasEmpty(false)
    } else if (!hasData) {
      setWasEmpty(true)
    }
  }, [hasData, wasEmpty])

  return (
    <motion.div
      className="relative rounded-xl overflow-hidden"
      style={{
        background: hasData
          ? 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)'
          : 'linear-gradient(135deg, #f4f4f5 0%, #e4e4e7 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.05)'
      }}
      variants={flickerVariants}
      initial="visible"
      animate={hasFlickered && hasData ? "flicker" : "visible"}
      onAnimationComplete={() => setHasFlickered(false)}
    >
      {/* Section header */}
      <div
        className="px-3 py-1.5 flex items-center gap-2"
        style={{
          background: hasData
            ? 'linear-gradient(180deg, rgba(251,113,133,0.1) 0%, transparent 100%)'
            : 'linear-gradient(180deg, rgba(0,0,0,0.03) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: hasData
              ? 'radial-gradient(circle at 30% 30%, #fda4af, #fb7185)'
              : '#a1a1aa',
            boxShadow: hasData ? '0 0 4px rgba(251,113,133,0.5)' : 'none'
          }}
        />
        <h3
          className={`font-bold text-[10px] tracking-wider ${hasData ? 'text-rose-500' : 'text-zinc-400'}`}
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          {title}
        </h3>
      </div>

      {/* Section content */}
      <div className={`p-3 ${!hasData ? 'opacity-40' : ''}`}>
        {children}
      </div>
    </motion.div>
  )
}

// Terminal typing placeholder texts for different fields
const TERMINAL_PLACEHOLDERS: Record<string, string> = {
  NAME: 'AWAITING INPUT...',
  AGE: 'SELECT AGE...',
  CITY: 'ENTER LOCATION...',
  PHONE: 'LINK UPLINK...',
}

// Console field with empty state - LIGHT THEME with terminal typing
function ConsoleField({
  label,
  value,
  placeholder,
  large = false,
  showTypingEffect = true
}: {
  label: string
  value?: string | null
  placeholder?: string
  large?: boolean
  showTypingEffect?: boolean
}) {
  const terminalText = TERMINAL_PLACEHOLDERS[label] || 'AWAITING DATA...'

  return (
    <div
      className={`flex items-center gap-2 ${large ? 'text-base' : 'text-xs'}`}
      style={{ fontFamily: "'Quicksand', sans-serif" }}
    >
      <span className="text-zinc-400 w-12">{label}:</span>
      <AnimatePresence mode="wait">
        {value ? (
          <motion.span
            key={value}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={`text-rose-500 font-semibold ${large ? 'tracking-wider' : ''}`}
          >
            {value}
          </motion.span>
        ) : (
          <motion.span
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="inline-flex items-center"
          >
            {showTypingEffect ? (
              <TerminalTyping
                text={terminalText}
                typingSpeed={70}
                deletingSpeed={35}
                pauseBeforeDelete={2000}
                pauseBeforeType={800}
              />
            ) : (
              <span className="text-zinc-300 font-mono">{placeholder || '---'}</span>
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

// Checkbox indicator for call types - using OpenMoji SVGs
function ConsoleCheckbox({ icon, checked }: { icon: string; checked: boolean }) {
  return (
    <motion.div
      animate={{
        scale: checked ? 1.1 : 0.85,
        opacity: checked ? 1 : 0.25,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="flex items-center justify-center"
      style={{
        filter: checked ? 'none' : 'grayscale(1)'
      }}
    >
      <Image
        src={icon}
        alt=""
        width={24}
        height={24}
        className={checked ? '' : 'opacity-50'}
      />
    </motion.div>
  )
}

// Needle Gauge Component - LIGHT THEME
function NeedleGauge({ value, max, label }: { value: number; max: number; label: string }) {
  // Convert value to rotation angle (-135 to 135 degrees)
  const rotation = -135 + ((value / max) * 270)

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Gauge face */}
      <div
        className="relative w-20 h-20 rounded-full"
        style={{
          background: 'linear-gradient(145deg, #ffffff 0%, #e4e4e7 100%)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1), inset 0 2px 4px rgba(255,255,255,1), inset 0 -2px 4px rgba(0,0,0,0.05)'
        }}
      >
        {/* Inner ring */}
        <div
          className="absolute inset-1 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #fafafa, #e4e4e7 70%)',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          {/* Gauge markings */}
          <svg className="absolute inset-0" viewBox="0 0 100 100">
            {/* Tick marks */}
            {[...Array(6)].map((_, i) => {
              const angle = -135 + (i * 54)
              const rad = (angle * Math.PI) / 180
              const x1 = 50 + 38 * Math.cos(rad)
              const y1 = 50 + 38 * Math.sin(rad)
              const x2 = 50 + 32 * Math.cos(rad)
              const y2 = 50 + 32 * Math.sin(rad)
              return (
                <line
                  key={i}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={i <= value ? '#fb7185' : '#d4d4d8'}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )
            })}

            {/* Colored arc showing value */}
            <path
              d={describeArc(50, 50, 35, -135, rotation)}
              fill="none"
              stroke="url(#gaugeGradientLight)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <defs>
              <linearGradient id="gaugeGradientLight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fda4af" />
                <stop offset="100%" stopColor="#fb7185" />
              </linearGradient>
            </defs>
          </svg>

          {/* Needle */}
          <motion.div
            className="absolute left-1/2 top-1/2 origin-center"
            style={{
              width: '2px',
              height: '28px',
              marginLeft: '-1px',
              marginTop: '-24px'
            }}
            animate={{ rotate: rotation }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            <div
              className="w-full h-full"
              style={{
                background: 'linear-gradient(180deg, #fb7185 0%, #e11d48 100%)',
                clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            />
          </motion.div>

          {/* Center cap */}
          <div
            className="absolute left-1/2 top-1/2 w-4 h-4 -ml-2 -mt-2 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #f4f4f5, #a1a1aa)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.8)'
            }}
          />
        </div>
      </div>

      {/* Label */}
      <span
        className="text-[9px] text-zinc-400 tracking-wider"
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        {label}
      </span>
    </div>
  )
}

// Helper function to create SVG arc path
function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string {
  const start = polarToCartesian(x, y, radius, endAngle)
  const end = polarToCartesian(x, y, radius, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`
}

function polarToCartesian(cx: number, cy: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians)
  }
}

// Terminal typing placeholder texts for mini indicators
const MINI_INDICATOR_PLACEHOLDERS: Record<string, string> = {
  FLEX: 'CALIBRATE...',
  AGENCY: 'SET LEVEL...',
}

// Mini indicator for flexibility and agency - LIGHT THEME with terminal typing
function MiniIndicator({ label, value }: { label: string; value: string }) {
  const hasValue = value !== '---'
  const terminalText = MINI_INDICATOR_PLACEHOLDERS[label] || 'PENDING...'

  return (
    <div
      className="flex items-center gap-2 px-2 py-1 rounded"
      style={{
        background: 'rgba(0,0,0,0.03)',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
      }}
    >
      <span
        className="text-[9px] text-zinc-400 w-10"
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        {label}:
      </span>
      <AnimatePresence mode="wait">
        {hasValue ? (
          <motion.span
            key={value}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-[10px] font-bold uppercase text-rose-500"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            {value}
          </motion.span>
        ) : (
          <motion.span
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-[10px] inline-flex items-center"
          >
            <TerminalTyping
              text={terminalText}
              typingSpeed={60}
              deletingSpeed={30}
              pauseBeforeDelete={1800}
              pauseBeforeType={600}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

// Signal indicator for uplink
function SignalIndicator({ active }: { active: boolean }) {
  return (
    <div className="flex items-end gap-0.5">
      {[1, 2, 3, 4].map((bar) => (
        <motion.div
          key={bar}
          className="w-1 rounded-sm"
          style={{
            height: `${bar * 4}px`,
            background: active && bar <= 4
              ? 'linear-gradient(180deg, #86efac, #22c55e)'
              : '#d4d4d8',
            boxShadow: active && bar <= 4 ? '0 0 4px rgba(34,197,94,0.5)' : 'none'
          }}
          animate={active ? {
            opacity: [0.7, 1, 0.7]
          } : {}}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: bar * 0.1
          }}
        />
      ))}
    </div>
  )
}

// Waveform display at bottom - LIGHT THEME
function WaveformDisplay({ active }: { active: boolean }) {
  return (
    <div className="flex items-center justify-center gap-1 h-6">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full"
          style={{
            background: active
              ? 'linear-gradient(180deg, #fda4af, #fb7185)'
              : '#d4d4d8'
          }}
          animate={active ? {
            height: [4, Math.random() * 16 + 4, 4],
          } : { height: 4 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: i * 0.05,
            repeatType: 'reverse'
          }}
        />
      ))}
    </div>
  )
}
