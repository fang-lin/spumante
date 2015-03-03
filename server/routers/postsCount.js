/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */
var Comment = require('../models/Comment'),
    errMsg = require('../util/errMsg'),
    config = require('../../config');

var logger = require('log4js').getLogger('postsCount');
logger.setLevel(config.LOGGER);

module.exports = function (route) {
    route
        .get(function (req, res, next) {

            Post
                .count()
                .exec()
                .then(function (docs) {
                    res.send({
                        count: docs
                    });
                });
        });
};