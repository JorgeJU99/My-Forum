const { Pool } = require("pg");
const configdb = require("../connection/configbd");
const pool = new Pool(configdb);

const getRespuesta = async (req, res) => {
  const response = await pool.query("SELECT * FROM respuesta");
  res.status(200).json(response.rows);
};

const createRespuesta = async (req, res) => {
  const { idpublicacion, mensaje, idusuario } = req.body;
  const response = await pool.query(
    "INSERT INTO respuesta (idpublicacion, mensaje, fecha, idusuario) VALUES ($1,$2,$3,$4)",
    [idpublicacion, mensaje, "now()", idusuario]
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
  getRespuesta,
  createRespuesta
};
