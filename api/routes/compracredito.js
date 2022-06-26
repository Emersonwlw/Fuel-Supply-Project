const express = require("express");
const router = express.Router();
const login = require("../middleware/login");
const compracreditocontroller = require("../controllers/compracredito-controller");

router.post("/", login, compracreditocontroller.postcompra);

router.get("/", login, compracreditocontroller.getcomprausuario);

router.post(
  "/list/credito",
  login,
  compracreditocontroller.getCompraUsuarioPosto
);

router.post(
  "/list/creditof",
  login,
  compracreditocontroller.getCompraUsuarioPostof
);

router.post("/list/carteira", login, compracreditocontroller.getCarteiraPosto);

router.patch("/proc", login, compracreditocontroller.updatecompraproc);

router.patch("/canc", login, compracreditocontroller.updatecompracanc);

router.patch("/util", login, compracreditocontroller.updatecomprauti);

router.delete("/", login, compracreditocontroller.deletcompra);

router.post("/list/finalizacao", login, compracreditocontroller.getfinalizacao);

module.exports = router;