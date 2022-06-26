const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginusuario = require("../middleware/login");
const loginposto = require("../middleware/loginposto");
const caixausocontroller = require("../controllers/caixa-uso-controller");

router.post("/", loginusuario, caixausocontroller.postcaixauso);

router.get("/list/uso", loginusuario, caixausocontroller.getcaixauso);

router.post("/list/uso/posto", loginposto, caixausocontroller.getcaixaposto);

router.patch(
  "/alter/usuario",
  loginusuario,
  caixausocontroller.updatecaixausouser
); //apenas para cancelar o uso

router.patch(
  "/alter/posto",
  loginposto,
  caixausocontroller.updatecaixausoposto
);

module.exports = router;
