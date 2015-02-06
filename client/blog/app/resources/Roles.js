/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define(function () {
    'use strict';

    return ['resource', function (resource) {
        var Roles = resource('/roles/:skip/:limit');
        Roles.count = resource('/roles/count');
        return Roles;
    }];
});
