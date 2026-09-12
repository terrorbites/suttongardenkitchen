import { readFile, access, readdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import assert from 'node:assert/strict';
const root = resolve(import.meta.dirname, '../dist');
const html = await readFile(join(root, 'index.html'), 'utf8');
const assetManifest = JSON.parse(await readFile(resolve(root, '../docs/image-optimization.json'), 'utf8'));
const variants = new Map(assetManifest.flatMap(asset => asset.variants.map(variant => [variant.file, variant])));
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate element IDs');
let files = 0;
async function checkLocal(reference) {
  const pathname = decodeURIComponent(new URL(reference, 'https://local.test/').pathname);
  await access(join(root, pathname));
  files++;
}
for (const match of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
  const reference = match[1];
  if (reference.startsWith('#')) {
    if (reference.length > 1) assert(ids.includes(reference.slice(1)), `Missing anchor ${reference}`);
  } else if (!/^(?:[a-z]+:|\/\/)/i.test(reference)) {
    await checkLocal(reference);
  }
}
for (const image of html.matchAll(/<img\b[^>]*>/g)) {
  assert(/\balt="[^"]*"/.test(image[0]), 'Image missing alternative text');
  assert(/\bwidth="\d+"/.test(image[0]) && /\bheight="\d+"/.test(image[0]) || image[0].includes('lightbox-image'), 'Image missing dimensions');
  const src = image[0].match(/\bsrc="([^"]+)"/)?.[1];
  const variant = variants.get(src);
  if (variant) {
    assert(image[0].includes(`width="${variant.width}"`) && image[0].includes(`height="${variant.height}"`), `Wrong intrinsic dimensions: ${src}`);
    assert(/\bsizes="[^"]+"/.test(image[0]), `Missing responsive sizes: ${src}`);
  }
  for (const candidate of (image[0].match(/\bsrcset="([^"]+)"/)?.[1] ?? '').split(',').filter(Boolean)) {
    const [file, descriptor] = candidate.trim().split(/\s+/);
    await checkLocal(file);
    assert.equal(descriptor, `${variants.get(file)?.width}w`, `Wrong srcset width: ${file}`);
  }
}
assert.equal((html.match(/<h1\b/g) || []).length, 1);
const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
const schema = schemas.find(item => item['@type'] === 'CafeOrCoffeeShop');
const website = schemas.find(item => item['@type'] === 'WebSite');
assert.equal(schema['@type'], 'CafeOrCoffeeShop');
assert.equal(schema.name, 'Sutton Garden Kitchen');
assert.equal(schema.telephone, '+447342269963');
assert.equal(schema.address.postalCode, 'NR12 9RA');
assert.deepEqual(schema.openingHoursSpecification[0].dayOfWeek, ['Wednesday','Thursday','Friday','Saturday']);
assert.equal(schema.openingHoursSpecification[0].opens, '09:00');
assert.equal(schema.openingHoursSpecification[0].closes, '14:00');
assert(!html.includes('07774655251'), 'Outdated phone number');
const canonical = html.match(/rel="canonical" href="([^"]+)"/)[1];
assert.equal(canonical, schema.url);
assert.equal(website.url, canonical);
assert.equal(website.name, schema.name);
assert.equal(website.publisher['@id'], schema['@id']);
assert.equal(html.match(/property="og:url" content="([^"]+)"/)[1], canonical);
assert.equal(html.match(/property="og:site_name" content="([^"]+)"/)[1], schema.name);
assert.equal(schema.hasMenu, canonical + '#menu');
assert.equal(schema.menu, schema.hasMenu);
for (const source of [schema.logo, ...[schema.image].flat()]) {
  assert.equal(new URL(source).origin, new URL(canonical).origin);
  await checkLocal(source);
}
assert(!/localhost|127\.0\.0\.1|\.chatgpt\.site/.test(html), 'Preview URL in production HTML');
assert(!/noindex|nofollow/i.test(html.match(/<head>([\s\S]*?)<\/head>/)[1]), 'Unexpected crawler exclusion');
assert(!html.includes('<details'), 'The café menus must remain visible');
const hero = html.match(/<img\b[^>]*class="hero-photo"[^>]*>/)[0];
assert(hero.includes('fetchpriority="high"') && !hero.includes('loading="lazy"'), 'Hero must load eagerly');
const placeholder = html.match(/<img\b[^>]*id="lightbox-image"[^>]*>/)[0];
assert(placeholder.includes('src="data:'), 'Closed lightbox must not fetch a photo');
assert.equal([...html.matchAll(/<a class="gallery-item"[^>]*href="images\//g)].length, 5, 'Gallery originals must be crawlable links');
for (const cssFile of ['styles.css', 'hippy.css']) {
  const css = await readFile(join(root, cssFile), 'utf8');
  for (const match of css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) await checkLocal(match[1]);
  assert(!css.includes('.ttf'), 'Website should load compressed WOFF2 fonts');
}
for (const font of ['fraunces-semibold', 'fraunces-semibold-italic', 'shrikhand-regular']) {
  const data = await readFile(join(root, 'fonts', font + '.woff2'));
  assert.equal(data.subarray(0, 4).toString(), 'wOF2', `Invalid WOFF2: ${font}`);
}
assert((await readFile(join(root, 'sitemap.xml'), 'utf8')).includes(canonical));
assert((await readFile(join(root, 'robots.txt'), 'utf8')).includes(canonical + 'sitemap.xml'));
const photos = await readdir(join(root, 'images'));
assert.equal(photos.length, 25, 'Expected 25 renamed photos');
assert(photos.every(name => /^[a-z][a-z0-9-]+\.(jpg|png)$/.test(name)), 'Descriptive image filenames');
console.log(`Passed: ${files} local references, responsive image dimensions, crawlable gallery, WOFF2 fonts, navigation, ${photos.length} original photos, business/website schema, visible menus, hours, phone and canonical metadata.`);
