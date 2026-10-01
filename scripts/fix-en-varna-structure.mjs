import fs from 'fs';
import path from 'path';

const root = path.join(import.meta.dirname, '..');
const enDir = path.join(root, 'src/pages/en/services');

const files = [
  'washing-machine-repair.astro',
  'dryer-repair.astro',
  'dishwasher-repair.astro',
  'oven-repair.astro',
  'boiler-repair.astro',
  'electrical-services.astro',
];

const blogMap = [
  ['/blog/peralnyata-ne-tsentrofugira-prichini/', '/en/blog/washing-machine-wont-spin-causes/'],
  ['/blog/kak-da-pochistim-peralnyata-profesionalno/', '/en/blog/how-to-clean-a-washing-machine-professionally/'],
  ['/blog/chesto-sreshtani-problemi-s-furni-gorenje/', '/en/blog/the-most-common-gorenje-oven-problems/'],
  ['/blog/koga-e-opasen-boilerat/', '/en/blog/when-is-a-water-heater-dangerous/'],
  ['/blog/stranen-shum-ili-pukane-ot-boilera-na-kakvo-mozhe-da-se-dalzhi/', '/en/blog/water-heater-popping-noises-causes-and-warning-signs/'],
  ['/blog/sushilnyata-ne-sabira-voda-5-prichini/', '/en/blog/dryer-not-collecting-water-common-container-reservoir-problems/'],
];

const ui = [
  ['Сервиз на адрес във Варна', 'On-site service in Varna'],
  ['Електро услуги на адрес във Варна', 'On-site electrical services in Varna'],
  ['Диагностика във Варна', 'Diagnostics in Varna'],
  ['Телефон', 'Phone'],
  ['Обадете се за посещение', 'Call to schedule a visit'],
  ['Отзиви от клиенти на РотоРем', 'RotoRem customer reviews'],
  ['<span class="font-semibold">Проблем:</span>', '<span class="font-semibold">Issue:</span>'],
  ['<span class="font-semibold">Район:</span>', '<span class="font-semibold">Area:</span>'],
  ['<span class="font-semibold">Диагностика:</span>', '<span class="font-semibold">Diagnosis:</span>'],
  ['<span class="font-semibold">Ремонт:</span>', '<span class="font-semibold">Repair:</span>'],
  ['Често задавани въпроси', 'Frequently asked questions'],
  ['Как протича ремонтът', 'How the repair works'],
  ['Как протича работата', 'How the service works'],
  ['Част или система', 'Part or system'],
  ['Част / система', 'Part / system'],
  ['Често свързан проблем', 'Common related issue'],
  ['Често свързан симптом', 'Common related symptom'],
  ['Услуга', 'Service'],
  ['Цена', 'Price'],
  ['РотоРем', 'RotoRem'],
  ['20,46 € / 40 лв.', '20 €'],
  ['Посещение и диагностика във Варна: 20,46 € / 40 лв.', 'Visit and diagnostics in Varna: 20 €'],
  ['Цена за диагностика във Варна: 20 €', 'Diagnostics in Varna: 20 €'],
  ['Посещение и диагностика във Варна: 20 €', 'Visit and diagnostics in Varna: 20 €'],
];

for (const file of files) {
  const fp = path.join(enDir, file);
  let c = fs.readFileSync(fp, 'utf8');

  c = c.replace(
    "import Layout from '../../layouts/Base.astro';",
    "import Layout from '../../../layouts/Base.astro';",
  );
  c = c.replace(
    "import ServicePricing from '../../components/ServicePricing.astro';",
    "import ServicePricing from '../../../components/ServicePricing.astro';",
  );
  c = c.replace(
    "import Reviews from '../../components/Reviews.astro';",
    "import Reviews from '../../../components/Reviews.astro';",
  );
  c = c.replace(
    "import { getServicePricing } from '../../data/service-prices';",
    "import { getServicePricing } from '../../../data/service-prices';",
  );
  c = c.replace(
    "import { getServiceFaqItems } from '../../lib/jsonldOverrides';",
    "import { getServiceFaqItems } from '../../../lib/jsonldOverrides';",
  );
  c = c.replace(
    /import \{ getLangFromUrl \} from '\.\.\/\.\.\/i18n\/utils';\n?/,
    '',
  );
  c = c.replace(
    /const lang = getLangFromUrl\(Astro\.url\);\n/,
    "const lang = 'en';\n",
  );

  const slug = file.replace('.astro', '');
  c = c.replace(
    new RegExp(`getServiceFaqItems\\('/services/${slug}/'\\)`, 'g'),
    `getServiceFaqItems('/en/services/${slug}/')`,
  );

  c = c.replace(/href="\/reviews\/"/g, 'href="/en/reviews/"');
  c = c.replace(/href="\/services\//g, 'href="/en/services/');

  for (const [from, to] of blogMap) {
    c = c.split(from).join(to);
  }

  for (const [from, to] of ui) {
    c = c.split(from).join(to);
  }

  fs.writeFileSync(fp, c);
  console.log('Patched structure:', file);
}
