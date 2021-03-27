const express = require("express");
var cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use(express.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.send("Hello World!");
});

// Routes
app.use(require("./routes/usuario"));
app.use(require("./routes/respuesta"));
app.use(require("./routes/publicacion"));

app.listen(3000);
console.log("Server on port", 3000);
