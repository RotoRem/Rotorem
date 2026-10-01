import fs from 'fs';
import path from 'path';

const bgDir = path.join(import.meta.dirname, '..', 'src/pages/services');
const files = ['boiler-repair.astro', 'dishwasher-repair.astro', 'oven-repair.astro', 'electrical-services.astro'];
const CYR = /[А-Яа-яЁё]/;
const re = /(['"])((?:\\.|(?!\1).)*)\1/g;
const set = new Set();

for (const f of files) {
  const c = fs.readFileSync(path.join(bgDir, f), 'utf8');
  let m;
  while ((m = re.exec(c))) {
    if (CYR.test(m[2])) set.add(m[2]);
  }
}

const wmEn = fs.readFileSync(path.join(import.meta.dirname, '..', 'src/pages/en/services/washing-machine-repair.astro'), 'utf8');
const wmBg = fs.readFileSync(path.join(bgDir, 'washing-machine-repair.astro'), 'utf8');
const bgS = [];
const enS = [];
let m;
while ((m = re.exec(wmBg))) bgS.push(m[2]);
re.lastIndex = 0;
while ((m = re.exec(wmEn))) enS.push(m[2]);
const map = {};
for (let i = 0; i < Math.min(bgS.length, enS.length); i++) {
  if (CYR.test(bgS[i]) && !CYR.test(enS[i])) map[bgS[i]] = enS[i];
}

const out = {};
for (const s of [...set].sort()) {
  out[s] = map[s] ?? '';
}

fs.writeFileSync(path.join(import.meta.dirname, 'pending-translations.json'), JSON.stringify(out, null, 2));
console.log('Unique strings:', set.size, 'pre-filled:', Object.values(out).filter(Boolean).length);
