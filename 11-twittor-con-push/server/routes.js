// Routes.js - Módulo de rutas
const express = require('express');
const router = express.Router();
const push = require('./push');

const mensajes = [

  {
    _id: 'XXX',
    user: 'spiderman',
    mensaje: 'Hola Mundo'
  }

];


// Get mensajes
router.get('/', function (req, res) {
  // res.json('Obteniendo mensajes');
  res.json( mensajes );
});


// Post mensaje
router.post('/', function (req, res) {
  
  const mensaje = {
    mensaje: req.body.mensaje,
    user: req.body.user
  };

  mensajes.push( mensaje );

  console.log(mensajes);


  res.json({
    ok: true,
    mensaje
  });
});

router.post('/subscribe', (req, res) => {
  
    const suscripcion = req.body;
  
    push.addSubscription( suscripcion );
  
    res.json('subscribe');
})

router.get('/key', (req, res) => {

    // const key = req.body;
  
    // console.log(key);

    const key = push.getKey();
  
    res.send(key);

})

//enviar push a un usuario
// NOTA: esto es algo de prueba, por lo general el push se envia desde el servidor y no esta espueto a peticiones rest
router.post('/push', (req, res) => {

    const notification = {
        title: req.body.title,
        body: req.body.body,
        user: req.body.user
    }

    push.sendPush( notification );

  
    res.json(notification);
})


module.exports = router;