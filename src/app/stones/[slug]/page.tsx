import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Phone } from "lucide-react"
import { image, video } from "@/lib/media"
import { site } from "@/content/site"
import { finishDescriptions } from "@/content/finishes"
import { getStone, stoneMedia, stones } from "@/content/stones"
import { MediaFrame } from "@/components/media/media-frame"
import { StoneGallery } from "@/components/stones/stone-gallery"
import { SectionHeading, TextLink } from "@/components/shared/section-heading"

export function generateStaticParams() {
  return stones.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps<"/stones/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const stone = getStone(slug)
  if (!stone) return {}
  return { title: stone.name, description: stone.summary }
}

export default function StonePage({ params }: PageProps<"/stones/[slug]">) {
  return (
    <Suspense fallback={<StoneSkeleton />}>
      <StoneContent params={params} />
    </Suspense>
  )
}

/** Shown for an instant during client navigation while the stone's data resolves. */
function StoneSkeleton() {
  return (
    <div aria-hidden="true" className="page-gutter page-width grid gap-12 pt-28 pb-24 md:grid-cols-12 md:gap-10 md:pt-36">
      <div className="space-y-5 md:col-span-5">
        <div className="h-4 w-24 rounded-sm bg-bedding" />
        <div className="h-4 w-48 rounded-sm bg-bedding" />
        <div className="h-20 w-4/5 rounded-sm bg-bedding" />
        <div className="h-16 w-full rounded-sm bg-bedding/70" />
      </div>
      <div className="aspect-[4/5] rounded-sm bg-bedding md:col-span-7" />
    </div>
  )
}

async function StoneContent({ params }: { params: PageProps<"/stones/[slug]">["params"] }) {
  const { slug } = await params
  const stone = getStone(slug)
  if (!stone) notFound()

  const galleryItems = [
    { media: image(stoneMedia.cover(slug)), alt: `${stone.name}, full slab`, tone: stone.tone },
    ...Array.from({ length: stone.galleryCount }, (_, i) => ({
      media: image(stoneMedia.gallery(slug, i + 1)),
      alt: `${stone.name}, photo ${i + 2}`,
      tone: stone.tone,
    })),
  ]
  const film = video(stoneMedia.video(slug))

  const related = stones
    .filter((s) => s.slug !== slug)
    .sort((a, b) => Number(b.toneGroup === stone.toneGroup) - Number(a.toneGroup === stone.toneGroup))
    .slice(0, 3)

  return (
    <article>
      {/* Overview: details stay in view while the photographs scroll past */}
      <div className="page-gutter page-width grid gap-12 pt-28 pb-24 md:grid-cols-12 md:gap-10 md:pt-36 md:pb-36">
        <div className="self-start md:sticky md:top-28 md:col-span-5">
          <TextLink href="/stones" className="-mt-2 mb-8 text-silt">All stones</TextLink>
          <p className="text-silt">
            {stone.family}, {stone.origin}
          </p>
          <h1 className="type-h1 mt-3">{stone.name}</h1>
          <p className="type-lede mt-6 max-w-[44ch]">{stone.summary}</p>
          <div className="mt-6 max-w-[56ch] space-y-4 text-silt">
            {stone.description.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <dl className="mt-10 grid grid-cols-[7rem_1fr] gap-x-6 gap-y-3 border-t border-border pt-6 text-[0.9375rem]">
            <dt className="text-silt">Colour</dt>
            <dd>{stone.toneGroup}</dd>
            <dt className="text-silt">Finishes</dt>
            <dd>{stone.finishes.join(", ")}</dd>
            <dt className="text-silt">Best for</dt>
            <dd>{stone.applications.join(", ")}</dd>
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={`/visit?stone=${stone.slug}#inquiry`}
              className="inline-flex h-12 items-center rounded-full bg-bluestone px-7 text-honed transition-colors hover:bg-lichen"
            >
              Ask about {stone.name}
            </Link>
            <a
              href={site.contact.phoneHref}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-bluestone/25 px-6 transition-colors hover:bg-bluestone hover:text-honed"
            >
              <Phone className="size-4" aria-hidden="true" />
              Call the yard
            </a>
          </div>
        </div>

        <div className="md:col-span-7">
          <StoneGallery name={stone.name} items={galleryItems} video={film.video ? film : null} />
        </div>
      </div>

      {/* Finishes */}
      <section className="bg-honed py-24 md:py-32">
        <div className="page-gutter page-width">
          <SectionHeading
            title="Finishes"
            body={`The same ${stone.name} looks different with each surface. Ask to see finished samples at the yard.`}
            className="mb-12"
          />
          <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {stone.finishes.map((finish) => (
              <li key={finish} className="grid grid-cols-[6.5rem_1fr] items-start gap-5 sm:grid-cols-1">
                <div className="relative aspect-square overflow-hidden rounded-sm sm:aspect-[3/2]">
                  <MediaFrame
                    media={image(stoneMedia.finish(slug, finish))}
                    alt={`${stone.name}, ${finish.toLowerCase()} finish`}
                    tone={stone.tone}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 30vw"
                  />
                </div>
                <div>
                  <h3 className="type-h3">{finish}</h3>
                  <p className="mt-1.5 text-silt">{finishDescriptions[finish]}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Formats and technical data */}
      <section className="page-gutter page-width grid gap-16 py-24 md:grid-cols-12 md:gap-10 md:py-32">
        <div className="md:col-span-7">
          <h2 className="type-h2">Sizes and formats</h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left text-[0.9375rem]">
              <thead>
                <tr className="border-b border-bluestone/30 text-silt">
                  <th scope="col" className="py-3 pr-6 font-normal">Format</th>
                  <th scope="col" className="py-3 pr-6 font-normal">Sizes</th>
                  <th scope="col" className="py-3 font-normal">Thickness</th>
                </tr>
              </thead>
              <tbody>
                {stone.formats.map((f) => (
                  <tr key={f.name} className="border-b border-border">
                    <th scope="row" className="py-4 pr-6 font-normal">{f.name}</th>
                    <td className="py-4 pr-6">{f.sizes}</td>
                    <td className="py-4">{f.thickness}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-sm text-silt">Other sizes are cut to order from slabs in stock.</p>
        </div>

        <div className="md:col-span-4 md:col-start-9">
          <h2 className="type-h2">Technical data</h2>
          <dl className="mt-8 text-[0.9375rem]">
            {stone.specs.map((s) => (
              <div key={s.label} className="flex justify-between gap-6 border-b border-border py-4 first:border-t first:border-t-bluestone/30">
                <dt className="text-silt">{s.label}</dt>
                <dd className="text-right">{s.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-sm text-silt">Typical values. Test certificates are available on request.</p>
        </div>
      </section>

      {/* Related */}
      <section className="page-gutter page-width pb-24 md:pb-36">
        <SectionHeading title="Compare with" link={{ href: "/stones", label: "All stones" }} className="mb-10" />
        <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-3">
          {related.map((s) => (
            <li key={s.slug}>
              <Link href={`/stones/${s.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                  <MediaFrame
                    media={image(stoneMedia.cover(s.slug))}
                    alt={`${s.name} limestone`}
                    tone={s.tone}
                    sizes="(min-width: 640px) 33vw, 100vw"
                    imageClassName="transition-transform duration-[1.2s] ease-settle group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="type-h3 mt-5">{s.name}</h3>
                <p className="mt-1 text-silt">{s.family}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
