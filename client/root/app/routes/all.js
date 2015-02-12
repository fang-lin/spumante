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
                    .when('/', {
                        controller: 'DashboardCtrl',
                        templateUrl: 'app/views/dashboard.html<&=tail("root/app/views/dashboard.html")&>',
                        access: {requireLogin: true}
                    })
                    .when('/login', {
                        controller: 'LoginCtrl',
                        templateUrl: 'app/views/login.html<&=tail("root/app/views/login.html")&>',
                        access: {requireLogout: true}
                    })
                    .when('/logout', {
                        controller: 'LogoutCtrl',
                        template: '',
                        access: {requireLogin: true}
                    })
                    .when('/dashboard', {
                        controller: 'DashboardCtrl',
                        templateUrl: 'app/views/dashboard.html<&=tail("root/app/views/dashboard.html")&>',
                        access: {requireLogin: true}
                    })
                    .when('/post/:id?', {
                        controller: 'PostCtrl',
                        templateUrl: 'app/views/post.html<&=tail("root/app/views/post.html")&>',
                        access: {requireLogin: true}
                    })
                    .when('/posts/:skip?/:limit?', {
                        controller: 'PostsCtrl',
                        templateUrl: 'app/views/posts.html<&=tail("root/app/views/posts.html")&>',
                        access: {requireLogin: true}
                    })
                    .when('/tag/:id?', {
                        controller: 'TagCtrl',
                        templateUrl: 'app/views/tag.html<&=tail("root/app/views/tag.html")&>',
                        access: {requireLogin: true}
                    })
                    .when('/tags/:skip?/:limit?', {
                        controller: 'TagsCtrl',
                        templateUrl: 'app/views/tags.html<&=tail("root/app/views/tags.html")&>',
                        access: {requireLogin: true}
                    })
                    .when('/comment/:id?', {
                        controller: 'CommentCtrl',
                        templateUrl: 'app/views/comment.html<&=tail("root/app/views/comment.html")&>',
                        access: {requireLogin: true}
                    })
                    .when('/comments/:skip?/:limit?', {
                        controller: 'CommentsCtrl',
                        templateUrl: 'app/views/comments.html<&=tail()&>',
                        access: {requireLogin: true}
                    })
                    .when('/user/:id?', {
                        controller: 'UserCtrl',
                        templateUrl: 'app/views/user.html<&=tail()&>',
                        access: {requireLogin: true}
                    })
                    .when('/users/:skip?/:limit?', {
                        controller: 'UsersCtrl',
                        templateUrl: 'app/views/users.html<&=tail()&>',
                        access: {requireLogin: true}
                    })
                    .when('/role/:id?', {
                        controller: 'RoleCtrl',
                        templateUrl: 'app/views/role.html<&=tail()&>',
                        access: {requireLogin: true}
                    })
                    .when('/roles/:skip?/:limit?', {
                        controller: 'RolesCtrl',
                        templateUrl: 'app/views/roles.html<&=tail()&>',
                        access: {requireLogin: true}
                    })
                    .when('/setting/:id?', {
                        controller: 'SettingCtrl',
                        templateUrl: 'app/views/setting.html<&=tail()&>',
                        access: {requireLogin: true}
                    })
                    .when('/settings/:skip?/:limit?', {
                        controller: 'SettingsCtrl',
                        templateUrl: 'app/views/settings.html<&=tail()&>',
                        access: {requireLogin: true}
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
            }]);

    return routes;
});
