/**
 * Site: http://oglen.net/.
 * Author: Justin
 * Date: 14-6-24.
 */

var config = require('../config'),
    log4js = require('log4js'),
    express = require('express'),
    send = require('send'),
    parseurl = require('parseurl'),
    ejs = require('ejs'),
    fs = require('fs'),
    path = require('path'),
    mime = require('mime');

var logger = log4js.getLogger('clientServer');
logger.setLevel(config.LOGGER);

var router = express.Router(),
    sep = path.sep,
    MAX_AGE = config.MAX_AGE,
    CLIENT_DIR = config.CLIENT_DIR;

var defaultPage = 'index.html';

var data = {
    tail: function () {
        return '';
    },
    dir: CLIENT_DIR
};

try {
    if (config.BUSTER) {
        var buster = require('../' + CLIENT_DIR + sep + config.BUSTER);
        data.tail = function (file) {
            var v = buster[CLIENT_DIR + '/' + file];
            return '?v=' + (v ? v.slice(0, 16) : 'master');
        };
    }
} catch (err) {
    logger.error('Please exec "gulp buster" first!');
}

function contentType(file) {
    var type = mime.lookup(file);
    var charset = mime.charsets.lookup(type);
    return type + (charset ? '; charset=' + charset : '');
}

function sendPlainFile(res, next, file, html) {
    fs.stat(CLIENT_DIR + sep + file, function (err, stat) {
        if (err) {
            next(err);
        } else {
            res.set({
                'Accept-Ranges': 'bytes',
                'Cache-Control': 'public, max-age=' + Math.floor(MAX_AGE / 1000),
                'Content-Type': contentType(file),
                'Last-Modified': stat.mtime.toUTCString()
            }).send(html);
        }
    });
}

module.exports = function (opt) {

    var viewExts = opt.viewExts || [];

    return function (req, res, next) {
        if (req.method !== 'GET' && req.method !== 'HEAD') {
            return next();
        }
        var file = path.normalize(parseurl(req).pathname);
        if (file[0] === sep) {
            file = file.slice(1, file.length);
        }
        if (file[file.length - 1] === sep || file.length === 0) {
            // path likes: root/ or ''
            file += defaultPage;
        }

        var extname = path.extname(file);
        if (extname !== '' && viewExts.indexOf(extname) === -1) {
            // if file extname is not include in viewExts, send file immediately
            send(req, file, {
                root: CLIENT_DIR,
                maxAge: MAX_AGE
            }).pipe(res);
        } else {
            res.render(file, data, function (err, html) {
                if (err) {
                    logger.warn(err.message);
                    var slice = file.split(sep);
                    if (slice.length > 0) {
                        // path likes: root/xxx
                        file = slice[0] + sep + defaultPage;
                        res.render(file, data, function (err, html) {
                            if (err) {
                                logger.warn(err.message);
                                next();
                            } else {
                                sendPlainFile(res, next, file, html);
                            }
                        });
                    } else {
                        next();
                    }
                } else {
                    sendPlainFile(res, next, file, html);
                }
            });
        }
    };
};