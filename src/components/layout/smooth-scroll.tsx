"use client"

import { useReducedMotion } from "motion/react"
import { ReactLenis } from "lenis/react"

/** Weighted, inertial scrolling — skipped entirely for reduced-motion users. */
export function SmoothScroll() {
  const reduce = useReducedMotion()
  if (reduce !== false) return null
  return <ReactLenis root options={{ lerp: 0.11, wheelMultiplier: 0.9 }} />
}
