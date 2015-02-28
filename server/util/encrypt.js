/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

var crypto = require('crypto');

function md5(code, type) {
    return crypto.createHash('md5').update(code).digest(type || 'hex');
}

function hash(algorithm, code, type) {
    return crypto.createHash(algorithm || 'md5').update(code).digest(type || 'hex');
}

function randomBytes(size, type) {
    return crypto.randomBytes(size).toString(type || 'hex');
}

function mixSalt(code, salt) {
    return code + salt;
}

module.exports = {
    hash: hash,
    md5: md5,
    randomBytes: randomBytes,
    mixSalt: mixSalt
};