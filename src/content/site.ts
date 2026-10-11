/**
 * Business details used across the whole site.
 * Everything marked PLACEHOLDER is temporary — see PLACEHOLDERS.md.
 */
export const site = {
  name: "Calcaria Stone Co.", // PLACEHOLDER
  shortName: "Calcaria", // PLACEHOLDER
  tagline: "Natural limestone, cut and finished in our own yard.", // PLACEHOLDER
  description:
    "A limestone yard supplying natural stone for floors, walls, paving and pool decks. Visit to see every slab in person.", // PLACEHOLDER
  url: "https://www.example.com", // PLACEHOLDER — your real domain
  established: 1998, // PLACEHOLDER

  contact: {
    phone: "+63 900 000 0000", // PLACEHOLDER
    phoneHref: "tel:+639000000000", // PLACEHOLDER
    email: "hello@example.com", // PLACEHOLDER
    addressLines: ["Lot 00, Quarry Road", "Barangay Placeholder", "City, Province 0000"], // PLACEHOLDER
    directionsUrl: "https://maps.google.com/?q=limestone+yard", // PLACEHOLDER
    /** Paste a Google Maps "Embed a map" src URL here to show a live map on the Visit page. */
    mapEmbedUrl: "" as string, // PLACEHOLDER
  },

  hours: [
    { days: "Monday to Friday", time: "8:00 am – 5:00 pm" }, // PLACEHOLDER
    { days: "Saturday", time: "8:00 am – 12:00 noon" }, // PLACEHOLDER
    { days: "Sunday and holidays", time: "Closed" }, // PLACEHOLDER
  ],

  social: [
    { label: "Facebook", href: "https://facebook.com/" }, // PLACEHOLDER
    { label: "Instagram", href: "https://instagram.com/" }, // PLACEHOLDER
  ],

  /** Short facts shown on the home page intro. */
  facts: [
    { value: "Since 1998", label: "Family-run limestone yard" }, // PLACEHOLDER
    { value: "9 varieties", label: "Stocked as slabs and cut tiles" }, // PLACEHOLDER
    { value: "4,000 m²", label: "Open yard you can walk through" }, // PLACEHOLDER
  ],
} as const

export const nav = [
  { label: "Stones", href: "/stones" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Visit", href: "/visit" },
] as const
