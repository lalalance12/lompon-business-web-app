import Link from "next/link"
import { TriangleAlert } from "lucide-react"
import { image } from "@/lib/media"
import { materialMedia, type Material } from "@/content/materials"
import { MediaFrame } from "@/components/media/media-frame"
import { RevealItem } from "@/components/motion/reveal"
import { SizeScale } from "./size-scale"

const askHref = (m: Material) => `/visit?product=${m.slug}#inquiry`

function Price({ material }: { material: Material }) {
  return <p className="text-[0.9375rem]">{material.price ?? "Ask for today's price"}</p>
}

function Uses({ uses }: { uses: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5">
      {uses.map((u) => (
        <li key={u} className="rounded-full border border-border px-3 py-1 text-sm text-silt">
          {u}
        </li>
      ))}
    </ul>
  )
}

/** One aggregate as a row of the price list: photo, description, size and how it's sold. */
export function TonRow({ material }: { material: Material }) {
  return (
    <RevealItem
      id={material.slug}
      className="grid scroll-mt-28 gap-6 border-t border-border py-10 md:grid-cols-12 md:gap-8"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm md:col-span-3">
        <MediaFrame
          media={image(materialMedia(material.slug))}
          alt={`${material.name}, ${material.size}`}
          tone={material.tone}
          sizes="(min-width: 768px) 25vw, 100vw"
        />
      </div>

      <div className="md:col-span-5">
        <h3 className="type-h3">{material.name}</h3>
        {material.alsoCalled && <p className="mt-1 text-sm text-silt">Also called {material.alsoCalled.toLowerCase()}</p>}
        <p className="mt-3 max-w-[48ch]">{material.summary}</p>
        <Uses uses={material.uses} />
      </div>

      <div className="flex flex-col gap-4 md:col-span-4">
        <div>
          <p className="flex items-baseline justify-between gap-4">
            <span className="text-sm text-silt">Piece size</span>
            <span className="font-display text-xl">{material.size}</span>
          </p>
          {material.sizeMm && <SizeScale range={material.sizeMm} className="mt-2" />}
        </div>
        <div className="space-y-1 text-sm text-silt">
          <p>{material.sold}</p>
        </div>
        <Price material={material} />
        <Link
          href={askHref(material)}
          className="press mt-auto inline-flex h-11 w-fit items-center rounded-full border border-bluestone/25 px-5 text-[0.9375rem] hover:border-bluestone hover:bg-bluestone hover:text-honed"
        >
          Ask about {material.name.toLowerCase()}
        </Link>
      </div>
    </RevealItem>
  )
}

/** One sacked product, given more room: a tall photo beside the details. */
export function SackPanel({ material }: { material: Material }) {
  return (
    <RevealItem id={material.slug} className="grid scroll-mt-28 gap-6 md:grid-cols-12 md:gap-10">
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm md:col-span-6">
        <MediaFrame
          media={image(materialMedia(material.slug))}
          alt={`${material.name} in a ${material.size}`}
          tone={material.tone}
          sizes="(min-width: 768px) 50vw, 100vw"
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-bluestone px-3 py-1.5 text-sm text-honed">
          {material.size}
        </span>
      </div>
      <div className="flex flex-col md:col-span-5 md:col-start-8">
        <h3 className="type-h2">{material.name}</h3>
        {material.alsoCalled && <p className="mt-2 text-silt">Also called {material.alsoCalled.toLowerCase()}</p>}
        <p className="mt-4">{material.summary}</p>
        <Uses uses={material.uses} />
        {material.note && (
          <p className="mt-6 flex gap-3 rounded-sm bg-bedding p-4 text-sm">
            <TriangleAlert className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
            <span>{material.note}</span>
          </p>
        )}
        <div className="mt-6 space-y-1 text-sm text-silt">
          <p>{material.sold}</p>
        </div>
        <div className="mt-2">
          <Price material={material} />
        </div>
        <Link
          href={askHref(material)}
          className="press mt-6 inline-flex h-12 w-fit items-center rounded-full bg-bluestone px-6 text-honed hover:bg-lichen"
        >
          Order {material.name.toLowerCase()}
        </Link>
      </div>
    </RevealItem>
  )
}
