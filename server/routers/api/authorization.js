/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
        '../../../client/root/app/config',
        'server/utilities/encrypt',
        'jsonwebtoken',
        'server/models/User'
    ], function (config, encrypt, jwt, User) {
        'use strict';

        var jwtConfig = config.jwt;
        var argotConfig = config.argot;

        return function (route) {
            route
                .post(function (req, res, next) {
                    if (req.body.argot) {
                        argotLogin(req, res);
                    } else {
                        login(req, res);
                    }
                });

            function login(req, res) {
                var form = req.body;

                findUser({
                    username: form.username
                }, res, function (user) {
                    var password = encrypt.md5(encrypt.mixSalt(form.password, user.salt));

                    if (user.password === password) {
                        // authorization success.
                        var token = jwtSign(user, jwtConfig.audience(req));
                        var argot = null, cipher = null;

                        if (form.memorization) {
                            argot = encrypt.randomBytes(64, 'utf8');
                            cipher = encrypt.hash(argotConfig.algorithm, argotConfig.audience(argot, req));
                        }

                        updateUser(req, res, user, cipher, function () {
                            send(res, token, argot, user);
                        });
                    } else {
                        res.status(401).send(config.ERR_MSG.wrongPassword);
                    }
                });
            }

            function argotLogin(req, res) {
                var cipher = encrypt.hash(argotConfig.algorithm, argotConfig.audience(req.body.argot, req));

                findUser({
                    cipher: cipher
                }, res, function (user) {
                    // authorization success.
                    var token = jwtSign(user, jwtConfig.audience(req));
                    var argot = encrypt.randomBytes(64, 'utf8');
                    var cipher = encrypt.hash(argotConfig.algorithm, argotConfig.audience(argot, req));

                    updateUser(req, res, user, cipher, function () {
                        send(res, token, argot, user);
                    });
                });
            }

            function jwtSign(user, audience) {
                return jwt.sign(getUserProfile(user), jwtConfig.secret, {
                    algorithm: jwtConfig.algorithm,
                    issuer: jwtConfig.issuer,
                    audience: audience,
                    expiresInMinutes: jwtConfig.expiresInMinutes
                });
            }

            function findUser(criteria, res, fn) {
                User
                    .find(criteria)
                    .populate({
                        path: 'role',
                        select: '_id name privilege note'
                    })
                    .exec()
                    .then(function (docs) {
                        if (docs.length === 0) {
                            res.status(401).send(config.ERR_MSG.nonexistentUser);
                        } else if (docs.length === 1) {
                            fn(docs[0]);
                        } else {
                            res.status(500).send(config.ERR_MSG.unknownErr);
                        }
                    });
            }

            function updateUser(req, res, user, cipher, fn) {
                User.update({
                    _id: user._id
                }, {
                    clientIp: req.ip,
                    loginAt: Date.now(),
                    cipher: cipher
                }, function (err, numberAffected, raw) {
                    fn();
                });
            }

            function getUserProfile(user) {
                return {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    clientIp: user.clientIp,
                    createAt: user.createAt,
                    loginAt: user.loginAt,
                    role: user.role
                };
            }

            function send(res, token, argot, user) {
                res.send({
                    token: token,
                    user: getUserProfile(user),
                    argot: argot
                });
            }
        };
    }
);
