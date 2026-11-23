"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { quick } from "@/lib/motion"

/** Shared log axis: 0.1 mm to 5 mm covers fines to pebbles (mesh 20 to mesh 6). */
const MIN = Math.log10(0.1)
const MAX = Math.log10(5)
const pos = (mm: number) => ((Math.log10(mm) - MIN) / (MAX - MIN)) * 100

const TICKS = [0.1, 0.5, 1, 2, 5]

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
          {`${t} mm`}
        </span>
      ))}
    </div>
  )
}
