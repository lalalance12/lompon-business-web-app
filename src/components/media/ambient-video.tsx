"use client"

import { useEffect, useRef, useState } from "react"
import { Pause, Play } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Muted, looping background video. Plays only while on screen, never
 * autoplays for people who prefer reduced motion, and always offers a
 * pause control (WCAG 2.2.2).
 */
export function AmbientVideo({
  src,
  poster,
  label,
  className,
}: {
  src: string
  poster?: string
  label: string
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [userPaused, setUserPaused] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.15 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [userPaused])

  const toggle = () => {
    const video = ref.current
    if (!video) return
    if (video.paused) {
      setUserPaused(false)
      video.play().catch(() => {})
    } else {
      setUserPaused(true)
      video.pause()
    }
  }

  return (
    <>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className={cn("absolute inset-0 size-full object-cover", className)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute right-3 bottom-3 z-10 grid size-11 place-items-center rounded-full bg-slate/55 text-limewash backdrop-blur-sm transition-colors hover:bg-slate/80"
      >
        {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
      </button>
    </>
  )
}
