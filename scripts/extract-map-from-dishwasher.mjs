import fs from 'fs';
import path from 'path';

const root = path.join(import.meta.dirname, '..');
const bg = fs.readFileSync(
  path.join(root, 'src/pages/services/sofia/dishwasher-repair.astro'),
  'utf8',
);
const en = fs.readFileSync(
  path.join(root, 'src/pages/en/services/sofia/dishwasher-repair.astro'),
  'utf8',
);

function extractQuoted(content) {
  const out = [];
  const re = /(['"])((?:\\.|(?!\1).)*)\1/g;
  let m;
  while ((m = re.exec(content))) out.push(m[2]);
  return out;
}

function extractHtmlText(content) {
  const out = [];
  const re = />[^<>{}]+</g;
  let m;
  while ((m = re.exec(content))) {
    const t = m[0].slice(1, -1).trim();
    if (t) out.push(t);
  }
  return out;
}

const bgQ = extractQuoted(bg);
const enQ = extractQuoted(en);
const map = {};

const n = Math.min(bgQ.length, enQ.length);
for (let i = 0; i < n; i++) {
  if (bgQ[i] !== enQ[i]) map[bgQ[i]] = enQ[i];
}

for (const [t, enT] of extractHtmlText(bg).map((t, i) => [t, extractHtmlText(en)[i]])) {
  if (t && enT && t !== enT) map[t] = enT;
}

const mapPath = path.join(import.meta.dirname, 'sofia-en-map.json');
let existing = {};
if (fs.existsSync(mapPath)) existing = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
const merged = { ...existing, ...map };
fs.writeFileSync(mapPath, JSON.stringify(merged, null, 2));
console.log('map entries', Object.keys(merged).length, 'new from dishwasher', Object.keys(map).length);
