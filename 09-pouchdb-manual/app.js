// Entrenamiento PouchDB

// 1- Crear la base de datos
// Nombre:  mensajes
var db = new PouchDB("mensajes");
var remoteCouch = false;

// Objeto a grabar en base de datos
let mensaje = {
  _id: new Date().toISOString(),
  user: "spiderman",
  mensaje: "Mi tía hizo unos panqueques muy buenos",
  sincronizado: false,
};

// 2- Insertar en la base de datos
// db.put(mensaje, function callback(err, result) {
//   if (!err) {
//     console.log("Successfully posted a todo!");
//   }
// });

// 3- Leer todos los mensajes offline
db.allDocs({ include_docs: true, descending: true }, function (err, doc) {
  console.log(doc.rows);
  //   redrawTodosUI(doc.rows);
});
// 4- Cambiar el valor 'sincronizado' de todos los objetos
//  en la BD a TRUE
// db.allDocs({ include_docs: true, descending: true }, function (err, doc) {
//   //   console.log(doc.rows);
//   doc.rows.forEach((todo) => {
//     const doc = todo.doc;
//     doc.sincronizado = true;
//     db.put(doc);
//   });
//   //   redrawTodosUI(doc.rows);
// });
// 5- Borrar todos los registros, uno por uno, evaluando
// cuales estan sincronizados
// deberá de comentar todo el código que actualiza
// el campo de la sincronización
// db.allDocs({ include_docs: true, descending: true }, function (err, doc) {
//   //   console.log(doc.rows);
//   doc.rows.forEach((todo) => {
//     if (todo.doc.sincronizado) {
//       db.remove(todo.doc);
//     }
//   });
//   //   redrawTodosUI(doc.rows);
// });
