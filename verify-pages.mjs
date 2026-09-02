import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const directory = path.dirname(fileURLToPath(import.meta.url));
const html = fs.readFileSync(path.join(directory, 'index.html'), 'utf8');
assert(!html.includes('<!--#include'), 'GitHub Pages cannot expand SSI');
let count = 0;
function checkAsset(value) {
  if (/^(?:[a-z]+:|#|\/\/)/i.test(value)) return;
  const file = path.resolve(directory, value);
  assert(file.startsWith(directory + path.sep), `Outside repository: ${value}`);
  assert(fs.existsSync(file), `Missing asset: ${value}`);
  count++;
}
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) checkAsset(match[1]);
for (const file of ['style.css', 'style-w3.css', 'style-after-w3.css', 'page.css']) {
  const css = fs.readFileSync(path.join(directory, file), 'utf8');
  for (const match of css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) checkAsset(match[1]);
}
assert(!fs.existsSync(path.join(directory, 'preview.html')), 'Old filename remains');
console.log(`PASS: standalone index.html, ${count} local asset references, no SSI.`);
