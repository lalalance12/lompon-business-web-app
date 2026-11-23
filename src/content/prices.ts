/**
 * The general price list. Amounts are in pesos — see PLACEHOLDERS.md.
 * Products are matched to materials.ts by slug.
 *
 * The limestone and the delivery are priced, and paid for, separately.
 */

export const priceList = {
  updated: "November 2026", // PLACEHOLDER
  currency: "PHP",

  /** Price per kilo, loaded onto your truck at the yard. */
  perKg: {
    "limestone-fines": 2.2,
    grits: 2.2,
    coarse: 2,
    pebbles: 1.2,
    gravel: 1,
  } as Record<string, number>,

  /** Price per cubic metre, for stone too big to sell by the kilo. */
  perCubicMetre: {
    boulders: 400,
  } as Record<string, number>,

  /** Price per sack. Cooked limestone, our only sacked product: 50 kg × ₱2.20. */
  perSack: {
    "cooked-limestone": 110,
  } as Record<string, number>,

  /** Our one dump truck: what it holds, and what it costs to send. */
  truck: {
    name: "Dump truck",
    cubicMetres: 20,
    /** Delivery fee for every kilometre from the yard, per trip. */
    feePerKm: 1500,
    /**
     * PLACEHOLDER: weight of one cubic metre of loose crushed limestone,
     * used only to estimate how many trips a kilo order needs.
     */
    kgPerCubicMetre: 1500,
  },

  /** Farthest we deliver without a special quote. */
  maxKm: 50,

  notes: [
    "The limestone and the delivery are paid for separately: one price for the stone, one for the truck.",
    "Prices are a general guide and can change with fuel and quarry costs. We confirm the exact price before you pay.",
    "Loading at the yard is free.",
    "Delivery is ₱1,500 for every kilometre from the yard, for each truckload of up to 20 m³.",
    "Deliveries beyond 50 km are quoted on request.",
  ],
}

export type PriceUnit = "kg" | "m3" | "sack"

const pesoWhole = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 })
const pesoCents = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", minimumFractionDigits: 2, maximumFractionDigits: 2 })

/** Totals: "₱8,000", or "₱33.50" when there are centavos. */
export const formatPeso = (n: number) => (Number.isInteger(Math.round(n * 100) / 100) ? pesoWhole : pesoCents).format(n)
/** Rates always show centavos: "₱2.20", "₱1.00". */
export const formatRate = (n: number) => pesoCents.format(n)

const kgFormat = new Intl.NumberFormat("en-PH", { maximumFractionDigits: 0 })
export const formatKg = (kg: number) => `${kgFormat.format(kg)} kg`

/** What one unit of a product costs, or null when it has no price yet. */
export function unitPrice(slug: string): { amount: number; unit: PriceUnit } | null {
  if (slug in priceList.perKg) return { amount: priceList.perKg[slug], unit: "kg" }
  if (slug in priceList.perCubicMetre) return { amount: priceList.perCubicMetre[slug], unit: "m3" }
  if (slug in priceList.perSack) return { amount: priceList.perSack[slug], unit: "sack" }
  return null
}

export const unitName: Record<PriceUnit, string> = { kg: "kg", m3: "m³", sack: "sack" }

/** "₱2.20 per kg" / "₱400 per m³" / "₱110 per sack" */
export function priceLabel(slug: string) {
  const p = unitPrice(slug)
  if (!p) return "Ask for price"
  return `${p.unit === "kg" ? formatRate(p.amount) : formatPeso(p.amount)} per ${unitName[p.unit]}`
}

/** A full truck (20 m³) of a product, priced. Kilo products use the weight estimate. */
export function fullTruckPrice(slug: string) {
  const { cubicMetres, kgPerCubicMetre } = priceList.truck
  if (slug in priceList.perCubicMetre) return { amount: priceList.perCubicMetre[slug] * cubicMetres, kg: null }
  if (slug in priceList.perKg) {
    const kg = cubicMetres * kgPerCubicMetre
    return { amount: priceList.perKg[slug] * kg, kg }
  }
  return null
}

/** Truckloads needed for an order, and the delivery fee for `km` from the yard. */
export function planDelivery(cubicMetres: number, km: number) {
  const { cubicMetres: holds, feePerKm } = priceList.truck
  const trips = Math.max(1, Math.ceil(cubicMetres / holds - 1e-9))
  const perTrip = Math.max(km, 0) * feePerKm
  return { trips, perTrip, fee: trips * perTrip }
}

/** Volume of an order in cubic metres, for working out truckloads. */
export function orderVolume(unit: PriceUnit, amount: number, sackKg = 0) {
  const { kgPerCubicMetre } = priceList.truck
  if (unit === "m3") return amount
  if (unit === "sack") return (amount * sackKg) / kgPerCubicMetre
  return amount / kgPerCubicMetre
}
