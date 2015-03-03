/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */
var Comment = require('../models/Comment'),
    Post = require('../models/Post'),
    errMsg = require('../util/errMsg'),
    config = require('../../config');

var logger = require('log4js').getLogger('posts');
logger.setLevel(config.LOGGER);

module.exports = function (route) {
    route
        .get(function (req, res, next) {
            var skip = req.params['skip'] || 0;
            var limit = req.params['limit'] || 100;

            Post
                .find()
                .skip(skip)
                .limit(limit)
                .sort({_id: -1})
                .populate({
                    path: 'draft',
                    select: '_id post text saveAt flag'
                })
                .populate({
                    path: 'tags',
                    select: '_id name count'
                })
                .populate({
                    path: 'author',
                    select: '_id username email'
                })
                .exec()
                .then(function (docs) {
                    var fulfilled = 0;
                    var end = docs.length;
                    docs.map(function (post) {
                        Comment
                            .find({
                                post: post._id
                            })
                            .count()
                            .exec()
                            .then(function (count) {
                                post.setValue('commentsCount', count);
                                if (++fulfilled === end) {
                                    res.send(docs);
                                }
                            });
                    });
                });

        });
};

