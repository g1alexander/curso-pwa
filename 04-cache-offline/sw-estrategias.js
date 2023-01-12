// const CACHE_NAME = "cache-1";
const CACHE_STATIC_NAME = "static-v2";
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

self.addEventListener("fetch", (e) => {
  // 1 - cache only
  // the whole application works from cache
  // problems: if service worker is never updated the cache is never updated
  // e.respondWith(caches.match(e.request));
  // ----------------------------------------------------------------
  // 2 - cache with network fallback
  // if file exists in cache returned if not exists call to network
  // problems: app shell combined with dynamic resources
  // const response = caches.match(e.request).then((response) => {
  //   if (response) return response;
  //   // not exist file in cache
  //   // go to network
  //   return fetch(e.request).then((newResponse) => {
  //     caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
  //       cache.put(e.request, newResponse);
  //       cleanCache(CACHE_DYNAMIC_NAME, 5);
  //     });
  //     return newResponse.clone();
  //   });
  // });
  // e.respondWith(response);
  // ----------------------------------------------------------------
  // 3. network with cache fallback
  // call to network and if request failed search cache
  // problems: there's always a data consumption and is slower that estrategy of cache only
  // const response = fetch(e.request)
  //   .then((res) => {
  //     if (!res) return caches.match(e.request); // if not exits resource send file for default
  //     caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
  //       cache.put(e.request, res);
  //       cleanCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
  //     });
  //     return res.clone();
  //   })
  //   .catch((err) => {
  //     return caches.match(e.request);
  //   });
  // e.respondWith(response);
  // ----------------------------------------------------------------------------
  // 4 cache with network update
  // if wanting a performant optim but the app will be outdated version
  // if (e.request.url.includes("bootstrap")) {
  //   return e.respondWith(cache.match(e.request));
  // }
  // const response = caches.open(CACHE_STATIC_NAME).then((cache) => {
  //   fetch(e.request).then((newResponse) => cache.put(e.request, newResponse));
  //   return cache.match(e.request);
  // });
  // e.respondWith(response);
  // -----------------------------------------------------------------------------

  // 5. Cache & network race
  // call to cache and fetch in simultaneous and return it's response more rapid

  const response = new Promise((resolve, reject) => {
    let isReject = false;

    const failed = () => {
      if (isReject) {
        if (/\.(png|jpg)$/i.test(e.request.url)) {
          resolve(caches.match("/img/no-img.jpg"));
        } else {
          reject("ff");
        }
      } else {
        isReject = true;
      }
    };

    fetch(e.request)
      .then((res) => {
        res.ok ? resolve(res) : failed();
      })
      .catch(failed);

    caches
      .match(e.request)
      .then((res) => {
        res.ok ? resolve(res) : failed();
      })
      .catch(failed);
  });

  e.respondWith(response);
});
