"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { animate, motion, useMotionValue, useTransform } from "motion/react"
import { TriangleAlert } from "lucide-react"
import { cn } from "@/lib/utils"
import { cta } from "@/lib/cta"
import { easeSnap, snapSpring } from "@/lib/motion"
import { formatPeso, planTrips, priceList } from "@/content/prices"
import { Input } from "@/components/ui/input"
import { Field } from "@/components/shared/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type EstimatorProduct = {
  slug: string
  name: string
  unit: "ton" | "sack"
  /** Sack weight in kg, to work out the truck size for sacks. */
  sackKg?: number
}

/** A pill switch with a sliding highlight. */
function Segmented<T extends string | number>({
  label,
  id,
  value,
  options,
  onChange,
}: {
  label: string
  id: string
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
}) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex w-fit flex-wrap rounded-full bg-bedding p-1">
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn("press relative h-11 rounded-full px-4 text-[0.9375rem]", value === o.value ? "text-limewash" : "text-silt hover:text-slate")}
        >
          {value === o.value && <motion.span layoutId={`${id}-pill`} className="absolute inset-0 rounded-full bg-slate" transition={snapSpring} />}
          <span className="relative">{o.label}</span>
        </button>
      ))}
    </div>
  )
}

/** A peso amount that rolls quickly to its new value. */
function RollingPeso({ value, className }: { value: number; className?: string }) {
  const mv = useMotionValue(value)
  const text = useTransform(mv, (v) => formatPeso(Math.round(v)))
  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.35, ease: easeSnap })
    return () => controls.stop()
  }, [mv, value])
  return <motion.span className={cn("tabular-nums", className)}>{text}</motion.span>
}

/**
 * Pick a product and amount, choose pick-up or delivery, and get a rough
 * total from the general price list. Delivery picks the cheapest trucks.
 */
export function Estimator({ products }: { products: EstimatorProduct[] }) {
  const [slug, setSlug] = useState(products[0]?.slug ?? "")
  const [qtyText, setQtyText] = useState("10")
  const [method, setMethod] = useState<"pickup" | "delivery">("delivery")
  const [zone, setZone] = useState(0)

  const product = products.find((p) => p.slug === slug) ?? products[0]
  const qty = Math.max(0, Number(qtyText.replace(",", ".")) || 0)
  const isSack = product.unit === "sack"
  const quick = isSack ? [10, 20, 50, 100] : [1, 5, 10, 20]

  const result = useMemo(() => {
    let unitPrice: number
    if (isSack) {
      const s = priceList.perSack[product.slug]
      unitPrice = qty >= priceList.bulkFrom ? s.bulk : s.each
    } else {
      unitPrice = priceList.perTon[product.slug]
    }
    const material = Math.round(unitPrice * qty)
    const tons = isSack ? (qty * (product.sackKg ?? 40)) / 1000 : qty
    const delivery = method === "delivery" && qty > 0 ? planTrips(tons, zone) : null
    return { unitPrice, material, tons, delivery, total: material + (delivery?.fee ?? 0) }
  }, [isSack, product, qty, method, zone])

  const tooSmallForBoulders = method === "delivery" && product.slug === "boulders" && qty > 0 && qty < 5
  const unitWord = isSack ? (qty === 1 ? "sack" : "sacks") : qty === 1 ? "ton" : "tons"

  return (
    <div className="grid overflow-hidden rounded-sm lg:grid-cols-12">
      {/* Inputs */}
      <div className="space-y-7 bg-limewash p-6 md:p-10 lg:col-span-7">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Product" htmlFor="est-product">
            <Select
              value={slug}
              onValueChange={(v) => {
                setSlug(v)
                const next = products.find((p) => p.slug === v)
                if (next && next.unit !== product.unit) setQtyText(next.unit === "sack" ? "20" : "10")
              }}
            >
              <SelectTrigger id="est-product" className="h-12 w-full rounded-sm border-input bg-chalk px-4 text-base shadow-none data-[size=default]:h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(["ton", "sack"] as const).map((unit) => (
                  <SelectGroup key={unit}>
                    <SelectLabel>{unit === "ton" ? "By the ton" : "By the sack"}</SelectLabel>
                    {products
                      .filter((p) => p.unit === unit)
                      .map((p) => (
                        <SelectItem key={p.slug} value={p.slug}>{p.name}</SelectItem>
                      ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="How much" htmlFor="est-qty">
            <div className="relative">
              <Input
                id="est-qty"
                inputMode="decimal"
                value={qtyText}
                onChange={(e) => setQtyText(e.target.value)}
                className="h-12 rounded-sm border-input bg-chalk px-4 pr-20 text-base shadow-none"
              />
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-silt">{isSack ? "sacks" : "tons"}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {quick.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setQtyText(String(n))}
                  className={cn(
                    "press h-9 rounded-full px-3 text-sm ring-1",
                    qty === n ? "bg-loader text-slate ring-loader" : "text-silt ring-border hover:text-slate"
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </Field>
        </div>

        <div className="grid gap-3">
          <p className="text-sm font-medium">How you&apos;ll get it</p>
          <Segmented
            id="est-method"
            label="How you'll get it"
            value={method}
            onChange={setMethod}
            options={[
              { value: "pickup", label: "Pick up at the yard" },
              { value: "delivery", label: "Deliver by dump truck" },
            ]}
          />
        </div>

        <motion.div
          initial={false}
          animate={{ height: method === "delivery" ? "auto" : 0, opacity: method === "delivery" ? 1 : 0 }}
          transition={{ duration: 0.28, ease: easeSnap }}
          className="overflow-hidden"
          inert={method !== "delivery"}
        >
          <div className="grid gap-3 pb-1">
            <p className="text-sm font-medium">Distance from the yard</p>
            <Segmented
              id="est-zone"
              label="Distance from the yard"
              value={zone}
              onChange={setZone}
              options={priceList.zones.map((z, i) => ({ value: i, label: z.label }))}
            />
          </div>
        </motion.div>
      </div>

      {/* Result */}
      <div className="on-slate flex flex-col bg-slate p-6 text-limewash md:p-10 lg:col-span-5">
        <h3 className="text-sm text-fossil">Your estimate</h3>
        <dl className="mt-5 space-y-4 text-[0.9375rem]">
          <div className="flex justify-between gap-4">
            <dt>
              {qty || 0} {unitWord} of {product.name.toLowerCase()}
              <span className="block text-sm text-fossil">at {formatPeso(result.unitPrice)} a {isSack ? "sack" : "ton"}</span>
            </dt>
            <dd><RollingPeso value={result.material} /></dd>
          </div>
          {result.delivery && (
            <div className="flex justify-between gap-4">
              <dt>
                Delivery, {priceList.zones[zone].label.toLowerCase()}
                <span className="block text-sm text-fossil">
                  {result.delivery.trips.length === 1
                    ? `One trip by ${result.delivery.trips[0].name}`
                    : `${result.delivery.trips.length} trips: ${result.delivery.trips.map((t) => t.name).join(", ")}`}
                </span>
              </dt>
              <dd><RollingPeso value={result.delivery.fee} /></dd>
            </div>
          )}
        </dl>
        <div className="mt-6 border-t border-limewash/15 pt-5">
          <p className="text-sm text-fossil">Estimated total</p>
          <RollingPeso value={result.total} className="type-figure block text-5xl text-loader" />
        </div>
        {tooSmallForBoulders && (
          <p className="mt-4 flex gap-2 text-sm text-loader">
            <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            Boulders are delivered only in loads of 5 tons or more.
          </p>
        )}
        <p className="mt-4 text-sm text-fossil">A guide from our general prices. We confirm the exact price before you pay.</p>
        <Link
          href={`/visit?product=${product.slug}${method === "delivery" ? "&delivery=1" : ""}#inquiry`}
          className={cta({ tone: "accent", size: "md", className: "mt-auto max-lg:mt-8" })}
        >
          Send this order
        </Link>
      </div>
    </div>
  )
}
