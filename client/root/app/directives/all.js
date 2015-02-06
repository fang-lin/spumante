/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'config',
    'directives/menuDir',
    'directives/pagerDir',
    'directives/dropdownDir',
    'angular'
], function (config, menuDir, pagerDir, dropdownDir) {
    'use strict';

    var directives = angular.module(config.name + '.directives', [])
        .directive('menu', menuDir)
        .directive('pager', pagerDir)
        .directive('dropdown', dropdownDir);

    return directives;
});