import type { MetadataRoute } from "next"
import { site } from "@/content/site"
import { stones } from "@/content/stones"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/stones", "/projects", "/about", "/visit"]
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...stones.map((s) => ({ url: `${site.url}/stones/${s.slug}` })),
  ]
}
