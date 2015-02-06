/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'config',
    'services/resourceFactory',
    'services/encryptFactory',
    'services/registerFactory',
    'services/registerInterceptorFactory',
    'services/sessionFactory',
    'services/path',
    'angular',
    'angular-resource'
], function (config, resourceFactory, encryptFactory, registerFactory, registerInterceptorFactory, sessionFactory, path) {
    'use strict';

    var services = angular.module(config.name + '.services', ['ngResource'])
        .factory('resource', resourceFactory)
        .factory('encrypt', encryptFactory)
        .factory('register', registerFactory)
        .factory('registerInterceptor', registerInterceptorFactory)
        .factory('session', sessionFactory)
        .config([
            '$httpProvider',
            function ($httpProvider) {
                $httpProvider.interceptors.push('registerInterceptor');
            }]);
//        .run(path);

    return services;
});