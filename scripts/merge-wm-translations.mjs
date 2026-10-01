import fs from 'fs';
import path from 'path';

const root = path.join(import.meta.dirname, '..');
const pendingPath = path.join(import.meta.dirname, 'pending-translations.json');
const pending = JSON.parse(fs.readFileSync(pendingPath, 'utf8'));

function extractQuoted(content) {
  const re = /(['"])((?:\\.|(?!\1).)*)\1/g;
  const out = [];
  let m;
  while ((m = re.exec(content))) out.push(m[2]);
  return out;
}

function pairs(bgFile, enFile) {
  const bg = fs.readFileSync(path.join(root, 'src/pages/services', bgFile), 'utf8');
  const en = fs.readFileSync(path.join(root, 'src/pages/en/services', enFile), 'utf8');
  const b = extractQuoted(bg);
  const e = extractQuoted(en);
  const o = {};
  for (let i = 0; i < Math.min(b.length, e.length); i++) o[b[i]] = e[i];
  return o;
}

const map = {
  ...pairs('washing-machine-repair.astro', 'washing-machine-repair.astro'),
  ...pairs('dryer-repair.astro', 'dryer-repair.astro'),
};

for (const k of Object.keys(pending)) {
  if (map[k] && !String(map[k]).includes('MYMEMORY')) pending[k] = map[k];
}
fs.writeFileSync(path.join(import.meta.dirname, 'complete-translations.json'), JSON.stringify(pending, null, 2));
const filled = Object.values(pending).filter((v) => v && !String(v).includes('MYMEMORY')).length;
console.log('filled', filled, 'of', Object.keys(pending).length);
