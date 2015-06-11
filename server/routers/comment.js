/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

var Comment = require('../models/Comment'),
    errMsg = require('../util/errMsg'),
    config = require('../../config');

var logger = require('log4js').getLogger('comment');
logger.setLevel(config.LOGGER);

module.exports = function (route) {
    route
        .get(function (req, res, next) {
            var id = req.params['id'];

            Comment
                .findById(id)
                .exec()
                .then(function (docs) {
                    res.send(docs);
                });
        })
        .post(function (req, res, next) {
            var comment = new Comment(req.body);
            comment.save(function (err, product, numberAffected) {
                res.send(comment);
            });
        })
        .put(function (req, res, next) {
            var form = req.body;

            Comment.update({
                _id: form._id
            }, {
                name: form.name,
                privilege: form.privilege,
                note: form.note
            }, function (err, numberAffected, raw) {
                res.send(form);
            });
        })
        .delete(function (req, res, next) {

            var id = req.params['id'];

            Comment.remove({
                _id: id
            }, function (err, numberAffected, raw) {
                res.send({
                    _id: id
                });
            });
        });
};