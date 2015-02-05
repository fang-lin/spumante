/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'mongoose'
], function (mongoose) {
    'use strict';

    var Schema = mongoose.Schema;
    var TagSchema = new Schema({
        name: {
            type: String,
            unique: true,
            index: true,
            required: true
        },
        count: {
            type: Number,
            default: 0
        }
    });
    var Tag = mongoose.model('Tag', TagSchema);
    return Tag;
});