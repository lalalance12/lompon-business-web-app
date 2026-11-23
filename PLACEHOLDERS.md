# Placeholders to replace

Everything below is temporary. Text lives in `src/content/`; photos and videos go in `public/media/` (see [public/media/README.md](public/media/README.md)).

## 1. Business details — `src/content/site.ts`

| Field | Placeholder | Notes |
|---|---|---|
| Business name | ✅ Lompon Limestone Quarrying (done) | Used in titles, footer, metadata |
| Short name | ✅ Lompon Limestone (done) | Logo wordmark and big footer mark |
| Tagline | Limestone by the kilo and by the sack, delivered. | Footer headline |
| Description | A limestone yard selling fines, grits, pebbles and crushed gravel by the kilo… | Search engines and link previews |
| Website URL | https://www.example.com | Needed for sitemap and link previews |
| Year established | 1998 | Footer, structured data |
| Phone | ✅ +63 906 813 0792 (done) | Header, footer, stone pages, Visit |
| Email | hello@example.com | Inquiry form sends to this address |
| Address | Lot 00, Quarry Road / Barangay Placeholder / City, Province 0000 | |
| Directions link | Google Maps search link | Paste your real Google Maps link |
| Map embed | *(empty)* | Google Maps → Share → Embed a map → copy the `src` URL |
| Opening hours | Mon–Fri 8–5, Sat 8–12, Sun closed | |
| Social links | facebook.com / instagram.com | Add, remove or rename |
| Home facts | Since 1998 / From 1 sack to a 20 m³ truck / 3 dump trucks | The three facts beside the intro |

## 2. Logo — `src/components/layout/logo.tsx` and `src/app/icon.svg`

The three-bar strata mark is a stand-in. Replace `LogoMark` with the real logo (SVG preferred) and update `icon.svg` (browser tab icon).

## 3. Kilos and sacks — `src/content/materials.ts`

**By the kilo (6):** Limestone fines (mesh 20), Grits (mesh 10), Coarse (mesh 8), Pebbles (mesh 6), Crushed gravel (no size shown), Boulders (no size shown, sold by the m³). Road base and mixed fill were removed.
**By the sack (1):** Cooked limestone / quicklime (50 kg sack). It is the only sacked product.

For each, confirm or replace:
- name and "also called" trade names (e.g. "3/4 gravel", "apog")
- **size** label (mesh) and `sizeMm` in mm, which drives the size bars (mesh 20 ≈ 0.84 mm, mesh 10 ≈ 2 mm, mesh 8 ≈ 2.38 mm, mesh 6 ≈ 3.36 mm)
- uses, and how it is sold
- the quicklime safety note

## 4. Prices — `src/content/prices.ts`

Prices from the owner (November 2026):
- **Per kilo** at the yard: fines ₱2.20, grits ₱2.20, coarse ₱2.00, pebbles ₱1.20, crushed gravel ₱1.00
- **Per cubic metre**: boulders ₱400
- **Per sack**: cooked limestone, 50 kg sack, ₱110 per sack (50 kg × ₱2.20)
- **Delivery**: one dump truck holding up to 20 m³, ₱1,500 per km from the yard, per trip. Paid separately from the limestone.
- **Still a placeholder**: `kgPerCubicMetre` (1,500 kg per m³), used only to estimate how many trips a kilo order needs and the "full truck" column
- "Prices updated" month, and the notes (beyond 50 km on request)

The price list page, the estimator, the product rows and the home page all read from this one file.

## 5. Uses — `src/content/uses.ts`

The eight jobs on the home page (roads, concrete, river and sea walls, filling lots, drainage, paths, farms, lime plaster): titles, descriptions, and which products suit each.

## 6. Delivery — `src/content/delivery.ts`

- Pick-up and delivery descriptions and bullet points
- **Delivery area** ("Within 50 km of the yard")
- The four delivery steps and the site checklist (road width, 7 m tipping height)

## 7. Projects — `src/content/projects.ts`

Six sample jobs (Barangay access road, Riverbank riprap, Subdivision lot filling, Warehouse footings, Rice farm soil liming, Heritage house lime plaster) with made-up locations, years, quantities and summaries. Replace them with real jobs (with the client's permission to show them).

## 8. Home page copy — `src/content/home.ts`

Hero headline and text, intro statement, section titles, the "How to buy" cards, the delivery-journey stages, the prices intro, and the "Come to the yard" band.

## 9. About page — `src/content/about.ts`

Title, lede, the founding story (invented: first crusher, screens, lime kiln, trucks), the timeline years (1998 / 2006 / 2014 / 2021), and three team members ("Placeholder Name").

## 10. Visit page — `src/app/visit/page.tsx`

"No appointment needed during opening hours" and "We usually reply within one working day": confirm both are true.

## 11. Photos and videos

Every image and video slot shows a generated stone texture until a file is added. The full list of file names is in [public/media/README.md](public/media/README.md).
