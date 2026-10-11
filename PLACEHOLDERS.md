# Placeholders to replace

Everything below is temporary. Text lives in `src/content/`; photos and videos go in `public/media/` (see [public/media/README.md](public/media/README.md)).

## 1. Business details — `src/content/site.ts`

| Field | Placeholder | Notes |
|---|---|---|
| Business name | Calcaria Stone Co. | Used in titles, footer, metadata |
| Short name | Calcaria | Logo wordmark and big footer mark |
| Tagline | Natural limestone, cut and finished in our own yard. | Footer headline |
| Description | A limestone yard supplying natural stone… | Search engines and link previews |
| Website URL | https://www.example.com | Needed for sitemap and link previews |
| Year established | 1998 | Footer, structured data |
| Phone | +63 900 000 0000 (and `phoneHref`) | Header, footer, stone pages, Visit |
| Email | hello@example.com | Inquiry form sends to this address |
| Address | Lot 00, Quarry Road / Barangay Placeholder / City, Province 0000 | |
| Directions link | Google Maps search link | Paste your real Google Maps link |
| Map embed | *(empty)* | Google Maps → Share → Embed a map → copy the `src` URL |
| Opening hours | Mon–Fri 8–5, Sat 8–12, Sun closed | |
| Social links | facebook.com / instagram.com | Add, remove or rename |
| Home facts | Since 1998 · 9 varieties · 4,000 m² | The three facts beside the intro |

## 2. Logo — `src/components/layout/logo.tsx` and `src/app/icon.svg`

The three-bar strata mark is a stand-in. Replace `LogoMark` with the real logo (SVG preferred) and update `icon.svg` (browser tab icon).

## 3. Stones — `src/content/stones.ts`

Nine stones, all placeholders: **Coral Stone, Jerusalem Gold, Indiana Buff, Moleanos Beige, Classic Travertine, Fossil Grey, Kota Blue, Belgian Bluestone, Bianco Calce**.

For each stone, confirm or replace:
- name, family (e.g. "Shell limestone") and **origin** (all say "Placeholder Region")
- summary and description paragraphs
- finishes offered and applications
- formats: sizes and thicknesses
- **technical data** (density, absorption, strength): sample values only, not test results
- `featured: true` puts a stone on the home page slab rack (six currently)
- `tone` colours: only used for the generated texture until real photos exist

If you add or remove stones, also update the "9 varieties" fact in `site.ts`.

## 4. Finish descriptions — `src/content/finishes.ts`

Short plain-language descriptions of Honed, Brushed, Tumbled, Sandblasted, Bush-hammered and Split face.

## 5. Projects — `src/content/projects.ts`

Six sample projects (Hillside residence, Harbour hotel lobby, Garden pool terrace, Parish church steps, Courtyard café, City apartment bathrooms) with made-up locations, years and summaries. Replace them with real jobs (with the client's permission to show them).

## 6. Home page copy — `src/content/home.ts`

Hero headline and text, intro statement, the six "Where it goes" applications, the four process steps, and the "Come and see the slabs" band.

## 7. About page — `src/content/about.ts`

Title, lede, the founding story (invented), the timeline years (1998 / 2006 / 2014 / 2021), and three team members ("Placeholder Name").

## 8. Visit page — `src/app/visit/page.tsx`

"No appointment needed during opening hours" and "We usually reply within one working day": confirm both are true.

## 9. Photos and videos

Every image and video slot shows a generated stone texture until a file is added. The full list of file names is in [public/media/README.md](public/media/README.md).
