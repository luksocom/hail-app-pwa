const CACHE_NAME = 'hail-satan-pwa-v1';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './manifest.json',
  './service-worker.js',
  // Audio (optional user-supplied file)
  './background.mp3',
  // Images and icons
  './cover.png',
  './backcover.png',
  './chapter1.png',
  './chapter2.png',
  './chapter3.png',
  './chapter4.png',
  './chapter5.png',
  './chapter6.png',
  './chapter7.png',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch((err) => {
        console.error('Failed to cache resources on install:', err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  // cleanup old caches if needed in future
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});