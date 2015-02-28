/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

var _ = require('underscore');

function Router(router) {
    this._router = router;
}

Router.prototype.alls = [];
Router.prototype.injects = {};

Router.prototype.all = function (fn) {
    this.alls.push(fn);
    return this;
};

Router.prototype.when = function (path, opt) {
    var router = this._router.route(path);
    _.extend(router, this.injects);

    this.alls.forEach(function (fn) {
        fn(router, route);
    });
    opt.use(router = this._router.route(path));
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

module.exports = function (router) {
    return new Router(router);
};