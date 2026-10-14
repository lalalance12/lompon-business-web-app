"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { snapSpring } from "@/lib/motion"

/**
 * A pill switch with a sliding highlight. Options stack full width on
 * phones, so long labels never wrap into a lopsided pill.
 */
export function Segmented<T extends string | number>({
  label,
  id,
  value,
  options,
  onChange,
}: {
  label: string
  id: string
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
}) {
  return (
    <div role="radiogroup" aria-label={label} className="grid w-full gap-1 rounded-3xl bg-bedding p-1 sm:inline-flex sm:w-fit sm:rounded-full">
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn("press relative h-11 rounded-full px-4 text-[0.9375rem]", value === o.value ? "text-limewash" : "text-silt hover:text-slate")}
        >
          {value === o.value && <motion.span layoutId={`${id}-pill`} className="absolute inset-0 rounded-full bg-slate" transition={snapSpring} />}
          <span className="relative">{o.label}</span>
        </button>
      ))}
    </div>
  )
}
