/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */
var User = require('../models/User'),
    errMsg = require('../util/errMsg'),
    config = require('../../config');

var logger = require('log4js').getLogger('user');
logger.setLevel(config.LOGGER);

module.exports = function (route) {
    route
        .get(function (req, res, next) {
            var id = req.params['id'];
            User
                .findById(id)
                .select('-password -salt')
                .populate({
                    path: 'role',
                    select: '_id name privilege note'
                })
                .exec()
                .then(function (docs) {
                    res.send(docs);
                });
        })
        .post(function (req, res, next) {
            var form = req.body;
            var salt = encrypt.randomBytes(16);
            var password = encrypt.mixSalt(form.password, salt);

            form.password = encrypt.md5(password);
            form.salt = salt;

            var user = new User(form);
            user.save(function (err, product, numberAffected) {
                res.send(user);
            });
        })
        .put(function (req, res, next) {
            var form = req.body;
            var salt = encrypt.randomBytes(16);
            var password = encrypt.mixSalt(form.password, salt);

            form.password = encrypt.md5(password);
            form.salt = salt;

            User.update({
                _id: form._id
            }, form, function (err, numberAffected, raw) {
                res.send(form);
            });
        })
        .delete(function (req, res, next) {
            var id = req.params['id'];
            User.remove({
                _id: id
            }, function (err, numberAffected, raw) {
                res.send({
                    _id: id
                });
            });
        });
};