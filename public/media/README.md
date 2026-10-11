# Photos and videos

Every image or video slot on the site looks for a file here by name. Until one exists, the slot shows a generated stone texture in that stone's colours, so the site never looks broken.

**To fill a slot:** save the file with the exact name below into the matching folder. The extension can be any of the supported ones. No code changes are needed: refresh the page (or rebuild for production).

- Images: `.jpg` `.jpeg` `.png` `.webp` `.avif`. Export around 2400 px on the long edge; the site resizes and compresses them automatically.
- Videos: `.mp4` (H.264) or `.webm`. Keep background videos short (8–20 s), silent, and under ~8 MB. They loop muted, play only while on screen, never autoplay for visitors who prefer reduced motion, and always have a pause button.

While running `npm run dev`, hover a placeholder to see the exact file path it is waiting for.

## Home — `media/home/`

| File | Where | Suggested shape |
|---|---|---|
| `hero.mp4` | Full-screen opening video | 16:9, landscape |
| `hero-poster.jpg` | Shown before the video loads, or instead of it | Same frame as the video |
| `process.mp4` | "From block to your site" section (cutting, finishing, the yard) | Tall or 4:5 works best |
| `process-poster.jpg` | Poster for the process video | |
| `visit.jpg` | "Come and see the slabs" band | Landscape |

## Applications — `media/applications/`

`flooring.jpg`, `wall-cladding.jpg`, `pool.jpg`, `paving.jpg`, `stairs.jpg`, `landscaping.jpg`. The first (flooring) is shown large and tall; the rest are landscape.

## Stones — `media/stones/<stone-slug>/`

Folders: `coral-stone`, `jerusalem-gold`, `indiana-buff`, `moleanos-beige`, `travertine-classic`, `fossil-grey`, `kota-blue`, `belgian-bluestone`, `bianco-calce`.

| File | Where | Suggested shape |
|---|---|---|
| `cover.jpg` | Catalog tile, home slab rack, lead photo on the stone page | Portrait 4:5. Fill the frame with the stone face |
| `gallery-1.jpg` … `gallery-N.jpg` | Stone page gallery (N = `galleryCount` in `stones.ts`) | Square; the last one is wide if the count is odd |
| `video.mp4` | Optional: appears on the stone page only when present | 16:9 |
| `finish-honed.jpg`, `finish-brushed.jpg`, `finish-tumbled.jpg`, `finish-sandblasted.jpg`, `finish-bush-hammered.jpg`, `finish-split-face.jpg` | Finish swatches (only the finishes listed for that stone) | 3:2 close-up of the surface |

## Projects — `media/projects/<project-slug>/`

`1.jpg`, `2.jpg`, `3.jpg` … up to `imageCount` in `projects.ts`. `1.jpg` is the large lead image (3:2) and is also used on the home page.

Folders: `hillside-residence`, `harbour-hotel-lobby`, `garden-pool-terrace`, `parish-church-steps`, `courtyard-cafe`, `city-apartment-bath`.

## About — `media/about/`

| File | Where |
|---|---|
| `hero.jpg` | Full-width opening image behind the title |
| `film.mp4` + `film-poster.jpg` | The 16:9 film block |
| `yard-1.jpg`, `yard-2.jpg`, `yard-3.jpg` | "The yard" photos (the first is large) |
| `team-1.jpg`, `team-2.jpg`, `team-3.jpg` | Team portraits, 4:5 |

## Visit — `media/visit/`

`map.jpg`: a static map or yard-entrance photo, used only when no Google Maps embed URL is set in `src/content/site.ts`.
