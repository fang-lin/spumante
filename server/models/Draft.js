/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'mongoose'
], function (mongoose) {
    'use strict';

    var Schema = mongoose.Schema;
    var ObjectId = Schema.Types.ObjectId;
    var Now = Date.now;
    var DraftSchema = new Schema({
        post: {
            type: ObjectId,
            index: true,
            required: true
        },
        text: String,
        saveAt: {
            type: Date,
            default: Now
        },
        flag: {
            type: String,
            default: 'birth'
        }
    });
    var Draft = mongoose.model('Draft', DraftSchema);
    Draft.on('error', function () {
        console.log('<<<<<<<<<<<<<<<<<');
    });
    return Draft;
});