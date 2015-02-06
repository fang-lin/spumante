/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

requirejs.config({
    paths: {
        // Libs
        'jquery': 'lib/jquery/dist/jquery.min',
        'underscore': 'lib/underscore/underscore',
        'crypto': 'lib/crypto/crypto.min',
        'bootstrap': 'lib/bootstrap/dist/js/bootstrap.min',
        'angular': 'lib/angular/angular.min',
        'angular-resource': 'lib/angular-resource/angular-resource.min',
        'angular-route': 'lib/angular-route/angular-route.min',
        'angular-animate': 'lib/angular-animate/angular-animate.min',
        'angular-translate': 'lib/angular-translate/angular-translate.min',
        // Apps
        'config': 'root/app/config',
        'app': 'root/app/app',
        'services': 'root/app/services',
        'controllers': 'root/app/controllers',
        'routes': 'root/app/routes',
        'directives': 'root/app/directives',
        'filters': 'root/app/filters',
        'resources': 'root/app/resources',
        'constants': 'root/app/constants'
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
        'angular-animate': {
            deps: ['angular']
        },
        'angular-translate': {
            deps: ['angular']
        }
    }
});