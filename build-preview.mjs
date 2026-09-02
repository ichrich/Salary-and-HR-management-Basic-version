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
// No <base>: it would send #section links away from the preview document.
html = html.replace(/(src|href)="((?:zup-basic\/|style)[^"]+)"/g, '$1="../$2"');
fs.writeFileSync(path.join(directory, 'preview.html'), html);
console.log('Built zup-basic/preview.html with existing public site includes. Production file unchanged.');
