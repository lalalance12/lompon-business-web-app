/**
 * Business details used across the whole site.
 * Everything marked PLACEHOLDER is temporary — see PLACEHOLDERS.md.
 */
export const site = {
  name: "Lompon Limestone Quarrying",
  shortName: "Lompon Limestone",
  tagline: "Limestone by the kilo and by the sack, delivered.", // PLACEHOLDER
  description:
    "A limestone yard selling fines, grits, coarse, pebbles and crushed gravel by the kilo, boulders by the cubic metre, and cooked limestone by the sack. Pick up at the yard or have it delivered by dump truck.", // PLACEHOLDER
  url: "https://lompon-limestone.com",
  established: 2015,

  contact: {
    phone: "+63 906 813 0792",
    phoneHref: "tel:+639068130792",
    email: "llompon412@gmail.com",
    addressLines: ["Lot 00, Quarry Road", "Barangay Placeholder", "City, Province 0000"], // PLACEHOLDER
    directionsUrl: "https://maps.google.com/?q=limestone+yard", // PLACEHOLDER
    /** Paste a Google Maps "Embed a map" src URL here to show a live map on the Visit page. */
    mapEmbedUrl: "" as string, // PLACEHOLDER
  },

  hours: [
    { days: "Regular hours", time: "6:00 am – 6:00 pm" },
    { days: "After 6:00 pm", time: "By agreement" },
  ],

  social: [
    { label: "Facebook", href: "https://facebook.com/" }, // PLACEHOLDER
    { label: "Instagram", href: "https://instagram.com/" }, // PLACEHOLDER
  ],

  /** Short facts shown on the home page intro. */
  facts: [
    { value: "Since 2015", label: "Family-run limestone yard" },
    { value: "From 1 sack to a 20 m³ truck", label: "No order too small to collect" }, // PLACEHOLDER
    { value: "3 dump trucks", label: "Delivering within 50 km" }, // PLACEHOLDER
  ],
} as const

export const nav = [
  { label: "Kilos & sacks", href: "/materials" },
  { label: "Prices", href: "/prices" },
  { label: "Delivery", href: "/delivery" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Visit", href: "/visit" },
] as const
