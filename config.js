/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'underscore'
], function (_) {
    'use strict';

    var NODE_ENV = process.env.NODE_ENV;

    // Is NODE_ENV
    function ENV(env) {
        if (env) {
            if (_.isArray(env)) {
                return env.indexOf(NODE_ENV) !== -1;
            } else {
                return env === NODE_ENV;
            }
        } else {
            return NODE_ENV;
        }
    }

    // Cache
    var cache = {
        enable: false,
        server: '',
        port: '6379',
        auth: 'swift'
    };
    // TRACE, DEBUG, INFO, WARN, ERROR, FATAL
    var loggers = {
        default: 'WARN',
        development: 'INFO',
        production: 'ERROR'
    };

    function logger() {
        return loggers[ENV()] || loggers.default;
    }

    // morgan combined, common, dev, short, tiny
    var morgans = {
        default: 'short',
        development: 'dev',
        production: 'tiny'
    };

    function morgan() {
        return morgans[ENV()] || morgans.default;
    }

    // static dist
    var clientPaths = {
        default: 'client',
        development: 'client',
        production: 'dist'
    };

    function clientPath() {
        return clientPaths[ENV()] || clientPaths.default;
    }

    // Express listening on port
    var ports = {
        default: 80,
        development: 8008,
        production: 80
    };

    function port() {
        return process.env.PORT || ports[ENV()] || ports.default;
    }

    // mongoose connect link
    //{ user: "", account: "" }
    var mongooseLinks = {
        default: 'mongodb://localhost/oglen-db',
        development: 'mongodb://localhost/oglen-db',
        production: 'mongodb://localhost/oglen-db'
        //production: 'mongodb://heroku_app33706267:heroku_app33706267@ds041561.mongolab.com:41561/heroku_app33706267'
    };

    function mongooseLink() {
        return mongooseLinks[ENV()] || mongooseLinks.default;
    }

    // json web token
    var jwt = {
        secret: new Buffer('YOUR_CLIENT_SECRET', 'base64'),
        issuer: 'YOUR_ISSUER',
        expiresInMinutes: 0,
        audience: function (req) {
            var header = req.headers;
            return header['accept-language'] + ' ' + header['user-agent'];
        },
        argotExpiresInMinutes: 0,
        algorithm: 'HS256'
    };

    // argot
    var argot = {
        audience: function (argot, req) {
            return argot + jwt.secret + jwt.issuer + jwt.audience(req);
        },
        expiresInMinutes: 0,
        algorithm: 'sha512'
    };

    // api messages
    var ERR_MSG = {
        nonexistentUser: {
            code: 'not_authenticated',
            msg: 'Nonexistent User'
        },
        wrongPassword: {
            code: 'not_authenticated',
            msg: 'Wrong Password'
        },
        nonexistentArgot: {
            code: 'not_authenticated',
            msg: 'Nonexistent Argot'
        },
        wrongVerification: {
            code: 'wrong_verification',
            msg: 'Wrong Verification'
        },
        permissionDenied: {
            code: 'permission_denied',
            msg: 'Permission Denied'
        },
        unknownErr: {
            code: ' unknown',
            msg: 'Unknown Error'
        }
    };

    return {
        ENV: ENV,
        logger: logger(),
        morgan: morgan(),
        clientPath: clientPath(),
        port: port(),
        mongooseLink: mongooseLink(),
        jwt: jwt,
        argot: argot,
        delay: false,
//        delay: function () {
//            return _.random(800, 1000);
//        },
        ERR_MSG: ERR_MSG
    };
});
