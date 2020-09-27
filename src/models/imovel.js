'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    tipo_imovel: {
        type: String,
        required: true
    },
    tipo_anuncio: {
        type: String,
        required: true
    },
    imagens: [{
        type: String
    }],
    valor: {
        type: String
    },
    avaliacao: {
        type: Number
    },
    comodos: [{
        type: Schema(
            {
                nome: {
                    type: String
                    
                },
                photo: {
                    type: String
                },
                is360: {
                    type: Boolean
                }
            }
        )
    }],
    logradouro: {
        type: String,
        required: true,

    },
    numero: {
        type: Number,
        required: true,

    },
    cep: {
        type: String,
        required: true,
        trim: true
    },
    bairro: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true,
        default: true
    },
    uf: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true,

    },
    longitude: {
        type: String,
        required: true,

    }



    /**
     * endereco:{
        type: Schema({
            logradouro:{
                type: String,
                required: true,
               
            },
            numero: {
                type: Number,
                required: true,
                
            },
            cep: {
                type: String,
                required: true,
                trim: true
            },
            bairro:{
                type: String,
                required: true
            },
            cidade:{
                type: String,
                required: true,
                default: true
            },
            uf:{
                type: String,
                required:true
            },
            latitude:{
                type: String,
                required: true,
               
            },
            longitude:{
                type: String,
                required: true,
               
            }
        })
    }
     */

});

module.exports = mongoose.model('Imovel', schema);

