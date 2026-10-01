import fs from 'fs';
import path from 'path';
import translate from 'google-translate-api-x';

const root = import.meta.dirname;
const bgStrings = JSON.parse(fs.readFileSync(path.join(root, 'sofia-bg-strings.json'), 'utf8'));
const cachePath = path.join(root, 'sofia-google-cache.json');
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
const map = fs.existsSync(mapPath) ? JSON.parse(fs.readFileSync(mapPath, 'utf8')) : {};

const todo = bgStrings.filter((s) => !map[s] || map[s].includes('MYMEMORY'));
console.log('todo', todo.length);

async function tr(bg) {
  if (SKIP.has(bg)) return bg;
  if (cache[bg]) return cache[bg];
  const res = await translate(bg, { from: 'bg', to: 'en' });
  const en = res.text.trim();
  cache[bg] = en;
  return en;
}

for (let i = 0; i < todo.length; i++) {
  const bg = todo[i];
  try {
    map[bg] = await tr(bg);
  } catch (e) {
    console.warn('fail', bg.slice(0, 50), e.message);
  }
  if ((i + 1) % 20 === 0) {
    fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));
    fs.writeFileSync(mapPath, JSON.stringify(map, null, 2));
    console.log(i + 1, '/', todo.length);
  }
  await new Promise((r) => setTimeout(r, 200));
}

fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));
fs.writeFileSync(mapPath, JSON.stringify(map, null, 2));
console.log('map entries', Object.keys(map).length);
