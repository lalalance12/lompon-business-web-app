import Link from "next/link"
import { Check } from "lucide-react"
import { image, video } from "@/lib/media"
import { cn } from "@/lib/utils"
import { site } from "@/content/site"
import { applications, hero, intro, process, visitBand, waysToBuy } from "@/content/home"
import { delivery } from "@/content/delivery"
import { materials } from "@/content/materials"
import { stoneMedia, stones, getStone } from "@/content/stones"
import { projectMedia, projects } from "@/content/projects"
import { Hero } from "@/components/home/hero"
import { SlabRack } from "@/components/home/slab-rack"
import { MediaFrame } from "@/components/media/media-frame"
import { DumpTruck } from "@/components/materials/dump-truck"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { SectionHeading, TextLink } from "@/components/shared/section-heading"

// Varied spans so the applications read as a composed spread, not a card grid.
const applicationLayout = [
  { span: "md:col-span-7 md:row-span-2", frame: "aspect-[4/5] md:aspect-auto md:flex-1" },
  { span: "md:col-span-5", frame: "aspect-[16/10]" },
  { span: "md:col-span-5", frame: "aspect-[16/10]" },
  { span: "md:col-span-4", frame: "aspect-[4/3]" },
  { span: "md:col-span-4", frame: "aspect-[4/3]" },
  { span: "md:col-span-4", frame: "aspect-[4/3]" },
]

// Texture colours for the application placeholders, matched to what each shows.
const applicationTones = [
  stones[0].tone,
  materials.find((m) => m.slug === "road-base")!.tone,
  materials.find((m) => m.slug === "gravel")!.tone,
  materials.find((m) => m.slug === "boulders")!.tone,
  materials.find((m) => m.slug === "fine-limestone")!.tone,
  materials.find((m) => m.slug === "cooked-limestone")!.tone,
]

const buyTones = [stones[1].tone, materials.find((m) => m.slug === "gravel")!.tone, materials.find((m) => m.slug === "fine-limestone")!.tone]

const hoverZoom = "transition-transform duration-500 ease-snap group-hover:scale-[1.04]"

export default function HomePage() {
  const featured = stones
    .filter((s) => s.featured)
    .map((s) => ({
      slug: s.slug,
      name: s.name,
      family: s.family,
      origin: s.origin,
      summary: s.summary,
      tone: s.tone,
      cover: image(stoneMedia.cover(s.slug)),
    }))

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
      <section className="page-gutter page-width py-24 md:py-36">
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

      {/* Three ways to buy */}
      <section id="buy" aria-labelledby="buy-heading" className="page-gutter page-width scroll-mt-24 pb-24 md:pb-36">
        <SectionHeading
          id="buy-heading"
          title="Three ways to buy"
          body="Finished stone by the piece, crushed stone by the ton, and lime by the sack. All from the same yard."
          className="mb-12 md:mb-16"
        />
        <RevealGroup className="grid gap-x-6 gap-y-14 md:grid-cols-3" stagger={0.07}>
          {waysToBuy.map((way, i) => (
            <RevealItem key={way.title}>
              <Link href={way.href} className="group flex h-full flex-col">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                  <MediaFrame
                    media={image(way.media)}
                    alt={way.title}
                    tone={buyTones[i]}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    imageClassName={hoverZoom}
                  />
                </div>
                <h3 className="type-h2 mt-6">{way.title}</h3>
                <p className="mt-2 text-silt">{way.body}</p>
                <ul className="mt-5 space-y-1.5 border-t border-border pt-5">
                  {way.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <span className="press mt-6 inline-flex h-11 w-fit items-center rounded-full border border-bluestone/25 px-5 text-[0.9375rem] group-hover:border-bluestone group-hover:bg-bluestone group-hover:text-honed">
                  {way.cta}
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Delivery */}
      <section aria-labelledby="delivery-heading" className="on-bluestone bg-bluestone py-24 text-honed md:py-36">
        <div className="page-gutter page-width grid items-center gap-14 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-5">
            <h2 id="delivery-heading" className="type-h2 max-w-[16ch]">{delivery.title}</h2>
            <p className="type-lede mt-5 max-w-[44ch] text-fossil">{delivery.lede}</p>
            <div className="mt-10 grid gap-8 border-t border-honed/15 pt-8 sm:grid-cols-2">
              {[delivery.options.delivery, delivery.options.pickup].map((o) => (
                <div key={o.title}>
                  <h3 className="text-lg">{o.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm text-fossil">
                    {o.points.slice(0, 2).map((p) => (
                      <li key={p} className="flex gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-lichen-light" aria-hidden="true" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/delivery" className="press inline-flex h-12 items-center rounded-full bg-honed px-7 text-bluestone hover:bg-lichen-light">
                How delivery works
              </Link>
              <Link href="/visit?delivery=1#inquiry" className="press inline-flex h-12 items-center rounded-full border border-honed/40 px-7 hover:border-honed">
                Book a dump truck
              </Link>
            </div>
          </Reveal>
          <div className="md:col-span-7">
            <DumpTruck tone="dark" />
          </div>
        </div>
      </section>

      {/* The slab rack */}
      <section aria-labelledby="stones-heading" className="page-gutter page-width py-24 md:py-36">
        <SectionHeading
          id="stones-heading"
          title="Cut stone"
          body="Nine limestones stocked as full slabs and cut tiles, finished in our own shed."
          link={{ href: "/stones", label: `See all ${stones.length} stones` }}
          className="mb-10 md:mb-14"
        />
        <SlabRack stones={featured} />
      </section>

      {/* Applications */}
      <section className="bg-honed py-24 md:py-36">
        <div className="page-gutter page-width">
          <SectionHeading
            title="Where it goes"
            body="From kitchen floors to sea walls. These are the jobs our stone, gravel and lime go into most often."
            className="mb-12 md:mb-16"
          />
          <RevealGroup className="grid gap-x-6 gap-y-12 md:grid-cols-12 md:gap-y-14">
            {applications.map((app, i) => (
              <RevealItem key={app.title} className={cn("flex flex-col", applicationLayout[i].span)}>
                <div className={cn("relative overflow-hidden rounded-sm", applicationLayout[i].frame)}>
                  <MediaFrame
                    media={image(app.media)}
                    alt={app.title}
                    tone={applicationTones[i]}
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <h3 className="type-h3 mt-5">{app.title}</h3>
                <p className="mt-1.5 text-silt">{app.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Process — a real sequence, so numbered */}
      <section className="page-gutter page-width py-24 md:py-36">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6 lg:col-span-5">
            <SectionHeading title={process.title} body={process.body} />
            <RevealGroup as="ol" className="mt-12 border-t border-border" stagger={0.06}>
              {process.steps.map((step, i) => (
                <RevealItem key={step.title} className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-b border-border py-6">
                  <span className="font-display text-3xl leading-none text-lichen" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg">{step.title}</h3>
                    <p className="mt-1 text-silt">{step.body}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <Reveal className="relative min-h-[28rem] overflow-hidden rounded-sm md:col-span-6 md:col-start-7" delay={0.08}>
            <MediaFrame
              media={video(process.video, process.poster)}
              alt="Stone being crushed, cut and loaded at the yard"
              tone={{ base: "#6c706d", vein: "#4a4e4c", grain: "#2f3332" }}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </Reveal>
        </div>
      </section>

      {/* Projects */}
      <section className="page-gutter page-width pb-24 md:pb-36">
        <SectionHeading
          title="Recent work"
          body="A few of the homes, hotels and public spaces finished in our stone."
          link={{ href: "/projects", label: "All projects" }}
          className="mb-12 md:mb-16"
        />
        <RevealGroup className="grid gap-x-6 gap-y-12 md:grid-cols-12" stagger={0.07}>
          {recent.map((p, i) => {
            const stone = getStone(p.stoneSlug)
            return (
              <RevealItem
                key={p.slug}
                className={cn(i === 0 ? "md:col-span-7 md:row-span-2" : "md:col-span-5", "flex flex-col")}
              >
                <Link href={`/projects#${p.slug}`} className="group flex flex-1 flex-col">
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-sm",
                      i === 0 ? "aspect-[4/5] md:aspect-auto md:flex-1" : "aspect-[16/10]"
                    )}
                  >
                    <MediaFrame
                      media={image(projectMedia(p.slug, 1))}
                      alt={p.title}
                      tone={stone?.tone}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      imageClassName={hoverZoom}
                    />
                  </div>
                  <h3 className="type-h3 mt-5">{p.title}</h3>
                  <p className="mt-1 text-silt">
                    {stone?.name}, {p.application.toLowerCase()}
                  </p>
                </Link>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </section>

      {/* Visit */}
      <section className="page-gutter page-width pb-24 md:pb-36">
        <Reveal className="grid overflow-hidden rounded-sm bg-honed md:grid-cols-2">
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
              <Link href="/visit" className="press inline-flex h-12 items-center rounded-full bg-bluestone px-7 text-honed hover:bg-lichen">
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
