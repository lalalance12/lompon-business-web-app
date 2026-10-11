import { cn } from "@/lib/utils"

/** The opening block of an inner page: a large title and a short lede, left-aligned. */
export function PageIntro({
  title,
  lede,
  children,
  className,
}: {
  title: string
  lede?: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <header className={cn("page-gutter page-width pt-36 pb-14 md:pt-48 md:pb-20", className)}>
      <h1 className="type-h1 max-w-[18ch]">{title}</h1>
      {lede && <p className="type-lede mt-6 max-w-[56ch] text-silt">{lede}</p>}
      {children}
    </header>
  )
}
