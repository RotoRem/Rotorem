import fs from 'fs';
import path from 'path';

const dir = path.join(import.meta.dirname, '..', 'src/pages/en/services/sofia');
const pairs = [
  ['Visit and diagnosis', 'Visit and diagnostics'],
  ['"price": "After diagnosis"', '"price": "After diagnostics"'],
  ["price: 'After diagnosis'", "price: 'After diagnostics'"],
  ['Customer reviews of RotoRem', 'RotoRem customer reviews'],
  ['{item.brand} – Пералня', '{item.brand} – Washing machine'],
  ['{realCases[2].brand} – Пералня', '{realCases[2].brand} – Washing machine'],
  ['{item.brand} – Сушилня', '{item.brand} – Dryer'],
  ['{realCases[2].brand} – Сушилня', '{realCases[2].brand} – Dryer'],
  ['{item.brand} – Съдомиялна', '{item.brand} – Dishwasher'],
  ['{realCases[2].brand} – Съдомиялна', '{realCases[2].brand} – Dishwasher'],
  ['{item.brand} – Фурна', '{item.brand} – Oven'],
  ['{realCases[2].brand} – Фурна', '{realCases[2].brand} – Oven'],
  ['{item.brand} – Бойлер', '{item.brand} – Water heater'],
  ['{realCases[2].brand} – Бойлер', '{realCases[2].brand} – Water heater'],
  ['"brand": "Бойлер"', '"brand": "Water heater"'],
];

for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('-repair.astro'))) {
  const fp = path.join(dir, f);
  let c = fs.readFileSync(fp, 'utf8');
  for (const [a, b] of pairs) c = c.split(a).join(b);
  fs.writeFileSync(fp, c);
  console.log('polished', f);
}
