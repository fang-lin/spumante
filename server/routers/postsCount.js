/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'server/models/Post'
], function (Post) {
    'use strict';

    return function (route) {
        route
            .get(function (req, res, next) {

                Post
                    .count()
                    .exec()
                    .then(function (docs) {
                        res.send({
                            count: docs
                        });
                    });
            });
    };
});

