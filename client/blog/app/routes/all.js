/**
 * Created by Justin on 14-6-5.
 */

define([
    'config',
    'angular'
], function (config) {
    'use strict';

    var routes = angular.module(config.name + '.routes', [])
        .config([
            '$routeProvider',
            '$locationProvider',
            function ($routeProvider, $locationProvider) {

                $locationProvider.html5Mode(true);

                $routeProvider
                    .when('/catalog', {
                        templateUrl: 'app/views/catalog.html',
                        controller: 'CatalogCtrl'
                    })
                    .when('/post/:id/:skip?/:limit?', {
                        templateUrl: 'app/views/post.html',
                        controller: 'PostCtrl'
                    })
                    .when('/about', {
                        templateUrl: 'app/views/about.html',
                        controller: 'AboutCtrl'
                    })
                    .when('/:skip?/:limit?', {
                        templateUrl: 'app/views/posts.html',
                        controller: 'PostsCtrl'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
            }]);
    return routes;
});
