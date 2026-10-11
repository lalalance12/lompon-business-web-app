/**
 * Limestone-like placeholder textures: a base colour, horizontal clouding that
 * reads as sedimentary bedding, and fine grain flecks.
 *
 * The SVG is rendered to a small WebP once on the server (see
 * app/texture/[spec]/route.ts) so browsers never compute noise filters at
 * full size. Used wherever a real photo has not been added yet.
 */

export type Tone = { base: string; vein: string; grain?: string }

const HEX = /^[0-9a-f]{6}$/i
/** Bump when the texture recipe changes; responses are cached as immutable. */
const VERSION = "v3"

export function seedFrom(text: string) {
  let h = 0
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) | 0
  return Math.abs(h % 997)
}

/** URL of the rendered texture for a tone, e.g. /texture/v3-ddd5c3-b6aa91-8f8572-12 */
export function textureUrl(tone: Tone, seed = 1) {
  const hex = (c: string) => c.replace("#", "").toLowerCase()
  return `/texture/${VERSION}-${hex(tone.base)}-${hex(tone.vein)}-${hex(tone.grain ?? tone.vein)}-${seed}`
}

export function parseTextureSpec(spec: string) {
  const [version, base, vein, grain, seedText] = spec.split("-")
  const seed = Number(seedText)
  if (version !== VERSION) return null
  if (![base, vein, grain].every((c) => c && HEX.test(c)) || !Number.isInteger(seed) || seed < 0 || seed > 9999) {
    return null
  }
  return { tone: { base: `#${base}`, vein: `#${vein}`, grain: `#${grain}` }, seed }
}

function unit(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => (v / 255).toFixed(3))
}

export function textureSvg(tone: Tone, seed: number, size: number) {
  const [vr, vg, vb] = unit(tone.vein)
  const [gr, gg, gb] = unit(tone.grain ?? tone.vein)
  // Vary the bedding scale a little per seed so neighbouring slabs differ.
  const fx = (0.0018 + (seed % 7) * 0.0004).toFixed(4)
  const fy = (0.012 + (seed % 5) * 0.003).toFixed(4)

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 800 800">
<filter id="c" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="${fx} ${fy}" numOctaves="5" seed="${seed}"/><feColorMatrix values="0 0 0 0 ${vr} 0 0 0 0 ${vg} 0 0 0 0 ${vb} 2.1 0 0 0 -0.82"/></filter>
<filter id="g" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="${seed + 11}"/><feColorMatrix values="0 0 0 0 ${gr} 0 0 0 0 ${gg} 0 0 0 0 ${gb} 3.2 0 0 0 -2.0"/></filter>
<rect width="800" height="800" fill="${tone.base}"/>
<rect width="800" height="800" filter="url(#c)"/>
<rect width="800" height="800" filter="url(#g)" opacity="0.7"/>
</svg>`
}
