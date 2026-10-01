import fs from 'fs';
import path from 'path';

const root = path.join(import.meta.dirname, '..');
const enDir = path.join(root, 'src/pages/en/services');
const bgDir = path.join(root, 'src/pages/services');

function extractQuoted(content) {
  const re = /(['"])((?:\\.|(?!\1).)*)\1/g;
  const out = [];
  let m;
  while ((m = re.exec(content))) out.push(m[2]);
  return out;
}

const sources = [
  'washing-machine-repair.astro',
  'dryer-repair.astro',
  'dishwasher-repair.astro',
  'oven-repair.astro',
];

const map = {};
for (const f of sources) {
  const bg = fs.readFileSync(path.join(bgDir, f), 'utf8');
  const en = fs.readFileSync(path.join(enDir, f), 'utf8');
  const b = extractQuoted(bg);
  const e = extractQuoted(en);
  for (let i = 0; i < Math.min(b.length, e.length); i++) {
    if (/[А-Яа-я]/.test(b[i]) && !/[А-Яа-я]/.test(e[i])) map[b[i]] = e[i];
  }
}

const targets = ['boiler-repair.astro', 'electrical-services.astro'];
const keys = Object.keys(map).sort((a, b) => b.length - a.length);

for (const file of targets) {
  const fp = path.join(enDir, file);
  let c = fs.readFileSync(fp, 'utf8');
  c = c.replace(/import \{ getLangFromUrl \} from '\.\.\/\.\.\/\.\.\/i18n\/utils';\n/g, '');
  c = c.replace(/const lang = getLangFromUrl\(Astro\.url\);\n/g, "const lang = 'en';\n");
  for (const k of keys) {
    if (c.includes(k)) c = c.split(k).join(map[k]);
  }
  fs.writeFileSync(fp, c);
  console.log(file, 'remaining', (c.match(/[А-Яа-я]/g) || []).length);
}

fs.writeFileSync(path.join(import.meta.dirname, 'merged-map-size.txt'), String(Object.keys(map).length));
