/**
 * Copy and media slots for the home page. The page reads top to bottom as:
 * what limestone is for → how to buy it → what it costs.
 * All text is PLACEHOLDER copy — see PLACEHOLDERS.md.
 */
export const hero = {
  title: ["Limestone by", "the kilo and", "by the sack."],
  body: "Fines, grits, coarse, pebbles and crushed gravel by the kilo, boulders by the cubic metre, and cooked limestone by the 50 kg sack. Collect it at the yard or have our dump truck deliver.",
  primaryCta: { label: "See the price list", href: "/prices" },
  secondaryCta: { label: "Book a delivery", href: "/delivery" },
  /** /public/media/home/hero.(mp4|webm) — muted, looping background video. */
  video: "media/home/hero",
  /** /public/media/home/hero-poster.(jpg|webp) — shown before the video plays, and instead of it under reduced motion. */
  poster: "media/home/hero-poster",
}

export const intro = {
  statement:
    "We have quarried, crushed and screened limestone since 2015. From a single sack of lime to a full truck of gravel, everything is ready at our yard the same day.",
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
    group: "bulk" as const,
    title: "By the kilo",
    body: "Crushed and screened limestone, sold by the kilo, and boulders by the cubic metre. Collect it yourself, or order by the truckload.",
    href: "/materials#bulk",
    cta: "See every size",
    media: "media/home/buy-kilos",
  },
  {
    group: "sack" as const,
    title: "By the sack",
    body: "Cooked limestone in 50 kg sacks, bagged at the yard at ₱110 per sack. Fits in any car.",
    href: "/materials#sacks",
    cta: "See cooked limestone",
    media: "media/home/buy-sacks",
  },
]

/** The scroll-driven delivery story. A real sequence, so it is numbered. */
export const journey = {
  title: "From our yard to your site",
  body: "Collect it yourself, or book a dump truck and follow your load the whole way.",
  stages: [
    { title: "Loaded at the yard", body: "Our loader fills the truck with exactly what you ordered." },
    { title: "On the road", body: "The driver calls ahead with an arrival time." },
    { title: "Tipped on your site", body: "Dumped right where you point. Sacks are unloaded by hand." },
  ],
}

export const pricesTeaser = {
  title: "Straight prices, by the kilo",
  body: "Our general price list is public. The limestone and the delivery are priced separately, so you see what each costs before you call.",
}

export const visitBand = {
  title: "Come to the yard.",
  body: "See the gravel sizes and the sacks in daylight. Bring your own truck and we load it while you wait.",
}
