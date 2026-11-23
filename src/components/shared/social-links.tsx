import { siFacebook, siViber, siWhatsapp, type SimpleIcon } from "simple-icons"
import { cn } from "@/lib/utils"
import { site } from "@/content/site"

const icons: Record<(typeof site.channels)[number]["key"], SimpleIcon> = {
  facebook: siFacebook,
  whatsapp: siWhatsapp,
  viber: siViber,
}

/**
 * Round icon buttons for Facebook, WhatsApp and Viber. A channel with no
 * link yet (Facebook, for now) shows its icon without being clickable.
 */
export function SocialLinks({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const base = cn(
    "grid size-11 place-items-center rounded-full ring-1 transition-colors",
    tone === "dark" ? "text-limewash ring-limewash/20" : "text-slate ring-border"
  )
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {site.channels.map((c) => {
        const icon = (
          <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
            <path d={icons[c.key].path} />
          </svg>
        )
        return (
          <li key={c.key}>
            {c.href ? (
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${c.label}: ${c.hint}`}
                title={`${c.label}: ${c.hint}`}
                className={cn(base, tone === "dark" ? "hover:bg-limewash hover:text-slate" : "hover:bg-slate hover:text-limewash")}
              >
                {icon}
              </a>
            ) : (
              <span role="img" aria-label={`${c.label}: ${c.hint}`} title={`${c.label}: ${c.hint}`} className={cn(base, "opacity-50")}>
                {icon}
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
