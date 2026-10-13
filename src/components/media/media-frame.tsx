import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Media } from "@/lib/media"
import { seedFrom, textureUrl, type Tone } from "@/lib/texture"
import { AmbientVideo } from "./ambient-video"

const FALLBACK_TONE: Tone = { base: "#cfc9bc", vein: "#aaa292", grain: "#857d6d" }

type MediaFrameProps = {
  media: Media
  alt: string
  /** Colours for the generated texture shown until a real file is added. */
  tone?: Tone
  sizes?: string
  /** Load eagerly and preload — only for the largest above-the-fold image. */
  preload?: boolean
  className?: string
  imageClassName?: string
}

/**
 * Fills its (positioned, sized) parent with a video, an image, or a generated
 * stone texture — in that order of preference.
 */
export function MediaFrame({
  media,
  alt,
  tone = FALLBACK_TONE,
  sizes = "100vw",
  preload = false,
  className,
  imageClassName,
}: MediaFrameProps) {
  const texture = `url(${textureUrl(tone, seedFrom(media.hint))})`

  return (
    <div
      className={cn("group/media absolute inset-0 overflow-hidden bg-cover bg-center", className)}
      style={{ backgroundImage: texture, backgroundColor: tone.base }}
    >
      {media.image && (
        <Image
          src={media.image}
          alt={media.video ? "" : alt}
          fill
          sizes={sizes}
          preload={preload}
          className={cn("object-cover", imageClassName)}
        />
      )}
      {media.video && (
        <AmbientVideo
          src={media.video}
          poster={media.image ?? undefined}
          label={alt}
          className={imageClassName}
        />
      )}
      {!media.image && !media.video && (
        <>
          <span className="sr-only">{alt}</span>
          {process.env.NODE_ENV === "development" && (
            <span className="pointer-events-none absolute top-2 left-2 z-10 max-w-[calc(100%-1rem)] rounded-sm bg-slate/80 px-2 py-1 text-[11px] leading-tight break-all text-limewash opacity-0 transition-opacity group-hover/media:opacity-100">
              {media.hint}
            </span>
          )}
        </>
      )}
    </div>
  )
}
