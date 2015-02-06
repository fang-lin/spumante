/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define(function () {
    'use strict';

    return ['resource', function (resource) {
        var Tags = resource('/tags/:skip/:limit');
        Tags.count = resource('/tags/count');
        return Tags;
    }];
});
