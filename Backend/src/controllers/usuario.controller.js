const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
const configdb = require("../connection/configbd");
const pool = new Pool(configdb);

const getUsuario = async (req, res) => {
  const response = await pool.query("SELECT * FROM usuario");
  res.status(200).json(response.rows);
};

const createUsuario = async (req, res) => {
  const { nombre, apellido, username, userpassword } = req.body;
  const response = await pool.query(
    "INSERT INTO usuario (nombre, apellido, username, userpassword) VALUES ($1,$2,$3,$4)",
    [nombre, apellido, username, userpassword]
  );
  if (response) {
    res.json({
      message: "Guardado con éxito",
      estado: true
    });
  }

  if (!response) {
    res.json({
      message: "Guardado no realizado",
      estado: false
    });
  }
};

const usuarioLogin = async (req, res) => {
  var authorization = req.headers.authorization.split(" ")[1],
    decoded;
  try {
    decoded = jwt.verify(authorization, "secretkey");
    const username = decoded.user;
    const response = await pool.query(
      "SELECT * FROM usuario WHERE username = $1",
      [username]
    );
    return res.json({ estado: true, usuario: response.rows });
  } catch (e) {
    return res.status(401).send("noautorizado");
  }
};

const postValidarUsuario = async (req, res) => {
  const { username, userpassword } = req.body;
  const response = await pool.query(
    "SELECT * FROM usuario WHERE username = $1 and userpassword = $2",
    [username, userpassword]
  );
  if (response.rows.length > 0) {
    jwt.sign({ user: username }, "secretkey", (err, token) => {
      res.json({
        estado: true,
        token: token
      });
    });
  }
  if (response.rows.length === 0)
    res.json({ message: "Usuario y contraseña no valido", estado: false });
};

module.exports = {
  getUsuario,
  createUsuario,
  usuarioLogin,
  postValidarUsuario
};
