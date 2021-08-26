const { Router } = require("express");
const router = Router();

const {
  getUsuario,
  createUsuario,
  usuarioLogin,
  postValidarUsuario
} = require("../controllers/usuario.controller");

router.get("/usuarios", getUsuario);
router.post("/usuarios", verifyToken, createUsuario);
router.get("/usuarioLogin", verifyToken, usuarioLogin);
router.post("/login", postValidarUsuario);

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
