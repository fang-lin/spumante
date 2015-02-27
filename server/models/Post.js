/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */
var mongoose = require('mongoose'),
    User = require('./User'),
    Draft = require('./Draft'),
    Tag = require('./Tag');

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//var VirtualType = Schema.Types.ObjectId;
var Now = Date.now;
var PostSchema = new Schema({
    title: {
        type: String,
        index: true,
        required: true
    },
    abstract: String,
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    draft: {
        type: ObjectId,
        ref: 'Draft'
    },
    tags: [
        {
            type: ObjectId,
            ref: 'Tag'
        }
    ],
    createAt: {
        type: Date,
        default: Now
    },
    clicks: {
        type: Number,
        default: 0
    },
    password: String,
    hidden: {
        type: Boolean,
        default: false
    },
    isPage: {
        type: Boolean,
        default: false
    },
    publish: {
        type: Boolean,
        default: false
    },
    removed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Post', PostSchema);
