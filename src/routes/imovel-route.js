'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/imovel-controller');


//Cadastrar imovel
router.post('/', controller.post);

//Atualizar imovel
router.put('/', controller.update);

//Pesquisar por Cidade
router.post('/cidade', controller.getByCidade);

//Pesquisar todos
router.get('/', controller.get);

//Pesquisar por usuario que cadastrou o imovel
router.post('/usuario', controller.getByUserId);

//Remover Cadastro
router.delete('/:id', controller.remove);



module.exports = router;