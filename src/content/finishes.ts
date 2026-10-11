import type { Finish } from "./stones"

/** Plain-language descriptions shown beside each finish swatch. PLACEHOLDER copy. */
export const finishDescriptions: Record<Finish, string> = {
  Honed: "Ground smooth to a soft, matte face. Shows the stone's colour most clearly.",
  Brushed: "Wire-brushed to a gentle texture that softens edges and adds grip.",
  Tumbled: "Rolled with grit for rounded edges and an aged, worn-in look.",
  Sandblasted: "Blasted to an even, slightly rough face. Good grip for wet areas.",
  "Bush-hammered": "Struck with a toothed hammer for a pitted, light-catching surface.",
  "Split face": "Split by hand along the bed for a raw, rugged face.",
}
