self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('shell').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/main.css',
     ]);
   })
 );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(async function() {
    const cache = await caches.open('shell');
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) return cachedResponse;
    const networkResponse = await fetch(event.request);
    event.waitUntil(
      cache.put(event.request, networkResponse.clone())
    );
    return networkResponse;
  }());
});