import type { Metadata } from "next"
import Link from "next/link"
import { image, video } from "@/lib/media"
import { about } from "@/content/about"
import { materials } from "@/content/materials"
import { MediaFrame } from "@/components/media/media-frame"
import { SectionHeading } from "@/components/shared/section-heading"

export const metadata: Metadata = {
  title: "About",
  description: about.lede,
}

export default function AboutPage() {
  const film = video(about.film, about.filmPoster)

  return (
    <>
      {/* Title over the yard */}
      <section className="on-slate relative isolate flex min-h-[85svh] items-end overflow-hidden bg-slate text-limewash">
        <div className="absolute inset-0 -z-10">
          <MediaFrame
            media={image(about.heroImage)}
            alt="The yard at first light"
            tone={{ base: "#9a958a", vein: "#6d695f", grain: "#4b4840" }}
            preload
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(35_41_44/0.9),rgb(35_41_44/0.2)_60%,rgb(35_41_44/0.35))]" />
        </div>
        <div className="page-gutter page-width w-full pt-36 pb-14 md:pb-20">
          <h1 className="type-h1 max-w-[16ch]">{about.title}</h1>
          <p className="type-lede mt-6 max-w-[50ch] text-limewash/85">{about.lede}</p>
        </div>
      </section>

      {/* Story */}
      <section className="page-gutter page-width grid gap-10 py-24 md:grid-cols-12 md:py-36">
        <h2 className="type-h2 md:col-span-4">How the yard began</h2>
        <div className="space-y-6 text-lg leading-relaxed text-silt md:col-span-6 md:col-start-6">
          {about.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      {/* Film */}
      <section className="page-gutter page-width pb-24 md:pb-36">
        <div className="relative aspect-video overflow-hidden rounded-sm">
          <MediaFrame
            media={film}
            alt="A day in the yard, from block to delivery"
            tone={{ base: "#7b7a72", vein: "#55544d", grain: "#3a3934" }}
            sizes="100vw"
          />
        </div>
      </section>

      {/* Timeline — a real sequence of years */}
      <section className="on-slate bg-slate py-24 text-limewash md:py-36">
        <div className="page-gutter page-width">
          <SectionHeading title="Over the years" className="mb-14" />
          <ol className="grid gap-px overflow-hidden rounded-sm bg-limewash/15 sm:grid-cols-2 lg:grid-cols-4">
            {about.timeline.map((t) => (
              <li key={t.year} className="bg-slate p-8 pt-10 lg:min-h-64">
                <p className="type-figure text-5xl text-loader">{t.year}</p>
                <p className="mt-6 max-w-[28ch] text-fossil">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The yard */}
      <section className="page-gutter page-width py-24 md:py-36">
        <SectionHeading
          title="The yard"
          body="A crusher, screens, a lime kiln, a weighbridge and our own dump trucks, all in one place."
          link={{ href: "/visit", label: "Plan a visit" }}
          className="mb-12"
        />
        <div className="grid gap-3 md:grid-cols-12">
          {about.yardImages.map((m, i) => (
            <div
              key={m}
              className={
                i === 0
                  ? "relative aspect-[4/3] overflow-hidden rounded-sm md:col-span-7 md:row-span-2 md:aspect-auto"
                  : "relative aspect-[4/3] overflow-hidden rounded-sm md:col-span-5"
              }
            >
              <MediaFrame
                media={image(m)}
                alt={`The yard, view ${i + 1}`}
                tone={materials[(i * 2) % materials.length].tone}
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-limewash py-24 md:py-36">
        <div className="page-gutter page-width">
          <SectionHeading title="Who you will meet" className="mb-12" />
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-3">
            {about.team.map((person, i) => (
              <li key={`${person.role}-${i}`}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                  <MediaFrame
                    media={image(person.photo)}
                    alt={`${person.name}, ${person.role}`}
                    tone={{ base: "#c9c3b6", vein: "#a39b8a", grain: "#7d7666" }}
                    sizes="(min-width: 640px) 33vw, 100vw"
                  />
                </div>
                <h3 className="type-h3 mt-5">{person.name}</h3>
                <p className="mt-1 text-silt">{person.role}</p>
              </li>
            ))}
          </ul>
          <p className="mt-16 max-w-[56ch] text-lg">
            Questions before you visit?{" "}
            <Link href="/visit#inquiry" className="underline decoration-slate/30 underline-offset-4 transition-colors hover:decoration-slate">
              Send us a message
            </Link>{" "}
            and the right person will get back to you.
          </p>
        </div>
      </section>
    </>
  )
}
