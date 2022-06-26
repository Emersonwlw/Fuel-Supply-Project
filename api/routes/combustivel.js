const express = require('express');
const router = express.Router();
const login = require('../middleware/loginposto');
const combustivelcontroller = require ('../controllers/combustivel-controller');

 

router.post('/',login, combustivelcontroller.cadastracombustivel); 

router.get('/', login, combustivelcontroller.getcombustivel); 

router.get('/list',combustivelcontroller.getcombsaut);

router.get('/:codigo_comb', login, combustivelcontroller.getumcombustivel);

router.patch('/', login, combustivelcontroller.updatecombustivel);

router.patch('/del', login, combustivelcontroller.deletecombustivel); 

module.exports = router;