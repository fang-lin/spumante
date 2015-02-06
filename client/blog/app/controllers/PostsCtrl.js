/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define(function () {
    'use strict';

    return [
        '$rootScope',
        '$routeParams',
        '$scope',
        '$location',
        'Posts',
        function ($rootScope, $routeParams, $scope, $location, Posts) {
            console.log('ggggggggggg')
            $rootScope.$watch('settings', function (settings) {
                if ($rootScope.isSignIn && settings) {
                    $scope.refresh = function () {
                        Posts.count.get(function (res) {
                            $scope.count = res.count;
                        });
                        $scope.posts = Posts.query({
                            skip: $scope.skip,
                            limit: $scope.limit
                        });
                    };

                    $scope.skip = $routeParams.skip || 0;
                    $scope.limit = $routeParams.limit || settings['pager_limit'] || 10;
                    $scope.refresh();
                }
            });
        }];
});