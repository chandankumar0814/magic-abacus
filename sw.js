// ╔══════════════════════════════════════════════════════╗
// ║   Magic Abacus – Service Worker                     ║
// ║   Birla Open Minds International School, Purnea     ║
// ║   Version: 1.0                                      ║
// ╚══════════════════════════════════════════════════════╝

const CACHE_NAME = 'magic-abacus-v1';

// Files to cache for offline use.
// Add any additional assets (fonts, images) you host locally.
const FILES_TO_CACHE = [
  './',
  './abacus.html',
  './icon-192.png',
  './icon-512.png',
];

// ── Install: pre-cache all listed files ──────────────────
self.addEventListener('install', event => {
  console.log('[SW] Installing…');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.allSettled(
        FILES_TO_CACHE.map(url =>
          cache.add(url).catch(err =>
            console.warn('[SW] Could not cache:', url, err.message)
          )
        )
      );
    }).then(() => {
      console.log('[SW] Installed ✅');
      return self.skipWaiting();   // Activate immediately
    })
  );
});

// ── Activate: clean up old caches ───────────────────────
self.addEventListener('activate', event => {
  console.log('[SW] Activating…');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    ).then(() => {
      console.log('[SW] Activated ✅');
      return self.clients.claim();  // Take control immediately
    })
  );
});

// ── Fetch: Cache-first strategy ─────────────────────────
// Serve from cache if available; fall back to network and
// update the cache in the background.
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Skip cross-origin requests (e.g. Google Fonts CDN)
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) {
    // For external fonts/scripts: try network, skip cache
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // Return cached copy and refresh in background
        const fetchPromise = fetch(event.request)
          .then(networkResp => {
            if (networkResp && networkResp.status === 200) {
              caches.open(CACHE_NAME).then(c =>
                c.put(event.request, networkResp.clone())
              );
            }
            return networkResp;
          })
          .catch(() => { /* offline, use cache */ });
        return cached;   // Return cache immediately
      }

      // Not in cache — fetch from network and cache it
      return fetch(event.request).then(networkResp => {
        if (!networkResp || networkResp.status !== 200) return networkResp;
        const cloned = networkResp.clone();
        caches.open(CACHE_NAME).then(c => c.put(event.request, cloned));
        return networkResp;
      }).catch(() => {
        // Full offline fallback: return the main HTML page
        return caches.match('./abacus.html');
      });
    })
  );
});