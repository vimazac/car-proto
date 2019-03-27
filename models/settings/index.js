'use strict';
var knex = require('../../config/database.js');
const tableName = 'settings';



function findOneAndUpdate (findBy, findByValue, updateBy, updateByvalue) {
    return new Promise(function(resolve, reject) {
        knex(tableName).where(findBy, '=', findByValue).update(updateBy, updateByvalue).then(function(id) {
            resolve(id);
        }).catch(function(err) {
            reject(err);
        })
    });
}

function findBy(param, value,select) {
    return new Promise(function(resolve, reject) {
        var findBy = param;
        knex(tableName).where(findBy, '=', value).select(select).then(function(data) {
            resolve(data[0]);
        }).catch(function(err) {
            reject(err);
        })
    });
}

function findAll() {
    return new Promise(function(resolve, reject) {
        // Do async job
        knex.select().table(tableName).then(function(data) {
            resolve(data[0]);
        }).catch(function(err) {
            reject(err);
        })
    })
}
module.exports = {
    findOneAndUpdate: findOneAndUpdate,
    findBy: findBy,
    findAll: findAll
};