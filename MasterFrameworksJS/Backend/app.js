'use strict'

//Cargar modulos de node para crear el servidor
var express = require('express');
var bodyParse = require('body-parser');
const bodyParser = require('body-parser');

//Ejecutar express (http)
var app = express();

//Cargar ficheros rutas
var article_routes = require('./routes/article');

//Middleware (antes de cargar una ruta)
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Añadir prefijos a rutas / cargar rutas
app.use('/api', article_routes);

/*
Ruta o método de prueba para el API REST
app.get('/datos-curso', (req,res) => {
    return res.status(200).send({
        curso: 'Master en Frameworks JS',
        autor: 'Victor Robles',
        web: 'victorroblesweb.es'
    });
});

app.get('/probando', (req,res) => {
    console.log('Hola mundo!');
    return res.status(200).send(`
        <ul>
            <li>NodeJS</li>
            <li>Angular</li>
            <li>Vue</li>
            <li>React</li>
        </ul>
    `);
});

app.post('/ejemplo-post', (req,res) => {
    var hola = req.body.hola;
    return res.status(200).send({
        curso: 'Master en Frameworks JS',
        autor: 'Victor Robles',
        web: 'victorroblesweb.es',
        hola
    });
});
*/

//Exportar modulo (fichero actual)
module.exports = app;