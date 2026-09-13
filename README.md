# Zoology Lab Specimen Catalog (Next.js + Tailwind + shadcn)

A specimen catalog with a page per specimen, an animated image-corridor
hero on the homepage, and a printable sheet of QR codes that link
straight to each specimen's page.

Stack: **Next.js 14 (App Router, static export) · TypeScript · Tailwind
CSS · shadcn-style components**.

> This project was generated as source code. It has **not** been built
> or run yet — you'll need Node.js and an internet connection (for
> `npm install`) to do that yourself. Steps below.

## 1. Install

Requires [Node.js](https://nodejs.org) 18+.

```bash
npm install
```

## 2. Run locally

```bash
npm run dev
```

Open http://localhost:3000 — note that locally the site runs without
the `/zoology-specimens` path prefix that GitHub Pages needs, so it's
just for checking your changes look right.

## 3. Add specimens

Edit **`data/specimens.csv`** — one row per specimen:

```
id, common_name, scientific_name, class_phylum, collection_date,
location, description, habitat, diet, conservation_status, notes, sources
```

- `id` becomes the URL and catalog number (`002`, `003`, … — zero-padding
  keeps them sorted nicely).
- Leave any field blank if you don't have that info yet.
- Wrap a value in double quotes if it contains a comma.

`data/specimens.json` is generated from this CSV automatically every
time you run `npm run dev` or `npm run build` — don't edit the JSON
file directly, it gets overwritten.

## 4. Deploy to GitHub Pages

This repo includes a GitHub Actions workflow
(`.github/workflows/deploy.yml`) that builds and deploys automatically
on every push to `main`. One-time setup:

1. Create a repository on GitHub named **`zoology-specimens`** under
   your account (**Erenzxzx**) and push this project to it:
   ```bash
   git init
   git add .
   git commit -m "Zoology specimen catalog"
   git branch -M main
   git remote add origin https://github.com/Erenzxzx/zoology-specimens.git
   git push -u origin main
   ```
2. On GitHub, go to **Settings → Pages**, and under "Build and
   deployment" set **Source** to **GitHub Actions**.
3. Push to `main` (or re-run the workflow from the Actions tab). Once
   it finishes, your site is live at:
   `https://Erenzxzx.github.io/zoology-specimens/`

From then on: edit `data/specimens.csv`, commit, and push — the site
rebuilds and redeploys on its own.

**If you ever rename the repository**, update `REPO` in both
`next.config.mjs` and `lib/site-config.ts` (they need to match) and
redeploy — the QR codes are baked to that exact URL.

## 5. Print QR labels

Once the site is live, open `/qrcodes/` and use **Print sheet**. Each
cell has dashed cut lines, the catalog number, common name, and a QR
code linking to that specimen's page.

## Project structure

```
app/
  page.tsx                 → homepage (hero + catalog)
  specimens/[id]/page.tsx  → one page per specimen, statically generated
  qrcodes/page.tsx         → printable QR sheet
  globals.css              → Tailwind + the site's color theme
components/
  ui/
    image-stream-hero.tsx  → the animated corridor hero
    button.tsx, input.tsx  → shadcn-style primitives
  site-rail.tsx            → shared top nav bar
  specimen-tag.tsx         → the specimen "card" layout
  catalog-grid.tsx         → searchable grid on the homepage
  qr-sheet.tsx             → the QR grid + print button
lib/
  specimens.ts             → typed data loader
  site-config.ts           → repo name / base path / site URL
  utils.ts                 → shadcn's cn() helper
data/
  specimens.csv            → YOUR DATA — edit this
  specimens.json           → generated, don't edit
public/hero/               → original SVG textures used in the hero
                              (swap for real specimen photos any time)
scripts/build-data.mjs     → converts the CSV to JSON at build time
```

## Notes on the hero images

The hero currently cycles through eight original SVG textures (scale,
feather, honeycomb, wing-vein, shell-spiral, leaf-vein, fur, and coral
patterns) drawn specifically for this catalog, rather than stock
photography unrelated to your specimens. To use real photos instead:
drop image files in `public/hero/` (or `public/specimens/`) and update
the `HERO_TEXTURES` array in `app/page.tsx` to point at them.
