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
        '$window',
        'session',
        'encrypt',
        'VISITOR_EVENTS',
        function ($http, $rootScope, $window, session, encrypt, VISITOR_EVENTS) {
            return {
                signIn: function () {
                    var verification = encrypt.md5($window.navigator.userAgent);
                    $http
                        .post(config.apiBase + '/register', {
                            verification: verification
                        })
                        .then(function (res) {
                            if (res.status === 200) {
                                if (res.data.ticket) {
                                    session.create(res.data);
                                    $rootScope.$broadcast(VISITOR_EVENTS.signInSuccess);
                                }
                            } else {
                                alert(res.data.code);
                            }
                        });
                },
                visitor: function () {
                    return session.visitor();
                },
                isSignIn: function () {
                    return !!session.ticket();
                }
//                isAuthorized: function (authorizedRoles) {
//                    if (!angular.isArray(authorizedRoles)) {
//                        authorizedRoles = [authorizedRoles];
//                    }
//
//                    return (this.isAuthenticated()
//                        && authorizedRoles.indexOf(session.userRole) !== -1);
//                }
            }
        }];
});