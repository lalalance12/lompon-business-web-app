"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"
import { quick, snapSpring } from "@/lib/motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type ProductOption = { value: string; name: string; unit: string }
export type ProductGroup = { label: string; options: ProductOption[] }

type Errors = Partial<Record<"name" | "contact" | "address", string>>
type Method = "pickup" | "delivery"

const UNDECIDED = "undecided"

const fieldClass =
  "h-12 rounded-sm border-input bg-limewash px-4 text-base shadow-none focus-visible:border-ochre focus-visible:ring-loader/40"
const areaClass =
  "rounded-sm border-input bg-limewash px-4 py-3 text-base shadow-none focus-visible:border-ochre focus-visible:ring-loader/40"

const methods: { value: Method; label: string }[] = [
  { value: "pickup", label: "Pick up at the yard" },
  { value: "delivery", label: "Deliver by dump truck" },
]

/**
 * The site has no backend, so the form composes an email in the visitor's
 * own mail app, addressed to the yard and ready to send.
 *
 * Prefill from links: ?product=<slug>, ?delivery=1
 */
export function InquiryForm({ email, groups }: { email: string; groups: ProductGroup[] }) {
  const params = useSearchParams()
  const all = groups.flatMap((g) => g.options)
  const wanted = params.get("product")
  const initial = all.find((o) => o.value.endsWith(`:${wanted}`))?.value ?? UNDECIDED

  const [product, setProduct] = useState(initial)
  const [method, setMethod] = useState<Method>(params.get("delivery") === "1" ? "delivery" : "pickup")
  const [errors, setErrors] = useState<Errors>({})
  const [composed, setComposed] = useState(false)

  const chosen = all.find((o) => o.value === product)
  const unit = chosen?.unit ?? "amount"

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const get = (k: string) => String(data.get(k) ?? "").trim()
    const name = get("name")
    const phone = get("phone")
    const from = get("email")
    const quantity = get("quantity")
    const address = get("address")
    const date = get("date")
    const message = get("message")

    const next: Errors = {}
    if (!name) next.name = "Enter your name so we know who to reply to."
    if (!phone && !from) next.contact = "Add a phone number or an email address."
    if (method === "delivery" && !address) next.address = "Add the delivery address so we can price the trip."
    setErrors(next)
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0]
      document.getElementById(first === "contact" ? "phone" : first)?.focus()
      return
    }

    const productName = chosen?.name ?? "Not decided yet"
    const how = method === "delivery" ? "Dump-truck delivery" : "Pick up at the yard"
    const subject = `Inquiry: ${productName} (${how.toLowerCase()})`
    const details = [
      `Name: ${name}`,
      phone ? `Phone: ${phone}` : null,
      from ? `Email: ${from}` : null,
      `Product: ${productName}`,
      quantity ? `Quantity: ${quantity} ${chosen ? unit : ""}`.trim() : null,
      `Getting it: ${how}`,
      method === "delivery" ? `Deliver to: ${address}` : null,
      method === "delivery" && date ? `Preferred date: ${date}` : null,
    ].filter(Boolean)
    const body = message ? `${details.join("\n")}\n\n${message}` : details.join("\n")

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
        <FieldError id="name-error" message={errors.name} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} aria-invalid={!!errors.contact} aria-describedby="contact-help" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" className={fieldClass} aria-invalid={!!errors.contact} aria-describedby="contact-help" />
      </div>
      <p id="contact-help" className={cn("-mt-3 text-sm sm:col-span-2", errors.contact ? "text-destructive" : "text-silt")}>
        {errors.contact ?? "Give us at least one way to reach you."}
      </p>

      <div className="grid gap-2">
        <Label htmlFor="product">What you need</Label>
        <Select value={product} onValueChange={setProduct}>
          <SelectTrigger id="product" className={`${fieldClass} w-full data-[size=default]:h-12`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={UNDECIDED}>Not decided yet</SelectItem>
            {groups.map((g) => (
              <SelectGroup key={g.label}>
                <SelectSeparator />
                <SelectLabel>{g.label}</SelectLabel>
                {g.options.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.name}</SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="quantity">How much</Label>
        <div className="relative">
          <Input
            id="quantity"
            name="quantity"
            inputMode="decimal"
            placeholder={chosen ? "e.g. 10" : "e.g. 10 tons or 20 sacks"}
            className={cn(fieldClass, chosen && "pr-20")}
          />
          <AnimatePresence initial={false}>
            {chosen && (
              <motion.span
                key={unit}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={quick}
                className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-silt"
              >
                {unit}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <fieldset className="grid gap-3 sm:col-span-2">
        <legend className="mb-3 text-sm font-medium">How you&apos;ll get it</legend>
        <div role="radiogroup" aria-label="How you'll get it" className="inline-flex w-fit flex-wrap rounded-full bg-bedding p-1">
          {methods.map((m) => (
            <button
              key={m.value}
              type="button"
              role="radio"
              aria-checked={method === m.value}
              onClick={() => setMethod(m.value)}
              className={cn(
                "press relative h-11 rounded-full px-5 text-[0.9375rem]",
                method === m.value ? "text-limewash" : "text-silt hover:text-slate"
              )}
            >
              {method === m.value && (
                <motion.span layoutId="method-pill" className="absolute inset-0 rounded-full bg-slate" transition={snapSpring} />
              )}
              <span className="relative">{m.label}</span>
            </button>
          ))}
        </div>
        <p className="text-sm text-silt">
          {method === "delivery"
            ? "Delivery is a separate service. We'll quote the fee by distance and truck size."
            : "Bring your own truck or car during opening hours; we load it for you."}
        </p>
      </fieldset>

      <AnimatePresence initial={false}>
        {method === "delivery" && (
          <motion.div
            key="delivery-fields"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={quick}
            className="overflow-hidden sm:col-span-2"
          >
            <div className="grid gap-6 pt-1 pb-1 sm:grid-cols-[2fr_1fr]">
              <div className="grid gap-2">
                <Label htmlFor="address">Delivery address</Label>
                <Textarea
                  id="address"
                  name="address"
                  rows={3}
                  autoComplete="street-address"
                  placeholder="Street, barangay, town, and a landmark"
                  className={cn(areaClass, "min-h-24")}
                  aria-invalid={!!errors.address}
                  aria-describedby={errors.address ? "address-error" : undefined}
                />
                <FieldError id="address-error" message={errors.address} />
              </div>
              <div className="grid content-start gap-2">
                <Label htmlFor="date">Preferred day</Label>
                <Input id="date" name="date" type="date" className={fieldClass} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-2 sm:col-span-2">
        <Label htmlFor="message">
          Anything else <span className="font-normal text-silt">(optional)</span>
        </Label>
        <Textarea id="message" name="message" rows={4} className={cn(areaClass, "min-h-28")} placeholder="What it's for, sizes, access to the site…" />
      </div>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:gap-6">
        <button
          type="submit"
          className="press inline-flex h-12 items-center justify-center rounded-full bg-slate px-8 text-limewash hover:bg-loader hover:text-slate"
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

/** Error text that snaps in under its field. */
function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={quick}
          className="text-sm text-destructive"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}
