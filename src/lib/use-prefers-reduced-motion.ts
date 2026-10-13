"use client"

import { useSyncExternalStore } from "react"
import { RESPECT_REDUCED_MOTION } from "./motion"

const query = "(prefers-reduced-motion: reduce)"

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(query)
  mql.addEventListener("change", onChange)
  return () => mql.removeEventListener("change", onChange)
}

/**
 * Hydration-safe reduced-motion check: false while hydrating (matching the
 * server render), then the real preference, re-rendering if it changes.
 * Always false while RESPECT_REDUCED_MOTION is off.
 */
export function usePrefersReducedMotion() {
  const prefers = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  )
  return RESPECT_REDUCED_MOTION && prefers
}
