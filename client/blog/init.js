/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

requirejs.config({
    paths: {
        // Libs
        'jquery': '/lib/jquery/dist/jquery',
        'underscore': '/lib/underscore/underscore',
        'crypto': '/lib/crypto/crypto',
        'bootstrap': '/lib/bootstrap/dist/js/bootstrap',
        'angular': '/lib/angular/angular',
        'angular-resource': '/lib/angular-resource/angular-resource',
        'angular-route': '/lib/angular-route/angular-route',
        'angular-ui-router': '/lib/angular-ui-router/release/angular-ui-router',
        'angular-animate': '/lib/angular-animate/angular-animate',
        'angular-translate': '/lib/angular-translate/angular-translate',
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
        bootstrap: {
            deps: ['jquery']
        },
        angular: {
            deps: ['jquery']
        },
        'angular-resource': {
            deps: ['angular']
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-ui-router': {
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
    'bootstrap',
    'angular',
    'app'
], function (config) {
    'use strict';

    angular.bootstrap(document, [config.name]);
});





