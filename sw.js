---
---
// Macro Cosmos service worker.
//
// Deliberately conservative so it can NEVER break existing behavior:
//   * Only same-origin GET requests are handled.
//   * All API calls (cross-origin) and every POST/PUT/DELETE pass straight
//     through to the network, untouched.
//   * Strategy is network-first — online users always get fresh content; the
//     cache is only a fallback when offline.
const CACHE = 'macro-cosmos-v1';
const BASE = '{{ site.baseurl }}';
const OFFLINE_URL = BASE + '/offline.html';
const PRECACHE = [
  BASE + '/',
  OFFLINE_URL,
  BASE + '/assets/icons/icon-192.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  // Never intercept API/cross-origin traffic or non-GET requests.
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) {
    return;
  }
  event.respondWith(
    fetch(req)
      .then((res) => {
        // Cache a copy of successful responses for offline fallback.
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then((cached) => {
          if (cached) return cached;
          if (req.mode === 'navigate') return caches.match(OFFLINE_URL);
          return new Response('', { status: 504, statusText: 'Offline' });
        })
      )
  );
});
