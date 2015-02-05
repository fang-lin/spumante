/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'mongoose'
], function (mongoose) {
    'use strict';

    var Schema = mongoose.Schema,
        Now = Date.now,

        VisitorSchema = new Schema({
            nickname: {
                type: String,
                default: 'anonymous',
                index: true
            },
            email: {
                type: String,
                default: '',
                index: true
            },
            registerAt: {
                type: Date,
                default: Now
            },
            clientIp: {
                type: String,
                default: '0.0.0.0'
            },
            userAgent: String,
            requestCount: {
                type: Number,
                default: 0
            }
        });

    var Visitor = mongoose.model('Visitor', VisitorSchema);

    return Visitor;
});
