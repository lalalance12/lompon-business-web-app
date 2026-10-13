"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { quick } from "@/lib/motion"

/** Shared log axis: 0.5 mm to 1,000 mm covers dust to boulders. */
const MIN = Math.log10(0.5)
const MAX = Math.log10(1000)
const pos = (mm: number) => ((Math.log10(mm) - MIN) / (MAX - MIN)) * 100

const TICKS = [1, 10, 100, 1000]

/**
 * A piece-size range drawn on a shared logarithmic scale, so every aggregate
 * can be compared at a glance. The bar snaps out from its smallest size.
 */
export function SizeScale({ range, className }: { range: [number, number]; className?: string }) {
  const [lo, hi] = range
  const left = pos(lo)
  const width = Math.max(pos(hi) - left, 2)

  return (
    <div className={cn("relative", className)} aria-hidden="true">
      <div className="relative h-2 rounded-full bg-bedding">
        <motion.div
          className="absolute inset-y-0 origin-left rounded-full bg-ochre"
          style={{ left: `${left}%`, width: `${width}%` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={quick}
        />
      </div>
    </div>
  )
}

/** Tick labels for the shared size axis, aligned with SizeScale bars above it. */
export function SizeAxis({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-4 text-[11px] text-silt tabular-nums", className)} aria-hidden="true">
      {TICKS.map((t) => (
        <span key={t} className="absolute -translate-x-1/2 whitespace-nowrap" style={{ left: `${pos(t)}%` }}>
          {t >= 1000 ? "1 m" : `${t} mm`}
        </span>
      ))}
    </div>
  )
}
