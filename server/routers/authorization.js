/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

var encrypt = require('../util/encrypt'),
    jwt = require('jsonwebtoken'),
    expressJwt = require('express-jwt'); // Middleware that validates JsonWebTokens and set req.user.;

var User = require('../models/User'),
    errMsg = require('../util/errMsg'),
    config = require('../../config');

var logger = require('log4js').getLogger('authorization');
logger.setLevel(config.LOGGER);

var JWT = config.JWT;
var ARGOT = config.ARGOT;

var options = {
    secret: JWT.secret,
    issuer: JWT.issuer
};

function updateUserAndSend(req, res, user, cipher, token, argot) {
    User.update({
        _id: user._id
    }, {
        clientIp: req.ip,
        loginAt: Date.now(),
        cipher: cipher
    }, function (err, numberAffected, raw) {
        if (err) {
            logger.error(err);
            res.status(500).json(errMsg.unknownErr);
        } else if (numberAffected === 1) {
            res.json({
                token: token,
                user: userFields(user),
                argot: argot
            });
        } else {
            logger.error(raw);
        }
    });
}

function userFields(user) {
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

function findUser(criteria, res, cb) {
    User
        .find(criteria)
        .populate({
            path: 'role',
            select: '_id name privilege note'
        })
        .exec()
        .then(function (docs) {
            if (docs.length === 0) {
                res.status(401).send(errMsg.nonexistentUser);
            } else if (docs.length === 1) {
                cb(docs[0]);
            } else {
                logger.warn(docs);
                res.status(500).send(errMsg.unknownErr);
            }
        }, function (err) {
            logger.error(err);
            res.status(500).send(errMsg.unknownErr);
        });
}

function signJwt(payload, audience) {
    return jwt.sign(payload, JWT.secret, {
        algorithm: JWT.algorithm,
        issuer: JWT.issuer,
        audience: audience,
        expiresInMinutes: JWT.expiresInMinutes
    });
}

function loginByAccount(req, res) {
    var body = req.body;

    findUser({
        username: body.username
    }, res, function (user) {
        var password = encrypt.md5(encrypt.mixSalt(body.password, user.salt));

        if (user.password === password) {
            // authorization success.
            var token = signJwt(userFields(user), JWT.audience(req));
            var argot = null, cipher = null;

            if (body.memorization) {
                argot = encrypt.randomBytes(64, 'utf8');
                cipher = encrypt.hash(ARGOT.algorithm, ARGOT.audience(argot, req));
            }

            updateUserAndSend(req, res, user, cipher, token, argot);
        } else {
            res.status(401).send(errMsg.wrongPassword);
        }
    });
}

function loginByArgot(req, res) {
    var cipher = encrypt.hash(ARGOT.algorithm, ARGOT.audience(req.body.argot, req));

    findUser({
        cipher: cipher
    }, res, function (user) {
        // authorization success.
        var token = signJwt(userFields(user), JWT.audience(req));
        var argot = encrypt.randomBytes(64, 'utf8');
        var cipher = encrypt.hash(ARGOT.algorithm, ARGOT.audience(argot, req));

        updateUserAndSend(req, res, user, cipher, token, argot);
    });
}

module.exports = function (router) {

    router
        .get(function (req, res, next) {
            //options.audience = JWT.audience(req);
            //return expressJwt(options);
            res.json({});
        })
        .post(function (req, res, next) {
            if (req.body.argot) {
                loginByArgot(req, res);
            } else {
                loginByAccount(req, res);
            }
        })
        .put(function (req, res, next) {
            next();
        })
        .delete(function (req, res, next) {
            next();
        });
};
