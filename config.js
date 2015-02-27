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
        'COMPRESSION': false,
        'CACHE_MAX_AGE': 0, // unit: second
        'BUSTER': false
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
        'COMPRESSION': false,
        'CACHE_MAX_AGE': 0,
        'BUSTER': false
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
        'COMPRESSION': true,
        'CACHE_MAX_AGE': 3600,
        'BUSTER': 'buster.json'
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
        'COMPRESSION': true,
        'CACHE_MAX_AGE': 3600,
        'BUSTER': 'buster.json'
    }
};

var CONFIG = CONFIGS.PRODUCTION;
var NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV && CONFIGS[NODE_ENV]) {
    CONFIG = CONFIGS[NODE_ENV];
}

// json web token
CONFIG.JWT = {
    secret: new Buffer('YOUR_CLIENT_SECRET', 'base64'),
    issuer: 'YOUR_ISSUER',
    expiresInMinutes: 0,
    audience: function (req) {
        return req.headers['accept-language'] + ' ' + req.headers['user-agent'];
    },
    argotExpiresInMinutes: 0,
    algorithm: 'HS256'
};

// argot
CONFIG.ARGOT = {
    audience: function (argot, req) {
        return argot + jwt.secret + jwt.issuer + jwt.audience(req);
    },
    expiresInMinutes: 0,
    algorithm: 'sha512'
};

module.exports = CONFIG;