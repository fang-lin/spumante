/**
 * Site: http://oglen.net/.
 * Author: Justin
 * Date: 14-6-24.
 */

var express = require('express'),
    expressJwt = require('express-jwt');

var routerFactory = require('../util/routerFactory'),
    errMsg = require('../util/errMsg'),
    authorization = require('./authorization'),
    register = require('./register'),
    post = require('./post'),
    posts = require('./posts'),
    postsCount = require('./postsCount'),
    draft = require('./draft'),
    drafts = require('./drafts'),
    draftsCount = require('./draftsCount'),
    tag = require('./tag'),
    tags = require('./tags'),
    tagsCount = require('./tagsCount'),
    comment = require('./comment'),
    comments = require('./comments'),
    commentsCount = require('./commentsCount'),
    user = require('./user'),
    users = require('./users'),
    usersCount = require('./usersCount'),
//visitor = require('./visitor'),
//visitors = require('./visitors'),
//visitorsCount = require('./visitorsCount'),
    role = require('./role'),
    roles = require('./roles'),
    rolesCount = require('./rolesCount'),
    setting = require('./setting'),
    settings = require('./settings'),
    settingsCount = require('./settingsCount'),
    config = require('../../config'),
    errMsg = require('../util/errMsg');

var logger = require('log4js').getLogger('router'); // TRACE, DEBUG, INFO, WARN, ERROR, FATAL
logger.setLevel(config.LOGGER);

var JWT = config.JWT;

var options = {
    secret: JWT.secret,
    issuer: JWT.issuer
};

var router = express.Router();

routerFactory(router)
    .all(function (router, opt) {
        if (!!opt.jwtRequired) {
            router
                .all(function (req, res, next) {
                    options.audience = config.JWT.audience(req);
                    next();
                })
                .all(expressJwt(options))
                .all(function (err, req, res, next) {
                    if (err) {
                        res.status(err.status).json({
                            message: err.message
                        });
                    } else {
                        next();
                    }
                })
                .all(function (req, res, next) {
                    if (!!req.user.role) {
                        next();
                    } else {
                        var visitorAllow = opt.visitorAllow,
                            method = req.method.toLowerCase();
                        if (visitorAllow && visitorAllow.indexOf(method) !== -1) {
                            next();
                        } else {
                            res.status(401).json(errMsg.permissionDenied);
                        }
                    }
                });
        }
    })
    .when({
        path: '/authorization',
        action: authorization,
        jwtRequired: false
    })
    .when({
        path: '/register',
        action: register,
        jwtRequired: false
    })
    .when({
        path: '/post/:id?',
        action: post,
        jwtRequired: true,
        visitorAllow: ['get']
    })
    .when({
        path: '/posts/count',
        action: postsCount,
        jwtRequired: true,
        visitorAllow: ['get']
    })
    .when({
        path: '/posts/:skip?/:limit?',
        action: posts,
        jwtRequired: true,
        visitorAllow: ['get']
    })
    .when({
        path: '/draft/:id?',
        action: draft,
        jwtRequired: true,
        visitorAllow: false
    })
    .when({
        path: '/drafts/:postId/count',
        action: draftsCount,
        jwtRequired: true,
        visitorAllow: false
    })
    .when({
        path: '/drafts/:postId',
        action: drafts,
        jwtRequired: true,
        visitorAllow: false
    })
    .when({
        path: '/tag/:id?',
        action: tag,
        jwtRequired: true,
        visitorAllow: ['get']
    })
    .when({
        path: '/tags/count',
        action: tagsCount,
        jwtRequired: true,
        visitorAllow: ['get']
    })
    .when({
        path: '/tags/:skip?/:limit?',
        action: tags,
        jwtRequired: true,
        visitorAllow: ['get']
    })
    .when({
        path: '/comment/:id?',
        action: comment,
        jwtRequired: true,
        visitorAllow: ['get', 'post', 'put', 'delete']
    })
    .when({
        path: '/comments/:postId/count',
        action: commentsCount,
        jwtRequired: true,
        visitorAllow: ['get']
    })
    .when({
        path: '/comments/:postId/:skip?/:limit?',
        action: comments,
        jwtRequired: true,
        visitorAllow: ['get']
    })
    .when({
        path: '/user/:id?',
        action: user,
        jwtRequired: true,
        visitorAllow: false
    })
    .when({
        path: '/users/count',
        action: usersCount,
        jwtRequired: true,
        visitorAllow: false
    })
    .when({
        path: '/users/:skip?/:limit?',
        action: users,
        jwtRequired: true,
        visitorAllow: false
    })
    .when({
        path: '/role/:id?',
        action: role,
        jwtRequired: true,
        visitorAllow: false
    })
    .when({
        path: '/roles/Count',
        action: rolesCount,
        jwtRequired: true,
        visitorAllow: false
    })
    .when({
        path: '/roles/:skip?/:limit?',
        action: roles,
        jwtRequired: true,
        visitorAllow: false
    })
    .when({
        path: '/setting/:id?',
        action: setting,
        jwtRequired: true,
        visitorAllow: false
    })
    .when({
        path: '/settings/count',
        action: settingsCount,
        jwtRequired: true,
        visitorAllow: false
    })
    .when({
        path: '/settings/:scopes/:skip?/:limit?',
        action: settings,
        jwtRequired: true,
        visitorAllow: ['get']
    });

module.exports = router;