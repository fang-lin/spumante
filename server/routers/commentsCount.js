/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'server/models/Comment'
], function (Comment) {
    'use strict';

    return function (route) {
        route
            .get(function (req, res, next) {
                var postId = req.params['postId'];
                var criteria = {};

                if (postId !== '-') {
                    criteria = {post: postId};
                }

                Comment
                    .find(criteria)
                    .count()
                    .exec()
                    .then(function (count) {
                        res.send({count: count});
                    });
            });
    };
});