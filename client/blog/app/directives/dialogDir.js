/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define(function () {
    'use strict';

    return [
        function () {
            var link = function (scope, ele, attrs) {
                console.log(scope.list);
            };
            return {
                restrict: 'A',
                templateUrl: 'app/templates/dialog.html',
                replace: true,
                scope: {
                    list: '=list'
                },
                link: link
            };
        }
    ];
});