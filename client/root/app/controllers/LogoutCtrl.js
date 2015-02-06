/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define(function () {
    'use strict';

    return [
        '$rootScope',
        '$location',
        'authorization',
        function ($rootScope, $location, authorization) {

            if ($rootScope.isLogin) {
                authorization.logout();
            } else {
                $location.path('/login');
            }
        }];
});