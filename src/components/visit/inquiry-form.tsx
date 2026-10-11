"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Errors = Partial<Record<"name" | "contact" | "message", string>>

const fieldClass =
  "h-12 rounded-sm border-input bg-honed px-4 text-base shadow-none focus-visible:border-lichen focus-visible:ring-lichen/25"

/**
 * The site has no backend, so the form composes an email in the visitor's
 * own mail app, addressed to the yard and ready to send.
 */
export function InquiryForm({
  email,
  stones,
}: {
  email: string
  stones: { slug: string; name: string }[]
}) {
  const params = useSearchParams()
  const initialStone = stones.some((s) => s.slug === params.get("stone")) ? params.get("stone")! : "undecided"
  const [stone, setStone] = useState(initialStone)
  const [errors, setErrors] = useState<Errors>({})
  const [composed, setComposed] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get("name") ?? "").trim()
    const phone = String(data.get("phone") ?? "").trim()
    const from = String(data.get("email") ?? "").trim()
    const project = String(data.get("project") ?? "").trim()
    const message = String(data.get("message") ?? "").trim()

    const next: Errors = {}
    if (!name) next.name = "Enter your name so we know who to reply to."
    if (!phone && !from) next.contact = "Add a phone number or an email address."
    if (!message) next.message = "Tell us a little about your project."
    setErrors(next)
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0]
      document.getElementById(first === "contact" ? "phone" : first)?.focus()
      return
    }

    const stoneName = stones.find((s) => s.slug === stone)?.name ?? "Not decided yet"
    const subject = `Stone inquiry: ${stoneName}`
    const details = [
      `Name: ${name}`,
      phone ? `Phone: ${phone}` : null,
      from ? `Email: ${from}` : null,
      `Stone: ${stoneName}`,
      project ? `Project: ${project}` : null,
    ].filter(Boolean)
    const body = `${details.join("\n")}\n\n${message}`

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setComposed(true)
  }

  return (
    // The mailto action is the no-JavaScript fallback: it still opens an email
    // and never puts what people typed into the page URL.
    <form
      action={`mailto:${email}`}
      method="post"
      encType="text/plain"
      onSubmit={handleSubmit}
      noValidate
      className="grid gap-6 sm:grid-cols-2"
    >
      <div className="grid gap-2 sm:col-span-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" autoComplete="name" className={fieldClass} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
        {errors.name && <p id="name-error" className="text-sm text-destructive">{errors.name}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} aria-invalid={!!errors.contact} aria-describedby="contact-help" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" className={fieldClass} aria-invalid={!!errors.contact} aria-describedby="contact-help" />
      </div>
      <p id="contact-help" className={errors.contact ? "-mt-3 text-sm text-destructive sm:col-span-2" : "-mt-3 text-sm text-silt sm:col-span-2"}>
        {errors.contact ?? "Give us at least one way to reach you."}
      </p>

      <div className="grid gap-2">
        <Label htmlFor="stone">Stone</Label>
        <Select value={stone} onValueChange={setStone}>
          <SelectTrigger id="stone" className={`${fieldClass} w-full data-[size=default]:h-12`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="undecided">Not decided yet</SelectItem>
            {stones.map((s) => (
              <SelectItem key={s.slug} value={s.slug}>{s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="project">Project</Label>
        <Input id="project" name="project" placeholder="e.g. pool deck, 60 m²" className={fieldClass} />
      </div>

      <div className="grid gap-2 sm:col-span-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          className="min-h-36 rounded-sm border-input bg-honed px-4 py-3 text-base shadow-none focus-visible:border-lichen focus-visible:ring-lichen/25"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && <p id="message-error" className="text-sm text-destructive">{errors.message}</p>}
      </div>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:gap-6">
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center rounded-full bg-bluestone px-8 text-honed transition-colors hover:bg-lichen"
        >
          Write the email
        </button>
        <p className="text-sm text-silt" aria-live="polite">
          {composed
            ? `Your email app should now be open with the message ready. If it isn't, write to ${email}.`
            : "Opens your email app with the message filled in, ready to send."}
        </p>
      </div>
    </form>
  )
}
