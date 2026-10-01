import fs from 'fs';
const c = fs.readFileSync(
  new URL('../src/pages/services/sofia/boiler-repair.astro', import.meta.url),
  'utf8',
);
const CYR = /[А-Яа-яЁё]/;
const set = new Set();
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
console.log([...set].sort().join('\n---\n'));
console.error('count', set.size);
