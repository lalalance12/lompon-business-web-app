"use client"

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"
import { ReactLenis } from "lenis/react"

/** Weighted, inertial scrolling — skipped entirely for reduced-motion users. */
export function SmoothScroll() {
  const reduce = usePrefersReducedMotion()
  if (reduce) return null
  return <ReactLenis root options={{ lerp: 0.11, wheelMultiplier: 0.9 }} />
}
