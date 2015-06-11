/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */
var Comment = require('../models/Comment'),
    errMsg = require('../util/errMsg'),
    config = require('../../config');

var logger = require('log4js').getLogger('setting');
logger.setLevel(config.LOGGER);

module.exports = function (route) {
    route
        .get(function (req, res, next) {
            var id = req.params['id'];

            Setting
                .findById(id)
                .exec()
                .then(function (docs) {
                    res.send(docs);
                });
        })
        .post(function (req, res, next) {
            var setting = new Setting(req.body);

            setting.save(function (err, product, numberAffected) {
                route.cap(err, res, function () {
                    res.send(setting);
                });
            });
        })
        .put(function (req, res, next) {
            var form = req.body;

            Setting.update({
                _id: form._id
            }, {
                key: form.key,
                value: form.value,
                note: form.note,
                scopes: form.scopes
            }, function (err, numberAffected, raw) {
                res.send(form);
            });
        })
        .delete(function (req, res, next) {
            var id = req.params['id'];

            Setting.remove({
                _id: id
            }, function (err, numberAffected, raw) {
                res.send({
                    _id: id
                });
            });
        });
};