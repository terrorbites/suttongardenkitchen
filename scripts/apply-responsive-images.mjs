import { readFile, writeFile } from 'node:fs/promises';
import { resolve, join, basename, extname } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const file = join(root, 'dist/index.html');
const assets = JSON.parse(await readFile(join(root, 'docs/image-optimization.json'), 'utf8'));
let html = await readFile(file, 'utf8');

// Gallery links still open the original photographs when JavaScript is unavailable.
html = html.replace(/<button class="gallery-item" type="button"([^>]+)>([\s\S]*?)<\/button>/g, (_, attributes, content) => {
  const source = content.match(/\bsrc="([^"]+)"/)[1];
  const asset = assets.find(item => item.source === source || item.variants.some(v => v.file === source));
  if (!asset) throw new Error(`No gallery asset for ${source}`);
  return `<a class="gallery-item" href="${asset.source}" data-image-width="${asset.width}" data-image-height="${asset.height}"${attributes}>${content}</a>`;
});

html = html.replace(/<img\b[^>]*>/g, (tag, offset) => {
  if (tag.includes('id="lightbox-image"')) {
    return '<img id="lightbox-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="" width="1" height="1" decoding="async">';
  }
  const source = tag.match(/\bsrc="([^"]+)"/)?.[1];
  const asset = assets.find(item => item.source === source || item.variants.some(v => v.file === source));
  if (!asset) return tag;
  const stem = basename(asset.source, extname(asset.source));
  const isPostcard = stem === 'colourful-eye-painting' && html.slice(Math.max(0, offset - 40), offset).includes('art-postcard');
  let sizes = '(max-width: 800px) calc(100vw - 100px), (max-width: 900px) 40vw, 360px';
  if (asset.source.startsWith('brand/')) sizes = '(max-width: 380px) calc(100vw - 160px), (max-width: 800px) 220px, (max-width: 900px) 240px, 300px';
  else if (stem === 'horse-box-cafe-marquee-interior') sizes = '(max-width: 800px) calc(100vw - 88px), (max-width: 1360px) 44vw, 580px';
  else if (isPostcard) sizes = '(max-width: 380px) 87px, (max-width: 800px) 102px, (max-width: 1150px) 108px, 128px';
  else if (stem === 'emma-sutton-garden-kitchen-owner') sizes = '(max-width: 520px) calc(100vw - 68px), (max-width: 800px) 452px, (max-width: 1360px) 40vw, 530px';
  else if (stem === 'cafe-entrance-behind-sutton-building-supplies') sizes = '(max-width: 800px) calc(100vw - 40px), 360px';
  else if (['colourful-eye-painting', 'marquee-piano-and-artwork', 'cosy-marquee-sofa-and-guitar', 'book-swap-and-guitar', 'quirky-gifts-and-macrame-mirror'].includes(stem)) sizes = '(max-width: 800px) 42vw, (max-width: 1150px) 27vw, 220px';
  const preferredWidth = isPostcard ? 360 : asset.source.startsWith('brand/') ? 600 : 720;
  const fallback = asset.variants.find(v => v.width >= preferredWidth) ?? asset.variants.at(-1);
  const srcset = asset.variants.map(v => `${v.file} ${v.width}w`).join(', ');
  const cleaned = tag.replace(/\s(?:src|srcset|sizes|width|height|decoding)="[^"]*"/g, '');
  return cleaned.replace(/>$/, ` src="${fallback.file}" srcset="${srcset}" sizes="${sizes}" width="${fallback.width}" height="${fallback.height}" decoding="async">`);
});
await writeFile(file, html);
console.log('Updated responsive images and crawlable full-size gallery links.');
