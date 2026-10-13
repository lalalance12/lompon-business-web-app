import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

/**
 * A form field: label on top, control below, anything extra (hints, errors,
 * quick picks) after. `content-start` keeps the label and control pinned to
 * the top of the cell, so fields in the same row line up even when a
 * neighbour is taller.
 */
export function Field({
  label,
  htmlFor,
  className,
  children,
}: {
  label: React.ReactNode
  htmlFor?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("grid content-start gap-2", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  )
}

/** Shared look for text inputs, selects and text areas on light surfaces. */
export const fieldControl =
  "h-12 w-full rounded-sm border-input px-4 text-base shadow-none focus-visible:border-ochre focus-visible:ring-loader/40 data-[size=default]:h-12"
export const fieldArea =
  "w-full rounded-sm border-input px-4 py-3 text-base shadow-none focus-visible:border-ochre focus-visible:ring-loader/40"
