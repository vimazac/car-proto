'use strict';
var carModel = require('../../models/car');


function getAll(req, res, next) {
    carModel.findAll().then(function(collection) {
        res.json({
            error: false,
            data: collection
        })
    }).catch(function(err) {
        res.status(500).json({
            error: true,
            data: {
                message: err.message
            }
        })
    })
}

function create(req, res, next) {
    carModel.create(req.body).then(function(id) {
        res.json({
            error: false,
            data: id
        })
    }).catch(function(err) {
        res.status(500).json({
            error: true,
            data: {
                message: err.message
            }
        })
    })
}

function getOne(req, res, next) {
    carModel.findBy('id', req.params.id).then(function(collection) {
        res.json({
            error: false,
            data: collection
        })
    }).catch(function(err) {
        res.status(500).json({
            error: true,
            data: {
                message: err.message
            }
        })
    })
}

function getStatus(req, res, next) {
    carModel.findBy('id', req.params.id, 'status').then(function(collection) {
        res.json({
            error: false,
            data: collection
        })
    }).catch(function(err) {
        res.status(500).json({
            error: true,
            data: {
                message: err.message
            }
        })
    })
}

function startCar(req, res, next) {
    carModel.findOneAndUpdate('id', req.body.id, 'status', '1').then(function(id) {
        res.json({
            error: false,
            data: id
        })
    }).catch(function(err) {
        res.status(500).json({
            error: true,
            data: {
                message: err.message
            }
        })
    })
}
function setStatus(req, res, next) {
    carModel.findOneAndUpdate('id', req.body.id, 'status', req.body.status).then(function(id) {
        res.json({
            error: false,
            data: id
        })
    }).catch(function(err) {
        res.status(500).json({
            error: true,
            data: {
                message: err.message
            }
        })
    })
}

function getLicense(req, res, next) {
    carModel.findBy('id', req.params.id, 'license_plate').then(function(collection) {
        res.json({
            error: false,
            data: collection
        })
    }).catch(function(err) {
        res.status(500).json({
            error: true,
            data: {
                message: err.message
            }
        })
    })
}

function setLicense(req, res, next) {
    carModel.findOneAndUpdate('id', req.body.id, 'license_plate', req.body.license).then(function(id) {
        res.json({
            error: false,
            data: id
        })
    }).catch(function(err) {
        res.status(500).json({
            error: true,
            data: {
                message: err.message
            }
        })
    })
}
module.exports = {
    create: create,
    startCar: startCar,
    getAll: getAll,
    getOne: getOne,
    getStatus: getStatus,
    setStatus: setStatus,
    getLicense: getLicense,
    setLicense: setLicense
};