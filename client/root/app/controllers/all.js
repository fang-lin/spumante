/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'config',
    'controllers/LoginCtrl',
    'controllers/LogoutCtrl',
    'controllers/DashboardCtrl',
    'controllers/PostCtrl',
    'controllers/PostsCtrl',
    'controllers/TagCtrl',
    'controllers/TagsCtrl',
    'controllers/CommentCtrl',
    'controllers/CommentsCtrl',
    'controllers/UserCtrl',
    'controllers/UsersCtrl',
    'controllers/RoleCtrl',
    'controllers/RolesCtrl',
    'controllers/SettingCtrl',
    'controllers/SettingsCtrl',
    'angular'
], function (config, LoginCtrl, LogoutCtrl, DashboardCtrl, PostCtrl, PostsCtrl, TagCtrl, TagsCtrl, CommentCtrl, CommentsCtrl, UserCtrl, UsersCtrl, RoleCtrl, RolesCtrl, SettingCtrl, SettingsCtrl) {
    'use strict';

    var controllers = angular.module(config.name + '.controllers', [])
        .controller('LoginCtrl', LoginCtrl)
        .controller('LogoutCtrl', LogoutCtrl)
        .controller('DashboardCtrl', DashboardCtrl)
        .controller('PostCtrl', PostCtrl)
        .controller('PostsCtrl', PostsCtrl)
        .controller('TagCtrl', TagCtrl)
        .controller('TagsCtrl', TagsCtrl)
        .controller('CommentCtrl', CommentCtrl)
        .controller('CommentsCtrl', CommentsCtrl)
        .controller('UserCtrl', UserCtrl)
        .controller('UsersCtrl', UsersCtrl)
        .controller('RoleCtrl', RoleCtrl)
        .controller('RolesCtrl', RolesCtrl)
        .controller('SettingCtrl', SettingCtrl)
        .controller('SettingsCtrl', SettingsCtrl);

    return controllers;
});