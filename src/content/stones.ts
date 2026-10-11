/**
 * The stone catalog. Add, remove or edit entries here — every stone page,
 * filter and slab rack is generated from this list.
 *
 * Media lives in /public/media/stones/<slug>/ — see public/media/README.md.
 * Drop in a file with the expected name (any of .jpg .jpeg .png .webp .avif,
 * or .mp4 .webm for video) and it replaces the generated texture automatically.
 *
 * All names, origins and technical values are PLACEHOLDERS — see PLACEHOLDERS.md.
 */

export type Finish =
  | "Honed"
  | "Brushed"
  | "Tumbled"
  | "Sandblasted"
  | "Bush-hammered"
  | "Split face"

export type Application =
  | "Flooring"
  | "Wall cladding"
  | "Paving"
  | "Pool coping"
  | "Stairs"
  | "Landscaping"

export type ToneGroup = "Light" | "Warm" | "Grey" | "Blue-grey"

export type Stone = {
  slug: string
  name: string
  family: string
  origin: string
  toneGroup: ToneGroup
  /** Colours for the generated placeholder texture until real photos are added. */
  tone: { base: string; vein: string; grain?: string }
  summary: string
  description: string[]
  finishes: Finish[]
  applications: Application[]
  formats: { name: string; sizes: string; thickness: string }[]
  specs: { label: string; value: string }[]
  featured?: boolean
  /** Number of gallery slots to show on the stone page (gallery-1 … gallery-n). */
  galleryCount: number
}

const defaultSpecs = (density: string, absorption: string, strength: string) => [
  { label: "Bulk density", value: density },
  { label: "Water absorption", value: absorption },
  { label: "Compressive strength", value: strength },
  { label: "Slip resistance (honed, wet)", value: "Ask our team" },
  { label: "Frost resistance", value: "Ask our team" },
]

export const stones: Stone[] = [
  {
    slug: "coral-stone",
    name: "Coral Stone",
    family: "Shell limestone",
    origin: "Placeholder Province, PH",
    toneGroup: "Light",
    tone: { base: "#ddd5c3", vein: "#b6aa91", grain: "#8f8572" },
    summary: "Ivory stone with visible shell and coral fragments. Cool underfoot, made for pool decks.",
    description: [
      "Coral Stone formed from compacted shell and coral beds, so every piece carries small open pores and fossil fragments you can see from standing height.",
      "It stays cool in direct sun, which makes it our most requested stone for pool surrounds, verandas and garden paths.",
    ],
    finishes: ["Honed", "Brushed", "Tumbled", "Split face"],
    applications: ["Pool coping", "Paving", "Wall cladding", "Landscaping"],
    formats: [
      { name: "Tiles", sizes: "600 × 300, 600 × 600 mm", thickness: "20, 30 mm" },
      { name: "Pool coping", sizes: "600 × 350 mm, bullnose edge", thickness: "30 mm" },
      { name: "Wall strips", sizes: "Random lengths × 100 mm", thickness: "20 mm" },
    ],
    specs: defaultSpecs("2,050 kg/m³", "6.5%", "18 MPa"),
    featured: true,
    galleryCount: 4,
  },
  {
    slug: "jerusalem-gold",
    name: "Jerusalem Gold",
    family: "Dense limestone",
    origin: "Placeholder Region",
    toneGroup: "Warm",
    tone: { base: "#d7c08f", vein: "#b5965c", grain: "#8c7243" },
    summary: "Honey-gold with soft clouding. Warms up interiors and stone facades alike.",
    description: [
      "A dense, close-grained limestone with a gold body and soft darker clouding. It takes a honed finish well and ages to a deeper amber outdoors.",
      "Used for feature walls, entrance floors and full facades where you want warmth without busy veining.",
    ],
    finishes: ["Honed", "Brushed", "Bush-hammered", "Split face"],
    applications: ["Flooring", "Wall cladding", "Stairs"],
    formats: [
      { name: "Tiles", sizes: "600 × 600, 900 × 600 mm", thickness: "20 mm" },
      { name: "Slabs", sizes: "Up to 2,400 × 1,200 mm", thickness: "20, 30 mm" },
      { name: "Stair treads", sizes: "Made to measure", thickness: "30, 40 mm" },
    ],
    specs: defaultSpecs("2,450 kg/m³", "2.1%", "62 MPa"),
    featured: true,
    galleryCount: 4,
  },
  {
    slug: "indiana-buff",
    name: "Indiana Buff",
    family: "Oolitic limestone",
    origin: "Placeholder Region",
    toneGroup: "Light",
    tone: { base: "#d5cbb4", vein: "#bcae92", grain: "#968a71" },
    summary: "Even buff colour and fine texture. The architect's choice for calm, uniform walls.",
    description: [
      "An oolitic limestone with a remarkably even colour and fine texture, so large wall areas read as one calm surface.",
      "Easy to carve and profile, it is also our usual stone for window surrounds, sills and copings.",
    ],
    finishes: ["Honed", "Sandblasted", "Bush-hammered"],
    applications: ["Wall cladding", "Stairs", "Flooring"],
    formats: [
      { name: "Cladding panels", sizes: "600 × 300 to 1,200 × 600 mm", thickness: "30, 40 mm" },
      { name: "Sills and copings", sizes: "Made to measure", thickness: "50 mm" },
    ],
    specs: defaultSpecs("2,300 kg/m³", "4.8%", "32 MPa"),
    featured: true,
    galleryCount: 3,
  },
  {
    slug: "moleanos-beige",
    name: "Moleanos Beige",
    family: "Fine-grain limestone",
    origin: "Placeholder Region",
    toneGroup: "Warm",
    tone: { base: "#d8ccb3", vein: "#b09d7c", grain: "#857559" },
    summary: "Beige with fine directional streaks. Cut with the grain for linear floors.",
    description: [
      "Moleanos shows a fine directional streak. Cut with the grain for a linear floor, or across it for a softer, speckled look — we can show you both at the yard.",
      "Hard-wearing enough for busy hallways, kitchens and shop floors.",
    ],
    finishes: ["Honed", "Brushed", "Tumbled"],
    applications: ["Flooring", "Wall cladding", "Stairs"],
    formats: [
      { name: "Tiles", sizes: "600 × 300, 600 × 600, 900 × 450 mm", thickness: "20 mm" },
      { name: "Slabs", sizes: "Up to 2,700 × 1,400 mm", thickness: "20, 30 mm" },
    ],
    specs: defaultSpecs("2,500 kg/m³", "1.6%", "75 MPa"),
    featured: true,
    galleryCount: 3,
  },
  {
    slug: "travertine-classic",
    name: "Classic Travertine",
    family: "Travertine",
    origin: "Placeholder Region",
    toneGroup: "Warm",
    tone: { base: "#d8c6a8", vein: "#ae9572", grain: "#8a7254" },
    summary: "Layered cream and walnut bands with natural voids. Filled or left open.",
    description: [
      "Travertine is a banded limestone formed around mineral springs. Its natural voids can be filled for a smooth interior floor or left open for a weathered outdoor surface.",
      "Available vein-cut for strong linear bands or cross-cut for a cloudier pattern.",
    ],
    finishes: ["Honed", "Tumbled", "Brushed"],
    applications: ["Flooring", "Paving", "Pool coping", "Wall cladding"],
    formats: [
      { name: "Tiles", sizes: "400 × 400, 610 × 406 mm", thickness: "12, 20 mm" },
      { name: "Pavers", sizes: "French pattern set", thickness: "30 mm" },
    ],
    specs: defaultSpecs("2,400 kg/m³", "2.5%", "50 MPa"),
    featured: true,
    galleryCount: 4,
  },
  {
    slug: "fossil-grey",
    name: "Fossil Grey",
    family: "Fossiliferous limestone",
    origin: "Placeholder Region",
    toneGroup: "Grey",
    tone: { base: "#a9a69c", vein: "#7e7b71", grain: "#5d5a52" },
    summary: "Soft grey packed with shell fossils. Quiet from a distance, detailed up close.",
    description: [
      "A mid-grey limestone full of small shell fossils. From across a room it reads as a quiet grey; up close every tile is different.",
      "Popular for bathrooms, contemporary kitchens and terraces that need a cooler tone.",
    ],
    finishes: ["Honed", "Brushed", "Sandblasted"],
    applications: ["Flooring", "Wall cladding", "Paving"],
    formats: [
      { name: "Tiles", sizes: "600 × 600, 900 × 600 mm", thickness: "20 mm" },
      { name: "Pavers", sizes: "600 × 400 mm", thickness: "30 mm" },
    ],
    specs: defaultSpecs("2,550 kg/m³", "1.2%", "88 MPa"),
    featured: true,
    galleryCount: 3,
  },
  {
    slug: "kota-blue",
    name: "Kota Blue",
    family: "Dense limestone",
    origin: "Placeholder Region",
    toneGroup: "Blue-grey",
    tone: { base: "#727c7c", vein: "#525b5c", grain: "#3d4445" },
    summary: "Blue-grey, dense and hard. Built for driveways, steps and heavy foot traffic.",
    description: [
      "A very dense blue-grey limestone that handles vehicles, heavy foot traffic and outdoor stairs without fuss.",
      "Its natural surface has a slight sheen; a brushed or sandblasted finish adds grip for wet areas.",
    ],
    finishes: ["Brushed", "Sandblasted", "Split face", "Tumbled"],
    applications: ["Paving", "Stairs", "Landscaping"],
    formats: [
      { name: "Pavers", sizes: "600 × 600, 600 × 400 mm", thickness: "25, 40 mm" },
      { name: "Kerb and edging", sizes: "1,000 × 150 mm", thickness: "50 mm" },
    ],
    specs: defaultSpecs("2,650 kg/m³", "0.4%", "120 MPa"),
    galleryCount: 3,
  },
  {
    slug: "belgian-bluestone",
    name: "Belgian Bluestone",
    family: "Crinoidal limestone",
    origin: "Placeholder Region",
    toneGroup: "Blue-grey",
    tone: { base: "#4c5458", vein: "#353c40", grain: "#7a8285" },
    summary: "Deep blue-black with white crinoid flecks. Honed, it turns almost charcoal.",
    description: [
      "A deep blue-black limestone flecked with white crinoid fossils. Honed, it turns almost charcoal; bush-hammered, it lightens to a soft grey.",
      "The stone behind our colour palette — and a lasting choice for thresholds, steps and modern facades.",
    ],
    finishes: ["Honed", "Bush-hammered", "Sandblasted"],
    applications: ["Flooring", "Stairs", "Wall cladding", "Paving"],
    formats: [
      { name: "Tiles", sizes: "600 × 600, 800 × 400 mm", thickness: "20 mm" },
      { name: "Thresholds and steps", sizes: "Made to measure", thickness: "30, 50 mm" },
    ],
    specs: defaultSpecs("2,700 kg/m³", "0.2%", "140 MPa"),
    galleryCount: 3,
  },
  {
    slug: "bianco-calce",
    name: "Bianco Calce",
    family: "Chalky limestone",
    origin: "Placeholder Region",
    toneGroup: "Light",
    tone: { base: "#e7e2d6", vein: "#cbc3b1", grain: "#a69d8a" },
    summary: "Near-white with a chalky, matte face. Bright interiors and quiet walls.",
    description: [
      "Our palest stone: an almost white limestone with a chalky, matte face and very little movement.",
      "Best indoors — bright living spaces, feature walls and bathroom vanities.",
    ],
    finishes: ["Honed", "Brushed"],
    applications: ["Flooring", "Wall cladding"],
    formats: [
      { name: "Tiles", sizes: "600 × 600, 1,200 × 600 mm", thickness: "20 mm" },
      { name: "Slabs", sizes: "Up to 2,400 × 1,300 mm", thickness: "20 mm" },
    ],
    specs: defaultSpecs("2,200 kg/m³", "5.2%", "28 MPa"),
    galleryCount: 3,
  },
]

export const toneGroups: ToneGroup[] = ["Light", "Warm", "Grey", "Blue-grey"]
export const allApplications: Application[] = [
  "Flooring",
  "Wall cladding",
  "Paving",
  "Pool coping",
  "Stairs",
  "Landscaping",
]

export function getStone(slug: string) {
  return stones.find((s) => s.slug === slug)
}

/** Media base paths for a stone, relative to /public (no extension). */
export const stoneMedia = {
  cover: (slug: string) => `media/stones/${slug}/cover`,
  gallery: (slug: string, n: number) => `media/stones/${slug}/gallery-${n}`,
  video: (slug: string) => `media/stones/${slug}/video`,
  finish: (slug: string, finish: Finish) =>
    `media/stones/${slug}/finish-${finish.toLowerCase().replace(/\s+/g, "-")}`,
}
