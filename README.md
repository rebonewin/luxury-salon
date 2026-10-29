# Luxury Salon — The Beauty Atelier

A premium, editorial website for **Luxury Salon**, Tejasvi Enclave, Daurala–Masuri Road, Masuri, Meerut, Uttar Pradesh 250001.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Motion and GSAP/Lenis.

## Run locally

```bash
npm install
npm run dev
```

Production check:

```bash
npm run lint
npm run build
npm run start
```

The local production server used during development runs on port 3100 because port 3000 may already be in use:

```bash
npm run start -- --port 3100
```

## Set the production URL

Canonical links, Open Graph URLs, `robots.txt` and `sitemap.xml` all derive from `site.url`. Set the real domain before deploying:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Without it, the site falls back to `https://luxury-salon-masuri.vercel.app`.

## Where to edit content

| What | File |
| --- | --- |
| Business name, phone, address, hours, WhatsApp message, map links | `src/lib/site.ts` |
| Services, durations and starting prices | `src/lib/site.ts` → `serviceCategories` |
| Gallery items and categories | `src/lib/site.ts` → `galleryItems` |
| Reviews, stats, philosophy, timeline, FAQs | `src/lib/site.ts` |
| Page metadata | each `src/app/*/page.tsx` and `src/app/layout.tsx` |
| Colours and typography | `src/app/globals.css` and `src/app/layout.tsx` |

### Changing a price or service

Open `src/lib/site.ts`, find the service inside `serviceCategories`, and edit `name`, `description`, `duration` or `price`:

```ts
{
  number: "01",
  name: "Hair Cut",
  description: "A precision cut shaped to your bone structure.",
  duration: "45 – 60 min",
  price: "From ₹1,200",
  image: "cut",
  imageAlt: "Close-up of a precision haircut in progress",
}
```

To add a service, copy a block and give it a unique `number`. To add a category, copy a whole category object and add it to `serviceCategories`; navigation and JSON-LD update automatically.

## Where to add salon photos

Source originals live in `assets/salon/`:

- `assets/salon/exterior.jpg` — shopfront
- `assets/salon/chairs.jpg` — interior, portrait
- `assets/salon/street.jpg` — interior looking out to the street

Processed, web-ready images live in:

- `public/images/salon/` — hero, about and contact imagery
- `public/images/services/` — service category imagery
- `public/images/gallery/` — gallery imagery

Replace any file in those folders with the same filename and aspect ratio, then update its dimensions and blur placeholder in `src/lib/image-manifest.json`. The straightforward way is to run:

```bash
node scripts/import-real-photos.mjs
```

That script crops and grades the three originals, writes the WebP derivatives, updates the manifest and rebuilds `public/images/og-image.jpg`. Edit the crop values in the script if you want a different framing.

Real photos currently used:

| Placement | Image |
| --- | --- |
| Home — About preview | `public/images/salon/salon-floor.webp` |
| About — story band | `public/images/salon/salon-wide.webp` |
| Contact — hero | `public/images/salon/salon-wide.webp` |
| Home — booking CTA background | `public/images/salon/salon-wide.webp` |
| Gallery — The atelier | `public/images/gallery/08-atelier.webp` |
| Gallery — A room to exhale | `public/images/gallery/12-space.webp` |
| Gallery — The entrance | `public/images/salon/salon-entrance.webp` |

## Booking behaviour

The booking form is a **WhatsApp handoff**, not a database booking. On submit it validates the fields and opens WhatsApp with the name, phone, service, preferred date and optional notes pre-filled. The salon confirms availability personally.

Change the receiving number in `src/lib/site.ts` (`whatsappNumber`, digits only, including country code).

## Placeholders to replace before launch

- Prices are starting prices in INR and are indicative only.
- Reviews, reviewer names, `4.9` rating, `12+` years, `500+` brides, and the `2013` establishment date are placeholder content. Replace them with verified business facts.
- Service and gallery photography not yet supplied by the salon is Pexels stock imagery. Replace it with real salon work when available.
- Opening hours (`Tue–Sun, 10:00–20:00`) should be confirmed by the owner.
- `NEXT_PUBLIC_SITE_URL` must be set to the live domain.
