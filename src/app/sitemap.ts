import type { MetadataRoute } from "next"
import { site } from "@/content/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/materials", "/prices", "/delivery", "/projects", "/about", "/visit"]
  return pages.map((p) => ({ url: `${site.url}${p}` }))
}
