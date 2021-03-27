const { Router } = require("express");
const { verify } = require("jsonwebtoken");
const router = Router();

const {
  getPublicacion,
  createPublicacion
} = require("../controllers/publicacion.controller");

router.get("/publicaciones", getPublicacion);
router.post("/publicaciones", createPublicacion);

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
