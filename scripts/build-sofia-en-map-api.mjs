import fs from 'fs';
import path from 'path';

const root = import.meta.dirname;
const bgStrings = JSON.parse(fs.readFileSync(path.join(root, 'sofia-bg-strings.json'), 'utf8'));
const cachePath = path.join(root, 'sofia-translate-cache.json');
const mapPath = path.join(root, 'sofia-en-map.json');

let cache = {};
if (fs.existsSync(cachePath)) {
  try {
    cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
  } catch {
    cache = {};
  }
}

const SKIP = new Set(['Пералня', 'Сушилня', 'Съдомиялна', 'Фурна', 'Бойлер']);

function isBad(en) {
  if (!en || typeof en !== 'string') return true;
  if (en.includes('MYMEMORY WARNING')) return true;
  if (en.includes('INVALID') || en.includes('QUOTA')) return true;
  return false;
}

async function translate(bg) {
  if (SKIP.has(bg)) return bg;
  if (cache[bg] && !isBad(cache[bg])) return cache[bg];

  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(bg)}&langpair=bg|en`;
  const res = await fetch(url);
  const data = await res.json();
  let en = data.responseData?.translatedText ?? '';
  if (isBad(en)) {
    console.warn('bad translation for', bg.slice(0, 60));
    return null;
  }
  en = en.replace(/\s+/g, ' ').trim();
  cache[bg] = en;
  return en;
}

const map = fs.existsSync(mapPath) ? JSON.parse(fs.readFileSync(mapPath, 'utf8')) : {};

const todo = bgStrings.filter((s) => !map[s] || isBad(map[s]));
console.log('to translate', todo.length, 'of', bgStrings.length);

for (let i = 0; i < todo.length; i++) {
  const bg = todo[i];
  const en = await translate(bg);
  if (en) map[bg] = en;
  if ((i + 1) % 25 === 0) {
    fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));
    fs.writeFileSync(mapPath, JSON.stringify(map, null, 2));
    console.log('progress', i + 1, '/', todo.length);
  }
  await new Promise((r) => setTimeout(r, 350));
}

fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));
fs.writeFileSync(mapPath, JSON.stringify(map, null, 2));
const missing = bgStrings.filter((s) => !map[s]);
console.log('done. map size', Object.keys(map).length, 'missing', missing.length);
