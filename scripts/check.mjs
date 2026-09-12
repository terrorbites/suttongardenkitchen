import { readFile, access, readdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import assert from 'node:assert/strict';
const root = resolve(import.meta.dirname, '../dist');
const html = await readFile(join(root, 'index.html'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate element IDs');
let files = 0;
for (const match of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
  const reference = match[1];
  if (reference.startsWith('#')) {
    if (reference.length > 1) assert(ids.includes(reference.slice(1)), `Missing anchor ${reference}`);
  } else if (!/^(?:[a-z]+:|\/\/)/i.test(reference)) {
    const pathname = decodeURIComponent(new URL(reference, 'https://local.test/').pathname);
    await access(join(root, pathname));
    files++;
  }
}
for (const image of html.matchAll(/<img\b[^>]*>/g)) {
  assert(/\balt="[^"]*"/.test(image[0]), 'Image missing alternative text');
  assert(/\bwidth="\d+"/.test(image[0]) && /\bheight="\d+"/.test(image[0]) || image[0].includes('lightbox-image'), 'Image missing dimensions');
}
assert.equal((html.match(/<h1\b/g) || []).length, 1);
const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
assert.equal(schema['@type'], 'CafeOrCoffeeShop');
assert.equal(schema.telephone, '+447342269963');
assert.equal(schema.address.postalCode, 'NR12 9RA');
assert.deepEqual(schema.openingHoursSpecification[0].dayOfWeek, ['Wednesday','Thursday','Friday','Saturday']);
assert.equal(schema.openingHoursSpecification[0].opens, '09:00');
assert.equal(schema.openingHoursSpecification[0].closes, '14:00');
assert(!html.includes('07774655251'), 'Outdated phone number');
const canonical = html.match(/rel="canonical" href="([^"]+)"/)[1];
assert.equal(canonical, schema.url);
assert((await readFile(join(root, 'sitemap.xml'), 'utf8')).includes(canonical));
assert((await readFile(join(root, 'robots.txt'), 'utf8')).includes(canonical + 'sitemap.xml'));
const photos = await readdir(join(root, 'images'));
assert.equal(photos.length, 25, 'Expected 25 renamed photos');
assert(photos.every(name => /^[a-z][a-z0-9-]+\.(jpg|png)$/.test(name)), 'Descriptive image filenames');
console.log(`Passed: ${files} local references, navigation anchors, ${photos.length} renamed photos, accessible images, business schema, hours, phone and canonical metadata.`);
