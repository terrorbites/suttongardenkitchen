import { readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
const newUrl = new URL(process.argv[2]);
if (newUrl.protocol !== 'https:' || newUrl.pathname !== '/' || newUrl.search || newUrl.hash || newUrl.username || newUrl.password) throw new Error('Pass a bare HTTPS site origin, e.g. https://sutton-gardens-kitchen.co.uk');
const root = resolve(import.meta.dirname, '../dist');
const html = await readFile(join(root, 'index.html'), 'utf8');
const oldOrigin = new URL(html.match(/rel="canonical" href="([^"]+)"/)[1]).origin;
for (const file of ['index.html', 'sitemap.xml', 'robots.txt']) {
  const path = join(root, file);
  await writeFile(path, (await readFile(path, 'utf8')).replaceAll(oldOrigin, newUrl.origin));
}
console.log(`Updated canonical, business schema, sharing URLs, robots and sitemap to ${newUrl.origin}.`);
