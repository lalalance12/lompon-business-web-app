"use client"

import { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import type { Media } from "@/lib/media"
import type { Tone } from "@/lib/texture"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { MediaFrame } from "./media-frame"

export type LightboxItem = { media: Media; alt: string; tone?: Tone }

/**
 * A full-screen viewer for a set of images. Arrow keys and the on-screen
 * controls move between items; Escape closes.
 */
export function Lightbox({
  items,
  index,
  onIndexChange,
  title,
}: {
  items: LightboxItem[]
  index: number | null
  onIndexChange: (index: number | null) => void
  title: string
}) {
  const [direction, setDirection] = useState(1)
  const open = index !== null
  const count = items.length

  const step = useCallback(
    (delta: number) => {
      if (index === null) return
      setDirection(delta)
      onIndexChange((index + delta + count) % count)
    },
    [index, count, onIndexChange]
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1)
      if (e.key === "ArrowLeft") step(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, step])

  const item = index !== null ? items[index] : null

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onIndexChange(null)}>
      <DialogContent
        showCloseButton={false}
        className="on-bluestone flex h-[100svh] w-screen max-w-none flex-col gap-0 rounded-none border-0 bg-bluestone p-0 text-honed ring-0 sm:max-w-none"
      >
        <div className="page-gutter flex h-16 shrink-0 items-center justify-between gap-4">
          <DialogTitle className="truncate font-sans text-base font-normal">{title}</DialogTitle>
          <DialogDescription className="sr-only">
            Image {index !== null ? index + 1 : 0} of {count}. Use the arrow keys to move between images.
          </DialogDescription>
          <div className="flex items-center gap-4">
            <span className="text-sm text-fossil tabular-nums" aria-hidden="true">
              {index !== null ? index + 1 : 0} / {count}
            </span>
            <DialogClose className="grid size-11 place-items-center rounded-full transition-colors hover:bg-honed/10">
              <X className="size-5" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
        </div>

        <div className="relative min-h-0 flex-1">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            {item && (
              <motion.div
                key={index}
                custom={direction}
                className="absolute inset-0 px-4 pb-4 md:px-20"
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.24, ease: [0.2, 0.9, 0.1, 1] }}
              >
                <div className="relative size-full overflow-hidden rounded-sm">
                  <MediaFrame
                    media={item.media}
                    alt={item.alt}
                    tone={item.tone}
                    sizes="100vw"
                    imageClassName="object-contain"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="absolute top-1/2 left-2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-bluestone/60 backdrop-blur-sm transition-colors hover:bg-honed hover:text-bluestone md:left-5"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="absolute top-1/2 right-2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-bluestone/60 backdrop-blur-sm transition-colors hover:bg-honed hover:text-bluestone md:right-5"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
