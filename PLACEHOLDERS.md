# Placeholders to replace

Everything below is temporary. Text lives in `src/content/`; photos and videos go in `public/media/` (see [public/media/README.md](public/media/README.md)).

## 1. Business details — `src/content/site.ts`

| Field | Placeholder | Notes |
|---|---|---|
| Business name | Calcaria Stone Co. | Used in titles, footer, metadata |
| Short name | Calcaria | Logo wordmark and big footer mark |
| Tagline | Limestone by the ton and by the sack, delivered. | Footer headline |
| Description | A limestone yard selling crushed aggregate, road base and boulders… | Search engines and link previews |
| Website URL | https://www.example.com | Needed for sitemap and link previews |
| Year established | 1998 | Footer, structured data |
| Phone | +63 900 000 0000 (and `phoneHref`) | Header, footer, stone pages, Visit |
| Email | hello@example.com | Inquiry form sends to this address |
| Address | Lot 00, Quarry Road / Barangay Placeholder / City, Province 0000 | |
| Directions link | Google Maps search link | Paste your real Google Maps link |
| Map embed | *(empty)* | Google Maps → Share → Embed a map → copy the `src` URL |
| Opening hours | Mon–Fri 8–5, Sat 8–12, Sun closed | |
| Social links | facebook.com / instagram.com | Add, remove or rename |
| Home facts | Since 1998 / From 1 sack to 20 tons / 3 dump trucks | The three facts beside the intro |

## 2. Logo — `src/components/layout/logo.tsx` and `src/app/icon.svg`

The three-bar strata mark is a stand-in. Replace `LogoMark` with the real logo (SVG preferred) and update `icon.svg` (browser tab icon).

## 3. Tons and sacks — `src/content/materials.ts`

**By the ton (6):** Limestone fines (0–5 mm), Pebbles (5–20 mm), Crushed gravel (20–40 mm), Road base (0–40 mm graded), Boulders (150–600 mm), Mixed fill.
**By the sack (2):** Fine limestone (40 kg sack), Cooked limestone / quicklime (25 kg sack).

For each, confirm or replace:
- name and "also called" trade names (e.g. "3/4 gravel", "apog")
- **size range** in mm (`sizeMm` drives the size bars)
- uses, and how it is sold (minimum order, sack weight, bulk discount)
- the quicklime safety note

## 4. Prices — `src/content/prices.ts`

**Every amount is made up.** Replace with real prices before going live:
- **Per ton** at the yard: fines ₱650, pebbles ₱950, crushed gravel ₱1,050, road base ₱750, boulders ₱900, mixed fill ₱450
- **Per sack**: fine limestone ₱220 (₱200 from 20 sacks), cooked limestone ₱320 (₱295 from 20 sacks)
- **Delivery fee per trip** by distance (up to 10 km / 10–25 km / 25–50 km) and truck (mini 5 t / 6-wheeler 10 t / 10-wheeler 20 t): ₱1,500 to ₱7,800
- "Prices updated" month, and the notes (minimums, boulder delivery from 5 t, beyond 50 km on request)

The price list page, the estimator, the product rows and the home page all read from this one file.

## 5. Uses — `src/content/uses.ts`

The eight jobs on the home page (roads, concrete, river and sea walls, filling lots, drainage, paths, farms, lime plaster): titles, descriptions, and which products suit each.

## 6. Delivery — `src/content/delivery.ts`

- Pick-up and delivery descriptions and bullet points
- **Truck sizes and capacities** (Mini dump 3 m³ / 5 t, 6-wheeler 6 m³ / 10 t, 10-wheeler 12 m³ / 20 t)
- **Delivery area** ("Within 50 km of the yard")
- The four delivery steps and the site checklist (road width, 7 m tipping height)

## 7. Projects — `src/content/projects.ts`

Six sample jobs (Barangay access road, Riverbank riprap, Subdivision lot filling, Warehouse footings, Rice farm soil liming, Heritage house lime plaster) with made-up locations, years, tonnages and summaries. Replace them with real jobs (with the client's permission to show them).

## 8. Home page copy — `src/content/home.ts`

Hero headline and text, intro statement, section titles, the "How to buy" cards, the delivery-journey stages and example load (18.4 t), the prices intro, and the "Come to the yard" band.

## 9. About page — `src/content/about.ts`

Title, lede, the founding story (invented: first crusher, screens, lime kiln, trucks), the timeline years (1998 / 2006 / 2014 / 2021), and three team members ("Placeholder Name").

## 10. Visit page — `src/app/visit/page.tsx`

"No appointment needed during opening hours" and "We usually reply within one working day": confirm both are true.

## 11. Photos and videos

Every image and video slot shows a generated stone texture until a file is added. The full list of file names is in [public/media/README.md](public/media/README.md).
