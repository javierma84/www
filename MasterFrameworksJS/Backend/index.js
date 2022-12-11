'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://192.168.1.140:27017/api-rest-blog', {useNewUrlParser: true})
    .then(()=>{
        console.log('La conexión a la BD se ha realizado correcta!!');

        //Crear servidor y ponerme a escuchar peticiones http
        app.listen(port, () =>{
            console.log('Servidor corriendo en http://localhost:'+port);
        });
    });