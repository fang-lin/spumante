/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'config',
    'underscore'
], function (config, _) {

    function Router(expressRouter) {
        this.expressRouter = expressRouter;
    }

    Router.prototype.alls = [];
    Router.prototype.injects = {};

    Router.prototype.all = function (fn) {
        this.alls.push(fn);
        return this;
    };

    Router.prototype.when = function (path, route) {
        var router = this.expressRouter.route(path);
        _.extend(router, this.injects);

        this.alls.forEach(function (fn) {
            fn(router, route);
        });
        route.action(router);
        return this;
    };

    Router.prototype.inject = function (key, value) {
        this.injects[key] = value;
        return this;
    };

//    Router.prototype.inject = function (err, res, callback) {
//        if (err) {
//            logger.error(err);
//            res.status(500).send({
//                code: err.code,
//                msg: err.message
//            });
//        } else {
//            callback(logger);
//        }
//    };

    return function (expressRouter) {
        return new Router(expressRouter);
    };

});