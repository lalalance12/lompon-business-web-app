/**
 * Bulk limestone: aggregate sold by the ton and lime sold by the sack.
 * Every name, size, price and use is a PLACEHOLDER — see PLACEHOLDERS.md.
 *
 * Media: /public/media/materials/<slug>.(jpg|webp|…) — a close photo of the
 * pile or the sack. Until then a texture in the material's colours is shown.
 */
import type { Tone } from "@/lib/texture"

export type SaleUnit = "ton" | "sack"

export type Material = {
  slug: string
  unit: SaleUnit
  name: string
  /** Local or trade name customers may ask for, e.g. "3/4 gravel". */
  alsoCalled?: string
  /** Size range shown on the card, e.g. "20–40 mm" or "40 kg sack". */
  size: string
  /** For aggregates: smallest and largest piece in mm, used for the size scale. */
  sizeMm?: [number, number]
  summary: string
  uses: string[]
  /** How it is sold, e.g. minimum order or sack weight. */
  sold: string
  /** Leave empty to show "Ask for today's price". */
  price?: string
  /** Safety or handling note shown with the product. */
  note?: string
  tone: Tone
}

export const materials: Material[] = [
  // ——— By the ton ———
  {
    slug: "limestone-fines",
    unit: "ton",
    name: "Limestone fines",
    alsoCalled: "Screenings, crusher dust",
    size: "0–5 mm",
    sizeMm: [0.5, 5],
    summary: "Fine crushed limestone that packs down hard and level.",
    uses: ["Bedding under pavers", "Backfill around pipes", "Paths and floor sub-base"],
    sold: "By the ton. Minimum 1 ton for pick-up.",
    tone: { base: "#d9d4c8", vein: "#bdb6a6", grain: "#8f887a" },
  },
  {
    slug: "pebbles",
    unit: "ton",
    name: "Pebbles",
    alsoCalled: "3/8 and 1/2 gravel",
    size: "5–20 mm",
    sizeMm: [5, 20],
    summary: "Small, clean crushed stone for concrete, drainage and gardens.",
    uses: ["Concrete mixes", "French drains", "Garden beds and walkways"],
    sold: "By the ton. Minimum 1 ton for pick-up.",
    tone: { base: "#cfc9bb", vein: "#a69f8f", grain: "#6f695c" },
  },
  {
    slug: "gravel",
    unit: "ton",
    name: "Crushed gravel",
    alsoCalled: "3/4 gravel",
    size: "20–40 mm",
    sizeMm: [20, 40],
    summary: "Angular crushed limestone that locks together under load.",
    uses: ["Structural concrete", "Footings and slabs", "Drainage layers"],
    sold: "By the ton. Minimum 1 ton for pick-up.",
    tone: { base: "#c7c1b3", vein: "#9b9485", grain: "#625c50" },
  },
  {
    slug: "road-base",
    unit: "ton",
    name: "Road base",
    alsoCalled: "Base course, sub-base, G1",
    size: "0–40 mm, graded",
    sizeMm: [1, 40],
    summary: "A graded mix of fines and stone that compacts into a firm road bed.",
    uses: ["Road and driveway sub-base", "Parking areas", "Building pads"],
    sold: "By the ton or by the truckload.",
    tone: { base: "#c9c1ae", vein: "#a1977f", grain: "#6c6453" },
  },
  {
    slug: "boulders",
    unit: "ton",
    name: "Boulders",
    alsoCalled: "Riprap, armour stone",
    size: "150–600 mm",
    sizeMm: [150, 600],
    summary: "Large, heavy pieces for holding back soil and water.",
    uses: ["Slope and riverbank protection", "Sea walls and riprap", "Retaining walls and landscaping"],
    sold: "By the ton or by the truckload. Delivery only for loads over 5 tons.",
    tone: { base: "#bdb6a7", vein: "#8d8676", grain: "#57524a" },
  },
  {
    slug: "fill-spall",
    unit: "ton",
    name: "Mixed fill",
    alsoCalled: "Spall, run-of-quarry",
    size: "Mixed, up to 150 mm",
    sizeMm: [5, 150],
    summary: "Ungraded quarry stone for raising and firming low ground.",
    uses: ["Filling low lots", "Temporary site roads", "Backfill behind walls"],
    sold: "By the truckload.",
    tone: { base: "#c4bcab", vein: "#968d7b", grain: "#5f584b" },
  },

  // ——— By the sack ———
  {
    slug: "fine-limestone",
    unit: "sack",
    name: "Fine limestone",
    alsoCalled: "Agricultural lime, limestone powder",
    size: "40 kg sack",
    summary: "Finely ground raw limestone. Gentle to handle and slow-acting.",
    uses: ["Sweetening acidic soil", "Poultry and feed grit", "Filler for mortar and paint"],
    sold: "By the sack. Bulk discounts from 20 sacks.",
    tone: { base: "#ece9e1", vein: "#d6d1c4", grain: "#b3ad9e" },
  },
  {
    slug: "cooked-limestone",
    unit: "sack",
    name: "Cooked limestone",
    alsoCalled: "Burnt lime, quicklime, apog",
    size: "25 kg sack",
    summary: "Limestone burned in a kiln. Strong and fast-acting.",
    uses: ["Lime plaster and mortar", "Soil stabilisation", "Water and waste treatment"],
    sold: "By the sack. Bulk discounts from 20 sacks.",
    note: "Gets hot and caustic when wet. Keep sacks dry and wear gloves and eye protection.",
    tone: { base: "#f0eee8", vein: "#dcd8cd", grain: "#c0baab" },
  },
]

export const tonMaterials = materials.filter((m) => m.unit === "ton")
export const sackMaterials = materials.filter((m) => m.unit === "sack")

export const materialMedia = (slug: string) => `media/materials/${slug}`

export const unitLabel: Record<SaleUnit, { title: string; plural: string }> = {
  ton: { title: "By the ton", plural: "tons" },
  sack: { title: "By the sack", plural: "sacks" },
}
