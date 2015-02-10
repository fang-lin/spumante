/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'config'
], function (config) {
    'use strict';

    return [
        '$http',
        '$rootScope',
        'session',
        'AUTH_EVENTS',
        function ($http, $rootScope, session, AUTH_EVENTS) {
            return {
                login: function (account) {
                    $http
                        .post(config.apiBase + '/authorization', account)
                        .then(function (res) {
                            if (res.status === 200) {
                                if (res.data.token) {
                                    session.create(res.data);
                                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, true);
                                }
                            } else {
                                alert(res.data.code);
                            }
                        });
                },
                isLogin: function () {
                    console.log(session.token());
                    return !!session.token();
                },
                toArgot: function () {
                    var argot = session.argot();

                    if (argot) {
                        $http
                            .post(config.apiBase + '/authorization', {
                                argot: argot
                            })
                            .then(function (res) {
                                if (res.status === 200) {
                                    if (res.data.token) {
                                        session.create(res.data);
                                        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                                    }
                                } else {
                                    alert(res.data.code);
                                }
                            });
                    }
                },
                hasArgot: function () {
                    return !!session.argot();
                },
                user: function () {
                    return session.user();
                },
                logout: function () {
                    session.destroy();
                    $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
                }
//                isAuthorized: function (authorizedRoles) {
//                    if (!angular.isArray(authorizedRoles)) {
//                        authorizedRoles = [authorizedRoles];
//                    }
//
//                    return (this.isAuthenticated()
//                        && authorizedRoles.indexOf(session.userRole) !== -1);
//                }
            };
        }];
});