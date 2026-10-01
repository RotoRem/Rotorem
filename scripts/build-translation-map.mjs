import fs from 'fs';
import path from 'path';

const root = path.join(import.meta.dirname, '..');
const bgDir = path.join(root, 'src/pages/services');
const enDir = path.join(root, 'src/pages/en/services');

const CYR = /[А-Яа-яЁё]/;

function extractQuoted(content) {
  const re = /(['"])((?:\\.|(?!\1).)*)\1/g;
  const out = [];
  let m;
  while ((m = re.exec(content))) out.push(m[2]);
  return out;
}

function buildMap(bgFile, enFile) {
  const bg = fs.readFileSync(path.join(bgDir, bgFile), 'utf8');
  const en = fs.readFileSync(path.join(enFile.includes('/') ? enFile : path.join(enDir, enFile)), 'utf8');
  const bgS = extractQuoted(bg);
  const enS = extractQuoted(en);
  const map = {};
  const n = Math.min(bgS.length, enS.length);
  for (let i = 0; i < n; i++) {
    if (CYR.test(bgS[i]) && !CYR.test(enS[i]) && !enS[i].includes('MYMEMORY')) {
      map[bgS[i]] = enS[i];
    }
  }
  return map;
}

const map = {
  ...buildMap('washing-machine-repair.astro', 'washing-machine-repair.astro'),
  ...buildMap('dryer-repair.astro', 'dryer-repair.astro'),
};

function applyMap(file) {
  const fp = path.join(enDir, file);
  let c = fs.readFileSync(fp, 'utf8');
  const keys = Object.keys(map).sort((a, b) => b.length - a.length);
  for (const k of keys) {
    if (c.includes(k)) c = c.split(k).join(map[k]);
  }
  fs.writeFileSync(fp, c);
  const remaining = (c.match(/[А-Яа-яЁё]/g) || []).length;
  console.log(file, 'remaining cyrillic chars:', remaining);
}

for (const f of ['boiler-repair.astro', 'dishwasher-repair.astro', 'oven-repair.astro', 'electrical-services.astro']) {
  applyMap(f);
}

const outPath = path.join(import.meta.dirname, 'translation-map.json');
fs.writeFileSync(outPath, JSON.stringify(map, null, 2));
console.log('Map entries:', Object.keys(map).length);
