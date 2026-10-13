"use client"

import { motion, type MotionStyle } from "motion/react"

export const TRUCK_YELLOW = "#f4b400"
const SLATE = "#1d2427"
const HUB = "#a29f95"
const LOAD = "#c9c3b6"

/**
 * A yellow dump truck, drawn in a 480 × 230 space (truck spans x 130–395,
 * wheels resting on y = 213). Render inside an <svg> or <g>.
 *
 * - `[data-bed]` is the tipping bed, hinged at its rear-bottom corner.
 * - `[data-load]` is the heap of stone carried in the bed.
 * Pass motion styles to drive either from scroll; otherwise they can be
 * animated by selector with useAnimate.
 */
export function TruckParts({
  tone = "light",
  bedStyle,
  loadStyle,
}: {
  tone?: "light" | "dark"
  bedStyle?: MotionStyle
  loadStyle?: MotionStyle
}) {
  const dark = tone === "dark"
  const metal = dark ? "#3a4448" : SLATE

  return (
    <>
      {/* Chassis */}
      <rect x="132" y="184" width="262" height="12" rx="2" fill={metal} />

      {/* Bed */}
      <motion.g data-bed style={{ transformBox: "fill-box", transformOrigin: "0% 100%", ...bedStyle }}>
        <motion.path
          data-load
          d="M152 108 C 180 76, 258 76, 292 108 Z"
          fill={LOAD}
          style={{ transformBox: "fill-box", transformOrigin: "50% 100%", ...loadStyle }}
        />
        <path d="M140 108 H 300 L 296 182 H 146 Z" fill={TRUCK_YELLOW} />
        <path d="M140 108 H 300" stroke={metal} strokeWidth="4" strokeLinecap="round" />
        <path d="M184 122 V 170 M 220 122 V 170 M 256 122 V 170" stroke={SLATE} strokeOpacity="0.2" strokeWidth="3" />
      </motion.g>

      {/* Headboard post and cab */}
      <rect x="304" y="112" width="6" height="74" rx="2" fill={metal} />
      <path d="M312 120 H 362 L 392 154 V 186 H 312 Z" fill={TRUCK_YELLOW} />
      <path d="M322 130 H 358 L 380 154 H 322 Z" fill={SLATE} />
      <rect x="384" y="166" width="10" height="6" rx="1" fill={dark ? "#f8f7f3" : SLATE} opacity="0.7" />

      {/* Wheels */}
      {[176, 226, 360].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="198" r="15" fill={dark ? "#0e1214" : SLATE} stroke={dark ? "#f8f7f3" : "none"} strokeOpacity="0.2" strokeWidth="2" />
          <circle cx={cx} cy="198" r="6" fill={HUB} />
        </g>
      ))}
    </>
  )
}
