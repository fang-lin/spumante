/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */
var Tag = require('../models/Tag'),
    errMsg = require('../util/errMsg'),
    config = require('../../config');

var logger = require('log4js').getLogger('tag');
logger.setLevel(config.LOGGER);

module.exports = function (route) {
    route
        .get(function (req, res, next) {
            var id = req.params['id'];
            Tag
                .findById(id)
                .exec()
                .then(function (docs) {
                    res.send(docs);
                });
        })
        .post(function (req, res, next) {
            var tag = new Tag(req.body);
            tag.save(function (err, product, numberAffected) {
                res.send(tag);
            });
        })
        .put(function (req, res, next) {
            var form = req.body;
            Tag.update({
                _id: form._id
            }, {
                name: form.name
            }, function (err, numberAffected, raw) {
                res.send(form);
            });
        })
        .delete(function (req, res, next) {
            var id = req.params['id'];
            Tag.remove({
                _id: id
            }, function (err, numberAffected, raw) {
                res.send({
                    _id: id
                });
            });
        });
};

