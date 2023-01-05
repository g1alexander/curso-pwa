// Ciclo de vida del SW

// event of install service worker
self.addEventListener("install", (event) => {
  //descargar assets
  //config cache

  console.log("install service worker", event);

  /*
    self.skipWaiting(); // install new service worker without waiting for reload
  */

  const install = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("sw: install finish... ");
      self.skipWaiting();
      resolve();
    }, 1);
  });

  // wait while promise ends
  self.waitUntil(install);
});

//cuando el sw toma control de la aplicación
self.addEventListener("activate", (event) => {
  //borrar cache viejo

  console.log("sw2: activo y listo para controlar la app", event);
});

// fetch: manejo de peticiones http
self.addEventListener("fetch", (event) => {
  //aplicar estrategias del cache

  console.log("sw:", event.request.url);

  if (event.request.url.includes("https://reqres.in/")) {
    event.respondWith(new Response(`{ ok: false, message: 'heyy bro'}`));
  }
});

// sync: recuperamos la connexion a internet
self.addEventListener("sync", (event) => {
  console.log("tenemos conexion");
  console.log(event);
  console.log(event.tag);
});

// push: notifications
self.addEventListener("push", (event) => {
  console.log("sw: notiii");
});
