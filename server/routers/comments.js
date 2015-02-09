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
                var skip = req.params['skip'] || 0;
                var limit = req.params['limit'] || 100;
                var criteria = {};

                if (postId !== '-') {
                    criteria = {post: postId};
                }

                Comment
                    .find(criteria)
                    .skip(skip)
                    .limit(limit)
                    .populate({
                        path: 'post',
                        select: '_id title'
                    })
                    .sort({_id: -1})
                    .exec()
                    .then(function (docs) {
                        res.send(docs);
                    })
            });
    };
});