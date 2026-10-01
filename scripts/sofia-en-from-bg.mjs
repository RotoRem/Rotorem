import fs from 'fs';
import path from 'path';

const root = path.join(import.meta.dirname, '..');
const bgDir = path.join(root, 'src/pages/services/sofia');
const enDir = path.join(root, 'src/pages/en/services/sofia');
const mapPath = path.join(import.meta.dirname, 'sofia-en-map.json');

const files = [
  'washing-machine-repair',
  'dryer-repair',
  'dishwasher-repair',
  'oven-repair',
  'boiler-repair',
];

const blogMap = [
  ['/blog/koga-e-opasen-boilerat/', '/en/blog/when-is-a-water-heater-dangerous/'],
  [
    '/blog/stranen-shum-ili-pukane-ot-boilera-na-kakvo-mozhe-da-se-dalzhi/',
    '/en/blog/water-heater-popping-noises-causes-and-warning-signs/',
  ],
  [
    '/blog/sushilnyata-ne-sabira-voda-5-prichini/',
    '/en/blog/dryer-not-collecting-water-common-container-reservoir-problems/',
  ],
  ['/blog/peralnyata-ne-tsentrofugira-prichini/', '/en/blog/washing-machine-wont-spin-causes/'],
  ['/blog/kak-da-pochistim-peralnyata-profesionalno/', '/en/blog/how-to-clean-a-washing-machine-professionally/'],
  [
    '/blog/chesto-sreshtani-problemi-s-furni-gorenje/',
    '/en/blog/the-most-common-gorenje-oven-problems/',
  ],
];

function mechanical(text) {
  return text
    .replace(
      /import Layout from '\.\.\/\.\.\/\.\.\/layouts\/Base\.astro';/,
      "import Layout from '../../../../layouts/Base.astro';",
    )
    .replace(
      /import Reviews from '\.\.\/\.\.\/\.\.\/components\/Reviews\.astro';/,
      "import Reviews from '../../../../components/Reviews.astro';",
    )
    .replace(
      /import \{ getServiceFaqItems \} from '\.\.\/\.\.\/\.\.\/lib\/jsonldOverrides';/,
      "import { getServiceFaqItems } from '../../../../lib/jsonldOverrides';",
    )
    .replace(
      /\r?\nimport \{ getLangFromUrl \} from '\.\.\/\.\.\/\.\.\/i18n\/utils';\r?\n\r?\nconst lang = getLangFromUrl\(Astro\.url\);\r?\n\r?\n/,
      '\n',
    )
    .replace(
      /import \{ getLangFromUrl \} from '\.\.\/\.\.\/\.\.\/i18n\/utils';/,
      "import { getLangFromUrl } from '../../../../i18n/utils';",
    )
    .replace(/getServiceFaqItems\('\/services\/sofia\//g, "getServiceFaqItems('/en/services/sofia/")
    .replace(/href="\/services\/sofia\//g, 'href="/en/services/sofia/');
  for (const [bg, en] of blogMap) text = text.split(bg).join(en);
  return text;
}

const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
const entries = Object.entries(map).sort((a, b) => b[0].length - a[0].length);

function translateAll(text) {
  for (const [bg, en] of entries) {
    if (text.includes(bg)) text = text.split(bg).join(en);
  }
  return text;
}

const CYR = /[А-Яа-яЁё]/;

for (const name of files) {
  const bg = fs.readFileSync(path.join(bgDir, `${name}.astro`), 'utf8');
  let en = mechanical(bg);
  en = translateAll(en);
  fs.writeFileSync(path.join(enDir, `${name}.astro`), en, 'utf8');
  const left = (en.match(/[А-Яа-яЁё]/g) || []).length;
  console.log(name, 'remaining cyrillic chars:', left);
}
