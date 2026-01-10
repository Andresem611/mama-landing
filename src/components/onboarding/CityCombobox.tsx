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
