/**
 * Shared motion tokens. The site's motion is snappy: short, decisive moves
 * that land quickly and never drift. Mirrors --ease-snap in globals.css.
 */
export const easeSnap = [0.2, 0.9, 0.1, 1] as const
export const easeCut = [0.7, 0, 0.2, 1] as const

/** For reveals, toggles and content swaps. */
export const quick = { duration: 0.32, ease: easeSnap }
/** For things that move a distance: a tight spring with no wobble. */
export const snapSpring = { type: "spring", stiffness: 560, damping: 42, mass: 0.7 } as const
