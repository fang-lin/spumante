/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

var Comment = require('../models/Comment'),
    errMsg = require('../util/errMsg'),
    config = require('../../config');

var logger = require('log4js').getLogger('commentComment');
logger.setLevel(config.LOGGER);

module.exports = function (route) {
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