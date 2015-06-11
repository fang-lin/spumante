/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */
var mongoose = require('mongoose');

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

module.exports = mongoose.model('Draft', DraftSchema);

//Draft.on('error', function () {
//    console.log('<<<<<<<<<<<<<<<<<');
//});