const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

name: String,

surname: String,

password: String,

age: Number,

email: String,

}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;