/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */
var Tag = require('../models/Tag'),
    errMsg = require('../util/errMsg'),
    config = require('../../config');

var logger = require('log4js').getLogger('tagsCount');
logger.setLevel(config.LOGGER);

module.exports = function (route) {
    route
        .get(function (req, res, next) {
            Tag
                .count()
                .exec()
                .then(function (docs) {
                    res.send({count: docs});
                });
        });
};
