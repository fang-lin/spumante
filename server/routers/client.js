/**
 * Site: http://oglen.net/.
 * Author: Justin
 * Date: 14-6-24.
 */

var config = require('../../config'),
    log4js = require('log4js'),
    express = require('express'),
    send = require('send'),
    parseurl = require('parseurl'),
    ejs = require('ejs'),
    fs = require('fs'),
    path = require('path');

var logger = log4js.getLogger('client');
logger.setLevel(config.LOGGER);

var router = express.Router(),
    sep = path.sep;

module.exports = function (opt) {

    var viewExts = opt.viewExts || [],
        hashmap = opt.hashmap || {};

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
            file += 'index.html';
        }

        var extname = path.extname(file);
        if (extname !== '' && viewExts.indexOf(extname) === -1) {
            // if file extname is not include in viewExts, send file immediately
            res.sendFile(path.resolve(file));
        } else {
            res.render(file, hashmap, function (err, html) {
                if (err) {
                    var slice = file.split(sep);
                    if (slice.length > 0) {
                        // path likes: root/xxx
                        var direct = slice[0] + sep + 'index.html';
                        res.render(direct, hashmap, function (err, html) {
                            if (err) {
                                next();
                            } else {
                                res.send(html);
                            }
                        });
                    } else {
                        next();
                    }
                } else {
                    res.send(html);
                }
            });
        }
    };
};