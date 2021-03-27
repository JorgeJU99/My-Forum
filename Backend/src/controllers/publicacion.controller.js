const { Pool } = require("pg");
const configdb = require("../connection/configbd");
const pool = new Pool(configdb);

const getPublicacion = async (req, res) => {
  const response = await pool.query("SELECT * FROM publicacion");
  res.status(200).json(response.rows);
};

const createPublicacion = async (req, res) => {
  const { idusuario, titulo, mensaje } = req.body;
  const response = await pool.query(
    "INSERT INTO publicacion (idusuario, titulo, mensaje, fecha) VALUES ($1,$2,$3,$4)",
    [idusuario, titulo, mensaje, "now()"]
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
  createPublicacion
};
