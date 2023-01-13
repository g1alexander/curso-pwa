// Routes.js - Módulo de rutas
var express = require("express");
var router = express.Router();

const messages = [
  {
    _id: "xxx",
    user: "spiderman",
    message: "holi bro",
  },
];

// Get mensajes
router.get("/", function (req, res) {
  res.json(messages);
});

// posts mensajes
router.post("/", function (req, res) {
  const message = {
    message: req.body.message,
    user: req.body.user,
  };

  messages.push(message);

  console.log(messages);

  res.json({
    ok: true,
    message,
  });
});

module.exports = router;
