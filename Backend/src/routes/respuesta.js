const { Router } = require("express");
const { verify } = require("jsonwebtoken");
const router = Router();

const {
  getRespuesta,
  createRespuesta,
  getRespuestaByComentario,
  getRespuestaComentario
} = require("../controllers/respuesta.controller");

router.get("/respuestas", getRespuesta);
router.post("/respuestas", createRespuesta);
router.get("/respuestaspublicacion/:id", getRespuestaByComentario);
router.get("/respuestaspublicacion", getRespuestaComentario);

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = router;
