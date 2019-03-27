'use strict'
var express = require('express');
var request = require('supertest');
var helper = require('./helpers/common');
var knex = require('../config/database.js');
describe('Api Tests', function() {
    beforeEach(function(done) {
        knex.migrate.rollback().then(function() {
            knex.migrate.latest().then(function() {
                done();
            });
        });
    });
    afterEach(function(done) {
        knex.migrate.rollback().then(function() {
            done();
        });
    });
    describe('Create a Car', function() {
        it('/api/car should return 200', function(done) {
            var car = {
                name: 'Audi',
                license: 'Tn55'
            };
            request(require('../app')).post('/api/cars').send(car).expect(200).end(function(err, res) {
                helper.end(err, res, done);
            });
        });
    })
    describe('Get All Cars', function() {
        it('/api/car should return 200', function(done) {
            request(require('../app')).get('/api/cars').expect(200).end(function(err, res) {
                helper.end(err, res, done);
            });
        });
    })
    describe('Get a Car', function() {
        it('/api/car should return 200', function(done) {
            request(require('../app')).get('/api/cars/1').expect(200).end(function(err, res) {
                helper.end(err, res, done);
            });
        });
    })
    describe('Create a Car Negative Test', function() {
        it('/api/car should return 200', function(done) {
            var car = {
                name: 'testCar;;;;',
                license: 'Tn55.....'
            };
            request(require('../app')).post('/api/cars').send(car).expect(400).end(function(err, res) {
                helper.end(err, res, done);
            });
        });
    })
    describe('Start a Car', function() {
        it('/api/car should return 200', function(done) {
            var car = {
                id: 1,
                status: '1'
            };
            request(require('../app')).post('/api/cars/status').send(car).expect(200).end(function(err, res) {
                helper.end(err, res, done);
            });
        });
    })
    describe('Car Status', function() {
        it('/api/cars/status should return 200', function(done) {
            request(require('../app')).get('/api/cars/status').expect(200).end(function(err, res) {
                helper.end(err, res, done);
            });
        });
        it('/api/cars/status should return 200', function(done) {
            var car = {
                id: 1,
                status: '1'
            };
            request(require('../app')).post('/api/cars/status').send(car).expect(200).end(function(err, res) {
                helper.end(err, res, done);
            });
        });
    })
    describe('Car Status Negative Test', function() {
        it('/api/cars/status should return 400', function(done) {
            var car = {
                id: 1,
                status: '190op'
            };
            request(require('../app')).post('/api/cars/status').send(car).expect(400).end(function(err, res) {
                helper.end(err, res, done);
            });
        });
    })
    describe('Car license', function() {
        it('/api/cars/license should return 200', function(done) {
            request(require('../app')).get('/api/cars/license').expect(200).end(function(err, res) {
                helper.end(err, res, done);
            });
        });
        it('/api/cars/license should return 200', function(done) {
            var car = {
                id: 1,
                license: 'Tn22677'
            };
            request(require('../app')).post('/api/cars/license').send(car).expect(200).end(function(err, res) {
                helper.end(err, res, done);
            });
        });
    })
    describe('Car Lights', function() {
        it('/api/cars/Lights should return 200', function(done) {
            request(require('../app')).get('/api/cars/Lights').expect(200).end(function(err, res) {
                helper.end(err, res, done);
            });
        });
        it('/api/cars/Lights should return 200', function(done) {
            var car = {
                id: 1,
                lights: '1'
            };
            request(require('../app')).post('/api/cars/Lights').send(car).expect(200).end(function(err, res) {
                helper.end(err, res, done);
            });
        });
    })
    describe('Car signals', function() {
        it('/api/cars/signals should return 200', function(done) {
            request(require('../app')).get('/api/cars/signal').expect(200).end(function(err, res) {
                helper.end(err, res, done);
            });
        });
        it('/api/cars/signal should return 200', function(done) {
            var car = {
                id: 1,
                signal: '1',
                type: 'left'
            };
            request(require('../app')).post('/api/cars/signal').send(car).expect(200).end(function(err, res) {
                helper.end(err, res, done);
            });
        });
        it('/api/cars/signal should return 200', function(done) {
            var car = {
                id: 1,
                signal: '1',
                type: 'right'
            };
            request(require('../app')).post('/api/cars/signal').send(car).expect(200).end(function(err, res) {
                helper.end(err, res, done);
            });
        });
    })
    describe('Car signals Negative Test', function() {
        it('/api/cars/signals should return 200', function(done) {
            request(require('../app')).get('/api/cars/signal').expect(200).end(function(err, res) {
                helper.end(err, res, done);
            });
        });
        it('/api/cars/signal should return 400 for invalid signal', function(done) {
            var car = {
                id: 1,
                signal: '189',
                type: 'left'
            };
            request(require('../app')).post('/api/cars/signal').send(car).expect(400).end(function(err, res) {
                helper.end(err, res, done);
            });
        });
        it('/api/cars/signal should return 400 for invalid type', function(done) {
            var car = {
                id: 1,
                signal: '1',
                type: 'rightopp'
            };
            request(require('../app')).post('/api/cars/signal').send(car).expect(400).end(function(err, res) {
                helper.end(err, res, done);
            });
        });
    })
    describe('Car Speed', function() {
        it('/api/cars/speed should return 200', function(done) {
            request(require('../app')).get('/api/cars/speed').expect(200).end(function(err, res) {
                helper.end(err, res, done);
            });
        });
        it('/api/cars/speed should return 200', function(done) {
            var car = {
                id: 1,
                speed: '60'
            };
            request(require('../app')).post('/api/cars/speed').send(car).expect(200).end(function(err, res) {
                helper.end(err, res, done);
            });
        });
    })
    describe('Car Speed Negative test', function() {
        it('/api/cars/speed should return 400 for Invalid Speed', function(done) {
            var car = {
                id: 1,
                speed: '69'
            };
            request(require('../app')).post('/api/cars/speed').send(car).expect(400).end(function(err, res) {
                helper.end(err, res, done);
            });
        });
    })
});