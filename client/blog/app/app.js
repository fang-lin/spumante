/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'config',
    'services/all',
    'routes/all',
    'controllers/all',
    'directives/all',
    'filters/all',
    'resources/all',
    'constants/all',
    'angular',
    'angular-route',
    'angular-ui-router',
    'angular-animate',
    'angular-translate'
], function (config) {
    'use strict';

    var name = config.name;
    angular
        .module(name, [
            'ngRoute',
            'ui.router',
            'ngAnimate',
                name + '.routes',
                name + '.services',
                name + '.controllers',
                name + '.directives',
                name + '.filters',
                name + '.resources',
                name + '.constants'
        ])
        .run([
            '$rootScope',
            '$log',
            'MENU',
            'INFO',
            'SETTINGS',
            'VISITOR_EVENTS',
            'Settings',
            'register',
            function ($rootScope, $log, MENU, INFO, SETTINGS, VISITOR_EVENTS, Settings, register) {

                $rootScope.isSignIn = register.isSignIn();
                $rootScope.visitor = register.visitor();

                $rootScope.menu = MENU;
                $rootScope.info = INFO;

                $rootScope.fetchSettings = function (force) {
                    if (force || !$rootScope.settings) {
                        Settings.query({
                            scopes: 'blog'
                        }, function (res) {
                            var settings = {};
                            res.forEach(function (setting) {
                                settings[setting.key] = setting.value;
                            });
                            $rootScope.settings = angular.extend({}, SETTINGS, settings);
                        });
                    }
                };

                $rootScope.$on(VISITOR_EVENTS.signInSuccess, function (event) {
                    $log.log(VISITOR_EVENTS.signInSuccess);

                    $rootScope.isSignIn = true;
                    $rootScope.visitor = register.visitor();
                    $rootScope.fetchSettings();
                });

                $rootScope.$on('$routeChangeStart', function (event, next, current) {
                    $log.log('routeChangeStart:', next.controller);
                });

                if ($rootScope.isSignIn) {
                    $rootScope.fetchSettings();
                } else {
                    register.signIn();
                }
            }
        ]);
});