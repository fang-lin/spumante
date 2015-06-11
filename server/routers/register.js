/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

var encrypt = require('../util/encrypt'),
    jwt = require('jsonwebtoken'),
    expressJwt = require('express-jwt'); // Middleware that validates JsonWebTokens and set req.user.;

var Visitor = require('../models/Visitor'),
    errMsg = require('../util/errMsg'),
    config = require('../../config');

var logger = require('log4js').getLogger('register');
logger.setLevel(config.LOGGER);

var jwtConfig = config.JWT;
var argotConfig = config.ARGOT;

module.exports = function (route) {
    route
        .post(function (req, res, next) {
            var verification = req.body.verification;
            if (verification === encrypt.md5(req.headers['user-agent'])) {

                addVisitor(req, res, function (visitor) {
                    var ticket = jwtSign(getVisitorProfile(visitor), jwtConfig.audience(req));
                    res.send({
                        ticket: ticket,
                        visitor: getVisitorProfile(visitor)
                    });
                });
            } else {
                res.status(401).send(errMsg.wrongVerification);
            }
        });

    function addVisitor(req, res, fn) {
        var visitor = new Visitor({
            clientIp: req.ip,
            userAgent: req.headers['user-agent']
        });

        visitor.save(function (err, product, numberAffected) {
            fn(product);
        });
    }

    function getVisitorProfile(visitor) {
        return {
            _id: visitor._id,
            nickname: visitor.nickname,
            email: visitor.email,
            registerAt: visitor.registerAt,
            clientIp: visitor.clientIp,
            requestCount: visitor.requestCount
        };
    }

    function jwtSign(visitor, audience) {
        return jwt.sign(visitor, jwtConfig.secret, {
            algorithm: jwtConfig.algorithm,
            issuer: jwtConfig.issuer,
            audience: audience,
            expiresInMinutes: jwtConfig.expiresInMinutes
        });
    }
};
