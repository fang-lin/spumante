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
                var postId = req.params['postId'];
                var short = req.params['short'];
                var query;

                if (short) {
                    query = Draft
                        .find({post: postId}, '_id saveAt');
                } else {
                    query = Draft
                        .find({post: postId});
                }

                query
                    .exec()
                    .then(function (docs) {
                        res.send(docs);
                    });
            });
    };
});