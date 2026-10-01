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

const sources = ['washing-machine-repair.astro', 'dryer-repair.astro', 'dishwasher-repair.astro', 'oven-repair.astro', 'boiler-repair.astro'];
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

const fp = path.join(enDir, 'electrical-services.astro');
let c = fs.readFileSync(fp, 'utf8');
c = c.replace(/const lang = getLangFromUrl\(Astro\.url\);\n/, "const lang = 'en';\n");
c = c.replace("getServiceFaqItems('/services/electrical-services/')", "getServiceFaqItems('/en/services/electrical-services/')");
c = c.replace(/href="\/services\//g, 'href="/en/services/');
c = c.replace(/href="\/reviews\/"/g, 'href="/en/reviews/"');
c = c.replace(/РотоРем/g, 'RotoRem');
const keys = Object.keys(map).sort((a, b) => b.length - a.length);
for (const k of keys) {
  if (c.includes(k)) c = c.split(k).join(map[k]);
}
// UI labels
const ui = [
  ['Диагностика във Варна', 'Diagnostics in Varna'],
  ['Телефон', 'Phone'],
  ['Обадете се за посещение', 'Call to schedule a visit'],
  ['Отзиви от клиенти на РотоRem', 'RotoRem customer reviews'],
  ['<span class="font-semibold">Проблем:</span>', '<span class="font-semibold">Issue:</span>'],
  ['<span class="font-semibold">Район:</span>', '<span class="font-semibold">Area:</span>'],
  ['<span class="font-semibold">Диагностика:</span>', '<span class="font-semibold">Diagnosis:</span>'],
  ['<span class="font-semibold">Ремонт:</span>', '<span class="font-semibold">Repair:</span>'],
  ['Често задавани въпроси', 'Frequently asked questions'],
  ['Услуга', 'Service'],
  ['Цена', 'Price'],
  ['Част / система', 'Part / system'],
  ['Често свързан проблем', 'Common related issue'],
  ['Електро услуги на адрес във Варна', 'On-site electrical services in Varna'],
  ['Посещение и диагностика във Варна', 'Visit and diagnostics in Varna'],
  ['По договаряне', 'By agreement'],
];
for (const [a, b] of ui) c = c.split(a).join(b);

fs.writeFileSync(fp, c);
console.log('remaining', (c.match(/[А-Яа-я]/g) || []).length, 'map size', Object.keys(map).length);
