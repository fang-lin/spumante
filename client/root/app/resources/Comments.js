/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define(function () {
    'use strict';

    return ['resource', function (resource) {
        var Comments = resource('/comments/:postId/:skip/:limit');
        Comments.count = resource('/comments/:postId/count');
        return Comments;
    }];
});