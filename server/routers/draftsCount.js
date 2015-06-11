/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

var Post = require('../models/Post'),
    Draft = require('../models/Draft'),
    errMsg = require('../util/errMsg'),
    config = require('../../config');

var logger = require('log4js').getLogger('draftsCount');
logger.setLevel(config.LOGGER);

module.exports = function (route) {
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