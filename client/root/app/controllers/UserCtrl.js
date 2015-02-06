/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'underscore'
], function (_) {
    'use strict';

    return [
        '$rootScope',
        '$scope',
        '$routeParams',
        '$location',
        'encrypt',
        'User',
        'Roles',
        'SALT',
        function ($rootScope, $scope, $routeParams, $location, encrypt, User, Roles, SALT) {

            $rootScope.$watch('settings', function (settings) {
                if ($rootScope.isLogin && settings) {
                    var id = $routeParams.id;

                    if (id) {
                        //edit
                        $scope.user = User.get({id: id});
                    } else {
                        // add
                        $scope.user = {};
                    }

                    $scope.roles = Roles.query();

                    $scope.submit = function (user) {
                        event.preventDefault();

                        var $user = user;
                        var _user = _.clone($user);

                        _user.password = encrypt.md5(encrypt.mixSalt(_user.password, SALT));

                        if ($user._id) {
                            // update existing user
                            User.update(_user, function (user) {
                                // todo: alert success.
                            });
                        } else {
                            // create existing user
                            User.save(_user, function (user) {
                                $user._id = user._id;
                                $user.createAt = user.createAt;
                                $location.path('/user/' + $user._id, true);
                            });
                        }
                    };
                }
            });
        }];
});