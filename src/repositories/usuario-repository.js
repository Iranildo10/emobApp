'use strict';

const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

const azure = require('azure-storage');
const guid = require('guid');
var config = require('../config');


exports.update = async(filter, update) => {
    var res = await Usuario.findByIdAndUpdate(filter, update);
    return res;
}


exports.create = async(data) => {
    var usuario = new Usuario(data);
    await usuario.save();
}


exports.get = async() => {
    var res = await Usuario.find({});
    return res;
}


exports.login = async(email, senha) => {
    var res = await Usuario.find({
        email: email,
        senha: senha
    });
    return res;
}

exports.getByEmail = async(email) => {
    var res = await Usuario.find({
        email: email
    });
    return res;
}

exports.getByValue = async(value) => {
    var res = await Usuario.find({
        value: value
    });
    return res;
}

exports.remove = async(user_id) => {
    await Usuario.findOneAndRemove(user_id);
}

exports.saveUserImage = async(image) => {
    
    // Cria o Blob Service
    const blobSvc = azure.createBlobService(config.containerConnectionString);

    let filename = guid.raw().toString() + '.jpg';
    let rawdata = image;
    let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let type = matches[1];
    let buffer = new Buffer(matches[2], 'base64');

    // Salva a imagem
    await blobSvc.createBlockBlobFromText('usuarios', filename, buffer, {
        contentType: type
    }, function (error, result, response) {
        if (error) {
            filename = 'default-customer.png'
        }
    });

    return "https://emob.blob.core.windows.net/usuarios/" + filename;

}


