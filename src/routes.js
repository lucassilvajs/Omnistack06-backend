const express = require('express');
const multer = require('multer');

const multerConfig = require('./config/multer')

const routes = express.Router();

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');
const LeadController = require('./controllers/LeadController');

routes.get('/teste', (req, res) => {
    return res.json({'sucesso': false});
});

routes.post("/boxes", BoxController.store)
routes.post("/landing", LeadController.store)
routes.get("/boxes/:id", BoxController.show)
routes.post("/boxes/:id/files", multer(multerConfig).single('file'), FileController.store)

module.exports = routes;
