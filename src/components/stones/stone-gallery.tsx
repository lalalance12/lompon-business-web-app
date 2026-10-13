"use client"

import { useState } from "react"
import { Expand } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Media } from "@/lib/media"
import { MediaFrame } from "@/components/media/media-frame"
import { Lightbox, type LightboxItem } from "@/components/media/lightbox"

/**
 * The stone's photographs: a tall lead image, then the rest in pairs.
 * A video, if one has been added, sits after the lead image.
 * Any image opens the full-screen viewer.
 */
export function StoneGallery({
  name,
  items,
  video,
}: {
  name: string
  items: LightboxItem[]
  video: Media | null
}) {
  const [open, setOpen] = useState<number | null>(null)
  const [lead, ...rest] = items

  const tile = (item: LightboxItem, index: number, className: string) => (
    <button
      key={item.media.hint}
      type="button"
      onClick={() => setOpen(index)}
      className={cn("group relative block w-full overflow-hidden rounded-sm text-left", className)}
    >
      <MediaFrame
        media={item.media}
        alt={item.alt}
        tone={item.tone}
        sizes={index === 0 ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 29vw, 50vw"}
        preload={index === 0}
        imageClassName="transition-transform duration-500 ease-snap group-hover:scale-[1.04]"
      />
      <span className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-bluestone/55 text-honed opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        <Expand className="size-4" aria-hidden="true" />
      </span>
      <span className="sr-only">View larger: {item.alt}</span>
    </button>
  )

  return (
    <div className="space-y-3">
      {lead && tile(lead, 0, "aspect-[4/5]")}

      {video && (
        <div className="relative aspect-video overflow-hidden rounded-sm">
          <MediaFrame media={video} alt={`${name} in motion`} tone={lead?.tone} sizes="(min-width: 768px) 58vw, 100vw" />
        </div>
      )}

      {rest.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {rest.map((item, i) => tile(item, i + 1, rest.length % 2 === 1 && i === rest.length - 1 ? "col-span-2 aspect-[16/9]" : "aspect-square"))}
        </div>
      )}

      <Lightbox items={items} index={open} onIndexChange={setOpen} title={name} />
    </div>
  )
}
