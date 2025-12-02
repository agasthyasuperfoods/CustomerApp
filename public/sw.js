// SAFE, NEXT.JS COMPATIBLE SERVICE WORKER

const CACHE_NAME = "agasthya-cache-v1";

// Only cache REAL static files from /public
const urlsToCache = [
  "/",
  "/manifest.json",
  "/Logo.png",
  "/Milk.png",
  "/ou.jpg",
  "/narsingi.jpg",
  "/manikonda.jpg",
  "/chitrapuri.jpg",
  "/Jubilee_hills.jpg",
];

// INSTALL
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      for (const url of urlsToCache) {
        try {
          await cache.add(url);
        } catch (err) {
          console.warn("SW: Skipped caching (not found):", url);
        }
      }
    })()
  );
});

// ACTIVATE
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.map((n) => (n !== CACHE_NAME ? caches.delete(n) : null))
      )
    )
  );
});

// FETCH: Cache-first
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).then((response) => {
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });

          return response;
        })
      );
    })
  );
});
