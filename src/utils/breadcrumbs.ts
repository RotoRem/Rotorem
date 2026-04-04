export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type NavPaths = {
  home: string;
  services: string;
  blog: string;
  contact: string;
  reviews: string;
  faq: string;
  careers: string;
  team: string;
};

type BreadcrumbOptions = {
  route: string;
  title: string;
  isEN: boolean;
  navPaths: NavPaths;
  t: (key: string) => string;
};

const normalizeRoute = (route: string) => {
  if (route === '/') return '/';
  return route.replace(/\/+$/, '');
};

const getPageLabel = (title: string) => title.split(' | ')[0].trim();

export function buildBreadcrumbs({
  route,
  title,
  isEN,
  navPaths,
  t,
}: BreadcrumbOptions): BreadcrumbItem[] {
  const normalizedRoute = normalizeRoute(route);
  const pageLabel = getPageLabel(title);
  const teamBaseRoute = isEN ? '/team' : '/ekip';

  if (normalizedRoute === '/') return [];

  const labels = {
    home: isEN ? 'Home' : 'Начало',
    servicesVarna: isEN ? 'Varna Services' : 'Услуги за Варна',
    servicesSofia: isEN ? 'Sofia Services' : 'Услуги за София',
    blog: isEN ? 'Blog' : 'Блог',
    contact: t('nav.contact'),
    reviews: t('nav.reviews'),
    faq: t('nav.faq'),
    careers: isEN ? 'Careers' : 'Кариери',
    team: t('nav.team'),
  };

  const items: BreadcrumbItem[] = [
    { label: labels.home, href: navPaths.home },
  ];

  if (normalizedRoute === '/services') {
    items.push({ label: labels.servicesVarna });
    return items;
  }

  if (normalizedRoute.startsWith('/services/sofia')) {
    const sofiaHref = isEN ? '/en/services/sofia/' : '/services/sofia/';
    if (normalizedRoute === '/services/sofia') {
      items.push({ label: labels.servicesSofia });
    } else {
      items.push({ label: labels.servicesSofia, href: sofiaHref });
      items.push({ label: pageLabel });
    }
    return items;
  }

  if (normalizedRoute.startsWith('/services')) {
    items.push({ label: labels.servicesVarna, href: navPaths.services });
    items.push({ label: pageLabel });
    return items;
  }

  if (normalizedRoute === '/blog') {
    items.push({ label: labels.blog });
    return items;
  }

  if (normalizedRoute.startsWith('/blog')) {
    items.push({ label: labels.blog, href: navPaths.blog });
    items.push({ label: pageLabel });
    return items;
  }

  if (normalizedRoute === '/contact') {
    items.push({ label: labels.contact });
    return items;
  }

  if (normalizedRoute === '/reviews') {
    items.push({ label: labels.reviews });
    return items;
  }

  if (normalizedRoute === '/faq') {
    items.push({ label: labels.faq });
    return items;
  }

  if (normalizedRoute === '/careers') {
    items.push({ label: labels.careers });
    return items;
  }

  if (normalizedRoute === teamBaseRoute) {
    items.push({ label: labels.team });
    return items;
  }

  if (normalizedRoute.startsWith(`${teamBaseRoute}/`)) {
    items.push({ label: labels.team, href: navPaths.team });
    items.push({ label: pageLabel });
    return items;
  }

  items.push({ label: pageLabel });
  return items;
}
