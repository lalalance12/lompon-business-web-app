"use client"

import { useCallback, useEffect, useRef } from "react"
import { useAnimate, useInView, useReducedMotion } from "motion/react"
import { RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { easeSnap } from "@/lib/motion"

// Stones that pour from the bed: [x offset, landing y, radius]
const STONES: [number, number, number][] = [
  [-6, 203, 6], [-20, 205, 5], [-34, 204, 7], [-48, 206, 5], [-12, 196, 5],
  [-28, 195, 6], [-42, 197, 5], [-56, 205, 6], [-24, 186, 5], [-38, 188, 4],
  [-64, 206, 4], [-4, 206, 4], [-50, 192, 4], [-16, 189, 4],
]

/**
 * A dump truck that drives in, tips its bed and pours a pile of stone.
 * Plays once when it scrolls into view; the replay button runs it again.
 * With reduced motion it simply shows the truck parked beside its pile.
 */
export function DumpTruck({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const [scope, animate] = useAnimate<SVGSVGElement>()
  const inView = useInView(scope, { once: true, amount: 0.4 })
  const reduce = useReducedMotion()
  const running = useRef(false)

  const run = useCallback(async () => {
    if (running.current || !scope.current) return
    running.current = true
    const stones = scope.current.querySelectorAll<SVGCircleElement>("[data-stone]")

    // Pivots are set through motion so it doesn't replace them with its
    // default centre origin: the bed hinges at its rear-bottom corner and the
    // pile grows up from the ground.
    const bedPivot = { originX: 0, originY: 1 }
    const pilePivot = { originX: 0.5, originY: 1 }

    if (reduce) {
      await Promise.all([
        animate("[data-truck]", { x: 0 }, { duration: 0 }),
        animate("[data-bed]", { rotate: 0, ...bedPivot }, { duration: 0 }),
        animate("[data-pile]", { scaleY: 1, opacity: 1, ...pilePivot }, { duration: 0 }),
        animate(stones, { opacity: 0 }, { duration: 0 }),
      ])
      running.current = false
      return
    }

    // Reset to the starting pose
    await Promise.all([
      animate("[data-truck]", { x: -420 }, { duration: 0 }),
      animate("[data-bed]", { rotate: 0, ...bedPivot }, { duration: 0 }),
      animate("[data-pile]", { scaleY: 0, opacity: 0, ...pilePivot }, { duration: 0 }),
      animate(stones, { x: 0, y: 0, opacity: 0 }, { duration: 0 }),
    ])

    // Drive in and brake hard
    await animate("[data-truck]", { x: 0 }, { type: "spring", stiffness: 300, damping: 30, mass: 1 })
    // Tip the bed
    await animate("[data-bed]", { rotate: -32 }, { duration: 0.38, ease: easeSnap })
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
    animate("[data-pile]", { scaleY: 1, opacity: 1 }, { duration: 0.5, delay: 0.2, ease: easeSnap })
    await Promise.all(falls)
    // Drop the bed back down
    await animate("[data-bed]", { rotate: 0 }, { duration: 0.32, ease: easeSnap, delay: 0.15 })
    running.current = false
  }, [animate, reduce, scope])

  useEffect(() => {
    if (inView) run()
  }, [inView, run])

  const ink = tone === "dark" ? "#efede8" : "#23292c"

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
        <line x1="0" y1="212" x2="480" y2="212" stroke={ink} strokeOpacity="0.25" strokeWidth="2" />

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
            <circle key={i} data-stone cx="140" cy="150" r={r} fill={i % 3 === 0 ? "#9c9585" : "#c9c3b6"} opacity="0" />
          ))}

          {/* Chassis */}
          <rect x="132" y="184" width="262" height="12" rx="2" fill={ink} />

          {/* Bed, hinged at its rear-bottom corner */}
          <g data-bed style={{ transformBox: "fill-box", transformOrigin: "0% 100%" }}>
            <path d="M140 108 H 300 L 296 182 H 146 Z" fill="#56624a" />
            <path d="M140 108 H 300" stroke={ink} strokeWidth="4" strokeLinecap="round" />
            <path d="M160 100 C 190 82, 250 84, 284 100 L 284 108 H 160 Z" fill="#c9c3b6" />
            <path d="M184 120 V 170 M 220 120 V 170 M 256 120 V 170" stroke="#efede8" strokeOpacity="0.25" strokeWidth="3" />
          </g>

          {/* Cab */}
          <path d="M312 120 H 362 L 392 154 V 186 H 312 Z" fill={ink} />
          <path d="M322 130 H 358 L 380 154 H 322 Z" fill="#a9b496" />
          <rect x="304" y="112" width="6" height="74" rx="2" fill={ink} />

          {/* Wheels */}
          {[176, 226, 360].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy="198" r="15" fill={ink} />
              <circle cx={cx} cy="198" r="6" fill="#9c9585" />
            </g>
          ))}
        </g>
      </svg>

      <button
        type="button"
        onClick={run}
        className={cn(
          "press absolute top-0 right-0 inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm",
          tone === "dark" ? "text-honed/80 hover:bg-honed/10" : "text-silt hover:bg-bedding"
        )}
      >
        <RotateCcw className="size-4" aria-hidden="true" />
        Tip again
      </button>
    </div>
  )
}
