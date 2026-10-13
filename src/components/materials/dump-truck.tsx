"use client"

import { useCallback, useEffect, useRef } from "react"
import { MotionConfig, useAnimate, useInView, useReducedMotion } from "motion/react"
import { RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { easeSnap } from "@/lib/motion"
import { TruckParts } from "@/components/graphics/truck-parts"

// Stones that pour from the bed: [x offset, landing y, radius]
const STONES: [number, number, number][] = [
  [-6, 203, 6], [-20, 205, 5], [-34, 204, 7], [-48, 206, 5], [-12, 196, 5],
  [-28, 195, 6], [-42, 197, 5], [-56, 205, 6], [-24, 186, 5], [-38, 188, 4],
  [-64, 206, 4], [-4, 206, 4], [-50, 192, 4], [-16, 189, 4],
]

/**
 * A dump truck that drives in, tips its bed and pours a pile of stone.
 * Plays once when it scrolls into view; "Tip again" runs it again. With
 * reduced motion it doesn't play by itself and shows the truck parked beside
 * its pile, but "Tip again" still plays it: the visitor asked for that motion.
 */
export function DumpTruck(props: { className?: string; tone?: "light" | "dark" }) {
  // "never" sits above the animating component so useAnimate sees it: the
  // site-wide reduced-motion setting would otherwise make the moves instant
  // even when the visitor pressed "Tip again". Automatic play still checks
  // the preference itself below.
  return (
    <MotionConfig reducedMotion="never">
      <DumpTruckScene {...props} />
    </MotionConfig>
  )
}

function DumpTruckScene({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const [scope, animate] = useAnimate<SVGSVGElement>()
  const inView = useInView(scope, { once: true, amount: 0.4 })
  const reduce = useReducedMotion()
  const running = useRef(false)

  /** `requested`: the visitor pressed "Tip again", so play even with reduced motion. */
  const run = useCallback(async (requested = false) => {
    if (running.current || !scope.current) return
    running.current = true
    try {
    const stones = scope.current.querySelectorAll<SVGCircleElement>("[data-stone]")

    // Pivots are set through motion so it doesn't replace them with its
    // default centre origin: the bed hinges at its rear-bottom corner and the
    // pile grows up from the ground.
    const bedPivot = { originX: 0, originY: 1 }
    const pilePivot = { originX: 0.5, originY: 1 }

    if (reduce && !requested) {
      await Promise.all([
        animate("[data-truck]", { x: 0 }, { duration: 0 }),
        animate("[data-bed]", { rotate: 0, ...bedPivot }, { duration: 0 }),
        animate("[data-pile]", { scaleY: 1, opacity: 1, ...pilePivot }, { duration: 0 }),
        animate("[data-load]", { scaleY: 0, ...pilePivot }, { duration: 0 }),
        animate(stones, { opacity: 0 }, { duration: 0 }),
      ])
      return
    }

    // Reset to the starting pose
    await Promise.all([
      animate("[data-truck]", { x: -420 }, { duration: 0 }),
      animate("[data-bed]", { rotate: 0, ...bedPivot }, { duration: 0 }),
      animate("[data-pile]", { scaleY: 0, opacity: 0, ...pilePivot }, { duration: 0 }),
      animate(stones, { x: 0, y: 0, opacity: 0 }, { duration: 0 }),
      animate("[data-load]", { scaleY: 1, ...pilePivot }, { duration: 0 }),
    ])

    // Every move states its start as well as its end, so a replay never
    // depends on the instant reset above having been applied yet.
    // Drive in and brake hard
    await animate("[data-truck]", { x: [-420, 0] }, { duration: 0.75, ease: easeSnap })
    // Tip the bed
    await animate("[data-bed]", { rotate: [0, -32] }, { duration: 0.38, ease: easeSnap })
    // Pour
    const falls = Array.from(stones).map((el, i) => {
      const [dx, landY, r] = STONES[i]
      const startY = 150
      return animate(
        el,
        { opacity: [1, 1], x: [0, dx], y: [0, landY - r - startY] },
        { duration: 0.42, delay: i * 0.03, ease: [0.5, 0, 0.9, 0.6] }
      )
    })
    animate("[data-pile]", { scaleY: [0, 1], opacity: [0, 1] }, { duration: 0.5, delay: 0.2, ease: easeSnap })
    animate("[data-load]", { scaleY: [1, 0] }, { duration: 0.45, delay: 0.05, ease: easeSnap })
    await Promise.all(falls)
    // Drop the bed back down
    await animate("[data-bed]", { rotate: [-32, 0] }, { duration: 0.32, ease: easeSnap, delay: 0.15 })
    } finally {
      // Always release, so a failed or interrupted run never leaves the button dead
      running.current = false
    }
  }, [animate, reduce, scope])

  useEffect(() => {
    if (inView) run()
  }, [inView, run])

  const ground = tone === "dark" ? "#f8f7f3" : "#1d2427"

  return (
    <div className={cn("relative", className)}>
      <svg
        ref={scope}
        viewBox="0 0 480 230"
        role="img"
        aria-label="A dump truck tipping a load of limestone"
        className="h-auto w-full"
      >
        {/* Ground */}
        <line x1="0" y1="212" x2="480" y2="212" stroke={ground} strokeOpacity="0.25" strokeWidth="2" />

        {/* The pile left behind */}
        <path
          data-pile
          d="M10 212 C 30 180, 70 168, 96 176 C 118 184, 132 198, 140 212 Z"
          fill="#b7b0a1"
          style={{ transformBox: "fill-box", transformOrigin: "50% 100%", opacity: 0 }}
        />

        <g data-truck style={{ transform: "translateX(-420px)" }}>
          {/* Falling stones start at the bed's tail */}
          {STONES.map(([, , r], i) => (
            <circle key={i} data-stone cx="140" cy="150" r={r} fill={i % 3 === 0 ? "#a29f95" : "#c9c3b6"} opacity="0" />
          ))}

          <TruckParts tone={tone} />
        </g>
      </svg>

      <button
        type="button"
        onClick={() => run(true)}
        className={cn(
          "press absolute top-0 right-0 z-10 inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm",
          tone === "dark" ? "text-limewash/80 hover:bg-limewash/10" : "text-silt hover:bg-bedding"
        )}
      >
        <RotateCcw className="size-4" aria-hidden="true" />
        Tip again
      </button>
    </div>
  )
}
