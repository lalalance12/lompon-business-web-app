import sharp from "sharp"
import { parseTextureSpec, textureSvg } from "@/lib/texture"

/**
 * Renders a placeholder stone texture to WebP. Responses are immutable for a
 * given spec, so browsers and CDNs cache them indefinitely.
 */
export async function GET(_request: Request, { params }: RouteContext<"/texture/[spec]">) {
  const { spec } = await params
  const parsed = parseTextureSpec(spec)
  if (!parsed) return new Response("Invalid texture", { status: 400 })

  const webp = await sharp(Buffer.from(textureSvg(parsed.tone, parsed.seed, 960)))
    .webp({ quality: 74 })
    .toBuffer()

  return new Response(new Uint8Array(webp), {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
