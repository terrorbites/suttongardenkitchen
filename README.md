# Sutton Garden Kitchen

A fast, responsive website for Emma’s horse box café in Sutton, Norfolk, with a colourful 1970s hippy feel: teal, burgundy and mustard, chunky retro typography, real café photography and a welcoming voice.

## Website

- Intended custom domain: **https://sutton-gardens-kitchen.co.uk** (registered by the owner; DNS connection required).
- Hosted address: https://sutton-garden-kitchen.honey-okapi-4832.chatgpt.site/ (availability and audience depend on deployment).
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

This validates local assets, section links, descriptive filenames, business information and search metadata. Interactive controls and responsive layouts are also checked in a browser during delivery.

## What’s included

- Responsive desktop and mobile layouts, with a compact navigation menu and mobile call/directions bar.
- Text-based breakfast, lunch and drinks menus, always visible with every item and price in the page — no accordions or tabs.
- Emma’s introduction and original portrait.
- Photo gallery with keyboard navigation, Escape-to-close and focus restoration.
- Address, Wednesday–Saturday 9am–2pm hours, tap-to-call and Google Maps address-based directions.
- CafeOrCoffeeShop structured data, canonical URL, page metadata, sitemap, robots.txt and a custom favicon.
- Locally hosted Shrikhand and Fraunces fonts with their SIL Open Font Licenses.
- All 25 supplied photos copied with descriptive filenames; original Desktop files were preserved. `docs/photo-filenames.json` records every original-to-new filename.

## Edit content

Edit `dist/index.html`, `dist/styles.css`, `dist/hippy.css` and `dist/app.js`. The colourful theme lives in `hippy.css`; `styles.css` supplies the underlying layout. Keep visible opening hours, phone and address in sync with the JSON-LD near the top of `index.html`. Prices were transcribed from the supplied chalkboard photographs and should be checked with Emma before launch. Older phone numbers embedded within original photographs are not used for contact links.

To import the original pictures again, use:

```sh
node scripts/import-photos.mjs "PATH_TO_ORIGINAL_PHOTO_FOLDER"
```

The business name is **Sutton Garden Kitchen** (singular). The registered domain intentionally has **gardens** (plural): `sutton-gardens-kitchen.co.uk`.

## Hosting and custom domain

Any static host can serve `dist/`. Sites hosting is configured by `.openai/hosting.json`. Only the public `dist/` directory should be served; do not publish the project root.

Connect the registered domain to the chosen host using the exact DNS records that host supplies. Do not guess IP addresses. Keep the current hosted canonical until the custom domain resolves over HTTPS. Once it does, run:

```sh
node scripts/set-site-url.mjs https://sutton-gardens-kitchen.co.uk
npm run check
```

Then commit and redeploy. This updates canonical links, structured data, sharing URLs, robots.txt and the sitemap together. Choose one primary hostname and redirect other hostnames to it through hosting settings where supported.

See [Google launch notes](docs/google-business-launch.md) for preparing the café’s Google Business Profile.
