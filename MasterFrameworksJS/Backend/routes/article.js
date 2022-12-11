'use strict'

var express = require('express');
const { resource } = require('../app');
var ArticleController = require('../controllers/article');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './upload/articles'});

//Rutas de prueba

router.post('/datos-curso', ArticleController.datosCurso);
router.get('/test-de-controlador', ArticleController.test);

//Rutas útiles
router.post('/save', ArticleController.save);
router.get('/articles/:last?', ArticleController.getArticles);
router.get('/article/:id', ArticleController.getArticle);
router.put('/article/:id', ArticleController.updateArticle);
router.delete('/article/:id', ArticleController.deleteArticle);
router.post('/upload-image/:id', md_upload, ArticleController.uploadFile);
router.get('/get-image/:image', ArticleController.getImage);
router.get('/search/:search', ArticleController.search);

module.exports = router;