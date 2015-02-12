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
    MAX_AGE = config.CACHE_MAX_AGE,
    DIR = config.CLIENT_DIR;

var pageIndex = 'index.html';

var data = {
    tail: function () {
        return '';
    },
    dir: DIR
};

try {
    if (config.BUSTER) {
        var buster = require('../' + DIR + sep + config.BUSTER);
        data.tail = function (file) {
            var v = buster[DIR + '/' + file];
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

function sendPlainFile(res, next, file, html, maxage) {
    fs.stat(DIR + sep + file, function (err, stat) {
        if (err) {
            next(err);
        } else {
            res.set({
                'Accept-Ranges': 'bytes',
                'Cache-Control': maxage ? 'public, max-age=' + maxage : 'no-cache',
                'Content-Type': contentType(file),
                'Last-Modified': stat.mtime.toUTCString(),
                'Expires': (new Date(stat.mtime.getTime() + maxage * 1000)).toUTCString()
            }).send(html);
        }
    });
}

module.exports = function (opt) {
    var viewExts = opt.viewExts || [];

    return function (req, res, next) {
        var maxage = MAX_AGE;
        if (req.method !== 'GET' && req.method !== 'HEAD') {
            return next();
        }
        var file = path.normalize(parseurl(req).pathname);
        if (file[0] === sep) {
            file = file.slice(1, file.length);
        }
        if (file[file.length - 1] === sep || file.length === 0) {
            // path likes: root/ or ''
            file += pageIndex;
            maxage = 0;
        } else if (file.split(pageIndex).reverse()[0] === '') {
            // this file is **/index.html
            maxage = 0;
        }

        var extname = path.extname(file);
        if (extname !== '' && viewExts.indexOf(extname) === -1) {
            // if file extname is not include in viewExts, send file immediately
            send(req, file, {
                root: DIR,
                maxAge: MAX_AGE * 1000
            }).pipe(res);
        } else {
            res.render(file, data, function (err, html) {
                if (err) {
                    logger.warn(err.message);
                    var slice = file.split(sep);
                    if (slice.length > 0) {
                        // path likes: root/** then redirect to root/index.html
                        file = slice[0] + sep + pageIndex;
                        maxage = 0;
                        res.render(file, data, function (err, html) {
                            if (err) {
                                logger.warn(err.message);
                                next();
                            } else {
                                sendPlainFile(res, next, file, html, maxage);
                            }
                        });
                    } else {
                        next();
                    }
                } else {
                    sendPlainFile(res, next, file, html, maxage);
                }
            });
        }
    };
};