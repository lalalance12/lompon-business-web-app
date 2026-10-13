"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Pause, Play } from "lucide-react"
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type AnimationPlaybackControls,
} from "motion/react"
import { cn } from "@/lib/utils"
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"
import { TruckParts } from "@/components/graphics/truck-parts"

type Stage = { title: string; body: string }

// Scene is drawn in a 1600 × 300 space; the ground is at y = 250.
const SCENE_W = 1600
const GROUND = 250
const TRUCK_LIFT = GROUND - 213 // truck wheels rest at y = 213 in its own drawing
const TRUCK_CENTER = 262 // centre of the truck in its own drawing

// Where the truck stands at each stop (x offset of the truck drawing)
const AT_YARD = -40
const AT_SCALE = 420
const AT_SITE = 1060

// Each part of the journey, as a fraction of one loop
const T = {
  loadStart: 0.03,
  loadEnd: 0.12,
  toScaleEnd: 0.27,
  weighEnd: 0.4,
  toSiteEnd: 0.7,
  tipEnd: 0.8,
  pourEnd: 0.88,
  lowerEnd: 0.93,
  fadeOut: 0.97,
}

/** Seconds for one full delivery, yard to site. */
const LOOP_SECONDS = 12
/** The frame shown with reduced motion: delivered, bed lowered, before fading. */
const FINISHED = 0.95

/**
 * A delivery on a loop, playing whenever the scene is on screen: the truck is
 * loaded at the yard, weighed (the readout counts up), driven to the site and
 * tipped, then fades out and the next load begins. It pauses off screen and
 * has a pause button. On narrow screens the view pans to follow the truck.
 * With reduced motion the scene shows the finished delivery, still.
 */
export function DeliveryJourney({
  title,
  body,
  stages,
  tons,
}: {
  title: string
  body: string
  stages: Stage[]
  tons: number
}) {
  const ref = useRef<HTMLElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const readout = useRef<HTMLSpanElement>(null)
  const reduce = usePrefersReducedMotion()
  const inView = useInView(ref, { amount: 0.3 })
  const [paused, setPaused] = useState(false)
  const p = useMotionValue(0)

  // Run the loop while visible and not paused, resuming from where it stopped
  useEffect(() => {
    if (reduce) {
      p.set(FINISHED)
      return
    }
    if (!inView || paused) return
    let controls: AnimationPlaybackControls | undefined
    let stopped = false
    const run = (from: number) => {
      controls = animate(p, 1, {
        duration: LOOP_SECONDS * (1 - from),
        ease: "linear",
        onComplete: () => {
          if (stopped) return
          p.set(0)
          run(0)
        },
      })
    }
    run(p.get() >= 1 ? 0 : p.get())
    return () => {
      stopped = true
      controls?.stop()
    }
  }, [inView, paused, reduce, p])

  // Truck path
  const truckX = useTransform(
    p,
    [0, T.loadEnd, T.toScaleEnd, T.weighEnd, T.toSiteEnd, 1],
    [AT_YARD, AT_YARD, AT_SCALE, AT_SCALE, AT_SITE, AT_SITE]
  )
  const loadScale = useTransform(p, [T.loadStart, T.loadEnd, T.toSiteEnd + 0.04, T.pourEnd], [0, 1, 1, 0])
  const bedRotate = useTransform(p, [T.toSiteEnd, T.tipEnd, T.pourEnd, T.lowerEnd], [0, -32, -32, 0])
  const pileScale = useTransform(p, [T.tipEnd - 0.03, T.pourEnd], [0, 1])
  const yardPile = useTransform(p, [T.loadStart, T.loadEnd], [1, 0.72])
  const weight = useTransform(p, [T.toScaleEnd, T.weighEnd - 0.04], [0, tons])
  const pour = useTransform(p, [T.tipEnd - 0.02, T.pourEnd], [0, 1])
  const pourOpacity = useTransform(p, [T.tipEnd - 0.02, T.tipEnd, T.pourEnd, T.pourEnd + 0.02], [0, 1, 1, 0])
  // Fade the truck and delivered pile out at the end of a loop, and the truck in at the start
  const truckOpacity = useTransform(p, [0, 0.02, T.fadeOut, 1], [0, 1, 1, 0])
  const siteOpacity = useTransform(p, [T.fadeOut, 1], [1, 0])

  // Weighbridge readout and active stage are written without re-rendering every frame
  const [stage, setStage] = useState(0)
  const stageAt = (v: number) => (v < T.loadEnd + 0.02 ? 0 : v < T.weighEnd ? 1 : v < T.toSiteEnd ? 2 : 3)
  useMotionValueEvent(p, "change", (v) => {
    const next = stageAt(v)
    setStage((s) => (s === next ? s : next))
  })
  useMotionValueEvent(weight, "change", (v) => {
    if (readout.current) readout.current.textContent = v.toFixed(1)
  })
  // With reduced motion the scene is static and finished, so show the last stage
  const activeStage = reduce ? stages.length - 1 : stage

  // Camera: on narrow screens the scene is wider than the view and pans with the truck
  const [frame, setFrame] = useState({ view: 0, scene: 0 })
  useEffect(() => {
    const el = viewport.current
    if (!el) return
    const measure = () => {
      const view = el.clientWidth
      setFrame({ view, scene: Math.max(view, 1100) })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const cameraX = useTransform(truckX, (tx) => {
    const { view, scene } = frame
    if (!view || scene <= view) return 0
    const truckPx = ((tx + TRUCK_CENTER) / SCENE_W) * scene
    return -Math.min(Math.max(truckPx - view / 2, 0), scene - view)
  })

  return (
    <section
      ref={ref}
      aria-labelledby="journey-heading"
      className="on-slate bg-slate py-24 text-limewash md:py-32"
    >
      <div>
        <div className="page-gutter page-width grid w-full gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-5">
            <h2 id="journey-heading" className="type-h2">{title}</h2>
            <p className="type-lede mt-4 max-w-[42ch] text-fossil">{body}</p>
          </div>

          <ol className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 lg:col-span-7">
            {stages.map((s, i) => (
              <li key={s.title} className="relative pt-4">
                <span className="absolute inset-x-0 top-0 h-0.5 bg-limewash/15" aria-hidden="true">
                  <motion.span
                    className="block h-full origin-left bg-loader"
                    initial={false}
                    animate={{ scaleX: activeStage >= i ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: [0.2, 0.9, 0.1, 1] }}
                  />
                </span>
                <p className={cn("font-display text-3xl transition-colors duration-200", activeStage >= i ? "text-loader" : "text-fossil/50")}>
                  {i + 1}
                </p>
                <h3 className={cn("mt-2 transition-colors duration-200", activeStage === i ? "text-limewash" : "text-fossil")}>{s.title}</h3>
                <p className="mt-1 hidden text-sm text-fossil sm:block">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="page-gutter page-width mt-6 w-full lg:mt-10">
          {/* Weighbridge readout */}
          <div className="mb-4 flex items-center gap-4 lg:mb-6">
            <div className="rounded-sm border border-limewash/15 bg-slate-raised px-4 py-2">
              <span className="block text-xs text-fossil">Weighbridge</span>
              <span className="type-figure text-3xl text-loader">
                <span ref={readout}>{reduce ? tons.toFixed(1) : "0.0"}</span> t
              </span>
            </div>
            <p className="hidden max-w-[30ch] text-sm text-fossil sm:block">Every load is weighed before it leaves. You pay for what the scale reads.</p>
            {!reduce && (
              <button
                type="button"
                onClick={() => setPaused((v) => !v)}
                aria-pressed={paused}
                className="press ml-auto inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm text-fossil ring-1 ring-limewash/20 hover:text-limewash"
              >
                {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
                {paused ? "Play" : "Pause"}
              </button>
            )}
          </div>

          <div ref={viewport} className="relative overflow-hidden">
            {/* The camera: a wider strip that pans with the truck on narrow screens */}
            <motion.div style={{ x: cameraX, width: frame.scene || "100%" }}>
            <svg
              viewBox={`0 0 ${SCENE_W} 300`}
              className="block h-auto w-full"
              role="img"
              aria-label="A dump truck is loaded at the yard, weighed, driven along the road and tips its load on site"
            >
              {/* Ground and road */}
              <line x1="0" y1={GROUND} x2={SCENE_W} y2={GROUND} stroke="#f8f7f3" strokeOpacity="0.25" strokeWidth="2" />
              <line x1="820" y1={GROUND + 18} x2="1200" y2={GROUND + 18} stroke="#f8f7f3" strokeOpacity="0.2" strokeWidth="3" strokeDasharray="26 22" />

              {/* The yard: stockpiles */}
              <motion.path
                d={`M10 ${GROUND} C 40 ${GROUND - 70}, 110 ${GROUND - 92}, 150 ${GROUND - 80} C 190 ${GROUND - 68}, 220 ${GROUND - 30}, 240 ${GROUND} Z`}
                fill="#a29f95"
                style={{ scaleY: yardPile, transformBox: "fill-box", transformOrigin: "50% 100%" }}
              />
              <path d={`M200 ${GROUND} C 220 ${GROUND - 40}, 260 ${GROUND - 52}, 290 ${GROUND - 44} C 310 ${GROUND - 36}, 320 ${GROUND - 16}, 330 ${GROUND} Z`} fill="#7e7a71" />
              <text x="20" y={GROUND + 40} fontSize="18" fill="#a29f95" fontFamily="var(--font-hanken)">The yard</text>

              {/* Weighbridge */}
              <rect x={AT_SCALE + 110} y={GROUND - 6} width="300" height="8" rx="2" fill="#f4b400" />
              <rect x={AT_SCALE + 430} y={GROUND - 120} width="8" height="120" fill="#a29f95" />
              <rect x={AT_SCALE + 412} y={GROUND - 156} width="44" height="36" rx="3" fill="#283135" stroke="#f4b400" strokeWidth="2" />
              <text x={AT_SCALE + 260} y={GROUND + 40} fontSize="18" textAnchor="middle" fill="#a29f95" fontFamily="var(--font-hanken)">Weighbridge</text>

              {/* The site: a building frame waiting for its stone */}
              <g stroke="#a29f95" strokeWidth="4" fill="none" opacity="0.8">
                <path d={`M1494 ${GROUND} V ${GROUND - 110} H 1590 V ${GROUND}`} />
                <path d={`M1486 ${GROUND - 108} L 1542 ${GROUND - 160} L 1598 ${GROUND - 108}`} />
                <path d={`M1528 ${GROUND} V ${GROUND - 54} H 1558 V ${GROUND}`} />
              </g>
              <text x="1542" y={GROUND + 40} fontSize="18" textAnchor="middle" fill="#a29f95" fontFamily="var(--font-hanken)">Your site</text>

              {/* The delivered pile, behind the truck's tail */}
              <motion.path
                d={`M${AT_SITE + 30} ${GROUND} C ${AT_SITE + 60} ${GROUND - 50}, ${AT_SITE + 120} ${GROUND - 66}, ${AT_SITE + 150} ${GROUND - 56} C ${AT_SITE + 175} ${GROUND - 46}, ${AT_SITE + 190} ${GROUND - 20}, ${AT_SITE + 200} ${GROUND} Z`}
                fill="#c9c3b6"
                style={{ scaleY: pileScale, opacity: siteOpacity, transformBox: "fill-box", transformOrigin: "90% 100%" }}
              />

              {/* Stone pouring from the tipped bed */}
              <motion.path
                d={`M${AT_SITE + 140} ${GROUND - 70} C ${AT_SITE + 130} ${GROUND - 40}, ${AT_SITE + 128} ${GROUND - 20}, ${AT_SITE + 132} ${GROUND - 4}`}
                stroke="#c9c3b6"
                strokeWidth="14"
                strokeLinecap="round"
                fill="none"
                style={{ pathLength: pour, opacity: pourOpacity }}
              />

              {/* The truck */}
              <motion.g style={{ x: truckX, y: TRUCK_LIFT, opacity: truckOpacity }}>
                <TruckParts tone="dark" bedStyle={{ rotate: bedRotate }} loadStyle={{ scaleY: loadScale }} />
              </motion.g>
            </svg>
            </motion.div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 lg:mt-8 lg:gap-3">
            <Link href="/delivery" className="press inline-flex h-11 items-center rounded-full bg-loader px-5 text-slate hover:bg-limewash lg:h-12 lg:px-7">
              How delivery works
            </Link>
            <Link href="/prices#delivery" className="press inline-flex h-11 items-center rounded-full border border-limewash/40 px-5 hover:border-limewash lg:h-12 lg:px-7">
              Delivery fees
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
