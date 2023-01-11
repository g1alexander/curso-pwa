// const CACHE_NAME = "cache-1";
const CACHE_STATIC_NAME = "static-v5";
const CACHE_DYNAMIC_NAME = "dynamic-v1";
const CACHE_INMUTABLE_NAME = "inmutable-v1";
const CACHE_DYNAMIC_LIMIT = 50;
// clean cache, limit dynamic cache
// recomend save 50 or 100 items in cache

const cleanCache = (cacheName, numberItems) => {
  caches.open(cacheName).then((cache) => {
    return cache.keys().then((keys) => {
      if (keys.length > numberItems) {
        cache.delete(keys[0]).then(cleanCache(cacheName, numberItems));
      }
    });
  });
};

self.addEventListener("install", (e) => {
  // APP SHELL: it means to cache everything necessary for the app to work
  const cachePromise1 = caches.open(CACHE_STATIC_NAME).then((cache) => {
    return cache.addAll([
      "/",
      "/pages/offline.html",
      "/index.html",
      "/css/style.css",
      "/img/main.jpg",
      "/js/app.js",
      "/img/no-img.jpg",
    ]);
  });

  const cachePromise2 = caches.open(CACHE_INMUTABLE_NAME).then((cache) => {
    return cache.addAll([
      "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
    ]);
  });

  e.waitUntil(Promise.all([cachePromise1, cachePromise2]));
});

self.addEventListener("activate", (e) => {
  const response = caches.keys().then((keys) => {
    keys.forEach((key) => {
      if (key !== CACHE_STATIC_NAME && key.includes("static")) {
        return caches.delete(key);
      }
    });
  });

  e.waitUntil(response);
});

self.addEventListener("fetch", (e) => {
  // 2 - cache with network fallback
  // if file exists in cache returned if not exists call to network
  // problems: app shell combined with dynamic resources
  const response = caches.match(e.request).then((response) => {
    if (response) return response;
    // not exist file in cache
    // go to network
    return fetch(e.request)
      .then((newResponse) => {
        caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
          cache.put(e.request, newResponse);
          cleanCache(CACHE_DYNAMIC_NAME, 50);
        });

        return newResponse.clone();
      })
      .catch((err) => {
        if (e.request.headers.get("accept").includes("text/html")) {
          return caches.match("/pages/offline.html");
        }
      });
  });
  e.respondWith(response);
});
