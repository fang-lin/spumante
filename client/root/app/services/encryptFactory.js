/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'crypto'
], function (crypto) {
    'use strict';

    var md5 = function (code) {
        return crypto.createHash('md5').update(code).digest('hex');
    };

    var randomBytes = function (size, callback) {
        return crypto.randomBytes(size, callback).toString('hex');
    };

    var mixSalt = function (code, salt) {
        return code + salt;
    };

    return [function () {
        return {
            md5: md5,
            randomBytes: randomBytes,
            mixSalt: mixSalt
        };
    }];
});