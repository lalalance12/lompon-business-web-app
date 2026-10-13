/**
 * How customers get their order: collect it themselves, or have it delivered
 * by our dump trucks. All values are PLACEHOLDERS — see PLACEHOLDERS.md.
 */
export const delivery = {
  title: "Collect it, or we dump it on site",
  lede: "Bring your own truck and we load it at the yard, or book one of our dump trucks and we tip the load exactly where you need it.",

  options: {
    pickup: {
      label: "You collect",
      title: "Pick up at the yard",
      body: "Drive in with your own truck, pick-up or trailer. Our loader fills it, the weighbridge prints your ticket, and you pay at the office.",
      points: [
        "No booking needed during opening hours",
        "Loaded by front loader, or by hand for sacks",
        "Weighbridge ticket with every load",
        "Sacks fit in any car or pick-up",
      ],
    },
    delivery: {
      label: "We deliver",
      title: "Dump-truck delivery",
      body: "A separate service from your order. Tell us the address and the day; our driver tips the load where you point, or unloads sacks by hand.",
      points: [
        "Delivered within the delivery area, farther on request",
        "Delivery fee based on distance and truck size",
        "Scheduled to the day, with a call before arrival",
        "Bulk and sacks can ride together on one truck",
      ],
    },
  },

  /** Truck sizes. Capacities are placeholders — confirm with the fleet. */
  trucks: [
    { name: "Mini dump truck", capacity: "About 3 m³ / 5 tons", bestFor: "Narrow streets, small jobs, sacks" },
    { name: "6-wheeler", capacity: "About 6 m³ / 10 tons", bestFor: "Homes and small builds" },
    { name: "10-wheeler", capacity: "About 12 m³ / 20 tons", bestFor: "Roads, fill and large sites" },
  ],

  area: "Within 50 km of the yard. Farther deliveries on request.",

  /** A real sequence, so it is numbered on the page. */
  steps: [
    { title: "Tell us what and how much", body: "Call, message, or use the form. We help you work out tons or truckloads." },
    { title: "Confirm price and day", body: "We quote the material and the delivery fee, then book a delivery day." },
    { title: "Loaded and weighed", body: "Your load is weighed at the yard so you get exactly what you paid for." },
    { title: "Tipped where you point", body: "The driver calls ahead, then dumps the load or unloads sacks on site." },
  ],

  /** What the site needs for a dump truck to tip safely. */
  siteChecklist: [
    "A road at least 3.5 m wide and firm enough for a loaded truck",
    "About 7 m of clear height where the truck tips: watch for wires and branches",
    "Level, solid ground at the dumping spot",
    "Someone on site to show the driver where to dump",
  ],

  /** /public/media/delivery/truck.(jpg|webp) and video.(mp4|webm) */
  photo: "media/delivery/truck",
  video: "media/delivery/video",
  videoPoster: "media/delivery/video-poster",
}
