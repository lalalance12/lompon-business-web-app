/**
 * Copy and media slots for the home page. The page reads top to bottom as:
 * what limestone is for → how to buy it → what it costs.
 * All text is PLACEHOLDER copy — see PLACEHOLDERS.md.
 */
export const hero = {
  title: ["Limestone by", "the ton and", "by the sack."],
  body: "Crushed aggregate, road base and boulders by the ton. Fine and cooked limestone by the sack. Collect it at the yard or have our dump trucks deliver.",
  primaryCta: { label: "See the price list", href: "/prices" },
  secondaryCta: { label: "Book a delivery", href: "/delivery" },
  /** /public/media/home/hero.(mp4|webm) — muted, looping background video. */
  video: "media/home/hero",
  /** /public/media/home/hero-poster.(jpg|webp) — shown before the video plays, and instead of it under reduced motion. */
  poster: "media/home/hero-poster",
}

export const intro = {
  statement:
    "We have quarried, crushed and screened limestone for over two decades. From a single sack of lime to a convoy of road base, everything is weighed at our yard and ready the same day.",
}

export const usesSection = {
  title: "What limestone is used for",
  body: "Start with your job. Each one shows the materials that suit it and what they cost.",
}

export const screening = {
  title: "Screened into every size",
  body: "Quarry stone goes over our screens and comes out sorted, from dust-fine to boulders. You buy exactly the size your job needs.",
}

/** The two ways the yard sells limestone. */
export const waysToBuy = [
  {
    unit: "ton" as const,
    title: "By the ton",
    body: "Crushed and screened aggregate, weighed on our weighbridge. Collect from one ton, or order by the truckload.",
    href: "/materials#tons",
    cta: "See every size",
    media: "media/home/buy-tons",
  },
  {
    unit: "sack" as const,
    title: "By the sack",
    body: "Fine and cooked limestone, bagged at the yard. Fits in any car; cheaper from 20 sacks.",
    href: "/materials#sacks",
    cta: "See sacked lime",
    media: "media/home/buy-sacks",
  },
]

/** The scroll-driven delivery story. A real sequence, so it is numbered. */
export const journey = {
  title: "From our yard to your site",
  body: "Collect it yourself, or book a dump truck and follow your load the whole way.",
  stages: [
    { title: "Loaded at the yard", body: "Our loader fills the truck with exactly what you ordered." },
    { title: "Weighed", body: "Across the weighbridge, so you pay for the weight you get." },
    { title: "On the road", body: "The driver calls ahead with an arrival time." },
    { title: "Tipped on your site", body: "Dumped right where you point. Sacks are unloaded by hand." },
  ],
  /** Example load shown on the weighbridge readout. */
  exampleTons: 18.4,
}

export const pricesTeaser = {
  title: "Straight prices, by weight",
  body: "Our general price list is public. Pick a product, add delivery, and you have a good idea of the total before you call.",
}

export const visitBand = {
  title: "Come to the yard.",
  body: "See the gravel sizes and the sacks in daylight. Bring your own truck and we load it while you wait.",
}
