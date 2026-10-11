import Link from "next/link"
import { image, video } from "@/lib/media"
import { site } from "@/content/site"
import { applications, hero, intro, process, visitBand } from "@/content/home"
import { stoneMedia, stones, getStone } from "@/content/stones"
import { projectMedia, projects } from "@/content/projects"
import { Hero } from "@/components/home/hero"
import { SlabRack } from "@/components/home/slab-rack"
import { MediaFrame } from "@/components/media/media-frame"
import { SectionHeading, TextLink } from "@/components/shared/section-heading"
import { cn } from "@/lib/utils"

// Varied spans so the applications read as a composed spread, not a card grid.
const applicationLayout = [
  { span: "md:col-span-7 md:row-span-2", frame: "aspect-[4/5] md:aspect-auto md:flex-1" },
  { span: "md:col-span-5", frame: "aspect-[16/10]" },
  { span: "md:col-span-5", frame: "aspect-[16/10]" },
  { span: "md:col-span-4", frame: "aspect-[4/3]" },
  { span: "md:col-span-4", frame: "aspect-[4/3]" },
  { span: "md:col-span-4", frame: "aspect-[4/3]" },
]

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
          <p className="type-h2 md:col-span-8">{intro.statement}</p>
          <dl className="grid content-end gap-8 sm:grid-cols-3 md:col-span-4 md:grid-cols-1 md:gap-6 md:border-l md:border-border md:pl-10">
            {site.facts.map((f) => (
              <div key={f.value}>
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="type-h3 block">{f.value}</span>
                  <span className="mt-1 block text-silt">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* The slab rack */}
      <section aria-labelledby="stones-heading" className="page-gutter page-width pb-24 md:pb-36">
        <SectionHeading
          id="stones-heading"
          title="The stones"
          body="Every variety here is stocked in the yard as full slabs and cut tiles."
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
            body="Limestone works inside and out. These are the jobs we cut and finish for most often."
            className="mb-12 md:mb-16"
          />
          <ul className="grid gap-x-6 gap-y-12 md:grid-cols-12 md:gap-y-14">
            {applications.map((app, i) => (
              <li key={app.title} className={cn("flex flex-col", applicationLayout[i].span)}>
                <div className={cn("relative overflow-hidden rounded-sm", applicationLayout[i].frame)}>
                  <MediaFrame
                    media={image(app.media)}
                    alt={`${app.title} in limestone`}
                    tone={stones[i % stones.length].tone}
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <h3 className="type-h3 mt-5">{app.title}</h3>
                <p className="mt-1.5 text-silt">{app.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process — a real sequence, so numbered */}
      <section className="on-bluestone bg-bluestone py-24 text-honed md:py-36">
        <div className="page-gutter page-width grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6 lg:col-span-5">
            <SectionHeading title={process.title} body={process.body} />
            <ol className="mt-12 border-t border-honed/15">
              {process.steps.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-b border-honed/15 py-6">
                  <span className="font-display text-3xl leading-none text-lichen-light" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg">{step.title}</h3>
                    <p className="mt-1 text-fossil">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative min-h-[28rem] overflow-hidden rounded-sm md:col-span-6 md:col-start-7 lg:col-span-6 lg:col-start-7">
            <MediaFrame
              media={video(process.video, process.poster)}
              alt="Stone being cut and finished in the yard"
              tone={{ base: "#6c706d", vein: "#4a4e4c", grain: "#2f3332" }}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="page-gutter page-width py-24 md:py-36">
        <SectionHeading
          title="Recent work"
          body="A few of the homes, hotels and public spaces finished in our stone."
          link={{ href: "/projects", label: "All projects" }}
          className="mb-12 md:mb-16"
        />
        <ul className="grid gap-x-6 gap-y-12 md:grid-cols-12">
          {recent.map((p, i) => {
            const stone = getStone(p.stoneSlug)
            return (
              <li
                key={p.slug}
                className={cn(
                  i === 0 ? "md:col-span-7 md:row-span-2" : "md:col-span-5",
                  "flex flex-col"
                )}
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
                      imageClassName="transition-transform duration-[1.2s] ease-settle group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="type-h3 mt-5">{p.title}</h3>
                  <p className="mt-1 text-silt">
                    {stone?.name}, {p.application.toLowerCase()}
                  </p>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Visit */}
      <section className="page-gutter page-width pb-24 md:pb-36">
        <div className="grid overflow-hidden rounded-sm bg-honed md:grid-cols-2">
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
              <Link
                href="/visit"
                className="inline-flex h-12 items-center rounded-full bg-bluestone px-7 text-honed transition-colors hover:bg-lichen"
              >
                Plan a visit
              </Link>
              <TextLink href={site.contact.directionsUrl}>Get directions</TextLink>
            </div>
          </div>
          <div className="relative min-h-80">
            <MediaFrame
              media={image("media/home/visit")}
              alt="The stone yard"
              tone={{ base: "#bfb8a8", vein: "#958c79", grain: "#6f6858" }}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>
    </>
  )
}
