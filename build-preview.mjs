import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(directory);
const filename = 'software-1c_business1c_zrp_uprav_personal_base.html';
let html = fs.readFileSync(path.join(root, filename), 'utf8');
html = html.replace('content="index,follow"', 'content="noindex,nofollow"');
// Keep the published folder standalone, including under a GitHub Pages project URL.
// No <base>: section anchors must remain on this document.
html = html.replace(/(src|href)="zup-basic\/([^"]+)"/g, '$1="$2"');
for (const stylesheet of ['style.css', 'style-w3.css', 'style-after-w3.css']) {
  const css = fs.readFileSync(path.join(root, stylesheet), 'utf8')
    .replaceAll('url(images/branding.svg)', 'url(reference/images/branding.jpg)');
  fs.writeFileSync(path.join(directory, stylesheet), css);
}
fs.writeFileSync(path.join(directory, 'index.html'), html);
console.log('Built standalone zup-basic/index.html for GitHub Pages. Production file unchanged.');
