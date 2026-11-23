"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"
import { cta } from "@/lib/cta"
import { quick } from "@/lib/motion"
import { Input } from "@/components/ui/input"
import { Field } from "@/components/shared/field"
import { Segmented } from "@/components/shared/segmented"
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

type Status = "idle" | "sending" | "sent" | "error"

/**
 * With a Web3Forms access key (NEXT_PUBLIC_WEB3FORMS_KEY), the form sends the
 * inquiry straight to the yard's inbox. Without one, it falls back to writing
 * the email in the visitor's own mail app.
 *
 * Prefill from links: ?product=<slug>, ?delivery=1
 */
export function InquiryForm({ email, groups, formKey }: { email: string; groups: ProductGroup[]; formKey?: string }) {
  const params = useSearchParams()
  const all = groups.flatMap((g) => g.options)
  const wanted = params.get("product")
  const initial = all.find((o) => o.value.endsWith(`:${wanted}`))?.value ?? UNDECIDED

  const [product, setProduct] = useState(initial)
  const [method, setMethod] = useState<Method>(params.get("delivery") === "1" ? "delivery" : "pickup")
  const [errors, setErrors] = useState<Errors>({})
  const [composed, setComposed] = useState(false)
  const [status, setStatus] = useState<Status>("idle")
  const [mailto, setMailto] = useState(`mailto:${email}`)

  const chosen = all.find((o) => o.value === product)
  const unit = chosen?.unit ?? "amount"

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === "sending") return
    const form = e.currentTarget
    const data = new FormData(form)
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

    const link = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setMailto(link)

    if (!formKey) {
      window.location.href = link
      setComposed(true)
      return
    }

    // Hidden field only bots fill in
    if (data.get("botcheck")) return

    setStatus("sending")
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: formKey,
          subject,
          from_name: `${name} (website)`,
          ...(from ? { replyto: from } : {}),
          message: body,
        }),
      })
      const json = (await res.json().catch(() => null)) as { success?: boolean } | null
      if (!res.ok || !json?.success) throw new Error("Not sent")
      setStatus("sent")
      form.reset()
      setProduct(UNDECIDED)
    } catch {
      setStatus("error")
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={quick}
        role="status"
        className="rounded-sm bg-chalk p-8 ring-1 ring-border md:p-10"
      >
        <h3 className="type-h3">Thank you, your inquiry is sent.</h3>
        <p className="mt-3 text-silt">
          It&apos;s in our inbox now. We usually reply within one working day, by phone or email, whichever you gave us.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className={cta({ tone: "outline", size: "md", className: "mt-6" })}>
          Send another
        </button>
      </motion.div>
    )
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
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <Field label="Name" htmlFor="name" className="sm:col-span-2">
        <Input id="name" name="name" autoComplete="name" className={fieldClass} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
        <FieldError id="name-error" message={errors.name} />
      </Field>

      <Field label="Phone" htmlFor="phone">
        <Input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} aria-invalid={!!errors.contact} aria-describedby="contact-help" />
      </Field>
      <Field label="Email" htmlFor="email">
        <Input id="email" name="email" type="email" autoComplete="email" className={fieldClass} aria-invalid={!!errors.contact} aria-describedby="contact-help" />
      </Field>
      <p id="contact-help" className={cn("-mt-3 text-sm sm:col-span-2", errors.contact ? "text-destructive" : "text-silt")}>
        {errors.contact ?? "Give us at least one way to reach you."}
      </p>

      <Field label="What you need" htmlFor="product">
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
      </Field>
      <Field label="How much" htmlFor="quantity">
        <div className="relative">
          <Input
            id="quantity"
            name="quantity"
            inputMode="decimal"
            placeholder={chosen ? "e.g. 10" : "e.g. 1,000 kg or 20 sacks"}
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
      </Field>

      <fieldset className="grid gap-3 sm:col-span-2">
        <legend className="mb-3 text-sm font-medium">How you&apos;ll get it</legend>
        <Segmented
          label="How you'll get it"
          id="method"
          value={method}
          options={methods.map((m) => ({ value: m.value, label: m.label }))}
          onChange={setMethod}
        />
        <p className="text-sm text-silt">
          {method === "delivery"
            ? "Delivery is a separate service, paid separately. We'll quote the fee by distance."
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
              <Field label="Delivery address" htmlFor="address">
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
              </Field>
              <Field label="Preferred day" htmlFor="date">
                <Input id="date" name="date" type="date" className={fieldClass} />
              </Field>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Field label={<>Anything else <span className="font-normal text-silt">(optional)</span></>} htmlFor="message" className="sm:col-span-2">
        <Textarea id="message" name="message" rows={4} className={cn(areaClass, "min-h-28")} placeholder="What it's for, sizes, access to the site…" />
      </Field>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:gap-6">
        <button
          type="submit"
          disabled={status === "sending"}
          className={cta({ tone: "primary", size: "md", className: "disabled:opacity-60" })}
        >
          {formKey ? (status === "sending" ? "Sending…" : "Send inquiry") : "Write the email"}
        </button>
        <p className={cn("text-sm", status === "error" ? "text-destructive" : "text-silt")} aria-live="polite">
          {status === "error" ? (
            <>
              It didn&apos;t go through. Try again, or{" "}
              <a href={mailto} className="underline underline-offset-4">send it from your email app</a>.
            </>
          ) : formKey ? (
            "Goes straight to our inbox. No email app needed."
          ) : composed ? (
            `Your email app should now be open with the message ready. If it isn't, write to ${email}.`
          ) : (
            "Opens your email app with the message filled in, ready to send."
          )}
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
