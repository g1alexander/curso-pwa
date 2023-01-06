if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/sw.js");
}

// if (CacheStorage) {
//   //create cache
//   caches.open("prueba-1");
//   caches.open("prueba-2");

//   //delete cache
//   caches.delete("prueba-1");

//   //find cache
//   caches.has("prueba-2").then(console.log);

//   caches.open("cache-v1.1").then((cache) => {
//     //add objects to cache
//     // cache.add("/index.html");

//     //add multiple objects to cache
//     cache
//       .addAll(["/index.html", "/css/style.css", "/img/main.jpg"])
//       .then(() => {
//         // cache.delete("/css/style.css");

//         // update content to object in cache
//         cache.put("index.html", new Response("hola mundo"));
//       });

//     // find object in cache
//     cache.match("/index.html").then((res) => {
//       // res.text().then(console.log);
//     });
//   });

//   //find name of caches
//   caches.keys().then(console.log);
// }
