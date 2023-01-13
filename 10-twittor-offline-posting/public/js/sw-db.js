// save in pouchDB

const db = new PouchDB("mensages");

function saveMessage(message) {
  message._id = new Date().toISOString();

  return db.put(message).then(() => {
    self.registration.sync.register("nuevo-post");

    // console.log("message save para posterior posteo");

    const newResp = { ok: true, offline: true };

    return new Response(JSON.stringify(newResp));
  });
}

// postear a la api
function postearMensajes() {
  const posteos = [];

  return db.allDocs({ include_docs: true }).then((docs) => {
    docs.rows.forEach((row) => {
      const doc = row.doc;

      const fetchProm = fetch("http://localhost:3000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doc),
      })
        .then((res) => {
          return db.remove(doc);
        })
        .catch((err) => console.log(err));

      posteos.push(fetchProm);
    });

    return Promise.all(posteos);
  });
}
