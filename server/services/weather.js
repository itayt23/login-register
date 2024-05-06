const axios = require('axios');
const {text} = require('express');

const cityList = [
    "London",
    "Paris",
    "New York",
    "Tokyo",
    "Los Angeles",
    "Mumbai",
    "Sydney",
    "Berlin",
    "Dubai",
    "Moscow",
    "Cairo",
    "Toronto",
    "Singapore",
    "Hong Kong",
    "Tel Aviv",
    "Istanbul",
];

async function getWeatherForCity(city, apiKey) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(apiUrl);
        if (response.status !== 200) {
            throw new Error(`Failed to fetch weather for ${city}`);
        }
        return {
            city,
            temperature: response.data.main.temp,
        };
    } catch (error) {
        console.error(error);
        return {
            city,
            temperature: null,
        };
    }
}

async function getWeatherForRandomCities(apiKey) {
    const randomCities = [];
    const usedIndices = new Set();

    while (randomCities.length < 3) {
        const randomIndex = Math.floor(Math.random() * cityList.length);
        if (!usedIndices.has(randomIndex)) {
            usedIndices.add(randomIndex);
            randomCities.push(cityList[randomIndex]);
        }
    }

    const weatherDataPromises = randomCities.map((city) => getWeatherForCity(city, apiKey));
    const weatherData = await Promise.all(weatherDataPromises);

    return weatherData;
}

module.exports = getWeatherForRandomCities;
