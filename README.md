# Sutton Garden Kitchen

A fast, responsive website for Emma’s horse box café in Sutton, Norfolk, with a colourful 1970s hippy feel: teal, burgundy and mustard, chunky retro typography, real café photography and a welcoming voice.

## Website

- Intended public domain: **https://sutton-gardens-kitchen.co.uk**. The owner confirmed registration is still pending on 12 September 2026; DNS, hosting and HTTPS must be ready before launch.
- Canonical links, sitemap, sharing URLs and structured data are prepared for that domain. This configuration does not publish the website or register the domain.
- Static website files are in `dist/`. No runtime dependencies, framework, analytics, cookies or contact-form service.

## Run locally

With Node.js 20.11 or newer:

```sh
npm start
```

Open http://127.0.0.1:4173. No package installation or build is needed.

```sh
npm run check
```

This validates local assets and responsive candidates, dimensions, font files, section links, visible menus, gallery links, business information and search metadata. It does not measure live Core Web Vitals or confirm Google indexing.

## What’s included

- Responsive desktop and mobile layouts, with a compact navigation menu and mobile call/directions bar.
- Text-based breakfast, lunch and drinks menus, always visible with every item and price in the page — no accordions or tabs.
- Emma’s introduction and original portrait.
- Photo gallery with keyboard navigation, Escape-to-close and focus restoration. Original-photo links also work without JavaScript and support opening in another tab.
- Address, Wednesday–Saturday 9am–2pm hours, tap-to-call, the café’s Google Maps listing, directions to its map pin and the owner-supplied what3words entrance link: [///shame.bids.latitudes](https://what3words.com/shame.bids.latitudes).
- CafeOrCoffeeShop and WebSite structured data, canonical URL, page metadata, sitemap and robots.txt.
- A leafy “S” favicon matching the café branding: editable `dist/favicon.svg`, a 16/32/48px ICO, a 96px PNG and a 180px Apple touch icon. The SVG contains outlined lettering and needs no external font.
- Locally hosted Shrikhand and Fraunces WOFF2 fonts with their SIL Open Font Licenses and original TTF files preserved.
- All 25 supplied photos copied with descriptive filenames; original Desktop files were preserved. `docs/photo-filenames.json` records every original-to-new filename.
- A recreated, uncropped logo at `dist/brand/sutton-garden-kitchen-logo.png`, displayed prominently in the responsive header. The original cropped photograph remains in `dist/images/`. See [logo recreation notes](docs/logo-recreation.md) for the source and generation prompt.
- Responsive WebP copies in `dist/media/` keep the page lighter while preserving every original photo and the full-resolution logo.

## Edit content

Edit `dist/index.html`, `dist/styles.css`, `dist/hippy.css` and `dist/app.js`. The colourful theme lives in `hippy.css`; `styles.css` supplies the underlying layout. Keep visible opening hours, phone and address in sync with the JSON-LD near the top of `index.html`. Prices were transcribed from the supplied chalkboard photographs and should be checked with Emma before launch. Older phone numbers embedded within original photographs are not used for contact links.

To import the original pictures again, use:

```sh
node scripts/import-photos.mjs "PATH_TO_ORIGINAL_PHOTO_FOLDER"
```

The business name is **Sutton Garden Kitchen** (singular). The registered domain intentionally has **gardens** (plural): `sutton-gardens-kitchen.co.uk`.

## Optional asset tooling

Generated assets are committed; visitors and local previews need no image or font libraries. After replacing source photographs, run `node scripts/optimize-images.mjs` with Sharp installed, then `node scripts/apply-responsive-images.mjs` and `npm run check`. The image script also accepts the path to an existing Sharp module as its only argument. It resizes and encodes without cropping or changing the originals. `docs/image-optimization.json` records dimensions and byte sizes.

For font conversion, `scripts/optimize-fonts.py` requires FontTools and Brotli in your Python environment. It preserves all glyphs and leaves the TTF sources and licenses intact. `docs/font-optimization.json` records the validated conversion.

## Hosting and custom domain

Any static host can serve `dist/`. Sites hosting is configured by `.openai/hosting.json`. Only the public `dist/` directory should be served; do not publish the project root.

Once registration is complete, connect the domain to the chosen host using that host’s exact DNS records. Serve `dist/` publicly over HTTPS and configure HTTP/www aliases to redirect to `https://sutton-gardens-kitchen.co.uk/`. The repository already targets this domain. If the intended public origin changes, update it with:

```sh
node scripts/set-site-url.mjs https://sutton-gardens-kitchen.co.uk
npm run check
```

The helper updates canonical links, structured data, sharing URLs, robots.txt and the sitemap together. Recheck and deploy after any URL change.

See [Google Business Profile notes](docs/google-business-launch.md) for the café’s listing link and business details.

See the [SEO review and launch checks](docs/seo-review-2026-09-12.md) for completed improvements, measured asset savings and the remaining public-site checks.
