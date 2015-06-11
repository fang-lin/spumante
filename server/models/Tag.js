/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */
var mongoose = require('mongoose');

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

module.exports = mongoose.model('Tag', TagSchema);
