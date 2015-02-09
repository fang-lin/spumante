/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'server/models/User'
], function (User) {
    'use strict';

    return function (route) {
        route
            .get(function (req, res, next) {
                var skip = req.params['skip'] || 0;
                var limit = req.params['limit'] || 100;
                User
                    .find()
                    .select('-password -salt')
                    .skip(skip)
                    .limit(limit)
                    .sort({_id: -1})
                    .populate({
                        path: 'role',
                        select: '_id name'
                    })
                    .exec()
                    .then(function (docs) {
                        res.send(docs);
                    });
            });
    };
});