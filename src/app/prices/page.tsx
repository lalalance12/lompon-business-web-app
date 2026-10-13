import type { Metadata } from "next"
import Link from "next/link"
import { Info } from "lucide-react"
import { materials, sackMaterials, tonMaterials } from "@/content/materials"
import { formatPeso, priceList } from "@/content/prices"
import { PageIntro } from "@/components/shared/page-intro"
import { SectionHeading } from "@/components/shared/section-heading"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { Estimator } from "@/components/prices/estimator"
import { cta } from "@/lib/cta"

export const metadata: Metadata = {
  title: "Price list",
  description: "General prices for limestone aggregate by the ton, fine and cooked limestone by the sack, and dump-truck delivery fees.",
}

const th = "py-3 pr-6 text-left text-sm font-normal text-silt"
const td = "py-4 pr-6 tabular-nums"

export default function PricesPage() {
  const [, six, ten] = priceList.trucks

  return (
    <>
      <PageIntro
        title="Price list"
        lede="General prices for everything we sell, and what delivery costs. Use the estimator at the bottom to add it up."
      >
        <p className="mt-6 text-sm text-silt">Prices updated {priceList.updated}. All amounts in Philippine pesos.</p>
        <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
          {[
            { href: "#tons", label: "By the ton" },
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

      {/* By the ton */}
      <section id="tons" aria-labelledby="tons-heading" className="page-gutter page-width scroll-mt-24 pb-20 md:pb-28">
        <SectionHeading
          id="tons-heading"
          title="By the ton"
          body="Loaded onto your truck at the yard. Full truckloads are shown for comparison; delivery is charged separately."
          className="mb-8"
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[40rem]">
            <thead>
              <tr className="border-b border-slate/30">
                <th scope="col" className={th}>Product</th>
                <th scope="col" className={th}>Piece size</th>
                <th scope="col" className={`${th} text-right`}>Per ton</th>
                <th scope="col" className={`${th} text-right`}>{six.name} load ({six.tons} t)</th>
                <th scope="col" className={`${th} pr-0 text-right`}>{ten.name} load ({ten.tons} t)</th>
              </tr>
            </thead>
            <RevealGroup as="tbody" stagger={0.04}>
              {tonMaterials.map((m) => {
                const perTon = priceList.perTon[m.slug]
                return (
                  <RevealItem as="tr" key={m.slug} className="border-b border-border">
                    <th scope="row" className={`${td} text-left font-normal`}>
                      <Link href={`/materials#${m.slug}`} className="underline decoration-slate/25 underline-offset-4 hover:decoration-slate">
                        {m.name}
                      </Link>
                    </th>
                    <td className={`${td} text-silt`}>{m.size}</td>
                    <td className={`${td} text-right type-figure text-xl`}>{formatPeso(perTon)}</td>
                    <td className={`${td} text-right`}>{formatPeso(perTon * six.tons)}</td>
                    <td className={`${td} pr-0 text-right`}>{formatPeso(perTon * ten.tons)}</td>
                  </RevealItem>
                )
              })}
            </RevealGroup>
          </table>
        </div>
      </section>

      {/* By the sack */}
      <section id="sacks" aria-labelledby="sacks-heading" className="scroll-mt-24 bg-limewash py-20 md:py-28">
        <div className="page-gutter page-width">
          <SectionHeading
            id="sacks-heading"
            title="By the sack"
            body={`Bagged at the yard. The lower price applies from ${priceList.bulkFrom} sacks of the same product.`}
            className="mb-8"
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem]">
              <thead>
                <tr className="border-b border-slate/30">
                  <th scope="col" className={th}>Product</th>
                  <th scope="col" className={th}>Sack</th>
                  <th scope="col" className={`${th} text-right`}>Per sack</th>
                  <th scope="col" className={`${th} pr-0 text-right`}>From {priceList.bulkFrom} sacks</th>
                </tr>
              </thead>
              <RevealGroup as="tbody" stagger={0.05}>
                {sackMaterials.map((m) => {
                  const sack = priceList.perSack[m.slug]
                  return (
                    <RevealItem as="tr" key={m.slug} className="border-b border-border">
                      <th scope="row" className={`${td} text-left font-normal`}>
                        <Link href={`/materials#${m.slug}`} className="underline decoration-slate/25 underline-offset-4 hover:decoration-slate">
                          {m.name}
                        </Link>
                      </th>
                      <td className={`${td} text-silt`}>{m.size}</td>
                      <td className={`${td} text-right type-figure text-xl`}>{formatPeso(sack.each)}</td>
                      <td className={`${td} pr-0 text-right`}>{formatPeso(sack.bulk)}</td>
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
          body="Per trip, by distance from the yard and the size of truck. Collecting it yourself costs nothing extra."
          link={{ href: "/delivery", label: "How delivery works" }}
          className="mb-8"
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem]">
            <thead>
              <tr className="border-b border-slate/30">
                <th scope="col" className={th}>Distance</th>
                {priceList.trucks.map((t, i) => (
                  <th key={t.key} scope="col" className={`${th} text-right ${i === priceList.trucks.length - 1 ? "pr-0" : ""}`}>
                    {t.name} <span className="block text-xs">up to {t.tons} t</span>
                  </th>
                ))}
              </tr>
            </thead>
            <RevealGroup as="tbody" stagger={0.05}>
              {priceList.zones.map((z) => (
                <RevealItem as="tr" key={z.label} className="border-b border-border">
                  <th scope="row" className={`${td} text-left font-normal`}>{z.label}</th>
                  {priceList.trucks.map((t, i) => (
                    <td key={t.key} className={`${td} text-right type-figure text-xl ${i === priceList.trucks.length - 1 ? "pr-0" : ""}`}>
                      {formatPeso(z.fees[t.key])}
                    </td>
                  ))}
                </RevealItem>
              ))}
            </RevealGroup>
          </table>
        </div>
      </section>

      {/* Estimator */}
      <section id="estimate" aria-labelledby="estimate-heading" className="page-gutter page-width scroll-mt-24 pb-20 md:pb-28">
        <SectionHeading
          id="estimate-heading"
          title="Estimate your order"
          body="Pick a product and an amount. Add delivery to see which trucks we'd send and the total."
          className="mb-8"
        />
        <Reveal>
          <Estimator
            products={materials.map((m) => ({
              slug: m.slug,
              name: m.name,
              unit: m.unit,
              sackKg: m.unit === "sack" ? parseInt(m.size, 10) : undefined,
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
