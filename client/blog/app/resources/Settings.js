/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define(function () {
    'use strict';

    return ['resource', function (resource) {
        var Settings = resource('/settings/:scopes');
        Settings.count = resource('/settings/count');
        return Settings;
    }];
});
