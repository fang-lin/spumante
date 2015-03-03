/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */
var encrypt = require('../util/encrypt'),
    _ = require('underscore');

var Setting = require('../models/Setting'),
    errMsg = require('../util/errMsg'),
    config = require('../../config');

var logger = require('log4js').getLogger('settings');
logger.setLevel(config.LOGGER);

module.exports = function (router) {
    router
        .get(function (req, res) {

            var skip = req.params['skip'] || 0;
            var limit = req.params['limit'] || 1000;
            var scopes = req.params['scopes'] || '-';
            var query = Setting.find();

            if (scopes !== '-') {
                query.all('scopes', _.compact(scopes.split('+')));
            }

            query
                .skip(skip)
                .limit(limit)
                .sort({
                    _id: -1
                })
                .exec()
                .then(function (docs) {
                    res.send(docs);
                });
        })
        .post(function (req, res) {

        })
        .put(function (req, res, next) {

        })
        .delete(function (req, res, next) {

        });
};