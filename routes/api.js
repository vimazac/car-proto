'use strict';
var express = require('express');
var carEndpoint = require('./car');
var router = express.Router();
//---------------------------------------------------------------
// API Route specification
//---------------------------------------------------------------
router.use('/cars', carEndpoint);
//---------------------------------------------------------------
// Swagger API Specification - swagger-jsdoc
//---------------------------------------------------------------
var swaggerJSDoc = require('swagger-jsdoc');
var options = {
    swaggerDefinition: {
        info: {
            title: 'Car Prototype API',
            description: '',
            version: '0.0.1'
        },
        schemes: ['http', 'https'],
        basePath: '/api',
        tags: []
    },
    apis: ['routes/api.js', 'routes/car.js'],
};
var swaggerSpec = swaggerJSDoc(options);
//---------------------------------------------------------------
// Expose swagger.json at /api/swagger.json
//---------------------------------------------------------------
router.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
module.exports = router;