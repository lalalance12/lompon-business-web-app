import type { Metadata } from "next"
import Link from "next/link"
import { Check, MapPin } from "lucide-react"
import { image, video } from "@/lib/media"
import { delivery } from "@/content/delivery"
import { site } from "@/content/site"
import { formatPeso, priceList } from "@/content/prices"
import { PageIntro } from "@/components/shared/page-intro"
import { SectionHeading } from "@/components/shared/section-heading"
import { MediaFrame } from "@/components/media/media-frame"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { FulfilmentSwitch } from "@/components/delivery/fulfilment-switch"
import { cta } from "@/lib/cta"

export const metadata: Metadata = {
  title: "Delivery",
  description: "Pick up at the yard with your own truck, or book our 20 m³ dump truck at ₱1,500 per km. Delivery is paid separately from the limestone.",
}

export default function DeliveryPage() {
  // Use the delivery video when one has been added, otherwise the photo slot.
  const film = video(delivery.video, delivery.videoPoster)
  const onSite = film.video ? film : image(delivery.photo)
  const { truck } = priceList

  return (
    <>
      <PageIntro title={delivery.title} lede={delivery.lede} />

      <section className="page-gutter page-width pb-24 md:pb-32">
        <FulfilmentSwitch options={delivery.options} pickupMedia={image("media/delivery/pickup")} />
      </section>

      {/* How a delivery happens — a real sequence */}
      <section className="on-slate bg-slate py-24 text-limewash md:py-32">
        <div className="page-gutter page-width">
          <SectionHeading title="How a delivery works" className="mb-14" />
          <RevealGroup as="ol" className="grid gap-px overflow-hidden rounded-sm bg-limewash/15 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {delivery.steps.map((step, i) => (
              <RevealItem key={step.title} className="bg-slate p-8 pt-10 lg:min-h-64">
                <p className="font-display text-5xl text-loader" aria-hidden="true">{i + 1}</p>
                <h3 className="mt-6 text-lg">{step.title}</h3>
                <p className="mt-2 max-w-[30ch] text-fossil">{step.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* The truck and its fee */}
      <section className="page-gutter page-width py-24 md:py-32">
        <SectionHeading
          title="Our dump truck"
          body="One truck, priced by distance. Not sure how much you need? Tell us the area and depth and we'll work it out."
          className="mb-12"
        />
        <RevealGroup className="grid gap-x-6 gap-y-10 border-t border-slate/30 pt-8 sm:grid-cols-3" stagger={0.07}>
          <RevealItem>
            <div className="flex h-24 items-end">
              <TruckSilhouette />
            </div>
            <h3 className="type-h3 mt-6">Holds up to {truck.cubicMetres} m³</h3>
            <p className="mt-2 text-silt">Bigger orders go in more than one trip.</p>
          </RevealItem>
          <RevealItem>
            <p className="flex h-24 items-end">
              <span className="type-figure text-5xl text-ochre">{formatPeso(truck.feePerKm)}</span>
            </p>
            <h3 className="type-h3 mt-6">Per km, per trip</h3>
            <p className="mt-2 text-silt">For every kilometre from the yard to your site. 10 km is {formatPeso(10 * truck.feePerKm)} a trip.</p>
          </RevealItem>
          <RevealItem>
            <p className="flex h-24 items-end font-display text-5xl text-ochre" aria-hidden="true">+</p>
            <h3 className="type-h3 mt-6">Paid separately</h3>
            <p className="mt-2 text-silt">{delivery.payNote}</p>
          </RevealItem>
        </RevealGroup>
      </section>

      {/* Site checklist + area */}
      <section className="bg-limewash py-24 md:py-32">
        <div className="page-gutter page-width grid gap-14 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-6">
            <h2 className="type-h2">Before the truck arrives</h2>
            <p className="type-lede mt-5 max-w-[46ch] text-silt">
              A loaded dump truck is heavy and needs room to tip. Check these and the driver can unload in minutes.
            </p>
            <ul className="mt-8 space-y-4">
              {delivery.siteChecklist.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-ochre" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="md:col-span-5 md:col-start-8" delay={0.08}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <MediaFrame
                media={onSite}
                alt="Our dump truck tipping a load of gravel on site"
                tone={{ base: "#a9a59b", vein: "#7d796f", grain: "#55524b" }}
                sizes="(min-width: 768px) 40vw, 100vw"
              />
            </div>
            <p className="mt-6 flex gap-3 text-lg">
              <MapPin className="mt-1.5 size-4 shrink-0 text-silt" aria-hidden="true" />
              <span>{delivery.area}</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="page-gutter page-width py-24 md:py-32">
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="type-h2 max-w-[18ch]">Book a delivery or ask for a quote</h2>
            <p className="type-lede mt-4 max-w-[48ch] text-silt">
              Tell us the material, the amount and the address. We reply with the limestone price and the delivery fee, each on its own, and the earliest day.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/visit?delivery=1#inquiry" className={cta({ tone: "primary", size: "md" })}>
              Request a delivery
            </Link>
            <a href={site.contact.phoneHref} className={cta({ tone: "outline", size: "md" })}>
              Call {site.contact.phone}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  )
}

function TruckSilhouette() {
  return (
    <svg viewBox="0 0 160 80" aria-hidden="true" className="h-auto w-44">
      <path d="M6 22 H 92 L 90 58 H 10 Z" fill="#f4b400" />
      <path d="M100 30 H 128 L 150 50 V 62 H 100 Z" fill="#f4b400" />
      <path d="M106 36 H 126 L 140 50 H 106 Z" fill="#1d2427" />
      <rect x="4" y="58" width="146" height="6" rx="1" fill="#1d2427" />
      {[28, 52, 128].map((cx) => (
        <circle key={cx} cx={cx} cy="68" r="9" fill="#1d2427" />
      ))}
    </svg>
  )
}
