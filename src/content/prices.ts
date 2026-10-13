/**
 * The general price list. Every amount is a PLACEHOLDER — see PLACEHOLDERS.md.
 * Amounts are whole pesos. Products are matched to materials.ts by slug.
 */

export const priceList = {
  updated: "October 2026", // PLACEHOLDER
  currency: "PHP",

  /** Price per ton, loaded onto your truck at the yard. */
  perTon: {
    "limestone-fines": 650,
    pebbles: 950,
    gravel: 1050,
    "road-base": 750,
    boulders: 900,
    "fill-spall": 450,
  } as Record<string, number>,

  /** Price per sack, and the lower price from `bulkFrom` sacks up. */
  perSack: {
    "fine-limestone": { each: 220, bulk: 200 },
    "cooked-limestone": { each: 320, bulk: 295 },
  } as Record<string, { each: number; bulk: number }>,
  bulkFrom: 20,

  /** Dump-truck delivery fee per trip, by distance from the yard. */
  trucks: [
    { key: "mini", name: "Mini dump truck", tons: 5 },
    { key: "six", name: "6-wheeler", tons: 10 },
    { key: "ten", name: "10-wheeler", tons: 20 },
  ] as const,
  zones: [
    { label: "Up to 10 km", fees: { mini: 1500, six: 2500, ten: 3500 } },
    { label: "10 to 25 km", fees: { mini: 2500, six: 3800, ten: 5200 } },
    { label: "25 to 50 km", fees: { mini: 4000, six: 5800, ten: 7800 } },
  ],

  notes: [
    "Prices are a general guide and can change with fuel and quarry costs. We confirm the exact price before you pay.",
    "Loading at the yard is free. Every load is weighed on our weighbridge.",
    "Minimum pick-up is 1 ton, or 1 sack.",
    "Boulders are delivered only in loads of 5 tons or more.",
    "Deliveries beyond 50 km are quoted on request.",
  ],
}

export type TruckKey = (typeof priceList.trucks)[number]["key"]

const peso = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 })
export const formatPeso = (n: number) => peso.format(n)

/** The cheapest set of trips that carries `tons` to a zone. */
export function planTrips(tons: number, zoneIndex: number) {
  const zone = priceList.zones[zoneIndex]
  const [mini, six, ten] = priceList.trucks
  const trips: { key: TruckKey; name: string; fee: number }[] = []
  let left = Math.max(tons, 0)
  while (left > ten.tons) {
    trips.push({ key: ten.key, name: ten.name, fee: zone.fees.ten })
    left -= ten.tons
  }
  if (left > 0) {
    const truck = left <= mini.tons ? mini : left <= six.tons ? six : ten
    trips.push({ key: truck.key, name: truck.name, fee: zone.fees[truck.key] })
  }
  return { trips, fee: trips.reduce((sum, t) => sum + t.fee, 0) }
}

/** The lowest price a product sells for, with its unit — for "from …" labels. */
export function fromPrice(slug: string) {
  if (slug in priceList.perTon) return { amount: priceList.perTon[slug], unit: "ton" as const }
  const sack = priceList.perSack[slug]
  if (sack) return { amount: sack.bulk, unit: "sack" as const }
  return null
}

export const cheapestDelivery = Math.min(...priceList.zones.map((z) => Math.min(...Object.values(z.fees))))
