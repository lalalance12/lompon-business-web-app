import Link from "next/link"
import { nav, site } from "@/content/site"
import { bulkMaterials } from "@/content/materials"
import { LogoMark } from "./logo"
import { cta } from "@/lib/cta"

export function SiteFooter() {
  return (
    <footer className="on-slate bg-slate text-limewash">
      <div className="page-gutter page-width pt-20 pb-10 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="type-h2 max-w-[14ch]">{site.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/visit"
                className={cta({ tone: "light", size: "md" })}
              >
                Plan a visit
              </Link>
              <a
                href={site.contact.phoneHref}
                className={cta({ tone: "outline-dark", size: "md" })}
              >
                {site.contact.phone}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="mb-4 text-sm text-fossil">The yard</h2>
              <address className="not-italic leading-relaxed">
                {site.contact.addressLines.map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </address>
              <dl className="mt-5 space-y-2 text-sm leading-snug">
                {site.hours.map((h) => (
                  <div key={h.days}>
                    <dt className="text-fossil">{h.days}</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h2 className="mb-4 text-sm text-fossil">What we sell</h2>
              <ul className="space-y-1">
                {[
                  ...bulkMaterials.map((m) => ({ label: m.name, href: `/materials#${m.slug}` })),
                  { label: "Cooked limestone (sacks)", href: "/materials#sacks" },
                  { label: "Dump-truck delivery", href: "/delivery" },
                  { label: "Price list", href: "/prices" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="inline-block py-1 transition-opacity duration-150 hover:opacity-70">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-sm text-fossil">Explore</h2>
              <ul className="space-y-1">
                {nav.filter((item) => !["/materials", "/prices", "/delivery"].includes(item.href)).map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="inline-block py-1 transition-opacity hover:opacity-70">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${site.contact.email}`} className="inline-block py-1 break-all transition-opacity hover:opacity-70">
                    {site.contact.email}
                  </a>
                </li>
              </ul>
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                {site.social.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer" className="inline-block py-1 text-fossil transition-colors hover:text-limewash">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-24 flex flex-col gap-6 border-t border-limewash/10 pt-8 md:flex-row md:items-end md:justify-between">
          <p className="flex items-center gap-3 font-display text-[clamp(2.5rem,9vw,7.5rem)] leading-[0.85] text-limewash/90">
            <LogoMark className="h-[0.7em]" />
            {site.shortName}
          </p>
          <p className="text-sm text-fossil">
            © {site.name}. Est. {site.established}.
          </p>
        </div>
      </div>
    </footer>
  )
}
