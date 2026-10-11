import type { Metadata } from "next"
import { image } from "@/lib/media"
import { getStone } from "@/content/stones"
import { projectMedia, projects } from "@/content/projects"
import { PageIntro } from "@/components/shared/page-intro"
import { ProjectEntry } from "@/components/projects/project-entry"

export const metadata: Metadata = {
  title: "Projects",
  description: "Homes, hotels and public spaces finished in our limestone.",
}

export default function ProjectsPage() {
  const entries = projects.map((p) => {
    const stone = getStone(p.stoneSlug)
    return {
      slug: p.slug,
      title: p.title,
      location: p.location,
      year: p.year,
      application: p.application,
      summary: p.summary,
      stone: stone ? { slug: stone.slug, name: stone.name } : null,
      images: Array.from({ length: p.imageCount }, (_, i) => ({
        media: image(projectMedia(p.slug, i + 1)),
        alt: `${p.title}, photo ${i + 1}`,
        tone: stone?.tone,
      })),
    }
  })

  return (
    <>
      <PageIntro
        title="Stone in place"
        lede="A selection of finished work. Select any photo to see it larger, or open the stone to see how it was cut and finished."
      />
      <div className="page-gutter page-width space-y-24 pb-24 md:space-y-36 md:pb-36">
        {entries.map((p, i) => (
          <ProjectEntry key={p.slug} project={p} flip={i % 2 === 1} />
        ))}
      </div>
    </>
  )
}
