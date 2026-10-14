const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true }, // stored as a hash, never plain text
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('User', userSchema);