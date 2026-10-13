"use client"

import { MotionConfig } from "motion/react"
import { RESPECT_REDUCED_MOTION } from "@/lib/motion"
import { SmoothScroll } from "./smooth-scroll"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion={RESPECT_REDUCED_MOTION ? "user" : "never"}>
      <SmoothScroll />
      {children}
    </MotionConfig>
  )
}
