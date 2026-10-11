/**
 * Completed projects shown on the home page and the Projects page.
 * Media: /public/media/projects/<slug>/1.jpg, 2.jpg … (count = imageCount).
 * All entries are PLACEHOLDERS — see PLACEHOLDERS.md.
 */
export type Project = {
  slug: string
  title: string
  location: string
  year: number
  stoneSlug: string
  application: string
  summary: string
  imageCount: number
}

export const projects: Project[] = [
  {
    slug: "hillside-residence",
    title: "Hillside residence",
    location: "Placeholder City",
    year: 2025,
    stoneSlug: "indiana-buff",
    application: "Facade cladding",
    summary: "Full exterior in sandblasted Indiana Buff, with honed sills and copings cut to measure.",
    imageCount: 3,
  },
  {
    slug: "harbour-hotel-lobby",
    title: "Harbour hotel lobby",
    location: "Placeholder City",
    year: 2024,
    stoneSlug: "moleanos-beige",
    application: "Flooring",
    summary: "1,200 m² of vein-cut Moleanos Beige laid in long linear rows through the lobby and bar.",
    imageCount: 3,
  },
  {
    slug: "garden-pool-terrace",
    title: "Garden pool terrace",
    location: "Placeholder City",
    year: 2024,
    stoneSlug: "coral-stone",
    application: "Pool coping and deck",
    summary: "Brushed Coral Stone deck with bullnose coping that stays cool through the afternoon sun.",
    imageCount: 3,
  },
  {
    slug: "parish-church-steps",
    title: "Parish church steps",
    location: "Placeholder Town",
    year: 2023,
    stoneSlug: "kota-blue",
    application: "Stairs and landings",
    summary: "Replacement treads and landings in sandblasted Kota Blue, matched to the original profile.",
    imageCount: 2,
  },
  {
    slug: "courtyard-cafe",
    title: "Courtyard café",
    location: "Placeholder City",
    year: 2023,
    stoneSlug: "travertine-classic",
    application: "Paving",
    summary: "Tumbled travertine in a French pattern, with planters edged in split-face stone.",
    imageCount: 3,
  },
  {
    slug: "city-apartment-bath",
    title: "City apartment bathrooms",
    location: "Placeholder City",
    year: 2025,
    stoneSlug: "fossil-grey",
    application: "Floors and walls",
    summary: "Honed Fossil Grey wrapped floor to ceiling in two bathrooms, with a matching vanity top.",
    imageCount: 2,
  },
]

export const projectMedia = (slug: string, n: number) => `media/projects/${slug}/${n}`
