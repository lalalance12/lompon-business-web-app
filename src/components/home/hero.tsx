"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "motion/react"
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"
import type { Media } from "@/lib/media"
import { MediaFrame } from "@/components/media/media-frame"
import { hero } from "@/content/home"
import { easeCut as cut, easeSnap as snap } from "@/lib/motion"

/**
 * The page's opening move, kept snappy: the picture pours in from the top
 * like a load tipping out of a truck bed, then the headline punches up.
 */
export function Hero({ media }: { media: Media }) {
  const ref = useRef<HTMLElement>(null)
  // The rendered tree is identical with or without reduced motion (so server and
  // client markup match); reduced motion only collapses timings to zero.
  const reduce = usePrefersReducedMotion()
  const t = (duration: number, delay = 0) => (reduce ? { duration: 0, delay: 0 } : { duration, delay })
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12])
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"])

  return (
    <section
      ref={ref}
      aria-label="Introduction"
      className="on-slate relative isolate flex min-h-[100svh] items-end overflow-hidden bg-slate text-limewash"
    >
      {/* The yard, poured in from the top */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ ...t(0.75, 0.05), ease: cut }}
      >
        <motion.div className="absolute inset-0" style={{ scale: mediaScale, y: mediaY }}>
          <MediaFrame
            media={media}
            alt="Gravel piles and a loader at the limestone yard"
            tone={{ base: "#8e8a80", vein: "#5d5a52", grain: "#3f3d38" }}
            preload
          />
        </motion.div>
        {/* Legibility: a slate wash from the lower left where the copy sits */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(35_41_44/0.92)_0%,rgb(35_41_44/0.55)_38%,rgb(35_41_44/0.05)_70%),linear-gradient(to_right,rgb(35_41_44/0.5),transparent_60%)]" />
      </motion.div>

      <div className="page-gutter page-width relative w-full pt-32 pb-14 md:pb-20">
        <h1 className="type-display max-w-[17ch]">
          {hero.title.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ ...t(0.55, 0.45 + i * 0.06), ease: snap }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className="mt-10 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...t(0.4, 0.75), ease: snap }}
        >
          <p className="type-lede max-w-[38ch] text-limewash/85">{hero.body}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={hero.primaryCta.href}
              className="press inline-flex h-12 items-center rounded-full bg-loader px-7 text-slate hover:bg-limewash"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="press inline-flex h-12 items-center rounded-full border border-limewash/40 px-7 hover:border-limewash hover:bg-limewash/10"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
