/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define(function () {
    'use strict';

    return [
        function () {
            var link = function (scope, ele, attrs) {

            };
            return {
                restrict: 'E',
                templateUrl: 'app/partials/dropdown.html<&=tail("root/app/partials/dropdown.html")&>',
                replace: true,
                scope: {},
                link: link
            };
        }
    ];
});