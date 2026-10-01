import fs from 'fs';
import path from 'path';

const bgStringsPath = path.join(import.meta.dirname, 'sofia-bg-strings.json');
const mapPath = path.join(import.meta.dirname, 'sofia-en-map.json');

const bgStrings = JSON.parse(fs.readFileSync(bgStringsPath, 'utf8'));
let map = {};
if (fs.existsSync(mapPath)) {
  map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
}

const CYR = /[А-Яа-яЁё]/;
const BAD = /MYMEMORY|USAGE.?LIMIT|WARNING:/i;

async function translate(text) {
  await new Promise((r) => setTimeout(r, 1200));
  const res = await fetch('https://translate.argosopentech.com/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: text, source: 'bg', target: 'en', format: 'text' }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  let out = json.translatedText ?? text;
  if (BAD.test(out)) throw new Error('bad translation response');
  out = out.replace(/Roto\s*Rem/gi, 'RotoRem').replace(/Rotorem/gi, 'RotoRem');
  return out;
}

const pending = bgStrings.filter((s) => !map[s] || BAD.test(map[s]) || CYR.test(map[s]));
console.log('Total', bgStrings.length, 'pending', pending.length);

for (let i = 0; i < pending.length; i++) {
  const s = pending[i];
  try {
    map[s] = await translate(s);
    fs.writeFileSync(mapPath, JSON.stringify(map, null, 2));
    if ((i + 1) % 20 === 0) console.log(i + 1, '/', pending.length);
  } catch (e) {
    console.error('Failed at', i, s.slice(0, 60), e.message);
    fs.writeFileSync(mapPath, JSON.stringify(map, null, 2));
    process.exit(1);
  }
}

console.log('Done. Map size', Object.keys(map).length);
