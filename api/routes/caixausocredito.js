const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginusuario = require("../middleware/login");
const loginposto = require("../middleware/loginposto");
const caixausocreditocontroller = require("../controllers/caixa-uso-credito-controller");

router.post("/", loginusuario, caixausocreditocontroller.postcaixausocredito);

router.patch(
  "/alter/usuario",
  loginusuario,
  caixausocreditocontroller.updatecaixausocreditouser
);

router.patch(
  "/alter/posto",
  loginposto,
  caixausocreditocontroller.updatecaixausocreditoposto
);

module.exports = router;
