'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario-controller');


//Enviar informações
router.post('/', controller.post);

//Login
router.post('/login', controller.login);

//Buscar informações
router.get('/', controller.get);

module.exports = router;