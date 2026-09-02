import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(directory);
const filename = 'software-1c_business1c_zrp_uprav_personal_base.html';
const origin = 'https://ekburg.1c-center.net/';
let html = fs.readFileSync(path.join(root, filename), 'utf8');
html = html.replace('content="index,follow"', 'content="noindex,nofollow"');
html = html.replace(/<!--#include file="([^"]+)"-->/g, (_, file) => {
  let fragment = fs.readFileSync(path.join(directory, 'reference', path.basename(file)), 'utf8');
  fragment = fragment.replace(/src="images\/(branding(?:_small|_medium)?\.jpg)"/g, 'src="zup-basic/reference/images/$1"');
  fragment = fragment.replace(/href="(?!https?:|tel:|mailto:|#|javascript:)([^"]+)"/g, (_, href) => `href="${new URL(href, origin).href}"`);
  return fragment;
});
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
