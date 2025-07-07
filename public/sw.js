const CACHE_NAME = 'fctp-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/next.svg',
  '/vercel.svg',
  '/default-avatar.png',
  '/placeholders/bible-photo.jpg',
  '/placeholders/ioann-mark-kuznietsov-USS2u1-98io-unsplash.jpg',
  '/placeholders/mikolaj-Yy9ghY8k348-unsplash.jpg',
  '/placeholders/parchment-texture.jpg',
  '/placeholders/pastel-yellow-vignette-concrete-textured-background.jpg',
  // Add other critical assets here
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
