/**
 * Site: http://oglen.net/.
 * Author: Justin
 * Date: 14-6-24.
 */

var express = require('express'),
    expressJwt = require('express-jwt'); // Middleware that validates JsonWebTokens and set req.user.

var routerFactory = require('../util/routerFactory'),
    authorization = require('./authorization'),
//register = require('server/routers/register'),
    post = require('./post'),
//posts = require('server/routers/posts'),
//postsCount = require('server/routers/postsCount'),
//draft = require('server/routers/draft'),
//drafts = require('server/routers/drafts'),
//draftsCount = require('server/routers/draftsCount'),
//tag = require('server/routers/tag'),
//tags = require('server/routers/tags'),
//tagsCount = require('server/routers/tagsCount'),
//comment = require('server/routers/comment'),
//comments = require('server/routers/comments'),
//commentsCount = require('server/routers/commentsCount'),
//user = require('server/routers/user'),
//users = require('server/routers/users'),
//usersCount = require('server/routers/usersCount'),
//visitor = require('server/routers/visitor'),
//visitors = require('server/routers/visitors'),
//visitorsCount = require('server/routers/visitorsCount'),
//role = require('server/routers/role'),
//roles = require('server/routers/roles'),
//rolesCount = require('server/routers/rolesCount'),
//setting = require('server/routers/setting'),
//settings = require('server/routers/settings'),
//settingsCount = require('server/routers/settingsCount'),
    config = require('../../config');

var logger = require('log4js').getLogger('router'); // TRACE, DEBUG, INFO, WARN, ERROR, FATAL
logger.setLevel(config.LOGGER);

//var options = {
//    secret: config.jwt.secret,
//    issuer: config.jwt.issuer
//};

//var router = routerFactory(express.Router());
//
//router
//    .when('/authorization', {
//        use: authorization
//    })
//    .when('/authorization', {
//        use: post
//    });

var router = express.Router();

router.use('/authorization', authorization());
router.use('/post/:id?', authorization(), post());

//routerProvider(expressRouter)
//    .inject('cap', function (err, res, cb) {
//        if (err) {
//            logger.error(err);
//            res.status(500).send({
//                code: err.code,
//                msg: err.message
//            });
//        } else {
//            cb(logger);
//        }
//    })
//    .all(function (router, route) {
//        var delay = config.delay;
//        if (delay) {
//            router
//                .all(function (req, res, next) {
//                    setTimeout(function () {
//                        next();
//                    }, delay());
//                });
//        }
//    })
//    .all(function (router, route) {
//        console.log('asdasd');
//        //if (route.requireJwt) {
//        //    router
//        //        .all(function (req, res, next) {
//        //            options.audience = config.jwt.audience(req);
//        //            next();
//        //        })
//        //        .all(expressJwt(options))
//        //        .all(function (err, req, res, next) {
//        //            if (err) {
//        //                res.status(err.status).send({
//        //                    code: err.code,
//        //                    msg: err.message
//        //                });
//        //            }
//        //        })
//        //        .all(function (req, res, next) {
//        //            if (req.user.role) {
//        //                next();
//        //            } else {
//        //                var visitorAllow = route.visitorAllow;
//        //                var method = req.method.toLowerCase();
//        //
//        //                if (visitorAllow && visitorAllow.indexOf(method) !== -1) {
//        //                    next();
//        //                } else {
//        //                    res.status(401).send(config.ERR_MSG.permissionDenied);
//        //                }
//        //            }
//        //        });
//        //}
//    });
//    //.when('/authorization', {
//    //    action: authorization,
//    //    requireJwt: false
//    //})
//    //.when('/register', {
//    //    action: register,
//    //    requireJwt: false
//    //})
//    //.when('/post/:id?', {
//    //    action: post,
//    //    requireJwt: true,
//    //    visitorAllow: ['get']
//    //})
//    //.when('/posts/count', {
//    //    action: postsCount,
//    //    requireJwt: true,
//    //    visitorAllow: ['get']
//    //})
//    //.when('/posts/:skip?/:limit?', {
//    //    action: posts,
//    //    requireJwt: true,
//    //    visitorAllow: ['get']
//    //})
//    //.when('/draft/:id?', {
//    //    action: draft,
//    //    requireJwt: true,
//    //    visitorAllow: false
//    //})
//    //.when('/drafts/:postId/count', {
//    //    action: draftsCount,
//    //    requireJwt: true,
//    //    visitorAllow: false
//    //})
//    //.when('/drafts/:postId', {
//    //    action: drafts,
//    //    requireJwt: true,
//    //    visitorAllow: false
//    //})
//    //.when('/tag/:id?', {
//    //    action: tag,
//    //    requireJwt: true,
//    //    visitorAllow: ['get']
//    //})
//    //.when('/tags/count', {
//    //    action: tagsCount,
//    //    requireJwt: true,
//    //    visitorAllow: ['get']
//    //})
//    //.when('/tags/:skip?/:limit?', {
//    //    action: tags,
//    //    requireJwt: true,
//    //    visitorAllow: ['get']
//    //})
//    //.when('/comment/:id?', {
//    //    action: comment,
//    //    requireJwt: true,
//    //    visitorAllow: ['get', 'post', 'put', 'delete']
//    //})
//    //.when('/comments/:postId/count', {
//    //    action: commentsCount,
//    //    requireJwt: true,
//    //    visitorAllow: ['get']
//    //})
//    //.when('/comments/:postId/:skip?/:limit?', {
//    //    action: comments,
//    //    requireJwt: true,
//    //    visitorAllow: ['get']
//    //})
//    //.when('/user/:id?', {
//    //    action: user,
//    //    requireJwt: true,
//    //    visitorAllow: false
//    //})
//    //.when('/users/count', {
//    //    action: usersCount,
//    //    requireJwt: true,
//    //    visitorAllow: false
//    //})
//    //.when('/users/:skip?/:limit?', {
//    //    action: users,
//    //    requireJwt: true,
//    //    visitorAllow: false
//    //})
//    //.when('/role/:id?', {
//    //    action: role,
//    //    requireJwt: true,
//    //    visitorAllow: false
//    //})
//    //.when('/roles/Count', {
//    //    action: rolesCount,
//    //    requireJwt: true,
//    //    visitorAllow: false
//    //})
//    //.when('/roles/:skip?/:limit?', {
//    //    action: roles,
//    //    requireJwt: true,
//    //    visitorAllow: false
//    //})
//    //.when('/setting/:id?', {
//    //    action: setting,
//    //    requireJwt: true,
//    //    visitorAllow: false
//    //})
//    //.when('/settings/count', {
//    //    action: settingsCount,
//    //    requireJwt: true,
//    //    visitorAllow: false
//    //})
//    //.when('/settings/:scopes/:skip?/:limit?', {
//    //    action: settings,
//    //    requireJwt: true,
//    //    visitorAllow: ['get']
//    //});

module.exports = router;