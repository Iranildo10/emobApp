'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario-controller');


//Cadastrar usuario
router.post('/', controller.post);

//Login
router.post('/login', controller.login);

//Buscar informações
router.get('/', controller.get);

//Buscar por ID
router.get('/:id', controller.getById);

//Atualizar Cadastro
router.put('/', controller.update);

//Atualizar Imagem
router.put('/', controller.updateImage);

//Remover Cadastro
router.delete('/:id', controller.remove);

module.exports = router;


