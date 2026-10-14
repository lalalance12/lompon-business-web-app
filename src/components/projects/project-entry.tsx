"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { LightboxItem } from "@/components/media/lightbox"
import { Lightbox } from "@/components/media/lightbox"
import { MediaFrame } from "@/components/media/media-frame"

export type ProjectEntryData = {
  slug: string
  title: string
  location: string
  year: number
  quantity: string
  method: "delivery" | "pickup"
  summary: string
  material: { slug: string; name: string } | null
  images: LightboxItem[]
}

/** One project: its photographs on one side, the facts on the other. Alternates sides down the page. */
export function ProjectEntry({ project, flip }: { project: ProjectEntryData; flip: boolean }) {
  const [open, setOpen] = useState<number | null>(null)
  const [lead, ...rest] = project.images

  return (
    <article id={project.slug} className="scroll-mt-28 grid gap-8 md:grid-cols-12 md:gap-10">
      <div className={cn("md:col-span-7", flip && "md:order-2 md:col-start-6")}>
        <div className="space-y-3">
          {lead && (
            <button
              type="button"
              onClick={() => setOpen(0)}
              className="relative block aspect-[3/2] w-full overflow-hidden rounded-sm"
            >
              <MediaFrame media={lead.media} alt={lead.alt} tone={lead.tone} sizes="(min-width: 768px) 58vw, 100vw" />
              <span className="sr-only">View photos of {project.title}</span>
            </button>
          )}
          {rest.length > 0 && (
            <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${rest.length}, minmax(0, 1fr))` }}>
              {rest.map((img, i) => (
                <button
                  key={img.media.hint}
                  type="button"
                  onClick={() => setOpen(i + 1)}
                  className={cn(
                    "relative overflow-hidden rounded-sm",
                    rest.length === 1 ? "aspect-[3/1]" : rest.length === 2 ? "aspect-[4/3]" : "aspect-square"
                  )}
                >
                  <MediaFrame media={img.media} alt={img.alt} tone={img.tone} sizes="(min-width: 768px) 30vw, 50vw" />
                  <span className="sr-only">View photo {i + 2}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={cn("flex flex-col md:col-span-4", flip ? "md:order-1 md:col-start-1" : "md:col-start-9")}>
        <p className="text-silt">
          {project.location}, {project.year}
        </p>
        <h2 className="type-h2 mt-2">{project.title}</h2>
        <p className="mt-5 max-w-[46ch] text-silt">{project.summary}</p>
        <dl className="mt-8 grid grid-cols-[7rem_1fr] gap-x-6 gap-y-3 border-t border-border pt-5 text-[0.9375rem]">
          <dt className="text-silt">Material</dt>
          <dd>
            {project.material ? (
              <Link href={`/materials#${project.material.slug}`} className="inline-block py-1 underline decoration-slate/30 underline-offset-4 transition-colors hover:decoration-slate">
                {project.material.name}
              </Link>
            ) : (
              "—"
            )}
          </dd>
          <dt className="text-silt">Amount</dt>
          <dd>{project.quantity}</dd>
          <dt className="text-silt">Got there by</dt>
          <dd>{project.method === "delivery" ? "Our dump trucks" : "Collected by the client"}</dd>
        </dl>
      </div>

      <Lightbox items={project.images} index={open} onIndexChange={setOpen} title={project.title} />
    </article>
  )
}
