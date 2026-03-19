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
  const normalizedPath = path === '/' ? '/' : path.replace(/\/+$/, '');

  const mapTeamRoute = (inputPath: string) => {
    const mappings: Array<{ from: string; to: string }> = [
      { from: '/team', to: '/ekip' },
      { from: '/ekip', to: '/team' },
    ];

    for (const mapping of mappings) {
      if (inputPath === mapping.from) {
        return mapping.to;
      }

      if (inputPath.startsWith(`${mapping.from}/`)) {
        return `${mapping.to}${inputPath.slice(mapping.from.length)}`;
      }
    }

    return inputPath;
  };

  const localizedPath = mapTeamRoute(normalizedPath);

  // If the language is the default language and the path doesn't start with the language,
  // return the path as is
  if (lang === defaultLang) {
    return localizedPath;
  }
  
  // For non-default languages, prefix the path with the language code
  // If the path is the home page (/), just return the language code
  if (localizedPath === '/') {
    return `/${lang}`;
  }
  
  return `/${lang}${localizedPath}`;
}