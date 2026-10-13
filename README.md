# Limestone yard website

A presence site for a physical limestone business that sells cut stone, aggregate by the ton (fines to boulders) and lime by the sack, with pick-up at the yard or dump-truck delivery. There is no shop or backend; the inquiry form opens the visitor's email app with a prepared message.

Built with Next.js 16 (App Router, Cache Components), Tailwind CSS 4, shadcn/ui (Radix), Motion and Lenis.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build; every page is prerendered
npm start
```

## Where things live

| To change… | Edit |
|---|---|
| Business name, phone, email, address, hours, social links | `src/content/site.ts` |
| Cut stone (names, specs, finishes, formats) | `src/content/stones.ts` |
| Aggregate by the ton and lime by the sack | `src/content/materials.ts` |
| Pick-up, delivery, trucks, delivery area | `src/content/delivery.ts` |
| Projects | `src/content/projects.ts` |
| Home page copy | `src/content/home.ts` |
| About page copy, timeline, team | `src/content/about.ts` |
| Finish descriptions | `src/content/finishes.ts` |
| Colours and type scale | `src/app/globals.css` |
| Photos and videos | drop files into `public/media/`, see [public/media/README.md](public/media/README.md) |

Everything still to be replaced is listed in [PLACEHOLDERS.md](PLACEHOLDERS.md).

## Design notes

- **Concept: strata.** Limestone is sedimentary, so the site is built from layered bands in stone tones, and placeholder textures show horizontal bedding.
- **Palette** (from the stone): chalk `#E6E3DC` ground, honed `#EFEDE8` raised surfaces, bluestone `#23292C` ink and dark bands, silt `#5C5850` and fossil `#9C9585` for quiet text, lichen `#56624A` as the single accent. All text pairs meet WCAG AA contrast.
- **Type:** Marcellus (flared, inscriptional letterforms made for carving) for headings; Hanken Grotesk for text.
- **Motion: snappy.** Short, decisive moves that land fast and never drift. Shared tokens live in `src/lib/motion.ts` (`quick`, `snapSpring`) and `--ease-snap` in `globals.css`. Pages rise in on navigation (`src/app/template.tsx`), sections and lists stagger in on scroll (`src/components/motion/reveal.tsx`), pill buttons push in on press (the `press` utility), and the dump truck on the home and delivery pages drives in and tips its load. Reduced-motion preferences turn off smooth scrolling, parallax, movement and video autoplay.
- **The slab rack** on the home page is the signature interaction: featured stones stand side by side like slabs on an A-frame, and the one you hover or focus pulls forward.

## How media slots work

Content files name a slot without an extension, e.g. `media/stones/coral-stone/cover`. `src/lib/media.ts` looks for a matching file in `public/` at render time. If none exists, `MediaFrame` shows a stone texture rendered once on the server by `src/app/texture/[spec]/route.ts` (an SVG noise recipe rasterised to a small, permanently cached WebP), tinted with that stone's `tone` colours.
