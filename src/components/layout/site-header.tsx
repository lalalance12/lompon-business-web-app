"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { nav, site } from "@/content/site"
import { easeSnap, snapSpring } from "@/lib/motion"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "./logo"

/** Pages that open with full-bleed media; the header sits transparently over it. */
const OVER_MEDIA_PATHS = ["/", "/about"]

export function SiteHeader() {
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const [nearTop, setNearTop] = useState(true)
  const [hidden, setHidden] = useState(false)

  // On pages that open with media, the header sits over it until you scroll past.
  // Everywhere, it tucks away while scrolling down and returns when scrolling up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setNearTop(y < window.innerHeight * 0.75)
    setHidden(y > 240 && y > prev + 2)
    if (y < prev - 2) setHidden(false)
  })

  const isOverMedia = OVER_MEDIA_PATHS.includes(pathname) && nearTop

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.22, ease: easeSnap }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color] duration-300",
        isOverMedia
          ? "border-b border-transparent text-honed"
          : "border-b border-border/70 bg-chalk/85 text-bluestone backdrop-blur-md"
      )}
    >
      <div className="page-gutter page-width flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" aria-label={`${site.name}, home`} className="rounded-sm">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="relative inline-flex h-11 items-center px-3.5 text-[0.9375rem] transition-opacity duration-150 hover:opacity-70"
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3.5 bottom-2 h-px bg-current"
                        transition={snapSpring}
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.contact.phoneHref}
            className={cn(
              "press hidden h-11 items-center gap-2 rounded-full border px-5 text-[0.9375rem] xl:inline-flex",
              isOverMedia
                ? "border-honed/40 hover:bg-honed hover:text-bluestone"
                : "border-bluestone/25 hover:bg-bluestone hover:text-honed"
            )}
          >
            <Phone className="size-4" aria-hidden="true" />
            Call the yard
          </a>

          <Sheet>
            <SheetTrigger
              className="press grid size-11 place-items-center rounded-full lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm border-l-0 bg-bluestone text-honed on-bluestone">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-full flex-col justify-between px-8 pt-20 pb-10">
                <nav aria-label="Mobile">
                  {/* Items snap in one after another as the sheet opens */}
                  <ul className="space-y-1">
                    {[{ label: "Home", href: "/" }, ...nav].map((item, i) => (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.28, ease: easeSnap, delay: 0.06 + i * 0.035 }}
                      >
                        <SheetClose asChild>
                          <Link
                            href={item.href}
                            aria-current={
                              item.href === "/" ? (pathname === "/" ? "page" : undefined) : pathname.startsWith(item.href) ? "page" : undefined
                            }
                            className="type-h2 block py-1 aria-[current=page]:text-lichen-light"
                          >
                            {item.label}
                          </Link>
                        </SheetClose>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
                <div className="space-y-1 text-fossil">
                  <a href={site.contact.phoneHref} className="block py-2 text-lg text-honed">
                    {site.contact.phone}
                  </a>
                  <a href={`mailto:${site.contact.email}`} className="block py-2 text-honed/80">
                    {site.contact.email}
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
