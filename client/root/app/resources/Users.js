/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define(function () {
    'use strict';

    return ['resource', function (resource) {
        var Users = resource('/users/:skip/:limit');
        Users.count = resource('/users/count');
        return Users;
    }];
});
