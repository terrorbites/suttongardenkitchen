import { createRequire } from 'node:module';
import { mkdir, stat, writeFile } from 'node:fs/promises';
import { resolve, join, basename, extname } from 'node:path';

// Optional argument: path to an existing Sharp installation. Not needed at runtime.
const require = createRequire(import.meta.url);
const sharp = require(process.argv[2] || 'sharp');
const project = resolve(import.meta.dirname, '..');
const dist = join(project, 'dist');
const sources = [
  'brand/sutton-garden-kitchen-logo.png',
  'images/horse-box-cafe-marquee-interior.jpg',
  'images/colourful-eye-painting.jpg',
  'images/full-english-breakfast.jpg',
  'images/toasted-sandwich-with-salad.jpg',
  'images/strawberry-and-cream-sponge-cake.jpg',
  'images/emma-sutton-garden-kitchen-owner.jpg',
  'images/marquee-piano-and-artwork.jpg',
  'images/cosy-marquee-sofa-and-guitar.jpg',
  'images/book-swap-and-guitar.jpg',
  'images/quirky-gifts-and-macrame-mirror.jpg',
  'images/cafe-entrance-behind-sutton-building-supplies.jpg',
];

await mkdir(join(dist, 'media'), { recursive: true });
const manifest = [];
for (const source of sources) {
  const path = join(dist, source);
  const { width, height } = await sharp(path).metadata();
  const logo = source.startsWith('brand/');
  const maxWidth = Math.min(width, logo ? 900 : 1440);
  const widths = [...new Set([...(logo ? [300, 600] : [360, 720, 1080]).filter(w => w < maxWidth), maxWidth])];
  const stem = basename(source, extname(source));
  const variants = [];
  for (const targetWidth of widths) {
    const file = `media/${stem}-${targetWidth}.webp`;
    // Resize and encode only: no crop, retouching, upscaling or source replacement.
    const info = await sharp(path).resize({ width: targetWidth, withoutEnlargement: true })
      .webp({ quality: logo ? 90 : 80, effort: 6 }).toFile(join(dist, file));
    variants.push({ file, width: info.width, height: info.height, bytes: info.size });
  }
  manifest.push({ source, width, height, originalBytes: (await stat(path)).size, variants });
}
await writeFile(join(project, 'docs/image-optimization.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`Created ${manifest.reduce((sum, item) => sum + item.variants.length, 0)} WebP variants from ${sources.length} preserved originals.`);
