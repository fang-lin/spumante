/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define(function () {
    'use strict';

    return [
        '$rootScope',
        '$scope',
        '$routeParams',
        '$location',
        'Post',
        'Posts',
        'AUTH_EVENTS',
        function ($rootScope, $scope, $routeParams, $location, Post, Posts, AUTH_EVENTS) {

            $rootScope.$watch('settings', function (settings) {
                if ($rootScope.isLogin && settings) {
                    $scope.refresh = function () {
                        Posts.count.get(function (res) {
                            $scope.count = res.count;
                        });
                        $scope.posts = Posts.query({
                            skip: $scope.skip,
                            limit: $scope.limit
                        });
                    };

                    $scope.delete = function (postId) {
                        Post.delete({
                            id: postId
                        }, function (res) {
                            $scope.refresh();
                        });
                    };

                    $scope.skip = $routeParams.skip || 0;
                    $scope.limit = $routeParams.limit || settings['pager_limit'] || 10;
                    $scope.refresh();
                }
            });
        }
    ];
});