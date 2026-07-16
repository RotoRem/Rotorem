export type ServicePriceKey =
  | 'washing-machine'
  | 'dishwasher'
  | 'dryer'
  | 'oven'
  | 'boiler';

export type ServiceCity = 'varna' | 'sofia';
export type ServiceLang = 'bg' | 'en';

export interface PriceRow {
  service: string;
  eur: string;
  bgn: string;
  featured?: boolean;
}

export interface ServicePricingContent {
  title: string;
  description: string;
  rows: PriceRow[];
  serviceLabel: string;
  eurLabel: string;
  bgnLabel: string;
  note: string;
  visitBadge: string;
}

type LocalizedRow = {
  bg: string;
  en: string;
  eur: string;
  bgn: string;
  featured?: boolean;
};

type PricingBundle = {
  title: { bg: string; en: string };
  description: { bg: string; en: string };
  rows: LocalizedRow[];
};

const labels = {
  service: { bg: 'Услуга / Проблем', en: 'Service / Problem' },
  eur: { bg: 'Цена (EUR)', en: 'Price (EUR)' },
  bgn: { bg: 'Цена (BGN)', en: 'Price (BGN)' },
  visitBadge: { bg: 'Посещение', en: 'Visit' },
  note: {
    bg: 'Цените са ориентировъчни за труд и не включват стойността на резервните части.',
    en: 'Prices are indicative labour rates and do not include the cost of spare parts.',
  },
};

const visitVarna = {
  bg: 'Посещение и диагностика във Варна в радиус до 10 км (при адрес извън този радиус цената се уточнява допълнително)',
  en: 'Visit and diagnostics in Varna within a 10 km radius (for addresses outside this radius the price is confirmed separately)',
  eur: '20,46 €',
  bgn: '40 лв.',
  featured: true as const,
};

const visitSofia = {
  bg: 'Посещение и диагностика в София в радиус до 10 км (при адрес извън този радиус цената се уточнява допълнително)',
  en: 'Visit and diagnostics in Sofia within a 10 km radius (for addresses outside this radius the price is confirmed separately)',
  eur: '25,57 €',
  bgn: '50 лв.',
  featured: true as const,
};

const demount = {
  bg: 'Демонтаж на стар уред',
  en: 'Removal of an old appliance',
  eur: 'от 15 €',
  bgn: 'от 29,34 лв.',
};

const pricingData: Record<ServiceCity, Partial<Record<ServicePriceKey, PricingBundle>>> = {
  varna: {
    'washing-machine': {
      title: {
        bg: 'Цени за ремонт на перални в сервиз РотоРем',
        en: 'Washing machine repair prices at RotoRem service',
      },
      description: {
        bg: 'Посочените цени са ориентировъчни за труд при отстраняване на съответния технически проблем. Крайната стойност на ремонта се определя след извършване на диагностика на място, в зависимост от сложността на повредата и необходимите резервни части.',
        en: 'The listed prices are indicative labour rates for resolving the corresponding technical issue. The final repair cost is determined after on-site diagnostics, depending on the complexity of the fault and the spare parts required.',
      },
      rows: [
        visitVarna,
        {
          bg: 'Монтаж на пералня',
          en: 'Washing machine installation',
          eur: 'от 40 €',
          bgn: 'от 78,23 лв.',
        },
        {
          bg: 'Монтаж на пералня + сушилня (колона)',
          en: 'Washing machine + dryer installation (stacked)',
          eur: 'от 65 €',
          bgn: 'от 127,13 лв.',
        },
        demount,
        {
          bg: 'Теч от пералнята',
          en: 'Washing machine leak',
          eur: 'от 30,68 €',
          bgn: 'от 60 лв.',
        },
        {
          bg: 'Блокирала врата (ключалка)',
          en: 'Blocked door (door lock)',
          eur: 'от 30,68 €',
          bgn: 'от 60 лв.',
        },
        {
          bg: 'Проблем с източване на водата или центрофугиране',
          en: 'Draining or spinning problem',
          eur: 'от 35,79 €',
          bgn: 'от 70 лв.',
        },
        {
          bg: 'Пералнята не се включва',
          en: 'Washing machine not turning on',
          eur: 'от 35,79 €',
          bgn: 'от 70 лв.',
        },
        {
          bg: 'Пералнята не загрява водата',
          en: 'Washing machine not heating water',
          eur: 'от 46,02 €',
          bgn: 'от 90 лв.',
        },
        {
          bg: 'Проблем с въртенето (амортисьори, ремък, мотор)',
          en: 'Spinning problem (shock absorbers, belt, motor)',
          eur: 'от 46,02 €',
          bgn: 'от 90 лв.',
        },
        {
          bg: 'Смяна на лагери на пералня',
          en: 'Washing machine bearing replacement',
          eur: 'от 86,92 €',
          bgn: 'от 170 лв.',
        },
      ],
    },
    dishwasher: {
      title: {
        bg: 'Цени за ремонт на съдомиялни машини в сервиз РотоРем',
        en: 'Dishwasher repair prices at RotoRem service',
      },
      description: {
        bg: 'Посочените цени са ориентировъчни за труд при отстраняване на съответния технически проблем. Крайната стойност на ремонта се определя след извършване на диагностика на място, в зависимост от сложността на повредата и необходимите резервни части за вашата съдомиялна машина.',
        en: 'The listed prices are indicative labour rates for resolving the corresponding technical issue. The final repair cost is determined after on-site diagnostics, depending on the complexity of the fault and the spare parts required for your dishwasher.',
      },
      rows: [
        visitVarna,
        {
          bg: 'Монтаж на свободностояща съдомиялна',
          en: 'Installation of a freestanding dishwasher',
          eur: 'от 45 €',
          bgn: 'от 88,01 лв.',
        },
        {
          bg: 'Монтаж на вградена съдомиялна',
          en: 'Installation of a built-in dishwasher',
          eur: 'от 60 €',
          bgn: 'от 117,35 лв.',
        },
        demount,
        {
          bg: 'Съдомиялната не загрява водата',
          en: 'Dishwasher not heating water',
          eur: 'от 20,45 €',
          bgn: 'от 40 лв.',
        },
        {
          bg: 'Проблем със затварянето на вратата',
          en: 'Door closing problem',
          eur: 'от 20,45 €',
          bgn: 'от 40 лв.',
        },
        {
          bg: 'Съдомиялната не пълни вода',
          en: 'Dishwasher not filling with water',
          eur: 'от 25,56 €',
          bgn: 'от 50 лв.',
        },
        {
          bg: 'Съдомиялната не източва водата',
          en: 'Dishwasher not draining water',
          eur: 'от 25,56 €',
          bgn: 'от 50 лв.',
        },
      ],
    },
    dryer: {
      title: {
        bg: 'Цени за ремонт на сушилни в сервиз РотоРем',
        en: 'Dryer repair prices at RotoRem service',
      },
      description: {
        bg: 'Посочените цени са ориентировъчни за труд при отстраняване на съответния технически проблем. Крайната стойност на ремонта се определя след извършване на диагностика на място, в зависимост от сложността на повредата и необходимите резервни части за вашата сушилна машина.',
        en: 'The listed prices are indicative labour rates for resolving the corresponding technical issue. The final repair cost is determined after on-site diagnostics, depending on the complexity of the fault and the spare parts required for your dryer.',
      },
      rows: [
        visitVarna,
        {
          bg: 'Монтаж на сушилня',
          en: 'Dryer installation',
          eur: 'от 40 €',
          bgn: 'от 78,23 лв.',
        },
        {
          bg: 'Монтаж на пералня + сушилня (колона)',
          en: 'Washing machine + dryer installation (stacked)',
          eur: 'от 65 €',
          bgn: 'от 127,13 лв.',
        },
        demount,
        {
          bg: 'Сушилнята не стартира / не се включва',
          en: 'Dryer not starting / not turning on',
          eur: 'от 20,45 €',
          bgn: 'от 40 лв.',
        },
        {
          bg: 'Сушилнята не източва водата',
          en: 'Dryer not draining water',
          eur: 'от 25,56 €',
          bgn: 'от 50 лв.',
        },
        {
          bg: 'Барабанът не се върти',
          en: 'Drum not spinning',
          eur: 'от 30,68 €',
          bgn: 'от 60 лв.',
        },
      ],
    },
    oven: {
      title: {
        bg: 'Цени за ремонт на фурни и котлони в сервиз РотоРем',
        en: 'Oven and hob repair prices at RotoRem service',
      },
      description: {
        bg: 'Посочените цени са ориентировъчни за труд при отстраняване на съответния технически проблем. Крайната стойност на ремонта се определя след извършване на диагностика на място, в зависимост от сложността на повредата и необходимите резервни части за Вашия уред.',
        en: 'The listed prices are indicative labour rates for resolving the corresponding technical issue. The final repair cost is determined after on-site diagnostics, depending on the complexity of the fault and the spare parts required for your appliance.',
      },
      rows: [
        visitVarna,
        {
          bg: 'Монтаж на свободностояща фурна',
          en: 'Installation of a freestanding oven',
          eur: 'от 40 €',
          bgn: 'от 78,23 лв.',
        },
        {
          bg: 'Монтаж на фурна за вграждане',
          en: 'Installation of a built-in oven',
          eur: 'от 50 €',
          bgn: 'от 97,79 лв.',
        },
        {
          bg: 'Монтаж на керамичен/индукционен плот',
          en: 'Installation of a ceramic/induction hob',
          eur: 'от 50 €',
          bgn: 'от 97,79 лв.',
        },
        demount,
        {
          bg: 'Проблем с вентилатора на фурната',
          en: 'Oven fan problem',
          eur: 'от 20,45 €',
          bgn: 'от 40 лв.',
        },
        {
          bg: 'Фурната или котлонът не загрява',
          en: 'Oven or hob not heating',
          eur: 'от 25,56 €',
          bgn: 'от 50 лв.',
        },
        {
          bg: 'Уредът не се включва / не стартира',
          en: 'Appliance not turning on / not starting',
          eur: 'от 30,68 €',
          bgn: 'от 60 лв.',
        },
      ],
    },
    boiler: {
      title: {
        bg: 'Цени за ремонт на бойлери в сервиз РотоРем',
        en: 'Boiler repair prices at RotoRem service',
      },
      description: {
        bg: 'Посочените цени са ориентировъчни за труд при отстраняване на съответния технически проблем. Крайната стойност на ремонта се определя след извършване на диагностика на място, в зависимост от сложността на повредата и необходимите резервни части за вашия бойлер.',
        en: 'The listed prices are indicative labour rates for resolving the corresponding technical issue. The final repair cost is determined after on-site diagnostics, depending on the complexity of the fault and the spare parts required for your boiler.',
      },
      rows: [
        visitVarna,
        {
          bg: 'Монтаж на бойлер до 80 л',
          en: 'Installation of a boiler up to 80 L',
          eur: 'от 65 €',
          bgn: 'от 127,13 лв.',
        },
        {
          bg: 'Монтаж на бойлер над 80 л',
          en: 'Installation of a boiler over 80 L',
          eur: 'от 75 €',
          bgn: 'от 146,69 лв.',
        },
        demount,
        {
          bg: 'Бойлерът тече или прокапва',
          en: 'Boiler leaking or dripping',
          eur: 'от 15,34 €',
          bgn: 'от 30 лв.',
        },
        {
          bg: 'Бойлерът не загрява водата',
          en: 'Boiler not heating water',
          eur: 'от 25,56 €',
          bgn: 'от 50 лв.',
        },
        {
          bg: 'Профилактика и почистване на котлен камък',
          en: 'Maintenance and limescale cleaning',
          eur: 'от 35,79 €',
          bgn: 'от 70 лв.',
        },
      ],
    },
  },
  sofia: {
    'washing-machine': {
      title: {
        bg: 'Цени за ремонт на перални в сервиз РотоРем',
        en: 'Washing machine repair prices at RotoRem service',
      },
      description: {
        bg: 'Посочените цени са ориентировъчни за труд при отстраняване на съответния технически проблем. Крайната стойност на ремонта се определя след извършване на диагностика на място, в зависимост от сложността на повредата и необходимите резервни части.',
        en: 'The listed prices are indicative labour rates for resolving the corresponding technical issue. The final repair cost is determined after on-site diagnostics, depending on the complexity of the fault and the spare parts required.',
      },
      rows: [
        visitSofia,
        {
          bg: 'Монтаж на пералня',
          en: 'Washing machine installation',
          eur: 'от 45 €',
          bgn: 'от 88,01 лв.',
        },
        {
          bg: 'Монтаж на пералня + сушилня (колона)',
          en: 'Washing machine + dryer installation (stacked)',
          eur: 'от 70 €',
          bgn: 'от 136,91 лв.',
        },
        demount,
        {
          bg: 'Теч от пералнята',
          en: 'Washing machine leak',
          eur: 'от 30,68 €',
          bgn: 'от 60 лв.',
        },
        {
          bg: 'Блокирала врата (ключалка)',
          en: 'Blocked door (door lock)',
          eur: 'от 30,68 €',
          bgn: 'от 60 лв.',
        },
        {
          bg: 'Проблем с източване на водата или центрофугиране',
          en: 'Draining or spinning problem',
          eur: 'от 35,79 €',
          bgn: 'от 70 лв.',
        },
        {
          bg: 'Пералнята не се включва',
          en: 'Washing machine not turning on',
          eur: 'от 35,79 €',
          bgn: 'от 70 лв.',
        },
        {
          bg: 'Пералнята не загрява водата',
          en: 'Washing machine not heating water',
          eur: 'от 46,02 €',
          bgn: 'от 90 лв.',
        },
        {
          bg: 'Проблем с въртенето (амортисьори, ремък, мотор)',
          en: 'Spinning problem (shock absorbers, belt, motor)',
          eur: 'от 46,02 €',
          bgn: 'от 90 лв.',
        },
        {
          bg: 'Смяна на лагери на пералня',
          en: 'Washing machine bearing replacement',
          eur: 'от 86,92 €',
          bgn: 'от 170 лв.',
        },
      ],
    },
    dishwasher: {
      title: {
        bg: 'Цени за ремонт на съдомиялни машини в сервиз РотоРем',
        en: 'Dishwasher repair prices at RotoRem service',
      },
      description: {
        bg: 'Посочените цени са ориентировъчни за труд при отстраняване на съответния технически проблем. Крайната стойност на ремонта се определя след извършване на диагностика на място, в зависимост от сложността на повредата и необходимите резервни части за вашата съдомиялна машина.',
        en: 'The listed prices are indicative labour rates for resolving the corresponding technical issue. The final repair cost is determined after on-site diagnostics, depending on the complexity of the fault and the spare parts required for your dishwasher.',
      },
      rows: [
        visitSofia,
        {
          bg: 'Монтаж на свободностояща съдомиялна',
          en: 'Installation of a freestanding dishwasher',
          eur: 'от 50 €',
          bgn: 'от 97,79 лв.',
        },
        {
          bg: 'Монтаж на вградена съдомиялна',
          en: 'Installation of a built-in dishwasher',
          eur: 'от 65 €',
          bgn: 'от 127,13 лв.',
        },
        demount,
        {
          bg: 'Съдомиялната не загрява водата',
          en: 'Dishwasher not heating water',
          eur: 'от 20,45 €',
          bgn: 'от 40 лв.',
        },
        {
          bg: 'Проблем със затварянето на вратата',
          en: 'Door closing problem',
          eur: 'от 20,45 €',
          bgn: 'от 40 лв.',
        },
        {
          bg: 'Съдомиялната не пълни вода',
          en: 'Dishwasher not filling with water',
          eur: 'от 25,56 €',
          bgn: 'от 50 лв.',
        },
        {
          bg: 'Съдомиялната не източва водата',
          en: 'Dishwasher not draining water',
          eur: 'от 25,56 €',
          bgn: 'от 50 лв.',
        },
      ],
    },
    dryer: {
      title: {
        bg: 'Цени за ремонт на сушилни в сервиз РотоРем',
        en: 'Dryer repair prices at RotoRem service',
      },
      description: {
        bg: 'Посочените цени са ориентировъчни за труд при отстраняване на съответния технически проблем. Крайната стойност на ремонта се определя след извършване на диагностика на място, в зависимост от сложността на повредата и необходимите резервни части за вашата сушилна машина.',
        en: 'The listed prices are indicative labour rates for resolving the corresponding technical issue. The final repair cost is determined after on-site diagnostics, depending on the complexity of the fault and the spare parts required for your dryer.',
      },
      rows: [
        visitSofia,
        {
          bg: 'Монтаж на сушилня',
          en: 'Dryer installation',
          eur: 'от 45 €',
          bgn: 'от 88,01 лв.',
        },
        {
          bg: 'Монтаж на пералня + сушилня (колона)',
          en: 'Washing machine + dryer installation (stacked)',
          eur: 'от 70 €',
          bgn: 'от 136,91 лв.',
        },
        demount,
        {
          bg: 'Сушилнята не стартира / не се включва',
          en: 'Dryer not starting / not turning on',
          eur: 'от 20,45 €',
          bgn: 'от 40 лв.',
        },
        {
          bg: 'Сушилнята не източва водата',
          en: 'Dryer not draining water',
          eur: 'от 25,56 €',
          bgn: 'от 50 лв.',
        },
        {
          bg: 'Барабанът не се върти',
          en: 'Drum not spinning',
          eur: 'от 30,68 €',
          bgn: 'от 60 лв.',
        },
      ],
    },
    oven: {
      title: {
        bg: 'Цени за ремонт на фурни и котлони в сервиз РотоРем',
        en: 'Oven and hob repair prices at RotoRem service',
      },
      description: {
        bg: 'Посочените цени са ориентировъчни за труд при отстраняване на съответния технически проблем. Крайната стойност на ремонта се определя след извършване на диагностика на място, в зависимост от сложността на повредата и необходимите резервни части за Вашия уред.',
        en: 'The listed prices are indicative labour rates for resolving the corresponding technical issue. The final repair cost is determined after on-site diagnostics, depending on the complexity of the fault and the spare parts required for your appliance.',
      },
      rows: [
        visitSofia,
        {
          bg: 'Монтаж на свободностояща фурна',
          en: 'Installation of a freestanding oven',
          eur: 'от 45 €',
          bgn: 'от 88,01 лв.',
        },
        {
          bg: 'Монтаж на фурна за вграждане',
          en: 'Installation of a built-in oven',
          eur: 'от 55 €',
          bgn: 'от 107,57 лв.',
        },
        {
          bg: 'Монтаж на керамичен/индукционен плот',
          en: 'Installation of a ceramic/induction hob',
          eur: 'от 55 €',
          bgn: 'от 107,57 лв.',
        },
        demount,
        {
          bg: 'Проблем с вентилатора на фурната',
          en: 'Oven fan problem',
          eur: 'от 20,45 €',
          bgn: 'от 40 лв.',
        },
        {
          bg: 'Фурната или котлонът не загрява',
          en: 'Oven or hob not heating',
          eur: 'от 25,56 €',
          bgn: 'от 50 лв.',
        },
        {
          bg: 'Уредът не се включва / не стартира',
          en: 'Appliance not turning on / not starting',
          eur: 'от 30,68 €',
          bgn: 'от 60 лв.',
        },
      ],
    },
    boiler: {
      title: {
        bg: 'Цени за ремонт на бойлери в сервиз РотоРем',
        en: 'Boiler repair prices at RotoRem service',
      },
      description: {
        bg: 'Посочените цени са ориентировъчни за труд при отстраняване на съответния технически проблем. Крайната стойност на ремонта се определя след извършване на диагностика на място, в зависимост от сложността на повредата и необходимите резервни части за вашия бойлер.',
        en: 'The listed prices are indicative labour rates for resolving the corresponding technical issue. The final repair cost is determined after on-site diagnostics, depending on the complexity of the fault and the spare parts required for your boiler.',
      },
      rows: [
        visitSofia,
        {
          bg: 'Монтаж на бойлер до 80 л',
          en: 'Installation of a boiler up to 80 L',
          eur: 'от 70 €',
          bgn: 'от 136,91 лв.',
        },
        {
          bg: 'Монтаж на бойлер над 80 л',
          en: 'Installation of a boiler over 80 L',
          eur: 'от 80 €',
          bgn: 'от 156,47 лв.',
        },
        demount,
        {
          bg: 'Бойлерът тече или прокапва',
          en: 'Boiler leaking or dripping',
          eur: 'от 15,34 €',
          bgn: 'от 30 лв.',
        },
        {
          bg: 'Бойлерът не загрява водата',
          en: 'Boiler not heating water',
          eur: 'от 25,56 €',
          bgn: 'от 50 лв.',
        },
        {
          bg: 'Профилактика и почистване на котлен камък',
          en: 'Maintenance and limescale cleaning',
          eur: 'от 35,79 €',
          bgn: 'от 70 лв.',
        },
      ],
    },
  },
};

export function getServicePricing(
  service: ServicePriceKey,
  city: ServiceCity,
  lang: string
): ServicePricingContent | null {
  const locale: ServiceLang = lang === 'en' ? 'en' : 'bg';
  const bundle = pricingData[city][service];
  if (!bundle) return null;

  return {
    title: bundle.title[locale],
    description: bundle.description[locale],
    serviceLabel: labels.service[locale],
    eurLabel: labels.eur[locale],
    bgnLabel: labels.bgn[locale],
    note: labels.note[locale],
    visitBadge: labels.visitBadge[locale],
    rows: bundle.rows.map((row) => ({
      service: row[locale],
      eur: row.eur,
      bgn: row.bgn,
      featured: row.featured,
    })),
  };
}
