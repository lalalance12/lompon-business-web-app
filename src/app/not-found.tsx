import Link from "next/link"

export default function NotFound() {
  return (
    <section className="page-gutter page-width flex min-h-[80svh] flex-col justify-end pt-36 pb-24">
      <h1 className="type-h1 max-w-[16ch]">This page isn&apos;t in the yard.</h1>
      <p className="type-lede mt-6 max-w-[48ch] text-silt">
        The link may be old or mistyped. Try the product list or head back to the start.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/materials" className="press inline-flex h-12 items-center rounded-full bg-slate px-7 text-limewash hover:bg-loader hover:text-slate">
          See tons and sacks
        </Link>
        <Link href="/" className="press inline-flex h-12 items-center rounded-full border border-slate/25 px-7 hover:bg-slate hover:text-limewash">
          Go to the home page
        </Link>
      </div>
    </section>
  )
}
