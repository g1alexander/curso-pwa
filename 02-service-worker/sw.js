// self.addEventListener("fetch", (event) => {
//   if (event.request.url.includes(".jpg")) {
//     console.log(event.request);

//     let fotoReq = fetch(
//       "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
//     );

//     // let fotoReq = fetch("/img/main.jpg");

//     event.respondWith(fotoReq);
//     // -patas-arriba;
//     return;
//   }

//   // if (event.request.url.includes("style.css")) {
//   //   event.respondWith(fetch(null));
//   //   return;
//   // }

//   // event.respondWith(fetch(event.request));
// });

// self.addEventListener("fetch", (event) => {
//   if (event.request.url.includes("style.css")) {
//     let respuesta = new Response(
//       `
//       body{
//         background-color: red;
//         color: black;
//       }
//     `,
//       {
//         headers: {
//           "Content-type": "text/css",
//         },
//       }
//     );

//     event.respondWith(respuesta);
//   }
// });

// self.addEventListener("fetch", (event) => {
//   if (event.request.url.includes(".jpg")) {
//     const fotoReq = fetch("/img/main-patas-arriba.jpg");

//     event.respondWith(fotoReq);
//   }
// });

self.addEventListener("fetch", (event) => {
  const response = fetch(event.request).then((res) =>
    res.ok ? res : fetch("img/main-patas-arriba.jpg")
  );

  event.respondWith(response);
});
