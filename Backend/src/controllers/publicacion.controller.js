const { Pool } = require("pg");
const configdb = require("../connection/configbd");
const pool = new Pool(configdb);

const getPublicacion = async (req, res) => {
  const response = await pool.query("SELECT * FROM publicacion");
  res.status(200).json(response.rows);
};

const getPublicacionByIdUsuario = async (req, res) => {
  const response = await pool.query(
    "SELECT *, publicacion.id AS idpublicacion, usuario.id AS idusuario, usuario.username FROM publicacion, usuario WHERE publicacion.idusuario = usuario.id;"
  );
  res.json(response.rows);
};

const createPublicacion = async (req, res) => {
  const { usuario, titulo, mensaje } = req.body;
  console.log("here" + usuario.id);
  const response = await pool.query(
    "INSERT INTO publicacion (idusuario, titulo, mensaje, fecha) VALUES ($1,$2,$3,$4)",
    [usuario.id, titulo, mensaje, "now()"]
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

module.exports = {
  getPublicacion,
  createPublicacion,
  getPublicacionByIdUsuario
};
