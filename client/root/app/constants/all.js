/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'config',
    'constants/MENU',
    'constants/INFO',
    'constants/SETTINGS',
    'constants/AUTH_EVENTS',
    'angular'
], function (config, MENU, INFO, SETTINGS, AUTH_EVENTS) {
    'use strict';

    var constants = angular.module(config.name + '.constants', [])
        .constant('MENU', MENU)
        .constant('INFO', INFO)
        .constant('SETTINGS', SETTINGS)
        .constant('AUTH_EVENTS', AUTH_EVENTS)
        .constant('SALT', 'd8437cf0a5416a9742fc8742dd22b6fb');

    return constants;
});