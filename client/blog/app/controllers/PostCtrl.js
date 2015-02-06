/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define(function () {
    'use strict';

    return [
        '$rootScope',
        '$routeParams',
        '$scope',
        '$location',
        'Post',
        'Comment',
        'Comments',
        function ($rootScope, $routeParams, $scope, $location, Post, Comment, Comments) {

            function randomStr(size) {
                return Math.random().toString(32).slice(2, 2 + size || 10);
            }

            $rootScope.$watch('settings', function (settings) {
                    if ($rootScope.isSignIn && settings) {
                        var id = $routeParams.id;
                        if (id) {
                            $scope.refreshComment = function () {
                                $scope.comment = {
                                    post: id,
                                    nickname: randomStr(),
                                    email: randomStr() + '@' + randomStr(3) + '.com',
                                    text: randomStr() + ' ' + randomStr() + ' ' + randomStr() + ' ' + randomStr() + ' ' + randomStr() + ' ' + randomStr() + ' ' + randomStr() + ' ' + randomStr() + ' ' + randomStr() + ' ' + randomStr() + ' ' + randomStr() + ' ' + randomStr() + ' ' + randomStr() + ' ' + randomStr() + ' ' + randomStr() + ' ' + randomStr()
                                };
                            };

                            $scope.refreshComments = function () {
                                Comments.count.get({
                                    postId: id
                                }, function (res) {
                                    $scope.count = res.count;
                                });
                                $scope.comments = Comments.query({
                                    postId: id,
                                    skip: $scope.skip,
                                    limit: $scope.limit
                                });
                            };

                            $scope.submit = function (comment) {
                                event.preventDefault();
                                var $comment = comment;
                                // create new comment
                                Comment.save($comment, function (comment) {
                                    $scope.refreshComment();
                                    $scope.refreshComments();
                                });
                            };

                            $scope.skip = $routeParams.skip || 0;
                            $scope.limit = $routeParams.limit || settings['pager_limit'];
                            $scope.post = Post.get({id: id});
                            $scope.refreshComment();
                            $scope.refreshComments();
                        }
                    }
                }
            );
        }
    ];
});