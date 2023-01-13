// Guardar  en el cache dinamico
function actualizaCacheDinamico(dynamicCache, req, res) {
  if (res.ok) {
    return caches.open(dynamicCache).then((cache) => {
      cache.put(req, res.clone());

      return res.clone();
    });
  } else {
    return res;
  }
}

// Cache with network update
function actualizaCacheStatico(staticCache, req, APP_SHELL_INMUTABLE) {
  if (APP_SHELL_INMUTABLE.includes(req.url)) {
    // No hace falta actualizar el inmutable
    // console.log('existe en inmutable', req.url );
  } else {
    // console.log('actualizando', req.url );
    return fetch(req).then((res) => {
      return actualizaCacheDinamico(staticCache, req, res);
    });
  }
}
// network with cache fallback / update
function manejoApiMessage(nameCache, req) {
  if (req.clone().method === "POST") {
    // si hay soporte de sync manager | navegador

    if (self.registration.sync) {
      // manejo de post
      return req
        .clone()
        .text()
        .then((body) => {
          const bodyObj = JSON.parse(body);

          return saveMessage(bodyObj);
        });
    } else {
      // save indexedDB
      return fetch(req);
    }

    // // save indexedDB
    // return fetch(req);
  } else {
    return fetch(req)
      .then((res) => {
        if (res.ok) {
          actualizaCacheDinamico(nameCache, req, res.clone());

          return res.clone();
        } else {
          return caches.match(req);
        }
      })
      .catch((err) => {
        return caches.match(req);
      });
  }
}
