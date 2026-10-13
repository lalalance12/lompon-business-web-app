import type { Metadata } from "next"
import Link from "next/link"
import { Check, MapPin } from "lucide-react"
import { image, video } from "@/lib/media"
import { delivery } from "@/content/delivery"
import { site } from "@/content/site"
import { PageIntro } from "@/components/shared/page-intro"
import { SectionHeading } from "@/components/shared/section-heading"
import { MediaFrame } from "@/components/media/media-frame"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { FulfilmentSwitch } from "@/components/delivery/fulfilment-switch"

export const metadata: Metadata = {
  title: "Delivery",
  description: "Pick up at the yard with your own truck, or book our dump trucks to deliver limestone to your site.",
}

// Truck silhouettes scale with capacity, so the sizes read at a glance.
const truckScale = [0.62, 0.8, 1]

export default function DeliveryPage() {
  // Use the delivery video when one has been added, otherwise the photo slot.
  const film = video(delivery.video, delivery.videoPoster)
  const onSite = film.video ? film : image(delivery.photo)

  return (
    <>
      <PageIntro title={delivery.title} lede={delivery.lede} />

      <section className="page-gutter page-width pb-24 md:pb-32">
        <FulfilmentSwitch options={delivery.options} pickupMedia={image("media/delivery/pickup")} />
      </section>

      {/* How a delivery happens — a real sequence */}
      <section className="on-bluestone bg-bluestone py-24 text-honed md:py-32">
        <div className="page-gutter page-width">
          <SectionHeading title="How a delivery works" className="mb-14" />
          <RevealGroup as="ol" className="grid gap-px overflow-hidden rounded-sm bg-honed/15 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {delivery.steps.map((step, i) => (
              <RevealItem key={step.title} className="bg-bluestone p-8 pt-10 lg:min-h-64">
                <p className="font-display text-5xl text-lichen-light" aria-hidden="true">{i + 1}</p>
                <h3 className="mt-6 text-lg">{step.title}</h3>
                <p className="mt-2 max-w-[30ch] text-fossil">{step.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Trucks */}
      <section className="page-gutter page-width py-24 md:py-32">
        <SectionHeading
          title="Our trucks"
          body="We send the right size for the load and the road. Not sure how much you need? Tell us the area and depth and we'll work it out."
          className="mb-12"
        />
        <RevealGroup className="grid gap-x-6 gap-y-12 sm:grid-cols-3" stagger={0.07}>
          {delivery.trucks.map((truck, i) => (
            <RevealItem key={truck.name} className="border-t border-bluestone/30 pt-6">
              <div className="flex h-24 items-end">
                <TruckSilhouette scale={truckScale[i] ?? 1} />
              </div>
              <h3 className="type-h3 mt-6">{truck.name}</h3>
              <p className="mt-1 text-lg">{truck.capacity}</p>
              <p className="mt-2 text-silt">{truck.bestFor}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Site checklist + area */}
      <section className="bg-honed py-24 md:py-32">
        <div className="page-gutter page-width grid gap-14 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-6">
            <h2 className="type-h2">Before the truck arrives</h2>
            <p className="type-lede mt-5 max-w-[46ch] text-silt">
              A loaded dump truck is heavy and needs room to tip. Check these and the driver can unload in minutes.
            </p>
            <ul className="mt-8 space-y-4">
              {delivery.siteChecklist.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-lichen" aria-hidden="true" />
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
              Tell us the material, the amount and the address. We reply with the price, delivery fee and the earliest day.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/visit?delivery=1#inquiry" className="press inline-flex h-12 items-center rounded-full bg-bluestone px-7 text-honed hover:bg-lichen">
              Request a delivery
            </Link>
            <a href={site.contact.phoneHref} className="press inline-flex h-12 items-center rounded-full border border-bluestone/25 px-7 hover:bg-bluestone hover:text-honed">
              Call {site.contact.phone}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  )
}

function TruckSilhouette({ scale }: { scale: number }) {
  return (
    <svg viewBox="0 0 160 80" aria-hidden="true" className="h-auto origin-bottom-left" style={{ width: `${scale * 11}rem` }}>
      <path d="M6 22 H 92 L 90 58 H 10 Z" fill="#56624a" />
      <path d="M100 30 H 128 L 150 50 V 62 H 100 Z" fill="#23292c" />
      <path d="M106 36 H 126 L 140 50 H 106 Z" fill="#a9b496" />
      <rect x="4" y="58" width="146" height="6" rx="1" fill="#23292c" />
      {[28, 52, 128].map((cx) => (
        <circle key={cx} cx={cx} cy="68" r="9" fill="#23292c" />
      ))}
    </svg>
  )
}
