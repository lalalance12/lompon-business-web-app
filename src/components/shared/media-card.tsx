import Link from "next/link"
import { cn } from "@/lib/utils"
import { cta } from "@/lib/cta"
import type { Media } from "@/lib/media"
import type { Tone } from "@/lib/texture"
import { MediaFrame } from "@/components/media/media-frame"

const CLAMP = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
} as const

/**
 * The site's standard picture card: a linked image, an optional badge,
 * a title, a description held to a fixed number of lines (cut off with
 * "…" and always that tall, so cards side by side line up), optional
 * extras such as chips, and a call to action pinned to the bottom.
 */
export function MediaCard({
  href,
  media,
  alt,
  tone,
  sizes = "(min-width: 768px) 50vw, 100vw",
  frameClassName = "aspect-[16/10]",
  badge,
  title,
  titleSize = "h3",
  description,
  lines = 2,
  cta: ctaLabel,
  className,
  children,
}: {
  href: string
  media: Media
  alt: string
  tone?: Tone
  sizes?: string
  /** Shape of the image, e.g. "aspect-[4/5]" or "md:flex-1" to fill the card. */
  frameClassName?: string
  badge?: React.ReactNode
  title: string
  /** "h2" for headline cards, "h3" for regular cards. */
  titleSize?: "h2" | "h3"
  description?: string
  /** Lines of description shown before it is cut off with "…". */
  lines?: 1 | 2 | 3
  cta?: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <Link href={href} className={cn("group flex h-full w-full flex-col", className)}>
      <div className={cn("relative overflow-hidden rounded-sm", frameClassName)}>
        <MediaFrame
          media={media}
          alt={alt}
          tone={tone}
          sizes={sizes}
          imageClassName="transition-transform duration-500 ease-snap group-hover:scale-[1.04]"
        />
        {badge && (
          <span className="absolute top-4 left-4 rounded-full bg-loader px-4 py-2 text-sm text-slate">{badge}</span>
        )}
      </div>
      <h3 className={cn("mt-6 line-clamp-1", titleSize === "h2" ? "type-h2" : "type-h3")}>{title}</h3>
      {description && (
        <p
          className={cn("mt-2 max-w-[52ch] leading-normal text-silt", CLAMP[lines])}
          // Reserve the full height even when the text is shorter, so neighbours align
          style={{ minHeight: `${lines * 1.5}em` }}
        >
          {description}
        </p>
      )}
      {children}
      {ctaLabel && (
        // Pinned to the bottom, with room above it even on the tallest card
        <div className="mt-auto pt-6">
          <span
            className={cta({
              tone: "outline",
              size: "sm",
              className: "group-hover:border-slate group-hover:bg-slate group-hover:text-limewash",
            })}
          >
            {ctaLabel}
          </span>
        </div>
      )}
    </Link>
  )
}
