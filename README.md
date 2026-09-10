# Anand Furniture — website

A website for Anand Furniture Pvt. Ltd. Nine room collections, a scroll-through
walkthrough of a whole house, galleries per room, and every button leading to
WhatsApp or a phone call.

Built with Next.js (React). There is no database and no server code: every page
is turned into plain HTML at build time, so it can be hosted anywhere and it
loads fast.

## What you need on the computer

| Thing | Version | Check it with |
| --- | --- | --- |
| Node.js | 20.9 or newer | `node -v` |
| pnpm | 10 or newer | `pnpm -v` |

If `pnpm` is missing: `npm install -g pnpm`.

## Running it

```bash
pnpm install    # once, after downloading the project. Creates node_modules/
pnpm dev        # start the site while you work → http://localhost:3000
```

Leave `pnpm dev` running in the terminal. Save any file and the browser updates
by itself. Press `Ctrl+C` in that terminal to stop.

To see exactly what visitors will get:

```bash
pnpm build      # make the finished site. Fails loudly if something is broken
pnpm start      # serve the finished site → http://localhost:3000
```

Run `pnpm build` before every deploy. If it passes, the site is sound.

## Where things are

```
lib/catalog.ts            ALL the words: phone, rooms, designs, prices, FAQ
public/gallery/<room>/    the photographs, one folder per collection
app/                      the pages
  page.tsx                home: landing → the house → catalogue → why → process
  collections/            the collection index and the collection template
  contact/  about/        the two other pages
  layout.tsx              nav, footer, page titles, Google/social info
components/               the reusable pieces the pages are built from
public/rooms/             the three photographs that belong to no collection
scripts/gallery.mjs       lists public/gallery/ for the site. Runs by itself
lib/gallery.generated.ts  what that script writes. Never edit it
assets/source-renders/    the original full-size PNGs, not published
```

## Adding photographs

Every collection has its own folder under `public/gallery/`, named after the
collection:

```
public/gallery/
  modular-kitchen/   living-room/    wardrobes/     dining-tables/
  beds/              sofas/          parquet-flooring/
  railings/          modular-design/
```

To add photographs to a collection, **put the image files in that folder and
start the site again.** Nothing else. They appear in the collection's gallery,
in the room hero, and on the design cards.

- Photographs are shown in filename order, which is why they are numbered
  `01-`, `02-` and so on. To slot one in between, call it `02b-something.webp`.
- WebP, JPG, PNG and AVIF all work. WebP is the smallest, so prefer it.
- A caption is optional. Captions live in `galleryCaptions` in
  `lib/catalog.ts`, one line per photograph in the same order as the files. A
  photograph with no caption of its own shows the room's tagline instead.

To add a whole new collection, for example a TV showcase as its own category
rather than part of the living room: copy one block inside `seeds` in
`lib/catalog.ts`, give it a new `slug`, then make a `public/gallery/<slug>/`
folder and put photographs in it. It appears in the navigation, the collection
index, the catalogue and the sitemap by itself.

## Changing the content

Almost everything lives in `lib/catalog.ts`. Edit it, save, and the whole site
updates, because every page reads from it.

**Phone, WhatsApp, email, address, hours** — the `company` block at the top.
`phone` is what dialling uses, `phoneDisplay` is what people read, `whatsapp`
must include the country code with no `+` or spaces.

**A design** — find the room in `seeds`, copy one line inside its `designs` list,
and change the words. `id` must stay unique. The photo is chosen automatically.

**A collection** — copy a whole block inside `seeds`. `slug` becomes both its web
address and the name of its photograph folder under `public/gallery/`.

**The FAQ, the reviews** — the `faqs` and `testimonials` lists near the bottom.

**A photograph** — see *Adding photographs* above. Drop the file into that
collection's folder under `public/gallery/`.

Wording that is not in `catalog.ts` sits in the page file itself, for example the
about page story in `app/about/page.tsx`.

## Publishing it

Easiest is Vercel, the company behind Next.js:

```bash
npx vercel        # first time, follow the prompts
npx vercel --prod # publish
```

Then point the domain at it in the Vercel dashboard, and set `company.url` in
`lib/catalog.ts` to that domain so the sitemap and social previews are correct.

## Before it goes live

- Confirm the phone, WhatsApp, email and address in `lib/catalog.ts`.
- Set `company.url` to the real domain.
- Replace or remove the four `testimonials`. They are placeholders with
  invented names, which should not sit on a live site as real reviews.
- Replace the about page story with the real history.
- Swap in real photographs when you have them. Each collection currently shows
  five framings of a single render. Drop the real files into
  `public/gallery/<collection>/`, delete the old ones, and rewrite the captions
  in `lib/catalog.ts`.
