'use strict';

var settingsModel = require('../../models/settings');
var carModel = require('../../models/car');



function getAll(req,res,next) {
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

function getOne(req,res,next){
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

function getLights(req,res,next){
    settingsModel.findBy('car_id', req.params.id, 'lights').then(function(collection) {
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

function setLights(req,res,next){
    settingsModel.findOneAndUpdate('car_id', req.body.id, 'lights', req.body.lights).then(function(id) {
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

function getSignal(req,res,next){
    var updateSignal = req.param('type') == 'left' ? 'left_signal' : 'right_signal';
    settingsModel.findBy('car_id', req.params.id, updateSignal).then(function(collection) {
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

function setSignal(req,res,next){
    var updateSignal = req.body.type == 'left' ? 'left_signal' : 'right_signal';
    settingsModel.findOneAndUpdate('car_id', req.body.id, updateSignal, req.body.signal).then(function(id) {
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

function getSpeed(req,res,next){
    settingsModel.findBy('car_id', req.params.id, 'speed').then(function(collection) {
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

function setSpeed(req,res,next){
    var findByParams = {
        id: req.body.id,
        status: '1'
    };
    carModel.findByObject(findByParams, '*').then(function(rows) {
        if (rows.length > 0) {
            return settingsModel.findOneAndUpdate('car_id', req.body.id, 'speed', req.body.speed);
        } else {
            return;
        }
    }).then(function(id) {
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
    getAll: getAll,
    getOne: getOne,
    getLights: getLights,
    setLights: setLights,
    getSignal: getSignal,
    setSignal: setSignal,
    getSpeed: getSpeed,
    setSpeed: setSpeed
};