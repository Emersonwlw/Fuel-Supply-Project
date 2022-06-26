const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const login = require('../middleware/login');
const Usuariocontroller = require ('../controllers/usuario-controller');


router.post('/cadastro', Usuariocontroller.Cadastrarusuario); // fecha insert na tabela

router.post('/login', Usuariocontroller.Login);

router.get('/', login, Usuariocontroller.getusuario); //termino select com filtro

router.patch('/', login, Usuariocontroller.updateusuario);  //fim alteração de dado

router.delete('/', login, Usuariocontroller.deleteusuario); //termina o delete

module.exports = router;