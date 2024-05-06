const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT || 5000,
  WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  EMAIL_USER: process.env.EMAIL_USER
};