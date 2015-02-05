/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'mongoose'
], function (mongoose) {
    'use strict';

    var Schema = mongoose.Schema;
    var RoleSchema = new Schema({
        name: {
            type: String,
            unique: true,
            index: true,
            required: true
        },
        privilege: Array,
        note: String
    });
    var Role = mongoose.model('Role', RoleSchema);
    return Role;
});