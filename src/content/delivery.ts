/**
 * How customers get their order: collect it themselves, or have it delivered
 * by our dump truck. All values are PLACEHOLDERS — see PLACEHOLDERS.md.
 */
export const delivery = {
  title: "Collect it, or we dump it on site",
  lede: "Bring your own truck and we load it at the yard, or book our dump truck and we tip the load exactly where you need it.",

  options: {
    pickup: {
      label: "You collect",
      title: "Pick up at the yard",
      body: "Drive in with your own truck, pick-up or trailer. Our loader fills it and you pay at the office.",
      points: [
        "No booking needed during opening hours",
        "Loaded by front loader, or by hand for sacks",
        "Receipt with every load",
        "Sacks fit in any car or pick-up",
      ],
    },
    delivery: {
      label: "We deliver",
      title: "Dump-truck delivery",
      body: "A separate service, paid separately from the limestone. Tell us the address and the day; our driver tips the load where you point, or unloads sacks by hand.",
      points: [
        "Delivered anywhere in Mindanao",
        "₱1,500 for every kilometre from the yard, per truckload",
        "One truck holds up to 20 m³",
        "Scheduled to the day, with a call before arrival",
      ],
    },
  },

  /** Shown wherever delivery is priced. */
  payNote: "The limestone and the delivery are paid for separately: one price for the stone, one for the truck.",

  area: "Anywhere in Mindanao.",

  /** A real sequence, so it is numbered on the page. */
  steps: [
    { title: "Tell us what and how much", body: "Call, message, or use the form. We help you work out kilos, cubic metres or truckloads." },
    { title: "Confirm price and day", body: "We quote the limestone and the delivery separately, then book a delivery day." },
    { title: "Loaded at the yard", body: "Our loader fills the truck with exactly what you ordered, up to 20 m³ a trip." },
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
