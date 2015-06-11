/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

function Router(router) {
    this._router = router;
}

Router.prototype.alls = [];

Router.prototype.all = function (fn) {
    this.alls.push(fn);
    return this;
};

Router.prototype.when = function (opt) {
    var router = this._router.route(opt.path);
    this.alls.forEach(function (fn) {
        fn(router, opt);
    });
    opt.action(router);
    return this;
};

module.exports = function (router) {
    return new Router(router);
};