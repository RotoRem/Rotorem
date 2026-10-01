import fs from 'fs';
import path from 'path';

const root = path.resolve('c:/Users/loran/Desktop/my/Rotorem');

const pairs = [
  ['washing-machine-repair', 'washing-machine-repair'],
  ['dryer-repair', 'dryer-repair'],
  ['dishwasher-repair', 'dishwasher-repair'],
  ['oven-repair', 'oven-repair'],
  ['boiler-repair', 'boiler-repair'],
];

const blogMap = [
  ['/blog/koga-e-opasen-boilerat/', '/en/blog/when-is-a-water-heater-dangerous/'],
  ['/blog/stranen-shum-ili-pukane-ot-boilera-na-kakvo-mozhe-da-se-dalzhi/', '/en/blog/water-heater-popping-noises-causes-and-warning-signs/'],
  ['/blog/sushilnyata-ne-sabira-voda-5-prichini/', '/en/blog/dryer-not-collecting-water-common-container-reservoir-problems/'],
  ['/blog/peralnyata-ne-tsentrofugira-prichini/', '/en/blog/washing-machine-wont-spin-causes/'],
  ['/blog/kak-da-pochistim-peralnyata-profesionalno/', '/en/blog/how-to-clean-a-washing-machine-professionally/'],
  ['/blog/chesto-sreshtani-problemi-s-furni-gorenje/', '/en/blog/the-most-common-gorenje-oven-problems/'],
];

for (const [name] of pairs) {
  const src = path.join(root, 'src/pages/services/sofia', `${name}.astro`);
  const dest = path.join(root, 'src/pages/en/services/sofia', `${name}.astro`);
  let text = fs.readFileSync(src, 'utf8');

  text = text.replace(
    /import Layout from '\.\.\/\.\.\/\.\.\/layouts\/Base\.astro';/,
    "import Layout from '../../../../layouts/Base.astro';",
  );
  text = text.replace(
    /import Reviews from '\.\.\/\.\.\/\.\.\/components\/Reviews\.astro';/,
    "import Reviews from '../../../../components/Reviews.astro';",
  );
  text = text.replace(
    /import \{ getServiceFaqItems \} from '\.\.\/\.\.\/\.\.\/lib\/jsonldOverrides';/,
    "import { getServiceFaqItems } from '../../../../lib/jsonldOverrides';",
  );
  text = text.replace(
    /\r?\nimport \{ getLangFromUrl \} from '\.\.\/\.\.\/\.\.\/i18n\/utils';\r?\n\r?\nconst lang = getLangFromUrl\(Astro\.url\);\r?\n\r?\n/,
    '\n',
  );
  text = text.replace(
    /import \{ getLangFromUrl \} from '\.\.\/\.\.\/\.\.\/i18n\/utils';/,
    "import { getLangFromUrl } from '../../../../i18n/utils';",
  );
  text = text.replace(/\r?\nimport \{ getLangFromUrl[^]*?\r?\n\r?\nconst lang = getLangFromUrl\(Astro\.url\);\r?\n\r?\n/, '\n');
  text = text.replace(
    /getServiceFaqItems\('\/services\/sofia\//g,
    "getServiceFaqItems('/en/services/sofia/",
  );
  text = text.replace(/href="\/services\/sofia\//g, 'href="/en/services/sofia/');
  for (const [bg, en] of blogMap) {
    text = text.split(bg).join(en);
  }

  fs.writeFileSync(dest, text);
  console.log('prepped', name);
}
