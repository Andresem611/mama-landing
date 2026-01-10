'use client'

import { motion } from 'framer-motion'
import { useOnboarding } from '@/context/OnboardingContext'
import { USE_CASE_OPTIONS } from '@/types/onboarding'

export function JetsonsConsole() {
  const { state } = useOnboarding()
  const { profile, preferences } = state

  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-rose-50 to-cream p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Console Frame */}
        <div className="bg-white rounded-3xl shadow-xl border-4 border-rose-200 overflow-hidden">
          {/* Header */}
          <div className="bg-rose-400 px-6 py-4 flex items-center justify-between">
            <div className="flex gap-2">
              <motion.div
                className="w-3 h-3 rounded-full bg-rose-200"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-3 h-3 rounded-full bg-rose-200"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="w-3 h-3 rounded-full bg-rose-200"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              />
            </div>
            <span className="font-titan text-white text-sm tracking-[0.3em]">
              MAMA CONFIGURATION
            </span>
            <div className="flex gap-2">
              <motion.div
                className="w-3 h-3 rounded-full bg-rose-200"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
              />
              <motion.div
                className="w-3 h-3 rounded-full bg-rose-200"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
              />
              <motion.div
                className="w-3 h-3 rounded-full bg-rose-200"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 1.0 }}
              />
            </div>
          </div>

          {/* Console Body */}
          <div className="p-6 space-y-5">
            {/* Operator Section */}
            <ConsoleSection title="OPERATOR">
              <ConsoleField label="Name" value={profile.name} />
              <ConsoleField label="Age" value={profile.age_range} />
              <ConsoleField label="City" value={profile.location} />
            </ConsoleSection>

            {/* Call Types Section */}
            <ConsoleSection title="CALL TYPES">
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

            {/* Personality Section */}
            <ConsoleSection title="PERSONALITY">
              <ConsoleDial
                label="PERSISTENCE"
                value={preferences.persistence ?? 3}
                max={5}
              />
              <ConsoleToggle
                label="FLEXIBILITY"
                value={preferences.flexibility ?? 'somewhat'}
              />
              <ConsoleGauge
                label="AGENCY"
                value={preferences.agency ?? 2}
                max={3}
              />
            </ConsoleSection>

            {/* Uplink Section */}
            <ConsoleSection title="UPLINK">
              <ConsoleField
                label="Phone"
                value={preferences.phone}
                placeholder="(___) ___-____"
              />
              <div className="flex items-center gap-2 mt-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-emerald-400"
                  animate={{ opacity: preferences.phone ? [0.5, 1, 0.5] : 0.2 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="font-quicksand text-xs text-zinc-400">
                  {preferences.phone ? 'CONNECTED' : 'AWAITING SIGNAL'}
                </span>
              </div>
            </ConsoleSection>
          </div>

          {/* Footer Lights */}
          <div className="bg-zinc-50 px-6 py-3 flex justify-center gap-2">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-rose-300"
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function ConsoleSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-2 border-zinc-100 rounded-xl p-4 bg-zinc-50/50">
      <h3 className="font-quicksand font-bold text-xs text-zinc-400 tracking-wider mb-3">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function ConsoleField({
  label,
  value,
  placeholder = '___'
}: {
  label: string
  value?: string | null
  placeholder?: string
}) {
  return (
    <div className="flex items-center gap-2 font-quicksand text-sm">
      <span className="text-zinc-400 w-12">{label}:</span>
      <motion.span
        key={value ?? 'empty'}
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className={value ? 'text-rose-500 font-semibold' : 'text-zinc-300 font-mono'}
      >
        {value || placeholder}
      </motion.span>
    </div>
  )
}

function ConsoleCheckbox({ label, checked }: { label: string; checked: boolean }) {
  return (
    <motion.div
      animate={{
        scale: checked ? 1.15 : 0.9,
        opacity: checked ? 1 : 0.35,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="text-center text-lg"
    >
      {label}
    </motion.div>
  )
}

function ConsoleDial({ label, value, max }: { label: string; value: number; max: number }) {
  const percentage = (value / max) * 100

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="font-quicksand text-xs text-zinc-400">{label}</span>
        <span className="font-quicksand text-xs text-rose-500 font-bold">{value}/{max}</span>
      </div>
      <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-rose-300 to-rose-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        />
      </div>
    </div>
  )
}

function ConsoleToggle({ label, value }: { label: string; value: string }) {
  const positions: Record<string, number> = { strict: 10, somewhat: 50, flexible: 90 }
  const pos = positions[value] ?? 50

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="font-quicksand text-xs text-zinc-400">{label}</span>
        <span className="font-quicksand text-xs text-rose-500 font-bold capitalize">{value}</span>
      </div>
      <div className="relative h-2 bg-zinc-200 rounded-full">
        <motion.div
          className="absolute w-4 h-4 bg-rose-400 rounded-full -top-1 shadow-md"
          animate={{ left: `calc(${pos}% - 8px)` }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
      </div>
    </div>
  )
}

function ConsoleGauge({ label, value, max }: { label: string; value: number; max: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-quicksand text-xs text-zinc-400 w-16">{label}:</span>
      <div className="flex gap-1.5">
        {[...Array(max)].map((_, i) => (
          <motion.div
            key={i}
            className={`w-5 h-5 rounded ${i < value ? 'bg-rose-400' : 'bg-zinc-200'}`}
            animate={{
              scale: i < value ? 1 : 0.85,
              opacity: i < value ? 1 : 0.5,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          />
        ))}
      </div>
      <span className="font-quicksand text-sm text-rose-500 font-bold ml-auto">
        LVL {value}
      </span>
    </div>
  )
}
