"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Media } from "@/lib/media"
import type { Stone } from "@/content/stones"
import { MediaFrame } from "@/components/media/media-frame"

export type RackStone = Pick<Stone, "slug" | "name" | "family" | "summary" | "tone" | "origin"> & {
  cover: Media
}

/**
 * Stone slabs standing side by side, as on an A-frame rack in the yard.
 * Hovering or focusing a slab pulls it forward; selecting it opens the stone.
 * On small screens the rack becomes a swipeable row.
 */
export function SlabRack({ stones }: { stones: RackStone[] }) {
  const [active, setActive] = useState(0)

  return (
    <>
      {/* Desktop rack */}
      <ul className="hidden h-[min(78vh,46rem)] gap-2 md:flex">
        {stones.map((stone, i) => {
          const isActive = i === active
          return (
            <li
              key={stone.slug}
              className="relative min-w-0 transition-[flex-grow] duration-700 ease-settle"
              style={{ flexGrow: isActive ? 5 : 1, flexBasis: 0 }}
              onMouseEnter={() => setActive(i)}
            >
              <Link
                href={`/stones/${stone.slug}`}
                onFocus={() => setActive(i)}
                className="group absolute inset-0 overflow-hidden rounded-sm text-honed"
              >
                <MediaFrame
                  media={stone.cover}
                  alt={`${stone.name} slab`}
                  tone={stone.tone}
                  sizes="(min-width: 768px) 60vw, 100vw"
                  imageClassName="transition-transform duration-[1.2s] ease-settle group-hover:scale-[1.03]"
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t from-bluestone/85 via-bluestone/20 to-transparent transition-opacity duration-500",
                    isActive ? "opacity-100" : "opacity-60"
                  )}
                />

                {/* Collapsed: the name runs up the edge of the slab */}
                <span
                  aria-hidden={isActive}
                  className={cn(
                    "absolute bottom-6 left-1/2 -translate-x-1/2 font-display text-2xl whitespace-nowrap transition-opacity duration-300 [writing-mode:vertical-rl] rotate-180",
                    isActive ? "opacity-0" : "opacity-100 delay-200"
                  )}
                >
                  {stone.name}
                </span>

                {/* Expanded: the details */}
                <div
                  className={cn(
                    "absolute inset-x-0 bottom-0 p-8 transition-[opacity,transform] duration-500 lg:p-10",
                    isActive ? "translate-y-0 opacity-100 delay-300" : "pointer-events-none translate-y-3 opacity-0"
                  )}
                >
                  <p className="text-sm text-honed/75">
                    {stone.family}, {stone.origin}
                  </p>
                  <h3 className="type-h2 mt-2 whitespace-nowrap">{stone.name}</h3>
                  <p className="mt-3 max-w-[42ch] text-honed/85">{stone.summary}</p>
                  <span className="mt-6 inline-flex h-11 items-center rounded-full border border-honed/40 px-5 text-sm transition-colors group-hover:bg-honed group-hover:text-bluestone">
                    View {stone.name}
                  </span>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Mobile: swipeable row of slabs */}
      <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:none] md:hidden">
        {stones.map((stone) => (
          <li key={stone.slug} className="w-[78vw] max-w-sm shrink-0 snap-start">
            <Link href={`/stones/${stone.slug}`} className="block">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                <MediaFrame media={stone.cover} alt={`${stone.name} slab`} tone={stone.tone} sizes="80vw" />
              </div>
              <h3 className="type-h3 mt-4">{stone.name}</h3>
              <p className="mt-1 text-sm text-silt">{stone.family}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
