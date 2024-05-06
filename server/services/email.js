const sgMail = require("@sendgrid/mail");
const {SENDGRID_API_KEY, EMAIL_USER} = require("../config");

const sendOtpEmail = async (otp) => {
    sgMail.setApiKey(SENDGRID_API_KEY);
    const mailOptions = {
        to: otp.userEmail,
        from: EMAIL_USER,
        subject: 'Your OTP for Lognet-system',
        text: `Your One-Time Password (OTP) is: ${otp.code}, your OTP will expire in 5 minutes.`
    };
    try {
        const response = await sgMail.send(mailOptions);
    } catch (error) {
        throw new Error("Error sending email");
    }
}

module.exports = {
    sendOtpEmail
}