'use strict';
const ForeCast = require('../models/Weather.model');
const WeatherKey = process.env.WEATHER_API_KEY;
const Axios = require('axios');

const handleWeather = async (req, res) => {
    let lat = req.query.lat;
    let lon = req.query.lon;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?&key=${WeatherKey}&lat=${lat}&lon=${lon}`;
    let axiosResponse = await Axios.get(url);
    let weatherData = axiosResponse.data;
    let cleanedData = weatherData.data.map(item => {
        return new ForeCast(item.datetime, item.weather.description , item.max_temp);
    })
    res.status(200).json(cleanedData);
}

module.exports = handleWeather;