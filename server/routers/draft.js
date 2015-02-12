/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'server/models/Post',
    'server/models/Draft'
], function (Post, Draft) {
    'use strict';

    return function (route) {
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
});