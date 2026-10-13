/**
 * Jobs supplied by the yard, shown on the home page and the Projects page.
 * Media: /public/media/projects/<slug>/1.jpg, 2.jpg … (count = imageCount).
 * All entries are PLACEHOLDERS — see PLACEHOLDERS.md.
 */
export type Project = {
  slug: string
  title: string
  location: string
  year: number
  /** Material slug from materials.ts. */
  materialSlug: string
  quantity: string
  /** "delivery" if our dump trucks hauled it, "pickup" if the client collected. */
  method: "delivery" | "pickup"
  summary: string
  imageCount: number
}

export const projects: Project[] = [
  {
    slug: "barangay-access-road",
    title: "Barangay access road",
    location: "Placeholder Town",
    year: 2025,
    materialSlug: "road-base",
    quantity: "1,400 tons",
    method: "delivery",
    summary: "Two kilometres of graded road base, delivered by 10-wheeler over three weeks and compacted in layers.",
    imageCount: 3,
  },
  {
    slug: "riverbank-riprap",
    title: "Riverbank riprap",
    location: "Placeholder City",
    year: 2024,
    materialSlug: "boulders",
    quantity: "620 tons",
    method: "delivery",
    summary: "Boulders placed along a washed-out riverbank to stop it eroding during the rainy season.",
    imageCount: 3,
  },
  {
    slug: "subdivision-lot-filling",
    title: "Subdivision lot filling",
    location: "Placeholder City",
    year: 2024,
    materialSlug: "fill-spall",
    quantity: "3,000 tons",
    method: "delivery",
    summary: "Forty low lots raised half a metre with mixed fill, then capped with road base for the house pads.",
    imageCount: 3,
  },
  {
    slug: "warehouse-footings",
    title: "Warehouse footings and slab",
    location: "Placeholder City",
    year: 2025,
    materialSlug: "gravel",
    quantity: "280 tons",
    method: "pickup",
    summary: "Crushed gravel collected daily by the contractor's own trucks for the footings and floor slab.",
    imageCount: 2,
  },
  {
    slug: "rice-farm-liming",
    title: "Rice farm soil liming",
    location: "Placeholder Province",
    year: 2023,
    materialSlug: "fine-limestone",
    quantity: "600 sacks",
    method: "delivery",
    summary: "Fine limestone spread across twelve hectares to correct acidic paddy soil before planting.",
    imageCount: 2,
  },
  {
    slug: "heritage-house-plaster",
    title: "Heritage house lime plaster",
    location: "Placeholder Town",
    year: 2023,
    materialSlug: "cooked-limestone",
    quantity: "90 sacks",
    method: "pickup",
    summary: "Cooked limestone slaked on site for traditional lime plaster on a century-old stone house.",
    imageCount: 3,
  },
]

export const projectMedia = (slug: string, n: number) => `media/projects/${slug}/${n}`
