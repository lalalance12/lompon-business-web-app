import type { Metadata } from "next"
import { Suspense } from "react"
import { Mail, MapPin, Phone } from "lucide-react"
import { site } from "@/content/site"
import { bulkMaterials, sackMaterials } from "@/content/materials"
import { unitName, unitPrice } from "@/content/prices"
import { LocationMap } from "@/components/visit/location-map"
import { PageIntro } from "@/components/shared/page-intro"
import { InquiryForm, type ProductGroup } from "@/components/visit/inquiry-form"
import { cta } from "@/lib/cta"
import { SocialLinks } from "@/components/shared/social-links"

export const metadata: Metadata = {
  title: "Visit the yard",
  description: "Opening hours, directions, and how to order or book a dump-truck delivery.",
}

export default function VisitPage() {
  const groups: ProductGroup[] = [
    {
      label: "By the kilo",
      options: bulkMaterials.map((m) => ({ value: `material:${m.slug}`, name: m.name, unit: unitName[unitPrice(m.slug)?.unit ?? "kg"] })),
    },
    { label: "By the sack", options: sackMaterials.map((m) => ({ value: `material:${m.slug}`, name: m.name, unit: "sacks" })) },
  ]

  return (
    <>
      <PageIntro
        title="Visit the yard"
        lede="See the gravel sizes and the sacks in person, or drive in with your own truck and we'll load it. No appointment needed during opening hours."
      />

      <section className="page-gutter page-width grid gap-12 pb-24 md:grid-cols-12 md:gap-10 md:pb-32">
        <div className="space-y-10 md:col-span-5">
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-1">
            {site.locations.map((loc, i) => (
              <div key={loc.key}>
                <h2 className="type-h3">{loc.title}</h2>
                <address className="mt-3 text-lg leading-relaxed not-italic">
                  {loc.addressLines.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </address>
                <a
                  href={loc.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cta({ tone: i === 0 ? "primary" : "outline", size: "md", className: "mt-5" })}
                >
                  <MapPin className="size-4" aria-hidden="true" />
                  Get directions
                </a>
              </div>
            ))}
          </div>

          <div>
            <h2 className="type-h3">Opening hours</h2>
            <dl className="mt-3">
              {site.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-6 border-b border-border py-3">
                  <dt className="text-silt">{h.days}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="type-h3">Call or write</h2>
            <ul className="mt-3 space-y-1">
              <li>
                <a href={site.contact.phoneHref} className="inline-flex h-11 items-center gap-3 text-lg transition-opacity hover:opacity-70">
                  <Phone className="size-4 text-silt" aria-hidden="true" />
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="inline-flex h-11 items-center gap-3 text-lg break-all transition-opacity hover:opacity-70">
                  <Mail className="size-4 shrink-0 text-silt" aria-hidden="true" />
                  {site.contact.email}
                </a>
              </li>
            </ul>
            <p className="mt-4 text-sm text-silt">Message us on WhatsApp or Viber, same number.</p>
            <SocialLinks className="mt-3" />
          </div>
        </div>

        <div className="md:col-span-7">
          <LocationMap />
        </div>
      </section>

      <section id="inquiry" className="scroll-mt-24 bg-limewash py-24 md:py-32">
        <div className="page-gutter page-width grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <h2 className="type-h2">Order, ask for a quote, or book a delivery</h2>
            <p className="type-lede mt-5 text-silt">
              Tell us what you need, how much, and whether you&apos;ll collect it or want it delivered. We usually reply within one working day.
            </p>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Suspense fallback={<div className="h-[36rem]" aria-hidden="true" />}>
              <InquiryForm email={site.contact.email} groups={groups} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  )
}
