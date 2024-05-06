const mongoose = require('../db.js');

const otpSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        expires: 300 
    }
});

module.exports = mongoose.model('Otp', otpSchema);
