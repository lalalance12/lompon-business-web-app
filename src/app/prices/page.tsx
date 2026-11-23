import type { Metadata } from "next"
import Link from "next/link"
import { Info, Truck } from "lucide-react"
import { bulkMaterials, materials, sackMaterials } from "@/content/materials"
import { delivery } from "@/content/delivery"
import { formatKg, formatPeso, formatRate, fullTruckPrice, priceList, unitName, unitPrice } from "@/content/prices"
import { PageIntro } from "@/components/shared/page-intro"
import { SectionHeading } from "@/components/shared/section-heading"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { Estimator } from "@/components/prices/estimator"
import { cta } from "@/lib/cta"

export const metadata: Metadata = {
  title: "Price list",
  description: "General prices for limestone by the kilo, boulders by the cubic metre, cooked limestone by the sack, and dump-truck delivery at ₱1,500 per km.",
}

const th = "py-3 pr-3 text-left text-sm font-normal text-silt sm:pr-6"
const td = "py-4 pr-3 tabular-nums sm:pr-6"
/** Columns that only show from tablet up; phones get the essentials. */
const wide = "hidden sm:table-cell"

/** Example distances for the delivery fee table. */
const exampleKm = [5, 10, 20, 50, 100]

export default function PricesPage() {
  const { truck } = priceList

  return (
    <>
      <PageIntro
        title="Price list"
        lede="General prices for everything we sell, and what delivery costs. The limestone and the delivery are paid for separately. Use the estimator at the bottom to add it up."
      >
        <p className="mt-6 text-sm text-silt">Prices updated {priceList.updated}. All amounts in Philippine pesos.</p>
        <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
          {[
            { href: "#bulk", label: "By the kilo" },
            { href: "#sacks", label: "By the sack" },
            { href: "#delivery", label: "Delivery fees" },
            { href: "#estimate", label: "Estimate an order" },
          ].map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className={cta({ tone: i === 3 ? "accent" : "outline", size: "sm" })}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </PageIntro>

      {/* By the kilo */}
      <section id="bulk" aria-labelledby="bulk-heading" className="page-gutter page-width scroll-mt-24 pb-20 md:pb-28">
        <SectionHeading
          id="bulk-heading"
          title="By the kilo"
          body={`Loaded onto your truck at the yard. Boulders are sold by the cubic metre. A full ${truck.cubicMetres} m³ truck is shown for comparison; delivery is charged separately.`}
          className="mb-8"
        />
        <div className="overflow-x-auto overflow-y-hidden">
          <table className="w-full md:min-w-[40rem]">
            <thead>
              <tr className="border-b border-slate/30">
                <th scope="col" className={th}>Product</th>
                <th scope="col" className={`${th} ${wide}`}>Size</th>
                <th scope="col" className={`${th} text-right`}>Price</th>
                <th scope="col" className={`${th} pr-0 text-right`}>Full truck <span className="block text-xs">{truck.cubicMetres} m³</span></th>
              </tr>
            </thead>
            <RevealGroup as="tbody" stagger={0.04}>
              {bulkMaterials.map((m) => {
                const price = unitPrice(m.slug)
                const full = fullTruckPrice(m.slug)
                return (
                  <RevealItem as="tr" key={m.slug} className="border-b border-border">
                    <th scope="row" className={`${td} text-left font-normal`}>
                      <Link href={`/materials#${m.slug}`} className="inline-block py-1 underline decoration-slate/25 underline-offset-4 hover:decoration-slate">
                        {m.name}
                      </Link>
                      {m.size && <span className="block text-sm text-silt sm:hidden">{m.size}</span>}
                    </th>
                    <td className={`${td} ${wide} text-silt`}>{m.size || "—"}</td>
                    <td className={`${td} text-right`}>
                      {price ? (
                        <>
                          <span className="type-figure text-xl">{price.unit === "kg" ? formatRate(price.amount) : formatPeso(price.amount)}</span>
                          <span className="block text-xs text-silt">per {unitName[price.unit]}</span>
                        </>
                      ) : (
                        <span className="text-silt">To be determined</span>
                      )}
                    </td>
                    <td className={`${td} pr-0 text-right`}>
                      {full ? (
                        <>
                          {full.kg ? "about " : ""}
                          {formatPeso(full.amount)}
                          {full.kg && <span className="block text-xs text-silt">about {formatKg(full.kg)}</span>}
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                  </RevealItem>
                )
              })}
            </RevealGroup>
          </table>
        </div>
        <p className="mt-4 text-sm text-silt">
          Full-truck weights are estimates at about {formatKg(truck.kgPerCubicMetre)} per m³. You pay for the kilos you actually get.
        </p>
      </section>

      {/* By the sack */}
      <section id="sacks" aria-labelledby="sacks-heading" className="scroll-mt-24 bg-limewash py-20 md:py-28">
        <div className="page-gutter page-width">
          <SectionHeading
            id="sacks-heading"
            title="By the sack"
            body="Cooked limestone is our only sacked product, sold in 50 kg sacks."
            className="mb-8"
          />
          <div className="overflow-x-auto overflow-y-hidden">
            <table className="w-full sm:min-w-[34rem]">
              <thead>
                <tr className="border-b border-slate/30">
                  <th scope="col" className={th}>Product</th>
                  <th scope="col" className={`${th} ${wide}`}>Sack</th>
                  <th scope="col" className={`${th} pr-0 text-right`}>Per sack</th>
                </tr>
              </thead>
              <RevealGroup as="tbody" stagger={0.05}>
                {sackMaterials.map((m) => {
                  const sack = unitPrice(m.slug)
                  return (
                    <RevealItem as="tr" key={m.slug} className="border-b border-border">
                      <th scope="row" className={`${td} text-left font-normal`}>
                        <Link href={`/materials#${m.slug}`} className="inline-block py-1 underline decoration-slate/25 underline-offset-4 hover:decoration-slate">
                          {m.name}
                        </Link>
                        <span className="block text-sm text-silt sm:hidden">{m.size}</span>
                      </th>
                      <td className={`${td} ${wide} text-silt`}>{m.size}</td>
                      <td className={`${td} pr-0 text-right type-figure text-xl`}>{sack ? formatPeso(sack.amount) : "To be determined"}</td>
                    </RevealItem>
                  )
                })}
              </RevealGroup>
            </table>
          </div>
        </div>
      </section>

      {/* Delivery fees */}
      <section id="delivery" aria-labelledby="delivery-heading" className="page-gutter page-width scroll-mt-24 py-20 md:py-28">
        <SectionHeading
          id="delivery-heading"
          title="Delivery fees"
          body="Delivery is a separate service, paid separately from the limestone. Collecting it yourself costs nothing extra."
          link={{ href: "/delivery", label: "How delivery works" }}
          className="mb-8"
        />
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <Reveal className="on-slate rounded-sm bg-slate p-6 text-limewash md:col-span-5 md:p-8">
            <Truck className="size-7 text-loader" aria-hidden="true" />
            <p className="mt-6">
              <span className="type-figure text-5xl text-loader">{formatPeso(truck.feePerKm)}</span>
              <span className="text-fossil"> per km</span>
            </p>
            <p className="mt-3 text-fossil">
              For every kilometre from the yard, per trip. One {truck.name.toLowerCase()} holds up to {truck.cubicMetres} m³.
            </p>
            <p className="mt-6 border-t border-limewash/15 pt-5 text-sm">{delivery.payNote}</p>
          </Reveal>
          <div className="md:col-span-7">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate/30">
                  <th scope="col" className={th}>Distance from the yard</th>
                  <th scope="col" className={`${th} pr-0 text-right`}>Delivery fee per trip</th>
                </tr>
              </thead>
              <RevealGroup as="tbody" stagger={0.05}>
                {exampleKm.map((km) => (
                  <RevealItem as="tr" key={km} className="border-b border-border">
                    <th scope="row" className={`${td} text-left font-normal`}>{km} km</th>
                    <td className={`${td} pr-0 text-right type-figure text-lg sm:text-xl`}>{formatPeso(km * truck.feePerKm)}</td>
                  </RevealItem>
                ))}
              </RevealGroup>
            </table>
            <p className="mt-4 text-sm text-silt">
              Orders over {truck.cubicMetres} m³ need more than one trip, and each trip is charged. We deliver {priceList.area}.
            </p>
          </div>
        </div>
      </section>

      {/* Estimator */}
      <section id="estimate" aria-labelledby="estimate-heading" className="page-gutter page-width scroll-mt-24 pb-20 md:pb-28">
        <SectionHeading
          id="estimate-heading"
          title="Estimate your order"
          body="Pick a product and an amount. Add delivery to see how many trips it takes and what it costs, shown apart from the limestone."
          className="mb-8"
        />
        <Reveal>
          <Estimator
            products={materials.map((m) => ({
              slug: m.slug,
              name: m.name,
              sackKg: m.sackKg,
            }))}
          />
        </Reveal>
      </section>

      {/* Notes */}
      <section className="bg-limewash py-20 md:py-24">
        <div className="page-gutter page-width grid gap-10 md:grid-cols-12">
          <h2 className="type-h3 md:col-span-4">Good to know</h2>
          <ul className="space-y-4 md:col-span-8">
            {priceList.notes.map((n) => (
              <li key={n} className="flex gap-3">
                <Info className="mt-1 size-4 shrink-0 text-ochre" aria-hidden="true" />
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
