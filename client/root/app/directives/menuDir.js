/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define(function () {
    'use strict';

    return [
        '$compile',
        function ($compile) {

            return {
                restrict: 'E',
                templateUrl: 'app/partials/menu.html',
                scope: {
                    menu: '='
                },
                compile: function (tEle) {
                    var contents = tEle.contents().remove();
                    var compiled;
                    return function (scope, iEle) {
                        if (!compiled) {
                            compiled = $compile(contents);
                        }
                        compiled(scope, function (clone) {
                            iEle.replaceWith(clone);
                        });
                    };
                }
            };
        }
    ];
});