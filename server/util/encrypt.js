/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

var crypto = require('crypto');

var md5 = function (code, type) {
    return crypto.createHash('md5').update(code).digest(type || 'hex');
};

var hash = function (algorithm, code, type) {
    return crypto.createHash(algorithm || 'md5').update(code).digest(type || 'hex');
};

var randomBytes = function (size, callback, type) {
    return crypto.randomBytes(size, callback).toString(type || 'hex');
};

var mixSalt = function (code, salt) {
    return code + salt;
};

module.exports = {
    hash: hash,
    md5: md5,
    randomBytes: randomBytes,
    mixSalt: mixSalt
};