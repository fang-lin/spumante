/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */
var Post = require('../models/Post'),
    Draft = require('../models/Draft'),
    errMsg = require('../util/errMsg'),
    config = require('../../config');

var logger = require('log4js').getLogger('draft');
logger.setLevel(config.LOGGER);

module.exports = function (route) {
    route
        .get(function (req, res, next) {
            var id = req.params['id'];

            Draft
                .findById(id)
                .exec()
                .then(function (docs) {
                    res.send(docs);
                });
        })
        .delete(function (req, res, next) {

            var id = req.params['id'];

            Draft.remove({
                _id: id
            }, function (err, numberAffected, raw) {
                res.send({
                    _id: id
                });
            });
        });
};