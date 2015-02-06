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
//            var localStorage = $window.localStorage;

            var Session = function () {

                this.create = function (data) {
                    sessionStorage.ticket = data.ticket;
                    sessionStorage.visitor = JSON.stringify(data.visitor);
                };

                this.ticket = function () {
                    return sessionStorage.ticket;
                };

                this.visitor = function () {
                    return JSON.parse(sessionStorage.visitor || '{}');
                };

                this.destroy = function () {
                    delete sessionStorage.ticket;
                    delete sessionStorage.visitor;
                };
            };

            return new Session();
        }];
});