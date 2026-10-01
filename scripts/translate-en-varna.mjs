import fs from 'fs';
import path from 'path';

const root = path.join(import.meta.dirname, '..', 'src/pages/en/services');
const files = [
  'washing-machine-repair.astro',
  'dryer-repair.astro',
  'dishwasher-repair.astro',
  'oven-repair.astro',
  'boiler-repair.astro',
  'electrical-services.astro',
];

const CYR = /[А-Яа-яЁё]/;
const cache = new Map();

async function translate(text) {
  const t = text.trim();
  if (!t || !CYR.test(t)) return text;
  if (cache.has(t)) return cache.get(t);
  await new Promise((r) => setTimeout(r, 350));
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(t)}&langpair=bg|en`;
  const res = await fetch(url);
  const json = await res.json();
  const out = json.responseData?.translatedText ?? t;
  cache.set(t, out);
  return out;
}

function translateQuotedStrings(block, syncTranslate) {
  const pattern = /(['"])((?:\\.|(?!\1).)*)\1/g;
  return block.replace(pattern, (full, q, s) => {
    if (!CYR.test(s)) return full;
    return q + syncTranslate(s) + q;
  });
}

for (const file of files) {
  const fp = path.join(root, file);
  let c = fs.readFileSync(fp, 'utf8');

  c = c.replace(/const lang = getLangFromUrl\(Astro\.url\);\n/g, "const lang = 'en';\n");
  c = c.replace(/href="\/services\//g, 'href="/en/services/');

  const parts = c.split('---');
  if (parts.length < 3) continue;

  const front = parts[1];
  const body = parts.slice(2).join('---');

  const strings = new Set();
  const pattern = /(['"])((?:\\.|(?!\1).)*)\1/g;
  for (const block of [front, body]) {
    let m;
    const re = new RegExp(pattern.source, 'g');
    while ((m = re.exec(block))) {
      if (CYR.test(m[2])) strings.add(m[2]);
    }
  }

  console.log(file, 'strings to translate:', strings.size);
  for (const s of strings) {
    await translate(s);
  }

  const map = (s) => cache.get(s) ?? s;
  parts[1] = translateQuotedStrings(front, map);
  const newBody = translateQuotedStrings(body, map);
  fs.writeFileSync(fp, parts[0] + '---' + parts[1] + '---' + newBody, 'utf8');
  console.log('Done', file);
}

console.log('Cache size', cache.size);
