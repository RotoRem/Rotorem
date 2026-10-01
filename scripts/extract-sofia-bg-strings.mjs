import fs from 'fs';
import path from 'path';

const root = path.join(import.meta.dirname, '..', 'src/pages/services/sofia');
const files = [
  'washing-machine-repair',
  'dryer-repair',
  'dishwasher-repair',
  'oven-repair',
  'boiler-repair',
];
const CYR = /[А-Яа-яЁё]/;
const set = new Set();

for (const f of files) {
  const c = fs.readFileSync(path.join(root, `${f}.astro`), 'utf8');
  const q = /(['"])((?:\\.|(?!\1).)*)\1/g;
  let m;
  while ((m = q.exec(c))) {
    if (CYR.test(m[2])) set.add(m[2]);
  }
  const html = />[^<>{}]+</g;
  while ((m = html.exec(c))) {
    const t = m[0].slice(1, -1).trim();
    if (CYR.test(t)) set.add(t);
  }
}

const out = path.join(import.meta.dirname, 'sofia-bg-strings.json');
fs.writeFileSync(out, JSON.stringify([...set].sort(), null, 2));
console.log('unique strings', set.size, '->', out);
