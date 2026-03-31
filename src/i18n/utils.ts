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

  const localizedPath = mapTeamRoute(normalizedPath, lang);

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