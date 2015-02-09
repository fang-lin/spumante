/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'server/models/Tag'
], function (Tag) {
    'use strict';

    return function tags(route) {
        route
            .get(function (req, res, next) {
                var skip = req.params['skip'] || 0;
                var limit = req.params['limit'] || 100;
                Tag
                    .find()
                    .skip(skip)
                    .limit(limit)
                    .sort({
                        _id: -1
                    })
                    .exec()
                    .then(function (docs) {
                        res.send(docs);
                    });
            });
    };
});

