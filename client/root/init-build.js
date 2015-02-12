/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

requirejs.config({
    paths: {
        // Libs
        'jquery': '/lib/jquery.min.js<&= tail("lib/jquery.min.js") &>',
        'underscore': '/lib/underscore-min.js<&= tail("lib/underscore.min.js") &>',
        'crypto': '/lib/crypto.min.js<&= tail("lib/crypto.min.js") &>',
        'angular': '/lib/angular.min.js<&= tail("lib/angular.min.js") &>',
        'angular-resource': '/lib/angular-resource.min.js<&= tail("lib/angular-resource.min.js") &>',
        'angular-route': '/lib/angular-route.min.js<&= tail("lib/angular-route.min.js") &>',
        'angular-animate': '/lib/angular-animate.min.js<&= tail("lib/angular-animate.min.js") &>',
        'angular-translate': '/lib/angular-translate.min.js<&= tail("lib/angular-translate.min.js") &>',
        // Apps
        'config': 'app/config',
        'app': 'app/app',
        'services': 'app/services',
        'controllers': 'app/controllers',
        'routes': 'app/routes',
        'directives': 'app/directives',
        'filters': 'app/filters',
        'resources': 'app/resources',
        'constants': 'app/constants'
    },
    shim: {
        angular: {
            deps: ['jquery']
        },
        'angular-resource': {
            deps: ['angular']
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-animate': {
            deps: ['angular']
        },
        'angular-translate': {
            deps: ['angular']
        }
    }
});

require([
    'config',
    'angular',
    'app'
], function (config) {
    'use strict';

    angular.bootstrap(document, [config.name]);
});







