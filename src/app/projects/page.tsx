import type { Metadata } from "next"
import { image } from "@/lib/media"
import { materials } from "@/content/materials"
import { projectMedia, projects } from "@/content/projects"
import { PageIntro } from "@/components/shared/page-intro"
import { ProjectEntry } from "@/components/projects/project-entry"

export const metadata: Metadata = {
  title: "Projects",
  description: "Roads, sea walls, lot filling, farms and buildings supplied from our yard.",
}

export default function ProjectsPage() {
  const entries = projects.map((p) => {
    const material = materials.find((m) => m.slug === p.materialSlug)
    return {
      slug: p.slug,
      title: p.title,
      location: p.location,
      year: p.year,
      quantity: p.quantity,
      method: p.method,
      summary: p.summary,
      material: material ? { slug: material.slug, name: material.name } : null,
      images: Array.from({ length: p.imageCount }, (_, i) => ({
        media: image(projectMedia(p.slug, i + 1)),
        alt: `${p.title}, photo ${i + 1}`,
        tone: material?.tone,
      })),
    }
  })

  return (
    <>
      <PageIntro
        title="Jobs we've supplied"
        lede="Roads, sea walls, filled lots, farms and buildings, all built on stone and lime from our yard. Select any photo to see it larger."
      />
      <div className="page-gutter page-width space-y-24 pb-24 md:space-y-36 md:pb-36">
        {entries.map((p, i) => (
          <ProjectEntry key={p.slug} project={p} flip={i % 2 === 1} />
        ))}
      </div>
    </>
  )
}
