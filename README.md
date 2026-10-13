# Limestone yard website

A presence site for a physical limestone business that sells aggregate by the ton (fines to boulders) and lime by the sack, with pick-up at the yard or dump-truck delivery, and a public price list. There is no shop or backend; the inquiry form opens the visitor's email app with a prepared message.

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
| Products by the ton and by the sack | `src/content/materials.ts` |
| **Prices** (per ton, per sack, delivery fees) | `src/content/prices.ts` |
| Jobs shown in "What limestone is used for" | `src/content/uses.ts` |
| Pick-up, delivery, trucks, delivery area | `src/content/delivery.ts` |
| Projects | `src/content/projects.ts` |
| Home page copy | `src/content/home.ts` |
| About page copy, timeline, team | `src/content/about.ts` |
| Colours and type scale | `src/app/globals.css` |
| Photos and videos | drop files into `public/media/`, see [public/media/README.md](public/media/README.md) |

Everything still to be replaced is listed in [PLACEHOLDERS.md](PLACEHOLDERS.md).

## Pages

`/` home (uses → how to buy → prices), `/materials` tons and sacks, `/prices` price list and estimator, `/delivery`, `/projects`, `/about`, `/visit` (contact and order form).

## Design notes

- **Palette: the quarry yard.** Chalk `#EDEBE5` (limestone dust) ground, limewash `#F8F7F3` raised surfaces, slate `#1D2427` ink and dark bands, silt `#57554E` and fossil `#A29F95` for quiet text, and **loader yellow `#F4B400`**, the colour of loaders and dump trucks, as the accent. Yellow is always paired with slate text; accent text on light grounds uses ochre `#8A6200`. All text pairs meet WCAG AA contrast.
- **Type:** Marcellus for headings; Hanken Grotesk for text. Prices and other figures use Hanken semibold with tabular numerals (`.type-figure`), because Marcellus has no peso sign and an O-like zero.
- **Motion: snappy, and it starts on its own.** Shared tokens live in `src/lib/motion.ts` and `--ease-snap` in `globals.css`. Animations start when they come on screen, not as you scroll:
  - **Plays once:** the hero pour, section reveals, the screening scene (stone falls through the screens and sorts by size, with a "Sort again" button), the Delivery-page dump truck.
  - **Loops:** the home delivery journey (load, weigh, drive, tip, repeat; pauses off screen and has a Pause button) and the use-case explorer (cycles jobs until someone picks one).
  - Reduced-motion preferences show every scene in its finished state, still.

## How media slots work

Content files name a slot without an extension, e.g. `media/materials/road-base`. `src/lib/media.ts` looks for a matching file in `public/` at render time. If none exists, `MediaFrame` shows a stone texture rendered once on the server by `src/app/texture/[spec]/route.ts` (an SVG noise recipe rasterised to a small, permanently cached WebP), tinted with that material's `tone` colours.
