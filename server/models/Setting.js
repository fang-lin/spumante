/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'mongoose'
], function (mongoose) {
    'use strict';

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
    var Setting = mongoose.model('Setting', SettingSchema);
    return Setting;
});