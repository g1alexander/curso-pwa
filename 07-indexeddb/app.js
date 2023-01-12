// indexedDB: Reforzamiento

const request = window.indexedDB.open("database", 1);

// update DB when create or update version the DB

request.onupgradeneeded = (e) => {
  console.log("actualizacion de DB");

  const db = e.target.result;

  db.createObjectStore("heroes", {
    keyPath: "id",
  });
};

// error handling

request.onerror = (e) => {
  console.log("error", e);
};

// insert data

request.onsuccess = (e) => {
  const db = e.target.result;

  const heroes = [
    { id: "111", heroe: "spiderman", message: "holi spiderman" },
    { id: "222", heroe: "ironman", message: "holi ironman mark 50" },
  ];

  const heroesTransaction = db.transaction("heroes", "readwrite");

  heroesTransaction.onerror = (e) => {
    console.log("error save", e.target.error);
  };

  // info success transaction

  heroesTransaction.oncomplete = (e) => {
    console.log("siii transaction", e);
  };

  const heroesStore = heroesTransaction.objectStore("heroes");

  for (const heroe of heroes) {
    heroesStore.add(heroe);
  }

  heroesStore.onsuccess = (e) => {
    console.log("save sucess");
  };
};
