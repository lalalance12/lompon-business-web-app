import Link from "next/link"
import { cn } from "@/lib/utils"

export function SectionHeading({
  title,
  body,
  link,
  className,
  id,
  as: Tag = "h2",
}: {
  id?: string
  title: string
  body?: string
  link?: { href: string; label: string }
  className?: string
  as?: "h1" | "h2"
}) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12", className)}>
      <div className="max-w-3xl">
        <Tag id={id} className={Tag === "h1" ? "type-h1" : "type-h2"}>{title}</Tag>
        {body && <p className="type-lede mt-5 max-w-[52ch] text-silt [.on-bluestone_&]:text-fossil">{body}</p>}
      </div>
      {link && <TextLink href={link.href}>{link.label}</TextLink>}
    </div>
  )
}

/** An underlined text link whose rule redraws on hover. */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex h-11 shrink-0 items-center text-[0.9375rem] whitespace-nowrap",
        className
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute inset-x-0 -bottom-0.5 h-px bg-current group-hover:animate-[redraw_0.4s_var(--ease-snap)]" />
      </span>
    </Link>
  )
}
