const {doesUserExist} = require("../services/user");
const {generateOtp, getOtp,doesOtpValid} = require("../services/otp");
const {sendOtpEmail} = require("../services/email");
const { compareSync } = require("bcryptjs");


const sendOtp = async (req, res) => {
    const {email} = req.body;

    if (!email) {
        return res.status(400).json({message: 'Email is required'});
    }
    if (!await doesUserExist(email)) {
        return res.status(404).json({message: 'User not found'});
    }
    try {
        const otp = await generateOtp(email);
        await sendOtpEmail(otp);
        res.status(200).json({message: 'OTP sent successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

const verifyOtp = async (req, res) => {
    const {email, otp: otpCode} = req.body;
    if (!otpCode) {
        return res.status(400).json({message: 'OTP are required'});
    }
    try {
        const expectedOtp = await getOtp(email);
        if (expectedOtp.code !== otpCode) {
            return res.status(400).json({message: 'Invalid OTP'});
        }
        res.status(200).json({message: 'OTP verified successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }

}
module.exports = {
    sendOtp,
    verifyOtp
};