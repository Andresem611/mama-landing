'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useOnboarding } from '@/context/OnboardingContext'
import { USE_CASE_OPTIONS } from '@/types/onboarding'
import { useEffect, useState } from 'react'

// Flicker animation for when data arrives
const flickerVariants = {
  hidden: { opacity: 0 },
  flicker: {
    opacity: [0, 1, 0.3, 1, 0.7, 1],
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
              background: 'linear-gradient(145deg, #a8a8a8 0%, #4a4a4a 50%, #2a2a2a 100%)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
            }}
          >
            {/* Inner bevel */}
            <div
              className="rounded-[22px] p-1"
              style={{
                background: 'linear-gradient(145deg, #3a3a3a 0%, #5a5a5a 50%, #3a3a3a 100%)',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5), inset 0 -1px 2px rgba(255,255,255,0.1)'
              }}
            >
              {/* CRT Screen Container */}
              <div className="relative bg-zinc-900 rounded-[18px] overflow-hidden">
                {/* CRT Scan Lines Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none z-20 opacity-[0.03]"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.3) 1px, rgba(0,0,0,0.3) 2px)',
                    backgroundSize: '100% 2px'
                  }}
                />

                {/* CRT Vignette/Glow Effect */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
                    boxShadow: 'inset 0 0 60px rgba(251,113,133,0.15), inset 0 0 120px rgba(0,0,0,0.3)'
                  }}
                />

                {/* Header with Status Lights */}
                <div
                  className="px-6 py-4 flex items-center justify-between relative z-30"
                  style={{
                    background: 'linear-gradient(180deg, rgba(251,113,133,0.9) 0%, rgba(225,29,72,0.9) 100%)',
                    borderBottom: '2px solid rgba(0,0,0,0.3)'
                  }}
                >
                  {/* Status Lights - 4 for each step */}
                  <div className="flex gap-2">
                    {completedSteps.map((completed, i) => (
                      <StatusLight key={i} active={completed} index={i} />
                    ))}
                  </div>

                  <span
                    className="text-white text-xs tracking-[0.2em] drop-shadow-lg"
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

                {/* Console Body */}
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
                      {USE_CASE_OPTIONS.slice(0, 8).map((option) => (
                        <ConsoleCheckbox
                          key={option.id}
                          label={option.icon}
                          checked={preferences.use_cases?.includes(option.id) ?? false}
                        />
                      ))}
                    </div>
                  </ConsoleSection>

                  {/* Personality Section with 3D Gauge */}
                  <ConsoleSection
                    title="PERSONALITY"
                    hasData={hasPersonalityData}
                    index={2}
                  >
                    <div className="flex items-center gap-4">
                      {/* 3D Needle Gauge */}
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
                    <div className="flex items-center gap-3">
                      <SignalIndicator active={hasUplinkData} />
                      <div className="flex-1">
                        <ConsoleField
                          label="PHONE"
                          value={preferences.phone}
                          placeholder="(___) ___-____"
                          large
                        />
                      </div>
                    </div>
                  </ConsoleSection>
                </div>

                {/* Footer with animated wave */}
                <div
                  className="px-6 py-3 relative z-30"
                  style={{
                    background: 'linear-gradient(180deg, rgba(39,39,42,1) 0%, rgba(24,24,27,1) 100%)',
                    borderTop: '1px solid rgba(255,255,255,0.05)'
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
            : 'radial-gradient(circle at 30% 30%, #71717a, #52525b 50%, #27272a)',
          boxShadow: active
            ? '0 0 8px rgba(34,197,94,0.8), inset 0 1px 2px rgba(255,255,255,0.3)'
            : 'inset 0 1px 2px rgba(0,0,0,0.5), inset 0 -1px 1px rgba(255,255,255,0.1)'
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
        background: 'conic-gradient(from 45deg, #666, #999, #666, #333, #666)',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5), 0 1px 1px rgba(255,255,255,0.1)'
      }}
    />
  )
}

// Console section with flicker effect
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
        background: 'linear-gradient(135deg, rgba(39,39,42,0.8) 0%, rgba(24,24,27,0.9) 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)'
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
          background: 'linear-gradient(180deg, rgba(63,63,70,0.8) 0%, rgba(39,39,42,0.8) 100%)',
          borderBottom: '1px solid rgba(0,0,0,0.3)'
        }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: hasData
              ? 'radial-gradient(circle at 30% 30%, #fda4af, #fb7185)'
              : '#52525b',
            boxShadow: hasData ? '0 0 4px rgba(251,113,133,0.5)' : 'none'
          }}
        />
        <h3
          className={`font-bold text-[10px] tracking-wider ${hasData ? 'text-rose-300' : 'text-zinc-500'}`}
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          {title}
        </h3>
      </div>

      {/* Section content */}
      <div className={`p-3 ${!hasData ? 'opacity-50' : ''}`}>
        {children}
      </div>
    </motion.div>
  )
}

// Console field with empty state
function ConsoleField({
  label,
  value,
  placeholder = '---',
  large = false
}: {
  label: string
  value?: string | null
  placeholder?: string
  large?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-2 ${large ? 'text-base' : 'text-xs'}`}
      style={{ fontFamily: "'Quicksand', sans-serif" }}
    >
      <span className="text-zinc-500 w-12">{label}:</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={value ?? 'empty'}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className={value
            ? `text-rose-400 font-semibold ${large ? 'tracking-wider' : ''}`
            : 'text-zinc-600 font-mono'
          }
        >
          {value || placeholder}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

// Checkbox indicator for call types
function ConsoleCheckbox({ label, checked }: { label: string; checked: boolean }) {
  return (
    <motion.div
      animate={{
        scale: checked ? 1.1 : 0.85,
        opacity: checked ? 1 : 0.3,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="text-center text-lg"
      style={{
        filter: checked ? 'drop-shadow(0 0 4px rgba(251,113,133,0.5))' : 'grayscale(1)'
      }}
    >
      {label}
    </motion.div>
  )
}

// 3D Needle Gauge Component
function NeedleGauge({ value, max, label }: { value: number; max: number; label: string }) {
  // Convert value to rotation angle (-135 to 135 degrees)
  const rotation = -135 + ((value / max) * 270)

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Gauge face */}
      <div
        className="relative w-20 h-20 rounded-full"
        style={{
          background: 'conic-gradient(from 180deg, #27272a 0%, #3f3f46 25%, #52525b 50%, #3f3f46 75%, #27272a 100%)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.3)'
        }}
      >
        {/* Inner ring */}
        <div
          className="absolute inset-1 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #52525b, #27272a 70%)',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5)'
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
                  stroke={i <= value ? '#fb7185' : '#52525b'}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )
            })}

            {/* Colored arc showing value */}
            <path
              d={describeArc(50, 50, 35, -135, rotation)}
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
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
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            />
          </motion.div>

          {/* Center cap */}
          <div
            className="absolute left-1/2 top-1/2 w-4 h-4 -ml-2 -mt-2 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #71717a, #27272a)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.2)'
            }}
          />
        </div>
      </div>

      {/* Label */}
      <span
        className="text-[9px] text-zinc-500 tracking-wider"
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

// Mini indicator for flexibility and agency
function MiniIndicator({ label, value }: { label: string; value: string }) {
  const hasValue = value !== '---'

  return (
    <div
      className="flex items-center gap-2 px-2 py-1 rounded"
      style={{
        background: 'rgba(0,0,0,0.2)',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)'
      }}
    >
      <span
        className="text-[9px] text-zinc-500 w-10"
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        {label}:
      </span>
      <motion.span
        key={value}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`text-[10px] font-bold uppercase ${hasValue ? 'text-rose-400' : 'text-zinc-600'}`}
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        {value}
      </motion.span>
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
              : '#3f3f46',
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

// Waveform display at bottom
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
              : '#3f3f46'
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
