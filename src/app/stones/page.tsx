import type { Metadata } from "next"
import { image } from "@/lib/media"
import { allApplications, stoneMedia, stones, toneGroups } from "@/content/stones"
import { PageIntro } from "@/components/shared/page-intro"
import { StoneCatalog } from "@/components/stones/stone-catalog"

export const metadata: Metadata = {
  title: "Stones",
  description: "Every limestone we stock, with finishes, formats and technical data.",
}

export default function StonesPage() {
  const catalog = stones.map((s) => ({
    slug: s.slug,
    name: s.name,
    family: s.family,
    origin: s.origin,
    tone: s.tone,
    toneGroup: s.toneGroup,
    applications: s.applications,
    finishes: s.finishes,
    cover: image(stoneMedia.cover(s.slug)),
  }))

  return (
    <>
      <PageIntro
        title={`${stones.length} limestones, all in the yard`}
        lede="Each stone below is stocked as slabs and cut tiles. Filter by colour or by where it will go, then open a stone for finishes, sizes and technical data."
      />
      <section className="page-gutter page-width pb-24 md:pb-36">
        <StoneCatalog stones={catalog} toneGroups={toneGroups} applications={allApplications} />
      </section>
    </>
  )
}
