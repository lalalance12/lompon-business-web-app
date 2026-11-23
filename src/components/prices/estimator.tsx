"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { animate, motion, useMotionValue, useTransform } from "motion/react"
import { TriangleAlert } from "lucide-react"
import { cn } from "@/lib/utils"
import { cta } from "@/lib/cta"
import { easeSnap } from "@/lib/motion"
import { formatPeso, formatRate, orderVolume, planDelivery, priceList, unitPrice, type PriceUnit } from "@/content/prices"
import { Input } from "@/components/ui/input"
import { Field } from "@/components/shared/field"
import { Segmented } from "@/components/shared/segmented"
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
  /** Sack weight in kg; set only for sacked products. */
  sackKg?: number
}

/** A peso amount that rolls quickly to its new value. */
function RollingPeso({ value, className }: { value: number; className?: string }) {
  const mv = useMotionValue(value)
  const text = useTransform(mv, (v) => formatPeso(Math.round(v * 100) / 100))
  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.35, ease: easeSnap })
    return () => controls.stop()
  }, [mv, value])
  return <motion.span className={cn("tabular-nums", className)}>{text}</motion.span>
}

/** Quick amounts, and what the amount box is counted in, per price unit. */
const amounts: Record<PriceUnit, { quick: number[]; start: string; one: string; many: string }> = {
  kg: { quick: [100, 500, 1000, 5000], start: "1000", one: "kg", many: "kg" },
  m3: { quick: [1, 5, 10, 20], start: "5", one: "m³", many: "m³" },
  sack: { quick: [1, 5, 10, 20], start: "10", one: "sack", many: "sacks" },
}

/** Quick distances in km. */
const quickKm = [5, 10, 20, 30]

/**
 * Pick a product and amount, choose pick-up or delivery, and get a rough
 * total from the general price list. The limestone and the delivery are
 * shown as separate amounts, because they are paid for separately.
 */
export function Estimator({ products }: { products: EstimatorProduct[] }) {
  const [slug, setSlug] = useState(products[0]?.slug ?? "")
  const [qtyText, setQtyText] = useState(amounts.kg.start)
  const [method, setMethod] = useState<"pickup" | "delivery">("delivery")
  const [kmText, setKmText] = useState("10")

  const product = products.find((p) => p.slug === slug) ?? products[0]
  const price = unitPrice(product.slug)
  const unit: PriceUnit = price?.unit ?? "kg"
  const qty = Math.max(0, Number(qtyText.replace(/,/g, "")) || 0)
  const km = Math.max(0, Number(kmText.replace(/,/g, "")) || 0)
  const words = amounts[unit]
  const { truck } = priceList

  const result = useMemo(() => {
    const material = price ? Math.round(price.amount * qty * 100) / 100 : 0
    const volume = orderVolume(unit, qty, product.sackKg)
    const delivery = method === "delivery" && qty > 0 ? planDelivery(volume, km) : null
    return { material, delivery, total: material + (delivery?.fee ?? 0) }
  }, [price, qty, unit, product, method, km])

  const beyondArea = method === "delivery" && km > priceList.maxKm
  const unitWord = qty === 1 ? words.one : words.many
  const rate = price ? (unit === "kg" ? formatRate(price.amount) : formatPeso(price.amount)) : null

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
                const nextUnit = next ? unitPrice(next.slug)?.unit ?? "kg" : unit
                if (nextUnit !== unit) setQtyText(amounts[nextUnit].start)
              }}
            >
              <SelectTrigger id="est-product" className="h-12 w-full rounded-sm border-input bg-chalk px-4 text-base shadow-none data-[size=default]:h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {([
                  { label: "By the kilo", sack: false },
                  { label: "By the sack", sack: true },
                ] as const).map((group) => (
                  <SelectGroup key={group.label}>
                    <SelectLabel>{group.label}</SelectLabel>
                    {products
                      .filter((p) => Boolean(p.sackKg) === group.sack)
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
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-silt">{words.many}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {words.quick.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setQtyText(String(n))}
                  className={cn(
                    "press h-9 rounded-full px-3 text-sm ring-1",
                    qty === n ? "bg-loader text-slate ring-loader" : "text-silt ring-border hover:text-slate"
                  )}
                >
                  {n.toLocaleString("en-PH")}
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
          <Field label="Distance from the yard" htmlFor="est-km" className="pb-1 sm:max-w-[calc(50%-0.75rem)]">
            <div className="relative">
              <Input
                id="est-km"
                inputMode="decimal"
                value={kmText}
                onChange={(e) => setKmText(e.target.value)}
                className="h-12 rounded-sm border-input bg-chalk px-4 pr-14 text-base shadow-none"
              />
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-silt">km</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {quickKm.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setKmText(String(n))}
                  className={cn(
                    "press h-9 rounded-full px-3 text-sm ring-1",
                    km === n ? "bg-loader text-slate ring-loader" : "text-silt ring-border hover:text-slate"
                  )}
                >
                  {n} km
                </button>
              ))}
            </div>
          </Field>
        </motion.div>
      </div>

      {/* Result */}
      <div className="on-slate flex flex-col bg-slate p-6 text-limewash md:p-10 lg:col-span-5">
        <h3 className="text-sm text-fossil">Your estimate</h3>
        <dl className="mt-5 space-y-4 text-[0.9375rem]">
          <div className="flex justify-between gap-4">
            <dt>
              Limestone: {qty.toLocaleString("en-PH")} {unitWord} of {product.name.toLowerCase()}
              <span className="block text-sm text-fossil">
                {rate ? `at ${rate} per ${words.one}` : "Price to be determined"}
              </span>
            </dt>
            <dd><RollingPeso value={result.material} /></dd>
          </div>
          {result.delivery && (
            <div className="flex justify-between gap-4">
              <dt>
                Delivery, {km.toLocaleString("en-PH")} km
                <span className="block text-sm text-fossil">
                  {result.delivery.trips === 1 ? "One trip" : `${result.delivery.trips} trips`} × {km.toLocaleString("en-PH")} km × {formatPeso(truck.feePerKm)}
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
        {result.delivery && (
          <p className="mt-4 text-sm text-fossil">
            The limestone and the delivery are paid for separately. One truck holds up to {truck.cubicMetres} m³.
          </p>
        )}
        {beyondArea && (
          <p className="mt-4 flex gap-2 text-sm text-loader">
            <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            Beyond {priceList.maxKm} km we quote delivery on request.
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
