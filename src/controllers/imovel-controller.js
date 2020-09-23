'use strict'

const repository = require('../repositories/imovel-repository');

// cadastrar imovel
exports.post = async (req, res, next) => {

    /** 
     * 
     * for(let photo in req.body.comodos){
     *  console.log(req.body.comodos[photo]["nome"] + req.body.comodos[image]["nome"]);
        console.log(req.body.comodos[photo]["photo"] + req.body.comodos[image]["nome"]);
        console.log(req.body.comodos[photo]["is360"] + req.body.comodos[image]["nome"]);
    }
    */
    
    try {

        //Salvar todas as imagens da casa em nuvem
        let imovel_images = [];

        for(let image in req.body.imagens){
            //console.log(req.body.imagens[image]);
            imovel_images.push(await repository.saveImovelImages(req.body.imagens[image]));
            //console.log(imovel_images[image]);
        }


        //Salvar todas as imagens dos comodos em nuvem
        let comodos = [];

       for(let photo in req.body.comodos){
           //console.log(req.body.comodos[photo]["nome"] );
           //console.log(req.body.comodos[photo]["photo"] );
           //console.log(req.body.comodos[photo]["is360"] );
           
           var comodo = {
               nome: req.body.comodos[photo]["nome"],
               photo:await repository.saveImovelImages(req.body.comodos[photo]["photo"]),
               is360: req.body.comodos[photo]["is360"]
           }

           comodos.push(comodo);
       }


       
        await repository.create({
            user_id: req.body.user_id,
            tipo_imovel: req.body.tipo_imovel,
            tipo_anuncio: req.body.tipo_anuncio,
            imagens: imovel_images,
            valor: req.body.valor,
            avaliacao: req.body.avaliacao,
            comodos: comodos,
            logradouro: req.body.logradouro,
            numero: req.body.numero,
            cep: req.body.cep,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            uf: req.body.uf,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        }
        );
     
        res.status(201).send({
            message: 'Imovel cadastrado com sucesso!'
        });

    } catch (e) {
        res.status(400).send({
            message: 'Falha ao cadastrar Imovel',
            data: e.toString()
        });

        console.log(e)
    }

};

//update
exports.update = async (req, res, next) => {

    try {

        //Salvar todas as imagens da casa em nuvem
        let imovel_images = [];

        for(let image in req.body.imagens){
            //console.log(req.body.imagens[image]);
            imovel_images.push(await repository.saveImovelImages(req.body.imagens[image]));
            //console.log(imovel_images[image]);
        }


        //Salvar todas as imagens dos comodos em nuvem
        let comodos = [];

       for(let photo in req.body.comodos){
           //console.log(req.body.comodos[photo]["nome"] );
           //console.log(req.body.comodos[photo]["photo"] );
           //console.log(req.body.comodos[photo]["is360"] );
           
           var comodo = {
               nome: req.body.comodos[photo]["nome"],
               photo:await repository.saveImovelImages(req.body.comodos[photo]["photo"]),
               is360: req.body.comodos[photo]["is360"]
           }

           comodos.push(comodo);
       }

        var filter = req.body.id;
        var update = {
            user_id: req.body.user_id,
            tipo_imovel: req.body.tipo_imovel,
            tipo_anuncio: req.body.tipo_anuncio,
            imagens: imovel_images,
            valor: req.body.valor,
            avaliacao: req.body.avaliacao,
            comodos: comodos,
            logradouro: req.body.logradouro,
            numero: req.body.numero,
            cep: req.body.cep,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            uf: req.body.uf,
            latitude: req.body.latitude,
            longitude: req.body.longitude

        };

        await repository.update(filter, update);

        res.status(201).send({
            message: 'Imóvel atualizado com sucesso!'
        });

    } catch (e) {
        res.status(400).send({
            message: 'Falha ao atualizar Imóvel',
            data: e.toString()
        });

        console.log(e)
    }

};

//Pesquisar por Cidade
exports.getByCidade = async(req, res, next) => {
    try{

        var data = await repository.getByCidade(req.body.cidade);
        
        if(data != ""){
            res.status(201).send({
                error: 0,
                imoveis: data
              });
        }
        else
        res.status(400).send({
            error: 400,
            except: e.toString()
        });

    } catch (e) {
        res.status(400).send({
            error: 400,
            except: e.toString()
        });
        
    }
};

//Pesquisar Todos
exports.get = async (req, res, next) =>{
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            data: error
        });
        
    }
};

//Pesquisar por usuario que cadastrou o imóvel
exports.getByUserId = async(req, res, next) => {
    try{

        var data = await repository.getByUserId(req.body.user_id);
        
        if(data != ""){
            res.status(201).send({
                error: 0,
                imoveis: data
              });
        }
        else
        res.status(400).send({
            error: 400,
            except: e.toString()
        });

    } catch (e) {
        res.status(400).send({
            error: 400,
            except: e.toString()
        });
        
    }
};

exports.remove = async (req, res, next) => {

    try {
        await repository.remove(req.params.id
        );

        res.status(201).send({ 
            message: 'Imóvel removido com sucesso!'
        });

    } catch (e) {
        res.status(400).send({ 
            message: 'Falha ao remover Imóvel', 
            data: e.toString()
        });

        console.log(e)
    }

};