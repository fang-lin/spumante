/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

var CONFIGS = {
    'DEVELOPMENT': {
        'CACHE': null,
        'MORGAN': 'dev', // combined, common, dev, short, tiny
        'LOGGER': 'TRACE', // TRACE, DEBUG, INFO, WARN, ERROR, FATAL
        'CLIENT_DIR': 'client',
        'PORT': 8008,
        'MONGODB_LINK': 'mongodb://localhost/oglen-db',
        'API_BASE': '/api',
        'ERRORHANDLER': true,
        'COMPRESSION': false
    },
    'BUILD': {
        'CACHE': null,
        'MORGAN': 'dev',
        'LOGGER': 'INFO',
        'CLIENT_DIR': 'dist',
        'PORT': 8008,
        'MONGODB_LINK': 'mongodb://localhost/oglen-db',
        'API_BASE': '/api',
        'ERRORHANDLER': true,
        'COMPRESSION': false
    },
    'DEFAULT': {
        'CACHE': null,
        'MORGAN': 'short',
        'LOGGER': 'ERROR',
        'CLIENT_DIR': 'dist',
        'PORT': 80,
        'MONGODB_LINK': 'mongodb://localhost/oglen-db',
        'API_BASE': '/api',
        'ERRORHANDLER': false,
        'COMPRESSION': true
    },
    'PRODUCTION': {
        'CACHE': null,
        'MORGAN': 'tiny',
        'LOGGER': 'ERROR',
        'CLIENT_DIR': 'dist',
        'PORT': 80,
        'MONGODB_LINK': 'mongodb://heroku_app33706267:heroku_app33706267@ds041561.mongolab.com:41561/heroku_app33706267',
        'API_BASE': '/api',
        'ERRORHANDLER': false,
        'COMPRESSION': true
    }
};

var CONFIG = CONFIGS.PRODUCTION;
var NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV && CONFIGS[NODE_ENV]) {
    CONFIG = CONFIGS[NODE_ENV];
}

module.exports = CONFIG;


//    // json web token
//    var jwt = {
//        secret: new Buffer('YOUR_CLIENT_SECRET', 'base64'),
//        issuer: 'YOUR_ISSUER',
//        expiresInMinutes: 0,
//        audience: function (req) {
//            var header = req.headers;
//            return header['accept-language'] + ' ' + header['user-agent'];
//        },
//        argotExpiresInMinutes: 0,
//        algorithm: 'HS256'
//    };
//
//    // argot
//    var argot = {
//        audience: function (argot, req) {
//            return argot + jwt.secret + jwt.issuer + jwt.audience(req);
//        },
//        expiresInMinutes: 0,
//        algorithm: 'sha512'
//    };
//
//    // api messages
//    var ERR_MSG = {
//        nonexistentUser: {
//            code: 'not_authenticated',
//            msg: 'Nonexistent User'
//        },
//        wrongPassword: {
//            code: 'not_authenticated',
//            msg: 'Wrong Password'
//        },
//        nonexistentArgot: {
//            code: 'not_authenticated',
//            msg: 'Nonexistent Argot'
//        },
//        wrongVerification: {
//            code: 'wrong_verification',
//            msg: 'Wrong Verification'
//        },
//        permissionDenied: {
//            code: 'permission_denied',
//            msg: 'Permission Denied'
//        },
//        unknownErr: {
//            code: ' unknown',
//            msg: 'Unknown Error'
//        }
//    };
//
//    return {
//        ENV: ENV,
//        logger: logger(),
//        morgan: morgan(),
//        clientPath: clientPath(),
//        port: port(),
//        mongooseLink: mongooseLink(),
//        jwt: jwt,
//        argot: argot,
//        delay: false,
////        delay: function () {
////            return _.random(800, 1000);
////        },
//        ERR_MSG: ERR_MSG
//    };
