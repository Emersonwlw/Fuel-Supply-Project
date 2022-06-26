const express = require('express');
const router = express.Router();
const login = require('../middleware/login');
const carteiracontroller = require ('../controllers/carteira-controller');


router.post('/', carteiracontroller.postcarteira); //termina o insert 
//fazer alteração para filtrar post permitindo com para uma unica carteira

router.get('/',login, carteiracontroller.getcarteira);// termina o select da carteira de acordo com o usuario

router.patch('/', login, carteiracontroller.updatecarteira); //termina a atualização

router.delete('/', login, carteiracontroller.deletecarteira); //termina o delete
//controlar response do delet retornando erro de autorização 

//talvez esta tabela não sera usada pois pode ser possivel fazer um select direto na tabela de compracredito 
//trazendo todas informação que é necessario para a carteira do cliente 

module.exports = router;