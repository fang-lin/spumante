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
        'Role',
        function ($rootScope, $scope, $routeParams, $location, Role) {
            $rootScope.$watch('settings', function (settings) {
                if ($rootScope.isLogin && settings) {

                    var id = $routeParams.id;

                    if (id) {
                        // edit
                        $scope.role = Role.get({id: id});
                    } else {
                        // add
                        $scope.role = {};
                    }

                    $scope.submit = function (role) {
                        event.preventDefault();

                        var $role = role;

                        if ($role._id) {
                            // update existing role
                            Role.update($role, function (role) {
                                // todo: alert success.
                            });
                        } else {
                            // create new role
                            Role.save($role, function (role) {
                                $role._id = role._id;

                                var path = $location.path;
                                path(path() + $role._id, true);
                            });
                        }
                    };
                }
            });
        }];
});