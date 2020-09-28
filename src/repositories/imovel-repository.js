'use strict';

const mongoose = require('mongoose');
const Imovel = mongoose.model('Imovel');

const azure = require('azure-storage');
const guid = require('guid');
var config = require('../config');

//Cadastrar Imovel
exports.create = async(data) =>{
    var imovel = new Imovel(data);
    await imovel.save();
}

//Atualizar cadastro do imóvel
exports.update = async(filter, update) => {
    var res = await Imovel.findByIdAndUpdate(filter, update);
    return res;
}

//Pesquisar por cidade
exports.getByCidade = async(cidade) => {
    var res = await Imovel.find({
        cidade: cidade
    }
    );
    return res;
}

//Pesquisar todos (Limite de 20)
exports.get = async() => {
    var res = await Imovel.find({}).limit(20);
    return res;
}

//Pesquisar por usuario que cadastrou o imóvel
exports.getByUserId = async(user_id) => {
    var res = await Imovel.find({
        user_id: user_id
    }
    );
    return res;
}

exports.saveImovelImages = async(image) => {
    try {
    const blobSvc = azure.createBlobService(config.containerConnectionString);
    let filename = guid.raw().toString() + '.jpg';
    let rawdata = image;
    let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let type = matches[1];
    let buffer = new Buffer(matches[2], 'base64');

    
    await blobSvc.createBlockBlobFromText('imoveis', filename, buffer, {
        contentType: type
    }, function (error, result, response) {
        if (error) {
            filename = 'default-customer.png'
        }
    });

    return "https://emob.blob.core.windows.net/imoveis/" + filename;
    } catch (error) {
        return image;
    }

    
    
}

exports.remove = async(imovel_id) => {
    await Imovel.findOneAndRemove({ _id: imovel_id});
}

exports.getById = async(id) => {
    var res = await Imovel.find({
        _id: id
    }, );
    return res;
}



