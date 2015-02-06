/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define(function () {
    'use strict';

    return [
        '$rootScope',
        '$route',
        '$location',
        function ($rootScope, $route, $location) {

            var original = $location.path;

            $location.path = function (path, still) {
                if (still) {
                    var lastRoute = $route.current;
                    var un = $rootScope.$on('$locationChangeSuccess', function () {
                        $route.current = lastRoute;
                        un();
                    });
                }
                return original.call($location, path);
            };
        }];
});


