/**
 * What our limestone is used for, and which products suit each job.
 * Shown on the home page so visitors can start from their job, not from
 * product names. All copy is PLACEHOLDER — see PLACEHOLDERS.md.
 *
 * Media: /public/media/uses/<slug>.(jpg|webp|…), landscape 4:3.
 */
import type { Tone } from "@/lib/texture"

export type UseCase = {
  slug: string
  title: string
  body: string
  /** Material slugs from materials.ts, best match first. */
  products: string[]
  tone: Tone
}

export const useCases: UseCase[] = [
  {
    slug: "roads",
    title: "Roads and driveways",
    body: "Road base compacts into a hard, level bed that carries trucks for years. Top it with fines for a smooth finish.",
    products: ["road-base", "limestone-fines", "fill-spall"],
    tone: { base: "#c9c1ae", vein: "#a1977f", grain: "#6c6453" },
  },
  {
    slug: "concrete",
    title: "Concrete and foundations",
    body: "Clean, angular crushed gravel and pebbles lock into cement for strong footings, slabs and columns.",
    products: ["gravel", "pebbles"],
    tone: { base: "#c7c1b3", vein: "#9b9485", grain: "#625c50" },
  },
  {
    slug: "shore",
    title: "River, slope and sea walls",
    body: "Heavy boulders stop soil and water from washing away: riprap, sea walls and riverbank protection.",
    products: ["boulders"],
    tone: { base: "#bdb6a7", vein: "#8d8676", grain: "#57524a" },
  },
  {
    slug: "filling",
    title: "Filling low lots",
    body: "Raise and firm up low or soft ground before you build, with mixed fill topped by road base.",
    products: ["fill-spall", "road-base"],
    tone: { base: "#c4bcab", vein: "#968d7b", grain: "#5f584b" },
  },
  {
    slug: "drainage",
    title: "Drainage",
    body: "Pebbles and gravel let water run through: French drains, soak pits and the layer under slabs.",
    products: ["pebbles", "gravel"],
    tone: { base: "#cfc9bb", vein: "#a69f8f", grain: "#6f695c" },
  },
  {
    slug: "paths",
    title: "Paths and paver beds",
    body: "Fines spread and tamp into a firm, level bed for pavers, walkways and garden paths.",
    products: ["limestone-fines", "pebbles"],
    tone: { base: "#d9d4c8", vein: "#bdb6a6", grain: "#8f887a" },
  },
  {
    slug: "farms",
    title: "Farms and soil",
    body: "Fine limestone sweetens acidic soil so crops take up nutrients, and doubles as grit for poultry.",
    products: ["fine-limestone"],
    tone: { base: "#ece9e1", vein: "#d6d1c4", grain: "#b3ad9e" },
  },
  {
    slug: "plaster",
    title: "Lime plaster and treatment",
    body: "Cooked limestone makes traditional lime plaster and mortar, and treats water, waste and soft soil.",
    products: ["cooked-limestone"],
    tone: { base: "#f0eee8", vein: "#dcd8cd", grain: "#c0baab" },
  },
]

export const jobMedia = (slug: string) => `media/uses/${slug}`
