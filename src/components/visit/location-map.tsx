"use client"

import { useState } from "react"
import { site } from "@/content/site"
import { Segmented } from "@/components/shared/segmented"

type Key = (typeof site.locations)[number]["key"]

const embedUrl = (lat: number, lng: number) => `https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s${lat},${lng}!6i16`

/**
 * Live Google map of the inquiry office or the quarry, switched with a pill.
 * Both maps stay mounted so switching back is instant.
 */
export function LocationMap() {
  const [active, setActive] = useState<Key>(site.locations[0].key)

  return (
    <div className="flex h-full flex-col gap-4">
      <Segmented
        label="Show on the map"
        id="location-map"
        value={active}
        options={site.locations.map((l) => ({ value: l.key, label: l.label }))}
        onChange={setActive}
      />
      <div className="relative min-h-[24rem] flex-1 overflow-hidden rounded-sm bg-bedding md:min-h-[32rem]">
        {site.locations.map((l) => (
          <iframe
            key={l.key}
            src={embedUrl(l.lat, l.lng)}
            title={`Map showing ${l.title.toLowerCase()}: ${l.addressLines.join(", ")}`}
            className="absolute inset-0 size-full border-0 grayscale-[0.4] transition-opacity duration-200"
            style={{ opacity: active === l.key ? 1 : 0, pointerEvents: active === l.key ? "auto" : "none" }}
            aria-hidden={active !== l.key}
            tabIndex={active === l.key ? 0 : -1}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ))}
      </div>
    </div>
  )
}
