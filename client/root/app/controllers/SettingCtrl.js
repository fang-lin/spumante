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
        'Setting',
        function ($rootScope, $scope, $routeParams, $location, Setting) {

            $rootScope.$watch('settings', function (settings) {
                if ($rootScope.isLogin && settings) {

                    var id = $routeParams.id;

                    if (id) {
                        // edit
                        $scope.setting = Setting.get({id: id});
                    } else {
                        // add
                        $scope.setting = {
                            scopes: ''
                        };
                    }

                    $scope.submit = function (setting) {
                        event.preventDefault();

                        var $setting = setting;
                        $setting.scopes = _.compact($setting.scopes.split(' '));

                        if ($setting._id) {
                            // update existing setting
                            Setting.update($setting, function (setting) {
                                // update settings
                                $rootScope.fetchSettings(true);
                                // todo: alert success.
                            });
                        } else {
                            // create new setting
                            Setting.save($setting, function (setting) {
                                // update settings
                                $rootScope.fetchSettings(true);
                                $setting._id = setting._id;
                                $location.path('/setting/' + $setting._id, true);
                            });
                        }
                    };
                }
            });
        }];
});