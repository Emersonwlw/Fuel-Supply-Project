const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = require("../middleware/loginposto");
const postocontroller = require("../controllers/posto-controller");

router.post("/cadastro", postocontroller.cadastroposto);

router.post("/login", postocontroller.loginposto);

router.get("/", login, postocontroller.getposto);

router.get("/list/vendas", login, postocontroller.getcomprasposto);

router.get("/list", postocontroller.getpostosemaut);

router.get("/list/combustivel", postocontroller.getcombdoposto);

router.post("/list/posto/comb", postocontroller.getpostoecomb);

router.patch("/", login, postocontroller.updateposto);

router.delete("/", login, postocontroller.deleteusuario);

module.exports = router;
