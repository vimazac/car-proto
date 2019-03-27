'use strict';
var knex = require('../../config/database.js');
const tableName = 'cars';

function create(params) {
    return new Promise(function(resolve, reject) {
        var createParams = {};
        createParams.name = params.name;
        createParams.status = params.status ? params.status : '0';
        createParams.license_plate = params.license;
        knex(tableName).insert(createParams).then(function(rows) {
            return knex.insert({
                car_id: rows,
                lights: '0',
                left_signal: 0,
                right_signal: 0,
                speed: '0'
            }, 'id').into('settings');
        }).then(function(id) {
            resolve(id);
        }).catch(function(err) {
            reject(err);
        })
    })
}

function findOneAndUpdate(findBy, findByValue, updateBy, updateByvalue) {
    return new Promise(function(resolve, reject) {
        knex(tableName).where(findBy, '=', findByValue).update(updateBy, updateByvalue).then(function(id) {
            resolve(id);
        }).catch(function(err) {
            reject(err);
        })
    });
}

function findBy(param, value, select) {
    return new Promise(function(resolve, reject) {
        var findBy = param;
        knex(tableName).where(findBy, '=', value).select(select).then(function(data) {
            resolve(data[0]);
        }).catch(function(err) {
            reject(err);
        })
    });
}

function findByObject(findByObject, select) {
    return new Promise(function(resolve, reject) {
        knex(tableName).where(findByObject).select(select).then(function(data) {
            resolve(data);
        }).catch(function(err) {
            reject(err);
        })
    });
}

function findAll() {
    return new Promise(function(resolve, reject) {
        // Do async job
        knex.select().table(tableName).then(function(collection) {
            resolve(collection);
        }).catch(function(err) {
            reject(err);
        })
    })
}
module.exports = {
    findByObject: findByObject,
    findOneAndUpdate: findOneAndUpdate,
    findBy: findBy,
    create: create,
    findAll: findAll
};