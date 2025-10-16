// A basic cache-first service worker
const CACHE_NAME = 'agasthya-cache-v1';
const urlsToCache = [
  '/',
  '/subscription',
  '/styles/globals.css', // Adjust paths based on your project
  // Add other important assets, like your logo or key images
];

// Install event: Fires when the service worker is first installed.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        // Pre-cache essential assets for offline use.
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event: Fires when the service worker becomes active.
// It's a good place to clean up old caches.
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: Fires for every network request.
// This implements a cache-first strategy.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // If the request is in the cache, return the cached response.
        if (response) {
          return response;
        }
        // If not in cache, fetch from the network.
        return fetch(event.request).then(
          (response) => {
            // If the response is valid, cache it and return it.
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});