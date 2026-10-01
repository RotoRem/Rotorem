import fs from 'fs';
import path from 'path';

const pairFiles = [
  'pairs/common.mjs',
  'pairs/washing-machine.mjs',
  'pairs/dryer.mjs',
  'pairs/dishwasher.mjs',
  'pairs/oven.mjs',
  'pairs/boiler.mjs',
];

const pairs = [];
for (const f of pairFiles) {
  const mod = await import(new URL(f, import.meta.url));
  pairs.push(...mod.default);
}
pairs.sort((a, b) => b[0].length - a[0].length);

const dir = path.join(import.meta.dirname, '..', 'src/pages/en/services/sofia');
const CYR = /[А-Яа-яЁё]/;

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('-repair.astro'))) {
  let c = fs.readFileSync(path.join(dir, file), 'utf8');
  for (const [bg, en] of pairs) {
    if (c.includes(bg)) c = c.split(bg).join(en);
  }
  fs.writeFileSync(path.join(dir, file), c, 'utf8');
  console.log(file, 'cyrillic chars left:', (c.match(CYR) || []).length);
}
