import fs from 'fs';
import path from 'path';

const mapPath = path.join(import.meta.dirname, 'sofia-en-map.json');
const map = new Map(Object.entries(JSON.parse(fs.readFileSync(mapPath, 'utf8'))));

const enRoot = path.join(import.meta.dirname, '..', 'src/pages/en/services/sofia');
const files = [
  'washing-machine-repair.astro',
  'dryer-repair.astro',
  'dishwasher-repair.astro',
  'oven-repair.astro',
  'boiler-repair.astro',
];

const CYR = /[А-Яа-яЁё]/;
const entries = [...map.entries()].sort((a, b) => b[0].length - a[0].length);

function replaceAll(text) {
  for (const [bg, en] of entries) {
    if (text.includes(bg)) text = text.split(bg).join(en);
  }
  return text;
}

for (const file of files) {
  const fp = path.join(enRoot, file);
  let c = fs.readFileSync(fp, 'utf8');
  c = replaceAll(c);
  fs.writeFileSync(fp, c, 'utf8');
  const left = (c.match(CYR) || []).length;
  console.log(file, 'cyrillic chars left:', left);
}
