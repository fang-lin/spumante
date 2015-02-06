/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'config',
    'controllers/PostsCtrl',
    'controllers/CatalogCtrl',
    'controllers/PostCtrl',
    'controllers/AboutCtrl',
    'angular'
], function (config, PostsCtrl, CatalogCtrl, PostCtrl, AboutCtrl) {
    'use strict';

    var controllers = angular.module(config.name + '.controllers', [])
        .controller('PostsCtrl', PostsCtrl)
        .controller('CatalogCtrl', CatalogCtrl)
        .controller('PostCtrl', PostCtrl)
        .controller('AboutCtrl', AboutCtrl);

    return controllers;
});