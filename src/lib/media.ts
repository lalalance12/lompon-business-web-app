import fs from "node:fs"
import path from "node:path"

/**
 * Media slots.
 *
 * Content files name a slot by its path under /public without an extension,
 * e.g. "media/stones/coral-stone/cover". At render time we look for a real
 * file with any supported extension. If none exists, components fall back to
 * a generated stone texture, so the site always looks finished.
 *
 * Server-only: uses the filesystem. Resolve on the server, pass results down.
 */

const IMAGE_EXT = ["avif", "webp", "jpg", "jpeg", "png"]
const VIDEO_EXT = ["mp4", "webm"]

export type Media = {
  image: string | null
  video: string | null
  /** Where to drop a file to fill this slot — shown on placeholders in development. */
  hint: string
}

const publicDir = path.join(process.cwd(), "public")

function find(base: string, exts: string[]) {
  for (const ext of exts) {
    const rel = `${base}.${ext}`
    if (fs.existsSync(path.join(publicDir, rel))) return `/${rel}`
  }
  return null
}

/** An image-only slot. */
export function image(base: string): Media {
  return { image: find(base, IMAGE_EXT), video: null, hint: `public/${base}.jpg` }
}

/** A video slot with an optional poster image slot. */
export function video(base: string, posterBase?: string): Media {
  return {
    video: find(base, VIDEO_EXT),
    image: posterBase ? find(posterBase, IMAGE_EXT) : null,
    hint: `public/${base}.mp4`,
  }
}
