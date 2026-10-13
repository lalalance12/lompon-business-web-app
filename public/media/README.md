# Photos and videos

Every image or video slot on the site looks for a file here by name. Until one exists, the slot shows a generated stone texture in that material's colours, so the site never looks broken.

**To fill a slot:** save the file with the exact name below into the matching folder. The extension can be any of the supported ones. No code changes are needed: refresh the page (or rebuild for production).

- Images: `.jpg` `.jpeg` `.png` `.webp` `.avif`. Export around 2400 px on the long edge; the site resizes and compresses them automatically.
- Videos: `.mp4` (H.264) or `.webm`. Keep background videos short (8–20 s), silent, and under ~8 MB. They loop muted, play only while on screen, never autoplay for visitors who prefer reduced motion, and always have a pause button.

While running `npm run dev`, hover a placeholder to see the exact file path it is waiting for.

## Home — `media/home/`

| File | Where | Suggested shape |
|---|---|---|
| `hero.mp4` | Full-screen opening video | 16:9, landscape |
| `hero-poster.jpg` | Shown before the video loads, or instead of it | Same frame as the video |
| `buy-tons.jpg`, `buy-sacks.jpg` | "How to buy" cards | Landscape 16:10 |
| `visit.jpg` | "Come to the yard" band | Landscape |

## Uses — `media/uses/`

One photo per job in the home page "What limestone is used for" section, landscape 16:10: `roads.jpg`, `concrete.jpg`, `shore.jpg`, `filling.jpg`, `drainage.jpg`, `paths.jpg`, `farms.jpg`, `plaster.jpg`.

## Tons and sacks — `media/materials/`

One photo per product, named by its slug: `limestone-fines.jpg`, `pebbles.jpg`, `gravel.jpg`, `road-base.jpg`, `boulders.jpg`, `fill-spall.jpg` (4:3 close-ups of the pile, ideally with a hand or coin for scale), and `fine-limestone.jpg`, `cooked-limestone.jpg` (4:3, the sack).

## Delivery — `media/delivery/`

| File | Where |
|---|---|
| `pickup.jpg` | "You collect" panel: a customer's truck being loaded (4:3) |
| `truck.jpg` | "Before the truck arrives": a dump truck tipping on site (4:3) |
| `video.mp4` + `video-poster.jpg` | Optional: replaces `truck.jpg` when present |

## Projects — `media/projects/<project-slug>/`

`1.jpg`, `2.jpg`, `3.jpg` … up to `imageCount` in `projects.ts`. `1.jpg` is the large lead image (3:2) and is also used on the home page.

Folders: `barangay-access-road`, `riverbank-riprap`, `subdivision-lot-filling`, `warehouse-footings`, `rice-farm-liming`, `heritage-house-plaster`.

## About — `media/about/`

| File | Where |
|---|---|
| `hero.jpg` | Full-width opening image behind the title |
| `film.mp4` + `film-poster.jpg` | The 16:9 film block |
| `yard-1.jpg`, `yard-2.jpg`, `yard-3.jpg` | "The yard" photos (the first is large) |
| `team-1.jpg`, `team-2.jpg`, `team-3.jpg` | Team portraits, 4:5 |

## Visit — `media/visit/`

`map.jpg`: a static map or yard-entrance photo, used only when no Google Maps embed URL is set in `src/content/site.ts`.
