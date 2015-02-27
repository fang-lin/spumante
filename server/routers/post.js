/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */
var Post = require('../models/Post'),
    Draft = require('../models/Draft');

var response = {
    'GET': function (req, res, next) {
        var id = req.params['id'];

        Post
            .findById(id)
            .populate({
                path: 'draft',
                select: '_id text saveAt flag'
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
                res.send(docs);
            }, function (err) {
                res.send(err);
            });
    },
    'POST': function (req, res, next) {
        var form = req.body;
        var post = new Post({
            title: form.title,
            abstract: form.abstract,
            author: form.author,
            tags: form.tags,
            publish: form.publish,
            hidden: form.hidden
        });

        post.save(function (err, product, numberAffected) {
            var draft = new Draft({
                post: post._id,
                text: form.draft.text
            });

            draft.save(function (err, product, numberAffected) {
                Post.update({
                    _id: post._id
                }, {
                    draft: draft._id
                }, function (err, numberAffected, raw) {

                    res.send({
                        _id: post._id,
                        draft: {
                            _id: draft._id,
                            saveAt: draft.saveAt
                        },
                        createAt: post.createAt
                    });
                });
            });
        });
    },
    'PUT': function (req, res, next) {
        var form = req.body;
        var draft = new Draft({
            post: form._id,
            text: form.draft.text,
            flag: 'draft'
        });

        draft.save(function (err, product, numberAffected) {
            Post.update({
                _id: form._id
            }, {
                title: form.title,
                abstract: form.abstract,
                tags: form.tags,
                draft: draft._id,
                publish: form.publish,
                hidden: form.hidden
            }, function (err, numberAffected, raw) {
                res.send({
                    draft: {
                        _id: draft._id,
                        saveAt: draft.saveAt
                    }
                });
            });
        });
    },
    'DELETE': function (req, res, next) {
        var id = req.params['id'];

        Post.remove({
            _id: id
        }, function (err, numberAffected, raw) {
            res.send({
                _id: id
            });
        });
    }
};

module.exports = function (req, res, next) {
    return function (req, res, next) {
        if (response[req.method]) {
            response[req.method](req, res, next);
        }
    };
};

