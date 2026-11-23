import Link from "next/link"
import { Truck, Warehouse } from "lucide-react"
import { image, video } from "@/lib/media"
import { cn } from "@/lib/utils"
import { site } from "@/content/site"
import { hero, intro, journey, pricesTeaser, screening, usesSection, visitBand, waysToBuy } from "@/content/home"
import { bulkMaterials, materials, sackMaterials } from "@/content/materials"
import { formatPeso, formatRate, priceLabel, priceList, unitPrice } from "@/content/prices"
import { useCases, jobMedia } from "@/content/uses"
import { projectMedia, projects } from "@/content/projects"
import { Hero } from "@/components/home/hero"
import { UseCaseExplorer } from "@/components/home/use-case-explorer"
import { ScreeningScene } from "@/components/home/screening-scene"
import { DeliveryJourney } from "@/components/home/delivery-journey"
import { MediaFrame } from "@/components/media/media-frame"
import { MediaCard } from "@/components/shared/media-card"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { SectionHeading, TextLink } from "@/components/shared/section-heading"
import { cta } from "@/lib/cta"

const byMaterial = (slug: string) => materials.find((m) => m.slug === slug)!

/** "₱2.20 per kg" / "₱400 per m³" / "₱110 per sack" */
const priceOf = (slug: string) => priceLabel(slug)

export default function HomePage() {
  const explorerUses = useCases.map((u) => ({
    slug: u.slug,
    title: u.title,
    body: u.body,
    tone: u.tone,
    media: image(jobMedia(u.slug)),
    products: u.products.map((slug) => ({ slug, name: byMaterial(slug).name, price: priceOf(slug) })),
  }))

  // Screen decks, top to bottom: what each screen holds back, then what falls through
  const decks = ["boulders", "gravel", "pebbles", "limestone-fines"].map((slug) => {
    const m = byMaterial(slug)
    return { slug, name: m.name, size: m.size, price: priceOf(slug) }
  })

  const kiloFrom = Math.min(...Object.values(priceList.perKg))
  const sackFrom = Math.min(...sackMaterials.map((m) => unitPrice(m.slug)?.amount ?? Infinity))
  const buyFrom = { bulk: `From ${formatRate(kiloFrom)} per kg`, sack: `${formatPeso(sackFrom)} per sack` }
  const buyLists = { bulk: bulkMaterials, sack: sackMaterials }

  const highlights = [
    { label: "Limestone fines", value: formatRate(priceList.perKg["limestone-fines"]), unit: "per kg", href: "/prices#bulk" },
    { label: "Crushed gravel", value: formatRate(priceList.perKg.gravel), unit: "per kg", href: "/prices#bulk" },
    { label: "Boulders", value: formatPeso(priceList.perCubicMetre.boulders), unit: "per m³", href: "/prices#bulk" },
    { label: "Delivery", value: formatPeso(priceList.truck.feePerKm), unit: "per km, paid separately", href: "/prices#delivery" },
  ]

  const recent = projects.slice(0, 3)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.contact.phone,
    email: site.contact.email,
    address: site.contact.addressLines.join(", "),
    foundingDate: String(site.established),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <Hero media={video(hero.video, hero.poster)} />

      {/* Intro */}
      <section className="page-gutter page-width py-24 md:py-32">
        <div className="grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-8">
            <p className="type-h2">{intro.statement}</p>
          </Reveal>
          <RevealGroup
            as="div"
            className="grid content-end gap-8 sm:grid-cols-3 md:col-span-4 md:grid-cols-1 md:gap-6 md:border-l md:border-border md:pl-10"
          >
            <dl className="contents">
              {site.facts.map((f) => (
                <RevealItem as="div" key={f.value}>
                  <dt className="sr-only">{f.label}</dt>
                  <dd>
                    <span className="type-h3 block">{f.value}</span>
                    <span className="mt-1 block text-silt">{f.label}</span>
                  </dd>
                </RevealItem>
              ))}
            </dl>
          </RevealGroup>
        </div>
      </section>

      {/* 1. What it's used for */}
      <section id="uses" aria-labelledby="uses-heading" className="page-gutter page-width scroll-mt-24 pb-24 md:pb-32">
        <SectionHeading id="uses-heading" title={usesSection.title} body={usesSection.body} className="mb-10 md:mb-14" />
        <UseCaseExplorer uses={explorerUses} />
      </section>

      {/* Scroll scene: sorted by size */}
      <div className="bg-limewash">
        <ScreeningScene title={screening.title} body={screening.body} decks={decks} />
      </div>

      {/* 2. How to buy */}
      <section id="buy" aria-labelledby="buy-heading" className="page-gutter page-width scroll-mt-24 py-24 md:py-32">
        <SectionHeading
          id="buy-heading"
          title="How to buy"
          body="Two ways to buy, two ways to get it home. Collect from the yard with your own truck, or book one of ours."
          className="mb-12 md:mb-16"
        />
        <RevealGroup className="grid gap-x-6 gap-y-14 md:grid-cols-2" stagger={0.08}>
          {waysToBuy.map((way) => (
            <RevealItem key={way.title} className="flex">
              <MediaCard
                href={way.href}
                media={image(way.media)}
                alt={way.title}
                tone={byMaterial(way.group === "bulk" ? "gravel" : "cooked-limestone").tone}
                badge={buyFrom[way.group]}
                title={way.title}
                titleSize="h2"
                description={way.body}
                lines={2}
                cta={way.cta}
              >
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {buyLists[way.group].map((m) => (
                    <li key={m.slug} className="rounded-full border border-border px-3 py-1 text-sm text-silt">
                      {m.name}
                    </li>
                  ))}
                </ul>
              </MediaCard>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup as="div" className="mt-16 grid gap-4 border-t border-border pt-10 sm:grid-cols-2" stagger={0.06}>
          <RevealItem as="div" className="flex gap-4">
            <Warehouse className="mt-1 size-6 shrink-0 text-ochre" aria-hidden="true" />
            <div>
              <h3 className="text-lg">Pick up at the yard</h3>
              <p className="mt-1 text-silt">Drive in during opening hours. We load your truck for free.</p>
            </div>
          </RevealItem>
          <RevealItem as="div" className="flex gap-4">
            <Truck className="mt-1 size-6 shrink-0 text-ochre" aria-hidden="true" />
            <div>
              <h3 className="text-lg">Delivery by dump truck</h3>
              <p className="mt-1 text-silt">
                A separate service, paid apart from the limestone: {formatPeso(priceList.truck.feePerKm)} per km, up to {priceList.truck.cubicMetres} m³ a trip. Watch a load go from our yard to a site just below.
              </p>
            </div>
          </RevealItem>
        </RevealGroup>
      </section>

      {/* Scroll scene: a delivery from yard to site */}
      <DeliveryJourney title={journey.title} body={journey.body} stages={journey.stages} />

      {/* 3. What it costs */}
      <section id="prices" aria-labelledby="prices-heading" className="page-gutter page-width scroll-mt-24 py-24 md:py-32">
        <SectionHeading
          id="prices-heading"
          title={pricesTeaser.title}
          body={pricesTeaser.body}
          link={{ href: "/prices", label: "Full price list" }}
          className="mb-12"
        />
        <RevealGroup className="grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {highlights.map((h) => (
            <RevealItem key={h.label} className="bg-chalk">
              <Link href={h.href} className="group flex h-full flex-col p-6 transition-colors duration-200 hover:bg-loader md:p-8">
                <span className="text-silt group-hover:text-slate">{h.label}</span>
                <span className="type-figure mt-6 text-5xl">{h.value}</span>
                <span className="mt-1 text-sm text-silt group-hover:text-slate">{h.unit}</span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-10 flex flex-wrap items-center gap-3">
          <Link href="/prices#estimate" className={cta({ tone: "primary", size: "md" })}>
            Estimate my order
          </Link>
          <p className="text-sm text-silt">Prices updated {priceList.updated}. A general guide; we confirm before you pay.</p>
        </Reveal>
      </section>

      {/* Projects */}
      <section className="bg-limewash py-24 md:py-32">
        <div className="page-gutter page-width">
          <SectionHeading
            title="Recent jobs"
            body="Roads, riverbanks, filled lots and farms supplied from our yard."
            link={{ href: "/projects", label: "All projects" }}
            className="mb-12 md:mb-16"
          />
          <RevealGroup className="grid gap-x-6 gap-y-12 md:grid-cols-12" stagger={0.07}>
            {recent.map((p, i) => {
              const material = byMaterial(p.materialSlug)
              return (
                <RevealItem
                  key={p.slug}
                  className={cn(i === 0 ? "md:col-span-7 md:row-span-2" : "md:col-span-5", "flex flex-col")}
                >
                  <MediaCard
                    href={`/projects#${p.slug}`}
                    media={image(projectMedia(p.slug, 1))}
                    alt={p.title}
                    tone={material.tone}
                    frameClassName={i === 0 ? "aspect-[4/5] md:aspect-auto md:flex-1" : "aspect-[16/10]"}
                    title={p.title}
                    description={`${p.quantity} of ${material.name.toLowerCase()}`}
                    lines={1}
                  />
                </RevealItem>
              )
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Visit */}
      <section className="page-gutter page-width py-24 md:py-32">
        <Reveal className="grid overflow-hidden rounded-sm bg-limewash md:grid-cols-2">
          <div className="flex flex-col justify-between gap-12 p-8 md:p-14">
            <div>
              <h2 className="type-h2 max-w-[14ch]">{visitBand.title}</h2>
              <p className="type-lede mt-5 max-w-[42ch] text-silt">{visitBand.body}</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <address className="not-italic leading-relaxed">
                {site.contact.addressLines.map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </address>
              <dl className="space-y-2 text-sm">
                {site.hours.map((h) => (
                  <div key={h.days}>
                    <dt className="text-silt">{h.days}</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/visit" className={cta({ tone: "primary", size: "md" })}>
                Plan a visit
              </Link>
              <TextLink href={site.contact.directionsUrl}>Get directions</TextLink>
            </div>
          </div>
          <div className="relative min-h-80">
            <MediaFrame
              media={image("media/home/visit")}
              alt="The limestone yard"
              tone={{ base: "#bfb8a8", vein: "#958c79", grain: "#6f6858" }}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </Reveal>
      </section>
    </>
  )
}
