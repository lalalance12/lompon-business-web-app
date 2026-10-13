/**
 * Copy and media slots for the home page.
 * All text is PLACEHOLDER copy — see PLACEHOLDERS.md.
 */
export const hero = {
  title: ["Limestone by", "the slab, the ton", "and the sack."],
  body: "Cut stone for floors and walls, crushed aggregate and boulders by the ton, fine and cooked limestone by the sack. Collect it at the yard or have our dump trucks deliver.",
  primaryCta: { label: "See what we sell", href: "#buy" },
  secondaryCta: { label: "Book a delivery", href: "/delivery" },
  /** /public/media/home/hero.(mp4|webm) — muted, looping background video. */
  video: "media/home/hero",
  /** /public/media/home/hero-poster.(jpg|webp) — shown before the video plays, and instead of it under reduced motion. */
  poster: "media/home/hero-poster",
}

export const intro = {
  statement:
    "We have quarried, crushed and cut limestone for over two decades. From a single sack of lime to a convoy of road base, everything is weighed at our yard and ready the same day.",
}

/** The three ways the yard sells limestone. */
export const waysToBuy = [
  {
    title: "Cut stone",
    body: "Slabs, tiles and cladding in nine limestones, finished in-house.",
    items: ["Floor and wall tiles", "Cladding panels", "Steps, sills and coping"],
    href: "/stones",
    cta: "Browse cut stone",
    media: "media/home/buy-cut-stone",
  },
  {
    title: "By the ton",
    body: "Crushed and screened aggregate, weighed on our weighbridge.",
    items: ["Fines and pebbles", "Crushed gravel and road base", "Boulders and fill"],
    href: "/materials#tons",
    cta: "See sizes and uses",
    media: "media/home/buy-tons",
  },
  {
    title: "By the sack",
    body: "Fine and cooked limestone, bagged at the yard.",
    items: ["Fine limestone, 40 kg", "Cooked limestone, 25 kg", "Bulk discounts from 20 sacks"],
    href: "/materials#sacks",
    cta: "See sacked lime",
    media: "media/home/buy-sacks",
  },
] as const

export const applications = [
  {
    title: "Floors and walls",
    body: "Honed and brushed tiles, cladding and feature walls.",
    media: "media/applications/floors-walls",
  },
  {
    title: "Roads and driveways",
    body: "Road base that compacts into a firm, lasting bed.",
    media: "media/applications/roads",
  },
  {
    title: "Concrete and foundations",
    body: "Clean crushed gravel and pebbles for strong mixes.",
    media: "media/applications/concrete",
  },
  {
    title: "Slope and shore protection",
    body: "Heavy boulders for riverbanks, sea walls and riprap.",
    media: "media/applications/boulders",
  },
  {
    title: "Farms and gardens",
    body: "Fine limestone for soil, pebbles for paths and beds.",
    media: "media/applications/farms-gardens",
  },
  {
    title: "Plaster and mortar",
    body: "Cooked limestone for traditional lime plaster.",
    media: "media/applications/plaster",
  },
] as const

/** A real sequence, so it is numbered on the page. */
export const process = {
  title: "From quarry to your site",
  body: "One yard handles the whole job, so what you order is exactly what arrives.",
  /** /public/media/home/process.(mp4|webm) — footage of crushing, cutting or loading. */
  video: "media/home/process",
  poster: "media/home/process-poster",
  steps: [
    {
      title: "Choose at the yard",
      body: "See the stone, the gravel sizes and the sacks before you decide.",
    },
    {
      title: "Cut, crush or bag",
      body: "Slabs are cut to size, stone is crushed and screened, lime is bagged.",
    },
    {
      title: "Weigh and load",
      body: "Every load crosses the weighbridge, so you pay for exactly what you get.",
    },
    {
      title: "Collect or deliver",
      body: "Drive it home yourself, or our dump truck tips it on your site.",
    },
  ],
}

export const visitBand = {
  title: "Come to the yard.",
  body: "See the slabs, the gravel piles and the sacks in daylight. Bring your own truck and we load it while you wait.",
}
