import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function getRouteFromUrl(url: URL): string {
  const pathname = url.pathname;
  
  if (pathname === '/') return '/';
  
  const parts = pathname.split('/');
  
  // Check if the first part is a language code
  if (parts[1] in ui) {
    // Remove the language code and return the rest of the path
    return '/' + parts.slice(2).join('/');
  }
  
  // If no language code, return the full path
  return pathname;
}

export function getLocalizedPath(path: string, lang: keyof typeof ui) {
  const normalizedPath = path === '/'
    ? '/'
    : `/${path.replace(/^\/+/, '').replace(/\/+$/, '')}`;

  const mapLegalRoute = (inputPath: string, targetLang: keyof typeof ui) => {
    const routeMap: Record<string, { bg: string; en: string }> = {
      termsPrivacy: {
        bg: '/obshti-uslovia-i-politika-za-zashtita-na-lichni-danni',
        en: '/terms-and-privacy-policy',
      },
      cookiePolicy: {
        bg: '/politika-za-biskvitki',
        en: '/cookie-policy',
      },
    };

    for (const route of Object.values(routeMap)) {
      if (inputPath === route.bg || inputPath === route.en) {
        return targetLang === defaultLang ? route.bg : route.en;
      }
    }

    return inputPath;
  };

  const mapTeamRoute = (inputPath: string, targetLang: keyof typeof ui) => {
    if (targetLang === defaultLang) {
      if (inputPath === '/team') return '/ekip';
      if (inputPath.startsWith('/team/')) return `/ekip${inputPath.slice('/team'.length)}`;
      return inputPath;
    }

    if (inputPath === '/ekip') return '/team';
    if (inputPath.startsWith('/ekip/')) return `/team${inputPath.slice('/ekip'.length)}`;
    return inputPath;
  };

  const mapBlogRoute = (inputPath: string, targetLang: keyof typeof ui) => {
    const routeMap: Record<string, { bg: string; en: string }> = {
      boilerDangerGuide: {
        bg: '/blog/koga-e-opasen-boilerat',
        en: '/blog/when-is-a-water-heater-dangerous',
      },
      waterHeaterNoiseGuide: {
        bg: '/blog/stranen-shum-ili-pukane-ot-boilera-na-kakvo-mozhe-da-se-dalzhi',
        en: '/blog/water-heater-popping-noises-causes-and-warning-signs',
      },
      dryerWaterGuide: {
        bg: '/blog/sushilnyata-ne-sabira-voda-5-prichini',
        en: '/blog/dryer-not-collecting-water-common-container-reservoir-problems',
      },
      washingMachineSpinGuide: {
        bg: '/blog/peralnyata-ne-tsentrofugira-prichini',
        en: '/blog/washing-machine-wont-spin-causes',
      },
      washingMachineCleaningGuide: {
        bg: '/blog/kak-da-pochistim-peralnyata-profesionalno',
        en: '/blog/how-to-clean-a-washing-machine-professionally',
      },
      gorenjeOvenGuide: {
        bg: '/blog/chesto-sreshtani-problemi-s-furni-gorenje',
        en: '/blog/the-most-common-gorenje-oven-problems',
      },
    };

    for (const route of Object.values(routeMap)) {
      if (inputPath === route.bg || inputPath === route.en) {
        return targetLang === defaultLang ? route.bg : route.en;
      }
    }

    return inputPath;
  };

  const localizedPath = mapLegalRoute(mapBlogRoute(mapTeamRoute(normalizedPath, lang), lang), lang);

  let resolvedPath = localizedPath;

  if (lang !== defaultLang) {
    resolvedPath = localizedPath === '/'
      ? `/${lang}`
      : `/${lang}${localizedPath}`;
  }

  if (resolvedPath === '/') {
    return '/';
  }

  return resolvedPath.endsWith('/') ? resolvedPath : `${resolvedPath}/`;
}