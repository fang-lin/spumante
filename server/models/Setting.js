/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var SettingSchema = new Schema({
    key: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    value: String,
    scopes: Array,
    note: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Setting', SettingSchema);