const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String},
    brandImg: {type: String},
    thumbImg: {type: String},
    featuredImg: {type: String},
    trailer : {type: String},
    video: {type: String},
    year: {type: String},
    limit: {type: Number},
    duration: {type: String},
    type: { type: String},
    genre: {type: String},
}, {timestamps: true});

module.exports = mongoose.model("Movie", MovieSchema);