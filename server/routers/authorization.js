/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */


var encrypt = require('../util/encrypt'),
    jwt = require('jsonwebtoken');

var User = require('../models/User'),
    errMsg = require('../util/errMsg'),
    config = require('../../config');

var logger = require('log4js').getLogger('authorization'); // TRACE, DEBUG, INFO, WARN, ERROR, FATAL
logger.setLevel(config.LOGGER);

var JWT = config.JWT;
var ARGOT = config.ARGOT;

//function updateUser(req, res, user, cipher, fn) {
//    User.update({
//        _id: user._id
//    }, {
//        clientIp: req.ip,
//        loginAt: Date.now(),
//        cipher: cipher
//    }, function (err, numberAffected, raw) {
//        logger.error(err);
//        fn();
//    });
//}


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
            res.status(500).send(errMsg.unknownErr);
        } else if (numberAffected === 1) {
            res.send({
                token: token,
                user: userFields(user),
                argot: argot
            });
        } else {
            logger.error(raw);
        }
    });
}

//function send(res, token, argot, user) {
//    res.send({
//        token: token,
//        user: userFields(user),
//        argot: argot
//    });
//}

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

function signJwt(user, audience) {
    return jwt.sign(userFields(user), JWT.secret, {
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
            var token = signJwt(user, JWT.audience(req));
            var argot = null, cipher = null;

            if (body.memorization) {
                argot = encrypt.randomBytes(64, 'utf8');
                cipher = encrypt.hash(argotConfig.algorithm, argotConfig.audience(argot, req));
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
        var token = signJwt(user, JWT.audience(req));
        var argot = encrypt.randomBytes(64, 'utf8');
        var cipher = encrypt.hash(ARGOT.algorithm, ARGOT.audience(argot, req));

        updateUserAndSend(req, res, user, cipher, token, argot);
    });
}

var response = {
    'GET': function (req, res) {
        res.send(['Hi']);
    },
    'POST': function (req, res) {
        if (req.body.argot) {
            loginByArgot(req, res);
        } else {
            loginByAccount(req, res);
        }
    },
    'PUT': function (req, res, next) {

    },
    'DELETE': function (req, res, next) {

    }
};

module.exports = function (opt) {

    return function (req, res, next) {
        if (response[req.method]) {
            response[req.method](req, res, next);
        }
    };
};
