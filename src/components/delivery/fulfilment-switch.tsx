"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { quick, snapSpring } from "@/lib/motion"
import type { Media } from "@/lib/media"
import { MediaFrame } from "@/components/media/media-frame"
import { DumpTruck } from "@/components/materials/dump-truck"
import { cta } from "@/lib/cta"

type Option = { label: string; title: string; body: string; points: string[] }
type Key = "delivery" | "pickup"

/**
 * Two ways to get an order, side by side behind one switch. The pill slides
 * to the chosen side and the panel swaps in place.
 */
export function FulfilmentSwitch({
  options,
  pickupMedia,
}: {
  options: Record<Key, Option>
  pickupMedia: Media
}) {
  const [active, setActive] = useState<Key>("delivery")
  const keys: Key[] = ["delivery", "pickup"]
  const option = options[active]

  return (
    <div>
      <div role="tablist" aria-label="How you get your order" className="inline-flex rounded-full bg-bedding p-1">
        {keys.map((key) => (
          <button
            key={key}
            role="tab"
            id={`tab-${key}`}
            aria-selected={active === key}
            aria-controls="fulfilment-panel"
            onClick={() => setActive(key)}
            className={cn(
              "press relative h-11 rounded-full px-6 text-[0.9375rem]",
              active === key ? "text-limewash" : "text-silt hover:text-slate"
            )}
          >
            {active === key && (
              <motion.span layoutId="fulfilment-pill" className="absolute inset-0 rounded-full bg-slate" transition={snapSpring} />
            )}
            <span className="relative">{options[key].label}</span>
          </button>
        ))}
      </div>

      <div
        id="fulfilment-panel"
        role="tabpanel"
        aria-labelledby={`tab-${active}`}
        className="mt-10 grid min-h-[26rem] items-center gap-10 md:grid-cols-2"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, x: active === "delivery" ? -24 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: active === "delivery" ? 24 : -24 }}
            transition={quick}
          >
            <h2 className="type-h2">{option.title}</h2>
            <p className="type-lede mt-4 max-w-[46ch] text-silt">{option.body}</p>
            <ul className="mt-8 space-y-3">
              {option.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-ochre" aria-hidden="true" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <Link
              href={active === "delivery" ? "/visit?delivery=1#inquiry" : "/visit"}
              className={cta({ tone: "primary", size: "md", className: "mt-8" })}
            >
              {active === "delivery" ? "Book a dump truck" : "See opening hours"}
            </Link>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={quick}
          >
            {active === "delivery" ? (
              <DumpTruck />
            ) : (
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <MediaFrame
                  media={pickupMedia}
                  alt="A customer's truck being loaded at the yard"
                  tone={{ base: "#c4bcab", vein: "#968d7b", grain: "#5f584b" }}
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
