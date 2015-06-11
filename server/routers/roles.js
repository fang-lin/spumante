/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */
var Comment = require('../models/Comment'),
    errMsg = require('../util/errMsg'),
    config = require('../../config');

var logger = require('log4js').getLogger('roles');
logger.setLevel(config.LOGGER);

module.exports = function (route) {
    route
        .get(function (req, res, next) {
            var skip = req.params['skip'] || 0;
            var limit = req.params['limit'] || 100;
            Role
                .find()
                .skip(skip)
                .limit(limit)
                .sort({
                    _id: -1
                })
                .exec()
                .then(function (docs) {
                    res.send(docs);
                });
        });
};

