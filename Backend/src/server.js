const express = require("express");
var cors = require("cors");
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
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
