import { cn } from "@/lib/utils"
import { site } from "@/content/site"

/**
 * PLACEHOLDER mark: three bedding planes of stone, offset like strata.
 * Replace with the client's logo (SVG recommended) when available.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 22" aria-hidden="true" className={cn("h-[1.1em] w-auto", className)}>
      <rect x="0" y="0" width="22" height="5" rx="0.5" fill="currentColor" />
      <rect x="6" y="8.5" width="22" height="5" rx="0.5" fill="currentColor" opacity="0.7" />
      <rect x="2" y="17" width="20" height="5" rx="0.5" fill="currentColor" opacity="0.45" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 font-display text-[1.375rem] leading-none", className)}>
      <LogoMark />
      <span>{site.shortName}</span>
    </span>
  )
}
