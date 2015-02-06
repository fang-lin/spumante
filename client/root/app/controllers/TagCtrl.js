/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'underscore'
], function (_) {
    'use strict';

    return [
        '$rootScope',
        '$scope',
        '$routeParams',
        '$location',
        'Tag',
        function ($rootScope, $scope, $routeParams, $location, Tag) {

            $rootScope.$watch('settings', function (settings) {
                if ($rootScope.isLogin && settings) {
                    var id = $routeParams.id;

                    if (id) {
                        // edit
                        $scope.tag = Tag.get({id: id});
                    } else {
                        // add
                        $scope.tag = {
                            name: _.random(100000, 999999)
                        };
                    }

                    $scope.submit = function (tag) {
                        event.preventDefault();

                        var $tag = tag;

                        if (0 && $tag._id) {
                            // update existing tag
                            Tag.update($tag, function (tag) {
                                // todo: alert success.
                            });
                        } else {
                            // create new tag
                            $tag = {
                                name: _.random(100000, 999999)
                            };

                            Tag.save($tag, function (tag) {
                                $tag._id = tag._id;

                                $location.path('/tag');
                            });
                        }
                    };
                }
            });
        }];
});