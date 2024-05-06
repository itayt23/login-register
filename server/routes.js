const express = require('express');
const router = express.Router();
const {sendOtp, verifyOtp} = require('./controllers/otpController');
const {register, updatePassword, verifyLogin} = require("./controllers/authController");

router.post('/api/send-otp', sendOtp);
router.post('/api/verify-otp', verifyOtp);
router.post('/register', register);
router.post('/api/verify-login', verifyLogin);
router.post('/update-password', updatePassword);

module.exports = router;