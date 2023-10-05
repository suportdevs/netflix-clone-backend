const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    firstname: {type: String},
    lastname: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String}
}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);