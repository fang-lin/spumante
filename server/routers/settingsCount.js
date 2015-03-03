/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */
var Setting = require('../models/Setting'),
    errMsg = require('../util/errMsg'),
    config = require('../../config');

var logger = require('log4js').getLogger('settingCount');
logger.setLevel(config.LOGGER);

module.exports = function (route) {
    route
        .get(function (req, res, next) {
            Setting
                .count()
                .exec()
                .then(function (docs) {
                    res.send({count: docs});
                });
        });
};