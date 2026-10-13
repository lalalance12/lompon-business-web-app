import { cva, type VariantProps } from "class-variance-authority"

/**
 * The site's one pill-button style, for links and buttons alike.
 * Pick the tone by the surface it sits on:
 *   on light (chalk / limewash): primary, accent, outline, chip, ghost
 *   on dark (slate):             light, accent, outline-dark, ghost-dark
 */
export const cta = cva(
  "press inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-full whitespace-nowrap",
  {
    variants: {
      tone: {
        primary: "bg-slate text-limewash hover:bg-loader hover:text-slate",
        accent: "bg-loader text-slate hover:bg-[#ffc935]",
        light: "bg-limewash text-slate hover:bg-loader",
        outline: "border border-slate/25 hover:border-slate hover:bg-slate hover:text-limewash",
        "outline-dark": "border border-limewash/40 hover:border-limewash hover:bg-limewash/10",
        chip: "bg-limewash ring-1 ring-border hover:bg-loader hover:ring-loader",
        ghost: "text-sm text-silt ring-1 ring-border hover:text-slate",
        "ghost-dark": "text-sm text-fossil ring-1 ring-limewash/20 hover:text-limewash",
      },
      size: {
        sm: "h-11 px-5 text-[0.9375rem]",
        md: "h-12 px-7",
        /** small on phones, regular from lg up */
        responsive: "h-11 px-5 text-[0.9375rem] lg:h-12 lg:px-7 lg:text-base",
      },
    },
    defaultVariants: { tone: "primary", size: "md" },
  }
)

export type CtaProps = VariantProps<typeof cta>
