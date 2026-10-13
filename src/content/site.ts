/**
 * Business details used across the whole site.
 * Everything marked PLACEHOLDER is temporary — see PLACEHOLDERS.md.
 */
export const site = {
  name: "Calcaria Stone Co.", // PLACEHOLDER
  shortName: "Calcaria", // PLACEHOLDER
  tagline: "Limestone by the ton and by the sack, delivered.", // PLACEHOLDER
  description:
    "A limestone yard selling crushed aggregate, road base and boulders by the ton, and fine and cooked limestone by the sack. Pick up at the yard or have it delivered by dump truck.", // PLACEHOLDER
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
    { value: "From 1 sack to 20 tons", label: "No order too small to collect" }, // PLACEHOLDER
    { value: "3 dump trucks", label: "Delivering within 50 km" }, // PLACEHOLDER
  ],
} as const

export const nav = [
  { label: "Tons & sacks", href: "/materials" },
  { label: "Prices", href: "/prices" },
  { label: "Delivery", href: "/delivery" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Visit", href: "/visit" },
] as const
