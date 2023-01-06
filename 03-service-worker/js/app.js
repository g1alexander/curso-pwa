// Detectar si podemos usar Service Workers
if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/sw.js").then((reg) => {
    // setTimeout(() => {
    //   reg.sync.register("holi");
    //   console.log("yess subido");
    // }, 10000);

    Notification.requestPermission().then((result) => {
      console.log(result);

      reg.showNotification("hola mundo");
    });
  });
}

// fetch("https://reqres.in/api/usersapi/users").then((res) => res.text());
//   .then(console.log);
