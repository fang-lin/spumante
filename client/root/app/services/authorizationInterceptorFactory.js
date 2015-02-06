/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define(function () {
    'use strict';

    return [
        '$rootScope',
        '$q',
        'session',
        'AUTH_EVENTS',
        function ($rootScope, $q, session, AUTH_EVENTS) {
            return {
                request: function (config) {
                    var token = session.token();

                    if (token) {
                        config.headers = config.headers || {};
                        config.headers.Authorization = 'Bearer ' + token;
                    } else {
                        delete config.headers.Authorization;
                    }
                    return config;
                },
                requestError: function (rejection) {
                    return $q.reject(rejection);
                },
                response: function (res) {
                    return res;
                },
                responseError: function (rejection) {
                    var data = rejection.data;
                    if (rejection.status === 401) {

                        if (data.code === 'not_authenticated') {
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated, data.msg);
                        } else if (data.code === 'invalid_token') {

                            if (data.msg === 'jwt expired' && session.token()) {
                                $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout);
                            } else {
                                $rootScope.$broadcast(AUTH_EVENTS.invalidSession);
                            }

                        } else if (data.code === 'not_authorized') {
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                        } else {
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                        }

                    } else if (rejection.status === 500) {
                        // Server Error
                        // $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated, data.msg);
                    }
                    return $q.reject(rejection);
                }
            };
        }];
});