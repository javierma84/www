'use strict'

var validator = require('validator');
var Article = require('../models/article');
var fs = require('fs');
var path = require('path');
const { exists } = require('../models/article');

var controller = {
    
    datosCurso: (req,res) => {
        var hola = req.body.hola;
        return res.status(200).send({
            curso: 'Master en Frameworks JS',
            autor: 'Victor Robles',
            web: 'victorroblesweb.es',
            hola
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy la acción test de mi controlador de artículos'
        })
    },

    save: (req,res) => {
        //Recoger los parámetros por post
        var params = req.body;

        //Validar datos (validator)
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }
        if (validate_title && validate_content){
            //Crear el objeto a guardar
            var article = new Article();

            //Asignar valores al objeto
            article.title = params.title;
            article.content = params.content;
            article.image = null;

            //Guardar el artículo
            article.save((err,articleStored) => {
                if (err || !articleStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se ha guardado'
                    });
                }
                //Devolver respuesta
                return res.status(200).send({
                    status: 'success',
                    article: articleStored
                });
            });

        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son válidos'
            });
        }     
    },

    getArticles: (req,res) => {
        var query = Article.find({});
        var last = req.params.last;

        if (last || last != undefined){
            query.limit(2);
        }

        //Find  --> -_id es ordenar por is de forma descendente
        query.sort('-_id').exec((err, articles)=>{
            if (err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los artículos'
                });
            }

            if (!articles){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay artículos para mostrar'
                });
            }

            return res.status(200).send({
                status: 'success',
                articles
            });
        })
    },

    getArticle: (req,res) => {
        //Recoger el id de la URL
        var articleId = req.params.id;

        //Comprobar que existe
        if (!articleId || articleId == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe el artículo'
            });
        }

        //Buscar el artículo
        Article.findById(articleId, (err, article) => {

            if (err || !article){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el artículo'
                });
            }
            
            //Devolver el artículo en json
            return res.status(200).send({
                status: 'success',
                article
            });

        })        
    },

    updateArticle: (req,res) => {
        //Recoger el id de la URL
        var articleId = req.params.id;

        //Recoger los datos que llegan por put
        var params = req.body;

        //Validar los datos
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }

        if (validate_title && validate_content){
            //Hacer un find and update
            Article.findOneAndUpdate({_id: articleId},params,{new:true}, (err,articleUpdated) => {
                if (err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }
                if (!articleUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el artículo'
                    });
                }
                //Devolver respuesta

                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                });
            });            
        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son válidos'
            });
        }        
    },

    deleteArticle: (req,res) => {
         //Recoger el id de la URL
         var articleId = req.params.id;

         //Comprobar que existe
         if (!articleId || articleId == null){
             return res.status(404).send({
                 status: 'error',
                 message: 'No existe el artículo'
             });
         }
 
         //Buscar el artículo
         Article.findOneAndDelete({_id: articleId}, (err, articleRemoved) => {
 
             if (err){
                 return res.status(500).send({
                     status: 'error',
                     message: 'Error al borrar'
                 });
             }

             if (!articleRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el artículo, posiblemente no exista'
                });
            }
             
             //Devolver el artículo en json
             return res.status(200).send({
                 status: 'success',
                 article: articleRemoved
             });
 
         })
    },

    uploadFile: (req,res) => {
        //Configurar el modulo del connect multiparty router/article.js (hecho)

        //Recoger el fichero de la petición
        var filename = 'Imagen no subida';

        if (!req.files){
            return res.status(404).send({
                status: 'error',
                message: filename
            });
        }

        //Conseguir el nombre y la extensión del archivo
        var filepath = req.files.file0.path;
        var file_split = filepath.split('\\');

        // * ADVERTENCIA * EN LINUX O MAC
        // var file_split = filepath.split('/');

        //Nombre del archivo
        var filename = file_split[2];
        var extension_split = filename.split('\.');
        var extension = extension_split[1];

        //Comprobar la extensión, sólo imágenes, si no es validad borrar el fichero
        if (extension != 'png' && extension != 'jpg' && extension != 'jpeg' && extension != 'gif') {
            //borrar el archivo subido
            fs.unlink(filepath,(err) => {
                return res.status(200).send({
                    status: 'error',
                    message: 'La extensión del archivo no es válida'
                });
            });
        }else{
            //Si todo es valido, sacamos id de la url
            var articleId = req.params.id;

            //Buscar el articulo, asignarle el nombre de la imagen y actualizarlo
            Article.findOneAndUpdate({_id: articleId}, {image: filename}, {new: true}, (err, articleUpdated) => {
                if (err || !articleUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'Error al guardar la imagen del artículo'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                });
            });            
        }        
    },//end uploadFile

    getImage: (req, res) => {
        var file = req.params.image;
        var filepath = './upload/articles/'+file;

        fs.stat(filepath, (err, stats) => {
            if (err) {
                return res.status(404).send({
                    status: 'error',
                    message: 'La imagen no existe',
                    file
                });
            } else {
                return res.sendFile(path.resolve(filepath));    //método que existe dentro de express
            }
        });        
    },

    search: (req,res) => {
        //Sacar el string a buscar
        var searchString = req.params.search;

        //Find or
        Article.find({ "$or": [ //expresiones de mongo DB, si searchString está contenido (i) en title o content
            { "title": { "$regex": searchString, "$options": "i" } },
            { "content": { "$regex": searchString, "$options": "i" } }
        ]})
        .sort([['date', 'descending']])
        .exec((err, articles) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error en la petición'
                });
            } else if (!articles || articles.length <= 0) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay artículos para mostrar'
                });
            } else {
                return res.status(200).send({
                    status: 'success',
                    articles
                });
            }
        });

        
    }

};  //end controller

module.exports = controller;