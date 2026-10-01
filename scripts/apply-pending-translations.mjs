import fs from 'fs';
import path from 'path';

const mapPath = path.join(import.meta.dirname, 'complete-translations.json');
const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
const enDir = path.join(import.meta.dirname, '..', 'src/pages/en/services');
const files = ['boiler-repair.astro', 'dishwasher-repair.astro', 'oven-repair.astro', 'electrical-services.astro'];

const keys = Object.keys(map).sort((a, b) => b.length - a.length);
for (const file of files) {
  const fp = path.join(enDir, file);
  let c = fs.readFileSync(fp, 'utf8');
  c = c.replace(/const lang = getLangFromUrl\(Astro\.url\);\n/g, "const lang = 'en';\n");
  c = c.replace(/import \{ getLangFromUrl \} from '\.\.\/\.\.\/\.\.\/i18n\/utils';\n/g, '');
  for (const k of keys) {
    const v = map[k];
    if (v && c.includes(k)) c = c.split(k).join(v);
  }
  fs.writeFileSync(fp, c);
  const rem = (c.match(/[А-Яа-яЁё]/g) || []).length;
  console.log(file, 'remaining cyrillic:', rem);
}
