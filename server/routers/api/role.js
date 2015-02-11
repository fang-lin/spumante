/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'server/models/Role'
], function (Role) {
    'use strict';

    return function (route) {
        route
            .get(function (req, res, next) {
                var id = req.params['id'];

                Role
                    .findById(id)
                    .exec()
                    .then(function (docs) {
                        res.send(docs);
                    });
            })
            .post(function (req, res, next) {
                var role = new Role(req.body);

                role.save(function (err, product, numberAffected) {
                    res.send(role);
                });
            })
            .put(function (req, res, next) {
                var form = req.body;

                Role.update({
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

                Role.remove({
                    _id: id
                }, function (err, numberAffected, raw) {
                    res.send({
                        _id: id
                    });
                });
            });
    };
});

