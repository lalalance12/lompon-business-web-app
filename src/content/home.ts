/**
 * Copy and media slots for the home page.
 * All text is PLACEHOLDER copy — see PLACEHOLDERS.md.
 */
export const hero = {
  title: ["Natural limestone,", "cut and finished", "in our own yard."],
  body: "Floors, walls, paving and pool decks in nine varieties. Walk the yard and choose your stone slab by slab.",
  primaryCta: { label: "Browse the stones", href: "/stones" },
  secondaryCta: { label: "Plan a visit", href: "/visit" },
  /** /public/media/home/hero.(mp4|webm) — muted, looping background video. */
  video: "media/home/hero",
  /** /public/media/home/hero-poster.(jpg|webp) — shown before the video plays, and instead of it under reduced motion. */
  poster: "media/home/hero-poster",
}

export const intro = {
  statement:
    "We have quarried, cut and supplied limestone for over two decades. Every stone on this site is stacked in our yard, ready to see and touch before you order.",
}

export const applications = [
  {
    title: "Flooring",
    body: "Honed and brushed tiles for living spaces, hallways and shops.",
    media: "media/applications/flooring",
  },
  {
    title: "Wall cladding",
    body: "Panels and strips for facades and feature walls.",
    media: "media/applications/wall-cladding",
  },
  {
    title: "Pool coping and decks",
    body: "Cool, slip-conscious finishes for wet edges.",
    media: "media/applications/pool",
  },
  {
    title: "Paving",
    body: "Driveways, terraces and courtyards.",
    media: "media/applications/paving",
  },
  {
    title: "Stairs and thresholds",
    body: "Treads, risers and sills cut to measure.",
    media: "media/applications/stairs",
  },
  {
    title: "Landscaping",
    body: "Stepping stones, edging and garden walls.",
    media: "media/applications/landscaping",
  },
] as const

/** A real sequence, so it is numbered on the page. */
export const process = {
  title: "From block to your site",
  body: "One yard handles the whole job, so the stone you approve is the stone that arrives.",
  /** /public/media/home/process.(mp4|webm) — footage of cutting or the yard. */
  video: "media/home/process",
  poster: "media/home/process-poster",
  steps: [
    {
      title: "Choose at the yard",
      body: "Walk the racks with our team and set aside the slabs you like.",
    },
    {
      title: "Cut to size",
      body: "Blocks and slabs are cut to your tile sizes or measured drawings.",
    },
    {
      title: "Finish the face",
      body: "Honed, brushed, tumbled, sandblasted or split — finished in-house.",
    },
    {
      title: "Pack and deliver",
      body: "Crated and numbered by area, then delivered to your site.",
    },
  ],
}

export const visitBand = {
  title: "Come and see the slabs.",
  body: "Photos only go so far with natural stone. Visit the yard and see colour, grain and finish in daylight.",
}
