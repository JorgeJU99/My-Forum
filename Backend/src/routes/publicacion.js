const { Router } = require("express");
const { verify } = require("jsonwebtoken");
const router = Router();

const {
  getPublicacion,
  createPublicacion,
  getPublicacionByIdUsuario
} = require("../controllers/publicacion.controller");

router.get("/publicaciones", verifyToken, getPublicacion);
router.post("/publicaciones", verifyToken, createPublicacion);
router.get("/publicacionesusuario", verifyToken, getPublicacionByIdUsuario);

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
