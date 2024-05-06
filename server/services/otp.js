const {WEATHER_API_KEY} = require("../config");
const getWeatherForRandomCities = require("./weather");
const Otp = require("../models/otp");

const generateOtp = async (email) => {
    let otpCode = '';
    if (WEATHER_API_KEY) {
        const weatherData = await getWeatherForRandomCities(WEATHER_API_KEY);
        weatherData.forEach(city => {
            if (city.temperature < 0) {
                city.temperature = Math.abs(city.temperature);
            }
            city.temperature = Math.round(city.temperature);
        });
        otpCode = weatherData.map(city => city.temperature.toString().padStart(2, '0')).join('');
    } else {
        otpCode = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    }
    return upsertOtp(email, otpCode)
}

const upsertOtp = async (email, otpCode) => {
    const otp = await Otp.findOneAndUpdate({userEmail: email}, {
        code: otpCode,
        expiresAt: Date.now() + 300000
    }, {upsert: true, new: true});
    return otp;
}

const getOtp = async (email) => {
    return await Otp.findOne({userEmail: email});
}

const doesOtpValid = async (expectedOtp,otpCode) => {
    return expectedOtp.code === otpCode;
}

module.exports = {
    generateOtp,
    getOtp,
    doesOtpValid
}