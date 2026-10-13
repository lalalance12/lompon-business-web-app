"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"
import { quick } from "@/lib/motion"
import type { Media } from "@/lib/media"
import type { Tone } from "@/lib/texture"
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"
import { MediaFrame } from "@/components/media/media-frame"
import { cta } from "@/lib/cta"

export type ExplorerUse = {
  slug: string
  title: string
  body: string
  tone: Tone
  media: Media
  products: { slug: string; name: string; price: string }[]
}

const CYCLE_MS = 5000

/**
 * Jobs on one side, the chosen job on the other: what it is, a photo, and
 * the materials that suit it with their starting prices. Cycles through the
 * jobs on its own (with a progress bar) until someone picks one; hovering
 * or focusing pauses it. No auto-cycling with reduced motion.
 */
export function UseCaseExplorer({ uses }: { uses: ExplorerUse[] }) {
  const [active, setActive] = useState(0)
  const [chosen, setChosen] = useState(false)
  const [paused, setPaused] = useState(false)
  const reduce = usePrefersReducedMotion()
  const cycling = !chosen && !paused && !reduce

  useEffect(() => {
    if (!cycling) return
    const id = window.setTimeout(() => setActive((i) => (i + 1) % uses.length), CYCLE_MS)
    return () => window.clearTimeout(id)
  }, [cycling, active, uses.length])

  const pick = (i: number) => {
    setChosen(true)
    setActive(i)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const next = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]
    if (!next) return
    e.preventDefault()
    const i = (active + next + uses.length) % uses.length
    pick(i)
    document.getElementById(`use-tab-${uses[i].slug}`)?.focus()
  }

  const use = uses[active]

  return (
    <div
      className="grid gap-8 lg:grid-cols-12 lg:gap-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* The jobs */}
      <div
        role="tablist"
        aria-label="Jobs"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="-mx-4 flex snap-x gap-2 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] lg:col-span-5 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {uses.map((u, i) => {
          const on = i === active
          return (
            <button
              key={u.slug}
              id={`use-tab-${u.slug}`}
              role="tab"
              aria-selected={on}
              aria-controls="use-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => pick(i)}
              className={cn(
                "press relative shrink-0 snap-start overflow-hidden rounded-full border px-5 py-2.5 text-left text-[0.9375rem] lg:rounded-none lg:border-0 lg:border-b lg:px-0 lg:py-4 lg:text-xl lg:font-display",
                on
                  ? "border-slate bg-slate text-limewash lg:bg-transparent lg:text-slate"
                  : "border-border text-silt hover:text-slate lg:border-border"
              )}
            >
              <span className="relative flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={cn(
                    "hidden size-2.5 shrink-0 rounded-full transition-colors duration-200 lg:block",
                    on ? "bg-loader" : "bg-bedding"
                  )}
                />
                {u.title}
              </span>
              {/* Countdown to the next job while cycling */}
              {on && cycling && (
                <motion.span
                  key={`bar-${active}`}
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 hidden h-0.5 w-full origin-left bg-loader lg:block"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                />
              )}
            </button>
          )
        })}
      </div>

      {!chosen && !reduce && (
        <button
          type="button"
          onClick={() => setChosen(true)}
          className="press -mt-4 h-11 w-fit text-sm text-silt underline decoration-border underline-offset-4 hover:text-slate lg:col-span-5 lg:row-start-2 lg:mt-0"
        >
          Stop cycling through jobs
        </button>
      )}

      {/* The chosen job */}
      <div id="use-panel" role="tabpanel" aria-labelledby={`use-tab-${use.slug}`} className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={use.slug}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={quick}
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, ease: [0.2, 0.9, 0.1, 1] }}
              >
                <MediaFrame media={use.media} alt={use.title} tone={use.tone} sizes="(min-width: 1024px) 58vw, 100vw" />
              </motion.div>
            </div>
            <h3 className="type-h3 mt-6">{use.title}</h3>
            <p className="mt-2 max-w-[56ch] text-silt">{use.body}</p>
            <p className="mt-6 text-sm text-silt">Materials for this job</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {use.products.map((prod) => (
                <li key={prod.slug}>
                  <Link
                    href={`/materials#${prod.slug}`}
                    className={cta({ tone: "chip", size: "sm" })}
                  >
                    <span>{prod.name}</span>
                    <span className="text-silt">{prod.price}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
