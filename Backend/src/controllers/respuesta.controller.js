const { Pool } = require("pg");
const configdb = require("../connection/configbd");
const pool = new Pool(configdb);

const getRespuesta = async (req, res) => {
  const response = await pool.query("SELECT * FROM respuesta");
  res.status(200).json(response.rows);
};

const getRespuestaByComentario = async (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  const response = await pool.query(
    "SELECT *, respuesta.id AS idrespuesta FROM respuesta, usuario WHERE idusuario = usuario.id AND idpublicacion = $1 ORDER BY idrespuesta DESC",
    [id]
  );
  res.json(response.rows);
};

const getRespuestaComentario = async (req, res) => {
  const response = await pool.query(
    "SELECT *, respuesta.id AS idrespuesta FROM respuesta, usuario WHERE idpublicacion = 2 AND idusuario = usuario.id"
  );
  res.json(response.rows);
};

const createRespuesta = async (req, res) => {
  const { idusuario, idpublicacion, respuesta } = req.body;
  const response = await pool.query(
    "INSERT INTO respuesta ( idusuario, idpublicacion, respuesta, fecha) VALUES ($1,$2,$3,$4)",
    [idusuario.id, idpublicacion, respuesta, "now()"]
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
  createRespuesta,
  getRespuestaByComentario,
  getRespuestaComentario
};
