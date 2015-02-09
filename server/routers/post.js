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
                    });
            })
            .post(function (req, res, next) {
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
            })
            .put(function (req, res, next) {
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
            })
            .delete(function (req, res, next) {
                var id = req.params['id'];

                Post.remove({
                    _id: id
                }, function (err, numberAffected, raw) {
                    res.send({
                        _id: id
                    });
                });
            });
    };
});

