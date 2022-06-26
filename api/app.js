const express = require("express");
const app = express();
const cors = require("cors");

const morgan = require("morgan");
const bodyParser = require("body-parser");

const rotadeusuario = require("./routes/usuario");
const rotadecombustivel = require("./routes/combustivel");
const rotacompracredito = require("./routes/compracredito");
const rotacarteira = require("./routes/carteira");
const rotaposto = require("./routes/posto");
const rotacaixauso = require("./routes/caixauso");
const rotacaixausocredito = require("./routes/caixausocredito");

app.use(morgan("dev"));
app.use(cors());
app.use(cors({ origin: ["http://localhost:8082"] }));
app.use(bodyParser.urlencoded({ extended: false })); // apenas dados simples na url
app.use(bodyParser.json()); //json na entrada do body

app.use((req, res, next) => {
  res.header("Acces-Control-Allow-Origin", "*");
  res.header(
    "Acces-Control-Allow-Header",
    "Origin, X-Requested-With,Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Acces-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

app.use("/usuario", rotadeusuario);
app.use("/combustivel", rotadecombustivel);
app.use("/compracredito", rotacompracredito);
app.use("/carteira", rotacarteira);
app.use("/posto", rotaposto);
app.use("/caixauso", rotacaixauso);
app.use("/caixausocredito", rotacaixausocredito);

app.use((req, res, next) => {
  const erro = new Error("Não encontrado");
  erro.status = 404;
  next(erro);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({
    erro: {
      mensagem: error.mensage,
    },
  });
});

module.exports = app;
