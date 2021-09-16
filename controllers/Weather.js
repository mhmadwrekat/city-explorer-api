'use strict';
const ForeCast = require('../models/Weather.model');
const WeatherKey = process.env.WEATHER_API_KEY;
const Axios = require('axios');
const Cache = require('../helpers/cacheWeather');
let cache = new Cache();

const handleWeather = async (req, res) => {
    let newDate = new Date();
    if (cache.data.length > 0 && cache.date.getDate() === newDate.getDate()) {
        res.status(200).json({ 'Message': 'Data Retrieved From The Cache 💚', cache });
    } else {
        let lat = req.query.lat;
        let lon = req.query.lon;
        let url = `https://api.weatherbit.io/v2.0/forecast/daily?&key=${WeatherKey}&lat=${lat}&lon=${lon}`;
        let axiosResponse = await Axios.get(url);
        let weatherData = axiosResponse.data;
        let cleanedData = weatherData.data.map(item => {
            return new ForeCast(item.datetime, item.weather.description, item.max_temp);
        })
        cache.data = cleanedData;
        cache.date = newDate;
        res.status(200).json({ 'Message': 'Data Is Coming From The API ❤️', cleanedData });
    }
}
module.exports = handleWeather;
