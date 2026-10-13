"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import type { Media } from "@/lib/media"
import { MediaFrame } from "@/components/media/media-frame"
import { hero } from "@/content/home"
import { easeCut as cut, easeSnap as snap } from "@/lib/motion"

/**
 * The page's opening move, kept snappy: a saw line whips across the frame,
 * the cut snaps open to reveal the stone, and the headline punches up.
 */
export function Hero({ media }: { media: Media }) {
  const ref = useRef<HTMLElement>(null)
  // The rendered tree is identical with or without reduced motion (so server and
  // client markup match); reduced motion only collapses timings to zero.
  const reduce = useReducedMotion() === true
  const t = (duration: number, delay = 0) => (reduce ? { duration: 0, delay: 0 } : { duration, delay })
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12])
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"])

  return (
    <section
      ref={ref}
      aria-label="Introduction"
      className="on-bluestone relative isolate flex min-h-[100svh] items-end overflow-hidden bg-bluestone text-honed"
    >
      {/* The saw line */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 z-10 h-px origin-left bg-honed/80"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{
          scaleX: { ...t(0.42), ease: cut },
          opacity: t(0.18, 0.46),
        }}
      />

      {/* The stone, revealed by the cut opening */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ clipPath: "inset(50% 0% 50% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ ...t(0.7, 0.36), ease: cut }}
      >
        <motion.div className="absolute inset-0" style={{ scale: mediaScale, y: mediaY }}>
          <MediaFrame
            media={media}
            alt="Limestone slabs stacked in the yard"
            tone={{ base: "#8e8a80", vein: "#5d5a52", grain: "#3f3d38" }}
            preload
          />
        </motion.div>
        {/* Legibility: a bluestone wash from the lower left where the copy sits */}
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
                transition={{ ...t(0.55, 0.72 + i * 0.06), ease: snap }}
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
          transition={{ ...t(0.4, 1.0), ease: snap }}
        >
          <p className="type-lede max-w-[38ch] text-honed/85">{hero.body}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={hero.primaryCta.href}
              className="press inline-flex h-12 items-center rounded-full bg-honed px-7 text-bluestone hover:bg-lichen-light"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="press inline-flex h-12 items-center rounded-full border border-honed/40 px-7 hover:border-honed hover:bg-honed/10"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
