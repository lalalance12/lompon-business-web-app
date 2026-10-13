"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import type { Media } from "@/lib/media"
import type { Application, Stone, ToneGroup } from "@/content/stones"
import { MediaFrame } from "@/components/media/media-frame"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export type CatalogStone = Pick<
  Stone,
  "slug" | "name" | "family" | "origin" | "tone" | "toneGroup" | "applications" | "finishes"
> & { cover: Media }

const ALL = "all"

export function StoneCatalog({
  stones,
  toneGroups,
  applications,
}: {
  stones: CatalogStone[]
  toneGroups: ToneGroup[]
  applications: Application[]
}) {
  const [tone, setTone] = useState<string>(ALL)
  const [use, setUse] = useState<string>(ALL)

  const visible = useMemo(
    () =>
      stones.filter(
        (s) =>
          (tone === ALL || s.toneGroup === tone) &&
          (use === ALL || s.applications.includes(use as Application))
      ),
    [stones, tone, use]
  )

  return (
    <div>
      <div className="flex flex-col gap-6 border-y border-border py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <span id="tone-label" className="text-sm text-silt">Colour</span>
          <ToggleGroup
            type="single"
            value={tone}
            onValueChange={(v) => setTone(v || ALL)}
            aria-labelledby="tone-label"
            className="flex-wrap justify-start gap-1.5"
            spacing={1}
          >
            {[ALL, ...toneGroups].map((t) => (
              <ToggleGroupItem
                key={t}
                value={t}
                className="h-10 rounded-full border border-border px-4 text-[0.9375rem] font-normal hover:bg-bedding data-[state=on]:border-bluestone data-[state=on]:bg-bluestone data-[state=on]:text-honed data-[state=on]:hover:bg-bluestone data-[state=on]:hover:text-honed"
              >
                {t === ALL ? "All colours" : t}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="flex items-center gap-3">
          <Label htmlFor="use-filter" className="text-sm font-normal text-silt">Use</Label>
          <Select value={use} onValueChange={setUse}>
            <SelectTrigger id="use-filter" className="min-w-48 data-[size=default]:h-10 rounded-full border-border bg-transparent px-4 text-[0.9375rem]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Any use</SelectItem>
              {applications.map((a) => (
                <SelectItem key={a} value={a}>{a}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="mt-6 text-sm text-silt" aria-live="polite">
        {visible.length === stones.length
          ? `Showing all ${stones.length} stones`
          : `Showing ${visible.length} of ${stones.length} stones`}
      </p>

      <motion.ul layout className="mt-8 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((stone) => (
            <motion.li
              key={stone.slug}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.2, 0.9, 0.1, 1] }}
            >
              <Link href={`/stones/${stone.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                  <MediaFrame
                    media={stone.cover}
                    alt={`${stone.name} limestone`}
                    tone={stone.tone}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    imageClassName="transition-transform duration-500 ease-snap group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h2 className="type-h3">{stone.name}</h2>
                  <span className="shrink-0 text-sm text-silt">{stone.toneGroup}</span>
                </div>
                <p className="mt-1 text-silt">
                  {stone.family}, {stone.finishes.length} finishes
                </p>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 && (
        <div className="py-20 text-center">
          <p className="type-h3">No stones match both filters.</p>
          <button
            type="button"
            onClick={() => {
              setTone(ALL)
              setUse(ALL)
            }}
            className="press mt-4 inline-flex h-11 items-center rounded-full border border-bluestone/30 px-5 hover:bg-bluestone hover:text-honed"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
