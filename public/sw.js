const STATIC_CACHE = 'rotorem-static-v4';
const DYNAMIC_CACHE = 'rotorem-dynamic-v4';

// Files to cache on install
const STATIC_ASSETS = [
  '/',
  '/img/hero.webp',
  '/img/blog/default.webp',
  '/favicon.svg',
  '/favicon-32x32.png',
  '/favicon-16x16.png'
];

// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // VERY IMPORTANT: Only handle same-origin requests
  if (url.origin !== location.origin) return;

  // Vite dev server assets must never be cached (breaks HMR and page navigation)
  if (
    url.pathname.startsWith('/@') ||
    url.pathname.startsWith('/src/') ||
    url.pathname.includes('node_modules')
  ) {
    event.respondWith(fetch(request));
    return;
  }

  // Images and fonts → Cache First
  if (request.destination === 'image' || request.destination === 'font') {
    event.respondWith(cacheFirst(request));
    return;
  }

  // CSS and JS → Network First (cache-first caused stale styles on navigation)
  if (request.destination === 'style' || request.destination === 'script') {
    event.respondWith(networkFirst(request));
    return;
  }

  // HTML → Network First
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }
});

// Cache First
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached && cached.ok) return cached;

  try {
    const response = await fetch(request);
    if (response && response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    if (cached) return cached;

    if (request.destination === 'image') {
      const fallback = await caches.match('/img/blog/default.webp') || await caches.match('/img/hero.webp');
      if (fallback) return fallback;
    }

    throw error;
  }
}

// Network First
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}