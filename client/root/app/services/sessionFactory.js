/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define(function () {
    'use strict';

    return [
        '$window',
        function ($window) {

            var sessionStorage = $window.sessionStorage;
            var localStorage = $window.localStorage;

            var Session = function () {
                this.create = function (data) {
                    sessionStorage.token = data.token;
                    if (data.argot) {
                        localStorage.argot = data.argot;
                    }
                    sessionStorage.user = JSON.stringify(data.user);
                };

                this.token = function () {
                    return sessionStorage.token;
                };

                this.argot = function () {
                    return localStorage.argot;
                };

                this.user = function () {
                    return JSON.parse(sessionStorage.user || '{}');
                };

                this.destroy = function () {
                    delete sessionStorage.token;
                    delete sessionStorage.user;
                    delete localStorage.argot;
                };
            };

            return new Session();
        }];
});