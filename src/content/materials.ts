/**
 * Bulk limestone: crushed stone sold loose by the kilo (boulders by the
 * cubic metre), and lime sold by the sack.
 * Every name, size and use is a PLACEHOLDER — see PLACEHOLDERS.md.
 * Prices live in prices.ts.
 *
 * Media: /public/media/materials/<slug>.(jpg|webp|…) — a close photo of the
 * pile or the sack. Until then a texture in the material's colours is shown.
 */
import type { Tone } from "@/lib/texture"

/** "bulk" is loose stone (by the kilo, boulders by the m³); "sack" is bagged lime. */
export type SaleGroup = "bulk" | "sack"

export type Material = {
  slug: string
  group: SaleGroup
  name: string
  /** Local or trade name customers may ask for, e.g. "3/4 gravel". */
  alsoCalled?: string
  /** Size shown on the card, e.g. "Mesh 20" or "50 kg sack". Empty to show none. */
  size: string
  /** For aggregates: smallest and largest piece in mm, used for the size scale. */
  sizeMm?: [number, number]
  /** For sacks: weight of one sack in kg, used to work out truckloads. */
  sackKg?: number
  summary: string
  uses: string[]
  /** How it is sold, e.g. minimum order or sack weight. */
  sold: string
  /** Safety or handling note shown with the product. */
  note?: string
  tone: Tone
}

export const materials: Material[] = [
  // ——— Loose, by the kilo (boulders by the cubic metre) ———
  {
    slug: "limestone-fines",
    group: "bulk",
    name: "Limestone fines",
    alsoCalled: "Screenings, crusher dust",
    size: "Mesh 20",
    sizeMm: [0.1, 0.84],
    summary: "Fine crushed limestone that packs down hard and level.",
    uses: ["Bedding under pavers", "Backfill around pipes", "Paths and floor sub-base"],
    sold: "By the kilo, loaded at the yard.",
    tone: { base: "#d9d4c8", vein: "#bdb6a6", grain: "#8f887a" },
  },
  {
    slug: "grits",
    group: "bulk",
    name: "Grits",
    alsoCalled: "Limestone grit, coarse screenings",
    size: "Mesh 10",
    sizeMm: [0.84, 2],
    summary: "Coarse, gritty crushed limestone between fines and coarse.",
    uses: ["Hollow blocks and plaster", "Poultry grit", "Topping for paths"],
    sold: "By the kilo, loaded at the yard.",
    tone: { base: "#d3cdc0", vein: "#b2ab9b", grain: "#7f786b" },
  },
  {
    slug: "coarse",
    group: "bulk",
    name: "Coarse",
    alsoCalled: "Coarse aggregate",
    size: "Mesh 8",
    sizeMm: [2, 2.38],
    summary: "Coarse crushed limestone, a step up from grits, that drains and compacts well.",
    uses: ["Concrete and hollow blocks", "Drainage beds", "Driveway topping"],
    sold: "By the kilo, loaded at the yard.",
    tone: { base: "#cfc9bb", vein: "#a69f8f", grain: "#6f695c" },
  },
  {
    slug: "pebbles",
    group: "bulk",
    name: "Pebbles",
    size: "Mesh 6",
    sizeMm: [2.38, 3.36],
    summary: "Small, clean crushed stone for concrete, drainage and gardens.",
    uses: ["Concrete mixes", "French drains", "Garden beds and walkways"],
    sold: "By the kilo, loaded at the yard.",
    tone: { base: "#cbc5b7", vein: "#a29b8a", grain: "#6a6457" },
  },
  {
    slug: "gravel",
    group: "bulk",
    name: "Crushed gravel",
    alsoCalled: "3/4 gravel",
    size: "",
    summary: "Angular crushed limestone that locks together under load.",
    uses: ["Structural concrete", "Footings and slabs", "Roads and driveways"],
    sold: "By the kilo, loaded at the yard.",
    tone: { base: "#c7c1b3", vein: "#9b9485", grain: "#625c50" },
  },
  {
    slug: "boulders",
    group: "bulk",
    name: "Boulders",
    alsoCalled: "Riprap, armour stone",
    size: "",
    summary: "Large, heavy pieces for holding back soil and water.",
    uses: ["Slope and riverbank protection", "Sea walls and riprap", "Retaining walls and landscaping"],
    sold: "By the cubic metre, measured in the truck bed.",
    tone: { base: "#bdb6a7", vein: "#8d8676", grain: "#57524a" },
  },

  // ——— By the sack ———
  {
    slug: "cooked-limestone",
    group: "sack",
    name: "Cooked limestone",
    alsoCalled: "Burnt lime, quicklime, apog",
    size: "50 kg sack",
    sackKg: 50,
    summary: "Limestone burned in a kiln. Strong and fast-acting.",
    uses: ["Lime plaster and mortar", "Soil stabilisation", "Water and waste treatment"],
    sold: "By the 50 kg sack, ₱110 per sack.",
    note: "Gets hot and caustic when wet. Keep sacks dry and wear gloves and eye protection.",
    tone: { base: "#f0eee8", vein: "#dcd8cd", grain: "#c0baab" },
  },
]

export const bulkMaterials = materials.filter((m) => m.group === "bulk")
export const sackMaterials = materials.filter((m) => m.group === "sack")

export const materialMedia = (slug: string) => `media/materials/${slug}`

export const groupLabel: Record<SaleGroup, { title: string; short: string }> = {
  bulk: { title: "By the kilo", short: "kilo" },
  sack: { title: "By the sack", short: "sack" },
}
