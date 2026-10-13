import type { Metadata } from "next"
import Link from "next/link"
import { sackMaterials, tonMaterials } from "@/content/materials"
import { delivery } from "@/content/delivery"
import { PageIntro } from "@/components/shared/page-intro"
import { SectionHeading } from "@/components/shared/section-heading"
import { RevealGroup } from "@/components/motion/reveal"
import { SackPanel, TonRow } from "@/components/materials/material-entries"
import { SizeAxis, SizeScale } from "@/components/materials/size-scale"
import { DumpTruck } from "@/components/materials/dump-truck"
import { cta } from "@/lib/cta"

export const metadata: Metadata = {
  title: "Tons and sacks",
  description:
    "Crushed limestone aggregate, road base and boulders by the ton; fine and cooked limestone by the sack. Pick up at the yard or have it delivered by dump truck.",
}

export default function MaterialsPage() {
  return (
    <>
      <PageIntro
        title="Limestone by the ton and by the sack"
        lede="Crushed and screened at the yard: from fine dust for paver beds to boulders for sea walls, plus fine and cooked limestone in sacks. Every load is weighed before it leaves."
      >
        <nav aria-label="On this page" className="mt-10 flex flex-wrap gap-2">
          <a href="#tons" className={cta({ tone: "primary", size: "sm" })}>
            By the ton ({tonMaterials.length})
          </a>
          <a href="#sacks" className={cta({ tone: "outline", size: "sm" })}>
            By the sack ({sackMaterials.length})
          </a>
          <Link href="/prices" className={cta({ tone: "outline", size: "sm" })}>
            Price list
          </Link>
          <Link href="/delivery" className={cta({ tone: "outline", size: "sm" })}>
            Delivery
          </Link>
        </nav>
      </PageIntro>

      {/* By the ton */}
      <section id="tons" aria-labelledby="tons-heading" className="page-gutter page-width scroll-mt-24 pb-24 md:pb-32">
        <SectionHeading
          id="tons-heading"
          title="By the ton"
          body="Sold by weight from the weighbridge. Collect any amount from one ton, or book a dump truck for full loads."
          className="mb-12"
        />

        {/* Every size on one scale, as a quick comparison and jump list */}
        <div className="mb-6 rounded-sm bg-limewash p-6 md:p-8">
          <h3 className="text-sm text-silt">Piece sizes compared</h3>
          <ul className="mt-5 space-y-3">
            {tonMaterials.map((m) => (
              <li key={m.slug}>
                <a href={`#${m.slug}`} className="group grid items-center gap-x-6 gap-y-1 rounded-sm py-1 sm:grid-cols-[11rem_1fr_10rem]">
                  <span className="transition-colors group-hover:text-ochre">{m.name}</span>
                  {m.sizeMm && <SizeScale range={m.sizeMm} />}
                  <span className="text-sm text-silt sm:text-right">{m.size}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-2 hidden sm:grid sm:grid-cols-[11rem_1fr_10rem] sm:gap-x-6">
            <span />
            <SizeAxis />
          </div>
        </div>

        <RevealGroup as="ul" className="border-b border-border">
          {tonMaterials.map((m) => (
            <TonRow key={m.slug} material={m} />
          ))}
        </RevealGroup>
      </section>

      {/* By the sack */}
      <section id="sacks" aria-labelledby="sacks-heading" className="scroll-mt-24 bg-limewash py-24 md:py-32">
        <div className="page-gutter page-width">
          <SectionHeading
            id="sacks-heading"
            title="By the sack"
            body="Bagged at the yard for farms, builders and gardens. Easy to carry home in any car, or delivered with a bulk order."
            className="mb-14"
          />
          <RevealGroup as="ul" className="grid gap-16 md:gap-20" stagger={0.08}>
            {sackMaterials.map((m) => (
              <SackPanel key={m.slug} material={m} />
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Delivery teaser */}
      <section className="on-slate bg-slate py-24 text-limewash md:py-32">
        <div className="page-gutter page-width grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="type-h2 max-w-[16ch]">{delivery.title}</h2>
            <p className="type-lede mt-5 max-w-[46ch] text-fossil">{delivery.lede}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/delivery" className={cta({ tone: "light", size: "md" })}>
                How delivery works
              </Link>
              <Link href="/visit?delivery=1#inquiry" className={cta({ tone: "outline-dark", size: "md" })}>
                Book a dump truck
              </Link>
            </div>
          </div>
          <DumpTruck tone="dark" />
        </div>
      </section>
    </>
  )
}
