import Link from "next/link"
import { cta } from "@/lib/cta"

export default function NotFound() {
  return (
    <section className="page-gutter page-width flex min-h-[80svh] flex-col justify-end pt-36 pb-24">
      <h1 className="type-h1 max-w-[16ch]">This page isn&apos;t in the yard.</h1>
      <p className="type-lede mt-6 max-w-[48ch] text-silt">
        The link may be old or mistyped. Try the product list or head back to the start.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/materials" className={cta({ tone: "primary", size: "md" })}>
          See tons and sacks
        </Link>
        <Link href="/" className={cta({ tone: "outline", size: "md" })}>
          Go to the home page
        </Link>
      </div>
    </section>
  )
}
