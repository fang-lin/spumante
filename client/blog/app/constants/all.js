/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'config',
    'constants/menu',
    'constants/INFO',
    'constants/SETTINGS',
    'constants/VISITOR_EVENTS',
    'angular'
], function (config, MENU, INFO, SETTINGS, VISITOR_EVENTS) {
    'use strict';

    var constants = angular.module(config.name + '.constants', [])
        .constant('MENU', MENU)
        .constant('INFO', INFO)
        .constant('SETTINGS', SETTINGS)
        .constant('VISITOR_EVENTS', VISITOR_EVENTS);

    return constants;
});