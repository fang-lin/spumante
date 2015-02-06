/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'config',
    'services/resourceFactory',
    'services/encryptFactory',
    'services/authorizationFactory',
    'services/authorizationInterceptorFactory',
    'services/sessionFactory',
    'services/path',
    'angular',
    'angular-resource'
], function (config, resourceFactory, encryptFactory, authorizationFactory, authorizationInterceptorFactory, sessionFactory, path) {
    'use strict';

    var services = angular.module(config.name + '.services', ['ngResource'])
        .factory('resource', resourceFactory)
        .factory('encrypt', encryptFactory)
        .factory('authorization', authorizationFactory)
        .factory('authorizationInterceptor', authorizationInterceptorFactory)
        .factory('session', sessionFactory)
        .config([
            '$httpProvider',
            function ($httpProvider, $resourceProvider) {
                $httpProvider.interceptors.push('authorizationInterceptor');
            }])
        .run(path);

    return services;
});