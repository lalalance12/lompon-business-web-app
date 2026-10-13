"use client"

import { motion, type Variants } from "motion/react"
import { quick } from "@/lib/motion"

type Tag = "div" | "section" | "ul" | "ol" | "li" | "article"

const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: quick },
}

const viewport = { once: true, margin: "0px 0px -12% 0px" } as const

/** Rises into place the first time it scrolls into view. */
export function Reveal({
  as = "div",
  className,
  delay = 0,
  children,
}: {
  as?: Tag
  className?: string
  delay?: number
  children: React.ReactNode
}) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: rise.hidden, show: { ...rise.show, transition: { ...quick, delay } } }}
    >
      {children}
    </Comp>
  )
}

/** A list whose items rise in one after another, in quick succession. */
export function RevealGroup({
  as = "ul",
  className,
  stagger = 0.05,
  children,
}: {
  as?: Tag
  className?: string
  stagger?: number
  children: React.ReactNode
}) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Comp>
  )
}

export function RevealItem({
  as = "li",
  className,
  children,
  id,
}: {
  as?: Tag
  className?: string
  children: React.ReactNode
  id?: string
}) {
  const Comp = motion[as]
  return (
    <Comp id={id} className={className} variants={rise}>
      {children}
    </Comp>
  )
}
