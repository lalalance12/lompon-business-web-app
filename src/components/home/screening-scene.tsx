"use client"

import { useCallback, useEffect, useRef } from "react"
import Link from "next/link"
import { RotateCcw } from "lucide-react"
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "motion/react"
import { cn } from "@/lib/utils"
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"

export type ScreenDeck = {
  slug: string
  name: string
  size: string
  price: string
}

// Scene geometry (SVG units)
const HOPPER_X = 300
const HOPPER_Y = 92
const DECK_Y = [190, 300, 410, 520] // three screens, then the floor
const DECK_LEFT = 96
const DECK_RIGHT = 504
const MESH = ["30 20", "14 9", "5 4"] // holes shrink deck by deck

// Stones by class: [deck index, radius range, count, fill]
const CLASSES: [number, [number, number], number, string][] = [
  [0, [20, 27], 6, "#8d8676"],
  [1, [9, 12], 11, "#9b9485"],
  [2, [4.5, 6.5], 16, "#a69f8f"],
  [3, [1.8, 2.8], 34, "#8f887a"],
]

/** Deterministic pseudo-random numbers, so server and client draw the same scene. */
function seeded(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Stone = { deck: number; r: number; fill: string; x: number; start: number; end: number }

const STONES: Stone[] = (() => {
  const rand = seeded(7)
  const out: Stone[] = []
  CLASSES.forEach(([deck, [rMin, rMax], count, fill]) => {
    for (let i = 0; i < count; i++) {
      const r = rMin + rand() * (rMax - rMin)
      // Spread evenly across the deck with a little jitter, so stones form a layer
      const slot = (i + 0.5) / count
      const x = DECK_LEFT + r + slot * (DECK_RIGHT - DECK_LEFT - 2 * r) + (rand() - 0.5) * 10
      const start = 0.06 + rand() * 0.42
      out.push({ deck, r, fill, x, start, end: start + 0.14 + deck * 0.04 })
    }
  })
  return out
})()

/** When each deck has finished filling, as a fraction of the sort. */
const DECK_DONE = [0, 1, 2, 3].map((d) => Math.max(...STONES.filter((s) => s.deck === d).map((s) => s.end)))
const SORT_END = Math.max(...DECK_DONE) + 0.01
const SORT_SECONDS = 3.6

/**
 * Plays once when it comes into view: mixed quarry stone pours from the
 * hopper and falls through three screens with shrinking holes. Each size
 * comes to rest on its own deck and its product lights up in the list.
 * "Sort again" replays it. With reduced motion it is shown already sorted.
 */
export function ScreeningScene({
  title,
  body,
  decks,
}: {
  title: string
  body: string
  /** In deck order: retained on screen 1, 2, 3, then what falls to the floor. */
  decks: ScreenDeck[]
}) {
  const ref = useRef<HTMLElement>(null)
  const reduce = usePrefersReducedMotion()
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const progress = useMotionValue(0)

  const sort = useCallback(() => {
    progress.set(0)
    return animate(progress, SORT_END, { duration: SORT_SECONDS, ease: "linear" })
  }, [progress])

  useEffect(() => {
    if (reduce) {
      progress.set(1)
      return
    }
    if (!inView) return
    const controls = sort()
    return () => controls.stop()
  }, [inView, reduce, progress, sort])

  return (
    <section
      ref={ref}
      aria-labelledby="screening-heading"
      className="py-24 md:py-32"
    >
      <div>
        <div className="page-gutter page-width grid w-full items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h2 id="screening-heading" className="type-h2">{title}</h2>
            <p className="type-lede mt-4 max-w-[44ch] text-silt">{body}</p>
            <ol className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-1 lg:gap-0 lg:border-t lg:border-border">
              {decks.map((d, i) => (
                <DeckLegend key={d.slug} deck={d} progress={progress} doneAt={DECK_DONE[i]} />
              ))}
            </ol>
            {!reduce && (
              <button
                type="button"
                onClick={() => sort()}
                className="press mt-6 inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm text-silt ring-1 ring-border hover:text-slate"
              >
                <RotateCcw className="size-4" aria-hidden="true" />
                Sort again
              </button>
            )}
          </div>

          <div className="lg:col-span-7">
            <svg viewBox="0 0 700 560" className="mx-auto h-auto max-h-[70svh] w-full" role="img" aria-label="Quarry stone falling through screens and sorting into four sizes">
              {/* Hopper */}
              <path d="M222 24 H 378 L 334 92 H 266 Z" fill="#1d2427" />
              <rect x="222" y="24" width="156" height="10" fill="#f4b400" />

              {/* Frame posts in machinery yellow */}
              <rect x="80" y="160" width="10" height="372" rx="2" fill="#f4b400" />
              <rect x="510" y="160" width="10" height="372" rx="2" fill="#f4b400" />

              {/* Screens, each with smaller holes than the last */}
              {MESH.map((dash, i) => (
                <line
                  key={i}
                  x1={DECK_LEFT - 6}
                  x2={DECK_RIGHT + 6}
                  y1={DECK_Y[i]}
                  y2={DECK_Y[i]}
                  stroke="#1d2427"
                  strokeWidth="5"
                  strokeDasharray={dash}
                />
              ))}
              {/* Floor */}
              <line x1={DECK_LEFT - 6} x2={DECK_RIGHT + 6} y1={DECK_Y[3]} y2={DECK_Y[3]} stroke="#1d2427" strokeWidth="5" />

              {STONES.map((s, i) => (
                <FallingStone key={i} stone={s} progress={progress} />
              ))}

              {/* Deck labels appear as each fills */}
              {decks.map((d, i) => (
                <DeckTag key={d.slug} y={DECK_Y[i]} label={d.name} progress={progress} doneAt={DECK_DONE[i]} />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

function FallingStone({ stone, progress }: { stone: Stone; progress: MotionValue<number> }) {
  const restY = DECK_Y[stone.deck] - 2.5 - stone.r
  const range = [stone.start, stone.end]
  // Accelerating fall: most of the drop happens late in the window, like gravity
  const y = useTransform(progress, range, [HOPPER_Y, restY], { ease: (t) => t * t })
  const x = useTransform(progress, range, [HOPPER_X + (stone.x - HOPPER_X) * 0.15, stone.x])
  const opacity = useTransform(progress, [stone.start - 0.01, stone.start], [0, 1])
  return <motion.circle r={stone.r} fill={stone.fill} style={{ x, y, opacity }} cx={0} cy={0} />
}

function DeckTag({ y, label, progress, doneAt }: { y: number; label: string; progress: MotionValue<number>; doneAt: number }) {
  const opacity = useTransform(progress, [doneAt - 0.04, doneAt], [0, 1])
  const x = useTransform(progress, [doneAt - 0.04, doneAt], [16, 0])
  return (
    <motion.g style={{ opacity, x }}>
      <path d={`M528 ${y - 22} H 520`} stroke="#1d2427" strokeWidth="2" />
      <rect x="532" y={y - 40} width="160" height="34" rx="17" fill="#1d2427" />
      <text x="612" y={y - 18} textAnchor="middle" fontSize="15" fill="#f8f7f3" fontFamily="var(--font-hanken)">
        {label}
      </text>
    </motion.g>
  )
}

function DeckLegend({
  deck,
  progress,
  doneAt,
}: {
  deck: ScreenDeck
  progress: MotionValue<number>
  doneAt: number
}) {
  const opacity = useTransform(progress, [doneAt - 0.06, doneAt], [0.35, 1])
  const bar = useTransform(progress, [doneAt - 0.06, doneAt], [0, 1])
  return (
    <motion.li style={{ opacity }} className="relative lg:border-b lg:border-border">
      <Link
        href={`/materials#${deck.slug}`}
        className={cn("group flex flex-col py-2 lg:flex-row lg:items-baseline lg:justify-between lg:gap-4 lg:py-4")}
      >
        <span className="text-lg transition-colors group-hover:text-ochre">{deck.name}</span>
        <span className="text-sm text-silt lg:text-right">
          {deck.size}, from {deck.price} a ton
        </span>
      </Link>
      <motion.span
        aria-hidden="true"
        className="absolute bottom-0 left-0 hidden h-0.5 w-full origin-left bg-loader lg:block"
        style={{ scaleX: bar }}
      />
    </motion.li>
  )
}
