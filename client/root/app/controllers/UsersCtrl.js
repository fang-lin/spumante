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
        'User',
        'Users',
        'AUTH_EVENTS',
        function ($rootScope, $scope, $routeParams, $location, User, Users, AUTH_EVENTS) {
            $rootScope.$watch('settings', function (settings) {
                if ($rootScope.isLogin && settings) {
                    $scope.refresh = function () {
                        Users.count.get(function (res) {
                            $scope.count = res.count;
                        });
                        $scope.users = Users.query({
                            skip: $scope.skip,
                            limit: $scope.limit
                        });
                    };

                    $scope.delete = function (userId) {
                        User.delete({
                            id: userId
                        }, function (res) {

                            $scope.refresh();
                        });
                    };

                    $scope.skip = $routeParams.skip || 0;
                    $scope.limit = $routeParams.limit || settings['pager_limit'] || 10;
                    $scope.refresh();
                }
            });
        }];
});