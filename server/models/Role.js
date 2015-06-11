/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */
var mongoose = require('mongoose');

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

module.exports = mongoose.model('Role', RoleSchema);