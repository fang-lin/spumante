/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'config',
    'angular',
    'angular-route',
    'angular-animate',
    'angular-translate',
    'routes/all',
    'controllers/all',
    'directives/all',
    'filters/all',
    'resources/all',
    'services/all',
    'constants/all'
], function (config) {
    'use strict';

    var name = config.name;
    var app = angular
        .module(name, [
            'ngRoute',
            'ngAnimate',
                name + '.routes',
                name + '.controllers',
                name + '.directives',
                name + '.filters',
                name + '.resources',
                name + '.services',
                name + '.constants'
        ])
        .run([
            '$rootScope',
            '$location',
            '$route',
            '$routeParams',
            '$log',
            'MENU',
            'INFO',
            'SETTINGS',
            'Settings',
            'authorization',
            'AUTH_EVENTS',
            function ($rootScope, $location, $route, $routeParams, $log, MENU, INFO, SETTINGS, Settings, authorization, AUTH_EVENTS) {

                $rootScope.isLogin = authorization.isLogin();
                $rootScope.user = authorization.user();

                $rootScope.menu = MENU;
                $rootScope.info = INFO;

                $rootScope.fetchSettings = function (force) {
                    if (force || !$rootScope.settings) {
                        Settings.query({scopes: 'admin'}, function (res) {
                            var settings = {};
                            res.forEach(function (setting) {
                                settings[setting.key] = setting.value;
                            });
                            $rootScope.settings = angular.extend({}, SETTINGS, settings);
                        });
                    }
                };

                $rootScope.$on('$routeChangeStart', function (event, next, current) {
                    $log.log('routeChangeStart:', next.controller);

                    if ($rootScope.isLogin) {
                        if (next.access && next.access.requireLogout) {
                            $location.path('/dashboard');
                        }
                    } else {
                        if (next.access && next.access.requireLogin) {
                            if (authorization.hasArgot()) {
                                authorization.toArgot();
                            } else {
                                $location.path('/login');
                            }
                        }
                    }
                });

                $rootScope.$on(AUTH_EVENTS.loginSuccess, function (event, redirect) {
                    $log.log(AUTH_EVENTS.loginSuccess);

                    $rootScope.isLogin = true;
                    $rootScope.user = authorization.user();
                    $rootScope.fetchSettings();
                    redirect && $location.path('/dashboard');
                });

                $rootScope.$on(AUTH_EVENTS.logoutSuccess, function () {
                    $log.log(AUTH_EVENTS.logoutSuccess);

                    $rootScope.isLogin = false;
                    $location.path('/login');
                });

                $rootScope.$on(AUTH_EVENTS.sessionTimeout, function () {
                    $log.log(AUTH_EVENTS.sessionTimeout);

                    authorization.logout();
                    $rootScope.isLogin = false;
                    $location.path('/login');
                });

                $rootScope.$on(AUTH_EVENTS.invalidSession, function () {
                    $log.log(AUTH_EVENTS.invalidSession);

                    authorization.logout();
                    $rootScope.isLogin = false;
                    $location.path('/login');
                });

                $rootScope.$on(AUTH_EVENTS.notAuthorized, function () {
                    $log.log(AUTH_EVENTS.notAuthorized);
                });

                $rootScope.$on(AUTH_EVENTS.notAuthenticated, function () {
                    $log.log(AUTH_EVENTS.notAuthenticated);
                });

                if ($rootScope.isLogin) {
                    $rootScope.fetchSettings();
                }
            }
        ]);
});